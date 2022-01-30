/*:
 * @plugindesc QMovement Addon: Adds image collision maps
  <Luna_QMCollisionMap>

 * @author LunaTechs | Quxios
 * @url https://lunatechs.dev/luna-qplugins/
 *
 *
 * @param Scan Size
 * @desc How accurate to scan Collision Map, 1 is most Accurate
 * Default: 4
 * @type number
 * @min 1
 * @default 4
 *
 * @param Folder
 * @desc Which folder are collision maps located.
 * Default: img/parallaxes/
 * @default img/parallaxes/
 *
 * @help
 * This is a port of the original plugin QM + CollisionMap by Quixos
 *  | https://quxios.github.io/plugins/QM+CollisionMap
 * ============================================================================
 * ## About
 * ============================================================================
 * This is an addon to QMovement plugin. This addon adds a feature that lets
 * you use images as a collision map.
 * ============================================================================
 * ## How to use
 * ============================================================================
 * Install this plugin somewhere below QMovement. Make your collision map,
 * White and transparent are passable areas, other colors will be impassable.
 * ----------------------------------------------------------------------------
 * **Note tag**
 * ----------------------------------------------------------------------------
 * To add a collision map to a map, open the map properties and add a notetag
 * with the following format:
 * ~~~
 *  <cm:FILENAME>
 * ~~~
 * Where FILENAME is the name of the image you want to use thats located in the
 * folder you set in the plugin parameters.
 * ============================================================================
 * ## Links
 * ============================================================================
 * Formated Help:
 *
 *  https://quxios.github.io/#/plugins/QM+CollisionMap
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
 * @tags QM-Addon, collision
 */

(function () {
'use strict';

const _PARAMS = QPlus.getParams("<Luna_QMCollisionMap>", true);
const _CMFOLDER = _PARAMS["Folder"];
const _SCANSIZE = _PARAMS["Scan Size"];

const ColliderManager = QMovement.ColliderManager;

ColliderManager.collisionMap = new Sprite();
ColliderManager.collisionMap.bitmap = new Bitmap();

const Alias_ColliderManager_clear = ColliderManager.clear;
ColliderManager.clear = function () {
  Alias_ColliderManager_clear.call(this);
  this.clearCollisionMap();
  this.container.addChild(this.collisionMap);
};

ColliderManager.setCollisionMap = function (collisionMap) {
  ColliderManager.collisionMap.bitmap = ImageManager.loadBitmap(
    _CMFOLDER,
    collisionMap
  );
};

ColliderManager.clearCollisionMap = function () {
  ColliderManager.collisionMap.bitmap = new Bitmap();
};

const Alias_ColliderManager_update = ColliderManager.update;
ColliderManager.update = function () {
  Alias_ColliderManager_update.call(this);
  this.updateCollisionMap();
};

ColliderManager.updateCollisionMap = function () {
  this.collisionMap.x = -$gameMap.displayX() * $gameMap.tileWidth();
  this.collisionMap.y = -$gameMap.displayY() * $gameMap.tileHeight();
};

const ColliderManager$1 = QMovement.ColliderManager;

const Alias_Game_CharacterBase_collisionCheck =
  Game_CharacterBase.prototype.collisionCheck;
Game_CharacterBase.prototype.collisionCheck = function (x, y, dir, dist, type) {
  const canPass = Alias_Game_CharacterBase_collisionCheck.call(
    this,
    x,
    y,
    dir,
    dist,
    type
  );
  if (this.isThrough() || this.isDebugThrough()) return true;
  if (!canPass) return false;
  if (this.collideWithCollisionMap(type, dir)) return false;
  return true;
};

//TODO add to midpass

Game_CharacterBase.prototype.collideWithCollisionMap = function (type, dir) {
  if (!$gameMap._hasCM) return false;
  const collider = this.collider(type);
  const edge = {
    2: "bottom",
    4: "left",
    6: "right",
    8: "top",
  };
  const passableColors = this.passableColors();
  if (dir === 5) {
    if (
      !$gameMap.collisionMapPass(collider, "top", passableColors) ||
      !$gameMap.collisionMapPass(collider, "bottom", passableColors) ||
      !$gameMap.collisionMapPass(collider, "left", passableColors) ||
      !$gameMap.collisionMapPass(collider, "right", passableColors)
    ) {
      return true;
    }
  } else {
    return !$gameMap.collisionMapPass(collider, edge[dir], passableColors);
  }
  return false;
};

const ColliderManager$2 = QMovement.ColliderManager;

const Alias_Game_Map_reloadTileMap = Game_Map.prototype.reloadTileMap;
Game_Map.prototype.reloadTileMap = function () {
  Alias_Game_Map_reloadTileMap.call(this);
  this.setupCollisionMap();
};

Game_Map.prototype.setupCollisionMap = function () {
  const cm = /<cm:(.*?)>/i.exec($dataMap.note);
  // regionmaps are disabled
  //var rm = /<rm[=|:](.*?)>/i.exec($dataMap.note);
  this.loadCollisionmap(cm ? cm[1] : null);
};

Game_Map.prototype.loadCollisionmap = function (collisionMap) {
  if (collisionMap) {
    ColliderManager$2.setCollisionMap(collisionMap);
    this._hasCM = true;
  } else {
    ColliderManager$2.clearCollisionMap();
    this._hasCM = false;
  }
};

Game_Map.prototype.collisionMapPass = function (collider, dir, passableColors) {
  if (!ColliderManager$2.collisionMap.bitmap.isReady()) return false;
  if (collider.isCircle()) {
    return this.collisionMapCirclePass(collider, dir, passableColors);
  } else if (collider.isBox()) {
    return this.collisionMapBoxPass(collider, dir, passableColors);
  }
  return false;
};

Game_Map.prototype.insidePassableOnly = function (collider, passableColors) {
  return (
    this.collisionMapBoxPass(collider, "top", passableColors) &&
    this.collisionMapBoxPass(collider, "bottom", passableColors)
  );
};

Game_Map.prototype.collisionMapBoxPass = function (
  collider,
  dir,
  passableColors
) {
  if (collider._radian !== 0) {
    return this.collisionMapPolyPass(collider, dir, passableColors);
  }
  const edgePoints = collider.edge();
  const edges = {
    top: {
      x1: edgePoints.x1,
      x2: edgePoints.x2,
      y1: edgePoints.y1,
      y2: edgePoints.y1,
    },
    bottom: {
      x1: edgePoints.x1,
      x2: edgePoints.x2,
      y1: edgePoints.y2,
      y2: edgePoints.y2,
    },
    left: {
      x1: edgePoints.x1,
      x2: edgePoints.x1,
      y1: edgePoints.y1,
      y2: edgePoints.y2,
    },
    right: {
      x1: edgePoints.x2,
      x2: edgePoints.x2,
      y1: edgePoints.y1,
      y2: edgePoints.y2,
    },
  };
  const x1 = Math.floor(edges[dir].x1);
  const x2 = Math.floor(edges[dir].x2);
  const y1 = Math.floor(edges[dir].y1);
  const y2 = Math.floor(edges[dir].y2);
  for (let x = x1; x <= x2; ) {
    for (let y = y1; y <= y2; ) {
      if (
        !passableColors.contains(
          ColliderManager$2.collisionMap.bitmap.getColor(x, y)
        )
      ) {
        return false;
      }
      y = Math.min(y2 + 1, y + _SCANSIZE);
    }
    x = Math.min(x2 + 1, x + _SCANSIZE);
  }
  return true;
};

Game_Map.prototype.collisionMapCirclePass = function (
  collider,
  dir,
  passableColors
) {
  let r1 = 0;
  let r2 = 0;
  let r3 = 0;
  let s = 0;
  switch (dir) {
    case "bottom": {
      r1 = Math.PI;
      r2 = Math.PI * 2;
      s = Math.PI / collider.width;
      break;
    }
    case "left": {
      r1 = Math.PI / 2;
      r2 = (3 * Math.PI) / 2;
      s = Math.PI / collider.height;
      break;
    }
    case "right": {
      r1 = -Math.PI / 2;
      r2 = Math.PI / 2;
      s = Math.PI / collider.height;
      break;
    }
    case "top": {
      r1 = 0;
      r2 = Math.PI;
      s = Math.PI / collider.width;
      break;
    }
  }

  while (r1 <= r2) {
    r3 = r1 + collider._radian;
    const pos = collider.circlePosition(r3);
    const x = Math.floor(pos.x);
    const y = Math.floor(pos.y);
    if (
      !passableColors.contains(
        ColliderManager$2.collisionMap.bitmap.getColor(x, y)
      )
    ) {
      return false;
    }
    r1 += s * _SCANSIZE;
  }
  return true;
};

Game_Map.prototype.collisionMapPolyPass = function (
  collider,
  dir,
  passableColors
) {
  let points = collider._vertices.slice();
  let startPoint = null;
  let endPoint = null;
  let horz = false;
  if (dir === "top" || dir === "bottom") {
    startPoint = this.collisionMapPoints(collider, dir, collider._xMin, 0);
    endPoint = this.collisionMapPoints(collider, dir, collider._xMax, 0);
  } else {
    // left or right
    startPoint = this.collisionMapPoints(collider, dir, collider._yMin, 1);
    endPoint = this.collisionMapPoints(collider, dir, collider._yMax, 1);
    horz = true;
  }
  const minIndex = collider._baseVertices.indexOf(startPoint);
  const maxIndex = collider._baseVertices.indexOf(endPoint);
  endPoint = collider.vertices()[maxIndex];
  const firstHalf = points.splice(0, minIndex);
  points = points.concat(firstHalf);
  if (dir === "bottom" || dir === "left") {
    points.reverse();
    points.unshift(points.pop());
  }
  for (let i = 0; i < points.length - 1; i++) {
    let x1 = points[i].x;
    let y1 = points[i].y;
    let steps = 0;
    let slope = 0;
    let inc = 0;
    const x2 = points[i + 1].x;
    const y2 = points[i + 1].y;
    if (horz) {
      steps = Math.abs(y2 - y1) / _SCANSIZE;
      slope = (x2 - x1) / steps;
      inc = y1 > y2 ? -1 : 1;
    } else {
      steps = Math.abs(x2 - x1) / _SCANSIZE;
      slope = (y2 - y1) / steps;
      inc = x1 > x2 ? -1 : 1;
    }
    let a1 = (a2 = horz ? y1 : x1);
    while (a1 - a2 <= steps) {
      if (
        !passableColors.contains(
          ColliderManager$2.collisionMap.bitmap.getColor(x1, y1)
        )
      ) {
        return false;
      }
      a1++;
      y1 += horz ? inc : slope;
      x1 += horz ? slope : inc;
    }
    if (x2 === endPoint.x && y2 === endPoint.y) {
      break;
    }
  }
  return true;
};

Game_Map.prototype.collisionMapPoints = function (collider, dir, value, axis) {
  let point = collider._baseVertices.filter(function (p) {
    return axis === 0 ? p.x === value : p.y === value;
  });
  point.sort(function (a, b) {
    if (axis === 0) {
      if (dir === "top") {
        return a.y - b.y;
      } else {
        return b.y - a.y;
      }
    } else {
      if (dir === "left") {
        return a.x - b.x;
      } else {
        return b.x - a.x;
      }
    }
  });
  point = point[0];
  for (let i = 0; i < collider._baseVertices.length; i++) {
    if (
      collider._baseVertices[i].x === point.x &&
      collider._baseVertices[i].y === point.y
    ) {
      return collider._baseVertices[i];
    }
  }
};

Game_Temp.prototype.isPlaytest = function () {
  return true;
};

const Alias_Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function (width, height) {
  Alias_Bitmap_initialize.call(this, width, height);
  this._pixelData = [];
};

Bitmap.prototype._setPixelData = function () {
  this._pixelData = this.context.getImageData(
    0,
    0,
    this.width,
    this.height
  ).data;
};

// Optimized version of getPixel() by caching
Bitmap.prototype.getColor = function (x, y) {
  if (this._pixelData.length === 0) this._setPixelData();
  x = Math.floor(x);
  y = Math.floor(y);
  if (
    x >= this.width ||
    x < 0 ||
    y >= this.height ||
    y < 0 ||
    this._pixelData.length === 0
  ) {
    return "#00000000";
  }
  const i = x * 4 + y * 4 * this.width;
  let result = "#";
  if (this._pixelData[i + 3] === 0) {
    return "#00000000";
  }
  for (let c = 0; c < 3; c++) {
    result += this._pixelData[i + c].toString(16).padZero(2);
  }
  return result;
};

if (typeof QMovement === "undefined") {
  alert("Error: QM+CollisionMap requires QMovement 1.0.2 or newer to work.");
  throw new Error(
    "Error: QM+CollisionMap requires QMovement 1.0.2 or newer to work."
  );
}

}());
