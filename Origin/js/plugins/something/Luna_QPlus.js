/*:
 * @plugindesc Some small changes to MV for easier plugin development.
   <Luna_QPlus>
 * @author LunaTechs | Quxios
 * @url https://lunatechs.dev/luna-qplugins
 * @exportName QPlus
 *
 * @param Quick Test
 * @desc When true, game will skip title screen and start a new game
 * @type boolean
 * @default true
 *
 * @param Default Enabled Switches
 * @desc Turns on a list of switches on new game
 * @type switch[]
 * @default []
 *
 * @param Ignore Mouse when inactive
 * @desc When true, the game window will ignore mouse input when the game
 * isn't focused / active
 * @type boolean
 * @default false
 * 
 * @command wait
 * @desc Will insert a random wait between min and max frames.
 * 
 * @arg min
 * @desc The minimum value to wait.
 * 
 * @arg max
 * @desc The maximum value to wait. If left blank it will set to a random number.
 * 
 * @help
 * This is a port of the original plugin QPlus by Quixos
 *  | https://quxios.github.io/plugins/QPlus
 *
 * ============================================================================
 * ## About
 * ============================================================================
 * This plugin is the core for most of the QPlugins. It also adds a few new
 * functionality to RPG Maker MV to improve it.
 *
 * ============================================================================
 * ## Notetags / Comments
 * ============================================================================
 * **Event retain direction**
 * ----------------------------------------------------------------------------
 * Adding the following to the notes or in a comment will make that event retain
 * its direction when changing pages.
 * ~~~
 * <retainDir>
 * ~~~
 * This will be ignored if the next page has direction fix enabled
 *
 * ----------------------------------------------------------------------------
 * **No tilemap**
 * ----------------------------------------------------------------------------
 * You can disable the tile map by adding this note to a map
 * ~~~
 * <noTilemap>
 * ~~~
 * This will replace the tilemap with a simple light weight sprite container.
 * Using this may increase performance. So if you have a map that doesn't use
 * any tiles and is all parallax, then you should considering using this.
 *
 * *Note, there's a chance this may break some plugins if they call functions in
 * the original tilemap class.*
 *
 * ============================================================================
 * ## Format Plugin Commands
 * ============================================================================
 * These formating options are only applied to QPlugins!
 *
 * ----------------------------------------------------------------------------
 * **Spaces in arg**
 * ----------------------------------------------------------------------------
 * Each arg is separated with a space. But sometimes you may need a space, for
 * example when passing a file name. To do this you just need to wrap it in quotes
 * and it'll be passed as a single arg, ex:
 * ~~~
 * qPlugin cmd arg1 "arg2 with a space" arg3
 * ~~~
 *
 * ----------------------------------------------------------------------------
 * **Variables**
 * ----------------------------------------------------------------------------
 * If you want to use a value of a variable in a plugin command you can do so
 * with the following format:
 * ~~~
 * {vID}
 * ~~~
 * - ID: The id of the variable to use
 *
 * Example:
 * ~~~
 * qPlugin cmd arg1 chara{v1}
 * ~~~
 * When the plugin command runs the {v1} will get replaced with the value of
 * variable 1. If the value of variable 1 is 10, , then your plugin command will
 * format to: `qPlugin cmd arg1 chara10`
 * ----------------------------------------------------------------------------
 * **Switches**
 * ----------------------------------------------------------------------------
 * If you want to use a value of a switch in a plugin command you can do so
 * with the following format:
 * ~~~
 * {sID}
 * ~~~
 * - ID: The id of the switch to use
 *
 * Example:
 * ~~~
 * qPlugin cmd arg1 {s1}
 * ~~~
 * When the plugin command runs the {s1} will get replaced with the value of
 * switch 1. If the value of switch 1 is true, then your plugin command will
 * format to: `qPlugin cmd arg1 true`
 *
 * ============================================================================
 * ## Plugin Commands
 * ============================================================================
 * **Random wait between X Y**
 * ----------------------------------------------------------------------------
 * This plugin command will insert a random wait between x and y frames.
 * ~~~
 * wait X Y
 * ~~~
 * If Y is left empty, it will make a random wait between 0 - X
 *
 * ----------------------------------------------------------------------------
 * **Global Lock**
 * ----------------------------------------------------------------------------
 * This plugin command will 'lock' all characters or certain characters. By
 * locking I mean you can lock their movement, or movement and character
 * animation.
 * ~~~
 * globalLock LEVEL [CHARACTERS] [options]
 * ~~~
 * - LEVEL: The level of global lock
 *  * 0: clears the global lock
 *  * 1: locks the characters movement
 *  * 2: locks the characters movement and animation
 * - [CHARACTERS] - optional, list of `Character Ids` to apply to or ignore. Seperated by a space.
 *  * CHARAID: The character identifier.
 *   - For player: 0, p, or player
 *   - For events: EVENTID, eEVENTID, eventEVENTID or this for the event that called this
 *   (replace EVENTID with a number)
 *
 * Possible options:
 *  - only: Will only apply to the characters listed
 *
 * ----------------------------------------------------------------------------
 * **Global lock Examples**
 * ----------------------------------------------------------------------------
 * ~~~
 * globalLock 2
 * ~~~
 * Will lock all characters movement and animations.
 *
 * ~~~
 * globalLock 1 0 1 4
 * globalLock 1 p e1 e4
 * globalLock 1 player event1 event4
 * ~~~
 * (Note: All 3 are the same, just using a different character id method)
 *
 * Will Lock the movements for all characters except:
 * Player, event 1 and event 4
 *
 * ~~~
 * globalLock 1 0 1 4 only
 * globalLock 1 p e1 e4 only
 * globalLock 1 player event1 event4 only
 * ~~~
 * Will Lock the movements for only these characters:
 * Player, event 1 and event 4
 *
 * ============================================================================
 * ## Links
 * ============================================================================
 * Formated Help:
 *
 *  https://quxios.github.io/#/plugins/QPlus
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
 * @tags core, character
 */

var QPlus = (function () {
'use strict';

var QPlus$1 = {
  _waitListeners: [],

  _regex: {
    isBoolean: /^(true|false)$/i,
    isString: /^"(.*?)"$/,
    isNumber: /^-?\d+$/,
    isFloat: /^-?\d+\.?\d*$/,
    isPoint: /^\((-?\d+\.?\d*),\s*(-?\d+\.?\d*)\)$/,
    isArray: /^\[(.*?)\]$/,
    isObj: /^\{(.*?)\}$/,
  },

  getParams(id, convert) {
    const plugin = $plugins.filter(function (p) {
      return p.description.contains(id) && p.status;
    });
    const hasDefaults = typeof convert === "object";
    if (!plugin[0]) {
      return hasDefaults ? convert : {};
    }
    const params = Object.assign(
      hasDefaults ? convert : {},
      plugin[0].parameters
    );
    if (convert) {
      for (const param in params) {
        params[param] = this.stringToType(String(params[param]));
        if (hasDefaults && convert[param] !== undefined) {
          if (convert[param].constructor !== params[param].constructor) {
            let err =
              "Plugin Parameter value error. " + id + ", Parameter: " + param;
            err += "\nDefault value will be used.";
            console.warn(err);
            params[param] = convert[param];
          }
        }
      }
    }
    return params;
  },

  versionCheck(version, targetVersion) {
    version = version.split(".").map(Number);
    targetVersion = targetVersion.split(".").map(Number);
    if (version[0] < targetVersion[0]) {
      return false;
    } else if (
      version[0] === targetVersion[0] &&
      version[1] < targetVersion[1]
    ) {
      return false;
    } else if (
      version[1] === targetVersion[1] &&
      version[2] < targetVersion[2]
    ) {
      return false;
    }
    return true;
  },

  /**
   * @static makeArgs
   *  Splits a string every space. If words are wrapped in ""s or ''s they
   *  are kept grouped.
   * @param  {String} string
   * @return {Array}
   */
  makeArgs(string) {
    if (string.constructor === Array) {
      string = string.join(" ");
    }
    const args = [];
    const regex = /("?|'?)(.+?)\1(?:\s|$)/g;
    while (true) {
      const match = regex.exec(string);
      if (match) {
        args.push(match[2]);
      } else {
        break;
      }
    }
    return this.formatArgs(args);
  },

  formatArgs(args) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i].trim();
      const match = /\{(.*?)\}/.exec(arg);
      if (match) {
        let val = match[1];
        const cmd = match[1][0].toLowerCase();
        switch (cmd) {
          case "v": {
            const id = Number(match[1].slice(1));
            val = $gameVariables.value(id);
            break;
          }
          case "s": {
            const id = Number(match[1].slice(1));
            val = $gameSwitches.value(id);
            break;
          }
        }
        args[i] = args[i].replace(/\{(.*?)\}/, val);
      }
    }
    return args;
  },

  getArg(args, regex) {
    let arg = null;
    for (let i = 0; i < args.length; i++) {
      const match = regex.exec(args[i]);
      if (match) {
        if (match.length === 1) {
          arg = true;
        } else {
          arg = match[match.length - 1];
        }
        break;
      }
    }
    return arg;
  },

  getMeta(string) {
    const meta = {};
    const inlineRegex = /<([^<>:\/]+)(?::?)([^>]*)>/g;
    const blockRegex = /<([^<>:\/]+)>([\s\S]*?)<\/\1>/g;
    for (;;) {
      const match = inlineRegex.exec(string);
      if (match) {
        if (match[2] === "") {
          meta[match[1]] = true;
        } else {
          meta[match[1]] = match[2];
        }
      } else {
        break;
      }
    }
    for (;;) {
      const match = blockRegex.exec(string);
      if (match) {
        meta[match[1]] = match[2];
      } else {
        break;
      }
    }
    return meta;
  },

  getCharacter(string) {
    string = String(string).toLowerCase();
    if (/^[0-9]+$/.test(string)) {
      const id = Number(string);
      return id === 0 ? $gamePlayer : $gameMap.event(id);
    } else if (/^(player|p)$/.test(string)) {
      return $gamePlayer;
    } else {
      const isEvent = /^(event|e)([0-9]+)$/.exec(string);
      if (isEvent) {
        const eventId = Number(isEvent[2]);
        return eventId > 0 ? $gameMap.event(eventId) : null;
      }
      return null;
    }
  },

  charaIdToId(string) {
    string = String(string).toLowerCase();
    if (/^[0-9]+$/.test(string)) {
      return Number(string);
    } else if (/^(player|p)$/.test(string)) {
      return 0;
    } else {
      const isEvent = /^(event|e)([0-9]+)$/.exec(string);
      if (isEvent) {
        return Number(isEvent[2]);
      }
      return null;
    }
  },

  compareCharaId(a, b) {
    if (a === b) return true;
    return this.charaIdToId(a) === this.charaIdToId(b);
  },

  /**
   * @static request
   *  Creates an XHR request
   * @param  {String}   filePath
   *         path to the file to load
   * @param  {Function} callback
   *         callback on load, response value is passed as 1st argument
   * @param  {Function} err
   *         callback on error
   * @return {XMLHttpRequest}
   */
  request(filePath, callback, err) {
    const xhr = new XMLHttpRequest();
    xhr.url = filePath;
    xhr.open("GET", filePath, true);
    const type = filePath.split(".").pop().toLowerCase();
    if (type === "txt") {
      xhr.overrideMimeType("text/plain");
    } else if (type === "json") {
      xhr.overrideMimeType("application/json");
    }
    xhr.onload = function () {
      if (this.status < 400) {
        let val = this.responseText;
        if (type === "json") val = JSON.parse(val);
        this._onSuccess(val);
      }
    };
    xhr.onError = function (func) {
      this.onerror = func;
      return this;
    };
    xhr.onSuccess = function (func) {
      this._onSuccess = func;
      return this;
    };
    xhr._onSuccess = callback || function () {};
    xhr.onerror =
      err ||
      function () {
        console.error("Error:" + this.url + " not found");
      };
    xhr.send();
    return xhr;
  },

  /**
   * @static wait
   *  Calls callback once duration reachs 0
   * @param  {Number}   duration
   *         duration in frames to wait
   * @param  {Function} callback
   *         callback to call after wait is complete
   * @return {Waiter}
   *         Wait object that was created. Used to remove from listeners.
   *         Can also be used to use the .then function to add a callback
   *         instead of passing the callback in the parameter
   */
  wait(duration, callback) {
    const waiter = {
      duration: duration || 0,
      callback: callback,
      then: function (callback) {
        this.callback = callback;
        return this;
      },
    };
    this._waitListeners.push(waiter);
    return waiter;
  },

  removeWaitListener(waiter) {
    const i = this._waitListeners.indexOf(waiter);
    if (i === -1) return;
    this._waitListeners.splice(i, 1);
  },

  clearWaitListeners() {
    this._waitListeners = [];
  },

  mixin(to, what) {
    Object.getOwnPropertyNames(what).forEach(function (prop) {
      if (prop !== "constructor") {
        Object.defineProperty(
          to,
          prop,
          Object.getOwnPropertyDescriptor(what, prop)
        );
      }
    });
  },

  mixinWait(into) {
    this.mixin(into, {
      wait: this.wait,
      removeWaitListener: this.removeWaitListener,
      clearWaitListeners: this.clearWaitListeners,
      updateWaiters: this.updateWaiters,
    });
    if (into.update) {
      into.update_BEFOREWAIT = into.update;
      into.update = function () {
        this.update_BEFOREWAIT.apply(this, arguments);
        this.updateWaiters();
      };
    }
  },

  /**
   * @static stringToObj
   *   Converts a string into an object
   * @param  {String} string
   *         string in the format:
   *         key: value
   *         key2: value2
   * @return {Object}
   */
  stringToObj(string) {
    const lines = string.split("\n");
    const obj = {};
    lines.forEach((value) => {
      const match = /^(.*):(.*)/.exec(value);
      if (match) {
        let key,
          newKey = match[1].trim();
        if (obj.hasOwnProperty(key)) {
          let i = 1;
          while (obj.hasOwnProperty(newKey)) {
            newKey = key + String(i);
            i++;
          }
        }
        let arr = this.stringToAry(match[2].trim());
        if (arr.length === 1) arr = arr[0];
        obj[newKey] = arr || "";
      }
    });
    return obj;
  },

  /**
   * @static stringToAry
   *  Converts a string into an array. And auto converts to
   *  Number, Point, true, false or null
   * @param  {String} string
   *         Separate values with a comma
   * @return {Array}
   */
  stringToAry(string) {
    // couldn't get this to work with split so went with regex
    const regex = /\s*(\(.*?\))|([^,]+)/g;
    const arr = [];
    while (true) {
      const match = regex.exec(string);
      if (match) {
        arr.push(match[0]);
      } else {
        break;
      }
    }
    return arr.map(this.stringToType.bind(this));
  },

  stringToType(string) {
    string = string.trim();
    const rx = this._regex;
    if (rx.isString.test(string)) {
      string = string.slice(1, -1);
    }
    if (rx.isBoolean.test(string)) {
      return string.toLowerCase() === "true";
    }
    if (rx.isFloat.test(string)) {
      return Number(string);
    }
    const isPoint = rx.isPoint.exec(string);
    if (isPoint) {
      return new Point(Number(isPoint[1]), Number(isPoint[2]));
    }
    if (rx.isArray.test(string)) {
      try {
        return JSON.parse(string).map(this.stringToType);
      } catch (e) {
        return string;
      }
    }
    if (rx.isObj.test(string)) {
      try {
        const obj = JSON.parse(string);
        for (const key in obj) {
          obj[key] = this.stringToType(obj[key]);
        }
        return obj;
      } catch (e) {
        return string;
      }
    }
    return string;
  },

  /**
   * @static pointToIndex
   *  Converts a point to an index
   * @param  {Point} point
   * @param  {Int}   maxCols
   * @param  {Int}   maxRows
   * @return {Int} index value
   */
  pointToIndex(point, maxCols, maxRows) {
    if (point.x >= maxCols) return -1;
    if (maxRows && point.y >= maxRows) return -1;
    return point.x + point.y * maxCols;
  },

  /**
   * @static indexToPoint
   * Converts an index to a Point
   * @param  {Int} index
   * @param  {Int} maxCols
   * @param  {Int} maxRows
   * @return {Point}
   */
  indexToPoint(index, maxCols, maxRows) {
    if (index < 0) return new Point(-1, -1);
    const x = index % maxCols;
    const y = Math.floor(index / maxCols);
    return new Point(x, y);
  },

  /**
   * @static adjustRadian
   * Keeps the radian between 0 and MAth.PI * 2
   * @param  {Int} radian
   * @return {Int}
   */
  adjustRadian(radian) {
    while (radian < 0) {
      radian += Math.PI * 2;
    }
    while (radian > Math.PI * 2) {
      radian -= Math.PI * 2;
    }
    return radian;
  },

  update() {
    this.updateWaiters();
  },

  updateWaiters() {
    const waiters = this._waitListeners;
    for (let i = waiters.length - 1; i >= 0; i--) {
      if (!waiters[i]) {
        waiters.splice(i, 1);
        continue;
      }
      if (waiters[i].duration <= 0) {
        if (typeof waiters[i].callback === "function") {
          try {
            waiters[i].callback();
          } catch (e) {
            console.error(e);
          }
        }
        waiters.splice(i, 1);
      } else {
        waiters[i].duration--;
      }
    }
  },
};

function SimpleTilemap$1() {
  this.initialize.apply(this, arguments);
}

Input.stopPropagation = function () {
  const key = this._latestButton;
  this._currentState[key] = false;
  this._latestButton = null;
  for (let i = 0; i < this._gamepadStates.length; i++) {
    if (!this._gamepadStates[i]) continue;
    for (let j = 0; j < this._gamepadStates[i].length; j++) {
      const button =
        typeof QInput !== "undefined"
          ? this.gamepadKeys[j]
          : this.gamepadMapper[j];
      if (button === key) {
        this._gamepadStates[i][j] = false;
        break;
      }
    }
  }
  if (typeof QInput !== "undefined") {
    this._ranPress = false;
    this._lastPressed = null;
    this._lastTriggered = null;
    this._lastGamepadTriggered = null;
  }
};

const _PARAMS = QPlus$1.getParams("<Luna_QPlus>", {
  "Quick Test": false,
  "Default Enabled Switches": [],
  "Ignore Mouse when inactive": false,
});

if (_PARAMS["Ignore Mouse when inactive"]) {
  let isFocused = true;
  let focusWaiter;

  window.addEventListener("focus", function (e) {
    if (focusWaiter) {
      QPlus$1.removeWaitListener(focusWaiter);
    }
    focusWaiter = QPlus$1.wait(1).then(function () {
      TouchInput.stopPropagation();
      isFocused = true;
      focusWaiter = null;
    });
  });

  window.addEventListener("blur", function (e) {
    if (focusWaiter) {
      QPlus$1.removeWaitListener(focusWaiter);
      focusWaiter = null;
    }
    isFocused = false;
  });

  const Alias_TouchInput_update = TouchInput.update;
  TouchInput.update = function () {
    if (!isFocused) {
      this.clear();
      return;
    }
    Alias_TouchInput_update.call(this);
  };
}

TouchInput.stopPropagation = function () {
  this._screenPressed = false;
  this._triggered = false;
  this._cancelled = false;
  this._released = false;
};

Math.randomIntBetween = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Math.randomBetween = function (min, max) {
  return Math.random() * (max - min) + min;
};

const Alias_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
  Alias_DataManager_setupNewGame.call(this);
  for (let i = 0; i < _PARAMS["Default Enabled Switches"].length; i++) {
    $gameSwitches.setValue(_PARAMS["Default Enabled Switches"][i], true);
  }
};

let reading = null;
const Alias_DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function (object) {
  reading = object;
  Alias_DataManager_onLoad.call(this, object);
  reading = null;
};

const Alias_DataManager_extractMetadata = DataManager.extractMetadata;
DataManager.extractMetadata = function (data) {
  Alias_DataManager_extractMetadata.call(this, data);
  const blockRegex = /<([^<>:\/]+)>([\s\S]*?)<\/\1>/g;
  data.qmeta = Object.assign({}, data.meta);
  while (true) {
    const match = blockRegex.exec(data.note);
    if (match) {
      data.qmeta[match[1]] = match[2];
    } else {
      break;
    }
  }
  this.extractQData(data, reading);
};

DataManager.extractQData = function (data, object) {
  // to be aliased by plugins
};

const Alias_SceneManager_updateManagers = SceneManager.updateManagers;
SceneManager.updateManagers = function () {
  Alias_SceneManager_updateManagers.call(this);
  QPlus$1.update();
};

const Alias_Game_CharacterBase_initMembers =
  Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function () {
  Alias_Game_CharacterBase_initMembers.call(this);
  this._globalLocked = 0;
  this._comments = "";
  this._waitListeners = [];
  QPlus.mixinWait(this);
};

Game_CharacterBase.prototype.charaId = function () {
  return -1;
};

Game_CharacterBase.prototype.notes = function () {
  return "";
};

Game_CharacterBase.prototype.canMove = function () {
  return this._globalLocked === 0;
};

/**
 * east is 0, north is 270, west is 180 and south is 90
 */
Game_CharacterBase.prototype.directionToRadian = function (dir) {
  dir = dir || this._direction;
  if (dir === 2) return Math.PI / 2;
  if (dir === 4) return Math.PI;
  if (dir === 6) return 0;
  if (dir === 8) return (Math.PI * 3) / 2;
  if (dir === 1) return (Math.PI * 3) / 4;
  if (dir === 3) return Math.PI / 4;
  if (dir === 7) return (Math.PI * 5) / 4;
  if (dir === 9) return (Math.PI * 7) / 4;
  return 0;
};

Game_CharacterBase.prototype.radianToDirection = function (radian, useDiag) {
  radian = QPlus.adjustRadian(radian);
  if (useDiag) {
    // use degrees for diagonals
    // since I don't know clean PI numbers for these degrees
    const deg = (radian * 180) / Math.PI;
    if (deg >= 22.5 && deg <= 67.5) {
      return 3;
    } else if (deg >= 112.5 && deg <= 157.5) {
      return 1;
    } else if (deg >= 202.5 && deg <= 247.5) {
      return 7;
    } else if (deg >= 292.5 && deg <= 337.5) {
      return 9;
    }
  }
  if (radian >= 0 && radian < Math.PI / 4) {
    return 6;
  } else if (radian >= Math.PI / 4 && radian < (3 * Math.PI) / 4) {
    return 2;
  } else if (radian >= (Math.PI * 3) / 4 && radian < (Math.PI * 5) / 4) {
    return 4;
  } else if (radian >= (Math.PI * 5) / 4 && radian < (Math.PI * 7) / 4) {
    return 8;
  } else if (radian >= (Math.PI * 7) / 4) {
    return 6;
  }
};

Game_CharacterBase.prototype.setSelfSwitch = function () {
  return;
};

const Alias_Game_CharacterBase_updateAnimation =
  Game_CharacterBase.prototype.updateAnimation;
Game_CharacterBase.prototype.updateAnimation = function () {
  if (this._globalLocked >= 2) {
    return;
  }
  Alias_Game_CharacterBase_updateAnimation.call(this);
};

const Alias_Game_CharacterBase_updateMove =
  Game_CharacterBase.prototype.updateMove;
Game_CharacterBase.prototype.updateMove = function () {
  if (this._globalLocked >= 1) {
    return;
  }
  Alias_Game_CharacterBase_updateMove.call(this);
};

const Alias_Game_Character_updateRoutineMove =
  Game_Character.prototype.updateRoutineMove;
Game_Character.prototype.updateRoutineMove = function () {
  if (this._globalLocked >= 1) {
    return;
  }
  Alias_Game_Character_updateRoutineMove.call(this);
};

const Alias_Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function () {
  Alias_Game_Event_initMembers.call(this);
  this._comments = null;
  this._prevDir = null;
};

Game_Event.prototype.charaId = function () {
  return this.eventId();
};

Game_Event.prototype.notes = function (withComments) {
  const notes = this.event() ? this.event().note : "";
  return notes + (withComments ? this.comments() : "");
};

Game_Event.prototype.comments = function (withNotes) {
  let notes = "";
  if (this.event()) {
    notes = this.event().note;
  }
  return this._comments + (withNotes ? notes : "");
};

Game_Event.prototype.setupComments = function () {
  this._comments = "";
  if (this.page() && this.list()) {
    this._comments = this.list()
      .filter(function (list) {
        return list.code === 108 || list.code === 408;
      })
      .map(function (list) {
        return list.parameters;
      })
      .join("\n");
  }
};

const Alias_Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function () {
  const firstTime = this._prevDir === null;
  this._prevDir = this.direction();
  Alias_Game_Event_setupPage.call(this);
  const retainDir = /<retainDir>/i.test(this.comments(true));
  if (!firstTime && retainDir) {
    this.setDirection(this._prevDir);
  }
};

const Alias_Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
Game_Event.prototype.clearPageSettings = function () {
  Alias_Game_Event_clearPageSettings.call(this);
  this._comments = "";
};

const Alias_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function () {
  Alias_Game_Event_setupPageSettings.call(this);
  this.setupComments();
};

Game_Event.prototype.setSelfSwitch = function (selfSwitch, bool) {
  const mapId = this._mapId;
  const eventId = this._eventId;
  if (!mapId || !eventId) return;
  const key = [mapId, eventId, selfSwitch];
  $gameSelfSwitches.setValue(key, bool);
};

const Alias_Game_Event_updateSelfMovement =
  Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function () {
  if (!this.canMove()) return;
  Alias_Game_Event_updateSelfMovement.call(this);
};

const Alias_Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  if (this.QPlusCommand(command, QPlus$1.makeArgs(args))) {
    return;
  }
  Alias_Game_Interpreter_pluginCommand.call(this, command, args);
};

Game_Interpreter.prototype.QPlusCommand = function (command, args) {
  if (command.toLowerCase() === "wait") {
    let min = Number(args[0]);
    let max = Number(args[1]);
    if (!max) {
      max = min;
      min = 0;
    }
    const wait = Math.randomIntBetween(min, max);
    this.wait(wait);
    return true;
  }
  if (command.toLowerCase() === "globallock") {
    const level = Number(args[0]);
    const args2 = args.slice(1);
    const only = args2.indexOf("only");
    if (only !== -1) args2.splice(only, 1);
    const charas = args2.map(QPlus$1.getCharacter);
    const mode = only !== -1 ? 1 : 0;
    $gameMap.globalLock(charas, mode, level);
    return true;
  }
  return false;
};

/**
 * @param  {arr} charas
 *               array of characters
 * @param  {int} mode
 *               0 - ignore characters in charas arr
 *               1 - only apply to charas in charas arr
 * @param  {int} level
 *               0 - clear lock
 *               1 - lock movement
 *               2 - lock movement and character animation
 */
Game_Map.prototype.globalLock = function (charas, mode, level) {
  charas = charas || [];
  mode = mode === undefined ? 0 : mode;
  level = level === undefined ? 1 : level;
  if (mode === 0) {
    $gamePlayer._globalLocked = !charas.contains($gamePlayer) ? level : 0;
    const events = this.events();
    for (let i = 0; i < events.length; i++) {
      if (charas.contains(events[i])) continue;
      events[i]._globalLocked = level;
    }
  } else {
    for (let i = 0; i < charas.length; i++) {
      if (charas[i]) {
        charas[i]._globalLocked = level;
      }
    }
  }
};

// kept for backwars compatibility
Game_Map.prototype.globalUnlock = function (charas) {
  this.globalLock(charas, 0, 0);
};

Game_Map.prototype.noTilemap = function () {
  return $dataMap.meta && !!$dataMap.meta.noTilemap;
};

const Alias_Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function () {
  return (
    Alias_Game_Player_canMove.call(this) &&
    Game_Character.prototype.canMove.call(this)
  );
};

Game_Player.prototype.canClick = function () {
  return !TouchInput.insideWindow;
};

Game_Player.prototype.charaId = function () {
  return 0;
};

Game_Player.prototype.actor = function () {
  return $gameParty.leader();
};

Game_Player.prototype.notes = function () {
  return this.actor() ? this.actor().actor().note : "";
};

const Alias_Game_Temp_isDestinationValid = Game_Temp.prototype.isDestinationValid;
Game_Temp.prototype.isDestinationValid = function () {
  const valid = Alias_Game_Temp_isDestinationValid.call(this);
  return !TouchInput.insideWindow && valid;
};

const Alias_Scene_Base_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function () {
  Alias_Scene_Base_initialize.call(this);
  this._waitListeners = [];
  if (this.mixinWait()) {
    QPlus$1.mixinWait(this);
  }
};

Scene_Base.prototype.mixinWait = function () {
  // In your own scene, have this return true to be able to
  // use the .wait(duration, callback) function
  return false;
};

const Alias_Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;

Scene_Boot.prototype.startNormalGame = function () {
  if (_PARAMS["Quick Test"] && Utils.isOptionValid("test")) {
    Scene_Base.prototype.start.call(this);
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
  } else {
    Alias_Scene_Boot_startNormalGame.call(this);
  }
};

const Alias_Sprite_Character_updatePosition =
  Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function () {
  const prevY = this.y;
  const prevZ = this.z;
  Alias_Sprite_Character_updatePosition.call(this);
  if (this.y !== prevY || this.z !== prevZ) {
    if ($gameMap.noTilemap && this.parent && this.parent.requestSort) {
      this.parent.requestSort();
    }
  }
};

const Alias_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function () {
  if ($gameMap.noTilemap()) {
    this._tilemap = new SimpleTilemap();
    this._baseSprite.addChild(this._tilemap);
  } else {
    Alias_Spriteset_Map_createTilemap.call(this);
  }
};

const Alias_Spriteset_Map_loadTileset = Spriteset_Map.prototype.loadTileset;
Spriteset_Map.prototype.loadTileset = function () {
  if (!$gameMap.noTilemap()) {
    Alias_Spriteset_Map_loadTileset.call(this);
  }
};

const Alias_Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
Spriteset_Map.prototype.updateTilemap = function () {
  if (!$gameMap.noTilemap()) {
    Alias_Spriteset_Map_updateTilemap.call(this);
  }
};

var main = { ...QPlus$1, SimpleTilemap: SimpleTilemap$1 };

//-----------------------------------------------------------------------------
// Document body

document.body.ondrop = function (e) {
  e.preventDefault();
  return false;
};

document.body.ondragover = function (e) {
  e.preventDefault();
  return false;
};

PluginManager.registerCommand("Luna_QPlus", "wait", (args) => {
  let min = Number(args.min);
  let max = Number(args.max);
  if (!max) {
    max = min;
    min = 0;
  }

  const waitTime = Math.randomIntBetween(min, max);
  // @todo probably a much better way to do this
  $gameMap._interpreter.wait(waitTime);
});

return main;

}());
