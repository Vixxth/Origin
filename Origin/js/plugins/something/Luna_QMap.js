/*:
 * @plugindesc <QMap>
 * Creates maps made with QMap Editor
 * @author LunaTechs | Quxios
 *
 * @requires QPlus
 *
 * @video https://www.youtube.com/watch?v=x7vcK96aW28
 *
 * @help
 * ============================================================================
 * ## About
 * ============================================================================
 * Similar to a parallax plugin. This plugin creates maps you created using
 * QMap Editor.
 *
 * ============================================================================
 * ## How to use
 * ============================================================================
 * Create a map using the [QMap Editor](https://github.com/lunatechsdev/LunaQMapEditor).
 * And that's it, no setup required.
 *
 * ============================================================================
 * ## QMap Editor Notes
 * ============================================================================
 * **Collider**
 * ----------------------------------------------------------------------------
 * Lets you add a collider to your map object for additional features.
 * There's two different methods for setting up a collider.
 *
 * First:
 * ~~~
 *  <collider:SHAPE,WIDTH,HEIGHT,OX,OY>
 * ~~~
 * - SHAPE: Set to box, circle or poly (only box works unless QMovement is installed)
 *   - If poly read next section on poly shape
 * - WIDTH: The width of the collider, in pixels
 * - HEIGHT: The height of the collider, in pixels
 * - OX: The X Offset of the collider, in pixels
 * - OY: The Y Offset of the collider, in pixels
 *
 * This will set the default collider to these settings.
 *
 * Second:
 * ~~~
 *  <colliders>
 *  TYPE: SHAPE,WIDTH,HEIGHT,OX,OY
 *  TYPE: SHAPE,WIDTH,HEIGHT,OX,OY
 *  TYPE: SHAPE,WIDTH,HEIGHT,OX,OY
 *  </colliders>
 * ~~~
 * You can include as many different colliders as you want, as long as TYPE
 * is different on each line.
 *
 * - TYPE: When this collider will be used. Set to default when you want that
 *  collider to be used when ever the type isn't found. Set to collision, for
 *  that collider to be used as a collision. Set to other values if needed
 *  for example, if a certain type is needed for a plugin feature.
 * - SHAPE: Set to box, circle or poly (only box works unless QMovement is installed)
 *   * If poly read next section on poly shape
 * - WIDTH: The width of the collider, in pixels
 * - HEIGHT: The height of the collider, in pixels
 * - OX: The X Offset of the collider, in pixels
 * - OY: The Y Offset of the collider, in pixels
 *
 * ----------------------------------------------------------------------------
 * **Poly Colliders**
 * ----------------------------------------------------------------------------
 * To create a polygon collider, set the shape to poly. After that the rest
 * of the line should be a list of points separated with a comma. Points are
 * written as "(X,Y)". An example polygon would be:
 * ~~~
 *  poly,(24,0),(48,24),(24,48),(0,24)
 * ~~~
 * Would create a diamond shaped polygon.
 *
 * ----------------------------------------------------------------------------
 * **OnPlayer**
 * ----------------------------------------------------------------------------
 * Experimental feature, might be changed / renamed
 *
 * At the moment, this note will change this map objects alpha to 0.5 when
 * the player is behind it. This feature requires a default or interaction
 * collider.
 * ~~~
 *  <onPlayer>
 * ~~~
 * Just add that note to the map object to have this feature, then include
 * a collider.
 *
 * ----------------------------------------------------------------------------
 * **Breath**
 * ----------------------------------------------------------------------------
 * Adds a breathing effect to the map object. A breathing effect is where the
 * the sprites scale is increased and decreased in a sin wave.
 * ~~~
 *  <breath:OFFSET,DURATION,INITIALTIME?>
 * ~~~
 * - OFFSET: How much to scale. 1 is 100%, 0.5 is 50%. So 0.5 means its
 *  scale will go between 0.5 and 1.5;
 * - DURATION: How long it takes for 1 cycle, in frames. 60 frames = 1 second
 * - INITIALTIME: (Optional, Default: 0) Which frame should it start at. Ex;
 *  if DURATION was 60 and this is set at 30, it'll start in the middle of the
 *  cycle.
 *
 * ----------------------------------------------------------------------------
 * **Tint**
 * ----------------------------------------------------------------------------
 * Change the tint of the map object. Similar to the Tint Screen event command.
 * ~~~
 *  <tint:RED,GREEN,BLUE,GRAY>
 * ~~~
 * - RED: Red value of tint, set between -255 to 255. Default: 0
 * - GREEN: Red value of tint, set between -255 to 255. Default: 0
 * - BLUE: Red value of tint, set between -255 to 255. Default: 0
 * - GRAY: Red value of tint, set between -255 to 255. Default: 0
 *
 * ============================================================================
 * ## Videos
 * ============================================================================
 * Example of a map made with QMap
 * https://www.youtube.com/watch?v=n6aF6mnHEAk
 *
 * Example of the full QMap process, from the editor to mv
 * https://www.youtube.com/watch?v=XMWluxVErKo
 * If you have a video you'd like to have listed here, feel free to send me a
 * link in the RPGMakerWebs thread! (link below)
 *
 * ============================================================================
 * ## Links
 * ============================================================================
 * Formated Help:
 *
 *  https://quxios.github.io/plugins/QMap
 *
 * RPGMakerWebs:
 *
 *  http://forums.rpgmakerweb.com/index.php?threads/qplugins.73023/
 *
 * Terms of use:
 *
 *  https://github.com/quxios/QMV-Master-Demo/blob/master/readme.md
 *
 * Like my plugins? Support me on Patreon!
 *
 *  https://www.patreon.com/quxios
 *
 * @tags sprite, map, parallax
 */

(function () {
'use strict';

const ColliderManager = QMovement.ColliderManager;

let $dataQMapInfos = null;
let $dataQMap = null;

function setQMapData(data) {
  $dataQMap = data;
}

function setQMapInfos(data) {
  $dataQMapInfos = data;
}

function getQMapData() {
  return $dataQMap;
}

function getQMapInfos() {
  return $dataQMapInfos;
}

QPlus.request("data/QMap.json")
  .onSuccess(function (json) {
    const newJson = ["2"];
    if (json[0] !== "2") {
      // convert old json type to new
      if (Utils.isOptionValid("test")) {
        const fs = require("fs");
        const path = require("path");
        const dataPath = path.join(
          path.dirname(process.mainModule.filename),
          "data/"
        );
        const qMapPath = path.join(dataPath, "QMaps/");
        if (!fs.existsSync(qMapPath)) {
          fs.mkdirSync(qMapPath);
        }
        for (let i = 1; i < json.length; i++) {
          const map = json[i];
          if (map && map.length > 0) {
            newJson[i] = true;
            const filename = "QMap%1.json".format(i.padZero(3));
            fs.writeFileSync(
              path.join(qMapPath, filename),
              JSON.stringify(map)
            );
          }
        }
        fs.writeFileSync(
          path.join(dataPath, "QMap.json"),
          JSON.stringify(newJson)
        );
        setQMapInfos(newJson);
      } else {
        alert("Invalid QMap datatype");
        window.close();
      }
    } else {
      setQMapInfos(json);
    }
  })
  .onError(function () {
    throw new Error("Failed to load 'data/QMap.json'");
  });

const Alias_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
  return Alias_DataManager_isDatabaseLoaded.call(this) && getQMapInfos();
};

const Alias_DataManager_isMapLoaded = DataManager.isMapLoaded;
DataManager.isMapLoaded = function () {
  return Alias_DataManager_isMapLoaded.call(this) && !!getQMapData();
};

const Alias_DataManager_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function (mapId) {
  Alias_DataManager_loadMapData.call(this, mapId);
  if (mapId > 0) {
    if (getQMapInfos()[mapId]) {
      setQMapData(null);
      const filename = "QMap%1.json".format(mapId.padZero(3));
      QPlus.request("data/QMaps/" + filename)
        .onSuccess(function (json) {
          setQMapData(json);
          DataManager.onLoad(getQMapData());
        })
        .onError(function () {
          throw new Error("Failed to load 'data/QMaps" + filename + "'");
        });
    } else {
      setQMapData([]);
    }
  }
};

const Alias_DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function (object) {
  if (object === getQMapData()) {
    for (let i = 0; i < object.length; i++) {
      const data = object[i];
      if (data.note === undefined && data.notes !== undefined) {
        // older version the property was name notes, should
        // have been just note
        data.note = data.notes;
      }
      if (data && data.note !== undefined) {
        this.extractMetadata(data);
      }
    }
  } else {
    Alias_DataManager_onLoad.call(this, object);
  }
};

function Sprite_MapObject() {
  this.initialize.apply(this, arguments);
}

Sprite_MapObject.prototype = Object.create(Sprite.prototype);
Sprite_MapObject.prototype.constructor = Sprite_MapObject;

Sprite_MapObject.prototype.initialize = function (mapObj) {
  Sprite.prototype.initialize.call(this);
  this._mapObj = mapObj;
  this._tick = 0;
  this._lastFrameI = null;
  this._frameI = this._mapObj.index || 0;
  this._patternI = 0;
  this._maxFrames = this._mapObj.cols * this._mapObj.rows;
  this.z = 0;
};

Sprite_MapObject.prototype.setupAnimation = function (req) {
  this._tick = 0;
  this._frameI = 0;
  this._acceptedReq = req;
};

Sprite_MapObject.prototype.update = function () {
  Sprite.prototype.update.call(this);
  if (this._mapObj._requestingAnim && !this._acceptedReq) {
    this.setupAnimation(this._mapObj._requestingAnim);
  }
  if (this._mapObj.type === "animated") {
    this.updateAnimation();
  }
  if (this._mapObj.type === "QSprite") {
    this.updateQSprite();
  }
  this.updateBitmap();
  this.updateFrame();
  this.updatePosition();
  this.updateOther();
};

Sprite_MapObject.prototype.updateAnimation = function () {
  if (this._tick % this._mapObj.speed === 0) {
    const isFinal = this._frameI === this._maxFrames - 1;
    this._frameI = (this._frameI + 1) % this._maxFrames;
    if (this._acceptedReq && isFinal) {
      if (this._acceptedReq === "once") {
        this._mapObj.clearAnimateRequest();
        this._acceptedReq = false;
      }
      if (this._acceptedReq === "once2") {
        this._mapObj.clearAnimateRequest();
        this._acceptedReq = false;
        this._frameI = this._maxFrames - 1;
      }
    }
  }
  this._tick = (this._tick + 1) % this._mapObj.speed;
};

Sprite_MapObject.prototype.updateQSprite = function () {
  const speed = this._mapObj._qSprite.speed;
  if (this._tick % speed === 0) {
    const pattern = this._mapObj._qSprite.pattern;
    this._patternI = (this._patternI + 1) % pattern.length;
    this._frameI = pattern[this._patternI];
  }
  this._tick = (this._tick + 1) % speed;
};

Sprite_MapObject.prototype.updateBitmap = function () {
  if (this._filePath !== this._mapObj.filePath) {
    this._filePath = this._mapObj.filePath;
    let path = this._filePath.split(/\/|\\/);
    const fileName = path.pop().split(".");
    const ext = fileName.pop();
    path.push(encodeURIComponent(fileName.join(".")) + "." + ext);
    path = path.join("/");
    this.bitmap = ImageManager.loadBitmapFromUrl(path);
    this.bitmap.smooth = this._mapObj.meta.smooth;
    this._lastFrameI = null;
    this.bitmap.addLoadListener(
      function () {
        this._lastFrameI = null;
      }.bind(this)
    );
  }
};

Sprite_MapObject.prototype.updateFrame = function () {
  if (this._lastFrameI !== null) {
    if (this._lastFrameI === this._frameI) return;
  }
  if (this._mapObj.type !== "full") {
    const i = this._frameI;
    const cols = this._mapObj.cols;
    const rows = this._mapObj.rows;
    const pw = this.bitmap.width / cols;
    const ph = this.bitmap.height / rows;
    const point = QPlus.indexToPoint(i, cols, rows);
    const sx = point.x * pw;
    const sy = point.y * ph;
    this.setFrame(sx, sy, pw, ph);
    this._lastFrameI = i;
  }
};

Sprite_MapObject.prototype.updatePosition = function () {
  this.x = this._mapObj.screenX();
  this.y = this._mapObj.screenY();
  this.z = this._mapObj.z;
  this.anchor.x = this._mapObj.anchorX;
  this.anchor.y = this._mapObj.anchorY;
};

Sprite_MapObject.prototype.updateOther = function () {
  this.alpha = this._mapObj.alpha;
  this.scale.x = this._mapObj.scale.x;
  this.scale.y = this._mapObj.scale.y;
  this.rotation = this._mapObj.rotation;
  this.visible = this._mapObj.visible;
  this.setColorTone(this._mapObj.tone);
};

const Alias_Spriteset_Map_createCharacters =
  Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function () {
  Alias_Spriteset_Map_createCharacters.call(this);
  this.createMapObjs();
};

Spriteset_Map.prototype.createMapObjs = function () {
  this._mapObjs = [];
  const mapObjs = $gameMap._mapObjs;
  for (const key in mapObjs) {
    for (let i = 0; i < mapObjs[key].length; i++) {
      if (!mapObjs[key][i] || !mapObjs[key][i].filePath) continue;
      this._mapObjs.push(new Sprite_MapObject(mapObjs[key][i]));
    }
  }
  for (let i = 0; i < this._mapObjs.length; i++) {
    this._tilemap.addChild(this._mapObjs[i]);
  }
};

if (typeof QMovement === "undefined") {
  const Alias_Game_CharacterBase_isCollidedWithCharacters =
    Game_CharacterBase.prototype.isCollidedWithCharacters;
  Game_CharacterBase.prototype.isCollidedWithCharacters = function (x, y) {
    return (
      Alias_Game_CharacterBase_isCollidedWithCharacters.call(this, x, y) ||
      this.isCollidedWithMapObj(x, y)
    );
  };

  Game_CharacterBase.prototype.isCollidedWithMapObj = function (x, y) {
    const mapObjs = $gameMap._mapObjsWithColliders;
    return mapObjs.some(function (mapObj) {
      return mapObj.intersectsWithSimple("collision", x, y);
    });
  };
}

function Game_MapObj() {
  this.initialize.apply(this, arguments);
}

Game_MapObj.prototype.initialize = function (mapId, objData) {
  /**
   * objData Properties
   *  @param name [string]
   *  @param x [int]
   *  @param y [int]
   *  @param z [int]
   *  @param filePath [string]
   *  @param type [string]
   *  @param cols [int]
   *  @param rows [int]
   *  @param index [int]
   *  @param speed [int]
   *  @param width [int]
   *  @param height [int]
   *  @param anchorX [int]
   *  @param anchorY [int]
   *  @param scaleX [int]
   *  @param scaleY [int]
   *  @param angle [int]
   *  @param conditions [object[]]
   *  @param note [string]
   *  @param meta [object]
   *  @param isQSprite [string]
   *  @param pose [string]
   */
  for (const prop in objData) {
    let propName = String(prop);
    let value = objData[prop];
    if (propName === "notes" || propName === "meta") {
      continue;
    }
    if (propName === "conditions") {
      value = value.map(function (v) {
        v.value = QPlus.stringToType(JSON.stringify(v.value));
        return v;
      });
    }
    if (propName === "x") {
      propName = "px";
    }
    if (propName === "y") {
      propName = "py";
    }
    this[propName] = value;
  }
  if (!this.conditions) {
    this.conditions = [];
  }
  this.meta = this.qmeta || {};

  if (typeof QSprite !== "undefined" && this.isQSprite) {
    this.convertQSprite();
  }
  this.initMembers();
};

Game_MapObj.prototype.convertQSprite = function () {
  const config = QSprite.json[this.isQSprite];
  if (!config) return;
  this.anchorX = config.anchorX;
  this.anchorY = config.anchorY;
  this.cols = config.cols;
  this.rows = config.rows;
  this.type = "QSprite";
  this._qSprite = config.poses[this.pose];
};

Game_MapObj.prototype.initMembers = function () {
  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();
  this.x = this.px / tw;
  this.y = this.py / th;
  this.alpha = 1;
  this.scale = new Point(this.scaleX, this.scaleY);
  this.rotation = this.angle * (Math.PI / 180);
  this.visible = true;
  this.setupBreath();
  this.setupTone();
};

Game_MapObj.prototype.setupBreath = function () {
  if (!this.meta.breath) return;
  const args = this.meta.breath.split(",").map(Number);
  this._breathS = args[0] === undefined ? 1 : args[0] / 100;
  this._breathT = args[1] === undefined ? 60 : args[1];
  this._breathOT = args[2] === undefined ? 0 : args[2];
  this._breathTick = this._breathOT;
};

Game_MapObj.prototype.setupTone = function () {
  this.tone = [0, 0, 0, 0];
  if (!this.meta.tint) return;
  this.tone = this.meta.tint.split(",").map(Number);
  this.tone[0] = this.tone[0] || 0;
  this.tone[1] = this.tone[1] || 0;
  this.tone[2] = this.tone[2] || 0;
  this.tone[3] = this.tone[3] || 0;
};

Game_MapObj.prototype.screenX = function () {
  const tw = $gameMap.tileWidth();
  const x = $gameMap.adjustX(this.x);
  return Math.round(x * tw);
};

Game_MapObj.prototype.screenY = function () {
  const th = $gameMap.tileHeight();
  const y = $gameMap.adjustY(this.y);
  return Math.round(y * th);
};

Game_MapObj.prototype.charaId = function () {
  return "MAPOBJ-" + this.name;
};

Game_MapObj.prototype.isThrough = function () {
  return !this.visible;
};

Game_MapObj.prototype.isNormalPriority = function () {
  return true;
};

Game_MapObj.prototype.notes = function () {
  return this.note;
};

Game_MapObj.prototype.requestAnimate = function (mode, speed) {
  if (this._requestingAnim) {
    clearAnimateRequest();
  }
  this._requestingAnim = mode;
  this._oldSpeed = this.speed;
  this.speed = speed;
  this._oldType = this.type;
  this.type = "animated";
};

Game_MapObj.prototype.clearAnimateRequest = function () {
  this._requestingAnim = null;
  this.type = this._oldType;
  this.speed = this._oldSpeed;
};

Game_MapObj.prototype.playPose = function (pose) {
  if (!this._qSprite) return;
  // TODO: change the QSprite stuff
};

Game_MapObj.prototype.update = function () {
  this.updateConditions();
  if (!this.visible) return;
  const playerX = $gamePlayer._realX;
  const playerY = $gamePlayer._realY;
  if (this._playerX !== playerX || this._playerY !== playerY) {
    const dx = this._playerX - playerX;
    const dy = this._playerY - playerY;
    this.updatePlayerMoved(dx, dy);
    this._playerX = playerX;
    this._playerY = playerY;
  }
  if (this.meta.breath) this.updateBreath();
};

Game_MapObj.prototype.updateConditions = function () {
  let isOk = true;
  for (let i = 0; i < this.conditions.length; i++) {
    const cond = this.conditions[i];
    if (cond.type === "switch") {
      isOk = $gameSwitches.value(cond.value[0]) === cond.value[1];
    }
    if (cond.type === "var") {
      isOk = $gameVariables.value(cond.value[0]) === cond.value[1];
    }
    if (cond.type === "js") {
      isOk = !!eval(value[0]);
    }
    if (!isOk) break;
  }
  this.visible = isOk;
};

Game_MapObj.prototype.updatePlayerMoved = function (dx, dy) {
  if (this.meta.onPlayer) this.updateOnPlayer();
  // add more functions that are based off player here
};

Game_MapObj.prototype.updateOnPlayer = function () {
  this.alpha = 1;
  if ($gamePlayer.screenY() < this.screenY()) {
    if (this.intersectsWith("interaction", $gamePlayer)) {
      this.alpha = 0.5;
    }
  }
};

Game_MapObj.prototype.updateBreath = function () {
  const rt = (this._breathTick % this._breathT) / this._breathT;
  const s = Math.sin(rt * Math.PI * 2) * this._breathS;
  this.scale = new Point(1 + s, 1 + s);
  this._breathTick = (this._breathTick + 1) % this._breathT;
};

Game_MapObj.prototype.intersectsWith = function (type, chara) {
  if (!this.visible) {
    return false;
  }
  if (typeof QMovement === "undefined") {
    return this.intersectsWithSimple(type, chara._realX, chara._realY);
  } else {
    return this.collider(type).intersects(chara.collider("collision"));
  }
};

Game_MapObj.prototype.intersectsWithSimple = function (type, x1, y1) {
  const bounds = this.getTileBounds(type);
  const x2 = x1 + 0.9;
  const y2 = y1 + 0.9;
  const insideX1 =
    (x1 >= bounds.x1 && x1 <= bounds.x2) ||
    (x2 >= bounds.x1 && x2 <= bounds.x2);
  const insideY1 =
    (y1 >= bounds.y1 && y1 <= bounds.y2) ||
    (y2 >= bounds.y1 && y2 <= bounds.y2);
  const insideX2 =
    (bounds.x1 >= x1 && bounds.x1 <= x2) ||
    (bounds.x2 >= x1 && bounds.x2 <= x2);
  const insideY2 =
    (bounds.y1 >= y1 && bounds.y1 <= y2) ||
    (bounds.y2 >= x1 && bounds.y2 <= y2);
  return (insideX1 || insideX2) && (insideY1 || insideY2);
};

Game_MapObj.prototype.collider = function (type) {
  if (!$dataMap) return;
  if (!this.meta.collider && !this.meta.colliders) return null;
  if (!this._colliders) this.setupColliders();
  return this._colliders[type] || this._colliders.default;
};

Game_MapObj.prototype.reloadColliders = function () {
  this.removeColliders();
  this.setupColliders();
};

Game_MapObj.prototype.removeColliders = function () {
  for (const collider in this._colliders) {
    if (!this._colliders.hasOwnProperty(collider)) continue;
    if (typeof QMovement !== "undefined") {
      ColliderManager.remove(this._colliders[collider]);
    }
    this._colliders[collider] = null;
  }
};

Game_MapObj.prototype.setupColliders = function () {
  if (!$dataMap) return;
  let configs = {};
  this._colliders = {};
  if (this.meta.colliders) {
    configs = QPlus.stringToObj(this.meta.colliders);
  }
  if (this.meta.collider) {
    configs.default = QPlus.stringToAry(this.meta.collider);
  }
  for (const collider in configs) {
    if (!configs.hasOwnProperty(collider)) continue;
    this._colliders[collider] = this.convertToCollider(
      configs[collider],
      collider
    );
  }
  if (this.collider("collision")) {
    Game_CharacterBase.prototype.makeBounds.call(this);
  }
};

Game_MapObj.prototype.convertToCollider = function (arr, ctype) {
  if (typeof QMovement === "undefined") {
    return this.toSimpleCollider(arr);
  }
  const collider = ColliderManager.convertToCollider(arr);
  collider.note = this.note;
  collider.isMapObj = true;
  collider.type = ctype;
  const x1 = this.px + this.width * -this.anchorX;
  const y1 = this.py + this.height * -this.anchorY;
  collider.moveTo(x1, y1);
  ColliderManager.addCollider(collider, -1, true);
  return collider;
};

Game_MapObj.prototype.toSimpleCollider = function (arr) {
  if (arr[0] !== "box") return null;
  return {
    isSimple: true,
    width: arr[1] || 0,
    height: arr[2] || 0,
    ox: arr[3] || 0,
    oy: arr[4] || 0,
  };
};

Game_MapObj.prototype.getTileBounds = function (type) {
  if (this.collider(type)) {
    return this.getSimpleColliderBounds(type);
  }
  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();
  const x1 = this.x;
  const y1 = this.y;
  const x2 = x1 + this.width / tw;
  const y2 = y1 + this.height / th;
  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
  };
};

Game_MapObj.prototype.getSimpleColliderBounds = function (type) {
  const collider = this.collider(type);
  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();
  const x1 = this.x + (this.width * -this.anchorX) / tw + collider.ox / tw;
  const y1 = this.y + (this.height * -this.anchorY) / th + collider.oy / th;
  const x2 = x1 + collider.width / tw;
  const y2 = y1 + collider.height / th;
  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
  };
};

const Alias_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function () {
  Alias_Game_Map_initialize.call(this);
  this._mapObjs = [];
};

const Alias_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function () {
  Alias_Game_Map_setupEvents.call(this);
  this.setupMapObjs();
};

if (typeof QMovement !== "undefined") {
  const Alias_Game_Map_reloadColliders = Game_Map.prototype.reloadColliders;
  Game_Map.prototype.reloadColliders = function () {
    Alias_Game_Map_reloadColliders.call(this);
    for (const key in this._mapObjs) {
      for (let i = 0; i < this._mapObjs[key].length; i++) {
        if (this._mapObjs[key][i]) {
          this._mapObjs[key][i].reloadColliders();
        }
      }
    }
  };

  const Alias_Game_Map_clearColliders = Game_Map.prototype.clearColliders;
  Game_Map.prototype.clearColliders = function () {
    Alias_Game_Map_clearColliders.call(this);
    for (const key in this._mapObjs) {
      for (let i = 0; i < this._mapObjs[key].length; i++) {
        if (this._mapObjs[key][i]) {
          this._mapObjs[key][i].removeColliders();
        }
      }
    }
  };
}

Game_Map.prototype.setupMapObjs = function () {
  this._mapObjs = {};
  this._mapObjsWithColliders = [];
  const data = getQMapData() || [];
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      const objData = JSON.parse(JSON.stringify(data[i]));
      const mapObj = new Game_MapObj(this._mapId, objData);
      const name = mapObj.name;
      if (!this._mapObjs[name]) {
        this._mapObjs[name] = [];
      }
      this._mapObjs[name].push(mapObj);
      if (mapObj.collider("collision")) {
        this._mapObjsWithColliders.push(mapObj);
      }
    }
  }
};

const Alias_Game_Map_updateEvents = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function () {
  Alias_Game_Map_updateEvents.call(this);
  this.updateMapObjs();
};

Game_Map.prototype.updateMapObjs = function () {
  for (const key in this._mapObjs) {
    for (let i = 0; i < this._mapObjs[key].length; i++) {
      if (this._mapObjs[key][i]) {
        this._mapObjs[key][i].update();
      }
    }
  }
};

}());
