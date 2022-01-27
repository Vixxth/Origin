//=============================================================================
// TAA_EventOffset.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.eo = {};
TAA.eo.Version = "1.1.0";
TAA.eo.PluginName = "TAA_EventOffset";
TAA.eo.alias = {};

/*:
 * @target MV MZ
 * 
 * @plugindesc [1.1.0] Event Position Offset
 * @author T. A. A. (taaspider)
 * @url http://taaspider.itch.io/ 
 * 
 * @help
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Any plugins developed by taaspider are free for use for both commercial and 
 * noncommercial RPG Maker games, unless specified otherwise. Just remember to
 * credit "Taaspider".
 * 
 * Redistribution of parts or the whole of taaspider plugins is forbidden, unless
 * it comes from the official website: http://taaspider.itch.io. You are allowed 
 * to edit and change the plugin code for your own use, but you're definitely not 
 * allowed to sell or reuse any part of the code as your own. Although not 
 * required to use my plugins, a free copy of your game would be nice!
 * 
 * If you enjoy my work, consider offering a donation when downloading my plugins, 
 * or offering a monthly pledge to my Patreon account. It would be of great help!
 * Also, follow me on facebook to get firsthand news on my activities!
 *  Facebook: https://www.facebook.com/taaspider 
 *  Patreon: https://www.patreon.com/taaspider
 * 
 * =============================================================================
 * Introduction
 * =============================================================================
 * 
 * WARNING: This plugin requires RPG Maker MV 1.5.0 or above! Please make sure 
 * your RPG Maker MV software is up to date before using this plugin.
 * You don't need any specific version if you're using MZ.
 * 
 * -----------------------------------------------------------------------------
 * 
 * This is a simple utility plugin that allows you to have more control over the
 * event position in a tile, so that it can have a perfect placement in the scene.
 * For example, it can be used to place the event a few pixels up and make it fit
 * better like it is sitting on a chair, or a few pixels to the right, to hide 
 * behind a tree or an ornamental plant.
 * 
 * =============================================================================
 * Instructions
 * =============================================================================
 * 
 * The plugin has no parameters and all usage is done through event notes or
 * comment tags. It's important to know that comment tags have precedence over
 * note tags. That means that if you setup an event page with a different offset
 * value then its note field, whenever that page becomes active it will overwrite
 * the note settings.
 * 
 * Both tagging methods use the same syntax:
 *      <TAA_EO: x={op}{n}; y={op}{m}>
 *      <TAA_EO: x={op}{n}.{w}; y={op}{m}.{k}>
 * 
 * {op} can be replaced by one of the following operands: + (sum), - (subtraction),
 * * (multiplication), / (division). You can also omit it entirely, which means the
 * exact coordinate will be used.
 * 
 * {n} and {m} are integers, while {w} and {k} are used for precision placement 
 * inside the tile itself. If {w} and {k} is omitted or set as zero, it would 
 * represent the tile center coordinates, while any value greater than zero (along
 * an operand, like + or -) would describe coordinates inside the same tile.
 * 
 * Let's say, for example, that you want the event to be placed above its central
 * coordinates, but halfway from the tile upper border:
 *      <TAA_EO: y=-0.5>
 * or even make it also halfway from the tile left border:
 *      <TAA_EO: x=-0.5; y=-0.5>
 * 
 * You can also replace any of the numeric parameters ({m}, {n}, {w} or {k}) with
 * a variable value. To do that, use the tag v[{var num}]. For example, to use
 * variables one and two to fine tune the event position, considering that their
 * value hold the event position inside the tile:
 *      <TAA_EO: x=-0.v[1]; y=-0.v[2]>
 * 
 * In another example, the event can also be moved to coordinates specified by the
 * same said variables, without the use of operands:
 *      <TAA_EO: x=v[1]; y=v[2]>
 * 
 * Or even use four variables to control every aspect of the event's position:
 *      <TAA_EO: x=v[1].v[2]; y=v[3].v[4]>
 * 
 * If using variables, keep in mind that values must be positive and it is more 
 * limited. For example, setting a variable to 1, 10 or 100 and using it as your
 * decimal value (the value after the dot) will provide the same result: in either
 * case it will translate to .1. I might consider changing this behavior in the
 * future if the need arises.
 * 
 * As of version 1.1.0, a new optional command has been added to the comment tags:
 *      <TAA_EO: x={op}{n}; y={op}{m}; discard>
 *      <TAA_EO: x={op}{n}.{w}; y={op}{m}.{k}; discard>
 * 
 * If the "discard" option is present, the plugin will ignore and discard any 
 * previously saved event offset coordinates and enforce the coordinates defined
 * on the tag. If the option is not present and there are saved coordinates for 
 * the event, the coordinates defined in the tags may be overwritten by the saved 
 * ones.
 * 
 * ----------------------------------------------------------------------------
 * OFFSET MOVE ROUTE COMMANDS
 * ----------------------------------------------------------------------------
 * 
 * Starting on version 1.1.0, you can use offset move route commands to make an
 * event move into or out of an offsetted position. There's a few things you need
 * to know before using this feature:
 *  - Offset move commands do not change the event direction. If you want the event
 *    to face a specific direction when using this commands you need to first make
 *    it turn to the desired direction, then execute the offset move.
 *  - An offset move command will automatically save the new event position, so
 *    that it will maintain its position if the player leaves the map and comes 
 *    back later. If you don't want this position to be remembered, you need to
 *    add an offset move route command to disable it BEFORE the move command.
 *  - If you want an event page to discard any previously saved offset positions,
 *    remember to add the "discard" clause to the comment tags.
 *  - Every time an event page is loaded, the option to save the offsetted position
 *    after an offset move route command is reenabled. So be sure to remember to
 *    disable it before adding move route commands. After this option has been
 *    disabled once, all next move routes won't be saved until it is reenabled.
 *  - Offset move route commands WON'T work for the player. The plugins functions
 *    were designed to work only on events.
 * 
 * To use offset move route commands, use the "Script" option in the move route
 * window and enter one of the following available commands:
 *  OFFSET: ENABLE SAVE
 *      Enables the plugin to save the result of offset move route commands. for
 *      the target event.
 * 
 *  OFFSET: DISABLE SAVE
 *      Prevents the plugin to save the result of the next offset move route 
 *      commands for the target event.
 * 
 *  OFFSET: DISCARD SAVE
 *      Discard any saved offset values for the target event.
 * 
 *  OFFSET: FIX
 *      "Fixes" the offset by returning the event to its "normal" position.
 * 
 *  OFFSET: N.N; N.N
 *      Moves the event to the defined offset position. N.N represents a number,
 *      which can be either positive or negative. This represents the distance to
 *      move the event inside the tile starting on its current position (which means
 *      offset move route commands can be stacked to progressively move the event).
 *      Here's a few examples:
 *          OFFSET: -0.1; 0.0
 *              Moves the event 10% of a tile to the left, and keeps the Y 
 *              coordinate unchanged.
 *          OFFSET: 0.5; 0.5
 *              Moves the event halfway right and down into the tile.
 *          OFFSET: 0; 0
 *              Same effect as OFFSET: FIX, returns the event to its "unoffsetted"
 *              position.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.0.0:
 *  - Initial release
 * Version 1.0.1:
 *  - Fixed an issue which would crash the game if using a "Erase Event" command
 * Version 1.0.2:
 *  - Fixed an issue that would cause game crash if none of the event pages conditions
 *    are met (for example, have an event with a single page to load only when switch 1
 *    is ON. If it is OFF, the game would crash);
 * Version 1.0.3:
 *  - Fixed an issue that could cause offsetted events to have no collision with
 *    characters;
 * Version 1.1.0:
 *  - Fixed a bug that would cause the original position of a moving event to become
 *    impassable to the player or other events;
 *  - Fixed an issue that would prevent an offsetted event to move with a move route
 *    command;
 *  - Added move route commands to move a character into an offsetted position;
 *  - Added commands to save / load offset values if the player leaves the map and
 *    comes back. Also added commands to enable / disable this setting;
 * 
 * ============================================================================
 * End of Help
 * ============================================================================
 */

//=============================================================================
// Game_System
//=============================================================================

TAA.eo.alias.Game_System = TAA.eo.alias.Game_System || {};
TAA.eo.alias.Game_System.initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    TAA.eo.alias.Game_System.initialize.call(this);
    this.initSavedEventOffsetStates();
};

Game_System.prototype.initSavedEventOffsetStates = function(){
    this._evtOffsetValues = {};
};

Game_System.prototype.hasSavedOffsetValue = function(map, event){
    if(isNaN(map) || isNaN(event)) return false;
    if(this._evtOffsetValues[map] && this._evtOffsetValues[map][event]) return true;
    return false;
};

Game_System.prototype.saveEventOffsetValue = function(map, event, ox, oy){
    if(isNaN(map) || isNaN(event) || isNaN(ox) || isNaN(oy)) return;
    this._evtOffsetValues[map] = this._evtOffsetValues[map] || {};
    this._evtOffsetValues[map][event] = this._evtOffsetValues[map][event] || {};
    this._evtOffsetValues[map][event].offsetX = ox;
    this._evtOffsetValues[map][event].offsetY = oy;
};

Game_System.prototype.loadEventOffsetValue = function(map, event){
    if(!this.hasSavedOffsetValue(map, event)) return undefined;
    return [this._evtOffsetValues[map][event].offsetX, this._evtOffsetValues[map][event].offsetY];
};

Game_System.prototype.clearSavedOffsetValue = function(map, event){
    if(isNaN(map) || isNaN(event)) return;
    if(this._evtOffsetValues[map] && this._evtOffsetValues[map][event]) delete this._evtOffsetValues[map][event];
};

Game_System.prototype.isEventOffsetted = function(id){
    if(isNaN(id) || id <= 0) return false;
    let event = $gameMap._events[id];
    return event.hasOffset();
};

//=============================================================================
// Game_Event
//=============================================================================

TAA.eo.alias.Game_Event = TAA.eo.alias.Game_Event || {};
TAA.eo.alias.Game_Event.initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId){
    TAA.eo.alias.Game_Event.initialize.call(this, mapId, eventId);
    this._originalX = this._x;
    this._originalY = this._y;
    this._hasOffset = false;
    this._saveOffsetMove = true;
    this._offsetX = 0;
    this._offsetY = 0;
    if(this._pageIndex >= 0) {
        this.offsetByNote();
        this.offsetByComments();
    }
    this.loadSavedOffsetValues();
    this._initialized = true;
};

Game_Event.prototype.loadSavedOffsetValues = function(){
    var offsetArray = $gameSystem.loadEventOffsetValue($gameMap.mapId(), this.eventId());
    if(!offsetArray) return;
    this._offsetX = offsetArray[0];
    this._offsetY = offsetArray[1];
    this._x = this._originalX + this._offsetX;
    this._y = this._originalY + this._offsetY;
    if(this._offsetX !== 0 || this._offsetY !== 0) this._hasOffset = true;
};

Game_Event.prototype.saveEventOffsetValue = function(){
    const map = $gameMap.mapId();
    const id = this.eventId();
    $gameSystem.saveEventOffsetValue(map, id, this._offsetX, this._offsetY);
};

Game_Event.prototype.discardSavedOffset = function(){
    const map = $gameMap.mapId();
    const id = this.eventId();
    $gameSystem.clearSavedOffsetValue(map, id);
};

Game_Event.prototype.offsetByNote = function(){
    var note = this.event().note;
    if(note.match(/<TAA[_ ]EO:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*;?(?:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*)?>/gi)){
        var x = new String(this.x);
        var y = new String(this.y);
        if(['x', 'X'].contains(RegExp.$1)) x = RegExp.$2;
        else if(['x', 'X'].contains(RegExp.$3)) x = RegExp.$4;
        if(['y', 'Y'].contains(RegExp.$1)) y = RegExp.$2;
        else if(['y', 'Y'].contains(RegExp.$3)) y = RegExp.$4;
        this.offsetMath(x, y);
    }
};

Game_Event.prototype.offsetByComments = function(){
    var pageList = this.list();
    var tagFound = false;
    var i = 0;
    while(i < pageList.length && !tagFound){
        var page = pageList[i];
        if(page.code === 108 || page.code === 408){
            if(page.parameters[0].match(/<TAA[_ ]EO:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*;?(?:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*)?(?:\s*;\s*(discard))?>/gi)){
                var x = new String(this.x);
                var y = new String(this.y);
                if(['x', 'X'].contains(RegExp.$1)) x = RegExp.$2;
                else if(['x', 'X'].contains(RegExp.$3)) x = RegExp.$4;
                if(['y', 'Y'].contains(RegExp.$1)) y = RegExp.$2;
                else if(['y', 'Y'].contains(RegExp.$3)) y = RegExp.$4;
                if((RegExp.$5).toLowerCase() === 'discard')
                    this.discardSavedOffset();
                this.offsetMath(x, y);
                tagFound = true;
            }
        }
        i++;
    }
};

Game_Event.prototype.offsetMath = function(x, y){
    var newX = 0;
    var newY = 0;
    this._x = this._originalX;
    this._y = this._originalY;
    if(x === undefined || x === "")
        newX = this.x;
    else if(x.match(/([\+\-\*\/]?)([0-9]+|v\[[0-9]+\])[\.]?([0-9]*|v\[[0-9]+\])?/)){
        var op = RegExp.$1;
        var num1 = RegExp.$2;
        var num2 = RegExp.$3;
        var defaultValue = (op !== undefined && op !== "") ? 0 : this.x;
        num1 = this.getOffsetFromVariable(num1, defaultValue);
        num2 = this.getOffsetFromVariable(num2, "0");
        if(op === undefined || op === "") newX = eval(num1 + "." + num2);
        else newX = eval("this.x " + op + " " + num1 + "." + num2);
    }
    else {
        newX = x;
    }
    if(y === undefined || y === "")
        newY = this.y;
    else if(y.match(/([\+\-\*\/]?)([0-9]+|v\[[0-9]+\])[\.]?([0-9]*|v\[[0-9]+\])?/)){
        var op = RegExp.$1;
        var num1 = RegExp.$2;
        var num2 = RegExp.$3;
        var defaultValue = (op !== undefined && op !== "") ? 0 : this.y;
        num1 = this.getOffsetFromVariable(num1, defaultValue);
        num2 = this.getOffsetFromVariable(num2, "0");
        if(op === undefined || op === "") newY = eval(num1 + "." + num2);
        else newY = eval("this.y " + op + " " + num1 + "." + num2);
    }
    else {
        newY = y;
    }
    this._x = (!isNaN(newX) && newX >= 0) ? newX : this._x;
    this._y = (!isNaN(newY) && newY >= 0) ? newY : this._y;
    if(this._originalX !== this._x || this._originalY !== this._y) this._hasOffset = true;
    this._offsetX = parseFloat((this._x - this._originalX).toFixed(2));
    this._offsetY = parseFloat((this._y - this._originalY).toFixed(2));
};

Game_Event.prototype.getOffsetFromVariable = function(num, defaultValue){
    if(num !== undefined && num.match(/v\[([0-9]+)\]/i)){
        var varNum = parseInt(RegExp.$1);
        if(isNaN(varNum)) num = defaultValue;
        else num = $gameVariables.value(varNum);
    }
    return (isNaN(num)) ? defaultValue : num;
};

TAA.eo.alias.Game_Event.setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function(){
    TAA.eo.alias.Game_Event.setupPage.call(this);
    if(this._pageIndex >= 0 && this._initialized) {
        this.offsetByComments();
        // offset save is reset every time an event page is loaded
        this._saveOffsetMove = true;
    }
};

TAA.eo.alias.Game_Event.pos = Game_Event.prototype.pos;
Game_Event.prototype.pos = function(x, y) {
    return (this._hasOffset && this._originalX === x && this._originalY === y) || TAA.eo.alias.Game_Event.pos.call(this, x, y);
};

TAA.eo.alias.Game_Event.moveStraight = Game_Event.prototype.moveStraight;
Game_Event.prototype.moveStraight = function(d) {
    TAA.eo.alias.Game_Event.moveStraight.call(this, d);
    if (this.isMovementSucceeded() && this._hasOffset) {
        this._originalX = Math.round(this._x - this._offsetX);
        this._originalY = Math.round(this._y - this._offsetY);
    }
};

TAA.eo.alias.Game_Event.isMapPassable = Game_Event.prototype.isMapPassable;
Game_Event.prototype.isMapPassable = function(x, y, d) {
    if(this._hasOffset){
        x = Math.round(this._x - this._offsetX);
        y = Math.round(this._y - this._offsetY);
    }

    return TAA.eo.alias.Game_Event.isMapPassable.call(this, x, y, d);
};

Game_Event.prototype.enableOffsetSave = function(){
    this._saveOffsetMove = true;
};

Game_Event.prototype.disableOffsetSave = function(){
    this._saveOffsetMove = false;
};

Game_Event.prototype.isOffsetSaveEnabled = function(){
    return this._saveOffsetMove;
};

TAA.eo.alias.Game_Event.processMoveCommand = Game_Event.prototype.processMoveCommand;
Game_Event.prototype.processMoveCommand = function(command) {
    var param = command.parameters !== undefined ? command.parameters[0] : "-";
    if(Game_Character.ROUTE_SCRIPT === command.code && param.match(/^\s*OFFSET\s*:\s*/i)){
        if(param.match(/OFFSET\s*:\s*(ENABLE|DISABLE|DISCARD)\s+SAVE/i)){
            var op = (RegExp.$1).toLocaleLowerCase();
            if(op === 'enable')
                this.enableOffsetSave();
            else if(op === 'disable')
                this.disableOffsetSave();
            else if(op === 'discard')
                this.discardSavedOffset();
        }
        else if(param.match(/OFFSET\s*:\s*FIX/i)){
            this.removeOffsetValue();
        }
        else if(param.match(/OFFSET\s*:\s*([\-\+]?[0-9]+(?:\.[0-9]+)?)\s*[,;]\s*([\-\+]?[0-9]+(?:\.[0-9]+)?)/i)){
            var offX = parseFloat(RegExp.$1);
            var offY = parseFloat(RegExp.$2);
            this.moveToOffset(offX, offY);
        }
    }
    else{
        TAA.eo.alias.Game_Event.processMoveCommand.call(this, command);
    }
};

Game_Event.prototype.removeOffsetValue = function(){
    var x = this._originalX;
    var y = this._originalY;

    if(x !== this._x)
        var d = x < this._x ? 4 : 6;
    else
        var d = 5;
    if(y !== this._y)
        d = y < this._y ? d + 3 : d - 3;

    if(d !== 5){
        this.setMovementSuccess(true);
        this._x = x;
        this._y = y;
        this._offsetX = 0;
        this._offsetY = 0;
        this._hasOffset = false;
        this.increaseSteps();
    }
};

Game_Event.prototype.moveToOffset = function(ox, oy){
    this.setMovementSuccess(true);
    this._x += ox;
    this._y += oy;
    
    this._offsetX += ox;
    this._offsetY += oy;
    if(this._offsetX !== 0 || this._offsetY !== 0) this._hasOffset = true;
    else this._hasOffset = false;
    if(this.isOffsetSaveEnabled())
        this.saveEventOffsetValue();
    this.increaseSteps();
};

Game_Event.prototype.hasOffset = function(){
    return this._hasOffset;
};