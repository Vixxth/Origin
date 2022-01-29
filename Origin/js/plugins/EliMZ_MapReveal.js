//============================================================================
// Eli_MapReveal.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v3.0.0 - Cover and reveal a map as player walks!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-reveal-map-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

• Inspired by the game Fatal Labyrinth for Mega Drive, I have created this 
plugin that can cover a map and let the player reveals it as he moves!

============================================================================
Features
============================================================================

• Cover the tiles marked by regions with a 48x48 image of your preference.
• Can choose the regions that will do the cover.
• Player can reveal these tiles as he moves!
• Set the range, in tiles, that the player is able to reveal when he moves
(through a variable value!).
• Set the revealing form to square, diamond, linear, or region!
• There is a special reveal form "OneRegion" That only reveals the 
player's region! All other ones stay covered!
• Can reveal or hide regions at once.
• Can hide and reveal tiles by coordinates too!
• Events can also reveal/hide the map!

============================================================================
How to use
============================================================================

• First of all, create an image with the size of 48x48 and save it in the 
system's folder. Then set it on the plugin parameter "Cover Image".

• Choose a default value for the revealing form in the parameters:
• Square - Reveal the tiles with a square range.
• Diamond - Reveal the tiles with a diamond range.
• Linear - Reveal the tiles in a straight line range.
• Region - reveal all tiles in a region at once.
• One Region - This is a special reveal form that will only reveal the 
player's region tiles. 
When the player leaves this region, it will cover that and reveal the other 
that the player has moved in.

• Choose a variable to hold the range value, in tiles.

• You can also change the visibility parameter to reveal tiles instantly
(toggle) or using a fading effect(That I made just for fun).

• Paint your map with regions in the place you want to be covered. As the 
player moves, he will reveal the tiles based on his range value. 
You can use only one region if you want, but using more will make it easy 
when you want to reveal or hide one specific place.

• Finally, set a note tag in your map if you want it to use the cover 
feature: <CoverMap> (It's not case sensitive).

• You can use plugin commands to cover/reveal tiles by coordinates, event 
positions, and regions.

NOTE¹: For now it's advised to use only with tiles 48x48 and resolutions 
divisible by 48.

NOTE²: After 80x80 covered tiles, sometimes I had experienced fps drops.
That does not mean you cannot use it on a map with more than 80X80. It 
means that maybe you will have fps drops with more than 80x80 tiles 
painted.
It will also depend on the machine running it.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

============================================================================
Update log
============================================================================
Version 3.0.0 - 08/19/2021
- You can set the Cover regions parameter by range now. Example: 1-10
(All regions between and including 1 and 10 will be used for cover)
- Code clean up.
- Need Eli Book 4.0.0 now.
Version 2.0.1 - 12/25/2020
- Fixed an error when initializing the valid regions when it has only one 
region in the plugin parameter.
Version 2.0.0 - 12/21/2020
- Adapted to work with Eli Book 3.0.0.
- Hopefully the fade visibility mode will properly work now with the 
Reveal form "Cover One Region" and "Cover Region".
- Add a parameter to set a minimum value for the reveal range.
- Fixed a bug that the player was unable to reveal the map via move route 
commands.
- Performance improvements.
Version 1.1.0 - 12/01/2020
- Add feature that events can also reveal/cover the map.
Version 1.0.0 - 11/05/2020
- Public release!
Version 0.1.0 - 10/06/2020
- Beta release!

@param regions
@text Cover regions
@type text
@desc Choose regions that you want to be covered. Separate with a comma ",". Or set a range using "-": 1-10
@default 1-10

@param image
@text Cover image
@type file
@dir img/system
@desc Choose an image to be used to cover the tiles.
@require 1

@param coverForm
@text Reveal Form
@type select
@option Square
@value coverSquare
@option Diamond
@value coverDiamond
@option Linear
@value coverLinear
@option Region
@value coverRegion
@option OneRegion
@value coverOneRegion
@desc Choose how the player will reveal tiles.
@default coverSquare

@param rangeId
@text Range value(by id)
@type variable
@desc Choose the variable Id that will hold the range value, in tiles.
@default 0

@param minRange
@text Minimum range
@type number
@desc Set a minimum value for the range, in case the variable was not setted.
@default 0
@parent rangeId

@param visibility
@text Visibility Mode
@type select
@option toggle
@option fade
@desc Choose how the visibility will change. If you choose fade, you have to config the fade speed.
@default toggle

@param fadeSpeed
@text Fade speed
@type number
@min 1
@max 255
@desc Choose how much opacity the sprite will lose per frame.
@default 1
@parent visibility

@command cmd_Cover
@text Cover/Reveal
@desc Cover or reveal tiles.

    @arg status
    @text Cover or reveal?
    @type boolean
    @desc True to cover a tile, false to reveal a tile.
    @default false

    @arg coverForm
    @text Reveal form
    @type select
    @option cover
    @option coverSquare
    @option coverLinear
    @option coverDiamond
    @desc Select a reveal form.
    @default coverSquare

    @arg range
    @text Range
    @type number
    @desc Choose a range to cover/reveal from the coordinates.
    @default 1

    @arg coordinates
    @text Coordinates
    @type text
    @desc Separate x and y with a comma. Can use formulas and \v[id].
    @default 0,0

    @arg event
    @text Event Coordinates
    @type text
    @desc Optionally cover/reveal a event coordinate.
    @default 0

@command cmd_CoverRegion
@text Region Cover/Reveal
@desc Cover/Reveal an entire region.

    @arg regionId
    @text Region Id
    @type number
    @desc The region Id to cover/uncover.
    @default 0

    @arg status
    @text Cover or reveal?
    @type boolean
    @desc True to cover a tile, false to reveal a tile.
    @default false

@command cmd_CoverAll
@text Cover/Reveal all Tiles
@desc You can cover or reveal all tiles at once.

    @arg status
    @text Cover or reveal?
    @type boolean
    @desc True to cover a tile, false to reveal a tile.
    @default false

    @command cmd_EventReveal
    @text Enable event reveal
    @desc You can enable some events to reveal map too.

    @arg eventId
    @text Event Id
    @type text
    @desc An event id.
    @default 1

    @arg revealRange
    @text Reveal range
    @type text
    @desc The number of tiles that the event will cover/reveal.
    @default 1

    @arg coverForm
    @text Reveal Form
    @type select
    @option cover
    @option coverSquare
    @option coverLinear
    @option coverDiamond
    @desc Select a reveal form
    @default coverSquare

    @arg coverStatus
    @text Reveal or Hide
    @type boolean
    @desc True for cover the map. False to reveal the map.
    @default false

@command cmd_disableEventReveal
@text Disable event reveal
@desc You can enable some events to reveal map too.

    @arg eventId
    @text Event Id
    @type text
    @desc An event id.
    @default 1

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MapReveal = true

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const srcScript = document.currentScript.src
        const start = srcScript.lastIndexOf("/") + 1
        const end = srcScript.lastIndexOf(".js")
        const pluginName = srcScript.substring(start, end)

        return pluginName
    })()
    const requiredVersion = ['4','0','0']
    const updateWarning = `${pluginName} needs the EliMZ_Book ${requiredVersion} version.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    }
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook()
            Eli.alert = true
        }
    }

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook()
            Eli.alert = true
        }
    }
    
    if(!Imported.Eli_Book) needInstallBook()
    if(Eli.Book.Version < requiredVersion) needUpdateBook()
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.MapReveal = {

    parameters: {
        regions: '',
        image: '',
        coverForm: '',
        rangeId: 0,
        minRange: 0,
        visibility: '',
        fadeSpeed: 0
    },
    alias: {},
    validRegions: [],
    visibilityMethod: '',
    fadeSpeed: 0,
    coordinates: [],
    regionCoordinates: {},
    regionToRefresh: 0,
    regionHistory: [],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.initProperties()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = [
            'cmd_Cover', 'cmd_CoverRegion', 'cmd_CoverAll', 
            'cmd_EventReveal', 'cmd_disableEventReveal'
        ]
        Eli.PluginManager.registerCommands(this, commands)
    },

    initProperties(){
        const regions = String(this.param().regions)
        if(regions.includes("-")){
            const [start, end] = regions.split('-').map(item => Number(item))
            const max = (end + 1) - start
            this.validRegions = Array.from({length: max}, (_, i) => i + start)
        }else{
            this.validRegions = regions.split(',').map(item => Number(item))
        }
        
        this.visibilityMethod = this.param().visibility+'Visibility'
        this.fadeSpeed = this.param().fadeSpeed
    },

    param(){
        return this.parameters
    },
    
    data(){
        return $eliData.mapReveal().maps
    },

    mapTileStatus(){
        return $eliData.mapReveal().maps[this.mapId()]
    },

    image(){
        return $eliData.mapReveal().image
    },

    changeImage(value){
        $eliData.mapReveal().image = value
    },

    mapId(){
        return $gameMap.mapId()
    },

    needMapSetup(){
        return !this.data().hasOwnProperty(this.mapId())
    },

    setup(){
        this.startCoordinates()
        this.startRegionHistory()
        this.setupCoordinates()
        this.setupMap()
    },

    startCoordinates(){
        this.coordinates = []
        for(const id of this.getValidRegions()){
            this.regionCoordinates[id] = []
        }
    },

    startRegionHistory(){
        this.regionHistory = [0, 0]
    },

    setupCoordinates(){

        for(let x = 0, w = $dataMap.width; x < w; x++){
    
            for(let y = 0, h = $dataMap.height; y < h; y++){
                const regionId = $gameMap.regionId(x, y)
    
                if(this.isValidRegion(regionId)){
                    const strCoordinate = `${x},${y}`
                    const intCoordinate = [x, y]
                    
                    this.coordinates.push(strCoordinate)
                    this.regionCoordinates[regionId].push(intCoordinate)
                }
            }
        }
    },

    setupMap(){
        if(this.needMapSetup()){
            const length = this.getCoordinates().length
            this.data()[this.mapId()] = new Array(length).fill(true)
        }
    },

    getTileStatusById(id){
        return this.mapTileStatus()[id]
    },

    getTileStatusByCoordinates(x, y){
        const coordinate = `${Math.abs(x)},${Math.abs(y)}`
        const tile = this.getCoordinates().indexOf(coordinate)
        const tileStatus = this.mapTileStatus()[tile]
        
        return tileStatus
    },

    changeTileStatus(tileId, value){
        this.mapTileStatus()[tileId] = value
    },

    findTileId(x, y){
        const coordinate = `${Math.abs(x)},${Math.abs(y)}`
        const tileId = this.getCoordinates().indexOf(coordinate)

        return tileId
    },

    cover(x, y, cover){
        const tileId = this.findTileId(x, y)
        this.changeTileStatus(tileId, cover)
    },

    coverSquare(x, y, dist, cover){
        for(let cx = x - dist, maxCx = x + dist; cx <= maxCx; cx++){

            for(let cy = y - dist, maxCy = y + dist; cy <= maxCy; cy++){
                this.cover(cx, cy, cover)
            }
        }
    },

    coverLinear(x, y, dist, cover){
        for(let i = -dist; i <= dist; i++){
            this.cover(x+i, y, cover)
            this.cover(x-i, y, cover)
            this.cover(x, y-i, cover)
            this.cover(x, y+i, cover)
        }
    },
    
    coverDiamond(x, y, dist, cover){
        for (let cx = x - dist, maxCx = x + dist; cx <= maxCx; cx++) {

            for (let cy = y - dist, maxCy = y + dist; cy <= maxCy; cy++) {

                if (Math.abs(cx - x) + Math.abs(cy - y) <= dist){
                    this.cover(cx, cy, cover)
                }
            }
        }
    },

    coverRegion(regionId, cover){
        const regionCoord = this.getRegionCoordinates()[regionId] || []

        for(const coordinate of regionCoord){
            const [x, y] = coordinate
            this.cover(x, y, cover)
        }

    },

    coverOneRegion(){
        const oldRegion = this.regionHistory[0]
        this.regionHistory[1] = $gamePlayer.regionId()

        if(oldRegion !== this.regionHistory[1]){
            this.coverRegion(this.regionHistory[1], false)
            
            if(this.isValidRegion(oldRegion)){
                this.coverRegion(oldRegion, true)
            }

            this.updateRegionHistory()
        }
    },

    coverFogOfWar(){
        //this is useless, sorry
    },

    updateRegionHistory(){
        this.regionHistory.shift()
        this.regionHistory.push($gamePlayer.regionId())
    },
    
    coverAll(cover){
        this.mapTileStatus().fill(cover)
    },
    
    getCoordinates(){
        return this.coordinates
    },

    getRegionCoordinates(){
        return this.regionCoordinates
    },

    getVisibilityMethod(){
        return this.visibilityMethod
    },
    
    refresh(value){
        this._needRefresh = value
    },

    needRefresh(){
        return this._needRefresh
    },

    getFadeSpeed(){
        return this.fadeSpeed
    },
    
    setFadeSpeed(value){
        this.fadeSpeed = value.clamp(1, 255)
    },
    
    getValidRegions(){
        return this.validRegions
    },

    isValidRegion(regionId){
        return this.validRegions.includes(regionId)
    },

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */

    cmd_Cover(args){
        const status = args.status === 'true'
        const range = Number(args.range)
        const eventId = Number(args.event)

        if(eventId > 0){
            const event = $gameMap.event(eventId)
            const x = event.x
            const y = event.y
            this[args.coverForm](x, y, range, status)

        }else{
            let [x, y] = args.coordinates.split(",")
            x = Eli.Utils.processEscapeVarOrFormula(x)
            y = Eli.Utils.processEscapeVarOrFormula(y)
            this[args.coverForm](Number(x), Number(y), range, status)
        }

        this.refresh(status)
    },

    cmd_CoverRegion(args){
        const regionId = Number(args.regionId)
        const status = args.status === 'true'

        this.coverRegion(regionId, status)
    },

    cmd_CoverAll(args){
        const status = args.status === 'true'
        this.coverAll(status)
        this.refresh(status)
    },

    cmd_EventReveal(args){
        const event = $gameMap.event(Number(args.eventId))

        if(event){
            const range = Number(args.revealRange)
            const status = args.coverStatus === 'true'

            event.changeCoverForm(args.coverForm)
            event.setRevealRange(range)
            event.setCoverStatus(status)
            event.enableReveal(true)
        }
    },

    cmd_disableEventReveal(args){
        const event = $gameMap.event(Number(args.eventId))
        if(event){
            event.enableReveal(false)
        }
    }

}

const Plugin = Eli.MapReveal
const Alias = Eli.MapReveal.alias

Plugin.initialize()

/* -------------------------------- SAVE DATA ------------------------------- */
{

Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.createNewContent('mapReveal')
    this.contents.mapReveal = { maps: {}, image: Plugin.param().image }
}

Eli_SavedContents.prototype.mapReveal = function(){
	return this.contents.mapReveal
}

}

/* ----------------------------- GAME VARIABLES ----------------------------- */

Game_Variables.prototype.revealValue = function() {
    const varValue = this.value(Plugin.param().rangeId)
    const minValue = Plugin.param().minRange

    return Math.max(minValue, varValue)
}

/* -------------------------------- GAME MAP -------------------------------- */

{

Alias.Game_Map_initialize = Game_Map.prototype.initialize
Game_Map.prototype.initialize = function() {
    Alias.Game_Map_initialize.call(this)
    this._isFogMap = false
}

Alias.Game_Map_setup = Game_Map.prototype.setup
Game_Map.prototype.setup = function(mapId) {
    Alias.Game_Map_setup.call(this, mapId)
    this._isFogMap = $dataMap.note && $dataMap.note.toLowerCase().includes('covermap') || false
    this.setupFog()
}

Game_Map.prototype.setupFog = function(){
    if(this.isFogMap()) {
        Plugin.setup()
    }
}

Game_Map.prototype.isFogMap = function(){
    return this._isFogMap
}

}

/* ------------------------------- GAME PLAYER ------------------------------ */

{

Alias.Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function() {
    Alias.Game_Player_increaseSteps.call(this)
    this.revealMap($gameMap.isFogMap(), this.x, this.y)
}

Game_Player.prototype.revealMap = function(flag, x, y){
    const isCoverMap = {true: 'reveal', false: 'notReveal'}
    const method = isCoverMap[flag]
    const distance = $gameVariables.revealValue()
    const coverForm = this.coverForm()

    return this[method](coverForm, x, y, distance)
}

Game_Player.prototype.reveal = function(coverForm, x, y, distance){
    if(coverForm.includes('Region')){
        Plugin[coverForm](this.regionId(), false)
    }else{
        Plugin[coverForm](x, y, distance, false)
    }
}

Game_Player.prototype.notReveal = function(){}

Game_Player.prototype.coverForm = function(){
    return Plugin.param().coverForm
}

}

/* ------------------------------- GAME EVENT ------------------------------- */
{

Alias.Game_Event_initialize = Game_Event.prototype.initialize
Game_Event.prototype.initialize = function(mapId, eventId) {
    Alias.Game_Event_initialize.call(this, mapId, eventId)
    this.initCoverMembers()
}

Game_Event.prototype.initCoverMembers = function(){
    this._canReveal = false
    this._revealRange = 1
    this._coverForm = 'coverSquare'
    this._coverStatus = true
}

Alias.Game_Event_increaseSteps = Game_Event.prototype.increaseSteps
Game_Event.prototype.increaseSteps = function() {
    Alias.Game_Event_increaseSteps.call(this)
    if(this.canReveal()){
        this.reveal()
    }
}

Game_Event.prototype.reveal = function(){
    Plugin[this._coverForm](this._x, this._y, this._revealRange, this._coverStatus)
}

Game_Event.prototype.canReveal = function(){
    return this._canReveal
}

Game_Event.prototype.enableReveal = function(value){
    this._canReveal = value
}

Game_Event.prototype.changeCoverForm = function(value){
    this._coverForm = value
}

Game_Event.prototype.setCoverStatus = function(value){
    this._coverStatus = value
}

Game_Event.prototype.setRevealRange = function(value){
    this._revealRange = value
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_beforeStart = Scene_Map.prototype.beforeStart
Scene_Map.prototype.beforeStart = function(){
    Alias.Scene_Map_beforeStart.call(this)
    this.initialReveal()
}

Scene_Map.prototype.initialReveal = function(){
    const player = $gamePlayer
    player.revealMap($gameMap.isFogMap(), player.x, player.y)
}

}

/* ------------------------------ SPRITESET MAP ----------------------------- */

Alias.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer
Spriteset_Map.prototype.createLowerLayer = function() {
    Alias.Spriteset_Map_createLowerLayer.call(this)
    this.createCoverContainer()
}

Spriteset_Map.prototype.createCoverContainer = function() {
    if($gameMap.isFogMap()) {
        this._fogContainer = new Eli.MapReveal.Sprite_Container()
        this.addChild(this._fogContainer)
    }
}

/* ------------------------------ FOG CONTAINER ----------------------------- */

Eli.MapReveal.Sprite_Container = class extends Sprite {

    constructor(){
        super()
    }

    initialize(){
        super.initialize()
        this.initializePlus()
    }

    initializePlus(){
        this.coordinates = Plugin.getCoordinates().map(item => item.split(","))

        this.move(0, 0)
        this.setVisibilityUpdateMethod()
        this.createCovers()
    }

    setVisibilityUpdateMethod(){
        this.visibilityMethod = Plugin.getVisibilityMethod()
        
        if($gamePlayer.coverForm() === 'coverOneRegion'){
            this.visibilityMethod += "WithCoverOneRegion"
        }
    }

    createCovers(){
        const coordinates = this.coordinates
        const image = ImageManager.loadSystem(Plugin.image())

        for(let i = 0, l = coordinates.length; i < l; i++){
            const [x, y] = coordinates[i]
            
            if(Plugin.getTileStatusById(i)){
                const cover = new Eli.MapReveal.Sprite_CoverTile(Number(x), Number(y), image, i, this.visibilityMethod)
                this.addChild(cover)
            }
        }
    }

    refreshAllCovers(){
        if(Plugin.needRefresh()){
            this.createCovers()
            Plugin.refresh(false)
        }
    }

    canDestroyChildrens(){
        const player = $gamePlayer
        return player.checkStop(0) && !player.checkStop(10)
    }

    update(){
        this.refreshAllCovers()

        for (const child of this.children) {
            child.update()

            if(this.canDestroyChildrens() && !child.visible){
                child.destroy()
            }
        }

    }
}

/* -------------------------------- FOG TILE -------------------------------- */

Eli.MapReveal.Sprite_CoverTile = class extends Sprite {

    constructor(x, y, image, id, visibilityMethod){
        super(...arguments)
    }

    initialize(x, y, image, id, visibilityMethod){
        super.initialize()
        this.initializePlus(...arguments)
    }

    initializePlus(x, y, image, id, visibilityMethod){
        this.mapX = x
        this.mapY = y
        this.tileId = id
        this.region = $gameMap.regionId(x, y)
        this.visibilityMethod = visibilityMethod
        this.createBitmap(image)
    }

    createBitmap(image){
        this.bitmap = image
    }

    toggleVisibility(){
        this.visible = Plugin.getTileStatusById(this.tileId)
    }

    toggleVisibilityWithCoverOneRegion(){
        if($gamePlayer.regionId() === this.region){
            this.opacity = 0
        }else{
            this.opacity = 255
        }
    }

    fadeVisibility(){
        if(!Plugin.getTileStatusById(this.tileId) && this.visible){
            this.fadeOut()
            this.visible = this.opacity > 0
        }
    }

    fadeVisibilityWithCoverOneRegion(){
        if($gamePlayer.regionId() === this.region && this.opacity > 0){
            this.fadeOut()
        }else if($gamePlayer.regionId() !== this.region && this.opacity < 255){
            this.fadeIn()
        }
    }

    fadeOut(){
        const remove = this.opacity - Plugin.getFadeSpeed()
        this.opacity = Math.max(remove, 0)
    }

    fadeIn(){
        const add = this.opacity + Plugin.getFadeSpeed()
        this.opacity = Math.min(add, 255)
    }

    updatePosition(){
        this.x = $gameMap.adjustX(this.mapX) * 48
        this.y = $gameMap.adjustY(this.mapY) * 48
    }

    updateVisibility(){
        this[this.visibilityMethod]()
    }

    update(){
        this.updateVisibility()
        this.updatePosition()
    }
}

}