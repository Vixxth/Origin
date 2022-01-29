//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.32;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.32] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x518638=_0x3813;(function(_0x3b29de,_0x295130){const _0x4bff63=_0x3813,_0x27c481=_0x3b29de();while(!![]){try{const _0x285214=parseInt(_0x4bff63(0x431))/0x1+parseInt(_0x4bff63(0x177))/0x2*(parseInt(_0x4bff63(0x1df))/0x3)+-parseInt(_0x4bff63(0x2b1))/0x4*(-parseInt(_0x4bff63(0x2ae))/0x5)+-parseInt(_0x4bff63(0x4dd))/0x6+parseInt(_0x4bff63(0x360))/0x7*(-parseInt(_0x4bff63(0x395))/0x8)+-parseInt(_0x4bff63(0x38e))/0x9*(parseInt(_0x4bff63(0x16d))/0xa)+parseInt(_0x4bff63(0x42d))/0xb*(-parseInt(_0x4bff63(0x2ee))/0xc);if(_0x285214===_0x295130)break;else _0x27c481['push'](_0x27c481['shift']());}catch(_0x485165){_0x27c481['push'](_0x27c481['shift']());}}}(_0x42a2,0x1a7d4));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x518638(0x39f)](function(_0x214979){const _0x13a693=_0x518638;return _0x214979[_0x13a693(0x47e)]&&_0x214979['description'][_0x13a693(0x394)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x518638(0x2ba)]=function(_0x3f299a,_0x3946e0){const _0x485759=_0x518638;for(const _0x1f9570 in _0x3946e0){if(_0x1f9570[_0x485759(0x297)](/(.*):(.*)/i)){const _0x32fbeb=String(RegExp['$1']),_0x8845c9=String(RegExp['$2'])[_0x485759(0x4f8)]()[_0x485759(0x3a1)]();let _0x1971cb,_0x1fd889,_0x534c3a;switch(_0x8845c9){case'NUM':_0x1971cb=_0x3946e0[_0x1f9570]!==''?Number(_0x3946e0[_0x1f9570]):0x0;break;case _0x485759(0x1d4):_0x1fd889=_0x3946e0[_0x1f9570]!==''?JSON[_0x485759(0x3c7)](_0x3946e0[_0x1f9570]):[],_0x1971cb=_0x1fd889[_0x485759(0x242)](_0x4e915b=>Number(_0x4e915b));break;case'EVAL':_0x1971cb=_0x3946e0[_0x1f9570]!==''?eval(_0x3946e0[_0x1f9570]):null;break;case _0x485759(0x233):_0x1fd889=_0x3946e0[_0x1f9570]!==''?JSON[_0x485759(0x3c7)](_0x3946e0[_0x1f9570]):[],_0x1971cb=_0x1fd889['map'](_0x4e300a=>eval(_0x4e300a));break;case _0x485759(0x314):_0x1971cb=_0x3946e0[_0x1f9570]!==''?JSON[_0x485759(0x3c7)](_0x3946e0[_0x1f9570]):'';break;case _0x485759(0x30e):_0x1fd889=_0x3946e0[_0x1f9570]!==''?JSON[_0x485759(0x3c7)](_0x3946e0[_0x1f9570]):[],_0x1971cb=_0x1fd889[_0x485759(0x242)](_0x2e8f31=>JSON[_0x485759(0x3c7)](_0x2e8f31));break;case _0x485759(0x264):_0x1971cb=_0x3946e0[_0x1f9570]!==''?new Function(JSON[_0x485759(0x3c7)](_0x3946e0[_0x1f9570])):new Function(_0x485759(0x178));break;case _0x485759(0x172):_0x1fd889=_0x3946e0[_0x1f9570]!==''?JSON['parse'](_0x3946e0[_0x1f9570]):[],_0x1971cb=_0x1fd889['map'](_0x4c6ec6=>new Function(JSON['parse'](_0x4c6ec6)));break;case _0x485759(0x50a):_0x1971cb=_0x3946e0[_0x1f9570]!==''?String(_0x3946e0[_0x1f9570]):'';break;case _0x485759(0x485):_0x1fd889=_0x3946e0[_0x1f9570]!==''?JSON['parse'](_0x3946e0[_0x1f9570]):[],_0x1971cb=_0x1fd889[_0x485759(0x242)](_0x4c2b91=>String(_0x4c2b91));break;case _0x485759(0x482):_0x534c3a=_0x3946e0[_0x1f9570]!==''?JSON[_0x485759(0x3c7)](_0x3946e0[_0x1f9570]):{},_0x3f299a[_0x32fbeb]={},VisuMZ['ConvertParams'](_0x3f299a[_0x32fbeb],_0x534c3a);continue;case _0x485759(0x439):_0x1fd889=_0x3946e0[_0x1f9570]!==''?JSON[_0x485759(0x3c7)](_0x3946e0[_0x1f9570]):[],_0x1971cb=_0x1fd889[_0x485759(0x242)](_0x7d178f=>VisuMZ['ConvertParams']({},JSON[_0x485759(0x3c7)](_0x7d178f)));break;default:continue;}_0x3f299a[_0x32fbeb]=_0x1971cb;}}return _0x3f299a;},(_0x4f208c=>{const _0x5eb8f2=_0x518638,_0x358ca3=_0x4f208c[_0x5eb8f2(0x51b)];for(const _0x26c7d5 of dependencies){if(!Imported[_0x26c7d5]){alert(_0x5eb8f2(0x4a0)[_0x5eb8f2(0x290)](_0x358ca3,_0x26c7d5)),SceneManager['exit']();break;}}const _0x57fa36=_0x4f208c[_0x5eb8f2(0x16a)];if(_0x57fa36[_0x5eb8f2(0x297)](/\[Version[ ](.*?)\]/i)){const _0x2ea9e4=Number(RegExp['$1']);_0x2ea9e4!==VisuMZ[label][_0x5eb8f2(0x246)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5eb8f2(0x290)](_0x358ca3,_0x2ea9e4)),SceneManager['exit']());}if(_0x57fa36[_0x5eb8f2(0x297)](/\[Tier[ ](\d+)\]/i)){const _0x5e37ba=Number(RegExp['$1']);_0x5e37ba<tier?(alert(_0x5eb8f2(0x53f)[_0x5eb8f2(0x290)](_0x358ca3,_0x5e37ba,tier)),SceneManager[_0x5eb8f2(0x1ea)]()):tier=Math[_0x5eb8f2(0x375)](_0x5e37ba,tier);}VisuMZ[_0x5eb8f2(0x2ba)](VisuMZ[label][_0x5eb8f2(0x223)],_0x4f208c[_0x5eb8f2(0x282)]);})(pluginData),VisuMZ[_0x518638(0x4d7)]=function(_0x3ff4cd,_0x474061,_0x50bdf3){switch(_0x50bdf3){case'=':return _0x474061;break;case'+':return _0x3ff4cd+_0x474061;break;case'-':return _0x3ff4cd-_0x474061;break;case'*':return _0x3ff4cd*_0x474061;break;case'/':return _0x3ff4cd/_0x474061;break;case'%':return _0x3ff4cd%_0x474061;break;}return _0x3ff4cd;},PluginManager['registerCommand'](pluginData[_0x518638(0x51b)],_0x518638(0x46b),_0x14a5c8=>{const _0x204855=_0x518638;VisuMZ[_0x204855(0x2ba)](_0x14a5c8,_0x14a5c8);switch(_0x14a5c8[_0x204855(0x400)]){case _0x204855(0x3a0):$gameSystem[_0x204855(0x2d0)](!![]);break;case _0x204855(0x446):$gameSystem[_0x204855(0x2d0)](![]);break;case _0x204855(0x362):$gameSystem[_0x204855(0x2d0)](!$gameSystem[_0x204855(0x1d9)]());break;}}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'CallEvent',_0x4c6336=>{const _0x2cae57=_0x518638;VisuMZ[_0x2cae57(0x2ba)](_0x4c6336,_0x4c6336);const _0x2cee1a=$gameTemp[_0x2cae57(0x494)](),_0x3af0ed={'mapId':_0x4c6336[_0x2cae57(0x4c0)],'eventId':_0x4c6336['EventId']||_0x2cee1a['eventId'](),'pageId':_0x4c6336[_0x2cae57(0x478)]};if(_0x3af0ed[_0x2cae57(0x1ec)]<=0x0)_0x3af0ed['mapId']=$gameMap?$gameMap[_0x2cae57(0x1ec)]():0x1;$gameTemp[_0x2cae57(0x494)]()[_0x2cae57(0x4f9)](_0x3af0ed);}),PluginManager['registerCommand'](pluginData['name'],_0x518638(0x477),_0x1351f0=>{const _0x5c93cd=_0x518638;VisuMZ[_0x5c93cd(0x2ba)](_0x1351f0,_0x1351f0);switch(_0x1351f0[_0x5c93cd(0x400)]){case _0x5c93cd(0x531):$gameSystem[_0x5c93cd(0x342)](!![]);break;case _0x5c93cd(0x4ac):$gameSystem[_0x5c93cd(0x342)](![]);break;case _0x5c93cd(0x362):$gameSystem[_0x5c93cd(0x342)](!$gameSystem[_0x5c93cd(0x3cb)]());break;}}),PluginManager['registerCommand'](pluginData[_0x518638(0x51b)],_0x518638(0x1ce),_0x26f21e=>{const _0x5a622c=_0x518638;VisuMZ[_0x5a622c(0x2ba)](_0x26f21e,_0x26f21e);const _0x12e54c=$gameTemp[_0x5a622c(0x494)]();_0x26f21e[_0x5a622c(0x4c0)]=_0x26f21e[_0x5a622c(0x4c0)]||$gameMap[_0x5a622c(0x1ec)](),$gameSystem[_0x5a622c(0x4cc)](_0x26f21e[_0x5a622c(0x4c0)],_0x26f21e[_0x5a622c(0x3ab)]||_0x12e54c[_0x5a622c(0x18e)](),_0x26f21e[_0x5a622c(0x3af)],_0x26f21e['IconBufferX'],_0x26f21e[_0x5a622c(0x4e1)],_0x26f21e[_0x5a622c(0x3f2)]);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x4d3),_0x4ced6f=>{const _0x118547=_0x518638;VisuMZ[_0x118547(0x2ba)](_0x4ced6f,_0x4ced6f);const _0x1e983b=$gameTemp[_0x118547(0x494)]();_0x4ced6f[_0x118547(0x4c0)]=_0x4ced6f['MapId']||$gameMap['mapId'](),$gameSystem[_0x118547(0x2fd)](_0x4ced6f[_0x118547(0x4c0)],_0x4ced6f[_0x118547(0x3ab)]||_0x1e983b[_0x118547(0x18e)]());}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x3d4),_0x13da51=>{const _0x7d9776=_0x518638;if($gameMap)for(const _0x27ce27 of $gameMap[_0x7d9776(0x2c6)]()){_0x27ce27[_0x7d9776(0x2cd)]();}}),PluginManager[_0x518638(0x440)](pluginData['name'],_0x518638(0x33e),_0x50fb0f=>{const _0x1e5b06=_0x518638;VisuMZ[_0x1e5b06(0x2ba)](_0x50fb0f,_0x50fb0f);switch(_0x50fb0f[_0x1e5b06(0x3be)]){case'Visible':$gameSystem[_0x1e5b06(0x22f)](!![]);break;case _0x1e5b06(0x26f):$gameSystem[_0x1e5b06(0x22f)](![]);break;case _0x1e5b06(0x362):$gameSystem['setEventLabelsVisible'](!$gameSystem[_0x1e5b06(0x16e)]());break;}}),PluginManager[_0x518638(0x440)](pluginData['name'],_0x518638(0x43d),_0x39a09b=>{const _0x44a39a=_0x518638;VisuMZ[_0x44a39a(0x2ba)](_0x39a09b,_0x39a09b);const _0x8c41ce=$gameTemp[_0x44a39a(0x494)]();if(!$gameMap)return;const _0x18fbdc=$gameMap[_0x44a39a(0x40c)](_0x39a09b['EventId']||_0x8c41ce[_0x44a39a(0x18e)]());if(_0x18fbdc)_0x18fbdc['saveEventLocation']();}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x2bd),_0x44a6e5=>{const _0x2cb63c=_0x518638;VisuMZ[_0x2cb63c(0x2ba)](_0x44a6e5,_0x44a6e5);const _0x2aa49f=$gameTemp[_0x2cb63c(0x494)](),_0x45d77b=_0x44a6e5[_0x2cb63c(0x4c0)]||$gameMap['mapId'](),_0x16830d=_0x44a6e5[_0x2cb63c(0x3ab)]||_0x2aa49f[_0x2cb63c(0x18e)](),_0x3679cf=_0x44a6e5[_0x2cb63c(0x165)]||0x0,_0x276c74=_0x44a6e5[_0x2cb63c(0x469)]||0x0,_0x261524=_0x44a6e5[_0x2cb63c(0x2a8)]||0x2,_0x617c11=((_0x44a6e5['PageId']||0x1)-0x1)[_0x2cb63c(0x33b)](0x0,0x13),_0x41458d=_0x44a6e5[_0x2cb63c(0x40f)]||0x0;$gameSystem[_0x2cb63c(0x3e7)](_0x45d77b,_0x16830d,_0x3679cf,_0x276c74,_0x261524,_0x617c11,_0x41458d);}),PluginManager['registerCommand'](pluginData['name'],_0x518638(0x241),_0x58aa75=>{const _0x4af2cb=_0x518638;VisuMZ['ConvertParams'](_0x58aa75,_0x58aa75);const _0x453fa0=$gameTemp[_0x4af2cb(0x494)](),_0x4472ac=_0x58aa75[_0x4af2cb(0x4c0)]||$gameMap['mapId'](),_0x252c05=_0x58aa75[_0x4af2cb(0x3ab)]||_0x453fa0[_0x4af2cb(0x18e)]();$gameSystem[_0x4af2cb(0x41d)](_0x4472ac,_0x252c05);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'EventTimerExpireEvent',_0x22d5ed=>{const _0x4522c9=_0x518638;VisuMZ[_0x4522c9(0x2ba)](_0x22d5ed,_0x22d5ed);const _0x253c2f=_0x22d5ed['CommonEventID'];$gameTimer[_0x4522c9(0x2ce)](_0x253c2f);}),PluginManager['registerCommand'](pluginData[_0x518638(0x51b)],_0x518638(0x3db),_0x1f7f35=>{const _0x3de416=_0x518638;$gameTimer[_0x3de416(0x2ce)](0x0);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'EventTimerFramesGain',_0x138428=>{const _0x208597=_0x518638;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x138428,_0x138428);let _0xd8b7d=0x0;_0xd8b7d+=_0x138428[_0x208597(0x1f1)],_0xd8b7d+=_0x138428['Seconds']*0x3c,_0xd8b7d+=_0x138428[_0x208597(0x3a8)]*0x3c*0x3c,_0xd8b7d+=_0x138428[_0x208597(0x445)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0xd8b7d);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x2b6),_0x43e7f6=>{const _0x4dbc29=_0x518638;if(!$gameTimer[_0x4dbc29(0x213)]())return;VisuMZ[_0x4dbc29(0x2ba)](_0x43e7f6,_0x43e7f6);let _0x6305bc=0x0;_0x6305bc+=_0x43e7f6[_0x4dbc29(0x1f1)],_0x6305bc+=_0x43e7f6['Seconds']*0x3c,_0x6305bc+=_0x43e7f6[_0x4dbc29(0x3a8)]*0x3c*0x3c,_0x6305bc+=_0x43e7f6[_0x4dbc29(0x445)]*0x3c*0x3c*0x3c,$gameTimer[_0x4dbc29(0x300)](_0x6305bc);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'EventTimerPause',_0xadb0b3=>{const _0x4b088e=_0x518638;if(!$gameTimer[_0x4b088e(0x213)]())return;$gameTimer[_0x4b088e(0x471)]();}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x4d2),_0x4b624d=>{const _0x4a348a=_0x518638;if(!$gameTimer[_0x4a348a(0x213)]())return;$gameTimer[_0x4a348a(0x250)]();}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x434),_0x133600=>{const _0x4d3ba3=_0x518638;VisuMZ['ConvertParams'](_0x133600,_0x133600);const _0x1a5163=_0x133600['Speed']||0x0;$gameTimer[_0x4d3ba3(0x296)](_0x1a5163);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x3cc),_0x2ceab7=>{const _0x744f54=_0x518638;VisuMZ[_0x744f54(0x2ba)](_0x2ceab7,_0x2ceab7);const _0x9cd0fd=!_0x2ceab7[_0x744f54(0x276)];$gameSystem[_0x744f54(0x277)](_0x9cd0fd);}),PluginManager['registerCommand'](pluginData['name'],_0x518638(0x2ea),_0x34fd12=>{const _0x2e4558=_0x518638;VisuMZ[_0x2e4558(0x2ba)](_0x34fd12,_0x34fd12);const _0x15066a=(_0x34fd12[_0x2e4558(0x438)]||0x0)-0x1,_0x56a099=!_0x34fd12['Chase'],_0x57d17b=$gamePlayer['followers']()['follower'](_0x15066a);if(_0x57d17b)_0x57d17b[_0x2e4558(0x273)](_0x56a099);}),PluginManager['registerCommand'](pluginData['name'],_0x518638(0x366),_0xf8c7b0=>{const _0x3e2250=_0x518638;VisuMZ['ConvertParams'](_0xf8c7b0,_0xf8c7b0);const _0x2136cd=_0xf8c7b0['FollowerID'];$gameSystem[_0x3e2250(0x1ff)](_0x2136cd);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'FollowerReset',_0x3474ac=>{const _0x303576=_0x518638;VisuMZ[_0x303576(0x2ba)](_0x3474ac,_0x3474ac),$gameSystem[_0x303576(0x1ff)](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0xff3b34 of $gamePlayer[_0x303576(0x3a9)]()['_data']){if(_0xff3b34)_0xff3b34['setChaseOff'](![]);}}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x401),_0x512ed6=>{const _0x31b101=_0x518638;VisuMZ['ConvertParams'](_0x512ed6,_0x512ed6);const _0x54af84=$gameTemp[_0x31b101(0x494)]();_0x512ed6['MapId']=_0x512ed6[_0x31b101(0x4c0)]||$gameMap['mapId']();const _0x2f2d84=[_0x512ed6[_0x31b101(0x4c0)],_0x512ed6[_0x31b101(0x3ab)]||_0x54af84[_0x31b101(0x18e)](),_0x512ed6['Letter']],_0x536892=_0x512ed6[_0x31b101(0x504)],_0x37fcbd=$gameSelfSwitches[_0x31b101(0x53c)](_0x2f2d84)||![];$gameSwitches[_0x31b101(0x285)](_0x536892,_0x37fcbd);}),PluginManager[_0x518638(0x440)](pluginData['name'],_0x518638(0x239),_0x2205b5=>{const _0x72a352=_0x518638;VisuMZ[_0x72a352(0x2ba)](_0x2205b5,_0x2205b5);const _0x2a4064=$gameTemp[_0x72a352(0x494)]();_0x2205b5[_0x72a352(0x4c0)]=_0x2205b5[_0x72a352(0x4c0)]||$gameMap['mapId']();const _0x1af88b=[_0x2205b5[_0x72a352(0x4c0)],_0x2205b5['EventId']||_0x2a4064['eventId'](),_0x72a352(0x3c5)[_0x72a352(0x290)](_0x2205b5[_0x72a352(0x1a6)])],_0x4d9912=_0x2205b5['TargetSwitchId'],_0x22cc1a=$gameSelfSwitches[_0x72a352(0x53c)](_0x1af88b)||![];$gameSwitches['setValue'](_0x4d9912,_0x22cc1a);}),PluginManager['registerCommand'](pluginData[_0x518638(0x51b)],_0x518638(0x420),_0x56f70a=>{const _0x27270d=_0x518638;VisuMZ['ConvertParams'](_0x56f70a,_0x56f70a);const _0x3f9368=$gameTemp[_0x27270d(0x494)]();_0x56f70a[_0x27270d(0x4c0)]=_0x56f70a[_0x27270d(0x4c0)]||$gameMap[_0x27270d(0x1ec)]();const _0x213077=[_0x56f70a[_0x27270d(0x4c0)],_0x56f70a[_0x27270d(0x3ab)]||_0x3f9368['eventId'](),_0x27270d(0x451)['format'](_0x56f70a['VariableId'])],_0x352b5c=_0x56f70a[_0x27270d(0x429)],_0xe49985=$gameSelfSwitches[_0x27270d(0x53c)](_0x213077)||![];$gameVariables[_0x27270d(0x285)](_0x352b5c,_0xe49985);}),PluginManager[_0x518638(0x440)](pluginData['name'],'MorphEventTo',_0x303663=>{const _0x53baab=_0x518638;VisuMZ[_0x53baab(0x2ba)](_0x303663,_0x303663);if(!$gameMap)return;const _0x3aff7c=$gameTemp['getLastPluginCommandInterpreter'](),_0x35a456=_0x303663[_0x53baab(0x4b6)];_0x303663[_0x53baab(0x30d)]=_0x303663[_0x53baab(0x30d)]||$gameMap[_0x53baab(0x1ec)](),_0x303663[_0x53baab(0x41f)]=_0x303663[_0x53baab(0x41f)]||$gameMap[_0x53baab(0x1ec)](),_0x303663[_0x53baab(0x271)]=_0x303663[_0x53baab(0x271)][_0x53baab(0x4f8)]()[_0x53baab(0x3a1)]();if(!_0x35a456&&_0x303663['Step1MapId']!==$gameMap[_0x53baab(0x1ec)]())return;if($gameMap['mapId']()===_0x303663[_0x53baab(0x30d)]){const _0xaa399e=$gameMap['event'](_0x303663[_0x53baab(0x406)]||_0x3aff7c[_0x53baab(0x18e)]());if(!_0xaa399e)return;_0x303663[_0x53baab(0x271)]!=='UNTITLED'?_0xaa399e['morphIntoTemplate'](_0x303663['TemplateName']):_0xaa399e[_0x53baab(0x280)](_0x303663[_0x53baab(0x41f)],_0x303663[_0x53baab(0x21d)]||_0x3aff7c[_0x53baab(0x18e)]());}_0x35a456&&$gameSystem[_0x53baab(0x36a)](_0x303663[_0x53baab(0x30d)],_0x303663[_0x53baab(0x406)],_0x303663[_0x53baab(0x271)],_0x303663['Step2MapId'],_0x303663[_0x53baab(0x21d)]);}),PluginManager[_0x518638(0x440)](pluginData['name'],_0x518638(0x4ba),_0x44dafa=>{const _0x541c9d=_0x518638;VisuMZ[_0x541c9d(0x2ba)](_0x44dafa,_0x44dafa);if(!$gameMap)return;const _0x3a3da9=$gameTemp[_0x541c9d(0x494)]();_0x44dafa[_0x541c9d(0x4c0)]=_0x44dafa[_0x541c9d(0x4c0)]||$gameMap['mapId']();if($gameMap[_0x541c9d(0x1ec)]()===_0x44dafa[_0x541c9d(0x4c0)]){const _0x569981=$gameMap['event'](_0x44dafa[_0x541c9d(0x3ab)]||_0x3a3da9[_0x541c9d(0x18e)]());_0x569981['removeMorph']();}_0x44dafa['RemovePreserve']&&$gameSystem[_0x541c9d(0x543)](_0x44dafa[_0x541c9d(0x4c0)],_0x44dafa[_0x541c9d(0x3ab)]||_0x3a3da9[_0x541c9d(0x18e)]());}),PluginManager['registerCommand'](pluginData['name'],_0x518638(0x4e9),_0x58604f=>{const _0x268adb=_0x518638;VisuMZ[_0x268adb(0x2ba)](_0x58604f,_0x58604f),$gameSystem['setPlayerControlDisable'](!_0x58604f[_0x268adb(0x531)]);}),PluginManager[_0x518638(0x440)](pluginData['name'],_0x518638(0x20b),_0x292a54=>{const _0x2f8805=_0x518638;VisuMZ['ConvertParams'](_0x292a54,_0x292a54),$gameSystem[_0x2f8805(0x3d9)](_0x292a54[_0x2f8805(0x189)]);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'PlayerIconChange',_0x3675d4=>{const _0x3c3456=_0x518638;VisuMZ['ConvertParams'](_0x3675d4,_0x3675d4),$gameSystem[_0x3c3456(0x2ec)]($gamePlayer,_0x3675d4[_0x3c3456(0x3af)],_0x3675d4['IconBufferX'],_0x3675d4[_0x3c3456(0x4e1)],_0x3675d4[_0x3c3456(0x3f2)]);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x27c),_0x344770=>{const _0x57290a=_0x518638;VisuMZ[_0x57290a(0x2ba)](_0x344770,_0x344770),$gameSystem[_0x57290a(0x530)]($gamePlayer);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'SelfSwitchABCD',_0x2e1beb=>{const _0x24224d=_0x518638;VisuMZ[_0x24224d(0x2ba)](_0x2e1beb,_0x2e1beb);const _0x8cf99a=$gameTemp['getLastPluginCommandInterpreter']();_0x2e1beb[_0x24224d(0x4c0)]=_0x2e1beb[_0x24224d(0x4c0)]||$gameMap[_0x24224d(0x1ec)]();const _0x19c4c1=[_0x2e1beb[_0x24224d(0x4c0)],_0x2e1beb[_0x24224d(0x3ab)]||_0x8cf99a['eventId'](),_0x2e1beb[_0x24224d(0x501)]];switch(_0x2e1beb['Value']){case'ON':$gameSelfSwitches[_0x24224d(0x285)](_0x19c4c1,!![]);break;case _0x24224d(0x2d5):$gameSelfSwitches['setValue'](_0x19c4c1,![]);break;case _0x24224d(0x362):$gameSelfSwitches[_0x24224d(0x285)](_0x19c4c1,!$gameSelfSwitches[_0x24224d(0x53c)](_0x19c4c1));break;}}),PluginManager['registerCommand'](pluginData[_0x518638(0x51b)],_0x518638(0x334),_0x7255b2=>{const _0x52773b=_0x518638;VisuMZ[_0x52773b(0x2ba)](_0x7255b2,_0x7255b2);const _0x3f5505=$gameTemp[_0x52773b(0x494)]();_0x7255b2[_0x52773b(0x4c0)]=_0x7255b2[_0x52773b(0x4c0)]||$gameMap[_0x52773b(0x1ec)]();const _0x4be608=[_0x7255b2['MapId'],_0x7255b2[_0x52773b(0x3ab)]||_0x3f5505[_0x52773b(0x18e)](),_0x52773b(0x3c5)[_0x52773b(0x290)](_0x7255b2[_0x52773b(0x1a6)])];switch(_0x7255b2[_0x52773b(0x400)]){case'ON':$gameSelfSwitches[_0x52773b(0x285)](_0x4be608,!![]);break;case _0x52773b(0x2d5):$gameSelfSwitches['setValue'](_0x4be608,![]);break;case _0x52773b(0x362):$gameSelfSwitches[_0x52773b(0x285)](_0x4be608,!$gameSelfSwitches[_0x52773b(0x53c)](_0x4be608));break;}}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x21f),_0x4cbb3b=>{const _0x46e1dd=_0x518638;VisuMZ[_0x46e1dd(0x2ba)](_0x4cbb3b,_0x4cbb3b);const _0x4d8190=$gameTemp[_0x46e1dd(0x494)]();_0x4cbb3b['MapId']=_0x4cbb3b[_0x46e1dd(0x4c0)]||$gameMap[_0x46e1dd(0x1ec)]();const _0x408cbd=[_0x4cbb3b[_0x46e1dd(0x4c0)],_0x4cbb3b[_0x46e1dd(0x3ab)]||_0x4d8190[_0x46e1dd(0x18e)](),_0x46e1dd(0x451)[_0x46e1dd(0x290)](_0x4cbb3b['VariableId'])],_0x91b9db=VisuMZ[_0x46e1dd(0x4d7)]($gameSelfSwitches['value'](_0x408cbd),_0x4cbb3b[_0x46e1dd(0x400)],_0x4cbb3b[_0x46e1dd(0x365)]);$gameSelfSwitches['setValue'](_0x408cbd,_0x91b9db);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'SpawnEventAtXY',_0x1e638e=>{const _0x17393d=_0x518638;VisuMZ[_0x17393d(0x2ba)](_0x1e638e,_0x1e638e);const _0x502f0d=$gameTemp[_0x17393d(0x494)](),_0x4f269a={'template':_0x1e638e[_0x17393d(0x271)],'mapId':_0x1e638e[_0x17393d(0x4c0)]||$gameMap['mapId'](),'eventId':_0x1e638e[_0x17393d(0x3ab)]||_0x502f0d[_0x17393d(0x18e)](),'x':_0x1e638e[_0x17393d(0x165)],'y':_0x1e638e['PosY'],'spawnPreserved':_0x1e638e[_0x17393d(0x42b)],'spawnEventId':$gameMap[_0x17393d(0x465)][_0x17393d(0x433)]+0x3e8},_0x3a5b95=_0x1e638e['SuccessSwitchId']||0x0;if(!VisuMZ[_0x17393d(0x35a)][_0x4f269a[_0x17393d(0x1ec)]]&&_0x4f269a[_0x17393d(0x1ec)]!==$gameMap['mapId']()){let _0x296d30='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x17393d(0x290)](_0x4f269a['mapId']);_0x296d30+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x296d30+=_0x17393d(0x1f4),_0x296d30+=_0x17393d(0x2c8),_0x296d30+=_0x17393d(0x3c1)[_0x17393d(0x290)](_0x4f269a['mapId']),alert(_0x296d30);return;}const _0x4afbc3=$gameMap['prepareSpawnedEventAtXY'](_0x4f269a,_0x1e638e[_0x17393d(0x487)],_0x1e638e['Passability']);_0x3a5b95&&$gameSwitches[_0x17393d(0x285)](_0x3a5b95,!!_0x4afbc3);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x316),_0x36dec9=>{const _0x8dba24=_0x518638;VisuMZ[_0x8dba24(0x2ba)](_0x36dec9,_0x36dec9);const _0x5e2ccd=$gameTemp[_0x8dba24(0x494)](),_0x112bac={'template':_0x36dec9[_0x8dba24(0x271)],'mapId':_0x36dec9[_0x8dba24(0x4c0)]||$gameMap[_0x8dba24(0x1ec)](),'eventId':_0x36dec9['EventId']||_0x5e2ccd['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x36dec9['Preserve'],'spawnEventId':$gameMap[_0x8dba24(0x465)][_0x8dba24(0x433)]+0x3e8},_0x2e09d0=_0x36dec9[_0x8dba24(0x368)]||0x0;if(!VisuMZ[_0x8dba24(0x35a)][_0x112bac[_0x8dba24(0x1ec)]]&&_0x112bac['mapId']!==$gameMap['mapId']()){let _0x28cf50='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x8dba24(0x290)](_0x112bac[_0x8dba24(0x1ec)]);_0x28cf50+=_0x8dba24(0x216),_0x28cf50+=_0x8dba24(0x1f4),_0x28cf50+=_0x8dba24(0x2c8),_0x28cf50+=_0x8dba24(0x3c1)[_0x8dba24(0x290)](_0x112bac[_0x8dba24(0x1ec)]),alert(_0x28cf50);return;}const _0x414422=$gameMap[_0x8dba24(0x387)](_0x112bac,_0x36dec9[_0x8dba24(0x3a4)],_0x36dec9[_0x8dba24(0x487)],_0x36dec9[_0x8dba24(0x1c5)]);_0x2e09d0&&$gameSwitches['setValue'](_0x2e09d0,!!_0x414422);}),PluginManager['registerCommand'](pluginData[_0x518638(0x51b)],_0x518638(0x2c2),_0x45bb08=>{const _0x554efe=_0x518638;VisuMZ[_0x554efe(0x2ba)](_0x45bb08,_0x45bb08);const _0x2b237a=$gameTemp[_0x554efe(0x494)](),_0x1f297b={'template':_0x45bb08[_0x554efe(0x271)],'mapId':_0x45bb08[_0x554efe(0x4c0)]||$gameMap['mapId'](),'eventId':_0x45bb08[_0x554efe(0x3ab)]||_0x2b237a['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x45bb08[_0x554efe(0x42b)],'spawnEventId':$gameMap[_0x554efe(0x465)]['length']+0x3e8},_0x4da230=_0x45bb08[_0x554efe(0x368)]||0x0;if(!VisuMZ[_0x554efe(0x35a)][_0x1f297b[_0x554efe(0x1ec)]]&&_0x1f297b[_0x554efe(0x1ec)]!==$gameMap[_0x554efe(0x1ec)]()){let _0x3e17e5=_0x554efe(0x35d)[_0x554efe(0x290)](_0x1f297b['mapId']);_0x3e17e5+=_0x554efe(0x216),_0x3e17e5+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x3e17e5+=_0x554efe(0x2c8),_0x3e17e5+=_0x554efe(0x3c1)[_0x554efe(0x290)](_0x1f297b['mapId']),alert(_0x3e17e5);return;}const _0x3d5c68=$gameMap[_0x554efe(0x4c1)](_0x1f297b,_0x45bb08[_0x554efe(0x35f)],_0x45bb08[_0x554efe(0x487)],_0x45bb08[_0x554efe(0x1c5)]);_0x4da230&&$gameSwitches[_0x554efe(0x285)](_0x4da230,!!_0x3d5c68);}),PluginManager['registerCommand'](pluginData[_0x518638(0x51b)],'SpawnEventDespawnEventID',_0x3475d4=>{const _0x3f904d=_0x518638;VisuMZ[_0x3f904d(0x2ba)](_0x3475d4,_0x3475d4);const _0x1ad9c6=$gameTemp['getLastPluginCommandInterpreter']();$gameMap[_0x3f904d(0x287)](_0x3475d4[_0x3f904d(0x3e9)]||_0x1ad9c6[_0x3f904d(0x18e)]());}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'SpawnEventDespawnAtXY',_0x54f21c=>{const _0x2f1d88=_0x518638;VisuMZ[_0x2f1d88(0x2ba)](_0x54f21c,_0x54f21c);const _0x597ebc=_0x54f21c[_0x2f1d88(0x165)],_0x3f5edb=_0x54f21c[_0x2f1d88(0x469)];$gameMap[_0x2f1d88(0x4e8)](_0x597ebc,_0x3f5edb);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],_0x518638(0x193),_0x3bbde5=>{VisuMZ['ConvertParams'](_0x3bbde5,_0x3bbde5),$gameMap['despawnRegions'](_0x3bbde5['Region']);}),PluginManager[_0x518638(0x440)](pluginData['name'],_0x518638(0x331),_0x52adff=>{const _0x325f05=_0x518638;VisuMZ[_0x325f05(0x2ba)](_0x52adff,_0x52adff),$gameMap[_0x325f05(0x33f)](_0x52adff[_0x325f05(0x35f)]);}),PluginManager[_0x518638(0x440)](pluginData[_0x518638(0x51b)],'SpawnEventDespawnEverything',_0x12c2ed=>{const _0x17a17c=_0x518638;VisuMZ[_0x17a17c(0x2ba)](_0x12c2ed,_0x12c2ed),$gameMap[_0x17a17c(0x4db)]();}),VisuMZ[_0x518638(0x489)][_0x518638(0x46c)]=Scene_Boot[_0x518638(0x25b)][_0x518638(0x38d)],Scene_Boot[_0x518638(0x25b)][_0x518638(0x38d)]=function(){const _0x56cbe4=_0x518638;VisuMZ[_0x56cbe4(0x489)][_0x56cbe4(0x46c)]['call'](this),this[_0x56cbe4(0x384)](),this[_0x56cbe4(0x341)]();if(VisuMZ[_0x56cbe4(0x489)][_0x56cbe4(0x198)])VisuMZ[_0x56cbe4(0x489)]['CustomPageConditions']['initialize']();},VisuMZ['PreloadedMaps']=[],VisuMZ[_0x518638(0x414)]={},Scene_Boot[_0x518638(0x25b)][_0x518638(0x384)]=function(){const _0x4a45bc=_0x518638;if(DataManager[_0x4a45bc(0x369)]()||DataManager['isEventTest']())return;const _0x5ecf17=VisuMZ[_0x4a45bc(0x489)][_0x4a45bc(0x223)][_0x4a45bc(0x3e6)],_0x24865e=_0x5ecf17['PreloadMaps']['slice'](0x0);for(const _0x5b97fe of _0x5ecf17[_0x4a45bc(0x50d)]){_0x5b97fe[_0x4a45bc(0x320)]=_0x5b97fe[_0x4a45bc(0x320)]['toUpperCase']()[_0x4a45bc(0x3a1)](),VisuMZ[_0x4a45bc(0x414)][_0x5b97fe[_0x4a45bc(0x320)]]=_0x5b97fe;if(!_0x24865e[_0x4a45bc(0x394)](_0x5b97fe[_0x4a45bc(0x44b)]))_0x24865e[_0x4a45bc(0x284)](_0x5b97fe['MapID']);}for(const _0x4b8721 of _0x24865e){if(VisuMZ['PreloadedMaps'][_0x4b8721])continue;const _0x3d860b=_0x4a45bc(0x209)[_0x4a45bc(0x290)](_0x4b8721[_0x4a45bc(0x1e6)](0x3)),_0x43c6da='$preloadedMap_%1'[_0x4a45bc(0x290)](_0x4b8721);DataManager[_0x4a45bc(0x4d5)](_0x43c6da,_0x3d860b),setTimeout(this[_0x4a45bc(0x263)][_0x4a45bc(0x3e0)](this,_0x4b8721,_0x43c6da),0x64);}},Scene_Boot[_0x518638(0x25b)][_0x518638(0x263)]=function(_0x17171b,_0x42325a){const _0x3959cb=_0x518638;window[_0x42325a]?(VisuMZ[_0x3959cb(0x35a)][_0x17171b]=window[_0x42325a],window[_0x42325a]=undefined):setTimeout(this[_0x3959cb(0x263)]['bind'](this,_0x17171b,_0x42325a),0x64);},VisuMZ[_0x518638(0x229)]=[],VisuMZ[_0x518638(0x4b0)]=[],VisuMZ[_0x518638(0x4f6)]=[],VisuMZ[_0x518638(0x1e1)]=[],VisuMZ[_0x518638(0x24c)]=[],VisuMZ[_0x518638(0x15f)]=[],Scene_Boot[_0x518638(0x25b)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x5a40e2=_0x518638;for(let _0x4e7c32=0x1;_0x4e7c32<$dataSystem[_0x5a40e2(0x4e6)][_0x5a40e2(0x433)];_0x4e7c32++){if($dataSystem[_0x5a40e2(0x4e6)][_0x4e7c32]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x5a40e2(0x229)][_0x5a40e2(0x284)](_0x4e7c32);if($dataSystem['switches'][_0x4e7c32]['match'](/<SELF>/i))VisuMZ['SelfSwitches'][_0x5a40e2(0x284)](_0x4e7c32);if($dataSystem['switches'][_0x4e7c32][_0x5a40e2(0x297)](/<MAP>/i))VisuMZ[_0x5a40e2(0x4f6)][_0x5a40e2(0x284)](_0x4e7c32);}for(let _0xe84ee8=0x1;_0xe84ee8<$dataSystem[_0x5a40e2(0x28a)]['length'];_0xe84ee8++){if($dataSystem[_0x5a40e2(0x28a)][_0xe84ee8][_0x5a40e2(0x297)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x5a40e2(0x1e1)][_0x5a40e2(0x284)](_0xe84ee8);if($dataSystem[_0x5a40e2(0x28a)][_0xe84ee8][_0x5a40e2(0x297)](/<SELF>/i))VisuMZ[_0x5a40e2(0x24c)]['push'](_0xe84ee8);if($dataSystem['variables'][_0xe84ee8][_0x5a40e2(0x297)](/<MAP>/i))VisuMZ[_0x5a40e2(0x15f)]['push'](_0xe84ee8);}},VisuMZ['EventsMoveCore'][_0x518638(0x198)]={},VisuMZ[_0x518638(0x489)][_0x518638(0x198)][_0x518638(0x41b)]=function(){const _0x1be6a1=_0x518638;this[_0x1be6a1(0x23e)]=new Game_CPCInterpreter(),this[_0x1be6a1(0x47b)]();},VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x518638(0x47b)]=function(){const _0x29dcf9=_0x518638;this['_commonEvents']=[];for(const _0x3d04c2 of $dataCommonEvents){if(!_0x3d04c2)continue;VisuMZ['EventsMoveCore']['CustomPageConditions']['loadCPC'](_0x3d04c2);if(_0x3d04c2[_0x29dcf9(0x183)][_0x29dcf9(0x433)]>0x0)this[_0x29dcf9(0x2fc)][_0x29dcf9(0x284)](_0x3d04c2['id']);}},VisuMZ[_0x518638(0x489)][_0x518638(0x198)]['metCPC']=function(_0x317674,_0xb26502){const _0x52773d=_0x518638;return this[_0x52773d(0x23e)][_0x52773d(0x3ae)](_0x317674,_0xb26502),this[_0x52773d(0x23e)][_0x52773d(0x1ed)](),this[_0x52773d(0x23e)]['_cpc'];},VisuMZ[_0x518638(0x489)][_0x518638(0x198)][_0x518638(0x304)]=function(_0x50f4d5){const _0x447c21=_0x518638;let _0x535c9f=![];_0x50f4d5[_0x447c21(0x183)]=[];for(const _0x4a91fd of _0x50f4d5['list']){if([0x6c,0x198][_0x447c21(0x394)](_0x4a91fd[_0x447c21(0x1c9)])){const _0x3c6337=_0x4a91fd['parameters'][0x0];if(_0x3c6337[_0x447c21(0x297)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x535c9f=!![];else _0x3c6337[_0x447c21(0x297)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x535c9f=![]);}_0x535c9f&&_0x50f4d5[_0x447c21(0x183)][_0x447c21(0x284)](_0x4a91fd);}},getSelfSwitchValue=function(_0x2f93f4,_0x489aed,_0x315de3){const _0x186641=_0x518638;let _0x2622b=[_0x2f93f4,_0x489aed,_0x186641(0x3c5)[_0x186641(0x290)](_0x315de3)];return typeof _0x315de3===_0x186641(0x25e)&&(_0x2622b=[_0x2f93f4,_0x489aed,_0x315de3[_0x186641(0x4f8)]()[_0x186641(0x3a1)]()]),$gameSelfSwitches['value'](_0x2622b);},getMapSwitchValue=function(_0x46387f,_0x345a49){const _0x4cd2c0=_0x518638;let _0xabcc89=[0x0,0x0,_0x4cd2c0(0x4be)[_0x4cd2c0(0x290)](_0x46387f,_0x345a49)];return $gameSelfSwitches['value'](_0xabcc89);},getMapVariableValue=function(_0x2e56d7,_0x2b5804){const _0x462195=_0x518638;let _0x2e82bd=[0x0,0x0,_0x462195(0x1ee)['format'](_0x2e56d7,_0x2b5804)];return $gameSelfSwitches['value'](_0x2e82bd);},getSelfVariableValue=function(_0x13e4c0,_0x5cf65e,_0x4bf6c3){const _0x482230=_0x518638,_0x16d450=[_0x13e4c0,_0x5cf65e,_0x482230(0x451)[_0x482230(0x290)](_0x4bf6c3)];return $gameSelfSwitches[_0x482230(0x53c)](_0x16d450);},setSelfSwitchValue=function(_0x5c44ff,_0x1cfb21,_0x68580f,_0x4bc642){const _0x1e7e64=_0x518638;let _0xc41ee1=[_0x5c44ff,_0x1cfb21,'Self\x20Switch\x20%1'[_0x1e7e64(0x290)](_0x68580f)];typeof _0x68580f===_0x1e7e64(0x25e)&&(_0xc41ee1=[_0x5c44ff,_0x1cfb21,_0x68580f[_0x1e7e64(0x4f8)]()[_0x1e7e64(0x3a1)]()]),$gameSelfSwitches[_0x1e7e64(0x285)](_0xc41ee1,_0x4bc642);},setSelfVariableValue=function(_0x10e26f,_0x5ac73c,_0x3767b3,_0x306991){const _0x18f126=_0x518638,_0x44d64a=[_0x10e26f,_0x5ac73c,'Self\x20Variable\x20%1'['format'](_0x3767b3)];$gameSelfSwitches[_0x18f126(0x285)](_0x44d64a,_0x306991);},setMapSwitchValue=function(_0x2b1daf,_0x471c31,_0x303510){const _0x192e01=_0x518638;let _0x4b9a70=[0x0,0x0,_0x192e01(0x4be)[_0x192e01(0x290)](_0x2b1daf,_0x471c31)];$gameSelfSwitches[_0x192e01(0x285)](_0x4b9a70,_0x303510);},setMapVariableValue=function(_0xaa07fd,_0x55ec18,_0x5927f8){const _0x41dffb=_0x518638;let _0x48a0df=[0x0,0x0,_0x41dffb(0x1ee)[_0x41dffb(0x290)](_0xaa07fd,_0x55ec18)];$gameSelfSwitches[_0x41dffb(0x285)](_0x48a0df,_0x5927f8);},DataManager['isAdvancedSwitch']=function(_0x31a98a){const _0x4bf71c=_0x518638;if(SceneManager[_0x4bf71c(0x309)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x4bf71c(0x229)][_0x4bf71c(0x394)](_0x31a98a);},DataManager[_0x518638(0x34e)]=function(_0x47402a){const _0x35323e=_0x518638;if(SceneManager['_scene'][_0x35323e(0x364)]===Scene_Debug)return![];return VisuMZ[_0x35323e(0x1e1)]['includes'](_0x47402a);},DataManager['isSelfSwitch']=function(_0x17ef55){const _0x23533c=_0x518638;if(SceneManager[_0x23533c(0x309)][_0x23533c(0x364)]===Scene_Debug)return![];return VisuMZ[_0x23533c(0x4b0)][_0x23533c(0x394)](_0x17ef55);},DataManager[_0x518638(0x3ac)]=function(_0x4a3d26){const _0x29d9a9=_0x518638;if(SceneManager[_0x29d9a9(0x309)][_0x29d9a9(0x364)]===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0x29d9a9(0x394)](_0x4a3d26);},DataManager[_0x518638(0x428)]=function(_0x4a7a1a){const _0x3b6468=_0x518638;if(BattleManager[_0x3b6468(0x369)]())return![];return VisuMZ['MapSwitches']['includes'](_0x4a7a1a);},DataManager[_0x518638(0x321)]=function(_0x423ad9){const _0x8f47da=_0x518638;if(BattleManager[_0x8f47da(0x369)]())return![];return VisuMZ[_0x8f47da(0x15f)][_0x8f47da(0x394)](_0x423ad9);},VisuMZ['EventsMoveCore']['Game_Temp_setDestination']=Game_Temp[_0x518638(0x25b)][_0x518638(0x305)],Game_Temp[_0x518638(0x25b)][_0x518638(0x305)]=function(_0x583710,_0xfa3b94){const _0x45fbb6=_0x518638;if(this[_0x45fbb6(0x42e)](_0x583710,_0xfa3b94))return;VisuMZ['EventsMoveCore'][_0x45fbb6(0x188)]['call'](this,_0x583710,_0xfa3b94);},Game_Temp['prototype'][_0x518638(0x42e)]=function(_0x40b7ee,_0x3491a5){const _0x4d1b0d=_0x518638,_0xaece7f=$gameMap[_0x4d1b0d(0x356)](_0x40b7ee,_0x3491a5);for(const _0x7b84a0 of _0xaece7f){if(_0x7b84a0&&_0x7b84a0[_0x4d1b0d(0x44d)]())return _0x7b84a0['onClickTrigger'](),!![];}return![];},Game_Temp[_0x518638(0x25b)]['setLastPluginCommandInterpreter']=function(_0x44caf2){const _0x48c600=_0x518638;this[_0x48c600(0x39a)]=_0x44caf2;},Game_Temp[_0x518638(0x25b)][_0x518638(0x494)]=function(){const _0x5dc9d8=_0x518638;return this[_0x5dc9d8(0x39a)];},Game_Temp[_0x518638(0x25b)][_0x518638(0x503)]=function(_0x6236aa){const _0x5098f4=_0x518638;this[_0x5098f4(0x444)]=_0x6236aa;},Game_Temp[_0x518638(0x25b)][_0x518638(0x1e8)]=function(){const _0x3e7daa=_0x518638;this[_0x3e7daa(0x444)]=undefined;},Game_Temp[_0x518638(0x25b)][_0x518638(0x2f0)]=function(){const _0x2dc23a=_0x518638;return this[_0x2dc23a(0x444)];},VisuMZ[_0x518638(0x489)][_0x518638(0x187)]=Game_System[_0x518638(0x25b)]['initialize'],Game_System[_0x518638(0x25b)][_0x518638(0x41b)]=function(){const _0x180afe=_0x518638;VisuMZ[_0x180afe(0x489)][_0x180afe(0x187)]['call'](this),this[_0x180afe(0x243)](),this[_0x180afe(0x53b)]();},Game_System['prototype'][_0x518638(0x243)]=function(){const _0x406ed2=_0x518638;this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x406ed2(0x195)]=[],this[_0x406ed2(0x4fb)]={},this[_0x406ed2(0x435)]={},this['_DisablePlayerControl']=![],this[_0x406ed2(0x318)]=_0x406ed2(0x500);},Game_System[_0x518638(0x25b)][_0x518638(0x3cb)]=function(){const _0x347c98=_0x518638;if(this[_0x347c98(0x1b7)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x347c98(0x37f)]===undefined)this[_0x347c98(0x243)]();return this[_0x347c98(0x1b7)]['DashingEnable'];},Game_System[_0x518638(0x25b)]['setDashingEnabled']=function(_0x153a45){const _0x409a9a=_0x518638;if(this[_0x409a9a(0x1b7)]===undefined)this[_0x409a9a(0x243)]();if(this[_0x409a9a(0x1b7)]['DashingEnable']===undefined)this[_0x409a9a(0x243)]();this['_EventsMoveCoreSettings'][_0x409a9a(0x37f)]=_0x153a45;},Game_System[_0x518638(0x25b)][_0x518638(0x1d9)]=function(){const _0x428fd3=_0x518638;if(this[_0x428fd3(0x1b7)]===undefined)this[_0x428fd3(0x243)]();if(this[_0x428fd3(0x1b7)][_0x428fd3(0x30b)]===undefined)this[_0x428fd3(0x243)]();return this['_EventsMoveCoreSettings'][_0x428fd3(0x30b)];},Game_System['prototype'][_0x518638(0x2d0)]=function(_0x25962e){const _0x43bd22=_0x518638;if(this[_0x43bd22(0x1b7)]===undefined)this[_0x43bd22(0x243)]();if(this[_0x43bd22(0x1b7)][_0x43bd22(0x30b)]===undefined)this[_0x43bd22(0x243)]();this[_0x43bd22(0x1b7)]['EventAutoMovement']=_0x25962e;},Game_System[_0x518638(0x25b)]['eventLabelsVisible']=function(){const _0x1e861c=_0x518638;if(this[_0x1e861c(0x1b7)]===undefined)this[_0x1e861c(0x243)]();if(this[_0x1e861c(0x1b7)][_0x1e861c(0x3da)]===undefined)this[_0x1e861c(0x243)]();return this[_0x1e861c(0x1b7)][_0x1e861c(0x3da)];},Game_System[_0x518638(0x25b)][_0x518638(0x22f)]=function(_0x2fb10c){const _0x3f8dc8=_0x518638;if(this[_0x3f8dc8(0x1b7)]===undefined)this[_0x3f8dc8(0x243)]();if(this[_0x3f8dc8(0x1b7)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();this[_0x3f8dc8(0x1b7)][_0x3f8dc8(0x3da)]=_0x2fb10c;},Game_System[_0x518638(0x25b)][_0x518638(0x50e)]=function(){const _0x28d796=_0x518638;return this[_0x28d796(0x1f9)]===undefined&&(this['_DisablePlayerControl']=![]),this[_0x28d796(0x1f9)];},Game_System[_0x518638(0x25b)]['setPlayerControlDisable']=function(_0x3a23a3){const _0x3e0d07=_0x518638;this[_0x3e0d07(0x1f9)]=_0x3a23a3;},Game_System[_0x518638(0x25b)][_0x518638(0x1fb)]=function(){const _0x2d7871=_0x518638;return this[_0x2d7871(0x318)];},Game_System[_0x518638(0x25b)][_0x518638(0x3d9)]=function(_0x1f73df){const _0x455046=_0x518638;this[_0x455046(0x318)]=String(_0x1f73df)[_0x455046(0x265)]()['trim']();},Game_System[_0x518638(0x25b)]['getEventIconData']=function(_0x278513){const _0x452410=_0x518638;if(this[_0x452410(0x535)]===undefined)this[_0x452410(0x243)]();if(!_0x278513)return null;if(_0x278513===$gamePlayer)return this[_0x452410(0x535)]['Player'];else{const _0x405c40=VisuMZ['EventsMoveCore'][_0x452410(0x223)],_0xd29056=_0x452410(0x372)[_0x452410(0x290)](_0x278513[_0x452410(0x228)],_0x278513['_eventId']);return this['_EventIcons'][_0xd29056]=this[_0x452410(0x535)][_0xd29056]||{'iconIndex':0x0,'bufferX':_0x405c40['Icon'][_0x452410(0x3b7)],'bufferY':_0x405c40['Icon']['BufferY'],'blendMode':_0x405c40['Icon'][_0x452410(0x442)]},this[_0x452410(0x535)][_0xd29056];}},Game_System[_0x518638(0x25b)][_0x518638(0x2ec)]=function(_0x2407a4,_0x19a628,_0x30ef5d,_0x2121c0,_0x1c14da){const _0x1525d6=_0x518638;if(this[_0x1525d6(0x535)]===undefined)this[_0x1525d6(0x243)]();const _0xdea624=_0x2407a4===$gamePlayer?_0x1525d6(0x2f7):_0x1525d6(0x372)[_0x1525d6(0x290)](_0x2407a4[_0x1525d6(0x228)],_0x2407a4[_0x1525d6(0x45d)]);this[_0x1525d6(0x535)][_0xdea624]={'iconIndex':_0x19a628,'bufferX':_0x30ef5d,'bufferY':_0x2121c0,'blendMode':_0x1c14da};},Game_System['prototype'][_0x518638(0x4cc)]=function(_0x86ee3d,_0x42a958,_0x3a5312,_0x1a7454,_0x1715c0,_0x4d2b6c){const _0x5bd8c5=_0x518638;if(this[_0x5bd8c5(0x535)]===undefined)this[_0x5bd8c5(0x243)]();const _0x245067='Map%1-Event%2'[_0x5bd8c5(0x290)](_0x86ee3d,_0x42a958);this[_0x5bd8c5(0x535)][_0x245067]={'iconIndex':_0x3a5312,'bufferX':_0x1a7454,'bufferY':_0x1715c0,'blendMode':_0x4d2b6c};},Game_System[_0x518638(0x25b)][_0x518638(0x530)]=function(_0x2f4c21){const _0x2186a7=_0x518638;if(this[_0x2186a7(0x535)]===undefined)this[_0x2186a7(0x243)]();if(!_0x2f4c21)return null;_0x2f4c21===$gamePlayer?delete this[_0x2186a7(0x535)][_0x2186a7(0x2f7)]:this['deleteIconsOnEventsDataKey'](_0x2f4c21[_0x2186a7(0x228)],_0x2f4c21[_0x2186a7(0x45d)]);},Game_System['prototype']['deleteIconsOnEventsDataKey']=function(_0x1ee798,_0x2ca69d){const _0x62af91=_0x518638;if(this[_0x62af91(0x535)]===undefined)this['initEventsMoveCore']();const _0x4cda33=_0x62af91(0x372)[_0x62af91(0x290)](_0x1ee798,_0x2ca69d);delete this[_0x62af91(0x535)][_0x4cda33];},Game_System[_0x518638(0x25b)]['getSavedEventLocation']=function(_0x4b3a37){const _0x430730=_0x518638;if(this[_0x430730(0x435)]===undefined)this[_0x430730(0x243)]();if(!_0x4b3a37)return null;const _0x10fd88=_0x430730(0x372)[_0x430730(0x290)](_0x4b3a37[_0x430730(0x228)],_0x4b3a37[_0x430730(0x45d)]);return this[_0x430730(0x435)][_0x10fd88];},Game_System[_0x518638(0x25b)][_0x518638(0x30f)]=function(_0x11662e){const _0x3c893d=_0x518638;if(this['_SavedEventLocations']===undefined)this[_0x3c893d(0x243)]();if(!_0x11662e)return;const _0x1cea02=_0x3c893d(0x372)[_0x3c893d(0x290)](_0x11662e[_0x3c893d(0x228)],_0x11662e[_0x3c893d(0x45d)]);this[_0x3c893d(0x435)][_0x1cea02]={'direction':_0x11662e[_0x3c893d(0x1c0)](),'x':Math[_0x3c893d(0x302)](_0x11662e['x']),'y':Math['round'](_0x11662e['y']),'pageIndex':_0x11662e[_0x3c893d(0x37c)],'moveRouteIndex':_0x11662e[_0x3c893d(0x211)]};},Game_System[_0x518638(0x25b)][_0x518638(0x33c)]=function(_0x51bf81){const _0x137311=_0x518638;if(this[_0x137311(0x435)]===undefined)this['initEventsMoveCore']();if(!_0x51bf81)return;this[_0x137311(0x41d)](_0x51bf81[_0x137311(0x228)],_0x51bf81['_eventId']);},Game_System[_0x518638(0x25b)][_0x518638(0x41d)]=function(_0x14e456,_0x346772){const _0x378252=_0x518638;if(this['_SavedEventLocations']===undefined)this[_0x378252(0x243)]();const _0x42deb9=_0x378252(0x372)[_0x378252(0x290)](_0x14e456,_0x346772);delete this[_0x378252(0x435)][_0x42deb9];},Game_System[_0x518638(0x25b)]['createSaveEventLocationData']=function(_0x100d5e,_0x4a9418,_0x34665a,_0x116554,_0x40fac1,_0x113af0,_0x3fb5b6){const _0x2be368=_0x518638;if(this[_0x2be368(0x435)]===undefined)this[_0x2be368(0x243)]();const _0x58a25a=_0x2be368(0x372)[_0x2be368(0x290)](_0x100d5e,_0x4a9418);this['_SavedEventLocations'][_0x58a25a]={'direction':_0x40fac1,'x':Math[_0x2be368(0x302)](_0x34665a),'y':Math[_0x2be368(0x302)](_0x116554),'pageIndex':_0x113af0,'moveRouteIndex':_0x3fb5b6};},Game_System[_0x518638(0x25b)][_0x518638(0x32d)]=function(_0x1b2c9b){const _0x1509f1=_0x518638;if(this[_0x1509f1(0x4fb)]===undefined)this[_0x1509f1(0x243)]();if(!_0x1b2c9b)return;const _0x2d304a=_0x1509f1(0x372)[_0x1509f1(0x290)](_0x1b2c9b[_0x1509f1(0x228)],_0x1b2c9b[_0x1509f1(0x45d)]);return this['_PreservedEventMorphData'][_0x2d304a];},Game_System[_0x518638(0x25b)][_0x518638(0x36a)]=function(_0x979e49,_0x346f08,_0x58776b,_0x4a22a9,_0x5500f7){const _0x4b616a=_0x518638;if(this[_0x4b616a(0x4fb)]===undefined)this['initEventsMoveCore']();const _0x405bf3=_0x4b616a(0x372)['format'](_0x979e49,_0x346f08);this[_0x4b616a(0x4fb)][_0x405bf3]={'template':_0x58776b,'mapId':_0x4a22a9,'eventId':_0x5500f7};},Game_System['prototype']['deletePreservedMorphEventDataKey']=function(_0x101621,_0x5c9185){const _0x49adba=_0x518638;if(this[_0x49adba(0x4fb)]===undefined)this['initEventsMoveCore']();const _0x486051=_0x49adba(0x372)['format'](_0x101621,_0x5c9185);delete this['_PreservedEventMorphData'][_0x486051];},Game_System[_0x518638(0x25b)]['getMapSpawnedEventData']=function(_0x5bf204){const _0x52c9a6=_0x518638;if(this['_MapSpawnedEventData']===undefined)this[_0x52c9a6(0x243)]();return this[_0x52c9a6(0x195)][_0x5bf204]=this['_MapSpawnedEventData'][_0x5bf204]||[],this[_0x52c9a6(0x195)][_0x5bf204];},Game_System[_0x518638(0x25b)][_0x518638(0x208)]=function(_0x37821c){const _0x39c9c4=_0x518638,_0xeb0d17=this[_0x39c9c4(0x163)](_0x37821c);for(const _0x2233e9 of _0xeb0d17){if(!_0x2233e9)continue;if(_0x2233e9[_0x39c9c4(0x4ab)])continue;const _0x4c26ea=_0xeb0d17[_0x39c9c4(0x4a2)](_0x2233e9);_0xeb0d17[_0x4c26ea]=null;}},Game_System[_0x518638(0x25b)][_0x518638(0x53b)]=function(){const _0x3c4de5=_0x518638;this[_0x3c4de5(0x363)]=0x0,this[_0x3c4de5(0x4f2)]=![];},Game_System['prototype'][_0x518638(0x1b6)]=function(){const _0x3da5ca=_0x518638;if(this[_0x3da5ca(0x363)]===undefined)this[_0x3da5ca(0x53b)]();return this['_followerControlID'];},Game_System[_0x518638(0x25b)][_0x518638(0x1ff)]=function(_0x27a573){const _0x58823c=_0x518638;if(this[_0x58823c(0x363)]===undefined)this[_0x58823c(0x53b)]();this[_0x58823c(0x363)]=_0x27a573;;},VisuMZ[_0x518638(0x489)]['Game_Interpreter_character']=Game_Interpreter[_0x518638(0x25b)][_0x518638(0x3f3)],Game_Interpreter[_0x518638(0x25b)]['character']=function(_0x4684b8){const _0x56b2d5=_0x518638;if(!$gameParty[_0x56b2d5(0x533)]()&&_0x4684b8<0x0){let _0x1ab793=$gameSystem[_0x56b2d5(0x1b6)]();if(_0x1ab793>0x0)return $gamePlayer[_0x56b2d5(0x3a9)]()[_0x56b2d5(0x496)](_0x1ab793-0x1);}return VisuMZ[_0x56b2d5(0x489)][_0x56b2d5(0x492)][_0x56b2d5(0x495)](this,_0x4684b8);},Game_System['prototype'][_0x518638(0x455)]=function(){const _0x3a8258=_0x518638;if(this[_0x3a8258(0x4f2)]===undefined)this['initFollowerController']();return this[_0x3a8258(0x4f2)];},Game_System[_0x518638(0x25b)]['setStopFollowerChasing']=function(_0x2d0594){const _0x517237=_0x518638;if(this[_0x517237(0x4f2)]===undefined)this[_0x517237(0x53b)]();this[_0x517237(0x4f2)]=_0x2d0594;;},VisuMZ[_0x518638(0x489)][_0x518638(0x199)]=Game_Timer[_0x518638(0x25b)][_0x518638(0x41b)],Game_Timer[_0x518638(0x25b)][_0x518638(0x41b)]=function(){const _0x146963=_0x518638;VisuMZ['EventsMoveCore'][_0x146963(0x199)][_0x146963(0x495)](this),this[_0x146963(0x243)]();},Game_Timer[_0x518638(0x25b)]['initEventsMoveCore']=function(){this['_paused']=![],this['_speed']=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer[_0x518638(0x25b)][_0x518638(0x184)]=function(_0x4e5b2c){const _0x10c568=_0x518638;if(!_0x4e5b2c)return;if(!this[_0x10c568(0x4d9)])return;if(this[_0x10c568(0x2a5)])return;if(this[_0x10c568(0x483)]<=0x0)return;if(this[_0x10c568(0x303)]===undefined)this['initEventsMoveCore']();this[_0x10c568(0x483)]+=this[_0x10c568(0x303)],this[_0x10c568(0x483)]<=0x0&&this[_0x10c568(0x44a)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x288)]=Game_Timer[_0x518638(0x25b)][_0x518638(0x343)],Game_Timer['prototype']['start']=function(_0x6bdf05){const _0xe78a5d=_0x518638;VisuMZ[_0xe78a5d(0x489)]['Game_Timer_start'][_0xe78a5d(0x495)](this,_0x6bdf05);if(this['_paused']===undefined)this[_0xe78a5d(0x243)]();this[_0xe78a5d(0x2a5)]=![];},VisuMZ[_0x518638(0x489)][_0x518638(0x251)]=Game_Timer[_0x518638(0x25b)][_0x518638(0x23b)],Game_Timer[_0x518638(0x25b)][_0x518638(0x23b)]=function(){const _0x3314bd=_0x518638;VisuMZ[_0x3314bd(0x489)][_0x3314bd(0x251)]['call'](this);if(this[_0x3314bd(0x2a5)]===undefined)this[_0x3314bd(0x243)]();this[_0x3314bd(0x2a5)]=![];},Game_Timer[_0x518638(0x25b)]['pause']=function(){if(this['_frames']<=0x0)return;this['_paused']=!![],this['_working']=!![];},Game_Timer['prototype'][_0x518638(0x250)]=function(){const _0x160604=_0x518638;if(this[_0x160604(0x483)]<=0x0)return;this[_0x160604(0x2a5)]=![],this['_working']=!![];},Game_Timer[_0x518638(0x25b)][_0x518638(0x1f8)]=function(_0x4ceba5){const _0x4fb777=_0x518638;this[_0x4fb777(0x483)]=this[_0x4fb777(0x483)]||0x0,this[_0x4fb777(0x483)]+=_0x4ceba5,this[_0x4fb777(0x4d9)]=!![],this[_0x4fb777(0x483)]=Math[_0x4fb777(0x375)](0x1,this['_frames']);},Game_Timer[_0x518638(0x25b)][_0x518638(0x300)]=function(_0x3b9c2a){const _0xda723a=_0x518638;this[_0xda723a(0x483)]=this[_0xda723a(0x483)]||0x0,this[_0xda723a(0x483)]=_0x3b9c2a,this['_working']=!![],this['_frames']=Math[_0xda723a(0x375)](0x1,this['_frames']);},Game_Timer['prototype'][_0x518638(0x296)]=function(_0x4e64e0){const _0x49cd38=_0x518638;this[_0x49cd38(0x303)]=_0x4e64e0,this[_0x49cd38(0x4d9)]=!![],_0x4e64e0>0x0&&(this[_0x49cd38(0x483)]=Math['max'](this[_0x49cd38(0x483)],0x1));},Game_Timer['prototype'][_0x518638(0x2ce)]=function(_0x4cf19c){const _0x4d478a=_0x518638;if(this['_expireCommonEvent']===undefined)this[_0x4d478a(0x243)]();this['_expireCommonEvent']=_0x4cf19c;},VisuMZ['EventsMoveCore'][_0x518638(0x16f)]=Game_Timer[_0x518638(0x25b)][_0x518638(0x44a)],Game_Timer[_0x518638(0x25b)][_0x518638(0x44a)]=function(){const _0x239771=_0x518638;if(this[_0x239771(0x449)]===undefined)this[_0x239771(0x243)]();this[_0x239771(0x449)]?$gameTemp['reserveCommonEvent'](this[_0x239771(0x449)]):VisuMZ[_0x239771(0x489)][_0x239771(0x16f)]['call'](this);},VisuMZ[_0x518638(0x489)][_0x518638(0x409)]=Game_Message[_0x518638(0x25b)][_0x518638(0x268)],Game_Message['prototype'][_0x518638(0x268)]=function(_0x5f4ac0){const _0x15fa3a=_0x518638;VisuMZ[_0x15fa3a(0x489)][_0x15fa3a(0x409)]['call'](this,_0x5f4ac0),this['_selfEvent']=$gameTemp[_0x15fa3a(0x2f0)]();},Game_Message[_0x518638(0x25b)][_0x518638(0x226)]=function(){const _0x2b5447=_0x518638;$gameTemp[_0x2b5447(0x503)](this[_0x2b5447(0x249)]);},VisuMZ[_0x518638(0x489)]['Game_Switches_value']=Game_Switches[_0x518638(0x25b)][_0x518638(0x53c)],Game_Switches['prototype'][_0x518638(0x53c)]=function(_0x10c76f){const _0x2ee3e9=_0x518638;if(DataManager['isAdvancedSwitch'](_0x10c76f))return!!this[_0x2ee3e9(0x29d)](_0x10c76f);else{if(DataManager[_0x2ee3e9(0x2a9)](_0x10c76f))return!!this[_0x2ee3e9(0x25d)](_0x10c76f);else return DataManager[_0x2ee3e9(0x428)](_0x10c76f)?!!this[_0x2ee3e9(0x410)](_0x10c76f):VisuMZ[_0x2ee3e9(0x489)]['Game_Switches_value']['call'](this,_0x10c76f);}},Game_Switches[_0x518638(0x521)]={},Game_Switches['prototype']['advancedValue']=function(_0x4c10ae){const _0x4c90b5=_0x518638;if(!Game_Switches[_0x4c90b5(0x521)][_0x4c10ae]){$dataSystem[_0x4c90b5(0x4e6)][_0x4c10ae]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x43901=_0x4c90b5(0x1f2)[_0x4c90b5(0x290)](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x4c10ae]=new Function(_0x4c90b5(0x225),_0x43901);}const _0x53df5d=$gameTemp['getSelfTarget']()||this;return Game_Switches[_0x4c90b5(0x521)][_0x4c10ae][_0x4c90b5(0x495)](_0x53df5d,_0x4c10ae);},Game_Switches['prototype'][_0x518638(0x25d)]=function(_0x266f31){const _0x8e54e2=_0x518638,_0x2b0fe6=$gameTemp['getSelfTarget']()||this;if(_0x2b0fe6[_0x8e54e2(0x364)]!==Game_Event)return VisuMZ[_0x8e54e2(0x489)][_0x8e54e2(0x4d0)][_0x8e54e2(0x495)](this,_0x266f31);else{const _0x4f36d4=[_0x2b0fe6[_0x8e54e2(0x228)],_0x2b0fe6[_0x8e54e2(0x45d)],_0x8e54e2(0x3c5)[_0x8e54e2(0x290)](_0x266f31)];return $gameSelfSwitches[_0x8e54e2(0x53c)](_0x4f36d4);}},Game_Switches[_0x518638(0x25b)]['mapValue']=function(_0x2ad071){const _0x56957d=_0x518638,_0x346455=$gameMap?$gameMap['mapId']():0x0,_0x3efed1=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x56957d(0x290)](_0x346455,_0x2ad071)];return $gameSelfSwitches[_0x56957d(0x53c)](_0x3efed1);},VisuMZ[_0x518638(0x489)]['Game_Switches_setValue']=Game_Switches['prototype'][_0x518638(0x285)],Game_Switches[_0x518638(0x25b)][_0x518638(0x285)]=function(_0x59ecc8,_0x2a8d2f){const _0x179ce2=_0x518638;if(DataManager[_0x179ce2(0x2a9)](_0x59ecc8))this[_0x179ce2(0x20a)](_0x59ecc8,_0x2a8d2f);else DataManager[_0x179ce2(0x428)](_0x59ecc8)?this[_0x179ce2(0x2d6)](_0x59ecc8,_0x2a8d2f):VisuMZ[_0x179ce2(0x489)][_0x179ce2(0x4b1)][_0x179ce2(0x495)](this,_0x59ecc8,_0x2a8d2f);},Game_Switches['prototype'][_0x518638(0x20a)]=function(_0x29fc6c,_0x4b21da){const _0x1ee13d=_0x518638,_0x28d413=$gameTemp[_0x1ee13d(0x2f0)]()||this;if(_0x28d413['constructor']!==Game_Event)VisuMZ['EventsMoveCore'][_0x1ee13d(0x4b1)][_0x1ee13d(0x495)](this,_0x29fc6c,_0x4b21da);else{const _0x415e7d=[_0x28d413['_mapId'],_0x28d413[_0x1ee13d(0x45d)],_0x1ee13d(0x3c5)[_0x1ee13d(0x290)](_0x29fc6c)];$gameSelfSwitches[_0x1ee13d(0x285)](_0x415e7d,_0x4b21da);}},Game_Switches['prototype'][_0x518638(0x2d6)]=function(_0x2c29dd,_0x4cd7cf){const _0x93e667=_0x518638,_0x346cef=$gameMap?$gameMap['mapId']():0x0,_0x561312=[0x0,0x0,_0x93e667(0x4be)[_0x93e667(0x290)](_0x346cef,_0x2c29dd)];return $gameSelfSwitches[_0x93e667(0x285)](_0x561312,_0x4cd7cf);},VisuMZ[_0x518638(0x489)]['Game_Variables_value']=Game_Variables[_0x518638(0x25b)][_0x518638(0x53c)],Game_Variables['prototype'][_0x518638(0x53c)]=function(_0x4c2911){const _0x56f24a=_0x518638;if(DataManager[_0x56f24a(0x34e)](_0x4c2911))return this[_0x56f24a(0x29d)](_0x4c2911);else{if(DataManager[_0x56f24a(0x3ac)](_0x4c2911))return this['selfValue'](_0x4c2911);else return DataManager[_0x56f24a(0x321)](_0x4c2911)?this[_0x56f24a(0x410)](_0x4c2911):VisuMZ[_0x56f24a(0x489)]['Game_Variables_value']['call'](this,_0x4c2911);}},Game_Variables[_0x518638(0x521)]={},Game_Variables[_0x518638(0x25b)][_0x518638(0x29d)]=function(_0x5b1ea6){const _0x2fd830=_0x518638;if(!Game_Variables[_0x2fd830(0x521)][_0x5b1ea6]){$dataSystem[_0x2fd830(0x28a)][_0x5b1ea6][_0x2fd830(0x297)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x562a74=_0x2fd830(0x1f2)['format'](String(RegExp['$1']));Game_Variables[_0x2fd830(0x521)][_0x5b1ea6]=new Function(_0x2fd830(0x1cf),_0x562a74);}const _0x42e613=$gameTemp['getSelfTarget']()||this;return Game_Variables['advancedFunc'][_0x5b1ea6]['call'](_0x42e613,_0x5b1ea6);},Game_Variables['prototype'][_0x518638(0x25d)]=function(_0x274932){const _0x193b63=_0x518638,_0x4def70=$gameTemp[_0x193b63(0x2f0)]()||this;if(_0x4def70[_0x193b63(0x364)]!==Game_Event)return VisuMZ[_0x193b63(0x489)][_0x193b63(0x443)]['call'](this,_0x274932);else{const _0x2d6db1=[_0x4def70['_mapId'],_0x4def70[_0x193b63(0x45d)],_0x193b63(0x451)[_0x193b63(0x290)](_0x274932)];return $gameSelfSwitches[_0x193b63(0x53c)](_0x2d6db1);}},Game_Variables['prototype']['mapValue']=function(_0x46fe90){const _0x2ee404=_0x518638,_0x3a483f=$gameMap?$gameMap[_0x2ee404(0x1ec)]():0x0,_0x27b2a2=[0x0,0x0,_0x2ee404(0x1ee)[_0x2ee404(0x290)](_0x3a483f,_0x46fe90)];return $gameSelfSwitches['value'](_0x27b2a2)||0x0;},VisuMZ[_0x518638(0x489)][_0x518638(0x1de)]=Game_Variables[_0x518638(0x25b)][_0x518638(0x285)],Game_Variables['prototype'][_0x518638(0x285)]=function(_0x1c15f3,_0x4d7f14){const _0xebe290=_0x518638;if(DataManager[_0xebe290(0x3ac)](_0x1c15f3))this[_0xebe290(0x20a)](_0x1c15f3,_0x4d7f14);else DataManager[_0xebe290(0x321)](_0x1c15f3)?this[_0xebe290(0x2d6)](_0x1c15f3,_0x4d7f14):VisuMZ[_0xebe290(0x489)][_0xebe290(0x1de)][_0xebe290(0x495)](this,_0x1c15f3,_0x4d7f14);},Game_Variables[_0x518638(0x25b)][_0x518638(0x20a)]=function(_0x307453,_0x4ad1f3){const _0x3a7e03=_0x518638,_0x2afa59=$gameTemp['getSelfTarget']()||this;if(_0x2afa59[_0x3a7e03(0x364)]!==Game_Event)VisuMZ[_0x3a7e03(0x489)]['Game_Variables_setValue'][_0x3a7e03(0x495)](this,_0x307453,_0x4ad1f3);else{const _0x22283c=[_0x2afa59['_mapId'],_0x2afa59[_0x3a7e03(0x45d)],_0x3a7e03(0x451)[_0x3a7e03(0x290)](_0x307453)];$gameSelfSwitches[_0x3a7e03(0x285)](_0x22283c,_0x4ad1f3);}},Game_Variables[_0x518638(0x25b)][_0x518638(0x2d6)]=function(_0x523afb,_0x5b99f4){const _0x55cb94=_0x518638,_0x469e0b=$gameMap?$gameMap[_0x55cb94(0x1ec)]():0x0,_0x3a0df4=[0x0,0x0,_0x55cb94(0x1ee)['format'](_0x469e0b,_0x523afb)];$gameSelfSwitches['setValue'](_0x3a0df4,_0x5b99f4);},VisuMZ[_0x518638(0x489)][_0x518638(0x22e)]=Game_SelfSwitches[_0x518638(0x25b)][_0x518638(0x53c)],Game_SelfSwitches[_0x518638(0x25b)][_0x518638(0x53c)]=function(_0xdf581e){const _0x10346f=_0x518638;if(_0xdf581e[0x2][_0x10346f(0x297)](/(?:SELF|MAP)/i))return this[_0x10346f(0x25d)](_0xdf581e);else{return VisuMZ['EventsMoveCore']['Game_SelfSwitches_value'][_0x10346f(0x495)](this,_0xdf581e);;}},Game_SelfSwitches[_0x518638(0x25b)][_0x518638(0x25d)]=function(_0x3af7a2){const _0x4521a1=_0x518638;return _0x3af7a2[0x2][_0x4521a1(0x297)](/VAR/i)?this['_data'][_0x3af7a2]||0x0:!!this[_0x4521a1(0x1fe)][_0x3af7a2];},VisuMZ[_0x518638(0x489)]['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x518638(0x25b)]['setValue'],Game_SelfSwitches['prototype'][_0x518638(0x285)]=function(_0x227622,_0x42b7e9){const _0x5a0f1a=_0x518638;_0x227622[0x2]['match'](/(?:SELF|MAP)/i)?this[_0x5a0f1a(0x20a)](_0x227622,_0x42b7e9):VisuMZ[_0x5a0f1a(0x489)][_0x5a0f1a(0x47d)][_0x5a0f1a(0x495)](this,_0x227622,_0x42b7e9);},Game_SelfSwitches[_0x518638(0x25b)][_0x518638(0x20a)]=function(_0x5c4260,_0xe027cf){const _0x1c0d65=_0x518638;this['_data'][_0x5c4260]=_0x5c4260[0x2][_0x1c0d65(0x297)](/VAR/i)?_0xe027cf:!!_0xe027cf,this[_0x1c0d65(0x185)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x396)]=Game_Enemy[_0x518638(0x25b)][_0x518638(0x2df)],Game_Enemy[_0x518638(0x25b)][_0x518638(0x2df)]=function(_0x3dec82){const _0x5315b0=_0x518638;$gameTemp['registerSelfTarget'](this);const _0x11364b=VisuMZ[_0x5315b0(0x489)][_0x5315b0(0x396)][_0x5315b0(0x495)](this,_0x3dec82);return $gameTemp['clearSelfTarget'](),_0x11364b;},VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions']=Game_Troop['prototype'][_0x518638(0x3b5)],Game_Troop[_0x518638(0x25b)][_0x518638(0x3b5)]=function(_0x4a3e8e){const _0x47c1d8=_0x518638;$gameTemp[_0x47c1d8(0x503)](this);const _0x590c60=VisuMZ[_0x47c1d8(0x489)][_0x47c1d8(0x347)]['call'](this,_0x4a3e8e);return $gameTemp[_0x47c1d8(0x1e8)](),_0x590c60;},VisuMZ['EventsMoveCore'][_0x518638(0x3f7)]=Game_Map[_0x518638(0x25b)][_0x518638(0x3ae)],Game_Map[_0x518638(0x25b)]['setup']=function(_0x33a1eb){const _0x2c7438=_0x518638;this['removeTemporaryMapSpawnedEvents'](_0x33a1eb),this[_0x2c7438(0x4ae)](),VisuMZ[_0x2c7438(0x489)][_0x2c7438(0x3f7)]['call'](this,_0x33a1eb),this[_0x2c7438(0x4ae)](),this[_0x2c7438(0x2b2)](),this[_0x2c7438(0x2e5)](),this[_0x2c7438(0x24d)](),this[_0x2c7438(0x202)](),this[_0x2c7438(0x4ae)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x520)]=Game_Map[_0x518638(0x25b)][_0x518638(0x2e1)],Game_Map[_0x518638(0x25b)]['setupEvents']=function(){const _0x2a5d9b=_0x518638;VisuMZ['EventsMoveCore']['Game_Map_setupEvents'][_0x2a5d9b(0x495)](this),this[_0x2a5d9b(0x48f)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x518638(0x25b)][_0x518638(0x4a8)]=function(){const _0x54e891=_0x518638,_0x443c3c=Game_Map[_0x54e891(0x4ec)];this[_0x54e891(0x43c)]=this[_0x54e891(0x2c6)]()[_0x54e891(0x433)]>_0x443c3c;if(this[_0x54e891(0x43c)]&&$gameTemp[_0x54e891(0x308)]()){}},Game_Map[_0x518638(0x25b)][_0x518638(0x245)]=function(){const _0x2b63bc=_0x518638;return this[_0x2b63bc(0x43c)];},Game_Map[_0x518638(0x25b)][_0x518638(0x4ae)]=function(){const _0x199787=_0x518638;this[_0x199787(0x403)]=undefined;},Game_Map[_0x518638(0x25b)][_0x518638(0x2b2)]=function(){const _0x2ebbe0=_0x518638;this[_0x2ebbe0(0x1e3)]=VisuMZ[_0x2ebbe0(0x489)][_0x2ebbe0(0x223)]['Movement']['EnableDir8'];const _0x5a6fba=$dataMap[_0x2ebbe0(0x3fa)]||'';if(_0x5a6fba[_0x2ebbe0(0x297)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x2ebbe0(0x1e3)]=!![];else _0x5a6fba[_0x2ebbe0(0x297)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x2ebbe0(0x1e3)]=![]);},Game_Map[_0x518638(0x25b)][_0x518638(0x1b9)]=function(){const _0x2857f1=_0x518638,_0x529307=$gameSystem[_0x2857f1(0x1fb)]();if(_0x529307==='enable')return!![];if(_0x529307==='disable')return![];if(this[_0x2857f1(0x1e3)]===undefined)this['setupDiagonalSupport']();return this['_diagonalSupport'];},Game_Map[_0x518638(0x25b)][_0x518638(0x168)]=function(_0x52968b,_0x3fb08e){const _0x5afa2d=_0x518638;if([0x1,0x4,0x7]['includes'](_0x3fb08e))_0x52968b-=0x1;if([0x3,0x6,0x9]['includes'](_0x3fb08e))_0x52968b+=0x1;return this[_0x5afa2d(0x1c3)](_0x52968b);},Game_Map['prototype'][_0x518638(0x4a4)]=function(_0x4d4850,_0x13f9a4){const _0xf3e292=_0x518638;if([0x1,0x2,0x3][_0xf3e292(0x394)](_0x13f9a4))_0x4d4850+=0x1;if([0x7,0x8,0x9]['includes'](_0x13f9a4))_0x4d4850-=0x1;return this[_0xf3e292(0x182)](_0x4d4850);},Game_Map[_0x518638(0x25b)][_0x518638(0x357)]=function(_0x5d62f3,_0xe4a208,_0x1d30f5,_0x49bc7f){const _0x48324b=_0x518638;return Math[_0x48324b(0x375)](Math[_0x48324b(0x350)](this[_0x48324b(0x390)](_0x5d62f3,_0x1d30f5)),Math[_0x48324b(0x350)](this[_0x48324b(0x29b)](_0xe4a208,_0x49bc7f)));},Game_Map[_0x518638(0x25b)][_0x518638(0x2e5)]=function(){const _0x21e4b2=_0x518638,_0x1e2eea=VisuMZ[_0x21e4b2(0x489)][_0x21e4b2(0x223)][_0x21e4b2(0x3a4)],_0x421680={},_0x2c6a86=[_0x21e4b2(0x3a0),'Forbid',_0x21e4b2(0x292)],_0x6f65ca=[_0x21e4b2(0x1db),_0x21e4b2(0x3e5),'Player','Event',_0x21e4b2(0x36c),_0x21e4b2(0x3f9),_0x21e4b2(0x36b),_0x21e4b2(0x2f3)];for(const _0x5908b3 of _0x2c6a86){for(const _0x509dc9 of _0x6f65ca){const _0x47de6c=_0x21e4b2(0x25a)[_0x21e4b2(0x290)](_0x509dc9,_0x5908b3);_0x1e2eea[_0x47de6c]&&(_0x421680[_0x47de6c]=_0x1e2eea[_0x47de6c]['slice'](0x0));}}const _0x5097f9=$dataMap[_0x21e4b2(0x3fa)]||'',_0x46b2f6=_0x5097f9['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x46b2f6)for(const _0x4d90fb of _0x46b2f6){_0x4d90fb[_0x21e4b2(0x297)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x39315a=String(RegExp['$1'])[_0x21e4b2(0x265)]()[_0x21e4b2(0x3a1)](),_0x3fa9d5=String(RegExp['$2'])[_0x21e4b2(0x265)]()[_0x21e4b2(0x3a1)]();const _0x1f9f79=JSON[_0x21e4b2(0x3c7)]('['+RegExp['$3'][_0x21e4b2(0x297)](/\d+/g)+']');_0x39315a=_0x39315a[_0x21e4b2(0x4d1)](0x0)[_0x21e4b2(0x4f8)]()+_0x39315a[_0x21e4b2(0x459)](0x1),_0x3fa9d5=_0x3fa9d5[_0x21e4b2(0x4d1)](0x0)[_0x21e4b2(0x4f8)]()+_0x3fa9d5['slice'](0x1);const _0x51082e=_0x21e4b2(0x25a)[_0x21e4b2(0x290)](_0x39315a,_0x3fa9d5);if(_0x421680[_0x51082e])_0x421680[_0x51082e]=_0x421680[_0x51082e][_0x21e4b2(0x2b7)](_0x1f9f79);}this['_regionRules']=_0x421680;},Game_Map[_0x518638(0x25b)][_0x518638(0x33a)]=function(_0x1449ba,_0x1bf547,_0x127dcd,_0x561abc){const _0x359f38=_0x518638,_0x5394ed=this[_0x359f38(0x168)](_0x1449ba,_0x127dcd),_0x12ade3=this[_0x359f38(0x4a4)](_0x1bf547,_0x127dcd),_0x4137c6=this[_0x359f38(0x232)](_0x5394ed,_0x12ade3),_0x4c6c49=this[_0x359f38(0x4b2)];if(_0x4c6c49[_0x359f38(0x2cf)][_0x359f38(0x394)](_0x4137c6))return!![];else{if(_0x561abc==='player')return _0x4c6c49[_0x359f38(0x4f0)][_0x359f38(0x394)](_0x4137c6)||_0x4c6c49[_0x359f38(0x505)][_0x359f38(0x394)](_0x4137c6);else{if(_0x561abc===_0x359f38(0x40c))return _0x4c6c49[_0x359f38(0x224)][_0x359f38(0x394)](_0x4137c6)||_0x4c6c49[_0x359f38(0x505)][_0x359f38(0x394)](_0x4137c6);else{if(_0x4c6c49[_0x359f38(0x525)][_0x359f38(0x394)](_0x4137c6))return!![];else{const _0x110776=_0x359f38(0x47f)[_0x359f38(0x290)](_0x561abc[_0x359f38(0x4d1)](0x0)[_0x359f38(0x4f8)]()+_0x561abc[_0x359f38(0x459)](0x1));if(_0x4c6c49[_0x110776])return _0x4c6c49[_0x110776][_0x359f38(0x394)](_0x4137c6);}}}}return![];},Game_Map[_0x518638(0x25b)][_0x518638(0x171)]=function(_0x4849d2,_0x182d4c,_0x100191,_0x16729c){const _0x3ce0d0=_0x518638,_0x3a66b6=this[_0x3ce0d0(0x168)](_0x4849d2,_0x100191),_0x49e7cd=this[_0x3ce0d0(0x4a4)](_0x182d4c,_0x100191),_0x381772=this[_0x3ce0d0(0x232)](_0x3a66b6,_0x49e7cd),_0x2eb813=this['_regionRules'];if(_0x2eb813[_0x3ce0d0(0x191)][_0x3ce0d0(0x394)](_0x381772))return!![];else{if(_0x16729c==='player')return _0x2eb813[_0x3ce0d0(0x254)][_0x3ce0d0(0x394)](_0x381772)||_0x2eb813[_0x3ce0d0(0x17c)][_0x3ce0d0(0x394)](_0x381772);else{if(_0x16729c===_0x3ce0d0(0x40c))return _0x2eb813['EventForbid'][_0x3ce0d0(0x394)](_0x381772)||_0x2eb813[_0x3ce0d0(0x17c)][_0x3ce0d0(0x394)](_0x381772);else{if(_0x2eb813[_0x3ce0d0(0x2b4)][_0x3ce0d0(0x394)](_0x381772))return!![];else{const _0x78d3a9='%1Forbid'[_0x3ce0d0(0x290)](_0x16729c['charAt'](0x0)[_0x3ce0d0(0x4f8)]()+_0x16729c[_0x3ce0d0(0x459)](0x1));if(_0x2eb813[_0x78d3a9])return _0x2eb813[_0x78d3a9][_0x3ce0d0(0x394)](_0x381772);}}}}return![];},Game_Map[_0x518638(0x25b)][_0x518638(0x3c2)]=function(_0x417b9b,_0x4f2ddd,_0x334b8b,_0x21a87b){const _0x3d4a82=_0x518638;_0x334b8b=_0x21a87b===_0x3d4a82(0x18b)?0x5:_0x334b8b;const _0x7140a0=this[_0x3d4a82(0x168)](_0x417b9b,_0x334b8b),_0x2c00c8=this[_0x3d4a82(0x4a4)](_0x4f2ddd,_0x334b8b),_0x2aca48=this[_0x3d4a82(0x232)](_0x7140a0,_0x2c00c8),_0x2290a3=this['_regionRules'];if(_0x2290a3['VehicleDock'][_0x3d4a82(0x394)](_0x2aca48))return!![];else{const _0x5982e5=_0x3d4a82(0x307)[_0x3d4a82(0x290)](_0x21a87b[_0x3d4a82(0x4d1)](0x0)[_0x3d4a82(0x4f8)]()+_0x21a87b[_0x3d4a82(0x459)](0x1));if(_0x2290a3[_0x5982e5])return _0x2290a3[_0x5982e5][_0x3d4a82(0x394)](_0x2aca48);}return![];},VisuMZ[_0x518638(0x489)][_0x518638(0x4b3)]=Game_Map[_0x518638(0x25b)][_0x518638(0x2cd)],Game_Map['prototype'][_0x518638(0x2cd)]=function(){const _0x857ea9=_0x518638;VisuMZ[_0x857ea9(0x489)][_0x857ea9(0x4b3)][_0x857ea9(0x495)](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x518638(0x25b)]['checkNeedForPeriodicRefresh']=function(){const _0x2c5d3f=_0x518638;this[_0x2c5d3f(0x19e)]=![];if(this['events']()['some'](_0x312691=>_0x312691[_0x2c5d3f(0x3c8)]())){this[_0x2c5d3f(0x19e)]=!![];return;}if(this[_0x2c5d3f(0x2c6)]()[_0x2c5d3f(0x335)](_0x30bc9a=>_0x30bc9a[_0x2c5d3f(0x46e)]())){this[_0x2c5d3f(0x19e)]=!![];return;}if(this['_commonEvents'][_0x2c5d3f(0x335)](_0x27ef0f=>_0x27ef0f[_0x2c5d3f(0x3c8)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x2c5d3f(0x2fc)][_0x2c5d3f(0x335)](_0x1d1b79=>_0x1d1b79[_0x2c5d3f(0x46e)]())){this['_needsPeriodicRefresh']=!![];return;}},VisuMZ[_0x518638(0x489)][_0x518638(0x3fc)]=Game_Map[_0x518638(0x25b)]['update'],Game_Map[_0x518638(0x25b)][_0x518638(0x184)]=function(_0x301b3e){const _0x36589b=_0x518638;this[_0x36589b(0x2b5)](),VisuMZ['EventsMoveCore'][_0x36589b(0x3fc)][_0x36589b(0x495)](this,_0x301b3e);},Game_Map[_0x518638(0x25b)]['updatePeriodicRefresh']=function(){const _0x4e0e12=_0x518638;if(!this['_needsPeriodicRefresh'])return;this['_periodicRefreshTimer']=this[_0x4e0e12(0x20d)]||0x3c,this[_0x4e0e12(0x20d)]--,this['_periodicRefreshTimer']<=0x0&&(this['requestRefresh'](),this[_0x4e0e12(0x20d)]=0x3c);},VisuMZ[_0x518638(0x489)]['Game_Map_isDashDisabled']=Game_Map[_0x518638(0x25b)][_0x518638(0x2db)],Game_Map[_0x518638(0x25b)][_0x518638(0x2db)]=function(){const _0xf0d4fc=_0x518638;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0xf0d4fc(0x489)][_0xf0d4fc(0x235)][_0xf0d4fc(0x495)](this);},Game_Map['prototype'][_0x518638(0x24d)]=function(){const _0xc990e9=_0x518638;this[_0xc990e9(0x4bf)]=![];const _0x1bfc22=$dataMap[_0xc990e9(0x3fa)]||'';_0x1bfc22['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0xc990e9(0x4bf)]=!![]);},Game_Map['prototype'][_0x518638(0x252)]=function(){const _0x1cd283=_0x518638;if(this[_0x1cd283(0x4bf)]===undefined)this[_0x1cd283(0x24d)]();return this[_0x1cd283(0x4bf)];},Game_Map['prototype'][_0x518638(0x208)]=function(_0x265358){const _0x42b252=_0x518638;_0x265358!==this[_0x42b252(0x1ec)]()&&$gamePlayer&&$gameSystem[_0x42b252(0x208)](this['mapId']());},Game_Map[_0x518638(0x25b)]['setupSpawnedEvents']=function(){const _0x40ced0=_0x518638;this[_0x40ced0(0x465)]=$gameSystem[_0x40ced0(0x163)](this[_0x40ced0(0x1ec)]()),this[_0x40ced0(0x23c)]=!![];},VisuMZ[_0x518638(0x489)][_0x518638(0x378)]=Game_Map[_0x518638(0x25b)][_0x518638(0x2c6)],Game_Map['prototype'][_0x518638(0x2c6)]=function(){const _0x3627d9=_0x518638;if(this[_0x3627d9(0x403)])return this[_0x3627d9(0x403)];const _0x236551=VisuMZ[_0x3627d9(0x489)][_0x3627d9(0x378)][_0x3627d9(0x495)](this),_0x33fb8a=_0x236551[_0x3627d9(0x2b7)](this[_0x3627d9(0x465)]||[]);return this[_0x3627d9(0x403)]=_0x33fb8a[_0x3627d9(0x39f)](_0x3c983e=>!!_0x3c983e),this['_eventCache'];},VisuMZ[_0x518638(0x489)]['Game_Map_event']=Game_Map['prototype'][_0x518638(0x40c)],Game_Map['prototype'][_0x518638(0x40c)]=function(_0x2113bd){const _0xaade7a=_0x518638;return _0x2113bd>=0x3e8?(_0x2113bd-=0x3e8,this[_0xaade7a(0x465)][_0x2113bd]):VisuMZ['EventsMoveCore'][_0xaade7a(0x508)][_0xaade7a(0x495)](this,_0x2113bd);},Game_Map['prototype']['eraseEvent']=function(_0x101f5c){const _0x51c56f=_0x518638,_0xcdcf4=this['event'](_0x101f5c);if(_0xcdcf4)_0xcdcf4[_0x51c56f(0x467)]();},Game_Map[_0x518638(0x25b)][_0x518638(0x28f)]=function(){const _0x22a122=_0x518638,_0x5ccf67={'template':_0x22a122(0x517),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x22a122(0x465)]['length']+0x3e8};this[_0x22a122(0x4c6)](_0x5ccf67);},Game_Map[_0x518638(0x25b)][_0x518638(0x541)]=function(_0x2e1256,_0x410f85){const _0x53ef27=_0x518638;if(this[_0x53ef27(0x356)](_0x2e1256,_0x410f85)[_0x53ef27(0x433)]>0x0)return!![];if($gamePlayer['x']===_0x2e1256&&$gamePlayer['y']===_0x410f85)return!![];if(this[_0x53ef27(0x44c)]()['posNt'](_0x2e1256,_0x410f85))return!![];if(this[_0x53ef27(0x275)]()[_0x53ef27(0x4dc)](_0x2e1256,_0x410f85))return!![];return![];},Game_Map[_0x518638(0x25b)][_0x518638(0x24b)]=function(_0xb6e2a,_0x2f163b,_0x935026){const _0xa09da7=_0x518638;$gameTemp[_0xa09da7(0x52a)]=_0xb6e2a;const _0x5df97d=new Game_Event(_0xb6e2a[_0xa09da7(0x1ec)],_0xb6e2a[_0xa09da7(0x18e)]);$gameTemp[_0xa09da7(0x52a)]=undefined,_0x5df97d[_0xa09da7(0x2cd)]();let _0x2de895=_0x2f163b-_0x5df97d[_0xa09da7(0x430)][_0xa09da7(0x35c)],_0x31cab1=_0x2f163b+_0x5df97d[_0xa09da7(0x430)][_0xa09da7(0x35c)],_0x3c82a9=_0x935026-_0x5df97d['_addedHitbox']['up'],_0x2e4f04=_0x935026+_0x5df97d['_addedHitbox']['down'];for(let _0x50a7a4=_0x2de895;_0x50a7a4<=_0x31cab1;_0x50a7a4++){for(let _0x5ce270=_0x3c82a9;_0x5ce270<=_0x2e4f04;_0x5ce270++){if(this[_0xa09da7(0x541)](_0x50a7a4,_0x5ce270))return![];}}return!![];},Game_Map[_0x518638(0x25b)][_0x518638(0x4c6)]=function(_0x50b57d){const _0x55f47e=_0x518638;$gameTemp[_0x55f47e(0x52a)]=_0x50b57d;const _0x3df59a=new Game_Event(_0x50b57d[_0x55f47e(0x1ec)],_0x50b57d[_0x55f47e(0x18e)]);$gameTemp['_spawnData']=undefined,this['_spawnedEvents'][_0x55f47e(0x284)](_0x3df59a),_0x3df59a[_0x55f47e(0x493)](_0x50b57d),this['clearEventCache']();},Game_Map[_0x518638(0x25b)][_0x518638(0x18f)]=function(_0x5b6395,_0x321592,_0x5b5564){const _0x428fae=_0x518638,_0x1935ba=_0x5b6395['template'][_0x428fae(0x4f8)]()[_0x428fae(0x3a1)]();if(_0x1935ba!==_0x428fae(0x1c4)){const _0x5e3f33=VisuMZ[_0x428fae(0x414)][_0x1935ba];_0x5e3f33&&(_0x5b6395['mapId']=_0x5e3f33[_0x428fae(0x44b)],_0x5b6395[_0x428fae(0x18e)]=_0x5e3f33[_0x428fae(0x3e9)]);}const _0x3f86c4=_0x5b6395['x'],_0x5c60e2=_0x5b6395['y'];if(!this[_0x428fae(0x370)](_0x3f86c4,_0x5c60e2))return![];if(_0x321592){if(this[_0x428fae(0x541)](_0x3f86c4,_0x5c60e2))return![];if(!this['isSpawnHitboxCollisionOk'](_0x5b6395,_0x3f86c4,_0x5c60e2))return![];}if(_0x5b5564){if(!this['isPassableByAnyDirection'](_0x3f86c4,_0x5c60e2))return![];}return this['createSpawnedEventWithData'](_0x5b6395),!![];},Game_Map[_0x518638(0x25b)][_0x518638(0x387)]=function(_0x244cbe,_0x130de5,_0x562ac3,_0x834f16){const _0x530e51=_0x518638,_0x28952b=[],_0x5d95e8=this[_0x530e51(0x39b)](),_0x418ee6=this[_0x530e51(0x2ef)]();for(let _0x3dc60d=0x0;_0x3dc60d<_0x5d95e8;_0x3dc60d++){for(let _0x11ccec=0x0;_0x11ccec<_0x418ee6;_0x11ccec++){if(!_0x130de5[_0x530e51(0x394)](this['regionId'](_0x3dc60d,_0x11ccec)))continue;if(!this[_0x530e51(0x370)](_0x3dc60d,_0x11ccec))continue;if(_0x562ac3){if(this['checkExistingEntitiesAt'](_0x3dc60d,_0x11ccec))continue;if(!this[_0x530e51(0x24b)](_0x244cbe,_0x3dc60d,_0x11ccec))continue;}if(_0x834f16){if(!this['isPassableByAnyDirection'](_0x3dc60d,_0x11ccec))continue;}_0x28952b['push']([_0x3dc60d,_0x11ccec]);}}if(_0x28952b[_0x530e51(0x433)]>0x0){const _0x3ac3e7=_0x28952b[Math[_0x530e51(0x262)](_0x28952b[_0x530e51(0x433)])];return _0x244cbe['x']=_0x3ac3e7[0x0],_0x244cbe['y']=_0x3ac3e7[0x1],this[_0x530e51(0x4c6)](_0x244cbe),!![];}return![];},Game_Map['prototype'][_0x518638(0x4c1)]=function(_0x2d8553,_0x4940f2,_0x41e860,_0x2974f8){const _0x102358=_0x518638,_0x5ebdee=[],_0x596bcd=this['width'](),_0x4cb895=this['height']();for(let _0x2071e6=0x0;_0x2071e6<_0x596bcd;_0x2071e6++){for(let _0x163a32=0x0;_0x163a32<_0x4cb895;_0x163a32++){if(!_0x4940f2[_0x102358(0x394)](this[_0x102358(0x37b)](_0x2071e6,_0x163a32)))continue;if(!this['isValid'](_0x2071e6,_0x163a32))continue;if(_0x41e860){if(this[_0x102358(0x541)](_0x2071e6,_0x163a32))continue;if(!this[_0x102358(0x24b)](_0x2d8553,_0x2071e6,_0x163a32))continue;}if(_0x2974f8){if(!this[_0x102358(0x538)](_0x2071e6,_0x163a32))continue;}_0x5ebdee[_0x102358(0x284)]([_0x2071e6,_0x163a32]);}}if(_0x5ebdee[_0x102358(0x433)]>0x0){const _0x3072fd=_0x5ebdee[Math['randomInt'](_0x5ebdee[_0x102358(0x433)])];return _0x2d8553['x']=_0x3072fd[0x0],_0x2d8553['y']=_0x3072fd[0x1],this['createSpawnedEventWithData'](_0x2d8553),!![];}return![];},Game_Map[_0x518638(0x25b)][_0x518638(0x538)]=function(_0x3ec13b,_0x296e1c){const _0x32cd7b=_0x518638;if(this['isPassable'](_0x3ec13b,_0x296e1c,0x2))return!![];if(this[_0x32cd7b(0x2f4)](_0x3ec13b,_0x296e1c,0x4))return!![];if(this['isPassable'](_0x3ec13b,_0x296e1c,0x6))return!![];if(this[_0x32cd7b(0x2f4)](_0x3ec13b,_0x296e1c,0x8))return!![];return![];},Game_Map['prototype'][_0x518638(0x287)]=function(_0x1fa5f2){const _0xacb99=_0x518638;if(_0x1fa5f2<0x3e8)return;if(!this[_0xacb99(0x465)])return;const _0x5c4bcb=this[_0xacb99(0x40c)](_0x1fa5f2);_0x5c4bcb[_0xacb99(0x26a)](-0x1,-0x1),_0x5c4bcb['erase'](),this['_spawnedEvents'][_0x1fa5f2-0x3e8]=null,this[_0xacb99(0x4ae)]();},Game_Map['prototype'][_0x518638(0x53e)]=function(){const _0x5e0230=_0x518638;for(const _0x15c57d of this[_0x5e0230(0x465)]){if(_0x15c57d)return _0x15c57d;}return null;},Game_Map[_0x518638(0x25b)][_0x518638(0x4fe)]=function(){const _0x451934=_0x518638,_0x51e95b=this[_0x451934(0x53e)]();return _0x51e95b?_0x51e95b['_eventId']:0x0;},Game_Map[_0x518638(0x25b)]['lastSpawnedEvent']=function(){const _0x5659a7=_0x518638,_0x12f7f1=this['_spawnedEvents'][_0x5659a7(0x459)](0x0)[_0x5659a7(0x15e)]();for(const _0x2f344f of _0x12f7f1){if(_0x2f344f)return _0x2f344f;}return null;},Game_Map[_0x518638(0x25b)][_0x518638(0x34f)]=function(){const _0x53fbc7=_0x518638,_0x1536a9=this['lastSpawnedEvent']();return _0x1536a9?_0x1536a9[_0x53fbc7(0x45d)]:0x0;},Game_Map[_0x518638(0x25b)][_0x518638(0x4e8)]=function(_0x339833,_0x3f6510){const _0x4e06df=_0x518638,_0x56bc1b=this[_0x4e06df(0x356)](_0x339833,_0x3f6510);for(const _0x4ea75d of _0x56bc1b){if(!_0x4ea75d)continue;if(_0x4ea75d['isSpawnedEvent']())this[_0x4e06df(0x287)](_0x4ea75d[_0x4e06df(0x45d)]);}},Game_Map[_0x518638(0x25b)][_0x518638(0x255)]=function(_0x3109b4){const _0x155c72=_0x518638;for(const _0x2c1c40 of this[_0x155c72(0x465)]){if(!_0x2c1c40)continue;_0x3109b4['includes'](_0x2c1c40[_0x155c72(0x232)]())&&this['despawnEventId'](_0x2c1c40['_eventId']);}},Game_Map[_0x518638(0x25b)][_0x518638(0x33f)]=function(_0x57a478){const _0x57830e=_0x518638;for(const _0x2827bc of this['_spawnedEvents']){if(!_0x2827bc)continue;_0x57a478[_0x57830e(0x394)](_0x2827bc[_0x57830e(0x37b)]())&&this['despawnEventId'](_0x2827bc[_0x57830e(0x45d)]);}},Game_Map[_0x518638(0x25b)][_0x518638(0x4db)]=function(){const _0x305308=_0x518638;for(const _0x185d91 of this[_0x305308(0x465)]){if(!_0x185d91)continue;this['despawnEventId'](_0x185d91[_0x305308(0x45d)]);}},VisuMZ[_0x518638(0x489)][_0x518638(0x352)]=Game_Map[_0x518638(0x25b)][_0x518638(0x516)],Game_Map[_0x518638(0x25b)]['unlockEvent']=function(_0x4945c8){const _0x4908a2=_0x518638;VisuMZ[_0x4908a2(0x489)]['Game_Map_unlockEvent'][_0x4908a2(0x495)](this,_0x4945c8);if(_0x4945c8>=0x3e8){const _0x4f1f5e=this['event'](_0x4945c8);if(_0x4f1f5e)_0x4f1f5e[_0x4908a2(0x194)]();}},Game_CommonEvent['prototype'][_0x518638(0x3c8)]=function(){const _0x10523d=_0x518638,_0x5c1659=this[_0x10523d(0x40c)]();return this['isActive']()&&_0x5c1659['trigger']>=0x1&&DataManager[_0x10523d(0x2a4)](_0x5c1659[_0x10523d(0x225)]);},Game_CommonEvent[_0x518638(0x25b)][_0x518638(0x46e)]=function(){const _0x3f184f=_0x518638;return VisuMZ[_0x3f184f(0x489)][_0x3f184f(0x198)][_0x3f184f(0x2fc)][_0x3f184f(0x394)](this[_0x3f184f(0x206)]);},VisuMZ[_0x518638(0x489)][_0x518638(0x1ba)]=Game_CommonEvent[_0x518638(0x25b)][_0x518638(0x407)],Game_CommonEvent[_0x518638(0x25b)][_0x518638(0x407)]=function(){const _0x1afaed=_0x518638;return VisuMZ[_0x1afaed(0x489)][_0x1afaed(0x1ba)]['call'](this)?!![]:VisuMZ[_0x1afaed(0x489)][_0x1afaed(0x198)][_0x1afaed(0x170)](this[_0x1afaed(0x40c)]()[_0x1afaed(0x183)],this['_commonEventId']);},VisuMZ[_0x518638(0x489)][_0x518638(0x45a)]=Game_Map[_0x518638(0x25b)][_0x518638(0x2dc)],Game_Map['prototype'][_0x518638(0x2dc)]=function(){const _0x574e4f=_0x518638,_0x3f40d3=VisuMZ[_0x574e4f(0x489)]['Game_Map_parallelCommonEvents'][_0x574e4f(0x495)](this),_0xc16a35=VisuMZ[_0x574e4f(0x489)][_0x574e4f(0x198)][_0x574e4f(0x2fc)][_0x574e4f(0x242)](_0x479599=>$dataCommonEvents[_0x479599]);return _0x3f40d3[_0x574e4f(0x2b7)](_0xc16a35)[_0x574e4f(0x39f)]((_0x3ba279,_0x24d4ee,_0x2aef72)=>_0x2aef72[_0x574e4f(0x4a2)](_0x3ba279)===_0x24d4ee);},VisuMZ[_0x518638(0x489)][_0x518638(0x1ab)]=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x279)],Game_CharacterBase[_0x518638(0x25b)]['initMembers']=function(){const _0x5ee9bd=_0x518638;VisuMZ['EventsMoveCore'][_0x5ee9bd(0x1ab)][_0x5ee9bd(0x495)](this),this[_0x5ee9bd(0x51c)]();},Game_CharacterBase[_0x518638(0x25b)]['initEventsMoveCoreSettings']=function(){const _0x356bba=_0x518638;this[_0x356bba(0x425)]=![],this[_0x356bba(0x48e)](),this['clearDashing'](),this[_0x356bba(0x3c3)](),this['clearStepPattern']();},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x286)]=function(){const _0x5237dd=_0x518638;if(this[_0x5237dd(0x364)]===Game_Player&&this[_0x5237dd(0x3fe)]())return this[_0x5237dd(0x49f)]()['characterName']()[_0x5237dd(0x297)](/\[VS8\]/i);else return Imported[_0x5237dd(0x4af)]&&this[_0x5237dd(0x3b2)]()?!![]:this[_0x5237dd(0x26c)]()[_0x5237dd(0x297)](/\[VS8\]/i);},VisuMZ[_0x518638(0x489)][_0x518638(0x4fa)]=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x1c0)],Game_CharacterBase[_0x518638(0x25b)]['direction']=function(){const _0x5ed1eb=_0x518638;if(this[_0x5ed1eb(0x260)]()&&!this['isJumping']()&&this[_0x5ed1eb(0x286)]())return this[_0x5ed1eb(0x518)]();else{if(this[_0x5ed1eb(0x260)]()&&!this[_0x5ed1eb(0x441)]())return 0x8;else return this[_0x5ed1eb(0x476)]()&&this['isSpriteVS8dir']()?this[_0x5ed1eb(0x18d)]():VisuMZ[_0x5ed1eb(0x489)][_0x5ed1eb(0x4fa)]['call'](this);}},VisuMZ['EventsMoveCore']['Game_CharacterBase_setDirection']=Game_CharacterBase[_0x518638(0x25b)]['setDirection'],Game_CharacterBase[_0x518638(0x25b)]['setDirection']=function(_0x4f78ba){const _0x21d7de=_0x518638;if(!this[_0x21d7de(0x286)]())_0x4f78ba=this[_0x21d7de(0x1a2)](_0x4f78ba);VisuMZ[_0x21d7de(0x489)]['Game_CharacterBase_setDirection'][_0x21d7de(0x495)](this,_0x4f78ba);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x1a2)]=function(_0x24dcd0){const _0x3ed4ba=_0x518638;if(_0x24dcd0===0x1)return this[_0x3ed4ba(0x15d)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x24dcd0===0x3)return this[_0x3ed4ba(0x15d)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x24dcd0===0x7)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x24dcd0===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x24dcd0;},Game_CharacterBase['prototype'][_0x518638(0x497)]=function(_0x1036d8){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x1036d8);},Game_CharacterBase['prototype'][_0x518638(0x32e)]=function(){const _0x386f76=_0x518638;return this[_0x386f76(0x426)]||0x0;},VisuMZ[_0x518638(0x489)][_0x518638(0x3d5)]=Game_CharacterBase['prototype'][_0x518638(0x1d5)],Game_CharacterBase['prototype']['moveStraight']=function(_0x572faf){const _0xebf12f=_0x518638;this['_lastMovedDirection']=_0x572faf,VisuMZ[_0xebf12f(0x489)][_0xebf12f(0x3d5)]['call'](this,_0x572faf);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x272)]=function(_0x1897ea){const _0x4f016f=_0x518638;if(!this[_0x4f016f(0x497)](_0x1897ea))return this['moveStraight'](_0x1897ea);let _0x1c9754=0x0,_0x283a9a=0x0;switch(_0x1897ea){case 0x1:_0x1c9754=0x4,_0x283a9a=0x2;break;case 0x3:_0x1c9754=0x6,_0x283a9a=0x2;break;case 0x7:_0x1c9754=0x4,_0x283a9a=0x8;break;case 0x9:_0x1c9754=0x6,_0x283a9a=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x4f016f(0x223)][_0x4f016f(0x1f6)][_0x4f016f(0x294)]){if(!this[_0x4f016f(0x15d)](this['_x'],this['_y'],_0x1c9754))return this[_0x4f016f(0x1d5)](_0x283a9a);if(!this[_0x4f016f(0x15d)](this['_x'],this['_y'],_0x283a9a))return this[_0x4f016f(0x1d5)](_0x1c9754);if(!this[_0x4f016f(0x1b1)](this['_x'],this['_y'],_0x1c9754,_0x283a9a)){let _0x5be6e7=VisuMZ[_0x4f016f(0x489)][_0x4f016f(0x223)][_0x4f016f(0x1f6)][_0x4f016f(0x3df)]?_0x1c9754:_0x283a9a;return this[_0x4f016f(0x1d5)](_0x5be6e7);}}this[_0x4f016f(0x426)]=_0x1897ea,this['moveDiagonally'](_0x1c9754,_0x283a9a);},VisuMZ[_0x518638(0x489)][_0x518638(0x267)]=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x2e7)],Game_CharacterBase['prototype'][_0x518638(0x2e7)]=function(){const _0xd76c67=_0x518638;let _0x16e611=this['_moveSpeed'];return this['isDashing']()&&(_0x16e611+=this[_0xd76c67(0x432)]()),this[_0xd76c67(0x48c)](_0x16e611);},Game_CharacterBase[_0x518638(0x25b)]['dashSpeedModifier']=function(){const _0x50ea5c=_0x518638,_0x5cd87a=VisuMZ[_0x50ea5c(0x489)][_0x50ea5c(0x223)][_0x50ea5c(0x1f6)];return _0x5cd87a['DashModifier']!==undefined?_0x5cd87a[_0x50ea5c(0x210)]:VisuMZ[_0x50ea5c(0x489)][_0x50ea5c(0x267)][_0x50ea5c(0x495)](this)-this[_0x50ea5c(0x2de)];},Game_CharacterBase['prototype'][_0x518638(0x48c)]=function(_0x2a0327){const _0x4fd411=_0x518638,_0x2c9708=VisuMZ['EventsMoveCore'][_0x4fd411(0x223)][_0x4fd411(0x1f6)];if(!_0x2c9708[_0x4fd411(0x436)])return _0x2a0327;return[0x1,0x3,0x7,0x9][_0x4fd411(0x394)](this[_0x4fd411(0x426)])&&(_0x2a0327*=_0x2c9708[_0x4fd411(0x4f7)]||0.01),_0x2a0327;},VisuMZ[_0x518638(0x489)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x227)],Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x227)]=function(){const _0x2a9470=_0x518638;if(this[_0x2a9470(0x19f)])return!![];return VisuMZ[_0x2a9470(0x489)][_0x2a9470(0x2ca)][_0x2a9470(0x495)](this);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x4aa)]=function(){const _0x30e0c6=_0x518638;return this[_0x30e0c6(0x227)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x41e)]=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x353)],Game_CharacterBase[_0x518638(0x25b)]['pattern']=function(){const _0x33cd0e=_0x518638;return this[_0x33cd0e(0x476)]()?this[_0x33cd0e(0x379)]():VisuMZ['EventsMoveCore'][_0x33cd0e(0x41e)][_0x33cd0e(0x495)](this);},VisuMZ['EventsMoveCore']['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x2c4)],Game_CharacterBase[_0x518638(0x25b)]['increaseSteps']=function(){const _0x48dcc9=_0x518638;VisuMZ[_0x48dcc9(0x489)]['Game_CharacterBase_increaseSteps'][_0x48dcc9(0x495)](this),this[_0x48dcc9(0x48e)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x418)]=Game_CharacterBase[_0x518638(0x25b)]['characterIndex'],Game_CharacterBase[_0x518638(0x25b)]['characterIndex']=function(){const _0x4f4b58=_0x518638;if(this['isSpriteVS8dir']())return this[_0x4f4b58(0x200)]();return VisuMZ[_0x4f4b58(0x489)]['Game_CharacterBase_characterIndex']['call'](this);},Game_CharacterBase['prototype']['characterIndexVS8']=function(){const _0x59e732=_0x518638,_0x71d2b7=this[_0x59e732(0x1c0)]();if(this[_0x59e732(0x441)]()){if([0x2,0x4,0x6,0x8][_0x59e732(0x394)](_0x71d2b7))return 0x4;if([0x1,0x3,0x7,0x9][_0x59e732(0x394)](_0x71d2b7))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x59e732(0x476)]())return this['getPosingCharacterIndex']();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x59e732(0x394)](_0x71d2b7))return 0x4;if([0x1,0x3,0x7,0x9][_0x59e732(0x394)](_0x71d2b7))return 0x5;}else{if(this['hasEventIcon']()&&this['useCarryPoseForIcons']()){if([0x2,0x4,0x6,0x8][_0x59e732(0x394)](_0x71d2b7))return 0x4;if([0x1,0x3,0x7,0x9][_0x59e732(0x394)](_0x71d2b7))return 0x5;}else{if(this[_0x59e732(0x4aa)]()){if([0x2,0x4,0x6,0x8][_0x59e732(0x394)](_0x71d2b7))return 0x2;if([0x1,0x3,0x7,0x9][_0x59e732(0x394)](_0x71d2b7))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x59e732(0x394)](_0x71d2b7))return 0x0;if([0x1,0x3,0x7,0x9][_0x59e732(0x394)](_0x71d2b7))return 0x1;}}}}}}},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x3ee)]=function(){const _0x407a11=_0x518638;return VisuMZ[_0x407a11(0x489)][_0x407a11(0x223)][_0x407a11(0x40d)][_0x407a11(0x29a)];},Game_CharacterBase[_0x518638(0x25b)]['isOnRope']=function(){const _0x3568e5=_0x518638;return this[_0x3568e5(0x260)]()&&this[_0x3568e5(0x37b)]()===VisuMZ['EventsMoveCore'][_0x3568e5(0x223)][_0x3568e5(0x15c)][_0x3568e5(0x3c0)];},Game_CharacterBase[_0x518638(0x25b)]['directionOnLadderSpriteVS8dir']=function(){return this['isOnRope']()?0x4:0x2;},VisuMZ[_0x518638(0x489)][_0x518638(0x4b4)]=Game_CharacterBase['prototype'][_0x518638(0x184)],Game_CharacterBase['prototype']['update']=function(){const _0x5a95f3=_0x518638;VisuMZ[_0x5a95f3(0x489)][_0x5a95f3(0x4b4)][_0x5a95f3(0x495)](this),this[_0x5a95f3(0x534)]();},Game_CharacterBase['prototype'][_0x518638(0x534)]=function(){const _0x1769bf=_0x518638;this[_0x1769bf(0x4e3)]=this['_poseDuration']||0x0;if(this[_0x1769bf(0x4e3)]>0x0){this[_0x1769bf(0x4e3)]--;if(this[_0x1769bf(0x4e3)]<=0x0&&this[_0x1769bf(0x519)]!=='ZZZ')this[_0x1769bf(0x48e)]();}},VisuMZ[_0x518638(0x489)][_0x518638(0x4d8)]=Game_CharacterBase[_0x518638(0x25b)]['moveDiagonally'],Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x460)]=function(_0x1f10aa,_0x45e43a){const _0x4114a6=_0x518638;VisuMZ[_0x4114a6(0x489)][_0x4114a6(0x4d8)]['call'](this,_0x1f10aa,_0x45e43a);if(this['isSpriteVS8dir']())this[_0x4114a6(0x346)](_0x1f10aa,_0x45e43a);},Game_CharacterBase['prototype'][_0x518638(0x346)]=function(_0x275714,_0x137899){const _0x325b9f=_0x518638;if(_0x275714===0x4&&_0x137899===0x2)this[_0x325b9f(0x3d7)](0x1);if(_0x275714===0x6&&_0x137899===0x2)this[_0x325b9f(0x3d7)](0x3);if(_0x275714===0x4&&_0x137899===0x8)this[_0x325b9f(0x3d7)](0x7);if(_0x275714===0x6&&_0x137899===0x8)this['setDirection'](0x9);},VisuMZ[_0x518638(0x489)][_0x518638(0x36e)]=Game_CharacterBase[_0x518638(0x25b)]['hasStepAnime'],Game_CharacterBase[_0x518638(0x25b)]['hasStepAnime']=function(){const _0x3101cc=_0x518638;if(this[_0x3101cc(0x476)]()&&this[_0x3101cc(0x4ef)]()==='ZZZ')return!![];return VisuMZ[_0x3101cc(0x489)][_0x3101cc(0x36e)][_0x3101cc(0x495)](this);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x359)]=function(_0x13bf1f,_0x321a8d){const _0x5e24dd=_0x518638;if(_0x13bf1f[_0x5e24dd(0x297)](/Z/i))_0x13bf1f=_0x5e24dd(0x2e4);if(_0x13bf1f[_0x5e24dd(0x297)](/SLEEP/i))_0x13bf1f=_0x5e24dd(0x2e4);this[_0x5e24dd(0x286)]()&&(this[_0x5e24dd(0x519)]=_0x13bf1f[_0x5e24dd(0x4f8)]()[_0x5e24dd(0x3a1)](),this[_0x5e24dd(0x4e3)]=_0x321a8d||Infinity);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x4ef)]=function(){const _0x124af4=_0x518638;return this[_0x124af4(0x286)]()?(this[_0x124af4(0x519)]||'')['toUpperCase']()[_0x124af4(0x3a1)]():''[_0x124af4(0x4f8)]()[_0x124af4(0x3a1)]();},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x537)]=function(_0x20d1d7,_0x44af15){const _0x1880ed=_0x518638;if(this[_0x1880ed(0x286)]()){const _0x12fc90=['','EXCLAMATION',_0x1880ed(0x1d0),_0x1880ed(0x41c),'HEART',_0x1880ed(0x2e6),_0x1880ed(0x2c7),_0x1880ed(0x405),_0x1880ed(0x4c8),_0x1880ed(0x333),'ZZZ','','','','',''][_0x20d1d7];this[_0x1880ed(0x359)](_0x12fc90,_0x44af15);}},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x48e)]=function(){const _0x37fcbc=_0x518638;this[_0x37fcbc(0x519)]='',this[_0x37fcbc(0x4e3)]=0x0;},Game_CharacterBase['prototype'][_0x518638(0x476)]=function(){const _0xcd0451=_0x518638;return this[_0xcd0451(0x286)]()&&!!this['_pose'];},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x349)]=function(){const _0x2b939f=_0x518638,_0x2b1717=this[_0x2b939f(0x519)][_0x2b939f(0x4f8)]();switch(this['_pose'][_0x2b939f(0x4f8)]()[_0x2b939f(0x3a1)]()){case _0x2b939f(0x4a1):case _0x2b939f(0x4c3):case _0x2b939f(0x238):case _0x2b939f(0x306):case _0x2b939f(0x44e):case _0x2b939f(0x464):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x518638(0x25b)]['getPosingCharacterDirection']=function(){const _0x2ebddf=_0x518638;switch(this[_0x2ebddf(0x519)]['toUpperCase']()){case _0x2ebddf(0x513):case _0x2ebddf(0x1d0):case _0x2ebddf(0x41c):case'!':case'?':return 0x2;break;case'HEART':case _0x2ebddf(0x2e6):case _0x2ebddf(0x2c7):return 0x4;break;case'ITEM':case _0x2ebddf(0x4c3):case'VICTORY':case _0x2ebddf(0x405):case _0x2ebddf(0x4c8):case'LIGHT\x20BULB':return 0x6;break;case _0x2ebddf(0x306):case _0x2ebddf(0x44e):case _0x2ebddf(0x464):case _0x2ebddf(0x2e4):case _0x2ebddf(0x2aa):return 0x8;break;default:return VisuMZ[_0x2ebddf(0x489)][_0x2ebddf(0x317)][_0x2ebddf(0x495)](this);break;}},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x379)]=function(){const _0x514b9f=_0x518638;switch(this[_0x514b9f(0x519)]['toUpperCase']()){case _0x514b9f(0x4a1):case _0x514b9f(0x306):case _0x514b9f(0x513):case'!':case _0x514b9f(0x337):case _0x514b9f(0x405):return 0x0;break;case _0x514b9f(0x4c3):case _0x514b9f(0x44e):case'QUESTION':case'?':case _0x514b9f(0x2e6):case'SILENCE':return 0x1;break;case _0x514b9f(0x238):case _0x514b9f(0x464):case'MUSIC\x20NOTE':case'SWEAT':case _0x514b9f(0x333):return 0x2;break;default:return VisuMZ[_0x514b9f(0x489)][_0x514b9f(0x41e)]['call'](this);break;}},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x43b)]=function(){const _0x4c04b6=_0x518638;this[_0x4c04b6(0x1a4)]=!![];},Game_CharacterBase['prototype'][_0x518638(0x1e0)]=function(){const _0x1b0cc2=_0x518638;this[_0x1b0cc2(0x1a4)]=![];},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x25c)]=function(){const _0x147169=_0x518638;this[_0x147169(0x19f)]=!![];},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x1ad)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x2ab)]=function(){const _0x3aa5de=_0x518638;if(this[_0x3aa5de(0x4e0)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x3aa5de(0x1e2)])return![];if(this['_characterName']==='')return![];if(this[_0x3aa5de(0x364)]===Game_Vehicle)return![];return!![];},Game_CharacterBase['prototype'][_0x518638(0x3ef)]=function(){const _0x5373a4=_0x518638;if(this[_0x5373a4(0x260)]())return!![];if(this[_0x5373a4(0x364)]===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x1e5)]=function(){const _0x5426f5=_0x518638;return VisuMZ[_0x5426f5(0x489)]['Settings']['Movement']['DefaultShadow'];},Game_CharacterBase['prototype'][_0x518638(0x248)]=function(){const _0x424b46=_0x518638;return this[_0x424b46(0x256)]();},Game_CharacterBase['prototype'][_0x518638(0x345)]=function(){const _0x3cb8e1=_0x518638,_0x44ecab=$gameMap[_0x3cb8e1(0x214)]();return Math['floor'](this[_0x3cb8e1(0x3b9)]()*_0x44ecab+_0x44ecab);},Game_Character[_0x518638(0x25b)][_0x518638(0x328)]=function(_0x5f3db3,_0x2d03e1){const _0x3bf758=_0x518638,_0x384792=this['searchLimit'](),_0x44a066=$gameMap[_0x3bf758(0x39b)](),_0x4ea8b7=[],_0x5cf5e3=[],_0x3577f9=[],_0x1a57ac={};let _0x48fd22=_0x1a57ac;if(this['x']===_0x5f3db3&&this['y']===_0x2d03e1)return 0x0;_0x1a57ac[_0x3bf758(0x32c)]=null,_0x1a57ac['x']=this['x'],_0x1a57ac['y']=this['y'],_0x1a57ac['g']=0x0,_0x1a57ac['f']=$gameMap[_0x3bf758(0x2a7)](_0x1a57ac['x'],_0x1a57ac['y'],_0x5f3db3,_0x2d03e1),_0x4ea8b7['push'](_0x1a57ac),_0x5cf5e3['push'](_0x1a57ac['y']*_0x44a066+_0x1a57ac['x']);while(_0x4ea8b7[_0x3bf758(0x433)]>0x0){let _0x216aca=0x0;for(let _0x41833e=0x0;_0x41833e<_0x4ea8b7[_0x3bf758(0x433)];_0x41833e++){_0x4ea8b7[_0x41833e]['f']<_0x4ea8b7[_0x216aca]['f']&&(_0x216aca=_0x41833e);}const _0xef41ad=_0x4ea8b7[_0x216aca],_0x266a69=_0xef41ad['x'],_0x138d82=_0xef41ad['y'],_0x1aa161=_0x138d82*_0x44a066+_0x266a69,_0x5d9c12=_0xef41ad['g'];_0x4ea8b7['splice'](_0x216aca,0x1),_0x5cf5e3[_0x3bf758(0x4c9)](_0x5cf5e3[_0x3bf758(0x4a2)](_0x1aa161),0x1),_0x3577f9[_0x3bf758(0x284)](_0x1aa161);if(_0xef41ad['x']===_0x5f3db3&&_0xef41ad['y']===_0x2d03e1){_0x48fd22=_0xef41ad;break;}if(_0x5d9c12>=_0x384792)continue;const _0x34a9e4=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x5764dc=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0xc18653=0x1;_0xc18653<0xa;_0xc18653++){if(_0xc18653===0x5)continue;const _0x4705ed=_0xc18653,_0x142a16=_0x34a9e4[_0xc18653],_0x4a80e9=_0x5764dc[_0xc18653],_0x3b7ee0=$gameMap[_0x3bf758(0x168)](_0x266a69,_0x4705ed),_0x1dfbc6=$gameMap['roundYWithDirection'](_0x138d82,_0x4705ed),_0x133504=_0x1dfbc6*_0x44a066+_0x3b7ee0;if(_0x3577f9[_0x3bf758(0x394)](_0x133504))continue;if(this[_0x3bf758(0x364)]===Game_Player&&VisuMZ[_0x3bf758(0x489)][_0x3bf758(0x223)][_0x3bf758(0x1f6)][_0x3bf758(0x294)]){if(!this[_0x3bf758(0x15d)](_0x266a69,_0x138d82,_0x142a16))continue;if(!this['canPass'](_0x266a69,_0x138d82,_0x4a80e9))continue;}if(!this[_0x3bf758(0x1b1)](_0x266a69,_0x138d82,_0x142a16,_0x4a80e9))continue;const _0x2d627a=_0x5d9c12+0x1,_0x5481de=_0x5cf5e3[_0x3bf758(0x4a2)](_0x133504);if(_0x5481de<0x0||_0x2d627a<_0x4ea8b7[_0x5481de]['g']){let _0x88dda0={};_0x5481de>=0x0?_0x88dda0=_0x4ea8b7[_0x5481de]:(_0x4ea8b7['push'](_0x88dda0),_0x5cf5e3[_0x3bf758(0x284)](_0x133504)),_0x88dda0[_0x3bf758(0x32c)]=_0xef41ad,_0x88dda0['x']=_0x3b7ee0,_0x88dda0['y']=_0x1dfbc6,_0x88dda0['g']=_0x2d627a,_0x88dda0['f']=_0x2d627a+$gameMap[_0x3bf758(0x2a7)](_0x3b7ee0,_0x1dfbc6,_0x5f3db3,_0x2d03e1),(!_0x48fd22||_0x88dda0['f']-_0x88dda0['g']<_0x48fd22['f']-_0x48fd22['g'])&&(_0x48fd22=_0x88dda0);}}}let _0x42bd69=_0x48fd22;while(_0x42bd69[_0x3bf758(0x32c)]&&_0x42bd69[_0x3bf758(0x32c)]!==_0x1a57ac){_0x42bd69=_0x42bd69[_0x3bf758(0x32c)];}const _0x380aa0=$gameMap[_0x3bf758(0x390)](_0x42bd69['x'],_0x1a57ac['x']),_0x38029d=$gameMap[_0x3bf758(0x29b)](_0x42bd69['y'],_0x1a57ac['y']);if(_0x380aa0<0x0&&_0x38029d>0x0)return 0x1;if(_0x380aa0>0x0&&_0x38029d>0x0)return 0x3;if(_0x380aa0<0x0&&_0x38029d<0x0)return 0x7;if(_0x380aa0>0x0&&_0x38029d<0x0)return 0x9;if(_0x38029d>0x0)return 0x2;if(_0x380aa0<0x0)return 0x4;if(_0x380aa0>0x0)return 0x6;if(_0x38029d<0x0)return 0x8;const _0x56b710=this[_0x3bf758(0x376)](_0x5f3db3),_0x20f98=this['deltaYFrom'](_0x2d03e1);if(Math[_0x3bf758(0x350)](_0x56b710)>Math[_0x3bf758(0x350)](_0x20f98))return _0x56b710>0x0?0x4:0x6;else{if(_0x20f98!==0x0)return _0x20f98>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x518638(0x489)][_0x518638(0x3c9)]=Game_CharacterBase['prototype'][_0x518638(0x15d)],Game_CharacterBase['prototype'][_0x518638(0x15d)]=function(_0x331ca2,_0x59d667,_0x2a0a43){const _0x42fd83=_0x518638;return this[_0x42fd83(0x3d8)]==='airship'?this[_0x42fd83(0x49f)]()['isAirshipPassable'](_0x331ca2,_0x59d667,_0x2a0a43):VisuMZ[_0x42fd83(0x489)]['Game_CharacterBase_canPass'][_0x42fd83(0x495)](this,_0x331ca2,_0x59d667,_0x2a0a43);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x3c3)]=function(){const _0x17323c=_0x518638;this['_spriteOffsetX']=0x0,this[_0x17323c(0x20e)]=0x0;},VisuMZ[_0x518638(0x489)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x256)],Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x256)]=function(){const _0x571dd1=_0x518638;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenX'][_0x571dd1(0x495)](this)+(this[_0x571dd1(0x3ad)]||0x0);},VisuMZ[_0x518638(0x489)][_0x518638(0x528)]=Game_CharacterBase['prototype'][_0x518638(0x2d9)],Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x2d9)]=function(){const _0x5d1cad=_0x518638;return VisuMZ[_0x5d1cad(0x489)][_0x5d1cad(0x528)][_0x5d1cad(0x495)](this)+(this[_0x5d1cad(0x20e)]||0x0);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x283)]=function(){this['_stepPattern']='';},VisuMZ[_0x518638(0x489)][_0x518638(0x2af)]=Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x51e)],Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x51e)]=function(){const _0x3fb4ce=_0x518638;if(this['_patternLocked'])return;if(this[_0x3fb4ce(0x2e3)]())return;VisuMZ[_0x3fb4ce(0x489)]['Game_CharacterBase_updatePattern'][_0x3fb4ce(0x495)](this);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x2e3)]=function(){const _0x5979f6=_0x518638;if(!this[_0x5979f6(0x212)]()&&this[_0x5979f6(0x31f)]>0x0)return![];switch(String(this['_stepPattern'])[_0x5979f6(0x4f8)]()[_0x5979f6(0x3a1)]()){case'LEFT\x20TO\x20RIGHT':this[_0x5979f6(0x190)]+=0x1;if(this[_0x5979f6(0x190)]>0x2)this['setPattern'](0x0);break;case _0x5979f6(0x37a):this[_0x5979f6(0x190)]-=0x1;if(this[_0x5979f6(0x190)]<0x0)this[_0x5979f6(0x2f2)](0x2);break;case _0x5979f6(0x36d):case _0x5979f6(0x4b7):this['turnRight90']();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x5979f6(0x3bf):case'SPIN\x20ANTICLOCKWISE':case _0x5979f6(0x4c7):this[_0x5979f6(0x45e)]();break;default:return![];}return!![];},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x46d)]=function(){const _0x4d97f3=_0x518638;return $gameSystem[_0x4d97f3(0x46d)](this);},Game_CharacterBase['prototype'][_0x518638(0x16b)]=function(){const _0x555542=_0x518638,_0x8609a6=this[_0x555542(0x46d)]();if(!_0x8609a6)return![];return _0x8609a6[_0x555542(0x166)]>0x0;},Game_CharacterBase[_0x518638(0x25b)]['frontX']=function(){const _0x4c737b=_0x518638,_0x1aa8b0=this[_0x4c737b(0x1c0)]();return $gameMap[_0x4c737b(0x168)](this['x'],_0x1aa8b0);},Game_CharacterBase[_0x518638(0x25b)]['frontY']=function(){const _0x38160d=_0x518638,_0x43ebb2=this[_0x38160d(0x1c0)]();return $gameMap['roundYWithDirection'](this['y'],_0x43ebb2);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x173)]=function(){const _0x3638ce=_0x518638,_0x2412b1=this[_0x3638ce(0x3b1)](this[_0x3638ce(0x1c0)]());return $gameMap[_0x3638ce(0x168)](this['x'],_0x2412b1);},Game_CharacterBase[_0x518638(0x25b)][_0x518638(0x22a)]=function(){const _0x4278e9=_0x518638,_0x59d943=this['reverseDir'](this['direction']());return $gameMap[_0x4278e9(0x4a4)](this['y'],_0x59d943);},VisuMZ[_0x518638(0x489)][_0x518638(0x4ca)]=Game_Character[_0x518638(0x25b)]['setMoveRoute'],Game_Character['prototype']['setMoveRoute']=function(_0x3d080d){const _0x443384=_0x518638;route=JsonEx[_0x443384(0x167)](_0x3d080d),VisuMZ[_0x443384(0x489)][_0x443384(0x4ca)]['call'](this,route);},VisuMZ[_0x518638(0x489)][_0x518638(0x179)]=Game_Character['prototype'][_0x518638(0x4bb)],Game_Character['prototype'][_0x518638(0x4bb)]=function(_0x1cbeb9){const _0x47542d=_0x518638;route=JsonEx[_0x47542d(0x167)](_0x1cbeb9),VisuMZ[_0x47542d(0x489)][_0x47542d(0x179)]['call'](this,route);},VisuMZ[_0x518638(0x489)][_0x518638(0x33d)]=Game_Character[_0x518638(0x25b)][_0x518638(0x24f)],Game_Character[_0x518638(0x25b)][_0x518638(0x24f)]=function(_0x1b2114){const _0x597d7e=_0x518638,_0x254209=Game_Character,_0x3f8c62=_0x1b2114[_0x597d7e(0x282)];if(_0x1b2114['code']===_0x254209[_0x597d7e(0x3c4)]){let _0x101133=_0x1b2114[_0x597d7e(0x282)][0x0];_0x101133=this['convertVariableValuesInScriptCall'](_0x101133),_0x101133=this[_0x597d7e(0x456)](_0x101133),this[_0x597d7e(0x399)](_0x1b2114,_0x101133);}else VisuMZ[_0x597d7e(0x489)][_0x597d7e(0x33d)]['call'](this,_0x1b2114);},Game_Character[_0x518638(0x25b)][_0x518638(0x1fa)]=function(_0x56fa1c){const _0x4c5f7f=_0x518638,_0x1d962b=/\$gameVariables\.value\((\d+)\)/gi,_0x594540=/\\V\[(\d+)\]/gi;while(_0x56fa1c[_0x4c5f7f(0x297)](_0x1d962b)){_0x56fa1c=_0x56fa1c['replace'](_0x1d962b,(_0x324421,_0x32b1b5)=>$gameVariables[_0x4c5f7f(0x53c)](parseInt(_0x32b1b5)));}while(_0x56fa1c['match'](_0x594540)){_0x56fa1c=_0x56fa1c[_0x4c5f7f(0x3e8)](_0x594540,(_0x449671,_0x452295)=>$gameVariables[_0x4c5f7f(0x53c)](parseInt(_0x452295)));}return _0x56fa1c;},Game_Character[_0x518638(0x25b)][_0x518638(0x456)]=function(_0x29c3ca){const _0x201084=_0x518638,_0xec3f86=/\\SELFVAR\[(\d+)\]/gi;while(_0x29c3ca[_0x201084(0x297)](_0xec3f86)){_0x29c3ca=_0x29c3ca['replace'](_0xec3f86,(_0x355061,_0x30ae1f)=>getSelfVariableValue(this['_mapId'],this[_0x201084(0x45d)],parseInt(_0x30ae1f)));}return _0x29c3ca;},Game_Character['prototype'][_0x518638(0x399)]=function(_0x49fa0a,_0x16aae4){const _0x20560d=_0x518638;if(_0x16aae4[_0x20560d(0x297)](/ANIMATION:[ ](\d+)/i))return this[_0x20560d(0x2a2)](Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/BALLOON:[ ](.*)/i))return this[_0x20560d(0x3b3)](String(RegExp['$1']));if(_0x16aae4['match'](/FADE IN:[ ](\d+)/i))return this['processMoveRouteFadeIn'](Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/FADE OUT:[ ](\d+)/i))return this[_0x20560d(0x293)](Number(RegExp['$1']));if(_0x16aae4['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x20560d(0x43b)]();if(_0x16aae4['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x20560d(0x1e0)]();if(_0x16aae4[_0x20560d(0x297)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x20560d(0x25c)]();if(_0x16aae4['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x20560d(0x1ad)]();if(_0x16aae4[_0x20560d(0x297)](/HUG:[ ]LEFT/i))return this['processMoveRouteHugWall'](_0x20560d(0x35c));if(_0x16aae4[_0x20560d(0x297)](/HUG:[ ]RIGHT/i))return this['processMoveRouteHugWall'](_0x20560d(0x291));if(_0x16aae4[_0x20560d(0x297)](/INDEX:[ ](\d+)/i))return this[_0x20560d(0x27a)](Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x518254=this[_0x20560d(0x367)]+Number(RegExp['$1']);return this[_0x20560d(0x27a)](_0x518254);}if(_0x16aae4[_0x20560d(0x297)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x20560d(0x392)](Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x20560d(0x389)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x16aae4['match'](/JUMP TO EVENT:[ ](\d+)/i)){const _0x3ca577=$gameMap[_0x20560d(0x40c)](Number(RegExp['$1']));return this[_0x20560d(0x45b)](_0x3ca577);}if(_0x16aae4[_0x20560d(0x297)](/JUMP TO PLAYER/i))return this[_0x20560d(0x45b)]($gamePlayer);if(_0x16aae4[_0x20560d(0x297)](/JUMP TO HOME/i)&&this[_0x20560d(0x18e)]){const _0x5bd88a=this[_0x20560d(0x1ae)],_0x5ab679=this[_0x20560d(0x221)];return this[_0x20560d(0x389)](_0x5bd88a,_0x5ab679);}if(_0x16aae4[_0x20560d(0x297)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x4c4fcb=String(RegExp['$1']),_0x49a6be=this[_0x20560d(0x457)](_0x16aae4);return this['processMoveRouteMoveUntilStop'](_0x4c4fcb,_0x49a6be);}if(_0x16aae4[_0x20560d(0x297)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x3efcc1=Number(RegExp['$1']),_0x31f637=Number(RegExp['$2']),_0x48277b=this[_0x20560d(0x457)](_0x16aae4);return this[_0x20560d(0x2f8)](_0x3efcc1,_0x31f637,_0x48277b);}if(_0x16aae4[_0x20560d(0x297)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x53a090=$gameMap[_0x20560d(0x40c)](Number(RegExp['$1'])),_0xa8547c=this[_0x20560d(0x457)](_0x16aae4);return this[_0x20560d(0x385)](_0x53a090,_0xa8547c);}if(_0x16aae4[_0x20560d(0x297)](/MOVE TO PLAYER/i)){const _0x5d5704=this[_0x20560d(0x457)](_0x16aae4);return this[_0x20560d(0x385)]($gamePlayer,_0x5d5704);}if(_0x16aae4[_0x20560d(0x297)](/MOVE TO HOME/i)&&this[_0x20560d(0x18e)]){const _0x261346=this[_0x20560d(0x1ae)],_0x325e65=this[_0x20560d(0x221)],_0x2d8130=this[_0x20560d(0x457)](_0x16aae4);return this['processMoveRouteMoveTo'](_0x261346,_0x325e65,_0x2d8130);}if(_0x16aae4[_0x20560d(0x297)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x20560d(0x28b)](0x1,Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/MOVE DOWN:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x20560d(0x28b)](0x3,Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/MOVE LEFT:[ ](\d+)/i))return this[_0x20560d(0x28b)](0x4,Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/MOVE RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x20560d(0x28b)](0x7,Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/MOVE UP:[ ](\d+)/i))return this[_0x20560d(0x28b)](0x8,Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x16aae4['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x56f9fd=Math[_0x20560d(0x302)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x56f9fd[_0x20560d(0x33b)](0x0,0xff));}if(_0x16aae4[_0x20560d(0x297)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x477ee5=this[_0x20560d(0x491)]+Math[_0x20560d(0x302)](Number(RegExp['$1'])/0x64*0xff);return this[_0x20560d(0x447)](_0x477ee5['clamp'](0x0,0xff));}if(_0x16aae4[_0x20560d(0x297)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x1137ca=this[_0x20560d(0x491)]+Number(RegExp['$1']);return this['setOpacity'](_0x1137ca[_0x20560d(0x33b)](0x0,0xff));}if(_0x16aae4[_0x20560d(0x297)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x20560d(0x27e)](Number(RegExp['$1']));if(_0x16aae4[_0x20560d(0x297)](/PATTERN UNLOCK/i))return this[_0x20560d(0x425)]=![];if(_0x16aae4[_0x20560d(0x297)](/POSE:[ ](.*)/i)){const _0x17ca7e=String(RegExp['$1'])[_0x20560d(0x4f8)]()[_0x20560d(0x3a1)]();return this[_0x20560d(0x359)](_0x17ca7e);}if(_0x16aae4[_0x20560d(0x297)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x150d90=Number(RegExp['$1']),_0x5e974f=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x150d90,_0x5e974f);}if(_0x16aae4[_0x20560d(0x297)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x253a05=$gameMap['event'](Number(RegExp['$1']));return this[_0x20560d(0x34d)](_0x253a05);}if(_0x16aae4[_0x20560d(0x297)](/STEP TOWARD PLAYER/i))return this[_0x20560d(0x34d)]($gamePlayer);if(_0x16aae4[_0x20560d(0x297)](/STEP TOWARD HOME/i)&&this[_0x20560d(0x18e)]){const _0x5bc6fe=this[_0x20560d(0x1ae)],_0x2e1a7c=this[_0x20560d(0x221)];return this[_0x20560d(0x49c)](_0x5bc6fe,_0x2e1a7c);}if(_0x16aae4[_0x20560d(0x297)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x20560d(0x220)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x16aae4['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x4e3706=$gameMap[_0x20560d(0x40c)](Number(RegExp['$1']));return this[_0x20560d(0x2ad)](_0x4e3706);}if(_0x16aae4['match'](/STEP AWAY FROM PLAYER/i))return this[_0x20560d(0x2ad)]($gamePlayer);if(_0x16aae4[_0x20560d(0x297)](/STEP AWAY FROM HOME/i)&&this['eventId']){const _0x3530d1=this[_0x20560d(0x1ae)],_0x581d1d=this['_randomHomeY'];return this['moveAwayFromPoint'](_0x3530d1,_0x581d1d);}if(_0x16aae4[_0x20560d(0x297)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x20560d(0x52d)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x16aae4[_0x20560d(0x297)](/TURN TO EVENT:[ ](\d+)/i)){const _0x443fb8=$gameMap[_0x20560d(0x40c)](Number(RegExp['$1']));return this[_0x20560d(0x1bd)](_0x443fb8);}if(_0x16aae4[_0x20560d(0x297)](/TURN TO PLAYER/i))return this[_0x20560d(0x1bd)]($gamePlayer);if(_0x16aae4[_0x20560d(0x297)](/TURN TO HOME/i)&&this['eventId']){const _0x526c81=this['_randomHomeX'],_0x1a1b7e=this[_0x20560d(0x221)];return this[_0x20560d(0x52d)](_0x526c81,_0x1a1b7e);}if(_0x16aae4['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x16aae4[_0x20560d(0x297)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x1bd4fc=$gameMap[_0x20560d(0x40c)](Number(RegExp['$1']));return this[_0x20560d(0x201)](_0x1bd4fc);}if(_0x16aae4['match'](/TURN AWAY FROM PLAYER/i))return this[_0x20560d(0x201)]($gamePlayer);if(_0x16aae4[_0x20560d(0x297)](/TURN AWAY FROM HOME/i)&&this[_0x20560d(0x18e)]){const _0x28e920=this[_0x20560d(0x1ae)],_0x42343b=this[_0x20560d(0x221)];return this['turnAwayFromPoint'](_0x28e920,_0x42343b);}if(_0x16aae4['match'](/TURN LOWER LEFT/i))return this[_0x20560d(0x3d7)](0x1);if(_0x16aae4[_0x20560d(0x297)](/TURN LOWER RIGHT/i))return this['setDirection'](0x3);if(_0x16aae4[_0x20560d(0x297)](/TURN UPPER LEFT/i))return this[_0x20560d(0x3d7)](0x7);if(_0x16aae4['match'](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x16aae4[_0x20560d(0x297)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x20560d(0x511)](RegExp['$1'],RegExp['$2']);if(_0x16aae4[_0x20560d(0x297)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x20560d(0x4fd)](RegExp['$1'],RegExp['$2']);if(_0x16aae4['match'](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x20560d(0x532)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x16aae4['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x460aa8=$gameMap[_0x20560d(0x40c)](Number(RegExp['$1']));return this[_0x20560d(0x32a)](_0x460aa8);}if(_0x16aae4[_0x20560d(0x297)](/TELEPORT TO PLAYER/i))return this[_0x20560d(0x32a)]($gamePlayer);if(_0x16aae4[_0x20560d(0x297)](/TELEPORT TO HOME/i)&&this[_0x20560d(0x18e)]){const _0x52132a=this['_randomHomeX'],_0x2c39cc=this[_0x20560d(0x221)];return this[_0x20560d(0x532)](_0x52132a,_0x2c39cc);}try{VisuMZ[_0x20560d(0x489)]['Game_Character_processMoveCommand'][_0x20560d(0x495)](this,_0x49fa0a);}catch(_0x4f6d8c){if($gameTemp['isPlaytest']())console['log'](_0x4f6d8c);}},Game_Character['prototype'][_0x518638(0x2a2)]=function(_0x19d00f){const _0x103c30=_0x518638;$gameTemp[_0x103c30(0x1d6)]([this],_0x19d00f);},Game_Character[_0x518638(0x25b)][_0x518638(0x3b3)]=function(_0x34db5d){const _0x3e765c=_0x518638;let _0x1f1ed0=0x0;switch(_0x34db5d['toUpperCase']()[_0x3e765c(0x3a1)]()){case'!':case _0x3e765c(0x513):_0x1f1ed0=0x1;break;case'?':case _0x3e765c(0x1d0):_0x1f1ed0=0x2;break;case'MUSIC':case _0x3e765c(0x348):case _0x3e765c(0x41c):case _0x3e765c(0x510):case _0x3e765c(0x3fd):_0x1f1ed0=0x3;break;case _0x3e765c(0x337):case _0x3e765c(0x1b0):_0x1f1ed0=0x4;break;case'ANGER':_0x1f1ed0=0x5;break;case _0x3e765c(0x2c7):_0x1f1ed0=0x6;break;case _0x3e765c(0x405):case'ANNOYED':case _0x3e765c(0x336):_0x1f1ed0=0x7;break;case _0x3e765c(0x4c8):case _0x3e765c(0x3f6):_0x1f1ed0=0x8;break;case _0x3e765c(0x2a3):case'BULB':case _0x3e765c(0x333):case _0x3e765c(0x281):case _0x3e765c(0x3f1):_0x1f1ed0=0x9;break;case'Z':case'ZZ':case _0x3e765c(0x2e4):case _0x3e765c(0x2aa):_0x1f1ed0=0xa;break;case _0x3e765c(0x34c):_0x1f1ed0=0xb;break;case _0x3e765c(0x4cf):_0x1f1ed0=0xc;break;case _0x3e765c(0x36f):_0x1f1ed0=0xd;break;case _0x3e765c(0x42c):_0x1f1ed0=0xe;break;case _0x3e765c(0x2dd):_0x1f1ed0=0xf;break;}$gameTemp[_0x3e765c(0x181)](this,_0x1f1ed0);},Game_Character['prototype'][_0x518638(0x481)]=function(_0x115a5a){const _0x1619a4=_0x518638;_0x115a5a+=this[_0x1619a4(0x491)],this['setOpacity'](_0x115a5a[_0x1619a4(0x33b)](0x0,0xff));if(this[_0x1619a4(0x491)]<0xff)this[_0x1619a4(0x211)]--;},Game_Character[_0x518638(0x25b)][_0x518638(0x293)]=function(_0x3d2696){const _0x5b69e4=_0x518638;_0x3d2696=this[_0x5b69e4(0x491)]-_0x3d2696,this['setOpacity'](_0x3d2696['clamp'](0x0,0xff));if(this[_0x5b69e4(0x491)]>0x0)this[_0x5b69e4(0x211)]--;},Game_Character[_0x518638(0x25b)][_0x518638(0x4ed)]=function(_0x1cc9c6){const _0x50db5d=_0x518638,_0x2a0e33=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x4f2733=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x2a4766=this['direction'](),_0x302292=(_0x1cc9c6==='left'?_0x2a0e33:_0x4f2733)[_0x2a4766],_0x32c780=(_0x1cc9c6==='left'?_0x4f2733:_0x2a0e33)[_0x2a4766];if(this['canPass'](this['x'],this['y'],_0x302292))_0x1cc9c6===_0x50db5d(0x35c)?this[_0x50db5d(0x45e)]():this['turnRight90']();else!this['canPass'](this['x'],this['y'],this[_0x50db5d(0x1c0)]())&&(this[_0x50db5d(0x15d)](this['x'],this['y'],_0x32c780)?_0x1cc9c6===_0x50db5d(0x35c)?this[_0x50db5d(0x169)]():this[_0x50db5d(0x45e)]():this[_0x50db5d(0x3bb)]());this['canPass'](this['x'],this['y'],this[_0x50db5d(0x1c0)]())&&this[_0x50db5d(0x454)]();},Game_Character[_0x518638(0x25b)]['processMoveRouteSetIndex']=function(_0x1662f3){const _0xd488a2=_0x518638;if(ImageManager[_0xd488a2(0x1f0)](this[_0xd488a2(0x2c9)]))return;_0x1662f3=_0x1662f3[_0xd488a2(0x33b)](0x0,0x7),this[_0xd488a2(0x17a)](this['_characterName'],_0x1662f3);},Game_Character['prototype'][_0x518638(0x392)]=function(_0x17809c){const _0x45c643=_0x518638;switch(this[_0x45c643(0x1c0)]()){case 0x1:this[_0x45c643(0x419)](-_0x17809c,_0x17809c);break;case 0x2:this[_0x45c643(0x419)](0x0,_0x17809c);break;case 0x3:this[_0x45c643(0x419)](_0x17809c,_0x17809c);break;case 0x4:this[_0x45c643(0x419)](-_0x17809c,0x0);break;case 0x6:this[_0x45c643(0x419)](_0x17809c,0x0);break;case 0x7:this[_0x45c643(0x419)](-_0x17809c,-_0x17809c);break;case 0x8:this[_0x45c643(0x419)](0x0,-_0x17809c);break;case 0x9:this[_0x45c643(0x419)](_0x17809c,-_0x17809c);break;}},Game_Character[_0x518638(0x25b)]['processMoveRouteJumpTo']=function(_0x34ee8a,_0x21fd41){const _0x269f66=_0x518638,_0x5b5eee=Math[_0x269f66(0x302)](_0x34ee8a-this['x']),_0x53154d=Math[_0x269f66(0x302)](_0x21fd41-this['y']);this['jump'](_0x5b5eee,_0x53154d);},Game_Character['prototype']['processMoveRouteJumpToCharacter']=function(_0x1ee0d6){const _0xf86018=_0x518638;if(_0x1ee0d6)this[_0xf86018(0x389)](_0x1ee0d6['x'],_0x1ee0d6['y']);},Game_Character[_0x518638(0x25b)]['processMoveRouteStepTo']=function(_0x4db157,_0x131111,_0x47f26c){const _0xb53e4a=_0x518638;let _0x42657b=0x0;if(_0x47f26c)$gameTemp[_0xb53e4a(0x29e)]=!![];$gameMap[_0xb53e4a(0x1b9)]()?_0x42657b=this['findDiagonalDirectionTo'](_0x4db157,_0x131111):_0x42657b=this[_0xb53e4a(0x3cd)](_0x4db157,_0x131111);if(_0x47f26c)$gameTemp[_0xb53e4a(0x29e)]=![];this['executeMoveDir8'](_0x42657b),this['setMovementSuccess'](!![]);},Game_Character[_0x518638(0x25b)][_0x518638(0x34d)]=function(_0x35a7d8){if(_0x35a7d8)this['processMoveRouteStepTo'](_0x35a7d8['x'],_0x35a7d8['y']);},Game_Character[_0x518638(0x25b)][_0x518638(0x38b)]=function(_0x1d5696,_0x575933){const _0x1a0cf6=_0x518638,_0x3cde64=this[_0x1a0cf6(0x376)](_0x1d5696),_0x5adc21=this[_0x1a0cf6(0x397)](_0x575933);},Game_Character[_0x518638(0x25b)][_0x518638(0x457)]=function(_0x4a4c9d){const _0x2efc1c=_0x518638;if(_0x4a4c9d[_0x2efc1c(0x297)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x4a4c9d['match'](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x518638(0x489)][_0x518638(0x361)]=Game_Event[_0x518638(0x25b)][_0x518638(0x28c)],Game_Event[_0x518638(0x25b)][_0x518638(0x28c)]=function(_0x1e33fa,_0x29a39a){const _0x46fdb5=_0x518638;if($gameTemp[_0x46fdb5(0x29e)])return![];return VisuMZ[_0x46fdb5(0x489)]['Game_Event_isCollidedWithPlayerCharacters'][_0x46fdb5(0x495)](this,_0x1e33fa,_0x29a39a);},Game_Character[_0x518638(0x25b)][_0x518638(0x2e8)]=function(_0xfcfb5,_0x10dc1a){const _0x46b557=_0x518638,_0x453586=['',_0x46b557(0x463),'DOWN',_0x46b557(0x411),_0x46b557(0x240),'',_0x46b557(0x480),_0x46b557(0x24e),'UP','UPPER\x20RIGHT'],_0x25d6d4=_0x453586[_0x46b557(0x4a2)](_0xfcfb5[_0x46b557(0x4f8)]()[_0x46b557(0x3a1)]());if(_0x25d6d4<=0x0)return;if(_0x10dc1a)$gameTemp['_moveAllowPlayerCollision']=!![];if(this[_0x46b557(0x15d)](this['x'],this['y'],_0x25d6d4)){if(_0x10dc1a)$gameTemp[_0x46b557(0x29e)]=![];this[_0x46b557(0x272)](_0x25d6d4),this[_0x46b557(0x211)]-=0x1;}if(_0x10dc1a)$gameTemp[_0x46b557(0x29e)]=![];},Game_Character[_0x518638(0x25b)][_0x518638(0x2f8)]=function(_0x20d6bf,_0x59d143,_0x50be7e){const _0x41c945=_0x518638;this[_0x41c945(0x49c)](_0x20d6bf,_0x59d143,_0x50be7e);if(this['x']!==_0x20d6bf||this['y']!==_0x59d143)this[_0x41c945(0x211)]--;},Game_Character['prototype'][_0x518638(0x385)]=function(_0x12213d,_0x42cdbd){const _0x47218b=_0x518638;if(_0x12213d)this[_0x47218b(0x2f8)](_0x12213d['x'],_0x12213d['y'],_0x42cdbd);},Game_Character['prototype'][_0x518638(0x28b)]=function(_0x514876,_0x3a5797){const _0x5aa5be=_0x518638;_0x3a5797=_0x3a5797||0x0;const _0xd46e36={'code':0x1,'indent':null,'parameters':[]};_0xd46e36[_0x5aa5be(0x1c9)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x514876],this[_0x5aa5be(0x299)][_0x5aa5be(0x398)][this[_0x5aa5be(0x211)]][_0x5aa5be(0x282)][0x0]='';while(_0x3a5797--){this[_0x5aa5be(0x299)]['list']['splice'](this[_0x5aa5be(0x211)]+0x1,0x0,_0xd46e36);}},Game_Character[_0x518638(0x25b)]['processMoveRoutePatternLock']=function(_0x5d534e){const _0x70c689=_0x518638;this[_0x70c689(0x425)]=!![],this[_0x70c689(0x2f2)](_0x5d534e);},Game_Character[_0x518638(0x25b)][_0x518638(0x511)]=function(_0x3add5a,_0x3ef2f0){const _0x685312=_0x518638;if(this===$gamePlayer)return;const _0x4a3a58=[this[_0x685312(0x228)],this[_0x685312(0x45d)],'A'];_0x3add5a[_0x685312(0x297)](/\b[ABCD]\b/i)?_0x4a3a58[0x2]=String(_0x3add5a)[_0x685312(0x4d1)](0x0)[_0x685312(0x4f8)]()['trim']():_0x4a3a58[0x2]='Self\x20Switch\x20%1'[_0x685312(0x290)](_0x3add5a);switch(_0x3ef2f0['toUpperCase']()[_0x685312(0x3a1)]()){case'ON':case _0x685312(0x24a):$gameSelfSwitches[_0x685312(0x285)](_0x4a3a58,!![]);break;case'OFF':case'FALSE':$gameSelfSwitches[_0x685312(0x285)](_0x4a3a58,![]);break;case _0x685312(0x408):$gameSelfSwitches[_0x685312(0x285)](_0x4a3a58,!$gameSelfSwitches[_0x685312(0x53c)](_0x4a3a58));break;}},Game_Character[_0x518638(0x25b)][_0x518638(0x4fd)]=function(_0x2c0084,_0x3f1a76){const _0x254464=_0x518638;if(this===$gamePlayer)return;const _0x539226=[this[_0x254464(0x228)],this[_0x254464(0x45d)],_0x254464(0x451)[_0x254464(0x290)](_0x2c0084)];$gameSelfSwitches[_0x254464(0x285)](_0x539226,Number(_0x3f1a76));},Game_Character[_0x518638(0x25b)][_0x518638(0x532)]=function(_0x16a01b,_0x42ea52){const _0x2075fd=_0x518638;this[_0x2075fd(0x26a)](_0x16a01b,_0x42ea52);},Game_Character[_0x518638(0x25b)][_0x518638(0x32a)]=function(_0x24aa83){const _0x326b11=_0x518638;if(_0x24aa83)this[_0x326b11(0x532)](_0x24aa83['x'],_0x24aa83['y']);},Game_Character[_0x518638(0x25b)][_0x518638(0x169)]=function(){const _0x5ead3d=_0x518638;switch(this[_0x5ead3d(0x1c0)]()){case 0x1:this[_0x5ead3d(0x3d7)](0x7);break;case 0x2:this[_0x5ead3d(0x3d7)](0x4);break;case 0x3:this[_0x5ead3d(0x3d7)](0x1);break;case 0x4:this[_0x5ead3d(0x3d7)](0x8);break;case 0x6:this[_0x5ead3d(0x3d7)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this[_0x5ead3d(0x3d7)](0x6);break;case 0x9:this[_0x5ead3d(0x3d7)](0x3);break;}},Game_Character['prototype'][_0x518638(0x45e)]=function(){const _0x45a030=_0x518638;switch(this['direction']()){case 0x1:this[_0x45a030(0x3d7)](0x3);break;case 0x2:this[_0x45a030(0x3d7)](0x6);break;case 0x3:this[_0x45a030(0x3d7)](0x9);break;case 0x4:this[_0x45a030(0x3d7)](0x2);break;case 0x6:this[_0x45a030(0x3d7)](0x8);break;case 0x7:this[_0x45a030(0x3d7)](0x1);break;case 0x8:this[_0x45a030(0x3d7)](0x4);break;case 0x9:this[_0x45a030(0x3d7)](0x7);break;}},Game_Character['prototype'][_0x518638(0x17d)]=function(_0x2cfc93,_0xc16c3d,_0x76319){const _0x481c84=_0x518638,_0x35bc37=this[_0x481c84(0x376)](_0x2cfc93),_0x1740dd=this[_0x481c84(0x397)](_0xc16c3d);if($gameMap[_0x481c84(0x1b9)]()){if(_0x76319||this[_0x481c84(0x286)]()){if(_0x35bc37>0x0&&_0x1740dd<0x0)return 0x1;if(_0x35bc37<0x0&&_0x1740dd<0x0)return 0x3;if(_0x35bc37>0x0&&_0x1740dd>0x0)return 0x7;if(_0x35bc37<0x0&&_0x1740dd>0x0)return 0x9;}}if(Math['abs'](_0x35bc37)>Math[_0x481c84(0x350)](_0x1740dd))return _0x35bc37>0x0?0x4:0x6;else{if(_0x1740dd!==0x0)return _0x1740dd>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x518638(0x25b)][_0x518638(0x402)]=function(_0x228f79,_0x3c8719,_0x51afef){const _0x3782a0=_0x518638,_0x2b1ed4=this[_0x3782a0(0x376)](_0x228f79),_0x1914ef=this[_0x3782a0(0x397)](_0x3c8719);if($gameMap[_0x3782a0(0x1b9)]()){if(_0x51afef||this['isSpriteVS8dir']()){if(_0x2b1ed4>0x0&&_0x1914ef<0x0)return 0x9;if(_0x2b1ed4<0x0&&_0x1914ef<0x0)return 0x7;if(_0x2b1ed4>0x0&&_0x1914ef>0x0)return 0x3;if(_0x2b1ed4<0x0&&_0x1914ef>0x0)return 0x1;}}if(Math[_0x3782a0(0x350)](_0x2b1ed4)>Math[_0x3782a0(0x350)](_0x1914ef))return _0x2b1ed4>0x0?0x6:0x4;else{if(_0x1914ef!==0x0)return _0x1914ef>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x518638(0x25b)]['moveTowardPoint']=function(_0x5dc711,_0x13fa50){const _0x242b90=_0x518638,_0xd16fa6=this['getDirectionToPoint'](_0x5dc711,_0x13fa50,!![]);if(_0xd16fa6)this[_0x242b90(0x272)](_0xd16fa6);},Game_Character[_0x518638(0x25b)][_0x518638(0x220)]=function(_0x17a49a,_0x4726f5){const _0x6e9b6b=_0x518638,_0x5ef84a=this[_0x6e9b6b(0x402)](_0x17a49a,_0x4726f5,!![]);if(_0x5ef84a)this[_0x6e9b6b(0x272)](_0x5ef84a);},Game_Character[_0x518638(0x25b)][_0x518638(0x3e3)]=function(_0x1be85a,_0x228bb5){const _0x1fdac6=_0x518638,_0x303190=this[_0x1fdac6(0x17d)](_0x1be85a,_0x228bb5,![]);if(_0x303190)this[_0x1fdac6(0x3d7)](_0x303190);},Game_Character[_0x518638(0x25b)][_0x518638(0x1e9)]=function(_0x489d3a,_0x53dcb6){const _0x445b45=_0x518638,_0x42e6a1=this[_0x445b45(0x402)](_0x489d3a,_0x53dcb6,![]);if(_0x42e6a1)this[_0x445b45(0x3d7)](_0x42e6a1);},Game_Character[_0x518638(0x25b)][_0x518638(0x329)]=function(_0x32ca8a){const _0x409987=_0x518638;if(_0x32ca8a)this[_0x409987(0x52d)](_0x32ca8a['x'],_0x32ca8a['y']);},Game_Character[_0x518638(0x25b)]['moveAwayFromCharacter']=function(_0x150567){if(_0x150567)this['moveAwayFromPoint'](_0x150567['x'],_0x150567['y']);},Game_Character[_0x518638(0x25b)]['turnTowardCharacter']=function(_0x16baa0){if(_0x16baa0)this['turnTowardPoint'](_0x16baa0['x'],_0x16baa0['y']);},Game_Character[_0x518638(0x25b)][_0x518638(0x201)]=function(_0x3e30d0){if(_0x3e30d0)this['turnAwayFromPoint'](_0x3e30d0['x'],_0x3e30d0['y']);},VisuMZ[_0x518638(0x489)][_0x518638(0x164)]=Game_Player[_0x518638(0x25b)]['isDashing'],Game_Player['prototype'][_0x518638(0x227)]=function(){const _0x4ddb58=_0x518638;if(this[_0x4ddb58(0x19f)])return!![];return VisuMZ['EventsMoveCore'][_0x4ddb58(0x164)]['call'](this);},Game_Player[_0x518638(0x25b)][_0x518638(0x4aa)]=function(){const _0x527df1=_0x518638;return this[_0x527df1(0x227)]()&&(this['isMoving']()||this['getInputDirection']()!==0x0&&this[_0x527df1(0x15d)](this['_x'],this['_y'],this[_0x527df1(0x2f5)]())||$gameTemp['isDestinationValid']());},VisuMZ[_0x518638(0x489)][_0x518638(0x461)]=Game_Player[_0x518638(0x25b)][_0x518638(0x2f5)],Game_Player[_0x518638(0x25b)][_0x518638(0x2f5)]=function(){const _0x20ce10=_0x518638;return $gameMap[_0x20ce10(0x1b9)]()?this[_0x20ce10(0x2b8)]():VisuMZ[_0x20ce10(0x489)]['Game_Player_getInputDirection'][_0x20ce10(0x495)](this);},Game_Player['prototype'][_0x518638(0x2b8)]=function(){return Input['dir8'];},Game_Player[_0x518638(0x25b)][_0x518638(0x404)]=function(){const _0x5d007b=_0x518638;if($gameSystem[_0x5d007b(0x50e)]())return 0x0;if(!this[_0x5d007b(0x2d8)]()&&this[_0x5d007b(0x2fa)]()){let _0x257d60=this[_0x5d007b(0x2f5)]();if(_0x257d60>0x0)$gameTemp[_0x5d007b(0x34a)]();else{if($gameTemp['isDestinationValid']()){const _0x357aa8=$gameTemp['destinationX'](),_0xee3f3b=$gameTemp['destinationY'](),_0x2798be=$gameMap[_0x5d007b(0x1b9)](),_0x4ad327=$gameMap[_0x5d007b(0x538)](_0x357aa8,_0xee3f3b),_0x4b636f=$gameMap[_0x5d007b(0x180)](_0x357aa8,_0xee3f3b)[_0x5d007b(0x433)]<=0x0;_0x2798be&&_0x4ad327&&_0x4b636f?_0x257d60=this[_0x5d007b(0x328)](_0x357aa8,_0xee3f3b):_0x257d60=this[_0x5d007b(0x3cd)](_0x357aa8,_0xee3f3b);}}_0x257d60>0x0?(this[_0x5d007b(0x3d1)]=this[_0x5d007b(0x3d1)]||0x0,this[_0x5d007b(0x3b4)]()?this[_0x5d007b(0x3d7)](_0x257d60):this['executeMove'](_0x257d60),this[_0x5d007b(0x3d1)]++):this[_0x5d007b(0x3d1)]=0x0;}},Game_Player[_0x518638(0x25b)][_0x518638(0x3b4)]=function(){const _0x2d0b0a=_0x518638,_0x54eeaa=VisuMZ[_0x2d0b0a(0x489)][_0x2d0b0a(0x223)][_0x2d0b0a(0x1f6)];if(!_0x54eeaa[_0x2d0b0a(0x51d)])return![];if($gameTemp[_0x2d0b0a(0x4f3)]())return![];if(this[_0x2d0b0a(0x227)]()||this[_0x2d0b0a(0x2d8)]()||this[_0x2d0b0a(0x260)]())return![];return this[_0x2d0b0a(0x3d1)]<_0x54eeaa[_0x2d0b0a(0x4a9)];},VisuMZ[_0x518638(0x489)][_0x518638(0x514)]=Game_Player[_0x518638(0x25b)]['executeMove'],Game_Player[_0x518638(0x25b)][_0x518638(0x31c)]=function(_0x4a3a0e){const _0x1517f5=_0x518638;$gameMap[_0x1517f5(0x1b9)]()?this[_0x1517f5(0x272)](_0x4a3a0e):VisuMZ['EventsMoveCore']['Game_Player_executeMove'][_0x1517f5(0x495)](this,_0x4a3a0e);},VisuMZ[_0x518638(0x489)][_0x518638(0x31e)]=Game_Player['prototype'][_0x518638(0x4bc)],Game_Player[_0x518638(0x25b)][_0x518638(0x4bc)]=function(_0x17ce81,_0x2a3bbc,_0x9489f7){const _0x3b15e8=_0x518638;if($gameMap[_0x3b15e8(0x33a)](_0x17ce81,_0x2a3bbc,_0x9489f7,_0x3b15e8(0x3eb)))return this[_0x3b15e8(0x3fe)]()&&this[_0x3b15e8(0x49f)]()?this[_0x3b15e8(0x49f)]()[_0x3b15e8(0x4bc)](_0x17ce81,_0x2a3bbc,_0x9489f7):!![];if($gameMap[_0x3b15e8(0x171)](_0x17ce81,_0x2a3bbc,_0x9489f7,'player'))return![];return VisuMZ[_0x3b15e8(0x489)]['Game_Player_isMapPassable']['call'](this,_0x17ce81,_0x2a3bbc,_0x9489f7);},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere']=Game_Player[_0x518638(0x25b)]['checkEventTriggerHere'],Game_Player[_0x518638(0x25b)][_0x518638(0x47a)]=function(_0x1ea93d){const _0x1fea7f=_0x518638;VisuMZ[_0x1fea7f(0x489)][_0x1fea7f(0x3f8)][_0x1fea7f(0x495)](this,_0x1ea93d);if(this[_0x1fea7f(0x4bd)]()){this['checkEventTriggerEventsMoveCore'](_0x1ea93d);if(_0x1ea93d['includes'](0x0)&&this[_0x1fea7f(0x2ff)]()===_0x1fea7f(0x48b))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x1ea93d[_0x1fea7f(0x394)](0x1)||_0x1ea93d[_0x1fea7f(0x394)](0x2))&&this[_0x1fea7f(0x40e)]();}},VisuMZ[_0x518638(0x489)][_0x518638(0x1f5)]=Game_Player[_0x518638(0x25b)][_0x518638(0x3d6)],Game_Player['prototype']['checkEventTriggerThere']=function(_0x48509d){const _0x499571=_0x518638;VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere'][_0x499571(0x495)](this,_0x48509d);if(this['canStartLocalEvents']()&&_0x48509d['includes'](0x0)&&this[_0x499571(0x2ff)]()==='front'){const _0x27b8fa=this[_0x499571(0x1c0)](),_0x16c16e=$gameMap[_0x499571(0x168)](this['x'],_0x27b8fa),_0x16dd5a=$gameMap[_0x499571(0x4a4)](this['y'],_0x27b8fa);this[_0x499571(0x539)](_0x16c16e,_0x16dd5a);}},Game_Player['prototype'][_0x518638(0x1d3)]=function(_0x2ed729){const _0x15c9ca=_0x518638;if($gameMap[_0x15c9ca(0x371)]())return;if($gameMap[_0x15c9ca(0x3cf)]())return;const _0x4d03fb=$gameMap[_0x15c9ca(0x2c6)]();for(const _0x4308db of _0x4d03fb){if(!_0x4308db)continue;if(!_0x4308db[_0x15c9ca(0x50b)](_0x2ed729))continue;if(this[_0x15c9ca(0x1e4)](_0x4308db))return _0x4308db[_0x15c9ca(0x343)]();if(this['meetActivationProximityConditions'](_0x4308db))return _0x4308db['start']();}},Game_Player['prototype']['meetActivationRegionConditions']=function(_0x46f5bd){const _0x5729c9=_0x518638;if($gameMap[_0x5729c9(0x371)]())return![];if($gameMap[_0x5729c9(0x3cf)]())return![];return _0x46f5bd['activationRegionList']()[_0x5729c9(0x394)](this[_0x5729c9(0x232)]());},Game_Player['prototype'][_0x518638(0x26e)]=function(_0x30fe1e){const _0x1f1522=_0x518638;if($gameMap[_0x1f1522(0x371)]())return![];if($gameMap[_0x1f1522(0x3cf)]())return![];if(['none',_0x1f1522(0x4ea)][_0x1f1522(0x394)](_0x30fe1e[_0x1f1522(0x160)]()))return![];const _0x363b9c=_0x30fe1e[_0x1f1522(0x160)](),_0x35698e=_0x30fe1e['activationProximityDistance']();switch(_0x363b9c){case'radius':const _0x1d0782=$gameMap[_0x1f1522(0x2a7)](this['x'],this['y'],_0x30fe1e['x'],_0x30fe1e['y']);return _0x30fe1e[_0x1f1522(0x3ec)]()>=_0x1d0782;break;case _0x1f1522(0x3b8):return _0x35698e>=Math['abs'](_0x30fe1e[_0x1f1522(0x376)](this['x']))&&_0x35698e>=Math[_0x1f1522(0x350)](_0x30fe1e['deltaYFrom'](this['y']));break;case _0x1f1522(0x2d4):return _0x35698e>=Math[_0x1f1522(0x350)](_0x30fe1e['deltaYFrom'](this['y']));break;case _0x1f1522(0x522):return _0x35698e>=Math[_0x1f1522(0x350)](_0x30fe1e[_0x1f1522(0x376)](this['x']));break;case _0x1f1522(0x500):return![];break;}},Game_Player[_0x518638(0x25b)][_0x518638(0x539)]=function(_0xea27ce,_0x2287cb){const _0x27f2db=_0x518638;if($gameMap[_0x27f2db(0x371)]())return;if($gameMap[_0x27f2db(0x3cf)]())return;let _0x1e38e4=VisuMZ['EventsMoveCore'][_0x27f2db(0x223)][_0x27f2db(0x16c)],_0x51463c=$gameMap[_0x27f2db(0x232)](_0xea27ce,_0x2287cb);const _0x21fe37=_0x27f2db(0x344)[_0x27f2db(0x290)](_0x51463c);_0x1e38e4[_0x21fe37]&&$gameTemp[_0x27f2db(0x327)](_0x1e38e4[_0x21fe37]);},Game_Player[_0x518638(0x25b)][_0x518638(0x2ff)]=function(){const _0x2c4825=_0x518638;return VisuMZ[_0x2c4825(0x489)][_0x2c4825(0x223)][_0x2c4825(0x162)];},Game_Player[_0x518638(0x25b)]['startMapCommonEventOnTouch']=function(){const _0x2d5449=_0x518638;if($gameMap[_0x2d5449(0x371)]())return;if($gameMap[_0x2d5449(0x3cf)]())return;let _0x1326f6=VisuMZ['EventsMoveCore'][_0x2d5449(0x223)][_0x2d5449(0x2d2)];const _0x4e21a9=_0x2d5449(0x344)[_0x2d5449(0x290)](this[_0x2d5449(0x232)]());_0x1326f6[_0x4e21a9]&&$gameTemp[_0x2d5449(0x327)](_0x1326f6[_0x4e21a9]);},VisuMZ['EventsMoveCore'][_0x518638(0x23d)]=Game_Player[_0x518638(0x25b)][_0x518638(0x2c4)],Game_Player[_0x518638(0x25b)][_0x518638(0x2c4)]=function(){const _0x17ad15=_0x518638;VisuMZ[_0x17ad15(0x489)][_0x17ad15(0x23d)][_0x17ad15(0x495)](this),VisuMZ[_0x17ad15(0x3b6)](0x0);},VisuMZ[_0x518638(0x489)][_0x518638(0x196)]=Game_Follower[_0x518638(0x25b)][_0x518638(0x41b)],Game_Follower[_0x518638(0x25b)][_0x518638(0x41b)]=function(_0x42c84e){const _0x28db44=_0x518638;VisuMZ[_0x28db44(0x489)][_0x28db44(0x196)][_0x28db44(0x495)](this,_0x42c84e),this['_chaseOff']=![];},Game_Follower[_0x518638(0x25b)][_0x518638(0x227)]=function(){const _0x3cda2b=_0x518638;return $gamePlayer[_0x3cda2b(0x227)]();},Game_Follower[_0x518638(0x25b)][_0x518638(0x4aa)]=function(){const _0x3d78f5=_0x518638;return $gamePlayer[_0x3d78f5(0x4aa)]();},Game_Follower[_0x518638(0x25b)]['realMoveSpeed']=function(){const _0x61ffa5=_0x518638;return $gamePlayer[_0x61ffa5(0x2e7)]();},Game_Follower[_0x518638(0x25b)][_0x518638(0x273)]=function(_0x199a05){const _0x1715db=_0x518638;this[_0x1715db(0x1b4)]=_0x199a05;},VisuMZ[_0x518638(0x489)][_0x518638(0x19d)]=Game_Follower[_0x518638(0x25b)][_0x518638(0x322)],Game_Follower[_0x518638(0x25b)][_0x518638(0x322)]=function(_0xa60248){const _0x477c97=_0x518638;if(this[_0x477c97(0x1b4)])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x477c97(0x489)][_0x477c97(0x19d)]['call'](this,_0xa60248);},VisuMZ[_0x518638(0x489)][_0x518638(0x3ff)]=Game_Vehicle[_0x518638(0x25b)][_0x518638(0x4bc)],Game_Vehicle[_0x518638(0x25b)][_0x518638(0x4bc)]=function(_0xe7652d,_0x19df53,_0x4adb86){const _0x56c48a=_0x518638;if($gameMap['isRegionAllowPass'](_0xe7652d,_0x19df53,_0x4adb86,this[_0x56c48a(0x315)]))return!![];if($gameMap[_0x56c48a(0x171)](_0xe7652d,_0x19df53,_0x4adb86,this[_0x56c48a(0x315)]))return![];return VisuMZ[_0x56c48a(0x489)][_0x56c48a(0x3ff)][_0x56c48a(0x495)](this,_0xe7652d,_0x19df53,_0x4adb86);},Game_Vehicle['prototype'][_0x518638(0x43a)]=function(_0x2b9e34,_0x39efd5,_0x3b3f9e){const _0x19b50a=_0x518638;if($gameMap['isRegionAllowPass'](_0x2b9e34,_0x39efd5,_0x3b3f9e,this['_type']))return!![];if($gameMap[_0x19b50a(0x171)](_0x2b9e34,_0x39efd5,_0x3b3f9e,this['_type']))return![];return VisuMZ[_0x19b50a(0x489)][_0x19b50a(0x3c9)][_0x19b50a(0x495)]($gamePlayer,_0x2b9e34,_0x39efd5,_0x3b3f9e);},VisuMZ[_0x518638(0x489)][_0x518638(0x2be)]=Game_Vehicle['prototype'][_0x518638(0x23f)],Game_Vehicle[_0x518638(0x25b)]['isLandOk']=function(_0x5e005f,_0x2bbfc5,_0x5e0a06){const _0x2051b2=_0x518638;if($gameMap[_0x2051b2(0x3c2)](_0x5e005f,_0x2bbfc5,_0x5e0a06,this[_0x2051b2(0x315)]))return!![];const _0x1b9a3a=this[_0x2051b2(0x315)][_0x2051b2(0x4d1)](0x0)[_0x2051b2(0x4f8)]()+this['_type'][_0x2051b2(0x459)](0x1),_0x3817df='%1DockRegionOnly'[_0x2051b2(0x290)](_0x1b9a3a);return VisuMZ[_0x2051b2(0x489)][_0x2051b2(0x223)]['Region'][_0x3817df]?![]:VisuMZ[_0x2051b2(0x489)][_0x2051b2(0x2be)][_0x2051b2(0x495)](this,_0x5e005f,_0x2bbfc5,_0x5e0a06);},VisuMZ[_0x518638(0x489)][_0x518638(0x49e)]=Game_Vehicle['prototype'][_0x518638(0x27d)],Game_Vehicle[_0x518638(0x25b)][_0x518638(0x27d)]=function(){const _0x35c933=_0x518638;VisuMZ['EventsMoveCore'][_0x35c933(0x49e)][_0x35c933(0x495)](this);const _0x51ff41=VisuMZ[_0x35c933(0x489)][_0x35c933(0x223)][_0x35c933(0x1f6)];if(this[_0x35c933(0x31a)]()){if(_0x51ff41[_0x35c933(0x523)])this[_0x35c933(0x382)](_0x51ff41[_0x35c933(0x523)]);}else{if(this['isShip']()){if(_0x51ff41[_0x35c933(0x1d8)])this[_0x35c933(0x382)](_0x51ff41['ShipSpeed']);}else{if(this[_0x35c933(0x4a7)]()){if(_0x51ff41[_0x35c933(0x205)])this[_0x35c933(0x382)](_0x51ff41['AirshipSpeed']);}}}},VisuMZ[_0x518638(0x489)]['Game_Event_initialize']=Game_Event[_0x518638(0x25b)][_0x518638(0x41b)],Game_Event[_0x518638(0x25b)]['initialize']=function(_0xb466d1,_0x3487c9){const _0x3d5928=_0x518638;VisuMZ['EventsMoveCore'][_0x3d5928(0x48a)][_0x3d5928(0x495)](this,_0xb466d1,_0x3487c9),this[_0x3d5928(0x1cb)](),this[_0x3d5928(0x52c)](),this[_0x3d5928(0x4d6)]();},Game_Map[_0x518638(0x25b)][_0x518638(0x32b)]=function(_0x20415b,_0x56e8af){const _0x25ae8a=_0x518638;return _0x20415b===$gameMap[_0x25ae8a(0x1ec)]()?$dataMap[_0x25ae8a(0x2c6)][_0x56e8af]:VisuMZ[_0x25ae8a(0x35a)][_0x20415b][_0x25ae8a(0x2c6)][_0x56e8af];},VisuMZ['EventsMoveCore'][_0x518638(0x4c5)]=Game_Event[_0x518638(0x25b)][_0x518638(0x40c)],Game_Event[_0x518638(0x25b)][_0x518638(0x40c)]=function(){const _0xea8234=_0x518638;if(this[_0xea8234(0x374)]!==undefined){const _0x41960a=this[_0xea8234(0x374)][_0xea8234(0x1ec)],_0x554882=this[_0xea8234(0x374)]['eventId'];return $gameMap[_0xea8234(0x32b)](_0x41960a,_0x554882);}if(this['_eventCopyData']!==undefined){const _0x429ea4=this['_eventCopyData'][_0xea8234(0x1ec)],_0x58f605=this['_eventCopyData'][_0xea8234(0x18e)];return $gameMap[_0xea8234(0x32b)](_0x429ea4,_0x58f605);}if(this[_0xea8234(0x2bf)]!==undefined){const _0x40fad4=this[_0xea8234(0x2bf)]['mapId'],_0x38e181=this['_eventSpawnData'][_0xea8234(0x18e)];return $gameMap['referEvent'](_0x40fad4,_0x38e181);}if($gameTemp['_spawnData']!==undefined){const _0x252bae=$gameTemp[_0xea8234(0x52a)][_0xea8234(0x1ec)],_0x3a9030=$gameTemp['_spawnData']['eventId'];return $gameMap[_0xea8234(0x32b)](_0x252bae,_0x3a9030);}return VisuMZ[_0xea8234(0x489)][_0xea8234(0x4c5)]['call'](this);},Game_Event[_0x518638(0x25b)][_0x518638(0x40a)]=function(_0x5f0696,_0x4c5069){const _0x2868f4=_0x518638;if(_0x5f0696===0x0||_0x4c5069===0x0)return![];if(!VisuMZ['PreloadedMaps'][_0x5f0696]&&_0x5f0696!==$gameMap[_0x2868f4(0x1ec)]())return $gameTemp['isPlaytest']()&&console[_0x2868f4(0x4cb)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'[_0x2868f4(0x290)](_0x5f0696)),![];return!![];},VisuMZ['EventsMoveCore'][_0x518638(0x380)]=Game_Event[_0x518638(0x25b)]['start'],Game_Event[_0x518638(0x25b)]['start']=function(){const _0x50fa17=_0x518638;VisuMZ[_0x50fa17(0x489)][_0x50fa17(0x380)][_0x50fa17(0x495)](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x50fa17(0x21c)](VisuMZ['MessageCore'][_0x50fa17(0x223)][_0x50fa17(0x22c)]['FastForwardKey'])&&Input[_0x50fa17(0x462)]();},Game_Event[_0x518638(0x25b)]['setupCopyEvent']=function(){const _0x3e8ffd=_0x518638,_0x1994d2=this[_0x3e8ffd(0x40c)]()['note'];if(_0x1994d2==='')return;if(DataManager[_0x3e8ffd(0x369)]()||DataManager[_0x3e8ffd(0x448)]())return;const _0x554159=VisuMZ[_0x3e8ffd(0x489)][_0x3e8ffd(0x223)][_0x3e8ffd(0x3e6)];let _0x466cbe=null,_0x5c3ce2=0x0,_0x1043a3=0x0;if(_0x1994d2[_0x3e8ffd(0x297)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x5c3ce2=Number(RegExp['$1']),_0x1043a3=Number(RegExp['$2']);else{if(_0x1994d2[_0x3e8ffd(0x297)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x5c3ce2=Number(RegExp['$1']),_0x1043a3=Number(RegExp['$2']);else{if(_0x1994d2[_0x3e8ffd(0x297)](/<COPY EVENT:[ ](.*?)>/i)){const _0x336c63=String(RegExp['$1'])[_0x3e8ffd(0x4f8)]()[_0x3e8ffd(0x3a1)]();_0x466cbe=VisuMZ['EventTemplates'][_0x336c63];if(!_0x466cbe)return;_0x5c3ce2=_0x466cbe['MapID'],_0x1043a3=_0x466cbe['EventID'];}}}if(!this['checkValidEventerMap'](_0x5c3ce2,_0x1043a3))return;_0x554159[_0x3e8ffd(0x2f6)][_0x3e8ffd(0x495)](this,_0x5c3ce2,_0x1043a3,this);if(_0x466cbe)_0x466cbe[_0x3e8ffd(0x2f6)][_0x3e8ffd(0x495)](this,_0x5c3ce2,_0x1043a3,this);this[_0x3e8ffd(0x2ac)]={'mapId':_0x5c3ce2,'eventId':_0x1043a3},this[_0x3e8ffd(0x37c)]=-0x2,this[_0x3e8ffd(0x2cd)](),_0x554159[_0x3e8ffd(0x4ce)][_0x3e8ffd(0x495)](this,_0x5c3ce2,_0x1043a3,this);if(_0x466cbe)_0x466cbe[_0x3e8ffd(0x4ce)][_0x3e8ffd(0x495)](this,_0x5c3ce2,_0x1043a3,this);$gameMap[_0x3e8ffd(0x4ae)]();},Game_Event[_0x518638(0x25b)][_0x518638(0x52c)]=function(){const _0x133ced=_0x518638,_0x2d2474=$gameSystem[_0x133ced(0x32d)](this);if(!_0x2d2474)return;const _0x3440be=_0x2d2474[_0x133ced(0x21e)][_0x133ced(0x4f8)]()[_0x133ced(0x3a1)]();_0x3440be!==_0x133ced(0x1c4)?this[_0x133ced(0x326)](_0x3440be,!![]):this['morphInto'](_0x2d2474[_0x133ced(0x1ec)],_0x2d2474['eventId'],!![]);},Game_Event['prototype']['morphInto']=function(_0x2f124c,_0x5d240e,_0x413062){const _0x5c1cfe=_0x518638;if(!this[_0x5c1cfe(0x40a)](_0x2f124c,_0x5d240e))return;const _0x3a095e=VisuMZ[_0x5c1cfe(0x489)]['Settings'][_0x5c1cfe(0x3e6)];if(!_0x413062)_0x3a095e[_0x5c1cfe(0x53d)][_0x5c1cfe(0x495)](this,_0x2f124c,_0x5d240e,this);this['_eventMorphData']={'mapId':_0x2f124c,'eventId':_0x5d240e},this[_0x5c1cfe(0x37c)]=-0x2,this['refresh']();if(!_0x413062)_0x3a095e[_0x5c1cfe(0x38c)][_0x5c1cfe(0x495)](this,_0x2f124c,_0x5d240e,this);$gameMap[_0x5c1cfe(0x4ae)]();},Game_Event[_0x518638(0x25b)][_0x518638(0x326)]=function(_0x1147a6,_0x2e5e95){const _0x650ee7=_0x518638;_0x1147a6=_0x1147a6[_0x650ee7(0x4f8)]()[_0x650ee7(0x3a1)]();const _0x361a93=VisuMZ[_0x650ee7(0x414)][_0x1147a6];if(!_0x361a93)return;const _0x34717c=_0x361a93[_0x650ee7(0x44b)],_0x26f6a8=_0x361a93[_0x650ee7(0x3e9)];if(!this[_0x650ee7(0x40a)](_0x34717c,_0x26f6a8))return;if(!_0x2e5e95)_0x361a93['PreMorphJS'][_0x650ee7(0x495)](this,_0x34717c,_0x26f6a8,this);this['morphInto'](_0x34717c,_0x26f6a8,_0x2e5e95);if(!_0x2e5e95)_0x361a93[_0x650ee7(0x38c)][_0x650ee7(0x495)](this,_0x34717c,_0x26f6a8,this);if($gameMap)$gameMap[_0x650ee7(0x4ae)]();},Game_Event[_0x518638(0x25b)][_0x518638(0x1aa)]=function(){const _0x5db838=_0x518638;this[_0x5db838(0x374)]=undefined,this[_0x5db838(0x37c)]=-0x2,this[_0x5db838(0x2cd)]();},Game_Event[_0x518638(0x25b)][_0x518638(0x493)]=function(_0xa0cf5e){const _0x5a3818=_0x518638,_0x1420f9=VisuMZ['EventsMoveCore'][_0x5a3818(0x223)][_0x5a3818(0x3e6)],_0xf43f9f=_0xa0cf5e[_0x5a3818(0x21e)]['toUpperCase']()['trim'](),_0x18447e=!['',_0x5a3818(0x1c4)][_0x5a3818(0x394)](_0xf43f9f);let _0x921bcb=0x0,_0x2b15e3=0x0;if(_0x18447e){const _0x46fd2c=VisuMZ[_0x5a3818(0x414)][_0xf43f9f];if(!_0x46fd2c)return;_0x921bcb=_0x46fd2c[_0x5a3818(0x44b)],_0x2b15e3=_0x46fd2c[_0x5a3818(0x3e9)];}else _0x921bcb=_0xa0cf5e[_0x5a3818(0x1ec)],_0x2b15e3=_0xa0cf5e[_0x5a3818(0x18e)];if(!this['checkValidEventerMap'](_0x921bcb,_0x2b15e3))return;if(_0x18447e){const _0x5fa22=VisuMZ[_0x5a3818(0x414)][_0xf43f9f];_0x5fa22[_0x5a3818(0x2ed)]['call'](this,_0x921bcb,_0x2b15e3,this);}_0x1420f9['PreSpawnJS'][_0x5a3818(0x495)](this,_0x921bcb,_0x2b15e3,this),this[_0x5a3818(0x2bf)]=_0xa0cf5e,this[_0x5a3818(0x37c)]=-0x2,this[_0x5a3818(0x228)]=$gameMap[_0x5a3818(0x1ec)](),this[_0x5a3818(0x45d)]=_0xa0cf5e['spawnEventId'],this[_0x5a3818(0x4ab)]=_0xa0cf5e['spawnPreserved'],this['locate'](_0xa0cf5e['x'],_0xa0cf5e['y']),this[_0x5a3818(0x3d7)](_0xa0cf5e[_0x5a3818(0x1c0)]),this[_0x5a3818(0x2cd)]();if(_0x18447e){const _0x26b9ad=VisuMZ[_0x5a3818(0x414)][_0xf43f9f];if(!_0x26b9ad)return;_0x26b9ad[_0x5a3818(0x4ad)][_0x5a3818(0x495)](this,_0x921bcb,_0x2b15e3,this);}_0x1420f9[_0x5a3818(0x4ad)][_0x5a3818(0x495)](this,_0x921bcb,_0x2b15e3,this);const _0x36f645=SceneManager[_0x5a3818(0x309)];if(_0x36f645&&_0x36f645[_0x5a3818(0x4da)])_0x36f645['_spriteset']['createSpawnedEvent'](this);},Game_Event[_0x518638(0x25b)]['isSpawnedEvent']=function(){return!!this['_eventSpawnData'];},VisuMZ[_0x518638(0x489)][_0x518638(0x48d)]=Game_Event['prototype'][_0x518638(0x1af)],Game_Event[_0x518638(0x25b)][_0x518638(0x1af)]=function(){const _0x114cfe=_0x518638;VisuMZ[_0x114cfe(0x489)][_0x114cfe(0x48d)][_0x114cfe(0x495)](this),this[_0x114cfe(0x30c)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x175)]=Game_Event[_0x518638(0x25b)]['setupPageSettings'],Game_Event['prototype'][_0x518638(0x393)]=function(){const _0x59ef93=_0x518638;this[_0x59ef93(0x39d)]=!![],VisuMZ[_0x59ef93(0x489)][_0x59ef93(0x175)]['call'](this),this[_0x59ef93(0x4e2)](),this[_0x59ef93(0x39d)]=![];},Game_Event['prototype'][_0x518638(0x4e2)]=function(){const _0x44cee8=_0x518638;if(!this['event']())return;this[_0x44cee8(0x30c)](),this['setupEventsMoveCoreNotetags'](),this[_0x44cee8(0x3e1)](),this['updateEventsMoveCoreTagChanges']();},Game_Event['prototype']['setupEventsMoveCoreNotetags']=function(){const _0x28b4b5=_0x518638,_0x313ca5=this['event']()[_0x28b4b5(0x3fa)];if(_0x313ca5==='')return;this[_0x28b4b5(0x2fe)](_0x313ca5);},Game_Event['prototype'][_0x518638(0x3e1)]=function(){const _0x178a6b=_0x518638;if(!this['page']())return;const _0x3edc32=this[_0x178a6b(0x398)]();let _0x2f8fe7='';for(const _0xf7e195 of _0x3edc32){if([0x6c,0x198]['includes'](_0xf7e195[_0x178a6b(0x1c9)])){if(_0x2f8fe7!=='')_0x2f8fe7+='\x0a';_0x2f8fe7+=_0xf7e195[_0x178a6b(0x282)][0x0];}}this['checkEventsMoveCoreStringTags'](_0x2f8fe7);},Game_Event[_0x518638(0x25b)][_0x518638(0x30c)]=function(){const _0x3fc324=_0x518638,_0x56b74c=VisuMZ['EventsMoveCore'][_0x3fc324(0x223)];this[_0x3fc324(0x3d3)]={'type':_0x3fc324(0x43f),'distance':0x0,'regionList':[]},this[_0x3fc324(0x1bc)]=![],this['_clickTrigger']=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x3fc324(0x45c)]=$gameSystem[_0x3fc324(0x46d)](this),this['_labelWindow']={'text':'','visibleRange':_0x56b74c[_0x3fc324(0x2c0)][_0x3fc324(0x192)],'offsetX':_0x56b74c[_0x3fc324(0x2c0)]['OffsetX'],'offsetY':_0x56b74c[_0x3fc324(0x2c0)][_0x3fc324(0x1a1)]},this[_0x3fc324(0x236)]=[],this[_0x3fc324(0x257)]={'target':-0x1,'type':_0x3fc324(0x324),'delay':0x1},this[_0x3fc324(0x3ba)]=_0x56b74c[_0x3fc324(0x1f6)][_0x3fc324(0x266)]??0x0,this[_0x3fc324(0x2eb)]=![],this[_0x3fc324(0x46f)]={'visible':!![],'filename':_0x56b74c[_0x3fc324(0x1f6)][_0x3fc324(0x44f)]},this[_0x3fc324(0x3c3)](),this[_0x3fc324(0x283)]();},Game_Event['prototype'][_0x518638(0x2fe)]=function(_0x481768){const _0x5072f4=_0x518638;if(_0x481768[_0x5072f4(0x297)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x5072f4(0x3d3)][_0x5072f4(0x42a)]=JSON[_0x5072f4(0x3c7)]('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x5072f4(0x3d3)][_0x5072f4(0x18c)]=_0x5072f4(0x4ea);else _0x481768['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x5072f4(0x3a1)](),this['_activationProximity'][_0x5072f4(0x18c)]=type,this[_0x5072f4(0x3d3)][_0x5072f4(0x2a7)]=Number(RegExp['$2']));_0x481768[_0x5072f4(0x297)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x5072f4(0x1bc)]=!![]);_0x481768[_0x5072f4(0x297)](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);const _0x51cc1d=_0x481768[_0x5072f4(0x297)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x51cc1d)for(const _0x5306d7 of _0x51cc1d){if(_0x5306d7[_0x5072f4(0x297)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x17ceb7=String(RegExp['$1'])[_0x5072f4(0x265)]()[_0x5072f4(0x3a1)](),_0x11e8d0=Number(RegExp['$2']);this['_addedHitbox'][_0x17ceb7]=_0x11e8d0;}}_0x481768['match'](/<ICON:[ ](\d+)>/i)&&(this[_0x5072f4(0x45c)][_0x5072f4(0x166)]=Number(RegExp['$1']));_0x481768['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x5072f4(0x1bf)]=Number(RegExp['$1']));_0x481768[_0x5072f4(0x297)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5072f4(0x45c)][_0x5072f4(0x2e2)]=Number(RegExp['$1']));_0x481768[_0x5072f4(0x297)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5072f4(0x45c)][_0x5072f4(0x1bf)]=Number(RegExp['$1']),this[_0x5072f4(0x45c)][_0x5072f4(0x2e2)]=Number(RegExp['$2']));if(_0x481768['match'](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x7e03c8=String(RegExp['$1'])['toUpperCase']()[_0x5072f4(0x3a1)](),_0x548a05=['NORMAL',_0x5072f4(0x2bc),'MULTIPLY',_0x5072f4(0x391)];this[_0x5072f4(0x45c)][_0x5072f4(0x466)]=_0x548a05['indexOf'](_0x7e03c8)[_0x5072f4(0x33b)](0x0,0x3);}_0x481768[_0x5072f4(0x297)](/<LABEL:[ ](.*?)>/i)&&(this[_0x5072f4(0x38a)][_0x5072f4(0x1da)]=String(RegExp['$1'])['trim']());_0x481768[_0x5072f4(0x297)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this['_labelWindow'][_0x5072f4(0x1da)]=String(RegExp['$1'])[_0x5072f4(0x3a1)]());_0x481768[_0x5072f4(0x297)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5072f4(0x38a)]['offsetX']=Number(RegExp['$1']));_0x481768[_0x5072f4(0x297)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow']['offsetY']=Number(RegExp['$1']));_0x481768['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x5072f4(0x174)]=Number(RegExp['$1']),this['_labelWindow'][_0x5072f4(0x4df)]=Number(RegExp['$2']));$gameTemp[_0x5072f4(0x503)](this);for(;;){if(this[_0x5072f4(0x38a)][_0x5072f4(0x1da)][_0x5072f4(0x297)](/\\V\[(\d+)\]/gi))this[_0x5072f4(0x38a)][_0x5072f4(0x1da)]=this[_0x5072f4(0x38a)]['text'][_0x5072f4(0x3e8)](/\\V\[(\d+)\]/gi,(_0x4d872b,_0x37081c)=>$gameVariables[_0x5072f4(0x53c)](parseInt(_0x37081c)));else break;}$gameTemp[_0x5072f4(0x1e8)]();_0x481768[_0x5072f4(0x297)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x5072f4(0x38a)][_0x5072f4(0x203)]=Number(RegExp['$1']));if(_0x481768[_0x5072f4(0x297)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d7e17=JSON[_0x5072f4(0x3c7)]('['+RegExp['$1'][_0x5072f4(0x297)](/\d+/g)+']');this[_0x5072f4(0x236)]=this[_0x5072f4(0x236)][_0x5072f4(0x2b7)](_0x2d7e17),this[_0x5072f4(0x236)]['remove'](0x0);}if(_0x481768[_0x5072f4(0x297)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x34298e=String(RegExp['$1']);if(_0x34298e['match'](/PLAYER/i))this['_moveSynch']['target']=0x0;else _0x34298e[_0x5072f4(0x297)](/EVENT[ ](\d+)/i)&&(this['_moveSynch'][_0x5072f4(0x1c1)]=Number(RegExp['$1']));}_0x481768['match'](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x5072f4(0x257)][_0x5072f4(0x18c)]=String(RegExp['$1'])[_0x5072f4(0x265)]()[_0x5072f4(0x3a1)]());_0x481768[_0x5072f4(0x297)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x5072f4(0x257)][_0x5072f4(0x529)]=Number(RegExp['$1']));if(_0x481768[_0x5072f4(0x297)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x481768[_0x5072f4(0x297)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x5072f4(0x3ba)]=Number(RegExp['$1'])||0x0);_0x481768[_0x5072f4(0x297)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x5072f4(0x2eb)]=!![]),_0x481768[_0x5072f4(0x297)](/<HIDE SHADOW>/i)&&(this[_0x5072f4(0x46f)][_0x5072f4(0x49a)]=![]),_0x481768[_0x5072f4(0x297)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x5072f4(0x46f)]['filename']=String(RegExp['$1'])),_0x481768['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1'])),_0x481768[_0x5072f4(0x297)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5072f4(0x20e)]=Number(RegExp['$1'])),_0x481768[_0x5072f4(0x297)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2'])),_0x481768['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x5072f4(0x1ef)]=String(RegExp['$1'])[_0x5072f4(0x4f8)]()[_0x5072f4(0x3a1)]());},Game_Event[_0x518638(0x25b)]['updateEventsMoveCoreTagChanges']=function(){const _0x9d5972=_0x518638;this[_0x9d5972(0x4f4)]();},Game_Event['prototype'][_0x518638(0x47c)]=function(){const _0x3e3f76=_0x518638;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x3e3f76(0x25b)][_0x3e3f76(0x47c)][_0x3e3f76(0x495)](this);},VisuMZ[_0x518638(0x489)][_0x518638(0x45f)]=Game_Event[_0x518638(0x25b)][_0x518638(0x4a3)],Game_Event[_0x518638(0x25b)]['updateSelfMovement']=function(){const _0x2e137d=_0x518638;if(this[_0x2e137d(0x386)]())return;VisuMZ[_0x2e137d(0x489)]['Game_Event_updateSelfMovement']['call'](this),this[_0x2e137d(0x2d8)]()&&VisuMZ[_0x2e137d(0x3b6)](this['_eventId']);},Game_Event['prototype']['isPreventSelfMovement']=function(){const _0x1a51b6=_0x518638,_0x101c4e=VisuMZ[_0x1a51b6(0x489)][_0x1a51b6(0x223)][_0x1a51b6(0x1f6)];if($gameMap['isEventRunning']()&&_0x101c4e[_0x1a51b6(0x204)])return!![];if($gameMessage[_0x1a51b6(0x452)]()&&_0x101c4e[_0x1a51b6(0x19a)])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this[_0x1a51b6(0x37d)]()>=0x0)return!![];return![];},Game_Event['prototype']['updateShadowChanges']=function(){const _0x251060=_0x518638,_0x932623=SceneManager[_0x251060(0x309)][_0x251060(0x4da)];if(_0x932623){const _0x5e9ae5=_0x932623[_0x251060(0x1fc)](this);_0x5e9ae5&&_0x5e9ae5[_0x251060(0x3a2)]&&_0x5e9ae5[_0x251060(0x3a2)][_0x251060(0x289)]!==this['shadowFilename']()&&(_0x5e9ae5['_shadowSprite']['_filename']=this[_0x251060(0x1e5)](),_0x5e9ae5['_shadowSprite'][_0x251060(0x412)]=ImageManager['loadSystem'](_0x5e9ae5[_0x251060(0x3a2)][_0x251060(0x289)]));}},Game_Event[_0x518638(0x25b)]['shadowFilename']=function(){return this['_shadowGraphic']['filename'];},Game_Event[_0x518638(0x25b)][_0x518638(0x2ab)]=function(){const _0x17e352=_0x518638;if(!this[_0x17e352(0x46f)][_0x17e352(0x49a)])return![];return Game_CharacterBase['prototype'][_0x17e352(0x2ab)]['call'](this);},Game_Event[_0x518638(0x25b)][_0x518638(0x358)]=function(){const _0x4c8cf1=_0x518638;return this['_labelWindow'][_0x4c8cf1(0x1da)];},Game_Event[_0x518638(0x25b)][_0x518638(0x1cd)]=function(){const _0x77d93d=_0x518638;return this[_0x77d93d(0x38a)][_0x77d93d(0x203)];},Game_Event[_0x518638(0x25b)][_0x518638(0x4bc)]=function(_0x5c27ae,_0x3447c5,_0x17e870){const _0x2f913d=_0x518638;if(this[_0x2f913d(0x355)]())return this[_0x2f913d(0x21b)](_0x5c27ae,_0x3447c5,_0x17e870);if($gameMap[_0x2f913d(0x33a)](_0x5c27ae,_0x3447c5,_0x17e870,'event'))return!![];if($gameMap[_0x2f913d(0x171)](_0x5c27ae,_0x3447c5,_0x17e870,_0x2f913d(0x40c)))return![];return Game_Character[_0x2f913d(0x25b)][_0x2f913d(0x4bc)][_0x2f913d(0x495)](this,_0x5c27ae,_0x3447c5,_0x17e870);},Game_Event[_0x518638(0x25b)][_0x518638(0x355)]=function(){const _0x526df2=_0x518638;if(this[_0x526df2(0x236)]===undefined)this[_0x526df2(0x30c)]();return this['_moveOnlyRegions']['length']>0x0;},Game_Event[_0x518638(0x25b)][_0x518638(0x21b)]=function(_0x4bae40,_0x24c678,_0x106c03){const _0x5b4018=_0x518638,_0x1a630d=$gameMap[_0x5b4018(0x168)](_0x4bae40,_0x106c03),_0x2d1d4e=$gameMap[_0x5b4018(0x4a4)](_0x24c678,_0x106c03),_0x1fccce=$gameMap['regionId'](_0x1a630d,_0x2d1d4e);return this[_0x5b4018(0x236)][_0x5b4018(0x394)](_0x1fccce);},VisuMZ[_0x518638(0x489)]['Game_Event_findProperPageIndex']=Game_Event[_0x518638(0x25b)][_0x518638(0x28e)],Game_Event['prototype'][_0x518638(0x28e)]=function(){const _0x4c8745=_0x518638;return this[_0x4c8745(0x1cc)]=![],this['_CPCs']=![],this[_0x4c8745(0x40c)]()?VisuMZ[_0x4c8745(0x489)][_0x4c8745(0x3f0)][_0x4c8745(0x495)](this):-0x1;},VisuMZ[_0x518638(0x489)][_0x518638(0x1d2)]=Game_Event[_0x518638(0x25b)][_0x518638(0x3b5)],Game_Event[_0x518638(0x25b)][_0x518638(0x3b5)]=function(_0x2a04b0){const _0x209aa0=_0x518638;this[_0x209aa0(0x3a3)](_0x2a04b0),$gameTemp[_0x209aa0(0x503)](this);const _0x1818ce=VisuMZ['EventsMoveCore'][_0x209aa0(0x1d2)][_0x209aa0(0x495)](this,_0x2a04b0);return $gameTemp[_0x209aa0(0x1e8)](),_0x1818ce;},Game_Event[_0x518638(0x25b)][_0x518638(0x3c8)]=function(){const _0x49c8e4=_0x518638;return this[_0x49c8e4(0x1cc)];},Game_Event[_0x518638(0x25b)][_0x518638(0x3a3)]=function(_0x4624cd){const _0x2a4510=_0x518638,_0x19a9bd=_0x4624cd[_0x2a4510(0x247)];if(_0x19a9bd[_0x2a4510(0x39e)]&&DataManager[_0x2a4510(0x2a4)](_0x19a9bd['switch1Id']))this[_0x2a4510(0x1cc)]=!![];else{if(_0x19a9bd[_0x2a4510(0x17e)]&&DataManager['isAdvancedSwitch'](_0x19a9bd[_0x2a4510(0x19b)]))this['_advancedSwitchVariable']=!![];else _0x19a9bd[_0x2a4510(0x458)]&&DataManager[_0x2a4510(0x34e)](_0x19a9bd[_0x2a4510(0x1cf)])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0x518638(0x25b)][_0x518638(0x44d)]=function(){const _0x2a864b=_0x518638;if(this[_0x2a864b(0x313)])return![];return this[_0x2a864b(0x1b8)];},Game_Event['prototype'][_0x518638(0x2f9)]=function(){const _0xfca4b=_0x518638;$gameTemp[_0xfca4b(0x34a)](),this[_0xfca4b(0x343)]();},Game_Event[_0x518638(0x25b)][_0x518638(0x1e7)]=function(_0x281afe,_0x4eb589){const _0x398070=_0x518638;return this[_0x398070(0x430)]?this[_0x398070(0x49d)](_0x281afe,_0x4eb589):Game_Character['prototype']['pos'][_0x398070(0x495)](this,_0x281afe,_0x4eb589);},Game_Event[_0x518638(0x25b)][_0x518638(0x49d)]=function(_0x2417f7,_0x53bf9a){const _0x5e2c30=_0x518638;var _0x428d44=this['x']-this[_0x5e2c30(0x430)][_0x5e2c30(0x35c)],_0x270428=this['x']+this[_0x5e2c30(0x430)][_0x5e2c30(0x291)],_0x30984f=this['y']-this['_addedHitbox']['up'],_0x45d1b5=this['y']+this[_0x5e2c30(0x430)]['down'];return _0x428d44<=_0x2417f7&&_0x2417f7<=_0x270428&&_0x30984f<=_0x53bf9a&&_0x53bf9a<=_0x45d1b5;},Game_Event[_0x518638(0x25b)][_0x518638(0x15d)]=function(_0xa3ed61,_0x4f7eac,_0x933ab4){const _0xf52467=_0x518638;for(let _0x3533df=-this['_addedHitbox'][_0xf52467(0x35c)];_0x3533df<=this[_0xf52467(0x430)][_0xf52467(0x291)];_0x3533df++){for(let _0x3de78a=-this[_0xf52467(0x430)]['up'];_0x3de78a<=this['_addedHitbox'][_0xf52467(0x417)];_0x3de78a++){if(!Game_Character[_0xf52467(0x25b)][_0xf52467(0x15d)][_0xf52467(0x495)](this,_0xa3ed61+_0x3533df,_0x4f7eac+_0x3de78a,_0x933ab4))return![];}}return!![];},Game_Event['prototype']['isCollidedWithEvents']=function(_0x4a39f5,_0xf9dce6){const _0x113a21=_0x518638;if(Imported[_0x113a21(0x468)]&&this[_0x113a21(0x3dd)]())return this[_0x113a21(0x2c3)](_0x4a39f5,_0xf9dce6);else{const _0x9da789=$gameMap['eventsXyNt'](_0x4a39f5,_0xf9dce6)[_0x113a21(0x39f)](_0x352852=>_0x352852!==this);return _0x9da789[_0x113a21(0x433)]>0x0;}},Game_Event['prototype'][_0x518638(0x2c3)]=function(_0xdc37ae,_0x519caa){const _0x5f4cbc=_0x518638;if(!this[_0x5f4cbc(0x29f)]())return![];else{const _0xdd5778=$gameMap[_0x5f4cbc(0x180)](_0xdc37ae,_0x519caa)[_0x5f4cbc(0x39f)](_0x10ffbc=>_0x10ffbc!==this&&_0x10ffbc[_0x5f4cbc(0x29f)]());return _0xdd5778[_0x5f4cbc(0x433)]>0x0;}},Game_Event[_0x518638(0x25b)][_0x518638(0x160)]=function(){const _0x4b3dae=_0x518638;return this[_0x4b3dae(0x3d3)][_0x4b3dae(0x18c)]||_0x4b3dae(0x43f);},Game_Event[_0x518638(0x25b)][_0x518638(0x3ec)]=function(){const _0x1ab89b=_0x518638;return this[_0x1ab89b(0x3d3)]['distance']||0x0;},Game_Event['prototype'][_0x518638(0x484)]=function(){const _0x4947d9=_0x518638;return this[_0x4947d9(0x3d3)]['regionList']||[];},Game_Event['prototype'][_0x518638(0x2c4)]=function(){const _0x4f516f=_0x518638;Game_Character[_0x4f516f(0x25b)]['increaseSteps'][_0x4f516f(0x495)](this);if([_0x4f516f(0x43f),_0x4f516f(0x4ea)][_0x4f516f(0x394)](this[_0x4f516f(0x160)]()))return;$gamePlayer['checkEventTriggerEventsMoveCore']([0x2]);},VisuMZ[_0x518638(0x489)][_0x518638(0x298)]=Game_Event[_0x518638(0x25b)][_0x518638(0x499)],Game_Event[_0x518638(0x25b)][_0x518638(0x499)]=function(){const _0x3e2c8a=_0x518638;if(this[_0x3e2c8a(0x259)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0x3e2c8a(0x25f)](![]))return;VisuMZ[_0x3e2c8a(0x489)][_0x3e2c8a(0x298)][_0x3e2c8a(0x495)](this);},VisuMZ[_0x518638(0x489)][_0x518638(0x42f)]=Game_Event['prototype'][_0x518638(0x207)],Game_Event[_0x518638(0x25b)][_0x518638(0x207)]=function(){const _0x3d40c1=_0x518638;if(!this[_0x3d40c1(0x23e)])return;if(!this[_0x3d40c1(0x4ee)](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ['EventsMoveCore'][_0x3d40c1(0x42f)][_0x3d40c1(0x495)](this);},Game_Event[_0x518638(0x25b)][_0x518638(0x4ee)]=function(_0x1347e7){const _0x20cc76=_0x518638;if(!_0x1347e7&&$gameMap[_0x20cc76(0x371)]())return![];if(!_0x1347e7&&$gameMap[_0x20cc76(0x3cf)]())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event['prototype'][_0x518638(0x25f)]=function(_0x1f2eb8){const _0x41cb5d=_0x518638;if(!_0x1f2eb8&&$gameMap[_0x41cb5d(0x371)]())return![];if(!_0x1f2eb8&&$gameMap[_0x41cb5d(0x3cf)]())return![];if(['none',_0x41cb5d(0x4ea)][_0x41cb5d(0x394)](this[_0x41cb5d(0x160)]()))return!![];return $gamePlayer[_0x41cb5d(0x26e)](this);},VisuMZ[_0x518638(0x3b6)]=function(_0x4be9ed){const _0x5e96a4=_0x518638;for(const _0x1d1f33 of $gameMap[_0x5e96a4(0x2c6)]()){if(!_0x1d1f33)continue;_0x1d1f33[_0x5e96a4(0x37d)]()===_0x4be9ed&&_0x1d1f33[_0x5e96a4(0x1a0)]();}},VisuMZ['GetMoveSynchTarget']=function(_0xc67fc8){const _0x18c5ae=_0x518638;if(_0xc67fc8===0x0)return $gamePlayer;return $gameMap[_0x18c5ae(0x40c)](_0xc67fc8);},Game_Event[_0x518638(0x25b)]['moveSynchTarget']=function(){const _0x51268d=_0x518638;return this[_0x51268d(0x257)][_0x51268d(0x1c1)];},Game_Event['prototype'][_0x518638(0x3dc)]=function(){const _0x2243ec=_0x518638;return this[_0x2243ec(0x257)][_0x2243ec(0x18c)];},Game_Event[_0x518638(0x25b)][_0x518638(0x2e7)]=function(){const _0x43286e=_0x518638;if(this['moveSynchTarget']()>=0x0){const _0x20966d=VisuMZ[_0x43286e(0x381)](this[_0x43286e(0x37d)]());if(_0x20966d)return _0x20966d['realMoveSpeed']();}return Game_Character[_0x43286e(0x25b)]['realMoveSpeed'][_0x43286e(0x495)](this);},Game_Event[_0x518638(0x25b)][_0x518638(0x1a0)]=function(){const _0x566f7a=_0x518638;this['_moveSynch'][_0x566f7a(0x1b5)]=this[_0x566f7a(0x257)]['timer']||0x0,this[_0x566f7a(0x257)][_0x566f7a(0x1b5)]--;if(this['_moveSynch'][_0x566f7a(0x1b5)]>0x0)return;this['_moveSynch'][_0x566f7a(0x1b5)]=this['_moveSynch'][_0x566f7a(0x529)],this['processMoveSynch']();},Game_Event[_0x518638(0x25b)][_0x518638(0x1dc)]=function(){const _0x5e2ff0=_0x518638;switch(this['moveSynchType']()){case _0x5e2ff0(0x324):this[_0x5e2ff0(0x1eb)]();break;case _0x5e2ff0(0x26d):this[_0x5e2ff0(0x28d)]();break;case _0x5e2ff0(0x2cc):this[_0x5e2ff0(0x176)]();break;case'custom':this['processMoveSynchCustom']();break;case'mimic':case _0x5e2ff0(0x31d):this[_0x5e2ff0(0x536)]();break;case _0x5e2ff0(0x332):case _0x5e2ff0(0x2da):this[_0x5e2ff0(0x295)]();break;case _0x5e2ff0(0x20f):case _0x5e2ff0(0x22b):case'mirror\x20horz':case _0x5e2ff0(0x488):this[_0x5e2ff0(0x27f)]();break;case _0x5e2ff0(0x50f):case _0x5e2ff0(0x1d1):case'mirror\x20vert':case _0x5e2ff0(0x3f5):this[_0x5e2ff0(0x325)]();break;default:this[_0x5e2ff0(0x1eb)]();break;}this[_0x5e2ff0(0x184)]();},Game_Event[_0x518638(0x25b)]['processMoveSynchRandom']=function(){const _0x2f02f5=_0x518638,_0x29d906=[0x2,0x4,0x6,0x8];$gameMap[_0x2f02f5(0x1b9)]()&&_0x29d906['push'](0x1,0x3,0x7,0x9);const _0x161f22=[];for(const _0x5dbe63 of _0x29d906){if(this[_0x2f02f5(0x15d)](this['x'],this['y'],_0x5dbe63))_0x161f22['push'](_0x5dbe63);}if(_0x161f22[_0x2f02f5(0x433)]>0x0){const _0x329f01=_0x161f22[Math[_0x2f02f5(0x262)](_0x161f22['length'])];this['executeMoveDir8'](_0x329f01);}},Game_Event[_0x518638(0x25b)][_0x518638(0x28d)]=function(){const _0x2b1f8b=_0x518638,_0x252fa6=VisuMZ[_0x2b1f8b(0x381)](this[_0x2b1f8b(0x37d)]());this[_0x2b1f8b(0x329)](_0x252fa6);},Game_Event[_0x518638(0x25b)][_0x518638(0x176)]=function(){const _0x375ea7=_0x518638,_0x33cf9b=VisuMZ['GetMoveSynchTarget'](this[_0x375ea7(0x37d)]());this[_0x375ea7(0x2ad)](_0x33cf9b);},Game_Event[_0x518638(0x25b)][_0x518638(0x509)]=function(){const _0x1403a7=_0x518638;this[_0x1403a7(0x540)]();},Game_Event[_0x518638(0x25b)]['processMoveSynchMimic']=function(){const _0x251e69=_0x518638,_0x424ce3=VisuMZ[_0x251e69(0x381)](this[_0x251e69(0x37d)]());this['executeMoveDir8'](_0x424ce3[_0x251e69(0x32e)]());},Game_Event['prototype']['processMoveSynchReverseMimic']=function(){const _0xd4db14=_0x518638,_0x20160c=VisuMZ[_0xd4db14(0x381)](this[_0xd4db14(0x37d)]()),_0xef0e53=this[_0xd4db14(0x3b1)](_0x20160c[_0xd4db14(0x32e)]());this[_0xd4db14(0x272)](this[_0xd4db14(0x3b1)](_0x20160c['direction']()));},Game_Event[_0x518638(0x25b)]['processMoveSynchMirrorHorz']=function(){const _0x24d6c1=_0x518638,_0xcfb44e=VisuMZ[_0x24d6c1(0x381)](this[_0x24d6c1(0x37d)]()),_0x1c4409=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0xcfb44e[_0x24d6c1(0x32e)]()];this['executeMoveDir8'](_0x1c4409);},Game_Event[_0x518638(0x25b)][_0x518638(0x325)]=function(){const _0x5ddb7b=_0x518638,_0x306673=VisuMZ[_0x5ddb7b(0x381)](this['moveSynchTarget']()),_0x2f4029=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x306673[_0x5ddb7b(0x32e)]()];this['executeMoveDir8'](_0x2f4029);},Game_Event[_0x518638(0x25b)][_0x518638(0x4d6)]=function(){const _0x298635=_0x518638,_0x16c68a=$gameSystem[_0x298635(0x234)](this);if(!_0x16c68a)return;this[_0x298635(0x26a)](_0x16c68a['x'],_0x16c68a['y']),this[_0x298635(0x3d7)](_0x16c68a[_0x298635(0x1c0)]),this[_0x298635(0x37c)]===_0x16c68a[_0x298635(0x351)]&&(this['_moveRouteIndex']=_0x16c68a[_0x298635(0x354)]);},Game_Event['prototype']['updateMove']=function(){const _0x4e250a=_0x518638;Game_Character[_0x4e250a(0x25b)][_0x4e250a(0x4e4)][_0x4e250a(0x495)](this),this['autosaveEventLocation']();},Game_Event[_0x518638(0x25b)][_0x518638(0x2d1)]=function(){const _0x477068=_0x518638;if($gameMap[_0x477068(0x252)]())return!![];return this[_0x477068(0x2eb)];},Game_Event[_0x518638(0x25b)][_0x518638(0x502)]=function(){const _0x5c78dd=_0x518638;if(!this[_0x5c78dd(0x2d1)]())return;this[_0x5c78dd(0x30f)]();},Game_Event[_0x518638(0x25b)][_0x518638(0x30f)]=function(){const _0x310235=_0x518638;$gameSystem[_0x310235(0x30f)](this);},Game_Event[_0x518638(0x25b)][_0x518638(0x2cb)]=function(){const _0x3dd2fb=_0x518638;$gameSystem[_0x3dd2fb(0x33c)](this);},Game_Event[_0x518638(0x25b)][_0x518638(0x46d)]=function(){const _0x55b7e7=_0x518638;return $gameSystem['getEventIconData'](this)?Game_Character[_0x55b7e7(0x25b)][_0x55b7e7(0x46d)][_0x55b7e7(0x495)](this):{'iconIndex':0x0,'bufferX':settings[_0x55b7e7(0x4b8)][_0x55b7e7(0x3b7)],'bufferY':settings[_0x55b7e7(0x4b8)]['BufferY'],'blendMode':settings['Icon'][_0x55b7e7(0x442)]};},Game_Event[_0x518638(0x25b)][_0x518638(0x46e)]=function(){const _0x3dee42=_0x518638;return this[_0x3dee42(0x1fd)];},VisuMZ[_0x518638(0x489)]['Game_Event_meetsConditionsCPC']=Game_Event['prototype'][_0x518638(0x3b5)],Game_Event[_0x518638(0x25b)]['meetsConditions']=function(_0x548204){const _0x3aa026=_0x518638,_0x29940d=VisuMZ[_0x3aa026(0x489)][_0x3aa026(0x51a)][_0x3aa026(0x495)](this,_0x548204);if(!_0x29940d)return![];return this[_0x3aa026(0x1f3)](_0x548204);},Game_Event[_0x518638(0x25b)]['meetsCPC']=function(_0x2def96){const _0xf12142=_0x518638;VisuMZ['EventsMoveCore'][_0xf12142(0x198)][_0xf12142(0x304)](_0x2def96),this[_0xf12142(0x1fd)]=_0x2def96[_0xf12142(0x183)][_0xf12142(0x433)]>0x0;_0x2def96[_0xf12142(0x183)]===undefined&&VisuMZ[_0xf12142(0x489)]['CustomPageConditions'][_0xf12142(0x304)](_0x2def96);if(_0x2def96['CPC'][_0xf12142(0x433)]>0x0)return $gameMap['event'](this[_0xf12142(0x45d)])&&VisuMZ[_0xf12142(0x489)]['CustomPageConditions'][_0xf12142(0x170)](_0x2def96[_0xf12142(0x183)],this[_0xf12142(0x45d)]);return!![];},VisuMZ[_0x518638(0x489)][_0x518638(0x274)]=Game_Troop['prototype'][_0x518638(0x3b5)],Game_Troop['prototype'][_0x518638(0x3b5)]=function(_0x15e58b){const _0x56641b=_0x518638;var _0x456bda=VisuMZ[_0x56641b(0x489)]['Game_Troop_meetsConditionsCPC'][_0x56641b(0x495)](this,_0x15e58b);return _0x456bda&&this[_0x56641b(0x270)](_0x15e58b);},Game_Troop[_0x518638(0x25b)][_0x518638(0x270)]=function(_0x58242f){const _0x2b1dbe=_0x518638;_0x58242f[_0x2b1dbe(0x183)]===undefined&&VisuMZ[_0x2b1dbe(0x489)][_0x2b1dbe(0x198)]['loadCPC'](_0x58242f);if(_0x58242f['CPC'][_0x2b1dbe(0x433)]>0x0)return VisuMZ[_0x2b1dbe(0x489)]['CustomPageConditions'][_0x2b1dbe(0x170)](_0x58242f[_0x2b1dbe(0x183)],0x0);return!![];},VisuMZ[_0x518638(0x489)][_0x518638(0x52f)]=Game_Event[_0x518638(0x25b)][_0x518638(0x26a)],Game_Event[_0x518638(0x25b)]['locate']=function(_0x3acf28,_0x40d8ae){const _0x564d4e=_0x518638;VisuMZ[_0x564d4e(0x489)][_0x564d4e(0x52f)][_0x564d4e(0x495)](this,_0x3acf28,_0x40d8ae),this[_0x564d4e(0x1ae)]=_0x3acf28,this[_0x564d4e(0x221)]=_0x40d8ae;},VisuMZ[_0x518638(0x489)][_0x518638(0x43e)]=Game_Event[_0x518638(0x25b)]['moveTypeRandom'],Game_Event['prototype']['moveTypeRandom']=function(){const _0x40dff2=_0x518638,_0xf7d59d=$gameMap[_0x40dff2(0x2a7)](this['x'],this['y'],this[_0x40dff2(0x1ae)],this['_randomHomeY']),_0x366127=_0xf7d59d*(this[_0x40dff2(0x3ba)]||0x0);Math[_0x40dff2(0x324)]()>=_0x366127?VisuMZ[_0x40dff2(0x489)]['Game_Event_moveTypeRandom'][_0x40dff2(0x495)](this):this[_0x40dff2(0x506)]();},Game_Event[_0x518638(0x25b)][_0x518638(0x506)]=function(){const _0x513c90=_0x518638,_0x5c88d6=this['deltaXFrom'](this[_0x513c90(0x1ae)]),_0x5e1a1e=this[_0x513c90(0x397)](this[_0x513c90(0x221)]);if(Math['abs'](_0x5c88d6)>Math[_0x513c90(0x350)](_0x5e1a1e))this[_0x513c90(0x1d5)](_0x5c88d6>0x0?0x4:0x6),!this[_0x513c90(0x1be)]()&&_0x5e1a1e!==0x0&&this[_0x513c90(0x1d5)](_0x5e1a1e>0x0?0x8:0x2);else _0x5e1a1e!==0x0&&(this[_0x513c90(0x1d5)](_0x5e1a1e>0x0?0x8:0x2),!this[_0x513c90(0x1be)]()&&_0x5c88d6!==0x0&&this[_0x513c90(0x1d5)](_0x5c88d6>0x0?0x4:0x6));},VisuMZ[_0x518638(0x489)][_0x518638(0x3b0)]=Game_Interpreter[_0x518638(0x25b)][_0x518638(0x1a9)],Game_Interpreter[_0x518638(0x25b)][_0x518638(0x1a9)]=function(){const _0x3136f2=_0x518638;if(this[_0x3136f2(0x472)]===_0x3136f2(0x4cd)){if(window[this[_0x3136f2(0x1c8)]])this['_waitMode']='',this['startCallEvent']();else return!![];}else return VisuMZ[_0x3136f2(0x489)]['Game_Interpreter_updateWaitMode'][_0x3136f2(0x495)](this);},VisuMZ[_0x518638(0x489)][_0x518638(0x373)]=Game_Interpreter[_0x518638(0x25b)][_0x518638(0x37e)],Game_Interpreter[_0x518638(0x25b)][_0x518638(0x37e)]=function(){const _0x2bcd61=_0x518638,_0x141326=$gameMap&&this['_eventId']?$gameMap['event'](this[_0x2bcd61(0x45d)]):null;$gameTemp[_0x2bcd61(0x503)](_0x141326);const _0x1b3c2c=VisuMZ['EventsMoveCore'][_0x2bcd61(0x373)][_0x2bcd61(0x495)](this);return $gameTemp[_0x2bcd61(0x1e8)](),_0x1b3c2c;},VisuMZ[_0x518638(0x489)][_0x518638(0x29c)]=Game_Interpreter['prototype'][_0x518638(0x261)],Game_Interpreter[_0x518638(0x25b)]['command357']=function(_0x58341f){const _0x449316=_0x518638;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x449316(0x489)][_0x449316(0x29c)][_0x449316(0x495)](this,_0x58341f);},Game_Interpreter['prototype'][_0x518638(0x4f9)]=function(_0x2299fb){const _0x1fe53e=_0x518638;this[_0x1fe53e(0x338)]=_0x2299fb;const _0x3c98fb=_0x1fe53e(0x209)[_0x1fe53e(0x290)](_0x2299fb[_0x1fe53e(0x1ec)][_0x1fe53e(0x1e6)](0x3));this['_callEventMap']=_0x1fe53e(0x3a6)+Graphics[_0x1fe53e(0x269)]+'_'+this[_0x1fe53e(0x18e)](),DataManager[_0x1fe53e(0x4d5)](this[_0x1fe53e(0x1c8)],_0x3c98fb),window[this[_0x1fe53e(0x1c8)]]?this[_0x1fe53e(0x3e2)]():this[_0x1fe53e(0x41a)]('CallEvent');},Game_Interpreter[_0x518638(0x25b)]['startCallEvent']=function(){const _0xf33be2=_0x518638,_0x5026ec=this[_0xf33be2(0x338)],_0x2db4f4=window[this['_callEventMap']],_0x533553=_0x2db4f4[_0xf33be2(0x2c6)][_0x5026ec[_0xf33be2(0x18e)]];if(_0x533553&&_0x533553[_0xf33be2(0x1b2)][_0x5026ec[_0xf33be2(0x3de)]-0x1]){const _0x466f92=_0x533553[_0xf33be2(0x1b2)][_0x5026ec[_0xf33be2(0x3de)]-0x1]['list'];this[_0xf33be2(0x4a6)](_0x466f92,this[_0xf33be2(0x18e)]());}window[this[_0xf33be2(0x1c8)]]=undefined,this[_0xf33be2(0x1c8)]=undefined,this['_callEventData']=undefined;};function Game_CPCInterpreter(){const _0x215bd4=_0x518638;this[_0x215bd4(0x41b)]['apply'](this,arguments);}function _0x42a2(){const _0x2ba02d=['player','activationProximityDistance','_tilemap','useCarryPoseForIcons','isShadowShrink','Game_Event_findProperPageIndex','LIGHTBULB','IconBlendMode','character','Game_Message_setNumberInput','vert\x20mirror','...','Game_Map_setup','Game_Player_checkEventTriggerHere','Boat','note','_visibleEventY','Game_Map_update','MUSICNOTE','isInVehicle','Game_Vehicle_isMapPassable','Value','SwitchGetSelfSwitchABCD','getDirectionFromPoint','_eventCache','moveByInput','COBWEB','Step1EventId','isActive','TOGGLE','Game_Message_add','checkValidEventerMap','zoomScale','event','VS8','startMapCommonEventOnTouch','MoveRouteIndex','mapValue','LOWER\x20RIGHT','bitmap','createLabelWindows','EventTemplates','Window_ScrollText_startMessage','OpacitySpeed','down','Game_CharacterBase_characterIndex','jump','setWaitMode','initialize','MUSIC\x20NOTE','deleteSavedEventLocationKey','Game_CharacterBase_pattern','Step2MapId','VariableGetSelfVariableID','defaultFontSize','processDrawIcon','Sprite_Character_update','processOk','_patternLocked','_lastMovedDirection','min','isMapSwitch','TargetVariableId','regionList','Preserve','USER-DEFINED\x204','11KAkZYD','isEventClickTriggered','Game_Event_updateParallel','_addedHitbox','8382bwYLqq','dashSpeedModifier','length','EventTimerSpeed','_SavedEventLocations','SlowerSpeed','initMembersEventsMoveCore','FollowerID','ARRAYSTRUCT','isAirshipPassable','forceCarrying','_eventOverload','EventLocationSave','Game_Event_moveTypeRandom','none','registerCommand','isJumping','BlendMode','Game_Variables_value','_selfTarget','Hours','Stop','setOpacity','isEventTest','_expireCommonEvent','onExpire','MapID','boat','hasClickTrigger','KNEEL','DefaultShadow','_target','Self\x20Variable\x20%1','isBusy','Window_Message_startMessage','moveForward','isStopFollowerChasing','convertSelfVariableValuesInScriptCall','checkCollisionKeywords','variableValid','slice','Game_Map_parallelCommonEvents','processMoveRouteJumpToCharacter','_eventIcon','_eventId','turnLeft90','Game_Event_updateSelfMovement','moveDiagonally','Game_Player_getInputDirection','clear','LOWER\x20LEFT','COLLAPSE','_spawnedEvents','blendMode','erase','VisuMZ_0_CoreEngine','PosY','_event','AutoMoveEvents','Scene_Boot_onDatabaseLoaded','getEventIconData','hasCPCs','_shadowGraphic','BitmapSmoothing','pause','_waitMode','AutoBuffer','createShadows','outlineColor','isPosing','DashEnableToggle','PageId','_eventLabelOffsetY','checkEventTriggerHere','determineCommonEventsWithCPC','isNearTheScreen','Game_SelfSwitches_setValue','status','%1Allow','RIGHT','processMoveRouteFadeIn','STRUCT','_frames','activationRegionList','ARRAYSTR','opacity','Collision','horz\x20mirror','EventsMoveCore','Game_Event_initialize','standing','adjustDir8MovementSpeed','Game_Event_clearPageSettings','clearPose','refreshIfNeeded','Sprite_Character_characterPatternY','_opacity','Game_Interpreter_character','setupSpawn','getLastPluginCommandInterpreter','call','follower','isDiagonalDirection','updatePosition','checkEventTriggerAuto','visible','floor','processMoveRouteStepTo','posEventsMoveCore','Game_Vehicle_initMoveSpeed','vehicle','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ITEM','indexOf','updateSelfMovement','roundYWithDirection','_eventLabelOffsetX','setupChild','isAirship','determineEventOverload','TurnInPlaceDelay','isDashingAndMoving','_spawnPreserved','Disable','PostSpawnJS','clearEventCache','VisuMZ_2_DragonbonesUnion','SelfSwitches','Game_Switches_setValue','_regionRules','Game_Map_refresh','Game_CharacterBase_update','fontFace','Step2Preserve','SPIN\x20CW','Icon','_eventIconSprite','MorphEventRemove','forceMoveRoute','isMapPassable','canStartLocalEvents','Map\x20%1\x20Switch\x20%2','_saveEventLocations','MapId','prepareSpawnedEventAtTerrainTag','blt','HMPH','startMessage','Game_Event_event','createSpawnedEventWithData','SPIN\x20ACW','SILENCE','splice','Game_Character_setMoveRoute','log','setEventIconDataKey','CallEvent','PostCopyJS','USER-DEFINED\x202','Game_Switches_value','charAt','EventTimerResume','EventIconDelete','iconHeight','loadDataFile','restoreSavedEventPosition','OperateValues','Game_CharacterBase_moveDiagonally','_working','_spriteset','despawnEverything','posNt','6072pQpRCw','_duration','offsetY','isTile','IconBufferY','setupEventsMoveCoreEffects','_poseDuration','updateMove','Sprite_Balloon_setup','switches','createIconSprite','despawnAtXY','PlayerMovementChange','region','opacitySpeed','_eventOverloadThreshold','processMoveRouteHugWall','checkRegionEventTrigger','getPose','PlayerAllow','addChild','_followerChaseOff','isDestinationValid','updateShadowChanges','Game_Message_setItemChoice','MapSwitches','DiagonalSpeedMultiplier','toUpperCase','pluginCommandCallEvent','Game_CharacterBase_direction','_PreservedEventMorphData','updateVS8BalloonOffsets','processMoveRouteSelfVariable','firstSpawnedEventID','_encounterEffectDuration','default','Letter','autosaveEventLocation','registerSelfTarget','TargetSwitchId','WalkAllow','moveBackToRandomHome','smooth','Game_Map_event','processMoveSynchCustom','STR','isTriggerIn','createBitmap','List','isPlayerControlDisabled','mirror\x20vertical','MUSIC-NOTE','processMoveRouteSelfSwitch','_cacheVisibility','EXCLAMATION','Game_Player_executeMove','_selfTargetItemChoice','unlockEvent','Button','directionOnLadderSpriteVS8dir','_pose','Game_Event_meetsConditionsCPC','name','initEventsMoveCoreSettings','EnableTurnInPlace','updatePattern','AutoBalloon','Game_Map_setupEvents','advancedFunc','column','BoatSpeed','createShadow','VehicleAllow','resizeWindow','Scene_Load_onLoadSuccess','Game_CharacterBase_screenY','delay','_spawnData','Spriteset_Map_createShadow','setupMorphEvent','moveTowardPoint','LineHeight','Game_Event_locate','deleteIconsOnEventsData','Enable','processMoveRouteTeleportTo','inBattle','updatePose','_EventIcons','processMoveSynchMimic','setBalloonPose','isPassableByAnyDirection','startMapCommonEventOnOK','Spriteset_Map_createLowerLayer','initFollowerController','value','PreMorphJS','firstSpawnedEvent','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateRoutineMove','checkExistingEntitiesAt','command108','deletePreservedMorphEventDataKey','TerrainTag','canPass','reverse','MapVariables','activationProximityType','iconSize','RegionOkTarget','getMapSpawnedEventData','Game_Player_isDashing','PosX','iconIndex','makeDeepCopy','roundXWithDirection','turnRight90','description','hasEventIcon','RegionOk','10WOXwLi','eventLabelsVisible','Game_Timer_onExpire','metCPC','isRegionForbidPass','ARRAYFUNC','backX','offsetX','Game_Event_setupPageSettings','processMoveSynchAway','1826eSZrdy','return\x200','Game_Character_forceMoveRoute','setImage','fittingHeight','WalkForbid','getDirectionToPoint','switch2Valid','_counter','eventsXyNt','requestBalloon','roundY','CPC','update','onChange','_seconds','Game_System_initialize','Game_Temp_setDestination','Setting','createLabelWindowForTarget','airship','type','getPosingCharacterDirection','eventId','prepareSpawnedEventAtXY','_pattern','AllForbid','VisibleRange','SpawnEventDespawnRegions','unlock','_MapSpawnedEventData','Game_Follower_initialize','_dragonbones','CustomPageConditions','Game_Timer_initialize','StopAutoMoveMessages','switch2Id','innerWidth','Game_Follower_chaseCharacter','_needsPeriodicRefresh','_forceDashing','updateMoveSynch','OffsetY','correctFacingDirection','setTileBitmap','_forceCarrying','BalloonOffsetY','SwitchId','windowPadding','Window_NumberInput_start','updateWaitMode','removeMorph','Game_CharacterBase_initMembers','getEventIconIndex','clearDashing','_randomHomeX','clearPageSettings','LOVE','canPassDiagonally','pages','addLoadListener','_chaseOff','timer','getControlledFollowerID','_EventsMoveCoreSettings','_clickTrigger','isSupportDiagonalMovement','Game_CommonEvent_isActive','TiltLeft','_alwaysUpdateMove','turnTowardCharacter','isMovementSucceeded','bufferX','direction','target','drawing','roundX','UNTITLED','Passability','_screenZoomScale','contents','_callEventMap','code','_labelWindows','setupCopyEvent','_advancedSwitchVariable','labelWindowRange','EventIconChange','variableId','QUESTION','vertical\x20mirror','Game_Event_meetsConditions','checkEventTriggerEventsMoveCore','ARRAYNUM','moveStraight','requestAnimation','spriteId','ShipSpeed','isAllowEventAutoMovement','text','All','processMoveSynch','needsUpdate','Game_Variables_setValue','579bmeewy','clearCarrying','AdvancedVariables','_transparent','_diagonalSupport','meetActivationRegionConditions','shadowFilename','padZero','pos','clearSelfTarget','turnAwayFromPoint','exit','processMoveSynchRandom','mapId','execute','Map\x20%1\x20Variable\x20%2','_stepPattern','isBigCharacter','Frames','return\x20%1','meetsCPC','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','Game_Player_checkEventTriggerThere','Movement','iconWidth','gainFrames','_DisablePlayerControl','convertVariableValuesInScriptCall','getPlayerDiagonalSetting','findTargetSprite','_CPCs','_data','setControlledFollowerID','characterIndexVS8','turnAwayFromCharacter','setupSpawnedEvents','visibleRange','StopAutoMoveEvents','AirshipSpeed','_commonEventId','updateParallel','removeTemporaryMapSpawnedEvents','Map%1.json','setSelfValue','PlayerMovementDiagonal','startEncounterEffect','_periodicRefreshTimer','_spriteOffsetY','mirror\x20horizontal','DashModifier','_moveRouteIndex','hasStepAnime','isWorking','tileHeight','characterPatternYVS8','of\x20Preloaded\x20Maps.\x0a\x0a','createCharacterShadow','createSpawnedEvent','Sprite_Character_setCharacterBitmap','_hidden','isMoveOnlyRegionPassable','isPressed','Step2EventId','template','SelfVariableID','moveAwayFromPoint','_randomHomeY','IconSize','Settings','EventAllow','switchId','registerSelfEvent','isDashing','_mapId','AdvancedSwitches','backY','horizontal\x20mirror','General','characterPatternY','Game_SelfSwitches_value','setEventLabelsVisible','_visibleEventX','lineHeight','regionId','ARRAYEVAL','getSavedEventLocation','Game_Map_isDashDisabled','_moveOnlyRegions','IconSet','VICTORY','SwitchGetSelfSwitchID','ShowShadows','stop','_needsRefresh','Game_Player_increaseSteps','_interpreter','isLandOk','LEFT','EventLocationDelete','map','initEventsMoveCore','onOk','isEventOverloaded','version','conditions','shadowX','_selfEvent','TRUE','isSpawnHitboxCollisionOk','SelfVariables','setupSaveEventLocations','UPPER\x20LEFT','processMoveCommand','resume','Game_Timer_stop','isSaveEventLocations','_eventPageIndex','PlayerForbid','despawnRegions','screenX','_moveSynch','hideShadows','_trigger','%1%2','prototype','forceDashing','selfValue','string','checkActivationProximity','isOnLadder','command357','randomInt','VisuMZ_Setup_Preload_Map','FUNC','toLowerCase','RandomMoveWeight','Game_CharacterBase_realMoveSpeed','add','frameCount','locate','_eventScreenX','characterName','approach','meetActivationProximityConditions','Hidden','CPCsMet','TemplateName','executeMoveDir8','setChaseOff','Game_Troop_meetsConditionsCPC','ship','Chase','setStopFollowerChasing','isTargetEventValidForLabelWindow','initMembers','processMoveRouteSetIndex','updateTilt','PlayerIconDelete','initMoveSpeed','processMoveRoutePatternLock','processMoveSynchMirrorHorz','morphInto','LIGHT-BULB','parameters','clearStepPattern','push','setValue','isSpriteVS8dir','despawnEventId','Game_Timer_start','_filename','variables','processMoveRouteMoveRepeat','isCollidedWithPlayerCharacters','processMoveSynchApproach','findProperPageIndex','setupSpawnTest','format','right','Dock','processMoveRouteFadeOut','StrictCollision','processMoveSynchReverseMimic','changeSpeed','match','Game_Event_checkEventTriggerAuto','_moveRoute','CarryPose','deltaY','Game_Interpreter_PluginCommand','advancedValue','_moveAllowPlayerCollision','isNormalPriority','anchor','setCharacterBitmap','processMoveRouteAnimation','LIGHT','isAdvancedSwitch','_paused','resetFontSettings','distance','Direction','isSelfSwitch','SLEEP','isShadowVisible','_eventCopyData','moveAwayFromCharacter','5iPVbyH','Game_CharacterBase_updatePattern','TiltVert','630484JSaDnK','setupDiagonalSupport','drawIcon','VehicleForbid','updatePeriodicRefresh','EventTimerFramesSet','concat','getInputDir8','_visiblePlayerY','ConvertParams','_eventScreenY','ADDITIVE','EventLocationCreate','Game_Vehicle_isLandOk','_eventSpawnData','Label','contentsOpacity','SpawnEventAtTerrainTag','checkSmartEventCollision','increaseSteps','loadSystem','events','SWEAT','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','_characterName','Game_CharacterBase_isDashing','deleteEventLocation','away','refresh','setCommonEvent','AllAllow','setAllowEventAutoMovement','isSaveEventLocation','RegionTouch','updateOpacity','row','OFF','setMapValue','setNumberInput','isMoving','screenY','reverse\x20copy','isDashDisabled','parallelCommonEvents','USER-DEFINED\x205','_moveSpeed','meetsSwitchCondition','_cacheSystemVisible','setupEvents','bufferY','updatePatternEventsMoveCore','ZZZ','setupRegionRestrictions','ANGER','realMoveSpeed','processMoveRouteMoveUntilStop','isLabelVisible','FollowerSetTargetChase','_saveEventLocation','setEventIconData','PreSpawnJS','1153560AYKVHi','height','getSelfTarget','isAutoBufferIcon','setPattern','Airship','isPassable','getInputDirection','PreCopyJS','Player','processMoveRouteMoveTo','onClickTrigger','canMove','timerText','_commonEvents','deleteIconsOnEventsDataKey','checkEventsMoveCoreStringTags','startMapCommonEventOnOKTarget','setFrames','createLowerLayer','round','_speed','loadCPC','setDestination','HURT','%1Dock','isPlaytest','_scene','Window_EventItem_onOk','EventAutoMovement','initEventsMoveCoreEffects','Step1MapId','ARRAYJSON','saveEventLocation','onCancel','_cpc','scale','_erased','JSON','_type','SpawnEventAtRegion','Game_CharacterBase_setDirection','_PlayerDiagonalSetting','setFrame','isBoat','_text','executeMove','copy','Game_Player_isMapPassable','_stopCount','Name','isMapVariable','chaseCharacter','_selfTargetNumberInput','random','processMoveSynchMirrorVert','morphIntoTemplate','reserveCommonEvent','findDiagonalDirectionTo','moveTowardCharacter','processMoveRouteTeleportToCharacter','referEvent','parent','getPreservedMorphEventData','lastMovedDirection','isRunning','create','SpawnEventDespawnTerrainTags','reverse\x20mimic','LIGHT\x20BULB','SelfSwitchID','some','FRUSTRATION','HEART','_callEventData','Window_NumberInput_processOk','isRegionAllowPass','clamp','deleteSavedEventLocation','Game_Character_processMoveCommand','EventLabelVisible','despawnTerrainTags','boxWidth','process_VisuMZ_EventsMoveCore_Switches_Variables','setDashingEnabled','start','Region%1','shadowY','setDiagonalDirection','Game_Troop_meetsConditions','NOTE','getPosingCharacterIndex','clearDestination','Sprite_Character_setTileBitmap','USER-DEFINED\x201','processMoveRouteStepToCharacter','isAdvancedVariable','lastSpawnedEventID','abs','pageIndex','Game_Map_unlockEvent','pattern','moveRouteIndex','hasMoveOnlyRegions','eventsXy','absDistance','labelWindowText','setPose','PreloadedMaps','_visiblePlayerX','left','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','rotation','TerrainTags','355257nOxTqn','Game_Event_isCollidedWithPlayerCharacters','Toggle','_followerControlID','constructor','Operation','FollowerSetControl','_characterIndex','SuccessSwitchId','isBattleTest','savePreservedMorphEventDataKey','Ship','Vehicle','SPIN\x20CLOCKWISE','Game_CharacterBase_hasStepAnime','USER-DEFINED\x203','isValid','isEventRunning','Map%1-Event%2','Game_Interpreter_executeCommand','_eventMorphData','max','deltaXFrom','updateBitmapSmoothing','Game_Map_events','getPosingCharacterPattern','RIGHT\x20TO\x20LEFT','terrainTag','_pageIndex','moveSynchTarget','executeCommand','DashingEnable','Game_Event_start','GetMoveSynchTarget','setMoveSpeed','setItemChoice','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','processMoveRouteMoveToCharacter','isPreventSelfMovement','prepareSpawnedEventAtRegion','removeChild','processMoveRouteJumpTo','_labelWindow','processMoveRouteStepFrom','PostMorphJS','onDatabaseLoaded','772371PtEBKb','fontSize','deltaX','SCREEN','processMoveRouteJumpForward','setupPageSettings','includes','8mhEiSW','Game_Enemy_meetsSwitchCondition','deltaYFrom','list','processMoveCommandEventsMoveCore','_lastPluginCommandInterpreter','width','isAllowCharacterTilt','_activationProximityAutoTriggerBypass','switch1Valid','filter','Allow','trim','_shadowSprite','checkAdvancedSwitchVariablePresent','Region','_characterSprites','$callEventMap','_eventErased','Minutes','followers','_shadowOpacity','EventId','isSelfVariable','_spriteOffsetX','setup','IconIndex','Game_Interpreter_updateWaitMode','reverseDir','hasDragonbones','processMoveRouteBalloon','isTurnInPlace','meetsConditions','MoveAllSynchTargets','BufferX','square','scrolledY','_randomMoveWeight','turn180','onLoadSuccess','%1:%2','Visibility','SPIN\x20CCW','Rope','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','isRegionDockable','clearSpriteOffsets','ROUTE_SCRIPT','Self\x20Switch\x20%1','setBackgroundType','parse','hasAdvancedSwitchVariable','Game_CharacterBase_canPass','Scene_Map_startEncounterEffect','isDashingEnabled','FollowerSetGlobalChase','findDirectionTo','_character','isAnyEventStarting','updateShadow','_inputTime','EnableDashTilt','_activationProximity','EventLabelRefresh','Game_CharacterBase_moveStraight','checkEventTriggerThere','setDirection','_vehicleType','setPlayerDiagonalSetting','VisibleEventLabels','EventTimerExpireClear','moveSynchType','isSmartEventCollisionOn','pageId','FavorHorz','bind','setupEventsMoveCoreCommentTags','startCallEvent','turnTowardPoint','Window_EventItem_onCancel','Walk','Template','createSaveEventLocationData','replace','EventID','Sprite_Balloon_updatePosition'];_0x42a2=function(){return _0x2ba02d;};return _0x42a2();};Game_CPCInterpreter[_0x518638(0x25b)]=Object[_0x518638(0x330)](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x518638(0x25b)][_0x518638(0x364)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x518638(0x25b)][_0x518638(0x462)]=function(){const _0x117615=_0x518638;Game_Interpreter[_0x117615(0x25b)][_0x117615(0x462)]['call'](this),this[_0x117615(0x311)]=![];},Game_CPCInterpreter['prototype'][_0x518638(0x1ed)]=function(){const _0x2ce09f=_0x518638;while(this[_0x2ce09f(0x32f)]()){this[_0x2ce09f(0x37e)]();}},Game_CPCInterpreter[_0x518638(0x25b)]['command108']=function(_0x4bbf2b){const _0x2b6668=_0x518638;return Game_Interpreter[_0x2b6668(0x25b)][_0x2b6668(0x542)][_0x2b6668(0x495)](this,_0x4bbf2b),this['_comments'][_0x2b6668(0x335)](_0x2d4f88=>_0x2d4f88[_0x2b6668(0x297)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x2b6668(0x311)]=!![]),!![];},VisuMZ['EventsMoveCore'][_0x518638(0x3ca)]=Scene_Map[_0x518638(0x25b)]['startEncounterEffect'],Scene_Map['prototype'][_0x518638(0x20c)]=function(){const _0x488bdf=_0x518638;VisuMZ[_0x488bdf(0x489)][_0x488bdf(0x3ca)]['call'](this),this[_0x488bdf(0x4da)][_0x488bdf(0x258)]();},VisuMZ[_0x518638(0x489)]['Scene_Load_onLoadSuccess']=Scene_Load[_0x518638(0x25b)][_0x518638(0x3bc)],Scene_Load['prototype'][_0x518638(0x3bc)]=function(){const _0x1b01c8=_0x518638;if($gameMap)$gameMap[_0x1b01c8(0x4ae)]();VisuMZ[_0x1b01c8(0x489)][_0x1b01c8(0x527)][_0x1b01c8(0x495)](this);},VisuMZ['EventsMoveCore']['Sprite_Character_initMembers']=Sprite_Character[_0x518638(0x25b)][_0x518638(0x279)],Sprite_Character[_0x518638(0x25b)]['initMembers']=function(){const _0x5082a7=_0x518638;VisuMZ['EventsMoveCore']['Sprite_Character_initMembers'][_0x5082a7(0x495)](this),this[_0x5082a7(0x437)](),this[_0x5082a7(0x4e7)]();},Sprite_Character[_0x518638(0x25b)][_0x518638(0x437)]=function(){const _0x4fe13b=_0x518638;this[_0x4fe13b(0x3aa)]=0xff;},Sprite_Character[_0x518638(0x25b)][_0x518638(0x4e7)]=function(){const _0x3b541d=_0x518638;this[_0x3b541d(0x4b9)]=new Sprite(),this['_eventIconSprite'][_0x3b541d(0x412)]=ImageManager[_0x3b541d(0x2c5)](_0x3b541d(0x237)),this[_0x3b541d(0x4b9)][_0x3b541d(0x412)][_0x3b541d(0x507)]=![],this['_eventIconSprite'][_0x3b541d(0x319)](0x0,0x0,0x0,0x0),this[_0x3b541d(0x4b9)][_0x3b541d(0x2a0)]['x']=0.5,this['_eventIconSprite'][_0x3b541d(0x2a0)]['y']=0x1,this[_0x3b541d(0x4f1)](this[_0x3b541d(0x4b9)]);},Sprite_Character['prototype']['isSpriteVS8dir']=function(){const _0x5b5623=_0x518638;return this[_0x5b5623(0x2c9)]&&this[_0x5b5623(0x2c9)][_0x5b5623(0x297)](/\[VS8\]/i);},Sprite_Character[_0x518638(0x25b)][_0x518638(0x2f1)]=function(){const _0x208474=_0x518638;return this[_0x208474(0x286)]()&&VisuMZ['EventsMoveCore'][_0x208474(0x223)][_0x208474(0x40d)][_0x208474(0x473)];},VisuMZ['EventsMoveCore'][_0x518638(0x423)]=Sprite_Character['prototype'][_0x518638(0x184)],Sprite_Character[_0x518638(0x25b)][_0x518638(0x184)]=function(){const _0x565137=_0x518638;VisuMZ[_0x565137(0x489)][_0x565137(0x423)]['call'](this),VisuMZ['EventsMoveCore'][_0x565137(0x223)][_0x565137(0x1f6)][_0x565137(0x3d2)]&&this[_0x565137(0x27b)](),this[_0x565137(0x3a2)]&&this[_0x565137(0x3d0)](),this[_0x565137(0x4b9)]&&this['updateEventIconSprite']();},VisuMZ['EventsMoveCore'][_0x518638(0x34b)]=Sprite_Character[_0x518638(0x25b)][_0x518638(0x1a3)],Sprite_Character[_0x518638(0x25b)][_0x518638(0x1a3)]=function(){const _0x1cd4d3=_0x518638;VisuMZ[_0x1cd4d3(0x489)]['Sprite_Character_setTileBitmap'][_0x1cd4d3(0x495)](this),this[_0x1cd4d3(0x412)][_0x1cd4d3(0x1b3)](this[_0x1cd4d3(0x377)][_0x1cd4d3(0x3e0)](this));},VisuMZ[_0x518638(0x489)][_0x518638(0x219)]=Sprite_Character[_0x518638(0x25b)][_0x518638(0x2a1)],Sprite_Character[_0x518638(0x25b)][_0x518638(0x2a1)]=function(){const _0x45ea9d=_0x518638;VisuMZ[_0x45ea9d(0x489)][_0x45ea9d(0x219)]['call'](this),this[_0x45ea9d(0x412)][_0x45ea9d(0x1b3)](this['updateBitmapSmoothing'][_0x45ea9d(0x3e0)](this));},Sprite_Character[_0x518638(0x25b)][_0x518638(0x377)]=function(){const _0x2c7f4f=_0x518638;if(!this[_0x2c7f4f(0x412)])return;this[_0x2c7f4f(0x412)][_0x2c7f4f(0x507)]=!!VisuMZ['EventsMoveCore'][_0x2c7f4f(0x223)]['Movement'][_0x2c7f4f(0x470)];},VisuMZ[_0x518638(0x489)][_0x518638(0x490)]=Sprite_Character['prototype'][_0x518638(0x22d)],Sprite_Character['prototype'][_0x518638(0x22d)]=function(){const _0xa198f2=_0x518638;return this[_0xa198f2(0x286)]()?this['characterPatternYVS8']():VisuMZ['EventsMoveCore'][_0xa198f2(0x490)]['call'](this);},Sprite_Character[_0x518638(0x25b)][_0x518638(0x215)]=function(){const _0x1938a8=_0x518638,_0x11a876=this[_0x1938a8(0x3ce)][_0x1938a8(0x1c0)](),_0x405f10=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x405f10[_0x11a876]-0x2)/0x2;},Sprite_Character[_0x518638(0x25b)][_0x518638(0x27b)]=function(){const _0x18bb45=_0x518638;this[_0x18bb45(0x35e)]=0x0;if(this[_0x18bb45(0x39c)]()){const _0x158628=VisuMZ['EventsMoveCore'][_0x18bb45(0x223)][_0x18bb45(0x1f6)],_0x19704c=this[_0x18bb45(0x3ce)]['direction']();let _0x566e2a=0x0;if([0x1,0x4,0x7]['includes'](_0x19704c))_0x566e2a=_0x158628[_0x18bb45(0x1bb)];if([0x3,0x6,0x9][_0x18bb45(0x394)](_0x19704c))_0x566e2a=_0x158628['TiltRight'];[0x2,0x8][_0x18bb45(0x394)](_0x19704c)&&(_0x566e2a=[-_0x158628['TiltVert'],0x0,_0x158628[_0x18bb45(0x2b0)]][this[_0x18bb45(0x3ce)][_0x18bb45(0x353)]()]);if(this['_reflection'])_0x566e2a*=-0x1;this[_0x18bb45(0x35e)]=_0x566e2a;}},Sprite_Character['prototype'][_0x518638(0x39c)]=function(){const _0x4440df=_0x518638;if(this[_0x4440df(0x197)])return![];return this['_character'][_0x4440df(0x4aa)]()&&!this['_character'][_0x4440df(0x260)]()&&!this[_0x4440df(0x3ce)][_0x4440df(0x476)]()&&this[_0x4440df(0x1ac)]()===0x0;},Sprite_Character[_0x518638(0x25b)]['updateShadow']=function(){const _0x430a92=_0x518638;this[_0x430a92(0x3a2)]['x']=this[_0x430a92(0x3ce)][_0x430a92(0x248)](),this['_shadowSprite']['y']=this[_0x430a92(0x3ce)][_0x430a92(0x345)](),this[_0x430a92(0x3a2)]['opacity']=this[_0x430a92(0x486)],this[_0x430a92(0x3a2)][_0x430a92(0x49a)]=this[_0x430a92(0x3ce)][_0x430a92(0x2ab)](),this[_0x430a92(0x3a2)][_0x430a92(0x21a)]=this[_0x430a92(0x21a)],!this[_0x430a92(0x3ce)][_0x430a92(0x3ef)]()?(this[_0x430a92(0x3a2)][_0x430a92(0x312)]['x']=Math[_0x430a92(0x427)](0x1,this[_0x430a92(0x3a2)][_0x430a92(0x312)]['x']+0.1),this[_0x430a92(0x3a2)][_0x430a92(0x312)]['y']=Math[_0x430a92(0x427)](0x1,this[_0x430a92(0x3a2)][_0x430a92(0x312)]['y']+0.1)):(this[_0x430a92(0x3a2)][_0x430a92(0x312)]['x']=Math[_0x430a92(0x375)](0x0,this[_0x430a92(0x3a2)][_0x430a92(0x312)]['x']-0.1),this[_0x430a92(0x3a2)]['scale']['y']=Math[_0x430a92(0x375)](0x0,this[_0x430a92(0x3a2)][_0x430a92(0x312)]['y']-0.1));},Sprite_Character['prototype']['updateEventIconSprite']=function(){const _0x56537c=_0x518638,_0xa37636=this[_0x56537c(0x4b9)],_0x53c5ff=this[_0x56537c(0x1ac)]();if(_0x53c5ff<=0x0)return _0xa37636[_0x56537c(0x319)](0x0,0x0,0x0,0x0);else{const _0xad640e=ImageManager['iconWidth'],_0x2a3aff=ImageManager['iconHeight'],_0x252177=_0x53c5ff%0x10*_0xad640e,_0xae1792=Math[_0x56537c(0x49b)](_0x53c5ff/0x10)*_0x2a3aff;_0xa37636[_0x56537c(0x319)](_0x252177,_0xae1792,_0xad640e,_0x2a3aff),this[_0x56537c(0x49a)]=!![];}const _0x4686d5=this[_0x56537c(0x3ce)][_0x56537c(0x46d)]();this['isAutoBufferIcon']()?this['autoEventIconBuffer'](_0xa37636):(_0xa37636['x']=_0x4686d5?_0x4686d5[_0x56537c(0x1bf)]:0x0,_0xa37636['y']=_0x4686d5?-this[_0x56537c(0x2ef)]+_0x4686d5[_0x56537c(0x2e2)]:0x0),_0xa37636[_0x56537c(0x466)]=_0x4686d5?_0x4686d5['blendMode']:0x0,this['removeChild'](_0xa37636),this[_0x56537c(0x4f1)](_0xa37636),_0xa37636[_0x56537c(0x35e)]=-this['rotation'];},Sprite_Character[_0x518638(0x25b)]['autoEventIconBuffer']=function(_0x1ca512){const _0x52ca36=_0x518638;_0x1ca512['x']=0x0,_0x1ca512['y']=-this[_0x52ca36(0x2ef)]+this[_0x52ca36(0x2ef)]*0x2/0x5,this['_character'][_0x52ca36(0x353)]()!==0x1&&(_0x1ca512['y']+=0x1);},Sprite_Character['prototype']['getEventIconIndex']=function(){const _0x3474f7=_0x518638;if(!this['_character'])return 0x0;if(this[_0x3474f7(0x3ce)][_0x3474f7(0x313)])return 0x0;const _0x40eed5=this[_0x3474f7(0x3ce)][_0x3474f7(0x46d)]();return _0x40eed5?_0x40eed5[_0x3474f7(0x166)]||0x0:0x0;},VisuMZ[_0x518638(0x489)][_0x518638(0x4e5)]=Sprite_Balloon[_0x518638(0x25b)]['setup'],Sprite_Balloon[_0x518638(0x25b)]['setup']=function(_0x2d4772,_0x54dd70){const _0x13d80a=_0x518638;VisuMZ[_0x13d80a(0x489)][_0x13d80a(0x4e5)][_0x13d80a(0x495)](this,_0x2d4772,_0x54dd70),VisuMZ[_0x13d80a(0x489)][_0x13d80a(0x223)]['VS8'][_0x13d80a(0x51f)]&&this[_0x13d80a(0x450)]['_character'][_0x13d80a(0x537)](_0x54dd70,this[_0x13d80a(0x4de)]);},VisuMZ[_0x518638(0x489)][_0x518638(0x3ea)]=Sprite_Balloon[_0x518638(0x25b)][_0x518638(0x498)],Sprite_Balloon[_0x518638(0x25b)][_0x518638(0x498)]=function(){const _0x48afe0=_0x518638;VisuMZ[_0x48afe0(0x489)][_0x48afe0(0x3ea)][_0x48afe0(0x495)](this),this[_0x48afe0(0x4fc)]();},Sprite_Balloon[_0x518638(0x25b)]['updateVS8BalloonOffsets']=function(){const _0x2e515e=_0x518638;this['_target'][_0x2e515e(0x3ce)][_0x2e515e(0x286)]()&&(this['x']+=VisuMZ['EventsMoveCore'][_0x2e515e(0x223)][_0x2e515e(0x40d)]['BalloonOffsetX'],this['y']+=VisuMZ[_0x2e515e(0x489)][_0x2e515e(0x223)][_0x2e515e(0x40d)][_0x2e515e(0x1a5)]);},Sprite_Timer[_0x518638(0x25b)][_0x518638(0x50c)]=function(){const _0x1ec073=_0x518638;this['bitmap']=new Bitmap(Math[_0x1ec073(0x302)](Graphics[_0x1ec073(0x340)]/0x2),0x30),this[_0x1ec073(0x412)][_0x1ec073(0x4b5)]=this[_0x1ec073(0x4b5)](),this[_0x1ec073(0x412)][_0x1ec073(0x38f)]=this[_0x1ec073(0x38f)](),this[_0x1ec073(0x412)][_0x1ec073(0x475)]=ColorManager[_0x1ec073(0x475)]();},Sprite_Timer[_0x518638(0x25b)][_0x518638(0x2fb)]=function(){const _0x2ab989=_0x518638,_0x472b8d=Math[_0x2ab989(0x49b)](this[_0x2ab989(0x186)]/0x3c/0x3c),_0x1da1fd=Math[_0x2ab989(0x49b)](this[_0x2ab989(0x186)]/0x3c)%0x3c,_0x3c4ea6=this['_seconds']%0x3c;let _0x4a99b5=_0x1da1fd[_0x2ab989(0x1e6)](0x2)+':'+_0x3c4ea6[_0x2ab989(0x1e6)](0x2);if(_0x472b8d>0x0)_0x4a99b5=_0x2ab989(0x3bd)[_0x2ab989(0x290)](_0x472b8d,_0x4a99b5);return _0x4a99b5;},VisuMZ[_0x518638(0x489)][_0x518638(0x53a)]=Spriteset_Map[_0x518638(0x25b)][_0x518638(0x301)],Spriteset_Map[_0x518638(0x25b)]['createLowerLayer']=function(){const _0x29bc91=_0x518638;VisuMZ[_0x29bc91(0x489)][_0x29bc91(0x53a)]['call'](this),this[_0x29bc91(0x413)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x52b)]=Spriteset_Map['prototype'][_0x518638(0x524)],Spriteset_Map['prototype'][_0x518638(0x524)]=function(){const _0xb52587=_0x518638;VisuMZ[_0xb52587(0x489)][_0xb52587(0x52b)]['call'](this),this[_0xb52587(0x474)]();},Spriteset_Map[_0x518638(0x25b)]['createShadows']=function(){const _0x3889ac=_0x518638;if(!VisuMZ[_0x3889ac(0x489)][_0x3889ac(0x223)][_0x3889ac(0x1f6)][_0x3889ac(0x23a)])return;for(const _0x14ad4e of this[_0x3889ac(0x3a5)]){this[_0x3889ac(0x217)](_0x14ad4e);}},Spriteset_Map['prototype'][_0x518638(0x217)]=function(_0x5aef49){const _0x240cfa=_0x518638;_0x5aef49[_0x240cfa(0x3a2)]=new Sprite(),_0x5aef49[_0x240cfa(0x3a2)][_0x240cfa(0x289)]=_0x5aef49[_0x240cfa(0x3ce)]['shadowFilename'](),_0x5aef49[_0x240cfa(0x3a2)]['bitmap']=ImageManager[_0x240cfa(0x2c5)](_0x5aef49[_0x240cfa(0x3a2)][_0x240cfa(0x289)]),_0x5aef49['_shadowSprite'][_0x240cfa(0x2a0)]['x']=0.5,_0x5aef49['_shadowSprite'][_0x240cfa(0x2a0)]['y']=0x1,_0x5aef49[_0x240cfa(0x3a2)]['z']=0x0,this[_0x240cfa(0x3ed)][_0x240cfa(0x4f1)](_0x5aef49['_shadowSprite']);},Spriteset_Map[_0x518638(0x25b)]['hideShadows']=function(){const _0x33a6ee=_0x518638;if(!VisuMZ['EventsMoveCore'][_0x33a6ee(0x223)][_0x33a6ee(0x1f6)][_0x33a6ee(0x23a)])return;for(const _0x402b4b of this[_0x33a6ee(0x3a5)]){this[_0x33a6ee(0x3ed)][_0x33a6ee(0x388)](_0x402b4b['_shadowSprite']);}},Spriteset_Map['prototype'][_0x518638(0x413)]=function(){const _0x54f27e=_0x518638;this[_0x54f27e(0x1ca)]=[];for(const _0x9837 of $gameMap[_0x54f27e(0x2c6)]()){this[_0x54f27e(0x18a)](_0x9837);}},Spriteset_Map[_0x518638(0x25b)][_0x518638(0x18a)]=function(_0x37b2ef){const _0x2a9c0c=_0x518638;if(!this[_0x2a9c0c(0x278)](_0x37b2ef))return;const _0x453ba5=new Window_EventLabel(_0x37b2ef);_0x453ba5['z']=0x8,_0x453ba5[_0x2a9c0c(0x1d7)]=Sprite[_0x2a9c0c(0x17f)]++,this[_0x2a9c0c(0x3ed)][_0x2a9c0c(0x4f1)](_0x453ba5),this[_0x2a9c0c(0x1ca)][_0x2a9c0c(0x284)](_0x453ba5);},Spriteset_Map[_0x518638(0x25b)][_0x518638(0x278)]=function(_0x160354){const _0x2f333e=_0x518638,_0x165d7f=_0x160354[_0x2f333e(0x40c)]();if(_0x165d7f[_0x2f333e(0x3fa)][_0x2f333e(0x297)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x165d7f['note'][_0x2f333e(0x297)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x2c6260 of _0x165d7f['pages']){let _0x5b5f43='';for(const _0x227c71 of _0x2c6260[_0x2f333e(0x398)]){[0x6c,0x198][_0x2f333e(0x394)](_0x227c71[_0x2f333e(0x1c9)])&&(_0x5b5f43+=_0x227c71['parameters'][0x0]);}if(_0x5b5f43[_0x2f333e(0x297)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5b5f43[_0x2f333e(0x297)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map['prototype'][_0x518638(0x218)]=function(_0x4e47eb){const _0xb585da=_0x518638;this['_characterSprites']=this[_0xb585da(0x3a5)]||[];const _0x4917f4=new Sprite_Character(_0x4e47eb);this['_characterSprites'][_0xb585da(0x284)](_0x4917f4),this[_0xb585da(0x3ed)][_0xb585da(0x4f1)](_0x4917f4),this['createCharacterShadow'](_0x4917f4),this[_0xb585da(0x18a)](_0x4e47eb),_0x4917f4[_0xb585da(0x184)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x3f4)]=Game_Message['prototype'][_0x518638(0x2d7)],Game_Message[_0x518638(0x25b)][_0x518638(0x2d7)]=function(_0x4b0788,_0x3434e4){const _0xf2eddc=_0x518638;this['_selfTargetNumberInput']=$gameTemp[_0xf2eddc(0x2f0)](),VisuMZ['EventsMoveCore'][_0xf2eddc(0x3f4)][_0xf2eddc(0x495)](this,_0x4b0788,_0x3434e4);},VisuMZ[_0x518638(0x489)][_0x518638(0x1a8)]=Window_NumberInput[_0x518638(0x25b)][_0x518638(0x343)],Window_NumberInput[_0x518638(0x25b)][_0x518638(0x343)]=function(){const _0x356223=_0x518638;$gameTemp[_0x356223(0x503)]($gameMessage[_0x356223(0x323)]),VisuMZ[_0x356223(0x489)][_0x356223(0x1a8)][_0x356223(0x495)](this),$gameTemp[_0x356223(0x1e8)]();},VisuMZ[_0x518638(0x489)][_0x518638(0x339)]=Window_NumberInput[_0x518638(0x25b)][_0x518638(0x424)],Window_NumberInput[_0x518638(0x25b)]['processOk']=function(){const _0x4af846=_0x518638;$gameTemp[_0x4af846(0x503)]($gameMessage[_0x4af846(0x323)]),VisuMZ[_0x4af846(0x489)][_0x4af846(0x339)]['call'](this),$gameTemp[_0x4af846(0x1e8)](),$gameMessage[_0x4af846(0x323)]=undefined;},VisuMZ['EventsMoveCore'][_0x518638(0x4f5)]=Game_Message[_0x518638(0x25b)]['setItemChoice'],Game_Message[_0x518638(0x25b)][_0x518638(0x383)]=function(_0x17b885,_0x3a8aca){const _0x120bbe=_0x518638;this['_selfTargetItemChoice']=$gameTemp[_0x120bbe(0x2f0)](),VisuMZ[_0x120bbe(0x489)][_0x120bbe(0x4f5)]['call'](this,_0x17b885,_0x3a8aca);},VisuMZ[_0x518638(0x489)][_0x518638(0x30a)]=Window_EventItem[_0x518638(0x25b)][_0x518638(0x244)],Window_EventItem['prototype'][_0x518638(0x244)]=function(){const _0x1aab15=_0x518638;$gameTemp[_0x1aab15(0x503)]($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore'][_0x1aab15(0x30a)][_0x1aab15(0x495)](this),$gameTemp[_0x1aab15(0x1e8)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x518638(0x489)][_0x518638(0x3e4)]=Window_EventItem[_0x518638(0x25b)]['onCancel'],Window_EventItem['prototype'][_0x518638(0x310)]=function(){const _0x50f8db=_0x518638;$gameTemp[_0x50f8db(0x503)]($gameMessage[_0x50f8db(0x515)]),VisuMZ[_0x50f8db(0x489)][_0x50f8db(0x3e4)][_0x50f8db(0x495)](this),$gameTemp[_0x50f8db(0x1e8)](),$gameMessage[_0x50f8db(0x515)]=undefined;},VisuMZ[_0x518638(0x489)][_0x518638(0x453)]=Window_Message[_0x518638(0x25b)][_0x518638(0x4c4)],Window_Message[_0x518638(0x25b)]['startMessage']=function(){const _0xf83301=_0x518638;$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore'][_0xf83301(0x453)]['call'](this),$gameTemp[_0xf83301(0x1e8)]();},VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage']=Window_ScrollText[_0x518638(0x25b)][_0x518638(0x4c4)],Window_ScrollText[_0x518638(0x25b)][_0x518638(0x4c4)]=function(){const _0x43e5a3=_0x518638;$gameMessage[_0x43e5a3(0x226)](),VisuMZ[_0x43e5a3(0x489)][_0x43e5a3(0x415)][_0x43e5a3(0x495)](this),$gameTemp[_0x43e5a3(0x1e8)]();};function Window_EventLabel(){this['initialize'](...arguments);}function _0x3813(_0x34bec9,_0x1afb7c){const _0x42a239=_0x42a2();return _0x3813=function(_0x3813f6,_0xde3b92){_0x3813f6=_0x3813f6-0x15c;let _0x50b4dc=_0x42a239[_0x3813f6];return _0x50b4dc;},_0x3813(_0x34bec9,_0x1afb7c);}Window_EventLabel[_0x518638(0x25b)]=Object['create'](Window_Base['prototype']),Window_EventLabel[_0x518638(0x25b)][_0x518638(0x364)]=Window_EventLabel,Window_EventLabel[_0x518638(0x25b)][_0x518638(0x41b)]=function(_0x4570c7){const _0x2e789a=_0x518638;this[_0x2e789a(0x46a)]=_0x4570c7;const _0x1749cc=new Rectangle(0x0,0x0,Graphics[_0x2e789a(0x340)]/0x4,this[_0x2e789a(0x17b)](0x1));this[_0x2e789a(0x279)](),Window_Base[_0x2e789a(0x25b)][_0x2e789a(0x41b)][_0x2e789a(0x495)](this,_0x1749cc),this['contentsOpacity']=0x0,this[_0x2e789a(0x3c6)](0x2),this[_0x2e789a(0x31b)]='';},Window_EventLabel[_0x518638(0x25b)]['initMembers']=function(){const _0x1a89e4=_0x518638;this[_0x1a89e4(0x3a7)]=![],this[_0x1a89e4(0x1c6)]=$gameScreen['zoomScale'](),this[_0x1a89e4(0x26b)]=this['_event'][_0x1a89e4(0x256)](),this[_0x1a89e4(0x2bb)]=this[_0x1a89e4(0x46a)][_0x1a89e4(0x2d9)](),this['_eventLabelOffsetX']=this[_0x1a89e4(0x46a)][_0x1a89e4(0x38a)][_0x1a89e4(0x174)],this[_0x1a89e4(0x479)]=this[_0x1a89e4(0x46a)]['_labelWindow'][_0x1a89e4(0x4df)],this[_0x1a89e4(0x253)]=this['_event'][_0x1a89e4(0x37c)],this['_cacheVisibility']=this[_0x1a89e4(0x2e9)](),this[_0x1a89e4(0x2e0)]=$gameSystem[_0x1a89e4(0x16e)](),this[_0x1a89e4(0x35b)]=$gamePlayer['x'],this[_0x1a89e4(0x2b9)]=$gamePlayer['y'],this[_0x1a89e4(0x230)]=this['_event']['x'],this['_visibleEventY']=this[_0x1a89e4(0x46a)]['y'];},Window_EventLabel[_0x518638(0x25b)][_0x518638(0x184)]=function(){const _0x2cdb3e=_0x518638;Window_Base[_0x2cdb3e(0x25b)][_0x2cdb3e(0x184)]['call'](this);if(!this[_0x2cdb3e(0x1dd)]())return;this['updateText'](),this['updateScale'](),this[_0x2cdb3e(0x498)](),this['updateOpacity']();},Window_EventLabel['prototype']['needsUpdate']=function(){const _0xad4537=_0x518638;if(!this[_0xad4537(0x46a)])return![];if(!this[_0xad4537(0x46a)][_0xad4537(0x38a)])return![];if(this[_0xad4537(0x253)]!==this['_event']['_pageIndex'])return!![];if(this[_0xad4537(0x46a)]['_erased']&&!this['_eventErased'])return!![];if(this[_0xad4537(0x46a)][_0xad4537(0x38a)][_0xad4537(0x1da)]==='')return![];if(this[_0xad4537(0x1c6)]!==$gameScreen[_0xad4537(0x40b)]())return!![];if(this[_0xad4537(0x26b)]!==this[_0xad4537(0x46a)][_0xad4537(0x256)]())return!![];if(this[_0xad4537(0x2bb)]!==this['_event'][_0xad4537(0x2d9)]())return!![];if(this[_0xad4537(0x4a5)]!==this[_0xad4537(0x46a)][_0xad4537(0x38a)][_0xad4537(0x174)])return!![];if(this[_0xad4537(0x479)]!==this[_0xad4537(0x46a)]['_labelWindow']['offsetY'])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this[_0xad4537(0x2b9)]!==$gamePlayer['y'])return!![];if(this[_0xad4537(0x230)]!==this[_0xad4537(0x46a)]['x'])return!![];if(this[_0xad4537(0x3fb)]!==this[_0xad4537(0x46a)]['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0xad4537(0x16e)]())return!![];if(this[_0xad4537(0x512)]&&this[_0xad4537(0x2c1)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0xad4537(0x2c1)]>0x0)return!![];if(SceneManager[_0xad4537(0x309)][_0xad4537(0x4ff)]>0x0)return!![];return![];},Window_EventLabel[_0x518638(0x25b)]['updateText']=function(){const _0x107c33=_0x518638;this[_0x107c33(0x46a)][_0x107c33(0x358)]()!==this[_0x107c33(0x31b)]&&(this[_0x107c33(0x31b)]=this[_0x107c33(0x46a)][_0x107c33(0x358)](),this[_0x107c33(0x2cd)]());},Window_EventLabel[_0x518638(0x25b)]['updateScale']=function(){const _0x222639=_0x518638;this[_0x222639(0x312)]['x']=0x1/$gameScreen[_0x222639(0x40b)](),this['scale']['y']=0x1/$gameScreen['zoomScale'](),this['_screenZoomScale']=$gameScreen[_0x222639(0x40b)]();},Window_EventLabel[_0x518638(0x25b)]['updatePosition']=function(){const _0x36caa8=_0x518638;if(!SceneManager[_0x36caa8(0x309)])return;if(!SceneManager[_0x36caa8(0x309)][_0x36caa8(0x4da)])return;const _0x1cfa08=SceneManager[_0x36caa8(0x309)][_0x36caa8(0x4da)][_0x36caa8(0x1fc)](this['_event']);if(!_0x1cfa08)return;this['x']=Math['round'](this[_0x36caa8(0x46a)][_0x36caa8(0x256)]()-Math[_0x36caa8(0x49b)](this[_0x36caa8(0x39b)]*this['scale']['x']/0x2)),this['x']+=this[_0x36caa8(0x46a)][_0x36caa8(0x38a)]['offsetX'],this['y']=this['_event'][_0x36caa8(0x2d9)]()-_0x1cfa08[_0x36caa8(0x2ef)],this['y']+=Math[_0x36caa8(0x302)]($gameSystem[_0x36caa8(0x1a7)]()*0.5),this['y']-=Math['round'](this[_0x36caa8(0x2ef)]*this['scale']['y']),this['y']+=this[_0x36caa8(0x46a)][_0x36caa8(0x38a)]['offsetY'],this[_0x36caa8(0x3a7)]=this[_0x36caa8(0x46a)]['_erased'],this[_0x36caa8(0x26b)]=this[_0x36caa8(0x46a)]['screenX'](),this['_eventScreenY']=this[_0x36caa8(0x46a)]['screenY'](),this[_0x36caa8(0x4a5)]=this[_0x36caa8(0x46a)][_0x36caa8(0x38a)][_0x36caa8(0x174)],this[_0x36caa8(0x479)]=this['_event'][_0x36caa8(0x38a)][_0x36caa8(0x4df)],this[_0x36caa8(0x253)]=this[_0x36caa8(0x46a)]['_pageIndex'],this[_0x36caa8(0x3a7)]&&(this[_0x36caa8(0x2c1)]=0x0);},Window_EventLabel['prototype'][_0x518638(0x2d3)]=function(){const _0x40f1b8=_0x518638;if(this[_0x40f1b8(0x2e9)]())this['contentsOpacity']+=this[_0x40f1b8(0x4eb)]();else SceneManager[_0x40f1b8(0x309)]['_encounterEffectDuration']>0x0?this[_0x40f1b8(0x2c1)]=0x0:this[_0x40f1b8(0x2c1)]-=this[_0x40f1b8(0x4eb)]();},Window_EventLabel[_0x518638(0x25b)]['isLabelVisible']=function(){const _0x46eab6=_0x518638;if(!$gameSystem[_0x46eab6(0x16e)]())return![];if(this[_0x46eab6(0x46a)]?.[_0x46eab6(0x313)])return![];if(SceneManager['_scene'][_0x46eab6(0x4ff)]>0x0)return![];const _0x33962b=$gamePlayer['x'],_0x198df6=$gamePlayer['y'],_0x29f957=this[_0x46eab6(0x46a)]['x'],_0x8f3858=this[_0x46eab6(0x46a)]['y'];if(this[_0x46eab6(0x35b)]===_0x33962b&&this[_0x46eab6(0x2b9)]===_0x198df6&&this['_visibleEventX']===_0x29f957&&this[_0x46eab6(0x3fb)]===_0x8f3858)return this[_0x46eab6(0x512)];this[_0x46eab6(0x35b)]=$gamePlayer['x'],this[_0x46eab6(0x2b9)]=$gamePlayer['y'],this[_0x46eab6(0x230)]=this['_event']['x'],this['_visibleEventY']=this[_0x46eab6(0x46a)]['y'];if($gameMap[_0x46eab6(0x357)](_0x33962b,_0x198df6,_0x29f957,_0x8f3858)>this['_event'][_0x46eab6(0x1cd)]())return this[_0x46eab6(0x512)]=![],![];return this[_0x46eab6(0x512)]=!![],!![];},Window_EventLabel['prototype']['opacitySpeed']=function(){const _0x5fc16a=_0x518638;return VisuMZ[_0x5fc16a(0x489)]['Settings'][_0x5fc16a(0x2c0)][_0x5fc16a(0x416)];},Window_EventLabel[_0x518638(0x25b)][_0x518638(0x526)]=function(){const _0x41ad9a=_0x518638,_0x109b2f=this['textSizeEx'](this[_0x41ad9a(0x31b)]);this[_0x41ad9a(0x39b)]=_0x109b2f[_0x41ad9a(0x39b)]+($gameSystem[_0x41ad9a(0x1a7)]()+this['itemPadding']())*0x2,this[_0x41ad9a(0x2ef)]=Math[_0x41ad9a(0x375)](this['lineHeight'](),_0x109b2f['height'])+$gameSystem['windowPadding']()*0x2,this['createContents']();},Window_EventLabel[_0x518638(0x25b)][_0x518638(0x231)]=function(){const _0x25d011=_0x518638;return VisuMZ['EventsMoveCore'][_0x25d011(0x223)]['Label'][_0x25d011(0x52e)];},Window_EventLabel[_0x518638(0x25b)]['resetFontSettings']=function(){const _0x26aa14=_0x518638;Window_Base[_0x26aa14(0x25b)][_0x26aa14(0x2a6)][_0x26aa14(0x495)](this),this[_0x26aa14(0x1c7)][_0x26aa14(0x38f)]=this[_0x26aa14(0x421)]();},Window_EventLabel[_0x518638(0x25b)][_0x518638(0x421)]=function(){const _0x47105a=_0x518638;return VisuMZ[_0x47105a(0x489)][_0x47105a(0x223)][_0x47105a(0x2c0)]['FontSize'];},Window_EventLabel['prototype'][_0x518638(0x2cd)]=function(){const _0x56f02b=_0x518638;this[_0x56f02b(0x526)](),this['contents']['clear']();const _0x1213a2=this[_0x56f02b(0x31b)]['split'](/[\r\n]+/);let _0x31047e=0x0;for(const _0x4b9ee4 of _0x1213a2){const _0x32312e=this['textSizeEx'](_0x4b9ee4),_0x520b3b=Math['floor']((this[_0x56f02b(0x19c)]-_0x32312e[_0x56f02b(0x39b)])/0x2);this['drawTextEx'](_0x4b9ee4,_0x520b3b,_0x31047e),_0x31047e+=_0x32312e['height'];}},Window_EventLabel['prototype'][_0x518638(0x422)]=function(_0x2d75fb,_0x80d6f5){const _0x84484e=_0x518638;_0x80d6f5[_0x84484e(0x1c2)]&&this[_0x84484e(0x2b3)](_0x2d75fb,_0x80d6f5['x']+0x2,_0x80d6f5['y']),_0x80d6f5['x']+=Math[_0x84484e(0x427)](this[_0x84484e(0x161)](),ImageManager[_0x84484e(0x1f7)])+0x4;},Window_EventLabel['prototype'][_0x518638(0x2b3)]=function(_0x60926f,_0x3ac8ba,_0x40940f){const _0x319ead=_0x518638,_0x200c12=ImageManager[_0x319ead(0x2c5)](_0x319ead(0x237)),_0x7a8bd9=ImageManager[_0x319ead(0x1f7)],_0x45cfdf=ImageManager[_0x319ead(0x4d4)],_0xcc5971=_0x60926f%0x10*_0x7a8bd9,_0x2299cd=Math['floor'](_0x60926f/0x10)*_0x45cfdf,_0x589032=Math[_0x319ead(0x427)](this[_0x319ead(0x161)]()),_0x2eb5af=Math['min'](this['iconSize']());this[_0x319ead(0x1c7)][_0x319ead(0x4c2)](_0x200c12,_0xcc5971,_0x2299cd,_0x7a8bd9,_0x45cfdf,_0x3ac8ba,_0x40940f,_0x589032,_0x2eb5af);},Window_EventLabel[_0x518638(0x25b)][_0x518638(0x161)]=function(){const _0x3ef66a=_0x518638;return VisuMZ[_0x3ef66a(0x489)][_0x3ef66a(0x223)]['Label'][_0x3ef66a(0x222)];};