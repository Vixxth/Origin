//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.54;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.54] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x5f3bde=_0x278f;(function(_0x54c3b6,_0x3548d1){const _0x3cb1c3=_0x278f,_0x52b784=_0x54c3b6();while(!![]){try{const _0xf427e7=parseInt(_0x3cb1c3(0x1bb))/0x1+-parseInt(_0x3cb1c3(0x3c9))/0x2*(parseInt(_0x3cb1c3(0x7e2))/0x3)+parseInt(_0x3cb1c3(0x734))/0x4+parseInt(_0x3cb1c3(0x26b))/0x5*(-parseInt(_0x3cb1c3(0x589))/0x6)+-parseInt(_0x3cb1c3(0x58f))/0x7*(-parseInt(_0x3cb1c3(0x466))/0x8)+parseInt(_0x3cb1c3(0x333))/0x9+parseInt(_0x3cb1c3(0x7b4))/0xa*(-parseInt(_0x3cb1c3(0x452))/0xb);if(_0xf427e7===_0x3548d1)break;else _0x52b784['push'](_0x52b784['shift']());}catch(_0x5e8ba0){_0x52b784['push'](_0x52b784['shift']());}}}(_0x4e21,0x42eed));var label=_0x5f3bde(0x23a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5f3bde(0x322)](function(_0x2fe368){const _0x4d4840=_0x5f3bde;return _0x2fe368[_0x4d4840(0x1c1)]&&_0x2fe368[_0x4d4840(0x1c5)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5f3bde(0x22e)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5f3bde(0x1d4)]=function(_0x39c1cd,_0x24fd84){const _0x390d6f=_0x5f3bde;for(const _0x111fce in _0x24fd84){if(_0x111fce['match'](/(.*):(.*)/i)){const _0x5ab1db=String(RegExp['$1']),_0x2dcabb=String(RegExp['$2'])[_0x390d6f(0x22d)]()[_0x390d6f(0x65a)]();let _0x193fc0,_0x240893,_0x84bbae;switch(_0x2dcabb){case _0x390d6f(0x55a):_0x193fc0=_0x24fd84[_0x111fce]!==''?Number(_0x24fd84[_0x111fce]):0x0;break;case _0x390d6f(0x1ca):_0x240893=_0x24fd84[_0x111fce]!==''?JSON['parse'](_0x24fd84[_0x111fce]):[],_0x193fc0=_0x240893['map'](_0x5b156d=>Number(_0x5b156d));break;case'EVAL':_0x193fc0=_0x24fd84[_0x111fce]!==''?eval(_0x24fd84[_0x111fce]):null;break;case _0x390d6f(0x3e6):_0x240893=_0x24fd84[_0x111fce]!==''?JSON['parse'](_0x24fd84[_0x111fce]):[],_0x193fc0=_0x240893[_0x390d6f(0x22b)](_0x3f57c7=>eval(_0x3f57c7));break;case _0x390d6f(0x812):_0x193fc0=_0x24fd84[_0x111fce]!==''?JSON['parse'](_0x24fd84[_0x111fce]):'';break;case _0x390d6f(0x35b):_0x240893=_0x24fd84[_0x111fce]!==''?JSON[_0x390d6f(0x1ea)](_0x24fd84[_0x111fce]):[],_0x193fc0=_0x240893[_0x390d6f(0x22b)](_0x92471a=>JSON[_0x390d6f(0x1ea)](_0x92471a));break;case _0x390d6f(0x2e4):_0x193fc0=_0x24fd84[_0x111fce]!==''?new Function(JSON[_0x390d6f(0x1ea)](_0x24fd84[_0x111fce])):new Function('return\x200');break;case _0x390d6f(0x669):_0x240893=_0x24fd84[_0x111fce]!==''?JSON['parse'](_0x24fd84[_0x111fce]):[],_0x193fc0=_0x240893['map'](_0x45714a=>new Function(JSON['parse'](_0x45714a)));break;case'STR':_0x193fc0=_0x24fd84[_0x111fce]!==''?String(_0x24fd84[_0x111fce]):'';break;case _0x390d6f(0x258):_0x240893=_0x24fd84[_0x111fce]!==''?JSON[_0x390d6f(0x1ea)](_0x24fd84[_0x111fce]):[],_0x193fc0=_0x240893[_0x390d6f(0x22b)](_0xfa709a=>String(_0xfa709a));break;case _0x390d6f(0x766):_0x84bbae=_0x24fd84[_0x111fce]!==''?JSON[_0x390d6f(0x1ea)](_0x24fd84[_0x111fce]):{},_0x39c1cd[_0x5ab1db]={},VisuMZ[_0x390d6f(0x1d4)](_0x39c1cd[_0x5ab1db],_0x84bbae);continue;case _0x390d6f(0x497):_0x240893=_0x24fd84[_0x111fce]!==''?JSON['parse'](_0x24fd84[_0x111fce]):[],_0x193fc0=_0x240893['map'](_0x18cb02=>VisuMZ[_0x390d6f(0x1d4)]({},JSON[_0x390d6f(0x1ea)](_0x18cb02)));break;default:continue;}_0x39c1cd[_0x5ab1db]=_0x193fc0;}}return _0x39c1cd;},(_0x27caa4=>{const _0x22042e=_0x5f3bde,_0x283c6b=_0x27caa4[_0x22042e(0x6ad)];for(const _0x23dbc5 of dependencies){if(!Imported[_0x23dbc5]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x283c6b,_0x23dbc5)),SceneManager[_0x22042e(0x449)]();break;}}const _0x24d524=_0x27caa4['description'];if(_0x24d524[_0x22042e(0x772)](/\[Version[ ](.*?)\]/i)){const _0x43b375=Number(RegExp['$1']);_0x43b375!==VisuMZ[label][_0x22042e(0x74f)]&&(alert(_0x22042e(0x4ed)['format'](_0x283c6b,_0x43b375)),SceneManager[_0x22042e(0x449)]());}if(_0x24d524['match'](/\[Tier[ ](\d+)\]/i)){const _0xed99b4=Number(RegExp['$1']);_0xed99b4<tier?(alert(_0x22042e(0x7ea)['format'](_0x283c6b,_0xed99b4,tier)),SceneManager['exit']()):tier=Math[_0x22042e(0x615)](_0xed99b4,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x22042e(0x22e)],_0x27caa4[_0x22042e(0x2ab)]);})(pluginData),((()=>{const _0x5e0504=_0x5f3bde;if(VisuMZ['CoreEngine'][_0x5e0504(0x22e)][_0x5e0504(0x338)]['SubfolderParse']??!![])for(const _0x265194 in $plugins){const _0x1de6a2=$plugins[_0x265194];_0x1de6a2[_0x5e0504(0x6ad)][_0x5e0504(0x772)](/(.*)\/(.*)/i)&&(_0x1de6a2[_0x5e0504(0x6ad)]=String(RegExp['$2']['trim']()));}})()),PluginManager['registerCommand'](pluginData['name'],_0x5f3bde(0x4ca),_0x2c89fe=>{const _0x2db110=_0x5f3bde;if(!SceneManager[_0x2db110(0x77c)])return;if(!SceneManager[_0x2db110(0x77c)][_0x2db110(0x5de)])return;VisuMZ['ConvertParams'](_0x2c89fe,_0x2c89fe);const _0x3e0651=Math['round'](_0x2c89fe['pointX']),_0x587a19=Math[_0x2db110(0x70a)](_0x2c89fe['pointY']);$gameTemp[_0x2db110(0x3f1)](_0x3e0651,_0x587a19,_0x2c89fe['AnimationID'],_0x2c89fe[_0x2db110(0x4f2)],_0x2c89fe[_0x2db110(0x5ed)]);}),PluginManager[_0x5f3bde(0x71b)](pluginData['name'],_0x5f3bde(0x532),_0x1edcfa=>{const _0x423c4c=_0x5f3bde;if(!$gameTemp[_0x423c4c(0x795)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x423c4c(0x77c)]['_active']=![],VisuMZ[_0x423c4c(0x23a)][_0x423c4c(0x424)]();}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],'ExportAllTroopText',_0x3425a1=>{const _0x38522f=_0x5f3bde;if(!$gameTemp[_0x38522f(0x795)]())return;if(!Utils[_0x38522f(0x423)]())return;SceneManager[_0x38522f(0x77c)][_0x38522f(0x70c)]=![],VisuMZ[_0x38522f(0x23a)][_0x38522f(0x575)]();}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x67a),_0x3a96b6=>{const _0xc2e872=_0x5f3bde;if(!$gameTemp[_0xc2e872(0x795)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0xc2e872(0x54e)]()<=0x0)return;VisuMZ[_0xc2e872(0x1d4)](_0x3a96b6,_0x3a96b6);const _0x325925='Map%1'[_0xc2e872(0x763)]($gameMap[_0xc2e872(0x54e)]()['padZero'](0x3)),_0x3b41ca=VisuMZ[_0xc2e872(0x23a)][_0xc2e872(0x316)]($gameMap['mapId']());VisuMZ[_0xc2e872(0x23a)][_0xc2e872(0x537)](_0x3b41ca,_0x325925,!![]);}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x391),_0x1d19f9=>{const _0x2c7dc2=_0x5f3bde;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x2c7dc2(0x423)]())return;if(!$gameParty[_0x2c7dc2(0x212)]())return;VisuMZ[_0x2c7dc2(0x1d4)](_0x1d19f9,_0x1d19f9);const _0x4375a0=_0x2c7dc2(0x73d)[_0x2c7dc2(0x763)]($gameTroop[_0x2c7dc2(0x347)][_0x2c7dc2(0x536)](0x4)),_0x3707ac=VisuMZ['CoreEngine'][_0x2c7dc2(0x487)]($gameTroop[_0x2c7dc2(0x347)]);VisuMZ[_0x2c7dc2(0x23a)][_0x2c7dc2(0x537)](_0x3707ac,_0x4375a0,!![]);}),VisuMZ[_0x5f3bde(0x23a)]['ExportString']=function(_0x626b47,_0x4ca53e,_0x1eda05){const _0xe29e95=_0x5f3bde,_0xbb91c9=require('fs');let _0x578e83=_0xe29e95(0x7a2)['format'](_0x4ca53e||'0');_0xbb91c9[_0xe29e95(0x6d9)](_0x578e83,_0x626b47,_0x473473=>{const _0x5bc3ff=_0xe29e95;if(_0x473473)throw err;else _0x1eda05&&alert(_0x5bc3ff(0x4b0)[_0x5bc3ff(0x763)](_0x578e83));});},VisuMZ[_0x5f3bde(0x23a)]['ExportStrFromAllMaps']=function(){const _0x1219c7=_0x5f3bde,_0x48c297=[];for(const _0x56c1df of $dataMapInfos){if(!_0x56c1df)continue;_0x48c297['push'](_0x56c1df['id']);}const _0x4577ef=_0x48c297[_0x1219c7(0x6d7)]*0x64+Math[_0x1219c7(0x434)](0x64);alert(_0x1219c7(0x30a)['format'](_0x4577ef)),this[_0x1219c7(0x5d8)]=[],this['_currentMap']=$dataMap;for(const _0x5e8a5e of _0x48c297){VisuMZ['CoreEngine']['loadMapData'](_0x5e8a5e);}setTimeout(VisuMZ['CoreEngine']['exportAllMapStrings'][_0x1219c7(0x687)](this),_0x4577ef);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x612)]=function(_0x233f01){const _0x36323b=_0x5f3bde,_0x34cb3d=_0x36323b(0x217)[_0x36323b(0x763)](_0x233f01[_0x36323b(0x536)](0x3)),_0x8ca453=new XMLHttpRequest(),_0x572da7=_0x36323b(0x31f)+_0x34cb3d;_0x8ca453['open'](_0x36323b(0x201),_0x572da7),_0x8ca453[_0x36323b(0x358)](_0x36323b(0x708)),_0x8ca453[_0x36323b(0x60c)]=()=>this['storeMapData'](_0x8ca453,_0x233f01,_0x34cb3d,_0x572da7),_0x8ca453[_0x36323b(0x430)]=()=>DataManager['onXhrError'](_0x36323b(0x314),_0x34cb3d,_0x572da7),_0x8ca453['send']();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6e5)]=function(_0x57748d,_0x35ba09,_0x27dc06,_0x206305){const _0x5db43d=_0x5f3bde;$dataMap=JSON['parse'](_0x57748d['responseText']),DataManager[_0x5db43d(0x2da)]($dataMap),this[_0x5db43d(0x5d8)][_0x35ba09]=VisuMZ[_0x5db43d(0x23a)][_0x5db43d(0x316)](_0x35ba09),$dataMap=this['_currentMap'];},VisuMZ[_0x5f3bde(0x23a)]['exportAllMapStrings']=function(){const _0x542a27=_0x5f3bde,_0x5572ee=_0x542a27(0x208);this[_0x542a27(0x5d8)][_0x542a27(0x35c)](undefined)[_0x542a27(0x35c)]('')[_0x542a27(0x35c)](null);const _0x4e3c8d=this[_0x542a27(0x5d8)]['join'](_0x542a27(0x1b6))['trim']();VisuMZ[_0x542a27(0x23a)][_0x542a27(0x537)](_0x4e3c8d,_0x5572ee,!![]),SceneManager[_0x542a27(0x77c)][_0x542a27(0x70c)]=!![];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x316)]=function(_0x162158){const _0x154d78=_0x5f3bde;if(!$dataMap)return'';let _0xacc2e2='█'[_0x154d78(0x37e)](0x46)+'\x0a\x0a',_0x184d0b='═'[_0x154d78(0x37e)](0x46)+'\x0a\x0a',_0x10b9ff='';this[_0x154d78(0x4e0)]=0x0;for(const _0x53958a of $dataMap['events']){if(!_0x53958a)continue;let _0x542526=_0x53958a['id'],_0x212a8b=_0x53958a['name'],_0x2ffb88=_0x53958a[_0x154d78(0x802)];for(const _0x2f161b of _0x2ffb88){const _0x395d68=_0x2ffb88[_0x154d78(0x4ad)](_0x2f161b)+0x1;let _0x4ba04a=_0x184d0b+_0x154d78(0x7cf),_0x1fd8a2=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x2f161b[_0x154d78(0x2e6)]);if(_0x1fd8a2[_0x154d78(0x6d7)]>0x0){if(_0x10b9ff[_0x154d78(0x6d7)]>0x0)_0x10b9ff+=_0x184d0b+_0x154d78(0x1b6);else{const _0x2732c5=$dataMapInfos[_0x162158]['name'];_0x10b9ff+=_0xacc2e2+_0x154d78(0x1e7)[_0x154d78(0x763)](_0x162158,_0x2732c5||_0x154d78(0x218))+_0xacc2e2;}_0x10b9ff+=_0x4ba04a[_0x154d78(0x763)](_0x542526,_0x212a8b,_0x395d68,_0x1fd8a2);}}}return _0x10b9ff[_0x154d78(0x6d7)]>0x0&&(_0x10b9ff+=_0x184d0b),_0x10b9ff;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x575)]=function(){const _0x1b4a6b=_0x5f3bde,_0x34b3b7=$dataTroops[_0x1b4a6b(0x6d7)]*0xa+Math[_0x1b4a6b(0x434)](0xa);alert(_0x1b4a6b(0x6b8)['format'](_0x34b3b7));const _0x194ca0=[];for(const _0x3481d8 of $dataTroops){if(!_0x3481d8)continue;const _0xc2b296=_0x3481d8['id'];_0x194ca0[_0xc2b296]=VisuMZ[_0x1b4a6b(0x23a)][_0x1b4a6b(0x487)](_0xc2b296);}setTimeout(VisuMZ[_0x1b4a6b(0x23a)][_0x1b4a6b(0x52c)][_0x1b4a6b(0x687)](this,_0x194ca0),_0x34b3b7);},VisuMZ['CoreEngine'][_0x5f3bde(0x487)]=function(_0x40df7a){const _0x2b9901=_0x5f3bde;if(!$dataTroops[_0x40df7a])return'';let _0x371446='█'[_0x2b9901(0x37e)](0x46)+'\x0a\x0a',_0x3b0107='═'[_0x2b9901(0x37e)](0x46)+'\x0a\x0a',_0x1c6a57='';this[_0x2b9901(0x4e0)]=0x0;const _0x28c38c=$dataTroops[_0x40df7a];let _0x7750ad=_0x28c38c[_0x2b9901(0x802)];for(const _0x52e70c of _0x7750ad){const _0x15f8d3=_0x7750ad[_0x2b9901(0x4ad)](_0x52e70c)+0x1;let _0x3ebd6d=_0x3b0107+_0x2b9901(0x590),_0x4a4f46=VisuMZ[_0x2b9901(0x23a)][_0x2b9901(0x24b)](_0x52e70c['list']);_0x4a4f46['length']>0x0&&(_0x1c6a57[_0x2b9901(0x6d7)]>0x0?_0x1c6a57+=_0x3b0107+'\x0a\x0a\x0a\x0a\x0a':_0x1c6a57+=_0x371446+_0x2b9901(0x628)['format'](_0x40df7a,_0x28c38c[_0x2b9901(0x6ad)]||_0x2b9901(0x218))+_0x371446,_0x1c6a57+=_0x3ebd6d[_0x2b9901(0x763)](_0x15f8d3,_0x4a4f46));}return _0x1c6a57['length']>0x0&&(_0x1c6a57+=_0x3b0107),_0x1c6a57;},VisuMZ['CoreEngine'][_0x5f3bde(0x52c)]=function(_0x17016a){const _0x49804b=_0x5f3bde,_0x4413a5='AllTroops';_0x17016a[_0x49804b(0x35c)](undefined)[_0x49804b(0x35c)]('')['remove'](null);const _0x797ca0=_0x17016a[_0x49804b(0x548)]('\x0a\x0a\x0a\x0a\x0a')[_0x49804b(0x65a)]();VisuMZ['CoreEngine'][_0x49804b(0x537)](_0x797ca0,_0x4413a5,!![]),SceneManager['_scene']['_active']=!![];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x24b)]=function(_0x4547fc){const _0x5336cc=_0x5f3bde;let _0x35d58a='\x0a'+'─'[_0x5336cc(0x37e)](0x46)+'\x0a',_0x4aab1d='\x0a'+'┄'[_0x5336cc(0x37e)](0x46)+'\x0a',_0x557d93='';for(const _0x41cff6 of _0x4547fc){if(!_0x41cff6)continue;if(_0x41cff6[_0x5336cc(0x616)]===0x65)_0x557d93+=_0x35d58a+'\x0a',_0x557d93+=_0x5336cc(0x653),_0x41cff6[_0x5336cc(0x2ab)][0x4]!==''&&_0x41cff6[_0x5336cc(0x2ab)][0x4]!==undefined&&(_0x557d93+=_0x5336cc(0x20a)[_0x5336cc(0x763)](_0x41cff6['parameters'][0x4]));else{if(_0x41cff6[_0x5336cc(0x616)]===0x191)_0x557d93+=_0x5336cc(0x46e)[_0x5336cc(0x763)](_0x41cff6[_0x5336cc(0x2ab)][0x0]);else{if(_0x41cff6['code']===0x192)_0x557d93+=_0x35d58a,_0x557d93+=_0x5336cc(0x7b7)['format'](_0x4aab1d,_0x41cff6[_0x5336cc(0x2ab)][0x0]+0x1,_0x41cff6[_0x5336cc(0x2ab)][0x1]);else{if(_0x41cff6['code']===0x193)_0x557d93+=_0x35d58a,_0x557d93+=_0x5336cc(0x5fc)[_0x5336cc(0x763)](_0x4aab1d);else{if(_0x41cff6[_0x5336cc(0x616)]===0x194)_0x557d93+=_0x35d58a,_0x557d93+=_0x5336cc(0x37f)['format'](_0x4aab1d);else{if(_0x41cff6[_0x5336cc(0x616)]===0x69)_0x557d93+=_0x35d58a+'\x0a',_0x557d93+='〘Scrolling\x20Text〙\x0a';else{if(_0x41cff6[_0x5336cc(0x616)]===0x6c)_0x557d93+=_0x35d58a+'\x0a',_0x557d93+=_0x5336cc(0x5db)[_0x5336cc(0x763)](_0x41cff6[_0x5336cc(0x2ab)][0x0]);else{if(_0x41cff6[_0x5336cc(0x616)]===0x198)_0x557d93+=_0x5336cc(0x46e)[_0x5336cc(0x763)](_0x41cff6[_0x5336cc(0x2ab)][0x0]);else{if(_0x41cff6['code']===0x75){const _0x5e819a=$dataCommonEvents[_0x41cff6[_0x5336cc(0x2ab)][0x0]];if(_0x5e819a&&this[_0x5336cc(0x4e0)]<=0xa){this[_0x5336cc(0x4e0)]++;let _0x312449=VisuMZ[_0x5336cc(0x23a)][_0x5336cc(0x24b)](_0x5e819a[_0x5336cc(0x2e6)]);_0x312449[_0x5336cc(0x6d7)]>0x0&&(_0x557d93+=_0x35d58a,_0x557d93+=_0x4aab1d,_0x557d93+=_0x5336cc(0x417)[_0x5336cc(0x763)](_0x5e819a['id'],_0x5e819a['name']),_0x557d93+=_0x4aab1d,_0x557d93+=_0x312449,_0x557d93+=_0x4aab1d,_0x557d93+=_0x5336cc(0x378)[_0x5336cc(0x763)](_0x5e819a['id'],_0x5e819a['name']),_0x557d93+=_0x4aab1d),this[_0x5336cc(0x4e0)]--;}}}}}}}}}}}return _0x557d93[_0x5336cc(0x6d7)]>0x0&&(_0x557d93+=_0x35d58a),_0x557d93;},PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x2bd),_0x637fd6=>{const _0x54a134=_0x5f3bde;VisuMZ[_0x54a134(0x1d4)](_0x637fd6,_0x637fd6);const _0x52c84c=_0x637fd6['URL'];VisuMZ[_0x54a134(0x211)](_0x52c84c);}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],'GoldChange',_0x190b98=>{const _0x4d74a6=_0x5f3bde;VisuMZ[_0x4d74a6(0x1d4)](_0x190b98,_0x190b98);const _0x1dcb68=_0x190b98[_0x4d74a6(0x4fe)]||0x0;$gameParty[_0x4d74a6(0x705)](_0x1dcb68);}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x4c2),_0x57b99f=>{const _0x4bd8b2=_0x5f3bde;if(!SceneManager[_0x4bd8b2(0x21f)]())return;VisuMZ['ConvertParams'](_0x57b99f,_0x57b99f);const _0x1f2bd8=_0x57b99f[_0x4bd8b2(0x77d)];SceneManager[_0x4bd8b2(0x77c)]['playOnceParallelInterpreter'](_0x1f2bd8);}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],'PictureCoordinatesMode',_0x29bed7=>{const _0x57cfb7=_0x5f3bde;if(!$gameTemp[_0x57cfb7(0x795)]())return;if(!Utils[_0x57cfb7(0x423)]())return;VisuMZ[_0x57cfb7(0x1d4)](_0x29bed7,_0x29bed7);const _0x96f4d8=_0x29bed7[_0x57cfb7(0x4f4)]||0x1;$gameTemp[_0x57cfb7(0x66b)]=_0x96f4d8;}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x2e5),_0x1ef35d=>{const _0x384ad4=_0x5f3bde;VisuMZ[_0x384ad4(0x1d4)](_0x1ef35d,_0x1ef35d);const _0x584c3e=_0x1ef35d['pictureId']||0x1,_0x28b83b=_0x1ef35d[_0x384ad4(0x699)]||_0x384ad4(0x352),_0x1b40a1=$gameScreen[_0x384ad4(0x367)](_0x584c3e);_0x1b40a1&&_0x1b40a1[_0x384ad4(0x55b)](_0x28b83b);}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x57f),_0x4814e1=>{const _0x4a3e9f=_0x5f3bde;for(let _0x37f6f4=0x1;_0x37f6f4<=0x64;_0x37f6f4++){$gameScreen[_0x4a3e9f(0x1ff)](_0x37f6f4);}}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x7ad),_0x5026c9=>{const _0x2be355=_0x5f3bde;VisuMZ[_0x2be355(0x1d4)](_0x5026c9,_0x5026c9);const _0xd5587b=Math[_0x2be355(0x1f3)](_0x5026c9[_0x2be355(0x3c1)],_0x5026c9[_0x2be355(0x829)]),_0xfd6022=Math[_0x2be355(0x615)](_0x5026c9[_0x2be355(0x3c1)],_0x5026c9[_0x2be355(0x829)]);for(let _0x294128=_0xd5587b;_0x294128<=_0xfd6022;_0x294128++){$gameScreen[_0x2be355(0x1ff)](_0x294128);}}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],'PictureShowIcon',_0x3b4f70=>{const _0x300ef7=_0x5f3bde;VisuMZ[_0x300ef7(0x1d4)](_0x3b4f70,_0x3b4f70);const _0x3984c0=Math[_0x300ef7(0x70a)](_0x3b4f70[_0x300ef7(0x4f4)])['clamp'](0x1,0x64),_0x3c6a49=_0x3b4f70[_0x300ef7(0x22e)],_0x51ddfd=_0x3c6a49[_0x300ef7(0x7ab)][_0x300ef7(0x5bd)](0x0,0x1),_0x46fcb4=Math[_0x300ef7(0x70a)](_0x3c6a49[_0x300ef7(0x760)]||0x0),_0x25bafd=Math['round'](_0x3c6a49[_0x300ef7(0x748)]||0x0),_0x540774=Math[_0x300ef7(0x70a)](_0x3c6a49['ScaleX']||0x0),_0x370394=Math[_0x300ef7(0x70a)](_0x3c6a49[_0x300ef7(0x523)]||0x0),_0x1e305c=Math[_0x300ef7(0x70a)](_0x3c6a49['Opacity'])[_0x300ef7(0x5bd)](0x0,0xff),_0x37ffc2=_0x3c6a49[_0x300ef7(0x1c0)],_0x4e99f3=_0x300ef7(0x50a),_0x12c950=_0x3b4f70[_0x300ef7(0x655)]?_0x300ef7(0x655):_0x300ef7(0x3b2),_0x3bc886=_0x4e99f3['format'](_0x3b4f70[_0x300ef7(0x30e)],_0x12c950);$gameScreen[_0x300ef7(0x6e3)](_0x3984c0,_0x3bc886,_0x51ddfd,_0x46fcb4,_0x25bafd,_0x540774,_0x370394,_0x1e305c,_0x37ffc2);}),PluginManager[_0x5f3bde(0x71b)](pluginData['name'],_0x5f3bde(0x2a8),_0xa2de40=>{const _0x3919f1=_0x5f3bde;VisuMZ[_0x3919f1(0x1d4)](_0xa2de40,_0xa2de40);const _0x18d109=_0xa2de40[_0x3919f1(0x569)]||_0x3919f1(0x28a),_0x372255=_0xa2de40[_0x3919f1(0x53b)]['clamp'](0x1,0x9),_0x40e520=_0xa2de40['Speed'][_0x3919f1(0x5bd)](0x1,0x9),_0x5b5b01=_0xa2de40[_0x3919f1(0x251)]||0x1,_0x17a5b9=_0xa2de40[_0x3919f1(0x80c)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x18d109),$gameScreen[_0x3919f1(0x37b)](_0x372255,_0x40e520,_0x5b5b01);if(_0x17a5b9){const _0x1eb944=$gameTemp[_0x3919f1(0x3cc)]();if(_0x1eb944)_0x1eb944[_0x3919f1(0x5e0)](_0x5b5b01);}}),PluginManager['registerCommand'](pluginData['name'],_0x5f3bde(0x1f7),_0x719a79=>{const _0x2fdcab=_0x5f3bde;VisuMZ[_0x2fdcab(0x1d4)](_0x719a79,_0x719a79);const _0x1e3da5=_0x719a79['option']||0x1;$gameSystem['setMainFontSize'](_0x1e3da5);}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],'SystemSetSideView',_0x2e19d4=>{const _0xda0c3=_0x5f3bde;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x2e19d4,_0x2e19d4);const _0x7c1cea=_0x2e19d4['option'];if(_0x7c1cea[_0xda0c3(0x772)](/Front/i))$gameSystem[_0xda0c3(0x205)](![]);else _0x7c1cea[_0xda0c3(0x772)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem['setSideView'](!$gameSystem[_0xda0c3(0x727)]());}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x6a7),_0x5be936=>{const _0x1a882e=_0x5f3bde;if($gameParty[_0x1a882e(0x212)]())return;VisuMZ[_0x1a882e(0x1d4)](_0x5be936,_0x5be936);const _0x1700e4=[_0x1a882e(0x574),_0x1a882e(0x309),'me','se'];for(const _0x1b621c of _0x1700e4){const _0x38fc37=_0x5be936[_0x1b621c],_0x18d0f2=_0x1a882e(0x1ee)[_0x1a882e(0x763)](_0x1b621c);for(const _0xe06e03 of _0x38fc37){AudioManager[_0x1a882e(0x5a5)](_0x18d0f2,_0xe06e03);}}}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x269),_0x4c94f3=>{const _0xc10ca6=_0x5f3bde;if($gameParty[_0xc10ca6(0x212)]())return;VisuMZ['ConvertParams'](_0x4c94f3,_0x4c94f3);const _0x4b670b=[_0xc10ca6(0x1ac),_0xc10ca6(0x770),_0xc10ca6(0x48a),_0xc10ca6(0x540),'enemies',_0xc10ca6(0x6f0),_0xc10ca6(0x253),_0xc10ca6(0x68a),_0xc10ca6(0x675),_0xc10ca6(0x6cd),_0xc10ca6(0x213),_0xc10ca6(0x191),_0xc10ca6(0x236),_0xc10ca6(0x624)];for(const _0x59bad9 of _0x4b670b){const _0x268fea=_0x4c94f3[_0x59bad9],_0x55b870=_0xc10ca6(0x472)['format'](_0x59bad9);for(const _0x6981b0 of _0x268fea){ImageManager[_0xc10ca6(0x6e2)](_0x55b870,_0x6981b0);}}}),PluginManager[_0x5f3bde(0x71b)](pluginData['name'],_0x5f3bde(0x7ae),_0x447979=>{const _0x3f6e32=_0x5f3bde;if($gameParty[_0x3f6e32(0x212)]())return;VisuMZ[_0x3f6e32(0x1d4)](_0x447979,_0x447979);const _0x27fffa=_0x447979[_0x3f6e32(0x7a6)],_0x32b3ff=(_0x447979['Chance']||0x0)/0x64;for(const _0x25f5a7 of _0x27fffa){const _0x186706=Math['random']()<=_0x32b3ff;$gameSwitches[_0x3f6e32(0x18a)](_0x25f5a7,_0x186706);}}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],_0x5f3bde(0x25c),_0x1e470d=>{const _0x6ac4e6=_0x5f3bde;if($gameParty[_0x6ac4e6(0x212)]())return;VisuMZ[_0x6ac4e6(0x1d4)](_0x1e470d,_0x1e470d);const _0x4450a5=Math['min'](_0x1e470d[_0x6ac4e6(0x3c1)],_0x1e470d['EndingID']),_0x232fa0=Math['max'](_0x1e470d['StartID'],_0x1e470d[_0x6ac4e6(0x829)]),_0x24f594=(_0x1e470d[_0x6ac4e6(0x318)]||0x0)/0x64;for(let _0x53b8a3=_0x4450a5;_0x53b8a3<=_0x232fa0;_0x53b8a3++){const _0x3e478d=Math[_0x6ac4e6(0x28a)]()<=_0x24f594;$gameSwitches[_0x6ac4e6(0x18a)](_0x53b8a3,_0x3e478d);}}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],'SwitchToggleOne',_0x4a7707=>{const _0x36a755=_0x5f3bde;if($gameParty[_0x36a755(0x212)]())return;VisuMZ[_0x36a755(0x1d4)](_0x4a7707,_0x4a7707);const _0x550d24=_0x4a7707['IDs'];for(const _0x4b7a7f of _0x550d24){const _0x55f49a=$gameSwitches[_0x36a755(0x4fe)](_0x4b7a7f);$gameSwitches['setValue'](_0x4b7a7f,!_0x55f49a);}}),PluginManager['registerCommand'](pluginData[_0x5f3bde(0x6ad)],'SwitchToggleRange',_0x2e625d=>{const _0xde06f7=_0x5f3bde;if($gameParty['inBattle']())return;VisuMZ[_0xde06f7(0x1d4)](_0x2e625d,_0x2e625d);const _0x4be4fd=Math[_0xde06f7(0x1f3)](_0x2e625d[_0xde06f7(0x3c1)],_0x2e625d['EndingID']),_0x35d396=Math[_0xde06f7(0x615)](_0x2e625d[_0xde06f7(0x3c1)],_0x2e625d[_0xde06f7(0x829)]);for(let _0x1b9395=_0x4be4fd;_0x1b9395<=_0x35d396;_0x1b9395++){const _0x287ad1=$gameSwitches['value'](_0x1b9395);$gameSwitches['setValue'](_0x1b9395,!_0x287ad1);}}),PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],'SystemSetBattleSystem',_0x4df363=>{const _0x3128de=_0x5f3bde;if($gameParty[_0x3128de(0x212)]())return;VisuMZ[_0x3128de(0x1d4)](_0x4df363,_0x4df363);const _0x40d6f7=_0x4df363[_0x3128de(0x5fb)]['toUpperCase']()[_0x3128de(0x65a)](),_0xdea434=VisuMZ[_0x3128de(0x23a)][_0x3128de(0x437)](_0x40d6f7);$gameSystem[_0x3128de(0x60b)](_0xdea434);}),VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x437)]=function(_0x5e52d5){const _0x1e7709=_0x5f3bde;_0x5e52d5=_0x5e52d5||_0x1e7709(0x7f8),_0x5e52d5=String(_0x5e52d5)[_0x1e7709(0x22d)]()[_0x1e7709(0x65a)]();switch(_0x5e52d5){case _0x1e7709(0x415):return 0x0;case _0x1e7709(0x384):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x1e7709(0x644)]=!![]);return 0x1;case _0x1e7709(0x429):Imported[_0x1e7709(0x3d6)]&&(ConfigManager[_0x1e7709(0x644)]=![]);return 0x2;case'CTB':if(Imported[_0x1e7709(0x3f7)])return'CTB';break;case _0x1e7709(0x33b):if(Imported[_0x1e7709(0x63c)])return _0x1e7709(0x33b);break;case _0x1e7709(0x422):if(Imported[_0x1e7709(0x7e7)])return _0x1e7709(0x422);break;case _0x1e7709(0x7ce):if(Imported[_0x1e7709(0x32f)])return'FTB';break;case'OTB':if(Imported[_0x1e7709(0x356)])return _0x1e7709(0x5bc);break;case _0x1e7709(0x1ce):if(Imported[_0x1e7709(0x7eb)])return _0x1e7709(0x1ce);break;case _0x1e7709(0x6a5):if(Imported[_0x1e7709(0x559)])return _0x1e7709(0x6a5);break;}return $dataSystem['battleSystem'];},PluginManager[_0x5f3bde(0x71b)](pluginData[_0x5f3bde(0x6ad)],'SystemSetWindowPadding',_0x4c06fd=>{const _0x1c099d=_0x5f3bde;VisuMZ['ConvertParams'](_0x4c06fd,_0x4c06fd);const _0x1dfe94=_0x4c06fd[_0x1c099d(0x5fb)]||0x1;$gameSystem[_0x1c099d(0x4a2)](_0x1dfe94);}),VisuMZ['CoreEngine'][_0x5f3bde(0x676)]=Scene_Boot['prototype'][_0x5f3bde(0x71c)],Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x71c)]=function(){const _0x40c57a=_0x5f3bde;VisuMZ[_0x40c57a(0x23a)][_0x40c57a(0x676)][_0x40c57a(0x1f0)](this),this[_0x40c57a(0x7b5)](),this[_0x40c57a(0x6a6)](),this[_0x40c57a(0x24c)](),this[_0x40c57a(0x5f7)](),this[_0x40c57a(0x739)](),VisuMZ[_0x40c57a(0x421)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6b7)]={},Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x7b5)]=function(){const _0x643e8f=_0x5f3bde,_0x50024c=[_0x643e8f(0x3ea),_0x643e8f(0x73c),_0x643e8f(0x6d0),_0x643e8f(0x393),_0x643e8f(0x357),'MDF','AGI',_0x643e8f(0x6dc)],_0x5ba869=[_0x643e8f(0x5f5),_0x643e8f(0x774),_0x643e8f(0x6d8),_0x643e8f(0x18d),_0x643e8f(0x409),_0x643e8f(0x512),_0x643e8f(0x580),_0x643e8f(0x77f),_0x643e8f(0x54f),_0x643e8f(0x768)],_0x237e16=['TGR',_0x643e8f(0x6d2),_0x643e8f(0x6aa),_0x643e8f(0x469),_0x643e8f(0x50c),_0x643e8f(0x368),_0x643e8f(0x63d),'MDR',_0x643e8f(0x5b4),_0x643e8f(0x30b)],_0x5c0c80=[_0x50024c,_0x5ba869,_0x237e16],_0x4e6939=['Plus',_0x643e8f(0x4e5),_0x643e8f(0x793),_0x643e8f(0x19a),'Rate',_0x643e8f(0x4f3),_0x643e8f(0x291),_0x643e8f(0x20f),_0x643e8f(0x20c),'Flat2'];for(const _0x301992 of _0x5c0c80){let _0x52ee02='';if(_0x301992===_0x50024c)_0x52ee02=_0x643e8f(0x5c4);if(_0x301992===_0x5ba869)_0x52ee02=_0x643e8f(0x4f7);if(_0x301992===_0x237e16)_0x52ee02=_0x643e8f(0x3f5);for(const _0x5dcb1e of _0x4e6939){let _0x2b1f58=_0x643e8f(0x4e3)[_0x643e8f(0x763)](_0x52ee02,_0x5dcb1e);VisuMZ[_0x643e8f(0x23a)][_0x643e8f(0x6b7)][_0x2b1f58]=[],VisuMZ['CoreEngine'][_0x643e8f(0x6b7)][_0x2b1f58+'JS']=[];let _0x5ddeff=_0x643e8f(0x2bc);if([_0x643e8f(0x375),'Flat']['includes'](_0x5dcb1e))_0x5ddeff+=_0x643e8f(0x7b9);else{if([_0x643e8f(0x4e5),'Flat1'][_0x643e8f(0x638)](_0x5dcb1e))_0x5ddeff+=_0x643e8f(0x4a9);else{if([_0x643e8f(0x793),_0x643e8f(0x80f)][_0x643e8f(0x638)](_0x5dcb1e))_0x5ddeff+=_0x643e8f(0x247);else{if(_0x5dcb1e===_0x643e8f(0x19a))_0x5ddeff+=_0x643e8f(0x59e);else{if(_0x5dcb1e==='Rate1')_0x5ddeff+=_0x643e8f(0x7db);else _0x5dcb1e===_0x643e8f(0x291)&&(_0x5ddeff+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x4ee60d of _0x301992){let _0x57755e=_0x5dcb1e[_0x643e8f(0x3b4)](/[\d+]/g,'')[_0x643e8f(0x22d)]();const _0x54c7a2=_0x5ddeff[_0x643e8f(0x763)](_0x4ee60d,_0x57755e);VisuMZ[_0x643e8f(0x23a)]['RegExp'][_0x2b1f58][_0x643e8f(0x296)](new RegExp(_0x54c7a2,'i'));const _0x56abb3=_0x643e8f(0x441)['format'](_0x4ee60d,_0x57755e);VisuMZ[_0x643e8f(0x23a)][_0x643e8f(0x6b7)][_0x2b1f58+'JS']['push'](new RegExp(_0x56abb3,'i'));}}}},Scene_Boot[_0x5f3bde(0x371)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x32b698=_0x5f3bde;if(VisuMZ[_0x32b698(0x421)])return;},Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x24c)]=function(){const _0x4b7023=_0x5f3bde,_0x28bb27=VisuMZ[_0x4b7023(0x23a)][_0x4b7023(0x22e)];_0x28bb27['QoL']['OpenConsole']&&VisuMZ[_0x4b7023(0x5ca)](!![]);_0x28bb27['QoL'][_0x4b7023(0x65b)]&&(Input[_0x4b7023(0x619)][0x23]='end',Input['keyMapper'][0x24]=_0x4b7023(0x5fd));if(_0x28bb27[_0x4b7023(0x57c)]){const _0x1ccd20=_0x28bb27[_0x4b7023(0x57c)];_0x1ccd20[_0x4b7023(0x241)]=_0x1ccd20[_0x4b7023(0x241)]||_0x4b7023(0x506),_0x1ccd20[_0x4b7023(0x5fe)]=_0x1ccd20[_0x4b7023(0x5fe)]||_0x4b7023(0x1da);}_0x28bb27[_0x4b7023(0x42c)]['WASD']&&(Input['keyMapper'][0x57]='up',Input[_0x4b7023(0x619)][0x41]='left',Input[_0x4b7023(0x619)][0x53]='down',Input['keyMapper'][0x44]='right',Input[_0x4b7023(0x619)][0x45]='pagedown'),_0x28bb27['KeyboardInput']['DashToggleR']&&(Input[_0x4b7023(0x619)][0x52]=_0x4b7023(0x257)),_0x28bb27[_0x4b7023(0x275)][_0x4b7023(0x2c7)]=_0x28bb27[_0x4b7023(0x275)][_0x4b7023(0x2c7)][_0x4b7023(0x22b)](_0x91450c=>_0x91450c['toUpperCase']()[_0x4b7023(0x65a)]()),_0x28bb27[_0x4b7023(0x275)][_0x4b7023(0x674)]=_0x28bb27[_0x4b7023(0x275)]['ExtDisplayedParams'][_0x4b7023(0x22b)](_0x458323=>_0x458323['toUpperCase']()[_0x4b7023(0x65a)]());},Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x5f7)]=function(){const _0x139ded=_0x5f3bde;this[_0x139ded(0x539)]();},Scene_Boot[_0x5f3bde(0x371)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x24cb43=_0x5f3bde,_0x5df8bd=VisuMZ[_0x24cb43(0x23a)][_0x24cb43(0x22e)][_0x24cb43(0x44b)];for(const _0x5131b2 of _0x5df8bd){const _0x302f40=_0x5131b2[_0x24cb43(0x2f6)][_0x24cb43(0x3b4)](/[ ]/g,''),_0x361e61=_0x5131b2['CodeJS'];VisuMZ['CoreEngine']['createJsQuickFunction'](_0x302f40,_0x361e61);}},VisuMZ[_0x5f3bde(0x23a)]['createJsQuickFunction']=function(_0x42a352,_0xcf24be){const _0x17e92e=_0x5f3bde;if(!!window[_0x42a352]){if($gameTemp[_0x17e92e(0x795)]())console['log'](_0x17e92e(0x3db)['format'](_0x42a352));}const _0x23fac9=_0x17e92e(0x810)['format'](_0x42a352,_0xcf24be);window[_0x42a352]=new Function(_0x23fac9);},Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x739)]=function(){const _0x1c4d17=_0x5f3bde,_0x445551=VisuMZ[_0x1c4d17(0x23a)][_0x1c4d17(0x22e)][_0x1c4d17(0x1c4)];if(!_0x445551)return;for(const _0x43fff1 of _0x445551){if(!_0x43fff1)continue;VisuMZ[_0x1c4d17(0x23a)]['createCustomParameter'](_0x43fff1);}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ[_0x5f3bde(0x23a)]['CustomParamIcons']={},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x5ab)]={},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x53e)]={},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x505)]=function(_0x3fc7bb){const _0x30fb1f=_0x5f3bde,_0x425f9b=_0x3fc7bb[_0x30fb1f(0x273)],_0x4f5182=_0x3fc7bb[_0x30fb1f(0x6b9)],_0x6aaa40=_0x3fc7bb['Icon'],_0x35b019=_0x3fc7bb[_0x30fb1f(0x569)],_0x5461e8=new Function(_0x3fc7bb[_0x30fb1f(0x489)]);VisuMZ[_0x30fb1f(0x23a)][_0x30fb1f(0x279)][_0x425f9b['toUpperCase']()['trim']()]=_0x4f5182,VisuMZ['CoreEngine']['CustomParamIcons'][_0x425f9b['toUpperCase']()[_0x30fb1f(0x65a)]()]=_0x6aaa40,VisuMZ['CoreEngine'][_0x30fb1f(0x5ab)][_0x425f9b[_0x30fb1f(0x22d)]()[_0x30fb1f(0x65a)]()]=_0x35b019,VisuMZ['CoreEngine']['CustomParamAbb'][_0x425f9b[_0x30fb1f(0x22d)]()[_0x30fb1f(0x65a)]()]=_0x425f9b,Object[_0x30fb1f(0x4e9)](Game_BattlerBase[_0x30fb1f(0x371)],_0x425f9b,{'get'(){const _0x496a6a=_0x30fb1f,_0x472bef=_0x5461e8['call'](this);return _0x35b019==='integer'?Math[_0x496a6a(0x70a)](_0x472bef):_0x472bef;}});},VisuMZ['ParseAllNotetags']=function(){const _0x32e90e=_0x5f3bde;for(const _0x54f580 of $dataActors){if(_0x54f580)VisuMZ[_0x32e90e(0x6b2)](_0x54f580);}for(const _0x1f3884 of $dataClasses){if(_0x1f3884)VisuMZ['ParseClassNotetags'](_0x1f3884);}for(const _0x3b90f8 of $dataSkills){if(_0x3b90f8)VisuMZ[_0x32e90e(0x6b6)](_0x3b90f8);}for(const _0x5294d4 of $dataItems){if(_0x5294d4)VisuMZ[_0x32e90e(0x7ee)](_0x5294d4);}for(const _0x378046 of $dataWeapons){if(_0x378046)VisuMZ['ParseWeaponNotetags'](_0x378046);}for(const _0x5cd360 of $dataArmors){if(_0x5cd360)VisuMZ['ParseArmorNotetags'](_0x5cd360);}for(const _0x1a03f1 of $dataEnemies){if(_0x1a03f1)VisuMZ[_0x32e90e(0x542)](_0x1a03f1);}for(const _0x35938e of $dataStates){if(_0x35938e)VisuMZ[_0x32e90e(0x79d)](_0x35938e);}for(const _0x49eed9 of $dataTilesets){if(_0x49eed9)VisuMZ['ParseTilesetNotetags'](_0x49eed9);}},VisuMZ[_0x5f3bde(0x6b2)]=function(_0x2cd92a){},VisuMZ['ParseClassNotetags']=function(_0x49cb7e){},VisuMZ[_0x5f3bde(0x6b6)]=function(_0x44339e){},VisuMZ[_0x5f3bde(0x7ee)]=function(_0x55e309){},VisuMZ[_0x5f3bde(0x458)]=function(_0x2ce33a){},VisuMZ[_0x5f3bde(0x7da)]=function(_0xc00e94){},VisuMZ[_0x5f3bde(0x542)]=function(_0x4e4c4c){},VisuMZ['ParseStateNotetags']=function(_0x5f55d0){},VisuMZ[_0x5f3bde(0x64a)]=function(_0x10f34a){},VisuMZ['CoreEngine'][_0x5f3bde(0x6b2)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x5f3bde(0x6b2)]=function(_0x46b2d1){const _0x282bf9=_0x5f3bde;VisuMZ[_0x282bf9(0x23a)][_0x282bf9(0x6b2)]['call'](this,_0x46b2d1);const _0x537284=_0x46b2d1[_0x282bf9(0x5c8)];if(_0x537284[_0x282bf9(0x772)](/<MAX LEVEL:[ ](\d+)>/i)){_0x46b2d1[_0x282bf9(0x762)]=Number(RegExp['$1']);if(_0x46b2d1[_0x282bf9(0x762)]===0x0)_0x46b2d1[_0x282bf9(0x762)]=Number[_0x282bf9(0x3be)];}_0x537284[_0x282bf9(0x772)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x46b2d1[_0x282bf9(0x21d)]=Math[_0x282bf9(0x1f3)](Number(RegExp['$1']),_0x46b2d1[_0x282bf9(0x762)]));},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x229)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x5f3bde(0x229)]=function(_0x2d6cb1){const _0x2cf0f4=_0x5f3bde;VisuMZ[_0x2cf0f4(0x23a)][_0x2cf0f4(0x229)][_0x2cf0f4(0x1f0)](this,_0x2d6cb1);if(_0x2d6cb1[_0x2cf0f4(0x488)])for(const _0x494e73 of _0x2d6cb1[_0x2cf0f4(0x488)]){_0x494e73[_0x2cf0f4(0x5c8)][_0x2cf0f4(0x772)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x494e73[_0x2cf0f4(0x528)]=Math[_0x2cf0f4(0x615)](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine'][_0x5f3bde(0x542)]=VisuMZ[_0x5f3bde(0x542)],VisuMZ['ParseEnemyNotetags']=function(_0x125f02){const _0x9ddefa=_0x5f3bde;VisuMZ[_0x9ddefa(0x23a)][_0x9ddefa(0x542)]['call'](this,_0x125f02),_0x125f02[_0x9ddefa(0x528)]=0x1;const _0x2517eb=_0x125f02['note'];if(_0x2517eb[_0x9ddefa(0x772)](/<LEVEL:[ ](\d+)>/i))_0x125f02[_0x9ddefa(0x528)]=Number(RegExp['$1']);if(_0x2517eb[_0x9ddefa(0x772)](/<MAXHP:[ ](\d+)>/i))_0x125f02[_0x9ddefa(0x1fb)][0x0]=Number(RegExp['$1']);if(_0x2517eb[_0x9ddefa(0x772)](/<MAXMP:[ ](\d+)>/i))_0x125f02[_0x9ddefa(0x1fb)][0x1]=Number(RegExp['$1']);if(_0x2517eb[_0x9ddefa(0x772)](/<ATK:[ ](\d+)>/i))_0x125f02[_0x9ddefa(0x1fb)][0x2]=Number(RegExp['$1']);if(_0x2517eb['match'](/<DEF:[ ](\d+)>/i))_0x125f02[_0x9ddefa(0x1fb)][0x3]=Number(RegExp['$1']);if(_0x2517eb['match'](/<MAT:[ ](\d+)>/i))_0x125f02['params'][0x4]=Number(RegExp['$1']);if(_0x2517eb[_0x9ddefa(0x772)](/<MDF:[ ](\d+)>/i))_0x125f02['params'][0x5]=Number(RegExp['$1']);if(_0x2517eb[_0x9ddefa(0x772)](/<AGI:[ ](\d+)>/i))_0x125f02[_0x9ddefa(0x1fb)][0x6]=Number(RegExp['$1']);if(_0x2517eb['match'](/<LUK:[ ](\d+)>/i))_0x125f02[_0x9ddefa(0x1fb)][0x7]=Number(RegExp['$1']);if(_0x2517eb[_0x9ddefa(0x772)](/<EXP:[ ](\d+)>/i))_0x125f02['exp']=Number(RegExp['$1']);if(_0x2517eb[_0x9ddefa(0x772)](/<GOLD:[ ](\d+)>/i))_0x125f02['gold']=Number(RegExp['$1']);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x7d0)]=Graphics['_defaultStretchMode'],Graphics[_0x5f3bde(0x335)]=function(){const _0x7d6ee3=_0x5f3bde;switch(VisuMZ[_0x7d6ee3(0x23a)][_0x7d6ee3(0x22e)][_0x7d6ee3(0x338)][_0x7d6ee3(0x295)]){case'stretch':return!![];case _0x7d6ee3(0x453):return![];default:return VisuMZ[_0x7d6ee3(0x23a)]['Graphics_defaultStretchMode'][_0x7d6ee3(0x1f0)](this);}},VisuMZ[_0x5f3bde(0x23a)]['Graphics_printError']=Graphics['printError'],Graphics[_0x5f3bde(0x44c)]=function(_0xc30caf,_0x3b1e80,_0x503994=null){const _0x662dd3=_0x5f3bde;VisuMZ[_0x662dd3(0x23a)][_0x662dd3(0x67f)][_0x662dd3(0x1f0)](this,_0xc30caf,_0x3b1e80,_0x503994),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x31e)]=Graphics[_0x5f3bde(0x5e1)],Graphics['_centerElement']=function(_0x20570b){const _0x344dd6=_0x5f3bde;VisuMZ[_0x344dd6(0x23a)][_0x344dd6(0x31e)][_0x344dd6(0x1f0)](this,_0x20570b),this[_0x344dd6(0x7c4)](_0x20570b);},Graphics['_centerElementCoreEngine']=function(_0xefb30c){const _0x2cef00=_0x5f3bde;VisuMZ['CoreEngine'][_0x2cef00(0x22e)][_0x2cef00(0x338)][_0x2cef00(0x38a)]&&(_0xefb30c[_0x2cef00(0x716)][_0x2cef00(0x42b)]='none');VisuMZ[_0x2cef00(0x23a)][_0x2cef00(0x22e)][_0x2cef00(0x338)][_0x2cef00(0x4ab)]&&(_0xefb30c[_0x2cef00(0x716)][_0x2cef00(0x464)]='pixelated');const _0x4825c1=Math['max'](0x0,Math['floor'](_0xefb30c[_0x2cef00(0x431)]*this['_realScale'])),_0x4bd64c=Math[_0x2cef00(0x615)](0x0,Math[_0x2cef00(0x43f)](_0xefb30c['height']*this[_0x2cef00(0x52f)]));_0xefb30c[_0x2cef00(0x716)][_0x2cef00(0x431)]=_0x4825c1+'px',_0xefb30c['style']['height']=_0x4bd64c+'px';},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x3cb)]=Bitmap[_0x5f3bde(0x371)]['initialize'],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x301)]=function(_0x190dd6,_0x1011ba){const _0x3fc6fe=_0x5f3bde;VisuMZ[_0x3fc6fe(0x23a)][_0x3fc6fe(0x3cb)][_0x3fc6fe(0x1f0)](this,_0x190dd6,_0x1011ba),this[_0x3fc6fe(0x631)]=!(VisuMZ['CoreEngine'][_0x3fc6fe(0x22e)][_0x3fc6fe(0x338)][_0x3fc6fe(0x4ab)]??!![]);},Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x73e)]=function(){const _0x28ec70=_0x5f3bde;this[_0x28ec70(0x7f1)]=!![];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x3fd)]=Sprite['prototype'][_0x5f3bde(0x47d)],Sprite[_0x5f3bde(0x371)][_0x5f3bde(0x47d)]=function(){const _0x2672c7=_0x5f3bde;VisuMZ[_0x2672c7(0x23a)][_0x2672c7(0x3fd)][_0x2672c7(0x1f0)](this),this[_0x2672c7(0x2f3)]();},Sprite[_0x5f3bde(0x371)][_0x5f3bde(0x2f3)]=function(){const _0x34481e=_0x5f3bde;if(!this[_0x34481e(0x2ba)])return;if(!this['bitmap']['_customModified'])return;this[_0x34481e(0x2ba)][_0x34481e(0x586)]&&!this[_0x34481e(0x2c2)]['_baseTexture'][_0x34481e(0x37c)]&&this[_0x34481e(0x2ba)][_0x34481e(0x47d)]();},VisuMZ['CoreEngine'][_0x5f3bde(0x52d)]=Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x1a0)],Bitmap[_0x5f3bde(0x371)]['resize']=function(_0x5080a0,_0x5cecb0){const _0x214334=_0x5f3bde;VisuMZ[_0x214334(0x23a)]['Bitmap_resize'][_0x214334(0x1f0)](this,_0x5080a0,_0x5cecb0),this[_0x214334(0x73e)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x571)]=Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x473)],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x473)]=function(_0x29646c,_0x214ec6,_0x56d3f9,_0x365c81,_0xb32959,_0x3b6edd,_0xabb0f5,_0x5dbf33,_0x506ffe){const _0x26049e=_0x5f3bde;_0x214ec6=Math[_0x26049e(0x70a)](_0x214ec6),_0x56d3f9=Math[_0x26049e(0x70a)](_0x56d3f9),_0x365c81=Math[_0x26049e(0x70a)](_0x365c81),_0xb32959=Math['round'](_0xb32959),_0x3b6edd=Math[_0x26049e(0x70a)](_0x3b6edd),_0xabb0f5=Math[_0x26049e(0x70a)](_0xabb0f5),VisuMZ[_0x26049e(0x23a)][_0x26049e(0x571)][_0x26049e(0x1f0)](this,_0x29646c,_0x214ec6,_0x56d3f9,_0x365c81,_0xb32959,_0x3b6edd,_0xabb0f5,_0x5dbf33,_0x506ffe),this['markCoreEngineModified']();},VisuMZ[_0x5f3bde(0x23a)]['Bitmap_clearRect']=Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x81d)],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x81d)]=function(_0x2a312d,_0x2dfb17,_0x47b8f4,_0xfe0367){const _0x5a2bc6=_0x5f3bde;VisuMZ[_0x5a2bc6(0x23a)]['Bitmap_clearRect'][_0x5a2bc6(0x1f0)](this,_0x2a312d,_0x2dfb17,_0x47b8f4,_0xfe0367),this[_0x5a2bc6(0x73e)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x4dc)]=Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x232)],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x232)]=function(_0x50e841,_0x56936d,_0x502004,_0x364ff6,_0x3fb627){const _0x4f0102=_0x5f3bde;VisuMZ['CoreEngine'][_0x4f0102(0x4dc)][_0x4f0102(0x1f0)](this,_0x50e841,_0x56936d,_0x502004,_0x364ff6,_0x3fb627),this['markCoreEngineModified']();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x7ef)]=Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x3ad)],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x3ad)]=function(_0x20d558,_0x9ec598,_0x24de83,_0x593d9d,_0x3faf5c){const _0x21cd60=_0x5f3bde;VisuMZ[_0x21cd60(0x23a)][_0x21cd60(0x7ef)]['call'](this,_0x20d558,_0x9ec598,_0x24de83,_0x593d9d,_0x3faf5c),this[_0x21cd60(0x73e)]();},VisuMZ[_0x5f3bde(0x23a)]['Bitmap_gradientFillRect']=Bitmap['prototype'][_0x5f3bde(0x3f3)],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x3f3)]=function(_0x3cc750,_0x3f4b07,_0x45310c,_0x5e630f,_0x1c3f3f,_0x2ec6f7,_0x4c6170){const _0x544ad2=_0x5f3bde;VisuMZ[_0x544ad2(0x23a)]['Bitmap_gradientFillRect'][_0x544ad2(0x1f0)](this,_0x3cc750,_0x3f4b07,_0x45310c,_0x5e630f,_0x1c3f3f,_0x2ec6f7,_0x4c6170),this[_0x544ad2(0x73e)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x369)]=Bitmap[_0x5f3bde(0x371)]['drawCircle'],Bitmap['prototype'][_0x5f3bde(0x209)]=function(_0x39ac4d,_0x20c42f,_0x359caa,_0x23d619){const _0x20060c=_0x5f3bde;_0x39ac4d=Math[_0x20060c(0x70a)](_0x39ac4d),_0x20c42f=Math['round'](_0x20c42f),_0x359caa=Math[_0x20060c(0x70a)](_0x359caa),VisuMZ[_0x20060c(0x23a)][_0x20060c(0x369)][_0x20060c(0x1f0)](this,_0x39ac4d,_0x20c42f,_0x359caa,_0x23d619),this[_0x20060c(0x73e)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x579)]=Bitmap[_0x5f3bde(0x371)]['measureTextWidth'],Bitmap['prototype']['measureTextWidth']=function(_0x3d4e10){const _0x1fe6f=_0x5f3bde;return Math[_0x1fe6f(0x210)](VisuMZ[_0x1fe6f(0x23a)][_0x1fe6f(0x579)]['call'](this,_0x3d4e10));},VisuMZ['CoreEngine']['Bitmap_drawText']=Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x79f)],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x79f)]=function(_0x211dd5,_0x453c36,_0xcece34,_0x39b5b8,_0x2a8dc7,_0xa20765){const _0x4887a2=_0x5f3bde;_0x453c36=Math[_0x4887a2(0x70a)](_0x453c36),_0xcece34=Math['round'](_0xcece34),_0x39b5b8=Math[_0x4887a2(0x70a)](_0x39b5b8),_0x2a8dc7=Math[_0x4887a2(0x70a)](_0x2a8dc7),VisuMZ[_0x4887a2(0x23a)][_0x4887a2(0x1b5)][_0x4887a2(0x1f0)](this,_0x211dd5,_0x453c36,_0xcece34,_0x39b5b8,_0x2a8dc7,_0xa20765),this[_0x4887a2(0x73e)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x531)]=Bitmap[_0x5f3bde(0x371)]['_drawTextOutline'],Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x382)]=function(_0x2db08b,_0x507f62,_0x5b634d,_0x4db510){const _0x22f48c=_0x5f3bde;VisuMZ['CoreEngine']['Settings'][_0x22f48c(0x338)][_0x22f48c(0x587)]?this['_drawTextShadow'](_0x2db08b,_0x507f62,_0x5b634d,_0x4db510):VisuMZ[_0x22f48c(0x23a)][_0x22f48c(0x531)][_0x22f48c(0x1f0)](this,_0x2db08b,_0x507f62,_0x5b634d,_0x4db510);},Bitmap['prototype'][_0x5f3bde(0x54c)]=function(_0x3ff34d,_0x3ede70,_0x7d06b1,_0x5905a2){const _0x3017b0=_0x5f3bde,_0x5eec57=this[_0x3017b0(0x432)];_0x5eec57[_0x3017b0(0x49b)]=this[_0x3017b0(0x594)],_0x5eec57[_0x3017b0(0x4e8)](_0x3ff34d,_0x3ede70+0x2,_0x7d06b1+0x2,_0x5905a2);},VisuMZ[_0x5f3bde(0x23a)]['Input_clear']=Input['clear'],Input[_0x5f3bde(0x6ec)]=function(){const _0x18b7a1=_0x5f3bde;VisuMZ['CoreEngine'][_0x18b7a1(0x596)][_0x18b7a1(0x1f0)](this),this['_inputString']=undefined,this[_0x18b7a1(0x607)]=undefined,this[_0x18b7a1(0x313)]=Input['keyRepeatWait'];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x366)]=Input[_0x5f3bde(0x816)],Input[_0x5f3bde(0x816)]=function(){const _0x4d708e=_0x5f3bde;VisuMZ[_0x4d708e(0x23a)]['Input_update']['call'](this);if(this['_gamepadWait'])this['_gamepadWait']--;},VisuMZ['CoreEngine'][_0x5f3bde(0x7f7)]=Input[_0x5f3bde(0x32a)],Input[_0x5f3bde(0x32a)]=function(){const _0x272b79=_0x5f3bde;if(this['_gamepadWait'])return;VisuMZ[_0x272b79(0x23a)][_0x272b79(0x7f7)][_0x272b79(0x1f0)](this);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6e0)]=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x57110c=_0x5f3bde;VisuMZ[_0x57110c(0x23a)][_0x57110c(0x6e0)][_0x57110c(0x1f0)](this),document['addEventListener'](_0x57110c(0x29e),this[_0x57110c(0x623)][_0x57110c(0x687)](this));},VisuMZ['CoreEngine'][_0x5f3bde(0x611)]=Input[_0x5f3bde(0x553)],Input[_0x5f3bde(0x553)]=function(_0x4f1e03){const _0x1d7549=_0x5f3bde;this[_0x1d7549(0x607)]=_0x4f1e03[_0x1d7549(0x742)],VisuMZ['CoreEngine'][_0x1d7549(0x611)][_0x1d7549(0x1f0)](this,_0x4f1e03);},Input[_0x5f3bde(0x623)]=function(_0x316cf2){this['_registerKeyInput'](_0x316cf2);},Input['_registerKeyInput']=function(_0x21be88){const _0x23b1a4=_0x5f3bde;this[_0x23b1a4(0x607)]=_0x21be88['keyCode'];let _0x2e81ec=String[_0x23b1a4(0x7ac)](_0x21be88['charCode']);this[_0x23b1a4(0x826)]===undefined?this['_inputString']=_0x2e81ec:this[_0x23b1a4(0x826)]+=_0x2e81ec;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x585)]=Input['_shouldPreventDefault'],Input[_0x5f3bde(0x751)]=function(_0x273635){const _0x20b88f=_0x5f3bde;if(_0x273635===0x8)return![];return VisuMZ[_0x20b88f(0x23a)][_0x20b88f(0x585)][_0x20b88f(0x1f0)](this,_0x273635);},Input['isSpecialCode']=function(_0x2e67bb){const _0x132e63=_0x5f3bde;if(_0x2e67bb['match'](/backspace/i))return this[_0x132e63(0x607)]===0x8;if(_0x2e67bb[_0x132e63(0x772)](/enter/i))return this[_0x132e63(0x607)]===0xd;if(_0x2e67bb[_0x132e63(0x772)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x5f3bde(0x5d9)]=function(){const _0x4f3cd4=_0x5f3bde;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4f3cd4(0x293)](this[_0x4f3cd4(0x607)]);},Input[_0x5f3bde(0x34b)]=function(){const _0x167ad3=_0x5f3bde;return[0x25,0x26,0x27,0x28][_0x167ad3(0x293)](this['_inputSpecialKeyCode']);},Input[_0x5f3bde(0x627)]=function(){const _0x17143f=_0x5f3bde;if(navigator[_0x17143f(0x645)]){const _0x630c90=navigator[_0x17143f(0x645)]();if(_0x630c90)for(const _0x45ecfc of _0x630c90){if(_0x45ecfc&&_0x45ecfc['connected'])return!![];}}return![];},Input[_0x5f3bde(0x7fc)]=function(){const _0x115a71=_0x5f3bde;if(navigator[_0x115a71(0x645)]){const _0x4e8001=navigator[_0x115a71(0x645)]();if(_0x4e8001)for(const _0x547df8 of _0x4e8001){if(_0x547df8&&_0x547df8[_0x115a71(0x785)]){if(this[_0x115a71(0x286)](_0x547df8))return!![];}}}return![];},Input['isGamepadButtonPressed']=function(_0x1d48a3){const _0x382877=_0x5f3bde,_0x2c9bf=_0x1d48a3[_0x382877(0x755)];for(let _0x1502d9=0x0;_0x1502d9<_0x2c9bf[_0x382877(0x6d7)];_0x1502d9++){if(_0x2c9bf[_0x1502d9][_0x382877(0x56a)])return!![];}return![];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x49c)]=Tilemap[_0x5f3bde(0x371)][_0x5f3bde(0x598)],Tilemap[_0x5f3bde(0x371)][_0x5f3bde(0x598)]=function(_0x345f13,_0x4454c3,_0x5ba51d,_0x2d779a){const _0x414ea7=_0x5f3bde;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ['CoreEngine'][_0x414ea7(0x49c)][_0x414ea7(0x1f0)](this,_0x345f13,_0x4454c3,_0x5ba51d,_0x2d779a);},Tilemap[_0x5f3bde(0x3eb)][_0x5f3bde(0x371)][_0x5f3bde(0x4a3)]=function(){const _0x4c5be8=_0x5f3bde;this[_0x4c5be8(0x351)]();for(let _0x53baca=0x0;_0x53baca<Tilemap[_0x4c5be8(0x4fb)][_0x4c5be8(0x625)];_0x53baca++){const _0x2c16e3=new PIXI[(_0x4c5be8(0x45e))]();_0x2c16e3[_0x4c5be8(0x2fe)](0x800,0x800),VisuMZ['CoreEngine'][_0x4c5be8(0x22e)][_0x4c5be8(0x338)][_0x4c5be8(0x4ab)]&&(_0x2c16e3['scaleMode']=PIXI['SCALE_MODES'][_0x4c5be8(0x408)]),this[_0x4c5be8(0x51a)][_0x4c5be8(0x296)](_0x2c16e3);}},WindowLayer[_0x5f3bde(0x371)][_0x5f3bde(0x6d1)]=function(){const _0x354ae1=_0x5f3bde;return SceneManager&&SceneManager[_0x354ae1(0x77c)]?SceneManager['_scene'][_0x354ae1(0x7f3)]():!![];},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer['prototype'][_0x5f3bde(0x282)],WindowLayer[_0x5f3bde(0x371)][_0x5f3bde(0x282)]=function render(_0x133240){const _0x5785fb=_0x5f3bde;this[_0x5785fb(0x6d1)]()?VisuMZ[_0x5785fb(0x23a)][_0x5785fb(0x641)][_0x5785fb(0x1f0)](this,_0x133240):this[_0x5785fb(0x2e0)](_0x133240);},WindowLayer[_0x5f3bde(0x371)]['renderNoMask']=function render(_0x449cab){const _0x19152c=_0x5f3bde;if(!this[_0x19152c(0x402)])return;const _0x4c0319=new PIXI[(_0x19152c(0x7e5))](),_0x259949=_0x449cab['gl'],_0x24cfa9=this[_0x19152c(0x773)][_0x19152c(0x2c0)]();_0x449cab['framebuffer'][_0x19152c(0x3c6)](),_0x4c0319['transform']=this[_0x19152c(0x5c7)],_0x449cab[_0x19152c(0x3fb)][_0x19152c(0x719)](),_0x259949['enable'](_0x259949[_0x19152c(0x1a8)]);while(_0x24cfa9[_0x19152c(0x6d7)]>0x0){const _0x54b2ef=_0x24cfa9[_0x19152c(0x1e2)]();_0x54b2ef['_isWindow']&&_0x54b2ef[_0x19152c(0x402)]&&_0x54b2ef[_0x19152c(0x66c)]>0x0&&(_0x259949[_0x19152c(0x47b)](_0x259949[_0x19152c(0x82b)],0x0,~0x0),_0x259949[_0x19152c(0x1a7)](_0x259949[_0x19152c(0x1a6)],_0x259949[_0x19152c(0x1a6)],_0x259949[_0x19152c(0x1a6)]),_0x54b2ef[_0x19152c(0x282)](_0x449cab),_0x449cab[_0x19152c(0x3fb)][_0x19152c(0x719)](),_0x4c0319[_0x19152c(0x6ec)](),_0x259949[_0x19152c(0x47b)](_0x259949[_0x19152c(0x6f1)],0x1,~0x0),_0x259949[_0x19152c(0x1a7)](_0x259949[_0x19152c(0x4f5)],_0x259949[_0x19152c(0x4f5)],_0x259949[_0x19152c(0x4f5)]),_0x259949['blendFunc'](_0x259949[_0x19152c(0x672)],_0x259949[_0x19152c(0x1c8)]),_0x4c0319[_0x19152c(0x282)](_0x449cab),_0x449cab['batch'][_0x19152c(0x719)](),_0x259949[_0x19152c(0x491)](_0x259949['ONE'],_0x259949[_0x19152c(0x2fc)]));}_0x259949['disable'](_0x259949[_0x19152c(0x1a8)]),_0x259949[_0x19152c(0x6ec)](_0x259949[_0x19152c(0x30f)]),_0x259949[_0x19152c(0x19d)](0x0),_0x449cab[_0x19152c(0x3fb)][_0x19152c(0x719)]();for(const _0x1d8fa4 of this['children']){!_0x1d8fa4[_0x19152c(0x4b3)]&&_0x1d8fa4[_0x19152c(0x402)]&&_0x1d8fa4[_0x19152c(0x282)](_0x449cab);}_0x449cab['batch'][_0x19152c(0x719)]();},DataManager[_0x5f3bde(0x2bf)]=function(_0x24b533){const _0x5b2e1f=_0x5f3bde;return this['isItem'](_0x24b533)&&_0x24b533[_0x5b2e1f(0x3f6)]===0x2;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x27c)]=DataManager[_0x5f3bde(0x80e)],DataManager['setupNewGame']=function(){const _0x238e60=_0x5f3bde;VisuMZ['CoreEngine'][_0x238e60(0x27c)][_0x238e60(0x1f0)](this),this[_0x238e60(0x45f)](),this[_0x238e60(0x4f9)]();},DataManager[_0x5f3bde(0x45f)]=function(){const _0x3a2fb0=_0x5f3bde;if($gameTemp['isPlaytest']()){const _0x20d04b=VisuMZ[_0x3a2fb0(0x23a)][_0x3a2fb0(0x22e)][_0x3a2fb0(0x338)][_0x3a2fb0(0x245)];if(_0x20d04b>0x0)$gameTemp['reserveCommonEvent'](_0x20d04b);}},DataManager[_0x5f3bde(0x4f9)]=function(){const _0x54b3ff=_0x5f3bde,_0x23213c=VisuMZ[_0x54b3ff(0x23a)][_0x54b3ff(0x22e)][_0x54b3ff(0x338)][_0x54b3ff(0x2b3)]||0x0;if(_0x23213c>0x0)$gameTemp['reserveCommonEvent'](_0x23213c);},DataManager[_0x5f3bde(0x34e)]=function(_0x29e82e){const _0x5522e2=_0x5f3bde,_0x22e2b2=$dataTroops[_0x29e82e];if(!_0x22e2b2)return'';let _0x2e8c15='';_0x2e8c15+=_0x22e2b2['name'];for(const _0x21d6d3 of _0x22e2b2[_0x5522e2(0x802)]){for(const _0x1f5320 of _0x21d6d3['list']){[0x6c,0x198][_0x5522e2(0x638)](_0x1f5320[_0x5522e2(0x616)])&&(_0x2e8c15+='\x0a',_0x2e8c15+=_0x1f5320['parameters'][0x0]);}}return _0x2e8c15;},StorageManager['jsonToZip']=function(_0x200490){return new Promise((_0x3ad4f3,_0xa95e43)=>{const _0x5be013=_0x278f;try{const _0xa1da42=pako['deflate'](_0x200490,{'to':_0x5be013(0x670),'level':0x1});if(_0xa1da42['length']>=0xc350){}_0x3ad4f3(_0xa1da42);}catch(_0x3e8752){_0xa95e43(_0x3e8752);}});},TextManager['stringKeyMap']=['','','','CANCEL','','',_0x5f3bde(0x551),'',_0x5f3bde(0x271),'TAB','','',_0x5f3bde(0x3e0),_0x5f3bde(0x53a),'ENTER_SPECIAL','','SHIFT',_0x5f3bde(0x30c),'ALT',_0x5f3bde(0x508),_0x5f3bde(0x1b1),_0x5f3bde(0x222),_0x5f3bde(0x71a),'JUNJA',_0x5f3bde(0x3ec),_0x5f3bde(0x666),'',_0x5f3bde(0x3ef),_0x5f3bde(0x79c),'NONCONVERT',_0x5f3bde(0x5bb),_0x5f3bde(0x1af),'SPACE',_0x5f3bde(0x43a),'PGDN',_0x5f3bde(0x3b3),_0x5f3bde(0x7bb),_0x5f3bde(0x204),'UP',_0x5f3bde(0x267),'DOWN',_0x5f3bde(0x745),_0x5f3bde(0x62e),_0x5f3bde(0x2c5),_0x5f3bde(0x714),_0x5f3bde(0x7e3),_0x5f3bde(0x4ae),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x5f3bde(0x2f7),_0x5f3bde(0x5dd),_0x5f3bde(0x6b1),_0x5f3bde(0x1e1),_0x5f3bde(0x300),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x5f3bde(0x23f),'',_0x5f3bde(0x526),_0x5f3bde(0x6f9),_0x5f3bde(0x4ac),_0x5f3bde(0x27f),_0x5f3bde(0x33c),'NUMPAD4','NUMPAD5',_0x5f3bde(0x22c),_0x5f3bde(0x2dd),_0x5f3bde(0x660),_0x5f3bde(0x688),_0x5f3bde(0x3bc),_0x5f3bde(0x35e),'SEPARATOR',_0x5f3bde(0x3a5),_0x5f3bde(0x2d6),_0x5f3bde(0x36b),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x5f3bde(0x2be),_0x5f3bde(0x255),_0x5f3bde(0x809),_0x5f3bde(0x6e7),'F15',_0x5f3bde(0x37d),_0x5f3bde(0x827),'F18',_0x5f3bde(0x4d0),_0x5f3bde(0x698),_0x5f3bde(0x5fa),'F22',_0x5f3bde(0x32b),_0x5f3bde(0x45a),'','','','','','','','',_0x5f3bde(0x330),_0x5f3bde(0x6d6),_0x5f3bde(0x2ed),'WIN_OEM_FJ_MASSHOU',_0x5f3bde(0x75b),_0x5f3bde(0x1fc),_0x5f3bde(0x741),'','','','','','','','','','CIRCUMFLEX',_0x5f3bde(0x1a9),_0x5f3bde(0x4a1),'HASH',_0x5f3bde(0x447),_0x5f3bde(0x1f2),'AMPERSAND',_0x5f3bde(0x327),'OPEN_PAREN',_0x5f3bde(0x1e0),'ASTERISK',_0x5f3bde(0x794),_0x5f3bde(0x39c),_0x5f3bde(0x803),_0x5f3bde(0x7e4),_0x5f3bde(0x68b),_0x5f3bde(0x496),'','','','','VOLUME_MUTE',_0x5f3bde(0x3bf),'VOLUME_UP','','','SEMICOLON',_0x5f3bde(0x6b1),_0x5f3bde(0x52a),'MINUS',_0x5f3bde(0x214),_0x5f3bde(0x3c2),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x5f3bde(0x4fc),_0x5f3bde(0x4c1),'CLOSE_BRACKET',_0x5f3bde(0x560),'',_0x5f3bde(0x593),_0x5f3bde(0x1c9),'',_0x5f3bde(0x467),_0x5f3bde(0x778),'',_0x5f3bde(0x6ef),'','',_0x5f3bde(0x801),_0x5f3bde(0x27e),_0x5f3bde(0x4c6),_0x5f3bde(0x5b5),'WIN_OEM_PA3','WIN_OEM_WSCTRL','WIN_OEM_CUSEL',_0x5f3bde(0x617),_0x5f3bde(0x726),_0x5f3bde(0x363),_0x5f3bde(0x227),_0x5f3bde(0x654),_0x5f3bde(0x530),_0x5f3bde(0x81b),_0x5f3bde(0x717),_0x5f3bde(0x720),'EREOF',_0x5f3bde(0x55f),_0x5f3bde(0x60e),'','PA1',_0x5f3bde(0x1d9),''],TextManager[_0x5f3bde(0x256)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x57c)][_0x5f3bde(0x6e9)],TextManager[_0x5f3bde(0x203)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)]['ButtonAssist'][_0x5f3bde(0x451)],TextManager[_0x5f3bde(0x4cf)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x57c)][_0x5f3bde(0x25b)],VisuMZ['CoreEngine'][_0x5f3bde(0x7fb)]=TextManager[_0x5f3bde(0x5c4)],TextManager[_0x5f3bde(0x5c4)]=function(_0x594b1d){const _0x4f299a=_0x5f3bde;return typeof _0x594b1d===_0x4f299a(0x379)?VisuMZ[_0x4f299a(0x23a)]['TextManager_param'][_0x4f299a(0x1f0)](this,_0x594b1d):this[_0x4f299a(0x5b0)](_0x594b1d);},TextManager[_0x5f3bde(0x5b0)]=function(_0x4cbb52){const _0x173ed4=_0x5f3bde;_0x4cbb52=String(_0x4cbb52||'')[_0x173ed4(0x22d)]();const _0xd030b9=VisuMZ[_0x173ed4(0x23a)]['Settings'][_0x173ed4(0x275)];if(_0x4cbb52===_0x173ed4(0x3ea))return $dataSystem[_0x173ed4(0x2ac)][_0x173ed4(0x1fb)][0x0];if(_0x4cbb52==='MAXMP')return $dataSystem[_0x173ed4(0x2ac)][_0x173ed4(0x1fb)][0x1];if(_0x4cbb52===_0x173ed4(0x6d0))return $dataSystem[_0x173ed4(0x2ac)][_0x173ed4(0x1fb)][0x2];if(_0x4cbb52==='DEF')return $dataSystem[_0x173ed4(0x2ac)][_0x173ed4(0x1fb)][0x3];if(_0x4cbb52==='MAT')return $dataSystem[_0x173ed4(0x2ac)][_0x173ed4(0x1fb)][0x4];if(_0x4cbb52===_0x173ed4(0x558))return $dataSystem[_0x173ed4(0x2ac)][_0x173ed4(0x1fb)][0x5];if(_0x4cbb52===_0x173ed4(0x5ec))return $dataSystem['terms'][_0x173ed4(0x1fb)][0x6];if(_0x4cbb52===_0x173ed4(0x6dc))return $dataSystem[_0x173ed4(0x2ac)][_0x173ed4(0x1fb)][0x7];if(_0x4cbb52==='HIT')return _0xd030b9[_0x173ed4(0x796)];if(_0x4cbb52===_0x173ed4(0x774))return _0xd030b9[_0x173ed4(0x47e)];if(_0x4cbb52===_0x173ed4(0x6d8))return _0xd030b9[_0x173ed4(0x5f6)];if(_0x4cbb52===_0x173ed4(0x18d))return _0xd030b9[_0x173ed4(0x6c9)];if(_0x4cbb52==='MEV')return _0xd030b9['XParamVocab4'];if(_0x4cbb52==='MRF')return _0xd030b9[_0x173ed4(0x6cf)];if(_0x4cbb52===_0x173ed4(0x580))return _0xd030b9['XParamVocab6'];if(_0x4cbb52===_0x173ed4(0x77f))return _0xd030b9[_0x173ed4(0x45b)];if(_0x4cbb52===_0x173ed4(0x54f))return _0xd030b9['XParamVocab8'];if(_0x4cbb52==='TRG')return _0xd030b9[_0x173ed4(0x40e)];if(_0x4cbb52===_0x173ed4(0x82f))return _0xd030b9[_0x173ed4(0x756)];if(_0x4cbb52===_0x173ed4(0x6d2))return _0xd030b9['SParamVocab1'];if(_0x4cbb52===_0x173ed4(0x6aa))return _0xd030b9[_0x173ed4(0x62f)];if(_0x4cbb52==='PHA')return _0xd030b9[_0x173ed4(0x7d5)];if(_0x4cbb52===_0x173ed4(0x50c))return _0xd030b9[_0x173ed4(0x20b)];if(_0x4cbb52===_0x173ed4(0x368))return _0xd030b9[_0x173ed4(0x66e)];if(_0x4cbb52===_0x173ed4(0x63d))return _0xd030b9[_0x173ed4(0x747)];if(_0x4cbb52===_0x173ed4(0x60a))return _0xd030b9[_0x173ed4(0x81a)];if(_0x4cbb52==='FDR')return _0xd030b9[_0x173ed4(0x7fd)];if(_0x4cbb52==='EXR')return _0xd030b9[_0x173ed4(0x3ba)];if(VisuMZ[_0x173ed4(0x23a)][_0x173ed4(0x279)][_0x4cbb52])return VisuMZ[_0x173ed4(0x23a)][_0x173ed4(0x279)][_0x4cbb52];return'';},TextManager[_0x5f3bde(0x25a)]=function(_0x28392f){const _0x3f4f31=_0x5f3bde;if(_0x28392f==='cancel')_0x28392f=_0x3f4f31(0x501);let _0x44bd52=[];for(let _0x236140 in Input[_0x3f4f31(0x619)]){_0x236140=Number(_0x236140);if(_0x236140>=0x60&&_0x236140<=0x69)continue;if([0x12,0x20][_0x3f4f31(0x638)](_0x236140))continue;_0x28392f===Input[_0x3f4f31(0x619)][_0x236140]&&_0x44bd52[_0x3f4f31(0x296)](_0x236140);}for(let _0x4d4fb6=0x0;_0x4d4fb6<_0x44bd52[_0x3f4f31(0x6d7)];_0x4d4fb6++){_0x44bd52[_0x4d4fb6]=TextManager[_0x3f4f31(0x22f)][_0x44bd52[_0x4d4fb6]];}return this[_0x3f4f31(0x223)](_0x44bd52);},TextManager['makeInputButtonString']=function(_0x434801){const _0x54a93f=_0x5f3bde,_0xfa8ab2=VisuMZ[_0x54a93f(0x23a)]['Settings'][_0x54a93f(0x57c)],_0x6bd1fd=_0xfa8ab2[_0x54a93f(0x629)],_0x4e43c7=_0x434801['pop'](),_0x3a1b2a='Key%1'[_0x54a93f(0x763)](_0x4e43c7);return _0xfa8ab2[_0x3a1b2a]?_0xfa8ab2[_0x3a1b2a]:_0x6bd1fd[_0x54a93f(0x763)](_0x4e43c7);},TextManager['getInputMultiButtonStrings']=function(_0x181b2e,_0x1ea0ab){const _0x5481c0=_0x5f3bde,_0x3255ed=VisuMZ[_0x5481c0(0x23a)]['Settings'][_0x5481c0(0x57c)],_0x48d951=_0x3255ed[_0x5481c0(0x190)],_0x2ecdcc=this[_0x5481c0(0x25a)](_0x181b2e),_0x5de705=this[_0x5481c0(0x25a)](_0x1ea0ab);return _0x48d951[_0x5481c0(0x763)](_0x2ecdcc,_0x5de705);},VisuMZ['CoreEngine']['ColorManager_loadWindowskin']=ColorManager['loadWindowskin'],ColorManager[_0x5f3bde(0x79a)]=function(){const _0x3118bf=_0x5f3bde;VisuMZ['CoreEngine'][_0x3118bf(0x3d4)]['call'](this),this[_0x3118bf(0x787)]=this[_0x3118bf(0x787)]||{};},ColorManager[_0x5f3bde(0x254)]=function(_0xe09f56,_0x266061){const _0x3c4f12=_0x5f3bde;return _0x266061=String(_0x266061),this[_0x3c4f12(0x787)]=this[_0x3c4f12(0x787)]||{},_0x266061[_0x3c4f12(0x772)](/#(.*)/i)?this[_0x3c4f12(0x787)][_0xe09f56]='#%1'[_0x3c4f12(0x763)](String(RegExp['$1'])):this[_0x3c4f12(0x787)][_0xe09f56]=this[_0x3c4f12(0x5ef)](Number(_0x266061)),this[_0x3c4f12(0x787)][_0xe09f56];},ColorManager[_0x5f3bde(0x61f)]=function(_0x556e3d){const _0x3ca9d6=_0x5f3bde;return _0x556e3d=String(_0x556e3d),_0x556e3d['match'](/#(.*)/i)?_0x3ca9d6(0x364)[_0x3ca9d6(0x763)](String(RegExp['$1'])):this['textColor'](Number(_0x556e3d));},ColorManager[_0x5f3bde(0x5da)]=function(){const _0x2c6bf1=_0x5f3bde;this[_0x2c6bf1(0x787)]={};},ColorManager['normalColor']=function(){const _0xbc0d33=_0x5f3bde,_0x4ce464=_0xbc0d33(0x519);this[_0xbc0d33(0x787)]=this[_0xbc0d33(0x787)]||{};if(this[_0xbc0d33(0x787)][_0x4ce464])return this[_0xbc0d33(0x787)][_0x4ce464];const _0x46be49=VisuMZ[_0xbc0d33(0x23a)][_0xbc0d33(0x22e)]['Color'][_0xbc0d33(0x494)];return this[_0xbc0d33(0x254)](_0x4ce464,_0x46be49);},ColorManager['systemColor']=function(){const _0x42a04d=_0x5f3bde,_0x3ef0dc=_0x42a04d(0x288);this['_colorCache']=this[_0x42a04d(0x787)]||{};if(this[_0x42a04d(0x787)][_0x3ef0dc])return this['_colorCache'][_0x3ef0dc];const _0x413bf5=VisuMZ[_0x42a04d(0x23a)][_0x42a04d(0x22e)][_0x42a04d(0x3bb)][_0x42a04d(0x4c5)];return this['getColorDataFromPluginParameters'](_0x3ef0dc,_0x413bf5);},ColorManager['crisisColor']=function(){const _0x1ae20d=_0x5f3bde,_0x517213='_stored_crisisColor';this[_0x1ae20d(0x787)]=this[_0x1ae20d(0x787)]||{};if(this[_0x1ae20d(0x787)][_0x517213])return this['_colorCache'][_0x517213];const _0x16e7f6=VisuMZ[_0x1ae20d(0x23a)][_0x1ae20d(0x22e)]['Color'][_0x1ae20d(0x268)];return this[_0x1ae20d(0x254)](_0x517213,_0x16e7f6);},ColorManager[_0x5f3bde(0x54d)]=function(){const _0x2321e0=_0x5f3bde,_0x32a435=_0x2321e0(0x5df);this[_0x2321e0(0x787)]=this[_0x2321e0(0x787)]||{};if(this[_0x2321e0(0x787)][_0x32a435])return this['_colorCache'][_0x32a435];const _0x42f13b=VisuMZ[_0x2321e0(0x23a)][_0x2321e0(0x22e)][_0x2321e0(0x3bb)][_0x2321e0(0x651)];return this[_0x2321e0(0x254)](_0x32a435,_0x42f13b);},ColorManager[_0x5f3bde(0x19c)]=function(){const _0x236068=_0x5f3bde,_0x11e289='_stored_gaugeBackColor';this[_0x236068(0x787)]=this['_colorCache']||{};if(this[_0x236068(0x787)][_0x11e289])return this['_colorCache'][_0x11e289];const _0x26c6de=VisuMZ[_0x236068(0x23a)][_0x236068(0x22e)][_0x236068(0x3bb)][_0x236068(0x1b9)];return this['getColorDataFromPluginParameters'](_0x11e289,_0x26c6de);},ColorManager[_0x5f3bde(0x326)]=function(){const _0x4599ed=_0x5f3bde,_0x562799='_stored_hpGaugeColor1';this[_0x4599ed(0x787)]=this['_colorCache']||{};if(this['_colorCache'][_0x562799])return this[_0x4599ed(0x787)][_0x562799];const _0x32f5d2=VisuMZ[_0x4599ed(0x23a)][_0x4599ed(0x22e)][_0x4599ed(0x3bb)]['ColorHPGauge1'];return this[_0x4599ed(0x254)](_0x562799,_0x32f5d2);},ColorManager[_0x5f3bde(0x1e8)]=function(){const _0x2a9b91=_0x5f3bde,_0x2009be=_0x2a9b91(0x311);this[_0x2a9b91(0x787)]=this[_0x2a9b91(0x787)]||{};if(this[_0x2a9b91(0x787)][_0x2009be])return this[_0x2a9b91(0x787)][_0x2009be];const _0x297100=VisuMZ[_0x2a9b91(0x23a)][_0x2a9b91(0x22e)][_0x2a9b91(0x3bb)]['ColorHPGauge2'];return this[_0x2a9b91(0x254)](_0x2009be,_0x297100);},ColorManager[_0x5f3bde(0x263)]=function(){const _0xc1cbb4=_0x5f3bde,_0x2dda2f=_0xc1cbb4(0x2a3);this['_colorCache']=this[_0xc1cbb4(0x787)]||{};if(this[_0xc1cbb4(0x787)][_0x2dda2f])return this['_colorCache'][_0x2dda2f];const _0x10fa39=VisuMZ[_0xc1cbb4(0x23a)][_0xc1cbb4(0x22e)][_0xc1cbb4(0x3bb)][_0xc1cbb4(0x6f3)];return this[_0xc1cbb4(0x254)](_0x2dda2f,_0x10fa39);},ColorManager['mpGaugeColor2']=function(){const _0x1806db=_0x5f3bde,_0x53f3aa=_0x1806db(0x49f);this['_colorCache']=this[_0x1806db(0x787)]||{};if(this['_colorCache'][_0x53f3aa])return this[_0x1806db(0x787)][_0x53f3aa];const _0x468b9d=VisuMZ[_0x1806db(0x23a)][_0x1806db(0x22e)][_0x1806db(0x3bb)]['ColorMPGauge2'];return this[_0x1806db(0x254)](_0x53f3aa,_0x468b9d);},ColorManager[_0x5f3bde(0x3a2)]=function(){const _0x272f2c=_0x5f3bde,_0x4e83df='_stored_mpCostColor';this['_colorCache']=this[_0x272f2c(0x787)]||{};if(this[_0x272f2c(0x787)][_0x4e83df])return this['_colorCache'][_0x4e83df];const _0x3d2f9a=VisuMZ['CoreEngine'][_0x272f2c(0x22e)]['Color'][_0x272f2c(0x35a)];return this[_0x272f2c(0x254)](_0x4e83df,_0x3d2f9a);},ColorManager[_0x5f3bde(0x42a)]=function(){const _0x508680=_0x5f3bde,_0x531aa8=_0x508680(0x4d4);this[_0x508680(0x787)]=this['_colorCache']||{};if(this[_0x508680(0x787)][_0x531aa8])return this[_0x508680(0x787)][_0x531aa8];const _0x2f4589=VisuMZ['CoreEngine'][_0x508680(0x22e)][_0x508680(0x3bb)][_0x508680(0x707)];return this['getColorDataFromPluginParameters'](_0x531aa8,_0x2f4589);},ColorManager['powerDownColor']=function(){const _0x13cadf=_0x5f3bde,_0x3fe73e='_stored_powerDownColor';this[_0x13cadf(0x787)]=this[_0x13cadf(0x787)]||{};if(this[_0x13cadf(0x787)][_0x3fe73e])return this['_colorCache'][_0x3fe73e];const _0x1de983=VisuMZ[_0x13cadf(0x23a)][_0x13cadf(0x22e)][_0x13cadf(0x3bb)][_0x13cadf(0x3da)];return this[_0x13cadf(0x254)](_0x3fe73e,_0x1de983);},ColorManager[_0x5f3bde(0x808)]=function(){const _0x2feeca=_0x5f3bde,_0x4acf52=_0x2feeca(0x76e);this[_0x2feeca(0x787)]=this[_0x2feeca(0x787)]||{};if(this['_colorCache'][_0x4acf52])return this[_0x2feeca(0x787)][_0x4acf52];const _0x55239d=VisuMZ[_0x2feeca(0x23a)][_0x2feeca(0x22e)][_0x2feeca(0x3bb)][_0x2feeca(0x4a5)];return this[_0x2feeca(0x254)](_0x4acf52,_0x55239d);},ColorManager[_0x5f3bde(0x6fc)]=function(){const _0x2c4b51=_0x5f3bde,_0x528467=_0x2c4b51(0x400);this[_0x2c4b51(0x787)]=this[_0x2c4b51(0x787)]||{};if(this[_0x2c4b51(0x787)][_0x528467])return this['_colorCache'][_0x528467];const _0x4b3a0f=VisuMZ[_0x2c4b51(0x23a)][_0x2c4b51(0x22e)]['Color'][_0x2c4b51(0x32d)];return this[_0x2c4b51(0x254)](_0x528467,_0x4b3a0f);},ColorManager[_0x5f3bde(0x4bc)]=function(){const _0x2103d9=_0x5f3bde,_0x63272a=_0x2103d9(0x693);this[_0x2103d9(0x787)]=this[_0x2103d9(0x787)]||{};if(this[_0x2103d9(0x787)][_0x63272a])return this[_0x2103d9(0x787)][_0x63272a];const _0x595b95=VisuMZ[_0x2103d9(0x23a)][_0x2103d9(0x22e)][_0x2103d9(0x3bb)]['ColorTPGauge1'];return this[_0x2103d9(0x254)](_0x63272a,_0x595b95);},ColorManager['tpGaugeColor2']=function(){const _0x210bf0=_0x5f3bde,_0x101659='_stored_tpGaugeColor2';this[_0x210bf0(0x787)]=this['_colorCache']||{};if(this[_0x210bf0(0x787)][_0x101659])return this['_colorCache'][_0x101659];const _0x15d03a=VisuMZ['CoreEngine']['Settings'][_0x210bf0(0x3bb)][_0x210bf0(0x5a3)];return this[_0x210bf0(0x254)](_0x101659,_0x15d03a);},ColorManager['tpCostColor']=function(){const _0x3fc036=_0x5f3bde,_0x7f5038=_0x3fc036(0x6a0);this[_0x3fc036(0x787)]=this[_0x3fc036(0x787)]||{};if(this[_0x3fc036(0x787)][_0x7f5038])return this[_0x3fc036(0x787)][_0x7f5038];const _0x1a7e77=VisuMZ['CoreEngine'][_0x3fc036(0x22e)][_0x3fc036(0x3bb)]['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x7f5038,_0x1a7e77);},ColorManager[_0x5f3bde(0x4c4)]=function(){const _0x25f2b6=_0x5f3bde,_0x1927c5=_0x25f2b6(0x64f);this[_0x25f2b6(0x787)]=this['_colorCache']||{};if(this[_0x25f2b6(0x787)][_0x1927c5])return this[_0x25f2b6(0x787)][_0x1927c5];const _0x59f8a5=VisuMZ[_0x25f2b6(0x23a)]['Settings'][_0x25f2b6(0x3bb)][_0x25f2b6(0x30d)];return this['getColorDataFromPluginParameters'](_0x1927c5,_0x59f8a5);},ColorManager[_0x5f3bde(0x4ba)]=function(){const _0x1456fe=_0x5f3bde,_0x32ba3b=_0x1456fe(0x2a7);this[_0x1456fe(0x787)]=this[_0x1456fe(0x787)]||{};if(this[_0x1456fe(0x787)][_0x32ba3b])return this['_colorCache'][_0x32ba3b];const _0x2aeb7f=VisuMZ[_0x1456fe(0x23a)][_0x1456fe(0x22e)][_0x1456fe(0x3bb)][_0x1456fe(0x308)];return this['getColorDataFromPluginParameters'](_0x32ba3b,_0x2aeb7f);},ColorManager[_0x5f3bde(0x78d)]=function(){const _0x23065f=_0x5f3bde,_0x5b73b0=_0x23065f(0x28b);this['_colorCache']=this['_colorCache']||{};if(this[_0x23065f(0x787)][_0x5b73b0])return this['_colorCache'][_0x5b73b0];const _0x3d6fb8=VisuMZ[_0x23065f(0x23a)][_0x23065f(0x22e)][_0x23065f(0x3bb)][_0x23065f(0x5ce)];return this[_0x23065f(0x254)](_0x5b73b0,_0x3d6fb8);},ColorManager['maxLvGaugeColor1']=function(){const _0x401c6d=_0x5f3bde,_0x7ccbe2=_0x401c6d(0x446);this[_0x401c6d(0x787)]=this[_0x401c6d(0x787)]||{};if(this[_0x401c6d(0x787)][_0x7ccbe2])return this[_0x401c6d(0x787)][_0x7ccbe2];const _0x56af49=VisuMZ[_0x401c6d(0x23a)][_0x401c6d(0x22e)][_0x401c6d(0x3bb)][_0x401c6d(0x4fd)];return this['getColorDataFromPluginParameters'](_0x7ccbe2,_0x56af49);},ColorManager['maxLvGaugeColor2']=function(){const _0x3028d4=_0x5f3bde,_0x5e1e59=_0x3028d4(0x685);this[_0x3028d4(0x787)]=this[_0x3028d4(0x787)]||{};if(this['_colorCache'][_0x5e1e59])return this['_colorCache'][_0x5e1e59];const _0x240128=VisuMZ[_0x3028d4(0x23a)][_0x3028d4(0x22e)][_0x3028d4(0x3bb)]['ColorMaxLvGauge2'];return this['getColorDataFromPluginParameters'](_0x5e1e59,_0x240128);},ColorManager[_0x5f3bde(0x465)]=function(_0xecd951){const _0xed40c3=_0x5f3bde;return VisuMZ[_0xed40c3(0x23a)][_0xed40c3(0x22e)][_0xed40c3(0x3bb)][_0xed40c3(0x2ca)][_0xed40c3(0x1f0)](this,_0xecd951);},ColorManager[_0x5f3bde(0x7b8)]=function(_0x4f0487){const _0x911082=_0x5f3bde;return VisuMZ[_0x911082(0x23a)][_0x911082(0x22e)][_0x911082(0x3bb)][_0x911082(0x62d)][_0x911082(0x1f0)](this,_0x4f0487);},ColorManager[_0x5f3bde(0x1b8)]=function(_0x59ba13){const _0x53f46f=_0x5f3bde;return VisuMZ[_0x53f46f(0x23a)][_0x53f46f(0x22e)][_0x53f46f(0x3bb)][_0x53f46f(0x757)]['call'](this,_0x59ba13);},ColorManager['paramchangeTextColor']=function(_0x184fee){const _0x2b07a6=_0x5f3bde;return VisuMZ[_0x2b07a6(0x23a)]['Settings'][_0x2b07a6(0x3bb)][_0x2b07a6(0x3c7)]['call'](this,_0x184fee);},ColorManager['damageColor']=function(_0x3c13ba){const _0x2e5c35=_0x5f3bde;return VisuMZ[_0x2e5c35(0x23a)][_0x2e5c35(0x22e)][_0x2e5c35(0x3bb)]['DamageColor']['call'](this,_0x3c13ba);},ColorManager[_0x5f3bde(0x594)]=function(){const _0x31e08b=_0x5f3bde;return VisuMZ[_0x31e08b(0x23a)][_0x31e08b(0x22e)]['Color'][_0x31e08b(0x7cb)];},ColorManager[_0x5f3bde(0x35f)]=function(){const _0x1cb9ca=_0x5f3bde;return VisuMZ['CoreEngine']['Settings'][_0x1cb9ca(0x3bb)][_0x1cb9ca(0x348)]||_0x1cb9ca(0x5ad);},ColorManager['outlineColorGauge']=function(){const _0x4e4ff5=_0x5f3bde;return VisuMZ[_0x4e4ff5(0x23a)][_0x4e4ff5(0x22e)]['Color']['OutlineColorGauge']||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x5f3bde(0x3ac)]=function(){const _0x25424b=_0x5f3bde;return VisuMZ[_0x25424b(0x23a)][_0x25424b(0x22e)]['Color'][_0x25424b(0x6a2)];},ColorManager[_0x5f3bde(0x385)]=function(){const _0x199fcb=_0x5f3bde;return VisuMZ[_0x199fcb(0x23a)]['Settings'][_0x199fcb(0x3bb)][_0x199fcb(0x493)];},ColorManager[_0x5f3bde(0x690)]=function(){const _0x42fc71=_0x5f3bde;return VisuMZ[_0x42fc71(0x23a)]['Settings'][_0x42fc71(0x3bb)][_0x42fc71(0x62b)];},ColorManager['itemBackColor2']=function(){const _0x515760=_0x5f3bde;return VisuMZ[_0x515760(0x23a)][_0x515760(0x22e)]['Color'][_0x515760(0x2d0)];},SceneManager[_0x5f3bde(0x3a0)]=[],SceneManager[_0x5f3bde(0x53f)]=function(){const _0x119ec9=_0x5f3bde;return this[_0x119ec9(0x77c)]&&this[_0x119ec9(0x77c)][_0x119ec9(0x7ff)]===Scene_Battle;},SceneManager[_0x5f3bde(0x21f)]=function(){const _0x4cc3c2=_0x5f3bde;return this['_scene']&&this[_0x4cc3c2(0x77c)][_0x4cc3c2(0x7ff)]===Scene_Map;},SceneManager[_0x5f3bde(0x19e)]=function(){const _0x3d1545=_0x5f3bde;return this[_0x3d1545(0x77c)]&&this[_0x3d1545(0x77c)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x5f3bde(0x656)]=SceneManager[_0x5f3bde(0x301)],SceneManager[_0x5f3bde(0x301)]=function(){const _0x18ef27=_0x5f3bde;VisuMZ['CoreEngine'][_0x18ef27(0x656)]['call'](this),this[_0x18ef27(0x4bb)]();},VisuMZ[_0x5f3bde(0x23a)]['SceneManager_onKeyDown']=SceneManager[_0x5f3bde(0x381)],SceneManager['onKeyDown']=function(_0x2f265a){const _0x43e223=_0x5f3bde;if($gameTemp)this[_0x43e223(0x74c)](_0x2f265a);VisuMZ[_0x43e223(0x23a)][_0x43e223(0x5eb)][_0x43e223(0x1f0)](this,_0x2f265a);},SceneManager[_0x5f3bde(0x74c)]=function(_0x37f274){const _0x99e258=_0x5f3bde;if(!_0x37f274['ctrlKey']&&!_0x37f274[_0x99e258(0x503)])switch(_0x37f274[_0x99e258(0x742)]){case 0x54:this[_0x99e258(0x5be)]();break;case 0x75:this[_0x99e258(0x1de)]();break;case 0x76:if(Input[_0x99e258(0x3b8)](_0x99e258(0x1e2))||Input[_0x99e258(0x3b8)](_0x99e258(0x26c)))return;this['playTestF7']();break;}},SceneManager[_0x5f3bde(0x1de)]=function(){const _0x50976f=_0x5f3bde;if($gameTemp[_0x50976f(0x795)]()&&VisuMZ[_0x50976f(0x23a)][_0x50976f(0x22e)][_0x50976f(0x338)]['F6key']){ConfigManager[_0x50976f(0x75f)]!==0x0?(ConfigManager[_0x50976f(0x35d)]=0x0,ConfigManager[_0x50976f(0x403)]=0x0,ConfigManager[_0x50976f(0x1e3)]=0x0,ConfigManager[_0x50976f(0x75f)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x50976f(0x403)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager['seVolume']=0x64);ConfigManager['save']();if(this[_0x50976f(0x77c)][_0x50976f(0x7ff)]===Scene_Options){if(this[_0x50976f(0x77c)][_0x50976f(0x6c1)])this[_0x50976f(0x77c)][_0x50976f(0x6c1)][_0x50976f(0x4be)]();if(this[_0x50976f(0x77c)][_0x50976f(0x5cd)])this[_0x50976f(0x77c)]['_listWindow'][_0x50976f(0x4be)]();}}},SceneManager[_0x5f3bde(0x2a6)]=function(){const _0x4c473e=_0x5f3bde;$gameTemp[_0x4c473e(0x795)]()&&VisuMZ[_0x4c473e(0x23a)]['Settings'][_0x4c473e(0x338)][_0x4c473e(0x2d2)]&&($gameTemp['_playTestFastMode']=!$gameTemp['_playTestFastMode']);},SceneManager[_0x5f3bde(0x5be)]=function(){const _0x111acc=_0x5f3bde;if(!$gameTemp[_0x111acc(0x795)]())return;if(!SceneManager[_0x111acc(0x53f)]())return;for(const _0x22fc04 of $gameParty[_0x111acc(0x746)]()){if(!_0x22fc04)continue;_0x22fc04[_0x111acc(0x479)](_0x22fc04['maxTp']());}},SceneManager[_0x5f3bde(0x4bb)]=function(){const _0x77cfcc=_0x5f3bde;this[_0x77cfcc(0x29d)]=![],this[_0x77cfcc(0x522)]=!VisuMZ[_0x77cfcc(0x23a)][_0x77cfcc(0x22e)]['UI'][_0x77cfcc(0x3ca)];},SceneManager[_0x5f3bde(0x1f1)]=function(_0x473104){const _0x347596=_0x5f3bde;VisuMZ[_0x347596(0x23a)]['Settings']['UI']['SideButtons']&&(this[_0x347596(0x29d)]=_0x473104);},SceneManager[_0x5f3bde(0x1b0)]=function(){const _0x22ccc2=_0x5f3bde;return this[_0x22ccc2(0x29d)];},SceneManager['areButtonsHidden']=function(){const _0x1cf854=_0x5f3bde;return this[_0x1cf854(0x522)];},SceneManager[_0x5f3bde(0x7e0)]=function(){const _0x4f267=_0x5f3bde;return this[_0x4f267(0x474)]()||this[_0x4f267(0x1b0)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1fd)]=SceneManager['isGameActive'],SceneManager[_0x5f3bde(0x33e)]=function(){const _0xed6df6=_0x5f3bde;return VisuMZ[_0xed6df6(0x23a)][_0xed6df6(0x22e)][_0xed6df6(0x338)][_0xed6df6(0x52b)]?VisuMZ[_0xed6df6(0x23a)][_0xed6df6(0x1fd)][_0xed6df6(0x1f0)](this):!![];},SceneManager['catchException']=function(_0x31f906){const _0x284e0b=_0x5f3bde;if(_0x31f906 instanceof Error)this[_0x284e0b(0x66f)](_0x31f906);else _0x31f906 instanceof Array&&_0x31f906[0x0]===_0x284e0b(0x779)?this['catchLoadError'](_0x31f906):this[_0x284e0b(0x331)](_0x31f906);this[_0x284e0b(0x554)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x23b)]=BattleManager[_0x5f3bde(0x200)],BattleManager[_0x5f3bde(0x200)]=function(){const _0x1e3403=_0x5f3bde;if(VisuMZ['CoreEngine']['Settings'][_0x1e3403(0x338)][_0x1e3403(0x1c7)])this[_0x1e3403(0x6b3)]();else return VisuMZ[_0x1e3403(0x23a)]['BattleManager_processEscape']['call'](this);},BattleManager[_0x5f3bde(0x6b3)]=function(){const _0x137047=_0x5f3bde;return $gameParty[_0x137047(0x266)](),SoundManager['playEscape'](),this[_0x137047(0x277)](),!![];},BattleManager[_0x5f3bde(0x365)]=function(){const _0x295872=_0x5f3bde;return $gameSystem[_0x295872(0x668)]()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x20b65f=_0x5f3bde;return $gameSystem[_0x20b65f(0x668)]()===0x1;},VisuMZ[_0x5f3bde(0x23a)]['Game_Temp_initialize']=Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x301)],Game_Temp[_0x5f3bde(0x371)]['initialize']=function(){const _0x51251b=_0x5f3bde;VisuMZ[_0x51251b(0x23a)]['Game_Temp_initialize'][_0x51251b(0x1f0)](this),this[_0x51251b(0x1ed)](),this['createFauxAnimationQueue'](),this[_0x51251b(0x517)]();},Game_Temp[_0x5f3bde(0x371)]['forceOutOfPlaytest']=function(){const _0xd1207a=_0x5f3bde;VisuMZ['CoreEngine'][_0xd1207a(0x22e)]['QoL'][_0xd1207a(0x42f)]&&(this['_isPlaytest']=![]);},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x261)]=function(_0x46f9a9){const _0x4df86e=_0x5f3bde;this[_0x4df86e(0x361)]=_0x46f9a9;},Game_Temp[_0x5f3bde(0x371)]['getLastPluginCommandInterpreter']=function(){const _0x3eb6cd=_0x5f3bde;return this[_0x3eb6cd(0x361)];},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x649)]=function(){const _0x3e2764=_0x5f3bde;this[_0x3e2764(0x573)]=undefined,this[_0x3e2764(0x6ed)]=undefined;},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x283)]=function(_0x246c20){const _0x5b4b30=_0x5f3bde;$gameMap&&$dataMap&&$dataMap[_0x5b4b30(0x5c8)]&&this[_0x5b4b30(0x235)]($dataMap[_0x5b4b30(0x5c8)]);const _0x3a81d8=$dataTroops[_0x246c20];if(_0x3a81d8){let _0x2fe55e=DataManager['createTroopNote'](_0x3a81d8['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x2fe55e);}},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x235)]=function(_0x4e5637){const _0x51315c=_0x5f3bde;if(!_0x4e5637)return;if(_0x4e5637[_0x51315c(0x772)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x51315c(0x573)]='FV';else{if(_0x4e5637[_0x51315c(0x772)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x4e5637['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4db752=String(RegExp['$1']);if(_0x4db752[_0x51315c(0x772)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x51315c(0x573)]='FV';else _0x4db752['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x4e5637[_0x51315c(0x772)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x4e5637['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x4e5637[_0x51315c(0x772)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x51315c(0x6ed)]=0x2;else{if(_0x4e5637[_0x51315c(0x772)](/<(?:CTB)>/i))Imported[_0x51315c(0x3f7)]&&(this[_0x51315c(0x6ed)]=_0x51315c(0x36e));else{if(_0x4e5637[_0x51315c(0x772)](/<(?:STB)>/i))Imported[_0x51315c(0x63c)]&&(this[_0x51315c(0x6ed)]='STB');else{if(_0x4e5637[_0x51315c(0x772)](/<(?:BTB)>/i))Imported[_0x51315c(0x7e7)]&&(this['_forcedBattleSys']='BTB');else{if(_0x4e5637[_0x51315c(0x772)](/<(?:FTB)>/i))Imported[_0x51315c(0x32f)]&&(this[_0x51315c(0x6ed)]=_0x51315c(0x7ce));else{if(_0x4e5637[_0x51315c(0x772)](/<(?:OTB)>/i))Imported[_0x51315c(0x356)]&&(this[_0x51315c(0x6ed)]=_0x51315c(0x5bc));else{if(_0x4e5637[_0x51315c(0x772)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x51315c(0x6ed)]=_0x51315c(0x1ce));else{if(_0x4e5637['match'](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0x51315c(0x6ed)]='PTB');else{if(_0x4e5637[_0x51315c(0x772)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x14a3d2=String(RegExp['$1']);if(_0x14a3d2['match'](/DTB/i))this[_0x51315c(0x6ed)]=0x0;else{if(_0x14a3d2[_0x51315c(0x772)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x51315c(0x6ed)]=0x1;else{if(_0x14a3d2[_0x51315c(0x772)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x51315c(0x6ed)]=0x2;else{if(_0x14a3d2['match'](/CTB/i))Imported[_0x51315c(0x3f7)]&&(this['_forcedBattleSys']=_0x51315c(0x36e));else{if(_0x14a3d2['match'](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x51315c(0x6ed)]='STB');else{if(_0x14a3d2[_0x51315c(0x772)](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']=_0x51315c(0x422));else{if(_0x14a3d2[_0x51315c(0x772)](/FTB/i))Imported[_0x51315c(0x32f)]&&(this[_0x51315c(0x6ed)]=_0x51315c(0x7ce));else{if(_0x14a3d2[_0x51315c(0x772)](/OTB/i))Imported[_0x51315c(0x356)]&&(this[_0x51315c(0x6ed)]='OTB');else{if(_0x14a3d2[_0x51315c(0x772)](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x51315c(0x6ed)]='ETB');else _0x14a3d2[_0x51315c(0x772)](/PTB/i)&&(Imported[_0x51315c(0x559)]&&(this[_0x51315c(0x6ed)]='PTB'));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x3b6)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp['prototype']['requestFauxAnimation']=function(_0x2efae1,_0x3cd8a2,_0x2c8d7a,_0x399ce5){const _0x3fa62e=_0x5f3bde;if(!this['showFauxAnimations']())return;_0x2c8d7a=_0x2c8d7a||![],_0x399ce5=_0x399ce5||![];if($dataAnimations[_0x3cd8a2]){const _0x12937d={'targets':_0x2efae1,'animationId':_0x3cd8a2,'mirror':_0x2c8d7a,'mute':_0x399ce5};this[_0x3fa62e(0x1b2)]['push'](_0x12937d);for(const _0x48c7ee of _0x2efae1){_0x48c7ee[_0x3fa62e(0x3b7)]&&_0x48c7ee[_0x3fa62e(0x3b7)]();}}},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x31b)]=function(){return!![];},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x570)]=function(){const _0x3300bc=_0x5f3bde;return this[_0x3300bc(0x1b2)][_0x3300bc(0x1e2)]();},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x517)]=function(){const _0x3886a5=_0x5f3bde;this[_0x3886a5(0x6e1)]=[];},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x3f1)]=function(_0xd397bc,_0x337648,_0x2bdfe5,_0x410479,_0x2405b4){const _0x3ea200=_0x5f3bde;if(!this[_0x3ea200(0x43c)]())return;_0x410479=_0x410479||![],_0x2405b4=_0x2405b4||![];if($dataAnimations[_0x2bdfe5]){const _0x265c39={'x':_0xd397bc,'y':_0x337648,'animationId':_0x2bdfe5,'mirror':_0x410479,'mute':_0x2405b4};this['_pointAnimationQueue'][_0x3ea200(0x296)](_0x265c39);}},Game_Temp[_0x5f3bde(0x371)][_0x5f3bde(0x43c)]=function(){return!![];},Game_Temp[_0x5f3bde(0x371)]['retrievePointAnimation']=function(){const _0x4d891b=_0x5f3bde;return this[_0x4d891b(0x6e1)]['shift']();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x3f2)]=Game_System[_0x5f3bde(0x371)]['initialize'],Game_System[_0x5f3bde(0x371)]['initialize']=function(){const _0x2fc399=_0x5f3bde;VisuMZ[_0x2fc399(0x23a)][_0x2fc399(0x3f2)]['call'](this),this[_0x2fc399(0x3e5)]();},Game_System['prototype'][_0x5f3bde(0x3e5)]=function(){const _0xd25513=_0x5f3bde;this[_0xd25513(0x485)]={'SideView':$dataSystem[_0xd25513(0x606)],'BattleSystem':this[_0xd25513(0x2e1)](),'FontSize':$dataSystem[_0xd25513(0x323)][_0xd25513(0x68e)],'Padding':0xc};},Game_System[_0x5f3bde(0x371)][_0x5f3bde(0x727)]=function(){const _0x1e4298=_0x5f3bde;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x1e4298(0x573)]==='FV')return![];}if(this[_0x1e4298(0x485)]===undefined)this[_0x1e4298(0x3e5)]();if(this[_0x1e4298(0x485)]['SideView']===undefined)this[_0x1e4298(0x3e5)]();return this[_0x1e4298(0x485)][_0x1e4298(0x1cd)];},Game_System['prototype'][_0x5f3bde(0x205)]=function(_0x40274a){const _0x1abd58=_0x5f3bde;if(this[_0x1abd58(0x485)]===undefined)this[_0x1abd58(0x3e5)]();if(this[_0x1abd58(0x485)][_0x1abd58(0x1cd)]===undefined)this['initCoreEngine']();this[_0x1abd58(0x485)][_0x1abd58(0x1cd)]=_0x40274a;},Game_System['prototype'][_0x5f3bde(0x7be)]=function(){const _0x4cc745=_0x5f3bde;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();this[_0x4cc745(0x485)][_0x4cc745(0x557)]=this[_0x4cc745(0x2e1)]();},Game_System[_0x5f3bde(0x371)][_0x5f3bde(0x2e1)]=function(){const _0x855ff2=_0x5f3bde,_0x2cb329=(VisuMZ[_0x855ff2(0x23a)][_0x855ff2(0x22e)][_0x855ff2(0x557)]||_0x855ff2(0x7f8))[_0x855ff2(0x22d)]()[_0x855ff2(0x65a)]();return VisuMZ[_0x855ff2(0x23a)][_0x855ff2(0x437)](_0x2cb329);},Game_System[_0x5f3bde(0x371)]['getBattleSystem']=function(){const _0x2b8687=_0x5f3bde;if($gameTemp[_0x2b8687(0x6ed)]!==undefined)return $gameTemp[_0x2b8687(0x6ed)];if(this['_CoreEngineSettings']===undefined)this[_0x2b8687(0x3e5)]();if(this[_0x2b8687(0x485)][_0x2b8687(0x557)]===undefined)this['resetBattleSystem']();return this[_0x2b8687(0x485)][_0x2b8687(0x557)];},Game_System[_0x5f3bde(0x371)][_0x5f3bde(0x60b)]=function(_0x53a6c4){const _0x485bd9=_0x5f3bde;if(this[_0x485bd9(0x485)]===undefined)this[_0x485bd9(0x3e5)]();if(this[_0x485bd9(0x485)][_0x485bd9(0x557)]===undefined)this[_0x485bd9(0x7be)]();this[_0x485bd9(0x485)][_0x485bd9(0x557)]=_0x53a6c4;},Game_System['prototype'][_0x5f3bde(0x74a)]=function(){const _0x371901=_0x5f3bde;if(this[_0x371901(0x485)]===undefined)this[_0x371901(0x3e5)]();if(this[_0x371901(0x485)][_0x371901(0x3ed)]===undefined)this['initCoreEngine']();return this[_0x371901(0x485)][_0x371901(0x3ed)];},Game_System[_0x5f3bde(0x371)]['setMainFontSize']=function(_0x318cf4){const _0x249243=_0x5f3bde;if(this[_0x249243(0x485)]===undefined)this[_0x249243(0x3e5)]();if(this[_0x249243(0x485)][_0x249243(0x4e4)]===undefined)this['initCoreEngine']();this[_0x249243(0x485)][_0x249243(0x3ed)]=_0x318cf4;},Game_System[_0x5f3bde(0x371)][_0x5f3bde(0x44a)]=function(){const _0x2fa969=_0x5f3bde;if(this[_0x2fa969(0x485)]===undefined)this[_0x2fa969(0x3e5)]();if(this[_0x2fa969(0x485)][_0x2fa969(0x703)]===undefined)this[_0x2fa969(0x3e5)]();return this[_0x2fa969(0x485)][_0x2fa969(0x703)];},Game_System[_0x5f3bde(0x371)]['setWindowPadding']=function(_0x1b1db3){const _0xb89422=_0x5f3bde;if(this['_CoreEngineSettings']===undefined)this[_0xb89422(0x3e5)]();if(this[_0xb89422(0x485)]['TimeProgress']===undefined)this[_0xb89422(0x3e5)]();this[_0xb89422(0x485)][_0xb89422(0x703)]=_0x1b1db3;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x265)]=Game_Screen[_0x5f3bde(0x371)][_0x5f3bde(0x301)],Game_Screen['prototype'][_0x5f3bde(0x301)]=function(){const _0x358e13=_0x5f3bde;VisuMZ[_0x358e13(0x23a)][_0x358e13(0x265)][_0x358e13(0x1f0)](this),this[_0x358e13(0x1cf)]();},Game_Screen[_0x5f3bde(0x371)][_0x5f3bde(0x1cf)]=function(){const _0x2b8013=_0x5f3bde,_0x4d1d31=VisuMZ['CoreEngine'][_0x2b8013(0x22e)][_0x2b8013(0x2a8)];this['_coreEngineShakeStyle']=_0x4d1d31?.['DefaultStyle']||_0x2b8013(0x28a);},Game_Screen[_0x5f3bde(0x371)][_0x5f3bde(0x2e9)]=function(){const _0xc260db=_0x5f3bde;if(this[_0xc260db(0x61a)]===undefined)this[_0xc260db(0x1cf)]();return this[_0xc260db(0x61a)];},Game_Screen[_0x5f3bde(0x371)][_0x5f3bde(0x759)]=function(_0x1c0a0e){const _0x12cf55=_0x5f3bde;if(this[_0x12cf55(0x61a)]===undefined)this[_0x12cf55(0x1cf)]();this['_coreEngineShakeStyle']=_0x1c0a0e[_0x12cf55(0x64b)]()['trim']();},Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x821)]=function(){const _0x390826=_0x5f3bde;if($gameParty[_0x390826(0x212)]())return![];return this[_0x390826(0x6ad)]()&&this[_0x390826(0x6ad)]()[_0x390826(0x3f8)](0x0)==='!';},VisuMZ['CoreEngine'][_0x5f3bde(0x1fe)]=Game_Picture[_0x5f3bde(0x371)]['x'],Game_Picture[_0x5f3bde(0x371)]['x']=function(){const _0x4b3f00=_0x5f3bde;return this[_0x4b3f00(0x821)]()?this[_0x4b3f00(0x237)]():VisuMZ[_0x4b3f00(0x23a)][_0x4b3f00(0x1fe)]['call'](this);},Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x237)]=function(){const _0x4988bd=_0x5f3bde,_0x31b973=$gameMap[_0x4988bd(0x2d3)]()*$gameMap[_0x4988bd(0x516)]();return this['_x']-_0x31b973;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x61d)]=Game_Picture[_0x5f3bde(0x371)]['y'],Game_Picture['prototype']['y']=function(){const _0x2fe941=_0x5f3bde;return this[_0x2fe941(0x821)]()?this['yScrollLinkedOffset']():VisuMZ[_0x2fe941(0x23a)][_0x2fe941(0x61d)][_0x2fe941(0x1f0)](this);},Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x1dd)]=function(){const _0x198fdd=_0x5f3bde,_0xe6140e=$gameMap['displayY']()*$gameMap[_0x198fdd(0x46f)]();return this['_y']-_0xe6140e;},Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x55b)]=function(_0x1ff96d){const _0x6b5030=_0x5f3bde;this[_0x6b5030(0x373)]=_0x1ff96d;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x582)]=Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x561)],Game_Picture[_0x5f3bde(0x371)]['calcEasing']=function(_0x589221){const _0x3ad3ff=_0x5f3bde;return this[_0x3ad3ff(0x373)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x3ad3ff(0x638)](this[_0x3ad3ff(0x373)])?VisuMZ[_0x3ad3ff(0x23a)]['Game_Picture_calcEasing'][_0x3ad3ff(0x1f0)](this,_0x589221):VisuMZ[_0x3ad3ff(0x786)](_0x589221,this[_0x3ad3ff(0x373)]);},VisuMZ['CoreEngine'][_0x5f3bde(0x2fb)]=Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x3e9)],Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x3e9)]=function(_0x418e95){const _0x13114c=_0x5f3bde;return VisuMZ['CoreEngine'][_0x13114c(0x22e)][_0x13114c(0x338)][_0x13114c(0x7fe)]?this[_0x13114c(0x5e2)](_0x418e95):VisuMZ[_0x13114c(0x23a)]['Game_Action_itemHit'][_0x13114c(0x1f0)](this,_0x418e95);},Game_Action[_0x5f3bde(0x371)]['itemHitImprovedAccuracy']=function(_0xfd0fe9){const _0x3b9a20=_0x5f3bde,_0x2efd98=this['itemSuccessRate'](_0xfd0fe9),_0x590759=this[_0x3b9a20(0x386)](_0xfd0fe9),_0x2a6833=this[_0x3b9a20(0x686)](_0xfd0fe9);return _0x2efd98*(_0x590759-_0x2a6833);},VisuMZ[_0x5f3bde(0x23a)]['Game_Action_itemEva']=Game_Action['prototype'][_0x5f3bde(0x5f8)],Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x5f8)]=function(_0x4f5a92){const _0x5ce8de=_0x5f3bde;return VisuMZ['CoreEngine'][_0x5ce8de(0x22e)]['QoL'][_0x5ce8de(0x7fe)]?0x0:VisuMZ['CoreEngine']['Game_Action_itemEva']['call'](this,_0x4f5a92);},Game_Action['prototype']['itemSuccessRate']=function(_0x5d66ce){const _0x45ede6=_0x5f3bde;return this[_0x45ede6(0x5a9)]()[_0x45ede6(0x359)]*0.01;},Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x386)]=function(_0x373128){const _0x31d6b1=_0x5f3bde;if(VisuMZ[_0x31d6b1(0x23a)][_0x31d6b1(0x22e)]['QoL'][_0x31d6b1(0x6ac)]&&this[_0x31d6b1(0x546)]())return 0x1;return this[_0x31d6b1(0x541)]()?VisuMZ[_0x31d6b1(0x23a)][_0x31d6b1(0x22e)][_0x31d6b1(0x338)][_0x31d6b1(0x6ac)]&&this[_0x31d6b1(0x588)]()[_0x31d6b1(0x1fa)]()?this[_0x31d6b1(0x588)]()[_0x31d6b1(0x1c3)]+0.05:this[_0x31d6b1(0x588)]()['hit']:0x1;},Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x686)]=function(_0x1fd5d9){const _0x3fa468=_0x5f3bde;if(this[_0x3fa468(0x588)]()['isActor']()===_0x1fd5d9[_0x3fa468(0x1fa)]())return 0x0;if(this[_0x3fa468(0x541)]())return VisuMZ[_0x3fa468(0x23a)][_0x3fa468(0x22e)][_0x3fa468(0x338)][_0x3fa468(0x6ac)]&&_0x1fd5d9[_0x3fa468(0x533)]()?_0x1fd5d9[_0x3fa468(0x1b7)]-0.05:_0x1fd5d9[_0x3fa468(0x1b7)];else return this[_0x3fa468(0x264)]()?_0x1fd5d9[_0x3fa468(0x76f)]:0x0;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x395)]=Game_Action[_0x5f3bde(0x371)]['updateLastTarget'],Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x27b)]=function(_0x27474d){const _0x2dbaa6=_0x5f3bde;VisuMZ['CoreEngine'][_0x2dbaa6(0x395)][_0x2dbaa6(0x1f0)](this,_0x27474d);if(VisuMZ[_0x2dbaa6(0x23a)][_0x2dbaa6(0x22e)]['QoL'][_0x2dbaa6(0x7fe)])return;const _0x58fad9=_0x27474d['result']();_0x58fad9[_0x2dbaa6(0x50d)]&&(0x1-this[_0x2dbaa6(0x5f8)](_0x27474d)>this['itemHit'](_0x27474d)&&(_0x58fad9[_0x2dbaa6(0x50d)]=![],_0x58fad9[_0x2dbaa6(0x284)]=!![]));},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x5e4)],Game_BattlerBase['prototype'][_0x5f3bde(0x5e4)]=function(){const _0x21a73d=_0x5f3bde;this[_0x21a73d(0x5ba)]={},VisuMZ[_0x21a73d(0x23a)][_0x21a73d(0x4d7)][_0x21a73d(0x1f0)](this);},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x4be)],Game_BattlerBase[_0x5f3bde(0x371)]['refresh']=function(){const _0x17a5bf=_0x5f3bde;this[_0x17a5bf(0x5ba)]={},VisuMZ[_0x17a5bf(0x23a)][_0x17a5bf(0x342)][_0x17a5bf(0x1f0)](this);},Game_BattlerBase['prototype'][_0x5f3bde(0x61e)]=function(_0x46a6b4){const _0x192ebc=_0x5f3bde;return this[_0x192ebc(0x5ba)]=this['_cache']||{},this['_cache'][_0x46a6b4]!==undefined;},Game_BattlerBase[_0x5f3bde(0x371)]['paramPlus']=function(_0x795006){const _0x279c67=_0x5f3bde,_0xc017e3=(_0x10661c,_0x48e30b)=>{const _0x11109f=_0x278f;if(!_0x48e30b)return _0x10661c;if(_0x48e30b[_0x11109f(0x5c8)][_0x11109f(0x772)](VisuMZ[_0x11109f(0x23a)][_0x11109f(0x6b7)][_0x11109f(0x26e)][_0x795006])){var _0x21c9b3=Number(RegExp['$1']);_0x10661c+=_0x21c9b3;}if(_0x48e30b['note'][_0x11109f(0x772)](VisuMZ[_0x11109f(0x23a)][_0x11109f(0x6b7)][_0x11109f(0x278)][_0x795006])){var _0x475fc2=String(RegExp['$1']);try{_0x10661c+=eval(_0x475fc2);}catch(_0x342193){if($gameTemp['isPlaytest']())console['log'](_0x342193);}}return _0x10661c;};return this['traitObjects']()[_0x279c67(0x193)](_0xc017e3,this['_paramPlus'][_0x795006]);},Game_BattlerBase[_0x5f3bde(0x371)]['paramMax']=function(_0x38f451){const _0x327351=_0x5f3bde;var _0x34e9d8=_0x327351(0x5d6)+(this[_0x327351(0x1fa)]()?'Actor':'Enemy')+_0x327351(0x2a4)+_0x38f451;if(this[_0x327351(0x61e)](_0x34e9d8))return this[_0x327351(0x5ba)][_0x34e9d8];this[_0x327351(0x5ba)][_0x34e9d8]=eval(VisuMZ['CoreEngine'][_0x327351(0x22e)][_0x327351(0x275)][_0x34e9d8]);const _0x1bfcc1=(_0xcc4e24,_0x29225c)=>{const _0x25e9ba=_0x327351;if(!_0x29225c)return _0xcc4e24;if(_0x29225c[_0x25e9ba(0x5c8)][_0x25e9ba(0x772)](VisuMZ['CoreEngine']['RegExp'][_0x25e9ba(0x281)][_0x38f451])){var _0x3c80ed=Number(RegExp['$1']);if(_0x3c80ed===0x0)_0x3c80ed=Number[_0x25e9ba(0x3be)];_0xcc4e24=Math[_0x25e9ba(0x615)](_0xcc4e24,_0x3c80ed);}if(_0x29225c[_0x25e9ba(0x5c8)][_0x25e9ba(0x772)](VisuMZ['CoreEngine'][_0x25e9ba(0x6b7)][_0x25e9ba(0x46c)][_0x38f451])){var _0x11abd8=String(RegExp['$1']);try{_0xcc4e24=Math['max'](_0xcc4e24,Number(eval(_0x11abd8)));}catch(_0x4732f8){if($gameTemp[_0x25e9ba(0x795)]())console[_0x25e9ba(0x5c0)](_0x4732f8);}}return _0xcc4e24;};if(this[_0x327351(0x5ba)][_0x34e9d8]===0x0)this[_0x327351(0x5ba)][_0x34e9d8]=Number[_0x327351(0x3be)];return this[_0x327351(0x5ba)][_0x34e9d8]=this[_0x327351(0x5b2)]()[_0x327351(0x193)](_0x1bfcc1,this['_cache'][_0x34e9d8]),this[_0x327351(0x5ba)][_0x34e9d8];},Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x753)]=function(_0xe6dc82){const _0x4a7dfb=_0x5f3bde,_0x22ef04=this[_0x4a7dfb(0x765)](Game_BattlerBase[_0x4a7dfb(0x215)],_0xe6dc82),_0xeeca6a=(_0x4f7f9a,_0x2097cf)=>{const _0x39c7a7=_0x4a7dfb;if(!_0x2097cf)return _0x4f7f9a;if(_0x2097cf['note'][_0x39c7a7(0x772)](VisuMZ[_0x39c7a7(0x23a)][_0x39c7a7(0x6b7)]['paramRate1'][_0xe6dc82])){var _0x597731=Number(RegExp['$1'])/0x64;_0x4f7f9a*=_0x597731;}if(_0x2097cf['note'][_0x39c7a7(0x772)](VisuMZ[_0x39c7a7(0x23a)][_0x39c7a7(0x6b7)][_0x39c7a7(0x81e)][_0xe6dc82])){var _0x597731=Number(RegExp['$1']);_0x4f7f9a*=_0x597731;}if(_0x2097cf[_0x39c7a7(0x5c8)][_0x39c7a7(0x772)](VisuMZ[_0x39c7a7(0x23a)]['RegExp'][_0x39c7a7(0x744)][_0xe6dc82])){var _0x829b2a=String(RegExp['$1']);try{_0x4f7f9a*=eval(_0x829b2a);}catch(_0x97a656){if($gameTemp[_0x39c7a7(0x795)]())console[_0x39c7a7(0x5c0)](_0x97a656);}}return _0x4f7f9a;};return this['traitObjects']()[_0x4a7dfb(0x193)](_0xeeca6a,_0x22ef04);},Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x240)]=function(_0x350384){const _0x49e331=_0x5f3bde,_0x59a7ff=(_0x2158c6,_0x360d53)=>{const _0x41df34=_0x278f;if(!_0x360d53)return _0x2158c6;if(_0x360d53[_0x41df34(0x5c8)]['match'](VisuMZ[_0x41df34(0x23a)]['RegExp'][_0x41df34(0x360)][_0x350384])){var _0x352e10=Number(RegExp['$1']);_0x2158c6+=_0x352e10;}if(_0x360d53[_0x41df34(0x5c8)][_0x41df34(0x772)](VisuMZ[_0x41df34(0x23a)][_0x41df34(0x6b7)][_0x41df34(0x24f)][_0x350384])){var _0x163bec=String(RegExp['$1']);try{_0x2158c6+=eval(_0x163bec);}catch(_0x156d77){if($gameTemp[_0x41df34(0x795)]())console[_0x41df34(0x5c0)](_0x156d77);}}return _0x2158c6;};return this[_0x49e331(0x5b2)]()[_0x49e331(0x193)](_0x59a7ff,0x0);},Game_BattlerBase[_0x5f3bde(0x371)]['param']=function(_0x5e0627){const _0x36a33b=_0x5f3bde;let _0x6c32dc=_0x36a33b(0x5c4)+_0x5e0627+_0x36a33b(0x74b);if(this[_0x36a33b(0x61e)](_0x6c32dc))return this['_cache'][_0x6c32dc];return this[_0x36a33b(0x5ba)][_0x6c32dc]=Math[_0x36a33b(0x70a)](VisuMZ[_0x36a33b(0x23a)]['Settings'][_0x36a33b(0x275)][_0x36a33b(0x192)][_0x36a33b(0x1f0)](this,_0x5e0627)),this[_0x36a33b(0x5ba)][_0x6c32dc];},Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x317)]=function(_0x1724dc){const _0x3dbf0=_0x5f3bde,_0x3ec9a9=(_0x3bd7bb,_0x47a03d)=>{const _0xfd1b93=_0x278f;if(!_0x47a03d)return _0x3bd7bb;if(_0x47a03d[_0xfd1b93(0x5c8)][_0xfd1b93(0x772)](VisuMZ['CoreEngine'][_0xfd1b93(0x6b7)][_0xfd1b93(0x3dc)][_0x1724dc])){var _0x342596=Number(RegExp['$1'])/0x64;_0x3bd7bb+=_0x342596;}if(_0x47a03d[_0xfd1b93(0x5c8)]['match'](VisuMZ[_0xfd1b93(0x23a)]['RegExp'][_0xfd1b93(0x76b)][_0x1724dc])){var _0x342596=Number(RegExp['$1']);_0x3bd7bb+=_0x342596;}if(_0x47a03d[_0xfd1b93(0x5c8)][_0xfd1b93(0x772)](VisuMZ[_0xfd1b93(0x23a)][_0xfd1b93(0x6b7)][_0xfd1b93(0x815)][_0x1724dc])){var _0x3b621a=String(RegExp['$1']);try{_0x3bd7bb+=eval(_0x3b621a);}catch(_0x3c62d0){if($gameTemp['isPlaytest']())console[_0xfd1b93(0x5c0)](_0x3c62d0);}}return _0x3bd7bb;};return this[_0x3dbf0(0x5b2)]()[_0x3dbf0(0x193)](_0x3ec9a9,0x0);},Game_BattlerBase['prototype']['xparamRate']=function(_0x31ea7a){const _0x304cfa=_0x5f3bde,_0x2ae89b=(_0x6512ee,_0x38b188)=>{const _0x43f76f=_0x278f;if(!_0x38b188)return _0x6512ee;if(_0x38b188['note'][_0x43f76f(0x772)](VisuMZ[_0x43f76f(0x23a)][_0x43f76f(0x6b7)]['xparamRate1'][_0x31ea7a])){var _0x7546bb=Number(RegExp['$1'])/0x64;_0x6512ee*=_0x7546bb;}if(_0x38b188[_0x43f76f(0x5c8)]['match'](VisuMZ[_0x43f76f(0x23a)]['RegExp']['xparamRate2'][_0x31ea7a])){var _0x7546bb=Number(RegExp['$1']);_0x6512ee*=_0x7546bb;}if(_0x38b188[_0x43f76f(0x5c8)]['match'](VisuMZ['CoreEngine'][_0x43f76f(0x6b7)][_0x43f76f(0x5a8)][_0x31ea7a])){var _0x5db9d3=String(RegExp['$1']);try{_0x6512ee*=eval(_0x5db9d3);}catch(_0x340605){if($gameTemp['isPlaytest']())console[_0x43f76f(0x5c0)](_0x340605);}}return _0x6512ee;};return this[_0x304cfa(0x5b2)]()[_0x304cfa(0x193)](_0x2ae89b,0x1);},Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x633)]=function(_0x32cab4){const _0x2cd602=_0x5f3bde,_0x5bfd58=(_0x15f417,_0x391e02)=>{const _0x246182=_0x278f;if(!_0x391e02)return _0x15f417;if(_0x391e02['note'][_0x246182(0x772)](VisuMZ[_0x246182(0x23a)]['RegExp'][_0x246182(0x2c4)][_0x32cab4])){var _0x3a2200=Number(RegExp['$1'])/0x64;_0x15f417+=_0x3a2200;}if(_0x391e02[_0x246182(0x5c8)]['match'](VisuMZ[_0x246182(0x23a)][_0x246182(0x6b7)]['xparamFlat2'][_0x32cab4])){var _0x3a2200=Number(RegExp['$1']);_0x15f417+=_0x3a2200;}if(_0x391e02[_0x246182(0x5c8)][_0x246182(0x772)](VisuMZ[_0x246182(0x23a)]['RegExp'][_0x246182(0x592)][_0x32cab4])){var _0xde0aa7=String(RegExp['$1']);try{_0x15f417+=eval(_0xde0aa7);}catch(_0x563e69){if($gameTemp[_0x246182(0x795)]())console['log'](_0x563e69);}}return _0x15f417;};return this[_0x2cd602(0x5b2)]()[_0x2cd602(0x193)](_0x5bfd58,0x0);},Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x4f7)]=function(_0x4eb40c){const _0x5eb427=_0x5f3bde;let _0x546458=_0x5eb427(0x4f7)+_0x4eb40c+_0x5eb427(0x74b);if(this[_0x5eb427(0x61e)](_0x546458))return this[_0x5eb427(0x5ba)][_0x546458];return this['_cache'][_0x546458]=VisuMZ[_0x5eb427(0x23a)]['Settings'][_0x5eb427(0x275)][_0x5eb427(0x6fb)][_0x5eb427(0x1f0)](this,_0x4eb40c),this['_cache'][_0x546458];},Game_BattlerBase['prototype'][_0x5f3bde(0x6a4)]=function(_0x88a813){const _0x109e6c=_0x5f3bde,_0x3df36d=(_0x4572e7,_0x3f9425)=>{const _0x1540d8=_0x278f;if(!_0x3f9425)return _0x4572e7;if(_0x3f9425[_0x1540d8(0x5c8)][_0x1540d8(0x772)](VisuMZ[_0x1540d8(0x23a)][_0x1540d8(0x6b7)][_0x1540d8(0x56c)][_0x88a813])){var _0x2fab31=Number(RegExp['$1'])/0x64;_0x4572e7+=_0x2fab31;}if(_0x3f9425[_0x1540d8(0x5c8)]['match'](VisuMZ[_0x1540d8(0x23a)][_0x1540d8(0x6b7)][_0x1540d8(0x2a9)][_0x88a813])){var _0x2fab31=Number(RegExp['$1']);_0x4572e7+=_0x2fab31;}if(_0x3f9425[_0x1540d8(0x5c8)][_0x1540d8(0x772)](VisuMZ['CoreEngine'][_0x1540d8(0x6b7)][_0x1540d8(0x5e6)][_0x88a813])){var _0x5c935d=String(RegExp['$1']);try{_0x4572e7+=eval(_0x5c935d);}catch(_0x1623e5){if($gameTemp[_0x1540d8(0x795)]())console[_0x1540d8(0x5c0)](_0x1623e5);}}return _0x4572e7;};return this[_0x109e6c(0x5b2)]()[_0x109e6c(0x193)](_0x3df36d,0x0);},Game_BattlerBase[_0x5f3bde(0x371)]['sparamRate']=function(_0x54bc98){const _0x50f089=_0x5f3bde,_0x476792=(_0x26b586,_0x34697c)=>{const _0x2581a0=_0x278f;if(!_0x34697c)return _0x26b586;if(_0x34697c[_0x2581a0(0x5c8)][_0x2581a0(0x772)](VisuMZ['CoreEngine'][_0x2581a0(0x6b7)][_0x2581a0(0x5e7)][_0x54bc98])){var _0x264751=Number(RegExp['$1'])/0x64;_0x26b586*=_0x264751;}if(_0x34697c[_0x2581a0(0x5c8)][_0x2581a0(0x772)](VisuMZ[_0x2581a0(0x23a)][_0x2581a0(0x6b7)][_0x2581a0(0x1d5)][_0x54bc98])){var _0x264751=Number(RegExp['$1']);_0x26b586*=_0x264751;}if(_0x34697c[_0x2581a0(0x5c8)]['match'](VisuMZ[_0x2581a0(0x23a)][_0x2581a0(0x6b7)][_0x2581a0(0x3a1)][_0x54bc98])){var _0x395f99=String(RegExp['$1']);try{_0x26b586*=eval(_0x395f99);}catch(_0x49a49a){if($gameTemp['isPlaytest']())console[_0x2581a0(0x5c0)](_0x49a49a);}}return _0x26b586;};return this['traitObjects']()[_0x50f089(0x193)](_0x476792,0x1);},Game_BattlerBase[_0x5f3bde(0x371)]['sparamFlatBonus']=function(_0x164165){const _0x1c99f4=_0x5f3bde,_0x3c8469=(_0x1a81fc,_0x26aed1)=>{const _0x59a5cc=_0x278f;if(!_0x26aed1)return _0x1a81fc;if(_0x26aed1[_0x59a5cc(0x5c8)][_0x59a5cc(0x772)](VisuMZ['CoreEngine'][_0x59a5cc(0x6b7)][_0x59a5cc(0x790)][_0x164165])){var _0x38ba34=Number(RegExp['$1'])/0x64;_0x1a81fc+=_0x38ba34;}if(_0x26aed1[_0x59a5cc(0x5c8)]['match'](VisuMZ['CoreEngine']['RegExp']['sparamFlat2'][_0x164165])){var _0x38ba34=Number(RegExp['$1']);_0x1a81fc+=_0x38ba34;}if(_0x26aed1[_0x59a5cc(0x5c8)]['match'](VisuMZ[_0x59a5cc(0x23a)][_0x59a5cc(0x6b7)][_0x59a5cc(0x740)][_0x164165])){var _0x5ab393=String(RegExp['$1']);try{_0x1a81fc+=eval(_0x5ab393);}catch(_0x9e980d){if($gameTemp[_0x59a5cc(0x795)]())console[_0x59a5cc(0x5c0)](_0x9e980d);}}return _0x1a81fc;};return this['traitObjects']()[_0x1c99f4(0x193)](_0x3c8469,0x0);},Game_BattlerBase['prototype'][_0x5f3bde(0x3f5)]=function(_0x1af590){const _0x50588d=_0x5f3bde;let _0x1a6260=_0x50588d(0x3f5)+_0x1af590+_0x50588d(0x74b);if(this['checkCacheKey'](_0x1a6260))return this['_cache'][_0x1a6260];return this['_cache'][_0x1a6260]=VisuMZ[_0x50588d(0x23a)]['Settings'][_0x50588d(0x275)][_0x50588d(0x2d7)]['call'](this,_0x1af590),this[_0x50588d(0x5ba)][_0x1a6260];},Game_BattlerBase['prototype'][_0x5f3bde(0x6c0)]=function(_0x42b6df,_0x33fa75){const _0x348213=_0x5f3bde;if(typeof paramId===_0x348213(0x379))return this[_0x348213(0x5c4)](_0x42b6df);_0x42b6df=String(_0x42b6df||'')[_0x348213(0x22d)]();if(_0x42b6df===_0x348213(0x3ea))return this['param'](0x0);if(_0x42b6df===_0x348213(0x73c))return this[_0x348213(0x5c4)](0x1);if(_0x42b6df==='ATK')return this[_0x348213(0x5c4)](0x2);if(_0x42b6df==='DEF')return this['param'](0x3);if(_0x42b6df===_0x348213(0x357))return this[_0x348213(0x5c4)](0x4);if(_0x42b6df===_0x348213(0x558))return this[_0x348213(0x5c4)](0x5);if(_0x42b6df===_0x348213(0x5ec))return this[_0x348213(0x5c4)](0x6);if(_0x42b6df===_0x348213(0x6dc))return this[_0x348213(0x5c4)](0x7);if(_0x42b6df===_0x348213(0x5f5))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x4f7)](0x0)*0x64))+'%':this[_0x348213(0x4f7)](0x0);if(_0x42b6df===_0x348213(0x774))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x4f7)](0x1)*0x64))+'%':this[_0x348213(0x4f7)](0x1);if(_0x42b6df==='CRI')return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x4f7)](0x2)*0x64))+'%':this[_0x348213(0x4f7)](0x2);if(_0x42b6df==='CEV')return _0x33fa75?String(Math['round'](this[_0x348213(0x4f7)](0x3)*0x64))+'%':this[_0x348213(0x4f7)](0x3);if(_0x42b6df===_0x348213(0x409))return _0x33fa75?String(Math['round'](this[_0x348213(0x4f7)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x42b6df==='MRF')return _0x33fa75?String(Math['round'](this[_0x348213(0x4f7)](0x5)*0x64))+'%':this[_0x348213(0x4f7)](0x5);if(_0x42b6df==='CNT')return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x4f7)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x42b6df===_0x348213(0x77f))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x4f7)](0x7)*0x64))+'%':this[_0x348213(0x4f7)](0x7);if(_0x42b6df===_0x348213(0x54f))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x4f7)](0x8)*0x64))+'%':this[_0x348213(0x4f7)](0x8);if(_0x42b6df===_0x348213(0x768))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x4f7)](0x9)*0x64))+'%':this[_0x348213(0x4f7)](0x9);if(_0x42b6df===_0x348213(0x82f))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x3f5)](0x0)*0x64))+'%':this[_0x348213(0x3f5)](0x0);if(_0x42b6df===_0x348213(0x6d2))return _0x33fa75?String(Math['round'](this[_0x348213(0x3f5)](0x1)*0x64))+'%':this[_0x348213(0x3f5)](0x1);if(_0x42b6df===_0x348213(0x6aa))return _0x33fa75?String(Math['round'](this[_0x348213(0x3f5)](0x2)*0x64))+'%':this[_0x348213(0x3f5)](0x2);if(_0x42b6df==='PHA')return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x3f5)](0x3)*0x64))+'%':this[_0x348213(0x3f5)](0x3);if(_0x42b6df===_0x348213(0x50c))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x3f5)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x42b6df===_0x348213(0x368))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x3f5)](0x5)*0x64))+'%':this[_0x348213(0x3f5)](0x5);if(_0x42b6df==='PDR')return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x3f5)](0x6)*0x64))+'%':this[_0x348213(0x3f5)](0x6);if(_0x42b6df===_0x348213(0x60a))return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x3f5)](0x7)*0x64))+'%':this[_0x348213(0x3f5)](0x7);if(_0x42b6df==='FDR')return _0x33fa75?String(Math[_0x348213(0x70a)](this[_0x348213(0x3f5)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x42b6df===_0x348213(0x30b))return _0x33fa75?String(Math['round'](this[_0x348213(0x3f5)](0x9)*0x64))+'%':this[_0x348213(0x3f5)](0x9);if(VisuMZ[_0x348213(0x23a)][_0x348213(0x53e)][_0x42b6df]){const _0x326ad7=VisuMZ[_0x348213(0x23a)]['CustomParamAbb'][_0x42b6df],_0x56f781=this[_0x326ad7];return VisuMZ[_0x348213(0x23a)][_0x348213(0x5ab)][_0x42b6df]==='integer'?_0x56f781:_0x33fa75?String(Math[_0x348213(0x70a)](_0x56f781*0x64))+'%':_0x56f781;}return'';},Game_BattlerBase[_0x5f3bde(0x371)][_0x5f3bde(0x595)]=function(){const _0x3b5d77=_0x5f3bde;return this[_0x3b5d77(0x43e)]()&&this[_0x3b5d77(0x7c6)]<this['mhp']*VisuMZ['CoreEngine']['Settings'][_0x3b5d77(0x275)][_0x3b5d77(0x21c)];},Game_Battler[_0x5f3bde(0x371)][_0x5f3bde(0x3e8)]=function(){const _0x5a1a1e=_0x5f3bde;SoundManager[_0x5a1a1e(0x76c)](),this[_0x5a1a1e(0x58e)](_0x5a1a1e(0x4db));},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x70e)]=Game_Actor[_0x5f3bde(0x371)]['paramBase'],Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x6cb)]=function(_0x116f54){const _0x39ee2a=_0x5f3bde;if(this[_0x39ee2a(0x528)]>0x63)return this[_0x39ee2a(0x66a)](_0x116f54);return VisuMZ[_0x39ee2a(0x23a)]['Game_Actor_paramBase'][_0x39ee2a(0x1f0)](this,_0x116f54);},Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x66a)]=function(_0xabac5){const _0x1c37c9=_0x5f3bde,_0x42b32a=this[_0x1c37c9(0x733)]()[_0x1c37c9(0x1fb)][_0xabac5][0x63],_0x42bb0f=this[_0x1c37c9(0x733)]()[_0x1c37c9(0x1fb)][_0xabac5][0x62];return _0x42b32a+(_0x42b32a-_0x42bb0f)*(this[_0x1c37c9(0x528)]-0x63);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1d1)]=Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x1e5)],Game_Actor['prototype'][_0x5f3bde(0x1e5)]=function(_0x21fb5f,_0x3af136){const _0x3bced2=_0x5f3bde;$gameTemp[_0x3bced2(0x1e4)]=!![],VisuMZ[_0x3bced2(0x23a)]['Game_Actor_changeClass'][_0x3bced2(0x1f0)](this,_0x21fb5f,_0x3af136),$gameTemp[_0x3bced2(0x1e4)]=undefined;},VisuMZ[_0x5f3bde(0x23a)]['Game_Actor_levelUp']=Game_Actor[_0x5f3bde(0x371)]['levelUp'],Game_Actor['prototype'][_0x5f3bde(0x47a)]=function(){const _0x386055=_0x5f3bde;VisuMZ['CoreEngine'][_0x386055(0x40a)][_0x386055(0x1f0)](this);if(!$gameTemp[_0x386055(0x1e4)])this['levelUpRecovery']();},Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x407)]=function(){const _0x44d248=_0x5f3bde;this[_0x44d248(0x5ba)]={};if(VisuMZ[_0x44d248(0x23a)][_0x44d248(0x22e)]['QoL'][_0x44d248(0x406)])this[_0x44d248(0x7c6)]=this[_0x44d248(0x7e6)];if(VisuMZ[_0x44d248(0x23a)][_0x44d248(0x22e)]['QoL'][_0x44d248(0x48d)])this[_0x44d248(0x6ca)]=this[_0x44d248(0x70b)];},Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x39e)]=function(){const _0x52845d=_0x5f3bde;if(this[_0x52845d(0x4cb)]())return 0x1;const _0x50e2ee=this[_0x52845d(0x246)]()-this[_0x52845d(0x4f8)](),_0x98ef21=this[_0x52845d(0x754)]()-this[_0x52845d(0x4f8)]();return(_0x98ef21/_0x50e2ee)['clamp'](0x0,0x1);},Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x5b2)]=function(){const _0x5c05a2=_0x5f3bde,_0x5ec757=Game_Battler[_0x5c05a2(0x371)][_0x5c05a2(0x5b2)]['call'](this);for(const _0x39867a of this[_0x5c05a2(0x63e)]()){_0x39867a&&_0x5ec757[_0x5c05a2(0x296)](_0x39867a);}return _0x5ec757['push'](this[_0x5c05a2(0x733)](),this[_0x5c05a2(0x2b5)]()),_0x5ec757;},Object[_0x5f3bde(0x4e9)](Game_Enemy[_0x5f3bde(0x371)],_0x5f3bde(0x528),{'get':function(){const _0x5dad8f=_0x5f3bde;return this[_0x5dad8f(0x31a)]();},'configurable':!![]}),Game_Enemy['prototype'][_0x5f3bde(0x31a)]=function(){const _0x1ee600=_0x5f3bde;return this['enemy']()[_0x1ee600(0x528)];},Game_Enemy[_0x5f3bde(0x371)][_0x5f3bde(0x7c5)]=function(){const _0x7f93f8=_0x5f3bde;!this['_repositioned']&&(this[_0x7f93f8(0x566)]+=Math['round']((Graphics['height']-0x270)/0x2),this[_0x7f93f8(0x566)]-=Math['floor']((Graphics[_0x7f93f8(0x5b1)]-Graphics[_0x7f93f8(0x4ea)])/0x2),$gameSystem['isSideView']()?this[_0x7f93f8(0x7a1)]-=Math[_0x7f93f8(0x43f)]((Graphics[_0x7f93f8(0x431)]-Graphics[_0x7f93f8(0x74e)])/0x2):this['_screenX']+=Math['round']((Graphics['boxWidth']-0x330)/0x2)),this[_0x7f93f8(0x270)]=!![];},Game_Party[_0x5f3bde(0x371)]['maxGold']=function(){const _0x52621f=_0x5f3bde;return VisuMZ[_0x52621f(0x23a)][_0x52621f(0x22e)][_0x52621f(0x736)][_0x52621f(0x426)];},VisuMZ[_0x5f3bde(0x23a)]['Game_Party_consumeItem']=Game_Party['prototype'][_0x5f3bde(0x601)],Game_Party[_0x5f3bde(0x371)][_0x5f3bde(0x601)]=function(_0x4859c1){const _0x2946d9=_0x5f3bde;if(VisuMZ[_0x2946d9(0x23a)][_0x2946d9(0x22e)]['QoL'][_0x2946d9(0x67c)]&&DataManager[_0x2946d9(0x2bf)](_0x4859c1))return;VisuMZ[_0x2946d9(0x23a)]['Game_Party_consumeItem'][_0x2946d9(0x1f0)](this,_0x4859c1);},Game_Party['prototype'][_0x5f3bde(0x195)]=function(){const _0xcd4412=_0x5f3bde,_0x279689=VisuMZ[_0xcd4412(0x23a)][_0xcd4412(0x22e)]['QoL'],_0x532797=_0x279689[_0xcd4412(0x647)]??0x63;let _0x569fc0=[];(_0x279689[_0xcd4412(0x621)]??!![])&&(_0x569fc0=_0x569fc0[_0xcd4412(0x307)]($dataItems));(_0x279689[_0xcd4412(0x75e)]??!![])&&(_0x569fc0=_0x569fc0[_0xcd4412(0x307)]($dataWeapons));(_0x279689['BTestArmors']??!![])&&(_0x569fc0=_0x569fc0[_0xcd4412(0x307)]($dataArmors));for(const _0x4a321a of _0x569fc0){if(!_0x4a321a)continue;if(_0x4a321a['name']['trim']()<=0x0)continue;if(_0x4a321a[_0xcd4412(0x6ad)][_0xcd4412(0x772)](/-----/i))continue;this[_0xcd4412(0x547)](_0x4a321a,_0x532797);}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x2df)]=Game_Troop[_0x5f3bde(0x371)][_0x5f3bde(0x614)],Game_Troop[_0x5f3bde(0x371)][_0x5f3bde(0x614)]=function(_0x23b420){const _0x325657=_0x5f3bde;$gameTemp[_0x325657(0x649)](),$gameTemp[_0x325657(0x283)](_0x23b420),VisuMZ[_0x325657(0x23a)][_0x325657(0x2df)][_0x325657(0x1f0)](this,_0x23b420);},VisuMZ[_0x5f3bde(0x23a)]['Game_Map_setup']=Game_Map[_0x5f3bde(0x371)]['setup'],Game_Map[_0x5f3bde(0x371)]['setup']=function(_0xe4d24a){const _0x1cd073=_0x5f3bde;VisuMZ['CoreEngine'][_0x1cd073(0x2d9)][_0x1cd073(0x1f0)](this,_0xe4d24a),this[_0x1cd073(0x4a6)](_0xe4d24a);},Game_Map[_0x5f3bde(0x371)]['setupCoreEngine']=function(){const _0x4c3939=_0x5f3bde;this[_0x4c3939(0x2cf)]=VisuMZ[_0x4c3939(0x23a)][_0x4c3939(0x22e)][_0x4c3939(0x338)][_0x4c3939(0x1ef)]||![];if($dataMap&&$dataMap[_0x4c3939(0x5c8)]){if($dataMap[_0x4c3939(0x5c8)][_0x4c3939(0x772)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x4c3939(0x5c8)]['match'](/<HIDE TILE SHADOWS>/i))this[_0x4c3939(0x2cf)]=!![];}},Game_Map[_0x5f3bde(0x371)][_0x5f3bde(0x397)]=function(){const _0x114687=_0x5f3bde;if(this[_0x114687(0x2cf)]===undefined)this[_0x114687(0x4a6)]();return this[_0x114687(0x2cf)];},VisuMZ[_0x5f3bde(0x23a)]['Game_Character_processMoveCommand']=Game_Character[_0x5f3bde(0x371)][_0x5f3bde(0x781)],Game_Character[_0x5f3bde(0x371)][_0x5f3bde(0x781)]=function(_0x1c4d52){const _0x188700=_0x5f3bde;try{VisuMZ[_0x188700(0x23a)][_0x188700(0x556)][_0x188700(0x1f0)](this,_0x1c4d52);}catch(_0x40255d){if($gameTemp['isPlaytest']())console[_0x188700(0x5c0)](_0x40255d);}},Game_Player[_0x5f3bde(0x371)]['makeEncounterCount']=function(){const _0x457786=_0x5f3bde,_0x24dfb1=$gameMap[_0x457786(0x822)]();this[_0x457786(0x769)]=Math[_0x457786(0x434)](_0x24dfb1)+Math['randomInt'](_0x24dfb1)+this[_0x457786(0x2de)]();},Game_Player[_0x5f3bde(0x371)][_0x5f3bde(0x2de)]=function(){const _0x1b7d49=_0x5f3bde;return $dataMap&&$dataMap[_0x1b7d49(0x5c8)]&&$dataMap[_0x1b7d49(0x5c8)][_0x1b7d49(0x772)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x1b7d49(0x23a)]['Settings'][_0x1b7d49(0x338)][_0x1b7d49(0x425)];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6a3)]=Game_Event[_0x5f3bde(0x371)]['isCollidedWithEvents'],Game_Event[_0x5f3bde(0x371)][_0x5f3bde(0x40c)]=function(_0x519f29,_0x1ad435){const _0x218f24=_0x5f3bde;return this[_0x218f24(0x3b0)]()?this[_0x218f24(0x4d3)](_0x519f29,_0x1ad435):VisuMZ[_0x218f24(0x23a)][_0x218f24(0x6a3)][_0x218f24(0x1f0)](this,_0x519f29,_0x1ad435);},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x199404=_0x5f3bde;return VisuMZ['CoreEngine'][_0x199404(0x22e)][_0x199404(0x338)][_0x199404(0x2ee)];},Game_Event[_0x5f3bde(0x371)]['checkSmartEventCollision']=function(_0x30e687,_0x402a06){const _0x1f448e=_0x5f3bde;if(!this[_0x1f448e(0x436)]())return![];else{const _0x53e595=$gameMap[_0x1f448e(0x324)](_0x30e687,_0x402a06)[_0x1f448e(0x322)](_0x4f8dfd=>_0x4f8dfd['isNormalPriority']());return _0x53e595[_0x1f448e(0x6d7)]>0x0;}},VisuMZ['CoreEngine']['Game_Interpreter_command105']=Game_Interpreter[_0x5f3bde(0x371)]['command105'],Game_Interpreter['prototype'][_0x5f3bde(0x1f6)]=function(_0x3937a6){const _0x23eecb=_0x5f3bde,_0x49dcf7=this[_0x23eecb(0x297)]();return _0x49dcf7[_0x23eecb(0x772)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x49dcf7):VisuMZ[_0x23eecb(0x23a)][_0x23eecb(0x370)]['call'](this,_0x3937a6);},Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x297)]=function(){const _0x45165e=_0x5f3bde;let _0x496317='',_0x576720=this[_0x45165e(0x723)]+0x1;while(this[_0x45165e(0x7a0)][_0x576720]&&this['_list'][_0x576720][_0x45165e(0x616)]===0x195){_0x496317+=this[_0x45165e(0x7a0)][_0x576720]['parameters'][0x0]+'\x0a',_0x576720++;}return _0x496317;},Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x377)]=function(_0x210168){const _0x2cc480=_0x5f3bde;try{eval(_0x210168);}catch(_0x142144){$gameTemp[_0x2cc480(0x795)]()&&(console['log'](_0x2cc480(0x7b1)),console[_0x2cc480(0x5c0)](_0x142144));}return!![];},VisuMZ[_0x5f3bde(0x23a)]['Game_Interpreter_command111']=Game_Interpreter[_0x5f3bde(0x371)]['command111'],Game_Interpreter['prototype'][_0x5f3bde(0x450)]=function(_0x3ab7f2){const _0x5f3081=_0x5f3bde;try{VisuMZ['CoreEngine'][_0x5f3081(0x805)][_0x5f3081(0x1f0)](this,_0x3ab7f2);}catch(_0x44f60a){$gameTemp[_0x5f3081(0x795)]()&&(console[_0x5f3081(0x5c0)]('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x44f60a)),this[_0x5f3081(0x3a4)]();}return!![];},VisuMZ['CoreEngine'][_0x5f3bde(0x74d)]=Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x1d2)],Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x1d2)]=function(_0x2a8644){const _0x23478c=_0x5f3bde;try{VisuMZ[_0x23478c(0x23a)]['Game_Interpreter_command122'][_0x23478c(0x1f0)](this,_0x2a8644);}catch(_0xb6e79f){$gameTemp[_0x23478c(0x795)]()&&(console[_0x23478c(0x5c0)](_0x23478c(0x5c9)),console[_0x23478c(0x5c0)](_0xb6e79f));}return!![];},VisuMZ['CoreEngine'][_0x5f3bde(0x34f)]=Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x646)],Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x646)]=function(){const _0x272286=_0x5f3bde;try{VisuMZ['CoreEngine'][_0x272286(0x34f)]['call'](this);}catch(_0x119ed8){$gameTemp['isPlaytest']()&&(console[_0x272286(0x5c0)](_0x272286(0x6a1)),console['log'](_0x119ed8));}return!![];},VisuMZ[_0x5f3bde(0x23a)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x4cc)],Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x4cc)]=function(_0x59c549){const _0x26fc23=_0x5f3bde;return $gameTemp[_0x26fc23(0x261)](this),VisuMZ[_0x26fc23(0x23a)]['Game_Interpreter_PluginCommand'][_0x26fc23(0x1f0)](this,_0x59c549);},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x1ad)]=function(){const _0xa3447c=_0x5f3bde;return VisuMZ[_0xa3447c(0x23a)][_0xa3447c(0x22e)]['UI'][_0xa3447c(0x398)];},Scene_Base['prototype'][_0x5f3bde(0x4bf)]=function(){const _0x5f5712=_0x5f3bde;return VisuMZ[_0x5f5712(0x23a)]['Settings']['UI'][_0x5f5712(0x737)];},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x7c1)]=function(){const _0x27eb34=_0x5f3bde;return VisuMZ[_0x27eb34(0x23a)][_0x27eb34(0x22e)]['UI']['BottomButtons'];},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x788)]=function(){const _0x4c30ed=_0x5f3bde;return VisuMZ[_0x4c30ed(0x23a)][_0x4c30ed(0x22e)]['UI']['RightMenus'];},Scene_Base[_0x5f3bde(0x371)]['mainCommandWidth']=function(){const _0x39f4ef=_0x5f3bde;return VisuMZ['CoreEngine']['Settings']['UI'][_0x39f4ef(0x2f5)];},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x44d)]=function(){const _0x5befad=_0x5f3bde;return VisuMZ['CoreEngine']['Settings']['UI'][_0x5befad(0x49e)];},Scene_Base[_0x5f3bde(0x371)]['isWindowMaskingEnabled']=function(){const _0xe6ecb4=_0x5f3bde;return VisuMZ['CoreEngine'][_0xe6ecb4(0x22e)][_0xe6ecb4(0x410)][_0xe6ecb4(0x37a)];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x2eb)]=Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x252)],Scene_Base['prototype'][_0x5f3bde(0x252)]=function(){const _0x1194ca=_0x5f3bde;VisuMZ['CoreEngine']['Scene_Base_createWindowLayer'][_0x1194ca(0x1f0)](this),this['createButtonAssistWindow'](),this[_0x1194ca(0x784)]['x']=Math[_0x1194ca(0x70a)](this['_windowLayer']['x']),this['_windowLayer']['y']=Math['round'](this[_0x1194ca(0x784)]['y']);},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x481)]=function(){},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x4e1)]=function(){const _0x56ebb1=_0x5f3bde;return TextManager['getInputMultiButtonStrings']('pageup',_0x56ebb1(0x804));},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x3ae)]=function(){const _0x2804d4=_0x5f3bde;return TextManager[_0x2804d4(0x25a)](_0x2804d4(0x44e));},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x23d)]=function(){const _0x3ceacc=_0x5f3bde;return TextManager[_0x3ceacc(0x25a)](_0x3ceacc(0x1e2));},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x518)]=function(){const _0x3d75cf=_0x5f3bde;return TextManager[_0x3d75cf(0x25a)]('ok');},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x372)]=function(){const _0x5bfddf=_0x5f3bde;return TextManager[_0x5bfddf(0x25a)](_0x5bfddf(0x48c));},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x2f2)]=function(){const _0x2494b9=_0x5f3bde;return this[_0x2494b9(0x56d)]&&this[_0x2494b9(0x56d)][_0x2494b9(0x402)]?TextManager[_0x2494b9(0x4cf)]:'';},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x64e)]=function(){return'';},Scene_Base[_0x5f3bde(0x371)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x3ff)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x2e2)]=function(){const _0x1468ea=_0x5f3bde;return TextManager[_0x1468ea(0x203)];},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x4dd)]=function(){return 0x0;},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x51c)]=function(){return 0x0;},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x76d)]=function(){return 0x0;},Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x19f)]=function(){return 0x0;},Scene_Base['prototype'][_0x5f3bde(0x72e)]=function(){return 0x0;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x43b)]=Scene_Boot['prototype'][_0x5f3bde(0x6d4)],Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x6d4)]=function(){const _0x654cd1=_0x5f3bde;VisuMZ['CoreEngine'][_0x654cd1(0x43b)][_0x654cd1(0x1f0)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x5f3bde(0x371)]['loadGameImagesCoreEngine']=function(){const _0x14cee8=_0x5f3bde,_0x146e2c=[_0x14cee8(0x1ac),_0x14cee8(0x770),_0x14cee8(0x48a),_0x14cee8(0x540),_0x14cee8(0x79b),_0x14cee8(0x6f0),_0x14cee8(0x253),_0x14cee8(0x68a),_0x14cee8(0x675),_0x14cee8(0x6cd),'system','tilesets','titles1',_0x14cee8(0x624)];for(const _0x1f1546 of _0x146e2c){const _0x420718=VisuMZ[_0x14cee8(0x23a)][_0x14cee8(0x22e)][_0x14cee8(0x2e3)][_0x1f1546],_0x559170=_0x14cee8(0x472)[_0x14cee8(0x763)](_0x1f1546);for(const _0x7516d4 of _0x420718){ImageManager[_0x14cee8(0x6e2)](_0x559170,_0x7516d4);}}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x832)]=Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x1be)],Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x1be)]=function(){const _0x4eff52=_0x5f3bde;Utils[_0x4eff52(0x341)](_0x4eff52(0x7cc))&&VisuMZ[_0x4eff52(0x23a)][_0x4eff52(0x22e)][_0x4eff52(0x338)][_0x4eff52(0x4f0)]?this['startAutoNewGame']():VisuMZ[_0x4eff52(0x23a)][_0x4eff52(0x832)][_0x4eff52(0x1f0)](this);},Scene_Boot[_0x5f3bde(0x371)]['startAutoNewGame']=function(){const _0x455103=_0x5f3bde;DataManager[_0x455103(0x80e)](),SceneManager[_0x455103(0x34c)](Scene_Map);},Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x831)]=function(){const _0x30c2b1=_0x5f3bde,_0x1300f7=$dataSystem[_0x30c2b1(0x323)][_0x30c2b1(0x6bb)],_0x4ffe25=$dataSystem[_0x30c2b1(0x323)][_0x30c2b1(0x475)],_0xcc5cb7=VisuMZ['CoreEngine'][_0x30c2b1(0x22e)]['UI'][_0x30c2b1(0x73a)];Graphics[_0x30c2b1(0x74e)]=_0x1300f7-_0xcc5cb7*0x2,Graphics[_0x30c2b1(0x4ea)]=_0x4ffe25-_0xcc5cb7*0x2,this[_0x30c2b1(0x2f0)]();},VisuMZ['CoreEngine']['Scene_Boot_updateDocumentTitle']=Scene_Boot['prototype']['updateDocumentTitle'],Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x396)]=function(){const _0x57c869=_0x5f3bde;this[_0x57c869(0x634)]()?this[_0x57c869(0x5dc)]():VisuMZ[_0x57c869(0x23a)]['Scene_Boot_updateDocumentTitle'][_0x57c869(0x1f0)](this);},Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x634)]=function(){const _0x2e1b93=_0x5f3bde;if(Scene_Title[_0x2e1b93(0x1a4)]==='')return![];if(Scene_Title[_0x2e1b93(0x1a4)]===_0x2e1b93(0x514))return![];if(Scene_Title[_0x2e1b93(0x74f)]==='')return![];if(Scene_Title[_0x2e1b93(0x74f)]===_0x2e1b93(0x576))return![];return!![];},Scene_Boot[_0x5f3bde(0x371)][_0x5f3bde(0x5dc)]=function(){const _0x21a1cb=_0x5f3bde,_0x19843d=$dataSystem[_0x21a1cb(0x643)],_0x37b447=Scene_Title[_0x21a1cb(0x1a4)]||'',_0x2403cf=Scene_Title[_0x21a1cb(0x74f)]||'',_0x2d229a=VisuMZ['CoreEngine'][_0x21a1cb(0x22e)]['MenuLayout'][_0x21a1cb(0x44f)][_0x21a1cb(0x315)],_0x56e26e=_0x2d229a[_0x21a1cb(0x763)](_0x19843d,_0x37b447,_0x2403cf);document[_0x21a1cb(0x731)]=_0x56e26e;},Scene_Boot[_0x5f3bde(0x371)]['determineSideButtonLayoutValid']=function(){const _0x1bc828=_0x5f3bde;if(VisuMZ[_0x1bc828(0x23a)][_0x1bc828(0x22e)]['UI'][_0x1bc828(0x45c)]){const _0x333a53=Graphics[_0x1bc828(0x431)]-Graphics[_0x1bc828(0x74e)]-VisuMZ[_0x1bc828(0x23a)][_0x1bc828(0x22e)]['UI'][_0x1bc828(0x73a)]*0x2,_0x23deac=Sprite_Button[_0x1bc828(0x371)][_0x1bc828(0x5e8)][_0x1bc828(0x1f0)](this)*0x4;if(_0x333a53>=_0x23deac)SceneManager[_0x1bc828(0x1f1)](!![]);}},Scene_Title[_0x5f3bde(0x1a4)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x789)][_0x5f3bde(0x44f)][_0x5f3bde(0x514)],Scene_Title[_0x5f3bde(0x74f)]=VisuMZ[_0x5f3bde(0x23a)]['Settings'][_0x5f3bde(0x789)][_0x5f3bde(0x44f)][_0x5f3bde(0x51e)],Scene_Title[_0x5f3bde(0x7b6)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x632)],VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x492)]=Scene_Title[_0x5f3bde(0x371)][_0x5f3bde(0x41c)],Scene_Title[_0x5f3bde(0x371)][_0x5f3bde(0x41c)]=function(){const _0x1871b7=_0x5f3bde;VisuMZ[_0x1871b7(0x23a)][_0x1871b7(0x22e)][_0x1871b7(0x789)][_0x1871b7(0x44f)]['drawGameTitle'][_0x1871b7(0x1f0)](this);if(Scene_Title[_0x1871b7(0x1a4)]!==''&&Scene_Title[_0x1871b7(0x1a4)]!==_0x1871b7(0x514))this['drawGameSubtitle']();if(Scene_Title['version']!==''&&Scene_Title[_0x1871b7(0x74f)]!==_0x1871b7(0x576))this[_0x1871b7(0x52e)]();},Scene_Title[_0x5f3bde(0x371)][_0x5f3bde(0x40b)]=function(){const _0x1d4646=_0x5f3bde;VisuMZ[_0x1d4646(0x23a)][_0x1d4646(0x22e)][_0x1d4646(0x789)][_0x1d4646(0x44f)]['drawGameSubtitle'][_0x1d4646(0x1f0)](this);},Scene_Title[_0x5f3bde(0x371)][_0x5f3bde(0x52e)]=function(){const _0x455b72=_0x5f3bde;VisuMZ[_0x455b72(0x23a)][_0x455b72(0x22e)][_0x455b72(0x789)][_0x455b72(0x44f)][_0x455b72(0x52e)]['call'](this);},Scene_Title['prototype']['createCommandWindow']=function(){const _0x55b646=_0x5f3bde;this[_0x55b646(0x28c)]();const _0x40ab2f=$dataSystem[_0x55b646(0x36d)][_0x55b646(0x3dd)],_0x56a579=this[_0x55b646(0x477)]();this[_0x55b646(0x416)]=new Window_TitleCommand(_0x56a579),this[_0x55b646(0x416)][_0x55b646(0x3d8)](_0x40ab2f);const _0x576347=this[_0x55b646(0x477)]();this[_0x55b646(0x416)][_0x55b646(0x817)](_0x576347['x'],_0x576347['y'],_0x576347[_0x55b646(0x431)],_0x576347['height']),this[_0x55b646(0x242)](this['_commandWindow']);},Scene_Title[_0x5f3bde(0x371)]['commandWindowRows']=function(){const _0x1274c4=_0x5f3bde;return this['_commandWindow']?this['_commandWindow'][_0x1274c4(0x3aa)]():VisuMZ[_0x1274c4(0x23a)][_0x1274c4(0x22e)]['TitleCommandList'][_0x1274c4(0x6d7)];},Scene_Title['prototype'][_0x5f3bde(0x477)]=function(){const _0x36f950=_0x5f3bde;return VisuMZ[_0x36f950(0x23a)][_0x36f950(0x22e)][_0x36f950(0x789)]['Title'][_0x36f950(0x439)]['call'](this);},Scene_Title[_0x5f3bde(0x371)][_0x5f3bde(0x28c)]=function(){const _0x2a4d1d=_0x5f3bde;for(const _0x31489a of Scene_Title[_0x2a4d1d(0x7b6)]){const _0x379e39=new Sprite_TitlePictureButton(_0x31489a);this[_0x2a4d1d(0x1bf)](_0x379e39);}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x5d3)]=Scene_Map['prototype']['initialize'],Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x301)]=function(){const _0x1489fc=_0x5f3bde;VisuMZ[_0x1489fc(0x23a)]['Scene_Map_initialize'][_0x1489fc(0x1f0)](this),$gameTemp[_0x1489fc(0x649)](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine'][_0x5f3bde(0x77a)]=Scene_Map['prototype'][_0x5f3bde(0x428)],Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x428)]=function(){const _0x1b8565=_0x5f3bde;VisuMZ[_0x1b8565(0x23a)][_0x1b8565(0x77a)]['call'](this),$gameTemp[_0x1b8565(0x7bd)]&&!$gameMessage[_0x1b8565(0x7c9)]()&&(this['updateMain'](),SceneManager['updateEffekseer']());},Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x390)]=function(){const _0x5c3aaa=_0x5f3bde;Scene_Message[_0x5c3aaa(0x371)]['terminate'][_0x5c3aaa(0x1f0)](this),!SceneManager[_0x5c3aaa(0x62a)](Scene_Battle)&&(this[_0x5c3aaa(0x5de)][_0x5c3aaa(0x816)](),this[_0x5c3aaa(0x5b3)][_0x5c3aaa(0x652)](),this['_windowLayer'][_0x5c3aaa(0x402)]=![],SceneManager[_0x5c3aaa(0x509)]()),$gameScreen['clearZoom'](),this[_0x5c3aaa(0x476)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x69d)]=Scene_Map[_0x5f3bde(0x371)]['createMenuButton'],Scene_Map[_0x5f3bde(0x371)]['createMenuButton']=function(){const _0x19c335=_0x5f3bde;VisuMZ[_0x19c335(0x23a)][_0x19c335(0x69d)][_0x19c335(0x1f0)](this),SceneManager['isSideButtonLayout']()&&this[_0x19c335(0x6bd)]();},Scene_Map['prototype']['moveMenuButtonSideButtonLayout']=function(){const _0x53651a=_0x5f3bde;this[_0x53651a(0x3f4)]['x']=Graphics[_0x53651a(0x74e)]+0x4;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1ec)]=Scene_Map['prototype'][_0x5f3bde(0x2b6)],Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x2b6)]=function(){const _0x1a0495=_0x5f3bde;VisuMZ['CoreEngine']['Scene_Map_updateScene']['call'](this),this[_0x1a0495(0x41e)](),this[_0x1a0495(0x7ba)]();},Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x41e)]=function(){const _0x3d3890=_0x5f3bde;Input[_0x3d3890(0x36a)](_0x3d3890(0x257))&&(ConfigManager[_0x3d3890(0x5cb)]=!ConfigManager[_0x3d3890(0x5cb)],ConfigManager[_0x3d3890(0x46d)]());},Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x476)]=function(){const _0x18e200=_0x5f3bde;this[_0x18e200(0x42d)]=[];},Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x7ba)]=function(){const _0x51d462=_0x5f3bde;if(!this[_0x51d462(0x42d)])return;for(const _0x2ebeb7 of this['_onceParallelInterpreters']){_0x2ebeb7&&_0x2ebeb7['update']();}},Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x4d9)]=function(_0x489b5f){const _0x53ff92=_0x5f3bde,_0x2761c5=$dataCommonEvents[_0x489b5f];if(!_0x2761c5)return;const _0x279ac0=new Game_OnceParallelInterpreter();this[_0x53ff92(0x28f)](_0x279ac0),_0x279ac0['setCommonEvent'](_0x489b5f);},Scene_Map['prototype'][_0x5f3bde(0x28f)]=function(_0x5473df){const _0x33434e=_0x5f3bde;this[_0x33434e(0x42d)]=this['_onceParallelInterpreters']||[],this[_0x33434e(0x42d)][_0x33434e(0x296)](_0x5473df);},Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x80b)]=function(_0x128a0d){const _0x427ae0=_0x5f3bde;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this[_0x427ae0(0x42d)]['remove'](_0x128a0d);};function Game_OnceParallelInterpreter(){const _0x518977=_0x5f3bde;this[_0x518977(0x301)](...arguments);}function _0x278f(_0x2b140a,_0x120fc4){const _0x4e212f=_0x4e21();return _0x278f=function(_0x278f15,_0x1d675d){_0x278f15=_0x278f15-0x18a;let _0x159275=_0x4e212f[_0x278f15];return _0x159275;},_0x278f(_0x2b140a,_0x120fc4);}Game_OnceParallelInterpreter[_0x5f3bde(0x371)]=Object[_0x5f3bde(0x549)](Game_Interpreter[_0x5f3bde(0x371)]),Game_OnceParallelInterpreter[_0x5f3bde(0x371)][_0x5f3bde(0x7ff)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x5f3bde(0x538)]=function(_0x2f347e){const _0x65b426=$dataCommonEvents[_0x2f347e];_0x65b426?this['setup'](_0x65b426['list'],0x0):this['terminate']();},Game_OnceParallelInterpreter[_0x5f3bde(0x371)]['terminate']=function(){const _0x4addc2=_0x5f3bde;if(!SceneManager['isSceneMap']())return;SceneManager[_0x4addc2(0x77c)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x4addc2(0x371)]['terminate'][_0x4addc2(0x1f0)](this);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x3c4)]=Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x56b)],Scene_MenuBase['prototype'][_0x5f3bde(0x56b)]=function(){const _0x2a544a=_0x5f3bde;let _0x5c8f30=0x0;return SceneManager[_0x2a544a(0x7e0)]()?_0x5c8f30=this[_0x2a544a(0x353)]():_0x5c8f30=VisuMZ[_0x2a544a(0x23a)][_0x2a544a(0x3c4)][_0x2a544a(0x1f0)](this),this[_0x2a544a(0x806)]()&&this[_0x2a544a(0x59f)]()===_0x2a544a(0x49d)&&(_0x5c8f30+=Window_ButtonAssist[_0x2a544a(0x371)][_0x2a544a(0x5c5)]()),_0x5c8f30;},Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x353)]=function(){const _0x19679b=_0x5f3bde;return this['isBottomHelpMode']()?this[_0x19679b(0x4cd)]():0x0;},VisuMZ['CoreEngine'][_0x5f3bde(0x6c7)]=Scene_MenuBase[_0x5f3bde(0x371)]['mainAreaTop'],Scene_MenuBase[_0x5f3bde(0x371)]['mainAreaTop']=function(){const _0x4db0a6=_0x5f3bde;return SceneManager['areButtonsOutsideMainUI']()?this[_0x4db0a6(0x198)]():VisuMZ[_0x4db0a6(0x23a)][_0x4db0a6(0x6c7)][_0x4db0a6(0x1f0)](this);},Scene_MenuBase['prototype'][_0x5f3bde(0x198)]=function(){const _0x552da2=_0x5f3bde;return!this['isBottomHelpMode']()?this[_0x552da2(0x5aa)]():0x0;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1d6)]=Scene_MenuBase['prototype'][_0x5f3bde(0x199)],Scene_MenuBase['prototype'][_0x5f3bde(0x199)]=function(){const _0x3c9e29=_0x5f3bde;let _0x5ad330=0x0;return SceneManager[_0x3c9e29(0x7e0)]()?_0x5ad330=this['mainAreaHeightSideButtonLayout']():_0x5ad330=VisuMZ[_0x3c9e29(0x23a)][_0x3c9e29(0x1d6)]['call'](this),this[_0x3c9e29(0x806)]()&&this[_0x3c9e29(0x59f)]()!==_0x3c9e29(0x350)&&(_0x5ad330-=Window_ButtonAssist['prototype']['lineHeight']()),_0x5ad330;},Scene_MenuBase[_0x5f3bde(0x371)]['mainAreaHeightSideButtonLayout']=function(){const _0x276277=_0x5f3bde;return Graphics[_0x276277(0x4ea)]-this[_0x276277(0x2cc)]();},VisuMZ[_0x5f3bde(0x23a)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x243)],Scene_MenuBase['prototype'][_0x5f3bde(0x243)]=function(){const _0x43b4a1=_0x5f3bde;this[_0x43b4a1(0x4da)]=new PIXI[(_0x43b4a1(0x6c5))]['BlurFilter'](clamp=!![]),this[_0x43b4a1(0x70f)]=new Sprite(),this[_0x43b4a1(0x70f)][_0x43b4a1(0x2ba)]=SceneManager[_0x43b4a1(0x6c3)](),this[_0x43b4a1(0x70f)][_0x43b4a1(0x6c5)]=[this[_0x43b4a1(0x4da)]],this['addChild'](this[_0x43b4a1(0x70f)]),this['setBackgroundOpacity'](0xc0),this['setBackgroundOpacity'](this[_0x43b4a1(0x7e9)]()),this[_0x43b4a1(0x7ec)]();},Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x7e9)]=function(){const _0x4bb012=_0x5f3bde,_0x55ad33=String(this['constructor'][_0x4bb012(0x6ad)]),_0x4b5df2=this[_0x4bb012(0x392)](_0x55ad33);return _0x4b5df2?_0x4b5df2[_0x4bb012(0x2e8)]:0xc0;},Scene_MenuBase[_0x5f3bde(0x371)]['createCustomBackgroundImages']=function(){const _0x12fc7c=_0x5f3bde,_0x4571a2=String(this[_0x12fc7c(0x7ff)][_0x12fc7c(0x6ad)]),_0x5c7df2=this[_0x12fc7c(0x392)](_0x4571a2);_0x5c7df2&&(_0x5c7df2[_0x12fc7c(0x55c)]!==''||_0x5c7df2['BgFilename2']!=='')&&(this[_0x12fc7c(0x1d8)]=new Sprite(ImageManager[_0x12fc7c(0x661)](_0x5c7df2[_0x12fc7c(0x55c)])),this[_0x12fc7c(0x3f0)]=new Sprite(ImageManager['loadTitle2'](_0x5c7df2[_0x12fc7c(0x29c)])),this['addChild'](this['_backSprite1']),this[_0x12fc7c(0x1bf)](this['_backSprite2']),this['_backSprite1'][_0x12fc7c(0x2ba)][_0x12fc7c(0x480)](this[_0x12fc7c(0x696)][_0x12fc7c(0x687)](this,this['_backSprite1'])),this['_backSprite2'][_0x12fc7c(0x2ba)][_0x12fc7c(0x480)](this['adjustSprite'][_0x12fc7c(0x687)](this,this[_0x12fc7c(0x3f0)])));},Scene_MenuBase['prototype']['getCustomBackgroundSettings']=function(_0xb24c05){const _0x58be28=_0x5f3bde;return VisuMZ[_0x58be28(0x23a)][_0x58be28(0x22e)]['MenuBg'][_0xb24c05]||VisuMZ[_0x58be28(0x23a)][_0x58be28(0x22e)][_0x58be28(0x420)][_0x58be28(0x47f)];},Scene_MenuBase['prototype'][_0x5f3bde(0x696)]=function(_0x48e0eb){const _0x1a35dc=_0x5f3bde;this[_0x1a35dc(0x2ff)](_0x48e0eb),this[_0x1a35dc(0x71d)](_0x48e0eb);},VisuMZ['CoreEngine'][_0x5f3bde(0x3d0)]=Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x2d5)],Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x2d5)]=function(){const _0x15d10d=_0x5f3bde;VisuMZ[_0x15d10d(0x23a)][_0x15d10d(0x3d0)][_0x15d10d(0x1f0)](this),SceneManager[_0x15d10d(0x1b0)]()&&this[_0x15d10d(0x1c2)]();},Scene_MenuBase['prototype']['moveCancelButtonSideButtonLayout']=function(){const _0x396086=_0x5f3bde;this[_0x396086(0x572)]['x']=Graphics[_0x396086(0x74e)]+0x4;},VisuMZ['CoreEngine'][_0x5f3bde(0x320)]=Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x443)],Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x443)]=function(){const _0x3fa588=_0x5f3bde;VisuMZ[_0x3fa588(0x23a)][_0x3fa588(0x320)][_0x3fa588(0x1f0)](this),SceneManager[_0x3fa588(0x1b0)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x783)]=function(){const _0x5ace23=_0x5f3bde;this[_0x5ace23(0x56d)]['x']=-0x1*(this[_0x5ace23(0x56d)][_0x5ace23(0x431)]+this[_0x5ace23(0x609)]['width']+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x5ace23(0x609)][_0x5ace23(0x431)]+0x4);},Scene_MenuBase['prototype'][_0x5f3bde(0x806)]=function(){const _0x16cdcd=_0x5f3bde;return VisuMZ['CoreEngine'][_0x16cdcd(0x22e)]['ButtonAssist']['Enable'];},Scene_MenuBase['prototype'][_0x5f3bde(0x59f)]=function(){const _0x4cac59=_0x5f3bde;return SceneManager[_0x4cac59(0x1b0)]()||SceneManager[_0x4cac59(0x474)]()?VisuMZ[_0x4cac59(0x23a)][_0x4cac59(0x22e)]['ButtonAssist'][_0x4cac59(0x5d1)]:_0x4cac59(0x350);},Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x481)]=function(){const _0x453ec6=_0x5f3bde;if(!this[_0x453ec6(0x806)]())return;const _0x28bec3=this['buttonAssistWindowRect']();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x28bec3),this[_0x453ec6(0x242)](this['_buttonAssistWindow']);},Scene_MenuBase[_0x5f3bde(0x371)][_0x5f3bde(0x33f)]=function(){const _0x3fda7f=_0x5f3bde;return this[_0x3fda7f(0x59f)]()===_0x3fda7f(0x350)?this[_0x3fda7f(0x276)]():this[_0x3fda7f(0x4b6)]();},Scene_MenuBase['prototype'][_0x5f3bde(0x276)]=function(){const _0x2e9438=_0x5f3bde,_0x45d6d2=ConfigManager[_0x2e9438(0x31d)]?(Sprite_Button[_0x2e9438(0x371)][_0x2e9438(0x5e8)]()+0x6)*0x2:0x0,_0x47b42c=this[_0x2e9438(0x2aa)](),_0x3eb735=Graphics[_0x2e9438(0x74e)]-_0x45d6d2*0x2,_0x12849e=this[_0x2e9438(0x44d)]();return new Rectangle(_0x45d6d2,_0x47b42c,_0x3eb735,_0x12849e);},Scene_MenuBase['prototype'][_0x5f3bde(0x4b6)]=function(){const _0xa5476d=_0x5f3bde,_0x31e0fe=Graphics['boxWidth'],_0x8a2d74=Window_ButtonAssist[_0xa5476d(0x371)][_0xa5476d(0x5c5)](),_0x33a22b=0x0;let _0x3bc773=0x0;return this[_0xa5476d(0x59f)]()===_0xa5476d(0x49d)?_0x3bc773=0x0:_0x3bc773=Graphics['boxHeight']-_0x8a2d74,new Rectangle(_0x33a22b,_0x3bc773,_0x31e0fe,_0x8a2d74);},Scene_Menu['layoutSettings']=VisuMZ['CoreEngine'][_0x5f3bde(0x22e)][_0x5f3bde(0x789)][_0x5f3bde(0x56f)],VisuMZ[_0x5f3bde(0x23a)]['Scene_Menu_create']=Scene_Menu[_0x5f3bde(0x371)][_0x5f3bde(0x549)],Scene_Menu[_0x5f3bde(0x371)]['create']=function(){const _0x48b5f6=_0x5f3bde;VisuMZ[_0x48b5f6(0x23a)]['Scene_Menu_create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x31ca91=_0x5f3bde;this[_0x31ca91(0x416)]&&this['_commandWindow'][_0x31ca91(0x3d8)](Scene_Menu[_0x31ca91(0x7bf)][_0x31ca91(0x4ef)]),this[_0x31ca91(0x207)]&&this[_0x31ca91(0x207)][_0x31ca91(0x3d8)](Scene_Menu[_0x31ca91(0x7bf)][_0x31ca91(0x605)]),this[_0x31ca91(0x34d)]&&this[_0x31ca91(0x34d)][_0x31ca91(0x3d8)](Scene_Menu[_0x31ca91(0x7bf)]['StatusBgType']);},Scene_Menu[_0x5f3bde(0x371)][_0x5f3bde(0x477)]=function(){const _0x5bee6e=_0x5f3bde;return Scene_Menu[_0x5bee6e(0x7bf)][_0x5bee6e(0x439)][_0x5bee6e(0x1f0)](this);},Scene_Menu[_0x5f3bde(0x371)][_0x5f3bde(0x5c2)]=function(){const _0x455fd9=_0x5f3bde;return Scene_Menu[_0x455fd9(0x7bf)][_0x455fd9(0x18b)]['call'](this);},Scene_Menu[_0x5f3bde(0x371)]['statusWindowRect']=function(){const _0x440f67=_0x5f3bde;return Scene_Menu[_0x440f67(0x7bf)][_0x440f67(0x2f1)]['call'](this);},Scene_Item[_0x5f3bde(0x7bf)]=VisuMZ['CoreEngine'][_0x5f3bde(0x22e)][_0x5f3bde(0x789)]['ItemMenu'],VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x5d7)]=Scene_Item[_0x5f3bde(0x371)]['create'],Scene_Item['prototype']['create']=function(){const _0xf824d=_0x5f3bde;VisuMZ[_0xf824d(0x23a)][_0xf824d(0x5d7)][_0xf824d(0x1f0)](this),this[_0xf824d(0x764)]();},Scene_Item[_0x5f3bde(0x371)][_0x5f3bde(0x764)]=function(){const _0x1bad06=_0x5f3bde;this[_0x1bad06(0x511)]&&this[_0x1bad06(0x511)]['setBackgroundType'](Scene_Item[_0x1bad06(0x7bf)][_0x1bad06(0x4a8)]),this[_0x1bad06(0x29b)]&&this[_0x1bad06(0x29b)]['setBackgroundType'](Scene_Item[_0x1bad06(0x7bf)][_0x1bad06(0x21b)]),this['_itemWindow']&&this[_0x1bad06(0x2ef)]['setBackgroundType'](Scene_Item[_0x1bad06(0x7bf)][_0x1bad06(0x4de)]),this[_0x1bad06(0x6c4)]&&this[_0x1bad06(0x6c4)][_0x1bad06(0x3d8)](Scene_Item['layoutSettings'][_0x1bad06(0x344)]);},Scene_Item['prototype']['helpWindowRect']=function(){const _0x5e9674=_0x5f3bde;return Scene_Item[_0x5e9674(0x7bf)]['HelpRect']['call'](this);},Scene_Item[_0x5f3bde(0x371)][_0x5f3bde(0x2ae)]=function(){const _0xc27b46=_0x5f3bde;return Scene_Item['layoutSettings'][_0xc27b46(0x495)][_0xc27b46(0x1f0)](this);},Scene_Item[_0x5f3bde(0x371)][_0x5f3bde(0x225)]=function(){const _0x244f99=_0x5f3bde;return Scene_Item[_0x244f99(0x7bf)][_0x244f99(0x4eb)][_0x244f99(0x1f0)](this);},Scene_Item[_0x5f3bde(0x371)][_0x5f3bde(0x4b2)]=function(){const _0x45fdeb=_0x5f3bde;return Scene_Item[_0x45fdeb(0x7bf)][_0x45fdeb(0x7e8)][_0x45fdeb(0x1f0)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x789)]['SkillMenu'],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill[_0x5f3bde(0x371)][_0x5f3bde(0x549)],Scene_Skill[_0x5f3bde(0x371)][_0x5f3bde(0x549)]=function(){const _0x4f0852=_0x5f3bde;VisuMZ[_0x4f0852(0x23a)][_0x4f0852(0x5f3)][_0x4f0852(0x1f0)](this),this[_0x4f0852(0x764)]();},Scene_Skill[_0x5f3bde(0x371)][_0x5f3bde(0x764)]=function(){const _0x2251cd=_0x5f3bde;this[_0x2251cd(0x511)]&&this[_0x2251cd(0x511)][_0x2251cd(0x3d8)](Scene_Skill[_0x2251cd(0x7bf)][_0x2251cd(0x4a8)]),this[_0x2251cd(0x6b0)]&&this[_0x2251cd(0x6b0)][_0x2251cd(0x3d8)](Scene_Skill[_0x2251cd(0x7bf)]['SkillTypeBgType']),this[_0x2251cd(0x34d)]&&this[_0x2251cd(0x34d)][_0x2251cd(0x3d8)](Scene_Skill['layoutSettings'][_0x2251cd(0x6e4)]),this[_0x2251cd(0x2ef)]&&this['_itemWindow'][_0x2251cd(0x3d8)](Scene_Skill[_0x2251cd(0x7bf)][_0x2251cd(0x4de)]),this[_0x2251cd(0x6c4)]&&this[_0x2251cd(0x6c4)][_0x2251cd(0x3d8)](Scene_Skill['layoutSettings'][_0x2251cd(0x344)]);},Scene_Skill['prototype'][_0x5f3bde(0x2a5)]=function(){const _0x30a549=_0x5f3bde;return Scene_Skill[_0x30a549(0x7bf)][_0x30a549(0x33a)]['call'](this);},Scene_Skill[_0x5f3bde(0x371)][_0x5f3bde(0x3fe)]=function(){const _0x264be2=_0x5f3bde;return Scene_Skill[_0x264be2(0x7bf)][_0x264be2(0x438)][_0x264be2(0x1f0)](this);},Scene_Skill['prototype'][_0x5f3bde(0x305)]=function(){const _0x390083=_0x5f3bde;return Scene_Skill['layoutSettings'][_0x390083(0x2f1)][_0x390083(0x1f0)](this);},Scene_Skill['prototype'][_0x5f3bde(0x225)]=function(){const _0x5d1dd5=_0x5f3bde;return Scene_Skill['layoutSettings'][_0x5d1dd5(0x4eb)][_0x5d1dd5(0x1f0)](this);},Scene_Skill[_0x5f3bde(0x371)][_0x5f3bde(0x4b2)]=function(){const _0x5640cb=_0x5f3bde;return Scene_Skill['layoutSettings'][_0x5640cb(0x7e8)][_0x5640cb(0x1f0)](this);},Scene_Equip['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x5f3bde(0x789)][_0x5f3bde(0x262)],VisuMZ['CoreEngine'][_0x5f3bde(0x4ec)]=Scene_Equip[_0x5f3bde(0x371)][_0x5f3bde(0x549)],Scene_Equip['prototype'][_0x5f3bde(0x549)]=function(){const _0x13b032=_0x5f3bde;VisuMZ[_0x13b032(0x23a)][_0x13b032(0x4ec)][_0x13b032(0x1f0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0xb88592=_0x5f3bde;this[_0xb88592(0x511)]&&this['_helpWindow'][_0xb88592(0x3d8)](Scene_Equip[_0xb88592(0x7bf)][_0xb88592(0x4a8)]),this[_0xb88592(0x34d)]&&this[_0xb88592(0x34d)]['setBackgroundType'](Scene_Equip[_0xb88592(0x7bf)][_0xb88592(0x6e4)]),this[_0xb88592(0x416)]&&this['_commandWindow'][_0xb88592(0x3d8)](Scene_Equip[_0xb88592(0x7bf)][_0xb88592(0x4ef)]),this[_0xb88592(0x529)]&&this[_0xb88592(0x529)][_0xb88592(0x3d8)](Scene_Equip[_0xb88592(0x7bf)]['SlotBgType']),this[_0xb88592(0x2ef)]&&this[_0xb88592(0x2ef)][_0xb88592(0x3d8)](Scene_Equip['layoutSettings'][_0xb88592(0x4de)]);},Scene_Equip[_0x5f3bde(0x371)][_0x5f3bde(0x2a5)]=function(){const _0x2fedc1=_0x5f3bde;return Scene_Equip[_0x2fedc1(0x7bf)][_0x2fedc1(0x33a)][_0x2fedc1(0x1f0)](this);},Scene_Equip[_0x5f3bde(0x371)][_0x5f3bde(0x305)]=function(){const _0x546edf=_0x5f3bde;return Scene_Equip[_0x546edf(0x7bf)]['StatusRect'][_0x546edf(0x1f0)](this);},Scene_Equip[_0x5f3bde(0x371)][_0x5f3bde(0x477)]=function(){const _0x3530c7=_0x5f3bde;return Scene_Equip[_0x3530c7(0x7bf)][_0x3530c7(0x439)][_0x3530c7(0x1f0)](this);},Scene_Equip[_0x5f3bde(0x371)][_0x5f3bde(0x440)]=function(){const _0x329220=_0x5f3bde;return Scene_Equip[_0x329220(0x7bf)][_0x329220(0x2b0)][_0x329220(0x1f0)](this);},Scene_Equip[_0x5f3bde(0x371)][_0x5f3bde(0x225)]=function(){const _0x1618e4=_0x5f3bde;return Scene_Equip[_0x1618e4(0x7bf)][_0x1618e4(0x4eb)][_0x1618e4(0x1f0)](this);},Scene_Status[_0x5f3bde(0x7bf)]=VisuMZ[_0x5f3bde(0x23a)]['Settings'][_0x5f3bde(0x789)]['StatusMenu'],VisuMZ['CoreEngine']['Scene_Status_create']=Scene_Status['prototype']['create'],Scene_Status[_0x5f3bde(0x371)]['create']=function(){const _0x421c92=_0x5f3bde;VisuMZ[_0x421c92(0x23a)][_0x421c92(0x4c8)]['call'](this),this[_0x421c92(0x764)]();},Scene_Status[_0x5f3bde(0x371)][_0x5f3bde(0x764)]=function(){const _0x5864bf=_0x5f3bde;this['_profileWindow']&&this[_0x5864bf(0x75d)][_0x5864bf(0x3d8)](Scene_Status[_0x5864bf(0x7bf)][_0x5864bf(0x18f)]),this[_0x5864bf(0x34d)]&&this['_statusWindow'][_0x5864bf(0x3d8)](Scene_Status[_0x5864bf(0x7bf)][_0x5864bf(0x6e4)]),this[_0x5864bf(0x3d7)]&&this['_statusParamsWindow'][_0x5864bf(0x3d8)](Scene_Status[_0x5864bf(0x7bf)][_0x5864bf(0x3b1)]),this['_statusEquipWindow']&&this[_0x5864bf(0x72c)][_0x5864bf(0x3d8)](Scene_Status['layoutSettings'][_0x5864bf(0x239)]);},Scene_Status['prototype']['profileWindowRect']=function(){const _0x3b8a16=_0x5f3bde;return Scene_Status[_0x3b8a16(0x7bf)][_0x3b8a16(0x577)]['call'](this);},Scene_Status[_0x5f3bde(0x371)][_0x5f3bde(0x305)]=function(){const _0x216b9e=_0x5f3bde;return Scene_Status[_0x216b9e(0x7bf)][_0x216b9e(0x2f1)][_0x216b9e(0x1f0)](this);},Scene_Status[_0x5f3bde(0x371)][_0x5f3bde(0x38c)]=function(){const _0x34f26f=_0x5f3bde;return Scene_Status[_0x34f26f(0x7bf)][_0x34f26f(0x490)][_0x34f26f(0x1f0)](this);},Scene_Status[_0x5f3bde(0x371)][_0x5f3bde(0x640)]=function(){const _0x1d54ce=_0x5f3bde;return Scene_Status[_0x1d54ce(0x7bf)]['StatusEquipRect'][_0x1d54ce(0x1f0)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x789)][_0x5f3bde(0x48f)],VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x825)]=Scene_Options['prototype'][_0x5f3bde(0x549)],Scene_Options['prototype']['create']=function(){const _0x2b5fad=_0x5f3bde;VisuMZ[_0x2b5fad(0x23a)][_0x2b5fad(0x825)][_0x2b5fad(0x1f0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x5f3bde(0x371)][_0x5f3bde(0x764)]=function(){const _0x4c1f8d=_0x5f3bde;this['_optionsWindow']&&this[_0x4c1f8d(0x6c1)][_0x4c1f8d(0x3d8)](Scene_Options[_0x4c1f8d(0x7bf)][_0x4c1f8d(0x3d9)]);},Scene_Options['prototype'][_0x5f3bde(0x5e5)]=function(){const _0x338b6d=_0x5f3bde;return Scene_Options[_0x338b6d(0x7bf)][_0x338b6d(0x310)][_0x338b6d(0x1f0)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x5f3bde(0x23a)]['Settings']['MenuLayout']['SaveMenu'],Scene_Save['prototype'][_0x5f3bde(0x549)]=function(){const _0x4a2884=_0x5f3bde;Scene_File[_0x4a2884(0x371)][_0x4a2884(0x549)][_0x4a2884(0x1f0)](this),this[_0x4a2884(0x764)]();},Scene_Save[_0x5f3bde(0x371)][_0x5f3bde(0x764)]=function(){const _0x2f8139=_0x5f3bde;this[_0x2f8139(0x511)]&&this[_0x2f8139(0x511)][_0x2f8139(0x3d8)](Scene_Save[_0x2f8139(0x7bf)][_0x2f8139(0x4a8)]),this[_0x2f8139(0x5cd)]&&this['_listWindow'][_0x2f8139(0x3d8)](Scene_Save[_0x2f8139(0x7bf)][_0x2f8139(0x2bb)]);},Scene_Save['prototype']['helpWindowRect']=function(){const _0x75eb9e=_0x5f3bde;return Scene_Save[_0x75eb9e(0x7bf)][_0x75eb9e(0x33a)][_0x75eb9e(0x1f0)](this);},Scene_Save['prototype'][_0x5f3bde(0x7d6)]=function(){const _0x263452=_0x5f3bde;return Scene_Save[_0x263452(0x7bf)][_0x263452(0x82d)][_0x263452(0x1f0)](this);},Scene_Load[_0x5f3bde(0x7bf)]=VisuMZ[_0x5f3bde(0x23a)]['Settings'][_0x5f3bde(0x789)]['LoadMenu'],Scene_Load[_0x5f3bde(0x371)][_0x5f3bde(0x549)]=function(){const _0x247d5b=_0x5f3bde;Scene_File['prototype'][_0x247d5b(0x549)][_0x247d5b(0x1f0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load['prototype'][_0x5f3bde(0x764)]=function(){const _0x29f0aa=_0x5f3bde;this[_0x29f0aa(0x511)]&&this[_0x29f0aa(0x511)][_0x29f0aa(0x3d8)](Scene_Load['layoutSettings'][_0x29f0aa(0x4a8)]),this[_0x29f0aa(0x5cd)]&&this[_0x29f0aa(0x5cd)][_0x29f0aa(0x3d8)](Scene_Load['layoutSettings'][_0x29f0aa(0x2bb)]);},Scene_Load[_0x5f3bde(0x371)]['helpWindowRect']=function(){const _0x429b2e=_0x5f3bde;return Scene_Load[_0x429b2e(0x7bf)][_0x429b2e(0x33a)][_0x429b2e(0x1f0)](this);},Scene_Load['prototype'][_0x5f3bde(0x7d6)]=function(){const _0x1d38f3=_0x5f3bde;return Scene_Load[_0x1d38f3(0x7bf)][_0x1d38f3(0x82d)][_0x1d38f3(0x1f0)](this);},Scene_GameEnd[_0x5f3bde(0x7bf)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x789)][_0x5f3bde(0x525)],VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1a2)]=Scene_GameEnd[_0x5f3bde(0x371)]['createBackground'],Scene_GameEnd['prototype']['createBackground']=function(){const _0x1a21a2=_0x5f3bde;Scene_MenuBase[_0x1a21a2(0x371)][_0x1a21a2(0x243)]['call'](this);},Scene_GameEnd[_0x5f3bde(0x371)][_0x5f3bde(0x807)]=function(){const _0x437c9f=_0x5f3bde,_0x558135=this['commandWindowRect']();this[_0x437c9f(0x416)]=new Window_GameEnd(_0x558135),this[_0x437c9f(0x416)][_0x437c9f(0x2af)]('cancel',this[_0x437c9f(0x329)][_0x437c9f(0x687)](this)),this[_0x437c9f(0x242)](this[_0x437c9f(0x416)]),this['_commandWindow']['setBackgroundType'](Scene_GameEnd['layoutSettings'][_0x437c9f(0x4ef)]);},Scene_GameEnd['prototype']['commandWindowRect']=function(){const _0x3f3660=_0x5f3bde;return Scene_GameEnd[_0x3f3660(0x7bf)]['CommandRect'][_0x3f3660(0x1f0)](this);},Scene_Shop[_0x5f3bde(0x7bf)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x789)]['ShopMenu'],VisuMZ[_0x5f3bde(0x23a)]['Scene_Shop_create']=Scene_Shop['prototype'][_0x5f3bde(0x549)],Scene_Shop[_0x5f3bde(0x371)][_0x5f3bde(0x549)]=function(){const _0x3fc2c=_0x5f3bde;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x3fc2c(0x1f0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop['prototype'][_0x5f3bde(0x764)]=function(){const _0x43a94e=_0x5f3bde;this[_0x43a94e(0x511)]&&this['_helpWindow'][_0x43a94e(0x3d8)](Scene_Shop[_0x43a94e(0x7bf)]['HelpBgType']),this['_goldWindow']&&this[_0x43a94e(0x207)][_0x43a94e(0x3d8)](Scene_Shop['layoutSettings'][_0x43a94e(0x605)]),this[_0x43a94e(0x416)]&&this[_0x43a94e(0x416)]['setBackgroundType'](Scene_Shop[_0x43a94e(0x7bf)][_0x43a94e(0x4ef)]),this['_dummyWindow']&&this[_0x43a94e(0x20e)]['setBackgroundType'](Scene_Shop[_0x43a94e(0x7bf)]['DummyBgType']),this[_0x43a94e(0x61c)]&&this[_0x43a94e(0x61c)][_0x43a94e(0x3d8)](Scene_Shop[_0x43a94e(0x7bf)][_0x43a94e(0x712)]),this[_0x43a94e(0x34d)]&&this[_0x43a94e(0x34d)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x43a94e(0x6e4)]),this[_0x43a94e(0x63b)]&&this['_buyWindow'][_0x43a94e(0x3d8)](Scene_Shop[_0x43a94e(0x7bf)][_0x43a94e(0x2ea)]),this[_0x43a94e(0x29b)]&&this['_categoryWindow'][_0x43a94e(0x3d8)](Scene_Shop[_0x43a94e(0x7bf)][_0x43a94e(0x21b)]),this[_0x43a94e(0x2b1)]&&this[_0x43a94e(0x2b1)][_0x43a94e(0x3d8)](Scene_Shop[_0x43a94e(0x7bf)][_0x43a94e(0x6f7)]);},Scene_Shop[_0x5f3bde(0x371)][_0x5f3bde(0x2a5)]=function(){const _0x3737a5=_0x5f3bde;return Scene_Shop['layoutSettings'][_0x3737a5(0x33a)]['call'](this);},Scene_Shop[_0x5f3bde(0x371)][_0x5f3bde(0x5c2)]=function(){const _0x5cd06e=_0x5f3bde;return Scene_Shop[_0x5cd06e(0x7bf)][_0x5cd06e(0x18b)][_0x5cd06e(0x1f0)](this);},Scene_Shop[_0x5f3bde(0x371)][_0x5f3bde(0x477)]=function(){const _0x18b32c=_0x5f3bde;return Scene_Shop['layoutSettings'][_0x18b32c(0x439)][_0x18b32c(0x1f0)](this);},Scene_Shop[_0x5f3bde(0x371)][_0x5f3bde(0x520)]=function(){const _0x163187=_0x5f3bde;return Scene_Shop[_0x163187(0x7bf)]['DummyRect'][_0x163187(0x1f0)](this);},Scene_Shop[_0x5f3bde(0x371)][_0x5f3bde(0x82c)]=function(){const _0x381404=_0x5f3bde;return Scene_Shop[_0x381404(0x7bf)][_0x381404(0x681)][_0x381404(0x1f0)](this);},Scene_Shop['prototype'][_0x5f3bde(0x305)]=function(){const _0x2db2cd=_0x5f3bde;return Scene_Shop[_0x2db2cd(0x7bf)][_0x2db2cd(0x2f1)][_0x2db2cd(0x1f0)](this);},Scene_Shop['prototype'][_0x5f3bde(0x65e)]=function(){const _0x4a7718=_0x5f3bde;return Scene_Shop[_0x4a7718(0x7bf)][_0x4a7718(0x206)][_0x4a7718(0x1f0)](this);},Scene_Shop[_0x5f3bde(0x371)][_0x5f3bde(0x2ae)]=function(){const _0x4c0ecc=_0x5f3bde;return Scene_Shop[_0x4c0ecc(0x7bf)]['CategoryRect']['call'](this);},Scene_Shop['prototype'][_0x5f3bde(0x25e)]=function(){const _0x41c477=_0x5f3bde;return Scene_Shop[_0x41c477(0x7bf)]['SellRect'][_0x41c477(0x1f0)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)]['MenuLayout'][_0x5f3bde(0x603)],VisuMZ[_0x5f3bde(0x23a)]['Scene_Name_create']=Scene_Name['prototype'][_0x5f3bde(0x549)],Scene_Name['prototype']['create']=function(){const _0x48da62=_0x5f3bde;VisuMZ[_0x48da62(0x23a)]['Scene_Name_create'][_0x48da62(0x1f0)](this),this[_0x48da62(0x764)]();},Scene_Name['prototype'][_0x5f3bde(0x764)]=function(){const _0x147070=_0x5f3bde;this['_editWindow']&&this[_0x147070(0x4df)][_0x147070(0x3d8)](Scene_Name[_0x147070(0x7bf)]['EditBgType']),this[_0x147070(0x6b5)]&&this['_inputWindow'][_0x147070(0x3d8)](Scene_Name[_0x147070(0x7bf)][_0x147070(0x32c)]);},Scene_Name[_0x5f3bde(0x371)][_0x5f3bde(0x2cc)]=function(){return 0x0;},Scene_Name[_0x5f3bde(0x371)][_0x5f3bde(0x48b)]=function(){const _0x635a82=_0x5f3bde;return Scene_Name[_0x635a82(0x7bf)][_0x635a82(0x244)][_0x635a82(0x1f0)](this);},Scene_Name[_0x5f3bde(0x371)][_0x5f3bde(0x6eb)]=function(){const _0x3ac677=_0x5f3bde;return Scene_Name['layoutSettings'][_0x3ac677(0x2ce)][_0x3ac677(0x1f0)](this);},Scene_Name[_0x5f3bde(0x371)]['EnableNameInput']=function(){const _0x1d4f89=_0x5f3bde;if(!this['_inputWindow'])return![];return VisuMZ[_0x1d4f89(0x23a)][_0x1d4f89(0x22e)]['KeyboardInput']['EnableNameInput'];},Scene_Name[_0x5f3bde(0x371)][_0x5f3bde(0x4e1)]=function(){const _0x2f4a75=_0x5f3bde;return this['EnableNameInput']()?TextManager[_0x2f4a75(0x25a)](_0x2f4a75(0x44e)):Scene_MenuBase[_0x2f4a75(0x371)]['buttonAssistKey1'][_0x2f4a75(0x1f0)](this);},Scene_Name[_0x5f3bde(0x371)][_0x5f3bde(0x2f2)]=function(){const _0x1503d3=_0x5f3bde;if(this[_0x1503d3(0x387)]()){const _0x7fb530=VisuMZ[_0x1503d3(0x23a)]['Settings'][_0x1503d3(0x42c)];return this['_inputWindow'][_0x1503d3(0x657)]==='keyboard'?_0x7fb530['Keyboard']||_0x1503d3(0x642):_0x7fb530[_0x1503d3(0x2dc)]||_0x1503d3(0x2dc);}else return Scene_MenuBase[_0x1503d3(0x371)]['buttonAssistText1'][_0x1503d3(0x1f0)](this);},VisuMZ[_0x5f3bde(0x23a)]['Scene_Name_onInputOk']=Scene_Name[_0x5f3bde(0x371)][_0x5f3bde(0x454)],Scene_Name[_0x5f3bde(0x371)]['onInputOk']=function(){const _0x393c53=_0x5f3bde;this['doesNameContainBannedWords']()?this[_0x393c53(0x457)]():VisuMZ[_0x393c53(0x23a)][_0x393c53(0x715)]['call'](this);},Scene_Name['prototype'][_0x5f3bde(0x461)]=function(){const _0x1aac26=_0x5f3bde,_0x1ded3f=VisuMZ[_0x1aac26(0x23a)][_0x1aac26(0x22e)][_0x1aac26(0x42c)];if(!_0x1ded3f)return![];const _0x47b7c8=_0x1ded3f['BannedWords'];if(!_0x47b7c8)return![];const _0x33d94b=this['_editWindow'][_0x1aac26(0x6ad)]()['toLowerCase']();for(const _0x21212f of _0x47b7c8){if(_0x33d94b[_0x1aac26(0x638)](_0x21212f[_0x1aac26(0x64b)]()))return!![];}return![];},Scene_Name[_0x5f3bde(0x371)]['onInputBannedWords']=function(){SoundManager['playBuzzer']();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x455)]=Scene_Battle[_0x5f3bde(0x371)]['update'],Scene_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x816)]=function(){const _0x4abc29=_0x5f3bde;VisuMZ[_0x4abc29(0x23a)][_0x4abc29(0x455)][_0x4abc29(0x1f0)](this);if($gameTemp[_0x4abc29(0x7bd)])this[_0x4abc29(0x3e4)]();},Scene_Battle[_0x5f3bde(0x371)]['updatePlayTestF7']=function(){const _0x12677f=_0x5f3bde;!BattleManager[_0x12677f(0x404)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x12677f(0x7c9)]()&&(this['_playtestF7Looping']=!![],this[_0x12677f(0x816)](),SceneManager[_0x12677f(0x1a5)](),this[_0x12677f(0x3de)]=![]);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x51d)]=Scene_Battle[_0x5f3bde(0x371)]['createCancelButton'],Scene_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x2d5)]=function(){const _0x26014a=_0x5f3bde;VisuMZ[_0x26014a(0x23a)][_0x26014a(0x51d)][_0x26014a(0x1f0)](this),SceneManager[_0x26014a(0x1b0)]()&&this['repositionCancelButtonSideButtonLayout']();},Scene_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x73f)]=function(){const _0x2521fa=_0x5f3bde;this[_0x2521fa(0x572)]['x']=Graphics['boxWidth']+0x4,this[_0x2521fa(0x7c1)]()?this[_0x2521fa(0x572)]['y']=Graphics[_0x2521fa(0x4ea)]-this[_0x2521fa(0x44d)]():this[_0x2521fa(0x572)]['y']=0x0;},VisuMZ['CoreEngine'][_0x5f3bde(0x1e9)]=Sprite_Button[_0x5f3bde(0x371)]['initialize'],Sprite_Button['prototype'][_0x5f3bde(0x301)]=function(_0x5b97a5){const _0x522ad2=_0x5f3bde;VisuMZ[_0x522ad2(0x23a)]['Sprite_Button_initialize'][_0x522ad2(0x1f0)](this,_0x5b97a5),this['initButtonHidden']();},Sprite_Button[_0x5f3bde(0x371)][_0x5f3bde(0x25d)]=function(){const _0x1b9ecd=_0x5f3bde,_0x1d0811=VisuMZ[_0x1b9ecd(0x23a)]['Settings']['UI'];this[_0x1b9ecd(0x5b7)]=![];switch(this[_0x1b9ecd(0x701)]){case _0x1b9ecd(0x48c):this[_0x1b9ecd(0x5b7)]=!_0x1d0811['cancelShowButton'];break;case'pageup':case'pagedown':this[_0x1b9ecd(0x5b7)]=!_0x1d0811[_0x1b9ecd(0x41f)];break;case _0x1b9ecd(0x599):case'up':case'down2':case _0x1b9ecd(0x5a4):case'ok':this[_0x1b9ecd(0x5b7)]=!_0x1d0811['numberShowButton'];break;case _0x1b9ecd(0x5f4):this['_isButtonHidden']=!_0x1d0811[_0x1b9ecd(0x65c)];break;}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1a1)]=Sprite_Button[_0x5f3bde(0x371)][_0x5f3bde(0x220)],Sprite_Button[_0x5f3bde(0x371)]['updateOpacity']=function(){const _0x59112d=_0x5f3bde;SceneManager['areButtonsHidden']()||this['_isButtonHidden']?this[_0x59112d(0x710)]():VisuMZ[_0x59112d(0x23a)][_0x59112d(0x1a1)][_0x59112d(0x1f0)](this);},Sprite_Button[_0x5f3bde(0x371)][_0x5f3bde(0x710)]=function(){const _0x13f53d=_0x5f3bde;this[_0x13f53d(0x402)]=![],this[_0x13f53d(0x460)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x13f53d(0x5b1)]*0xa;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x231)]=Sprite_Battler['prototype']['startMove'],Sprite_Battler[_0x5f3bde(0x371)][_0x5f3bde(0x59b)]=function(_0x235ada,_0x247a50,_0x5914c3){const _0x355ea7=_0x5f3bde;(this[_0x355ea7(0x584)]!==_0x235ada||this[_0x355ea7(0x362)]!==_0x247a50)&&(this['setMoveEasingType'](_0x355ea7(0x352)),this[_0x355ea7(0x5bf)]=_0x5914c3),VisuMZ[_0x355ea7(0x23a)][_0x355ea7(0x231)][_0x355ea7(0x1f0)](this,_0x235ada,_0x247a50,_0x5914c3);},Sprite_Battler[_0x5f3bde(0x371)][_0x5f3bde(0x64d)]=function(_0x38ea81){const _0x273660=_0x5f3bde;this[_0x273660(0x40d)]=_0x38ea81;},Sprite_Battler[_0x5f3bde(0x371)][_0x5f3bde(0x69a)]=function(){const _0x4d90de=_0x5f3bde;if(this[_0x4d90de(0x725)]<=0x0)return;const _0x4765ee=this[_0x4d90de(0x725)],_0x324610=this['_movementWholeDuration'],_0x5d38dd=this['_moveEasingType'];this['_offsetX']=this[_0x4d90de(0x49a)](this[_0x4d90de(0x7f2)],this[_0x4d90de(0x584)],_0x4765ee,_0x324610,_0x5d38dd),this[_0x4d90de(0x81f)]=this[_0x4d90de(0x49a)](this['_offsetY'],this[_0x4d90de(0x362)],_0x4765ee,_0x324610,_0x5d38dd),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this[_0x4d90de(0x376)]();},Sprite_Battler['prototype']['applyEasing']=function(_0x4ca5ce,_0x5d7c41,_0x30dc19,_0x4199f9,_0x44c5df){const _0x16c6c7=_0x5f3bde,_0x21a7f2=VisuMZ['ApplyEasing']((_0x4199f9-_0x30dc19)/_0x4199f9,_0x44c5df||_0x16c6c7(0x352)),_0x2f48c6=VisuMZ[_0x16c6c7(0x786)]((_0x4199f9-_0x30dc19+0x1)/_0x4199f9,_0x44c5df||'Linear'),_0x9095ba=(_0x4ca5ce-_0x5d7c41*_0x21a7f2)/(0x1-_0x21a7f2);return _0x9095ba+(_0x5d7c41-_0x9095ba)*_0x2f48c6;},VisuMZ[_0x5f3bde(0x23a)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x6ce)],Sprite_Actor[_0x5f3bde(0x371)]['setActorHome']=function(_0x45943e){const _0xefb2c6=_0x5f3bde;VisuMZ[_0xefb2c6(0x23a)]['Settings']['UI']['RepositionActors']?this['setActorHomeRepositioned'](_0x45943e):VisuMZ[_0xefb2c6(0x23a)][_0xefb2c6(0x1cc)][_0xefb2c6(0x1f0)](this,_0x45943e);},Sprite_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x7b2)]=function(_0xd18909){const _0x2deded=_0x5f3bde;let _0x58010c=Math['round'](Graphics[_0x2deded(0x431)]/0x2+0xc0);_0x58010c-=Math['floor']((Graphics[_0x2deded(0x431)]-Graphics['boxWidth'])/0x2),_0x58010c+=_0xd18909*0x20;let _0x512ee3=Graphics[_0x2deded(0x5b1)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x512ee3-=Math[_0x2deded(0x43f)]((Graphics[_0x2deded(0x5b1)]-Graphics[_0x2deded(0x4ea)])/0x2),_0x512ee3+=_0xd18909*0x30,this['setHome'](_0x58010c,_0x512ee3);},Sprite_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x462)]=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x5f3bde(0x371)][_0x5f3bde(0x289)]=function(_0x55824f){const _0x310ca5=_0x5f3bde;this[_0x310ca5(0x2f8)]=_0x55824f;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x230)]=Sprite_Animation[_0x5f3bde(0x371)][_0x5f3bde(0x5ff)],Sprite_Animation[_0x5f3bde(0x371)][_0x5f3bde(0x5ff)]=function(){const _0x11e2ec=_0x5f3bde;if(this[_0x11e2ec(0x2f8)])return;VisuMZ[_0x11e2ec(0x23a)][_0x11e2ec(0x230)][_0x11e2ec(0x1f0)](this);},VisuMZ[_0x5f3bde(0x23a)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x5f3bde(0x371)][_0x5f3bde(0x3d3)],Sprite_Animation['prototype'][_0x5f3bde(0x3d3)]=function(_0x563fb8){const _0x555c4d=_0x5f3bde;this[_0x555c4d(0x3f9)]()?this[_0x555c4d(0x48e)](_0x563fb8):VisuMZ[_0x555c4d(0x23a)][_0x555c4d(0x50f)]['call'](this,_0x563fb8);},Sprite_Animation['prototype'][_0x5f3bde(0x3f9)]=function(){const _0x2ffcc7=_0x5f3bde;if(!this['_animation'])return![];const _0x594e15=this[_0x2ffcc7(0x3a3)][_0x2ffcc7(0x6ad)]||'';if(_0x594e15['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x594e15[_0x2ffcc7(0x772)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x2ffcc7(0x23a)][_0x2ffcc7(0x22e)][_0x2ffcc7(0x338)][_0x2ffcc7(0x6db)];},Sprite_Animation['prototype']['setViewportCoreEngineFix']=function(_0x1974f8){const _0xfa9741=_0x5f3bde,_0x150e7b=this[_0xfa9741(0x3df)],_0x24c053=this[_0xfa9741(0x3df)],_0x2caf03=this[_0xfa9741(0x3a3)][_0xfa9741(0x4d2)]*(this['_mirror']?-0x1:0x1)-_0x150e7b/0x2,_0x4b06d7=this[_0xfa9741(0x3a3)][_0xfa9741(0x5a6)]-_0x24c053/0x2,_0x3739a7=this[_0xfa9741(0x482)](_0x1974f8);_0x1974f8['gl'][_0xfa9741(0x306)](_0x2caf03+_0x3739a7['x'],_0x4b06d7+_0x3739a7['y'],_0x150e7b,_0x24c053);},Sprite_Animation['prototype'][_0x5f3bde(0x1df)]=function(_0xac65e3){const _0x17b784=_0x5f3bde;if(_0xac65e3[_0x17b784(0x718)]){}const _0x390a5d=this[_0x17b784(0x3a3)][_0x17b784(0x6ad)];let _0x5079f4=_0xac65e3[_0x17b784(0x5b1)]*_0xac65e3['scale']['y'],_0x12d6d8=0x0,_0x4f0e2c=-_0x5079f4/0x2;if(_0x390a5d[_0x17b784(0x772)](/<(?:HEAD|HEADER|TOP)>/i))_0x4f0e2c=-_0x5079f4;if(_0x390a5d['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x4f0e2c=0x0;if(this[_0x17b784(0x3a3)][_0x17b784(0x7f6)])_0x4f0e2c=0x0;if(_0x390a5d['match'](/<(?:LEFT)>/i))_0x12d6d8=-_0xac65e3[_0x17b784(0x431)]/0x2;if(_0x390a5d[_0x17b784(0x772)](/<(?:RIGHT)>/i))_0x12d6d8=_0xac65e3[_0x17b784(0x431)]/0x2;_0x390a5d[_0x17b784(0x772)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x12d6d8=Number(RegExp['$1'])*_0xac65e3[_0x17b784(0x431)]);_0x390a5d[_0x17b784(0x772)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x4f0e2c=(0x1-Number(RegExp['$1']))*-_0x5079f4);_0x390a5d[_0x17b784(0x772)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x12d6d8=Number(RegExp['$1'])*_0xac65e3[_0x17b784(0x431)],_0x4f0e2c=(0x1-Number(RegExp['$2']))*-_0x5079f4);if(_0x390a5d[_0x17b784(0x772)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x12d6d8+=Number(RegExp['$1']);if(_0x390a5d[_0x17b784(0x772)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x4f0e2c+=Number(RegExp['$1']);_0x390a5d[_0x17b784(0x772)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x12d6d8+=Number(RegExp['$1']),_0x4f0e2c+=Number(RegExp['$2']));const _0x1579b9=new Point(_0x12d6d8,_0x4f0e2c);return _0xac65e3[_0x17b784(0x2d4)](),_0xac65e3['worldTransform'][_0x17b784(0x6cc)](_0x1579b9);},Sprite_AnimationMV[_0x5f3bde(0x371)]['setupRate']=function(){const _0x4aa987=_0x5f3bde;this[_0x4aa987(0x82e)]=VisuMZ['CoreEngine'][_0x4aa987(0x22e)][_0x4aa987(0x338)][_0x4aa987(0x7aa)]??0x4,this[_0x4aa987(0x21a)](),this['_rate']=this[_0x4aa987(0x82e)][_0x4aa987(0x5bd)](0x1,0xa);},Sprite_AnimationMV[_0x5f3bde(0x371)][_0x5f3bde(0x21a)]=function(){const _0x1d9b0e=_0x5f3bde;if(!this[_0x1d9b0e(0x3a3)]);const _0x2c2295=this['_animation']['name']||'';_0x2c2295[_0x1d9b0e(0x772)](/<RATE:[ ](\d+)>/i)&&(this[_0x1d9b0e(0x82e)]=(Number(RegExp['$1'])||0x1)[_0x1d9b0e(0x5bd)](0x1,0xa));},Sprite_AnimationMV[_0x5f3bde(0x371)][_0x5f3bde(0x289)]=function(_0x10d833){const _0xc43d0=_0x5f3bde;this[_0xc43d0(0x2f8)]=_0x10d833;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x75a)]=Sprite_AnimationMV['prototype'][_0x5f3bde(0x4ff)],Sprite_AnimationMV[_0x5f3bde(0x371)][_0x5f3bde(0x4ff)]=function(_0xe842dc){const _0x289b93=_0x5f3bde;this[_0x289b93(0x2f8)]&&(_0xe842dc=JsonEx[_0x289b93(0x6de)](_0xe842dc),_0xe842dc['se']&&(_0xe842dc['se'][_0x289b93(0x1db)]=0x0)),VisuMZ['CoreEngine'][_0x289b93(0x75a)][_0x289b93(0x1f0)](this,_0xe842dc);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x823)]=Sprite_AnimationMV['prototype'][_0x5f3bde(0x7dd)],Sprite_AnimationMV[_0x5f3bde(0x371)][_0x5f3bde(0x7dd)]=function(){const _0x48d5bc=_0x5f3bde;VisuMZ[_0x48d5bc(0x23a)][_0x48d5bc(0x823)][_0x48d5bc(0x1f0)](this);if(this[_0x48d5bc(0x3a3)][_0x48d5bc(0x4a7)]===0x3){if(this['x']===0x0)this['x']=Math[_0x48d5bc(0x70a)](Graphics[_0x48d5bc(0x431)]/0x2);if(this['y']===0x0)this['y']=Math[_0x48d5bc(0x70a)](Graphics['height']/0x2);}},Sprite_Damage[_0x5f3bde(0x371)][_0x5f3bde(0x544)]=function(_0x589898){const _0x2beb50=_0x5f3bde;let _0x20c745=Math[_0x2beb50(0x1d0)](_0x589898)[_0x2beb50(0x478)]();this[_0x2beb50(0x555)]()&&(_0x20c745=VisuMZ[_0x2beb50(0x2ec)](_0x20c745));const _0x25f87a=this[_0x2beb50(0x68e)](),_0x47d0f5=Math[_0x2beb50(0x43f)](_0x25f87a*0.75);for(let _0x33c18e=0x0;_0x33c18e<_0x20c745[_0x2beb50(0x6d7)];_0x33c18e++){const _0x527323=this[_0x2beb50(0x1f5)](_0x47d0f5,_0x25f87a);_0x527323[_0x2beb50(0x2ba)]['drawText'](_0x20c745[_0x33c18e],0x0,0x0,_0x47d0f5,_0x25f87a,'center'),_0x527323['x']=(_0x33c18e-(_0x20c745[_0x2beb50(0x6d7)]-0x1)/0x2)*_0x47d0f5,_0x527323['dy']=-_0x33c18e;}},Sprite_Damage[_0x5f3bde(0x371)][_0x5f3bde(0x555)]=function(){const _0x4a4bd3=_0x5f3bde;return VisuMZ['CoreEngine'][_0x4a4bd3(0x22e)][_0x4a4bd3(0x338)][_0x4a4bd3(0x272)];},Sprite_Damage[_0x5f3bde(0x371)]['valueOutlineColor']=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x383)]=Sprite_Gauge[_0x5f3bde(0x371)][_0x5f3bde(0x738)],Sprite_Gauge[_0x5f3bde(0x371)][_0x5f3bde(0x738)]=function(){const _0xfcb9e7=_0x5f3bde;return VisuMZ[_0xfcb9e7(0x23a)][_0xfcb9e7(0x383)][_0xfcb9e7(0x1f0)](this)[_0xfcb9e7(0x5bd)](0x0,0x1);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x650)]=Sprite_Gauge[_0x5f3bde(0x371)]['currentValue'],Sprite_Gauge[_0x5f3bde(0x371)][_0x5f3bde(0x73b)]=function(){const _0xa8d375=_0x5f3bde;let _0x462d2c=VisuMZ['CoreEngine'][_0xa8d375(0x650)][_0xa8d375(0x1f0)](this);return _0x462d2c;},Sprite_Gauge[_0x5f3bde(0x371)][_0x5f3bde(0x38f)]=function(){const _0x2e0518=_0x5f3bde;let _0x5f0d08=this[_0x2e0518(0x73b)]();this['useDigitGrouping']()&&(_0x5f0d08=VisuMZ['GroupDigits'](_0x5f0d08));const _0x5390e6=this['bitmapWidth']()-0x1,_0x4f1534=this[_0x2e0518(0x69f)]?this[_0x2e0518(0x69f)]():this[_0x2e0518(0x1ae)]();this['setupValueFont'](),this['bitmap'][_0x2e0518(0x79f)](_0x5f0d08,0x0,0x0,_0x5390e6,_0x4f1534,_0x2e0518(0x7ed));},Sprite_Gauge[_0x5f3bde(0x371)][_0x5f3bde(0x7d2)]=function(){return 0x3;},Sprite_Gauge[_0x5f3bde(0x371)]['useDigitGrouping']=function(){const _0x5ee474=_0x5f3bde;return VisuMZ['CoreEngine'][_0x5ee474(0x22e)]['QoL'][_0x5ee474(0x57a)];},Sprite_Gauge[_0x5f3bde(0x371)][_0x5f3bde(0x334)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ['CoreEngine'][_0x5f3bde(0x43d)]=Sprite_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x6e2)],Sprite_Picture['prototype']['loadBitmap']=function(){const _0x42303f=_0x5f3bde;this[_0x42303f(0x197)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x42303f(0x23a)][_0x42303f(0x43d)][_0x42303f(0x1f0)](this);},Sprite_Picture['prototype'][_0x5f3bde(0x7df)]=function(_0x4b7747){const _0x5d1667=_0x5f3bde,_0x2107a1=ImageManager[_0x5d1667(0x46b)],_0x57b44c=ImageManager[_0x5d1667(0x78c)],_0x444fcf=this[_0x5d1667(0x197)][_0x5d1667(0x772)](/SMOOTH/i);this[_0x5d1667(0x2ba)]=new Bitmap(_0x2107a1,_0x57b44c);const _0x1ca0e9=ImageManager[_0x5d1667(0x336)](_0x5d1667(0x7a4)),_0x1fc710=_0x4b7747%0x10*_0x2107a1,_0x4cd5de=Math[_0x5d1667(0x43f)](_0x4b7747/0x10)*_0x57b44c;this[_0x5d1667(0x2ba)][_0x5d1667(0x4b5)]=_0x444fcf,this[_0x5d1667(0x2ba)][_0x5d1667(0x473)](_0x1ca0e9,_0x1fc710,_0x4cd5de,_0x2107a1,_0x57b44c,0x0,0x0,_0x2107a1,_0x57b44c);};function Sprite_TitlePictureButton(){const _0x5a3e74=_0x5f3bde;this[_0x5a3e74(0x301)](...arguments);}Sprite_TitlePictureButton[_0x5f3bde(0x371)]=Object[_0x5f3bde(0x549)](Sprite_Clickable[_0x5f3bde(0x371)]),Sprite_TitlePictureButton[_0x5f3bde(0x371)][_0x5f3bde(0x7ff)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x5f3bde(0x371)]['initialize']=function(_0x5b76a5){const _0x4923a1=_0x5f3bde;Sprite_Clickable['prototype'][_0x4923a1(0x301)]['call'](this),this[_0x4923a1(0x346)]=_0x5b76a5,this[_0x4923a1(0x339)]=null,this['setup']();},Sprite_TitlePictureButton['prototype'][_0x5f3bde(0x614)]=function(){const _0x936d92=_0x5f3bde;this['x']=Graphics[_0x936d92(0x431)],this['y']=Graphics[_0x936d92(0x5b1)],this[_0x936d92(0x402)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x5f3bde(0x371)][_0x5f3bde(0x2d8)]=function(){const _0x2f0150=_0x5f3bde;this[_0x2f0150(0x2ba)]=ImageManager[_0x2f0150(0x798)](this['_data']['PictureFilename']),this[_0x2f0150(0x2ba)][_0x2f0150(0x480)](this[_0x2f0150(0x32e)][_0x2f0150(0x687)](this));},Sprite_TitlePictureButton['prototype'][_0x5f3bde(0x32e)]=function(){const _0x3d1189=_0x5f3bde;this[_0x3d1189(0x346)]['OnLoadJS'][_0x3d1189(0x1f0)](this),this[_0x3d1189(0x346)][_0x3d1189(0x3ab)]['call'](this),this[_0x3d1189(0x234)](this[_0x3d1189(0x346)][_0x3d1189(0x7cd)][_0x3d1189(0x687)](this));},Sprite_TitlePictureButton[_0x5f3bde(0x371)][_0x5f3bde(0x816)]=function(){const _0x227c90=_0x5f3bde;Sprite_Clickable[_0x227c90(0x371)][_0x227c90(0x816)][_0x227c90(0x1f0)](this),this[_0x227c90(0x220)](),this[_0x227c90(0x6a9)]();},Sprite_TitlePictureButton[_0x5f3bde(0x371)][_0x5f3bde(0x1ad)]=function(){const _0x241532=_0x5f3bde;return VisuMZ[_0x241532(0x23a)][_0x241532(0x22e)][_0x241532(0x789)][_0x241532(0x44f)][_0x241532(0x80d)];},Sprite_TitlePictureButton[_0x5f3bde(0x371)][_0x5f3bde(0x220)]=function(){const _0x37a36f=_0x5f3bde;this[_0x37a36f(0x3ce)]||this[_0x37a36f(0x6e8)]?this['opacity']=0xff:(this[_0x37a36f(0x460)]+=this[_0x37a36f(0x402)]?this[_0x37a36f(0x1ad)]():-0x1*this['fadeSpeed'](),this[_0x37a36f(0x460)]=Math[_0x37a36f(0x1f3)](0xc0,this[_0x37a36f(0x460)]));},Sprite_TitlePictureButton[_0x5f3bde(0x371)]['setClickHandler']=function(_0x270f0d){const _0x566b4c=_0x5f3bde;this[_0x566b4c(0x339)]=_0x270f0d;},Sprite_TitlePictureButton[_0x5f3bde(0x371)][_0x5f3bde(0x202)]=function(){const _0x2068f0=_0x5f3bde;this['_clickHandler']&&this[_0x2068f0(0x339)]();},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x290)]=Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x301)],Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x301)]=function(){const _0x428568=_0x5f3bde;VisuMZ[_0x428568(0x23a)][_0x428568(0x290)][_0x428568(0x1f0)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x5a1)]=function(){const _0xc89001=_0x5f3bde;this[_0xc89001(0x6f5)]=[],this[_0xc89001(0x259)]=[],this['_cacheScaleX']=this[_0xc89001(0x504)]['x'],this['_cacheScaleY']=this[_0xc89001(0x504)]['y'];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x2f9)]=Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x47d)],Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x47d)]=function(_0x3063ed){const _0x3ec819=_0x5f3bde;this['removeAllFauxAnimations'](),this[_0x3ec819(0x2a2)](),VisuMZ['CoreEngine'][_0x3ec819(0x2f9)]['call'](this,_0x3063ed);},VisuMZ['CoreEngine'][_0x5f3bde(0x3c8)]=Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x816)],Spriteset_Base['prototype'][_0x5f3bde(0x816)]=function(){const _0x3d958c=_0x5f3bde;VisuMZ[_0x3d958c(0x23a)][_0x3d958c(0x3c8)]['call'](this),this[_0x3d958c(0x5a0)](),this['updateFauxAnimations'](),this[_0x3d958c(0x250)]();},Spriteset_Base['prototype'][_0x5f3bde(0x5a0)]=function(){const _0x552daa=_0x5f3bde;if(!VisuMZ[_0x552daa(0x23a)][_0x552daa(0x22e)]['QoL']['AntiZoomPictures'])return;if(this[_0x552daa(0x57d)]===this['scale']['x']&&this[_0x552daa(0x2c8)]===this[_0x552daa(0x504)]['y'])return;this[_0x552daa(0x6c2)](),this[_0x552daa(0x57d)]=this[_0x552daa(0x504)]['x'],this[_0x552daa(0x2c8)]=this[_0x552daa(0x504)]['y'];},Spriteset_Base[_0x5f3bde(0x371)]['adjustPictureAntiZoom']=function(){const _0x36b29e=_0x5f3bde;this[_0x36b29e(0x504)]['x']!==0x0&&(this['_pictureContainer']['scale']['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x36b29e(0x504)]['x'])),this[_0x36b29e(0x504)]['y']!==0x0&&(this[_0x36b29e(0x56e)][_0x36b29e(0x504)]['y']=0x1/this[_0x36b29e(0x504)]['y'],this[_0x36b29e(0x56e)]['y']=-(this['y']/this[_0x36b29e(0x504)]['y']));},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1a3)]=Spriteset_Base[_0x5f3bde(0x371)]['updatePosition'],Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x7dd)]=function(){const _0x4943e5=_0x5f3bde;VisuMZ[_0x4943e5(0x23a)][_0x4943e5(0x1a3)][_0x4943e5(0x1f0)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x5d4)]=function(){const _0x34fb21=_0x5f3bde;if(!$gameScreen)return;if($gameScreen[_0x34fb21(0x6ee)]<=0x0)return;this['x']-=Math[_0x34fb21(0x70a)]($gameScreen[_0x34fb21(0x7b3)]());const _0x4ed0c2=$gameScreen[_0x34fb21(0x2e9)]();switch($gameScreen[_0x34fb21(0x2e9)]()){case _0x34fb21(0x7c2):this['updatePositionCoreEngineShakeOriginal']();break;case _0x34fb21(0x6f6):this[_0x34fb21(0x2d1)]();break;case _0x34fb21(0x34a):this[_0x34fb21(0x1c6)]();break;default:this[_0x34fb21(0x820)]();break;}},Spriteset_Base['prototype'][_0x5f3bde(0x69c)]=function(){const _0x3cf22b=_0x5f3bde,_0x4134b1=VisuMZ[_0x3cf22b(0x23a)][_0x3cf22b(0x22e)][_0x3cf22b(0x2a8)];if(_0x4134b1&&_0x4134b1['originalJS'])return _0x4134b1[_0x3cf22b(0x4d1)][_0x3cf22b(0x1f0)](this);this['x']+=Math['round']($gameScreen[_0x3cf22b(0x7b3)]());},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x820)]=function(){const _0x145b72=_0x5f3bde,_0x492b19=VisuMZ[_0x145b72(0x23a)][_0x145b72(0x22e)]['ScreenShake'];if(_0x492b19&&_0x492b19[_0x145b72(0x581)])return _0x492b19['randomJS'][_0x145b72(0x1f0)](this);const _0xa8e383=$gameScreen[_0x145b72(0x468)]*0.75,_0x45f9c0=$gameScreen['_shakeSpeed']*0.6,_0x3e668c=$gameScreen[_0x145b72(0x6ee)];this['x']+=Math[_0x145b72(0x70a)](Math[_0x145b72(0x434)](_0xa8e383)-Math[_0x145b72(0x434)](_0x45f9c0))*(Math[_0x145b72(0x1f3)](_0x3e668c,0x1e)*0.5),this['y']+=Math[_0x145b72(0x70a)](Math['randomInt'](_0xa8e383)-Math[_0x145b72(0x434)](_0x45f9c0))*(Math['min'](_0x3e668c,0x1e)*0.5);},Spriteset_Base['prototype'][_0x5f3bde(0x2d1)]=function(){const _0x3d1a87=_0x5f3bde,_0x3efda0=VisuMZ['CoreEngine'][_0x3d1a87(0x22e)][_0x3d1a87(0x2a8)];if(_0x3efda0&&_0x3efda0[_0x3d1a87(0x76a)])return _0x3efda0[_0x3d1a87(0x76a)][_0x3d1a87(0x1f0)](this);const _0x263bb9=$gameScreen[_0x3d1a87(0x468)]*0.75,_0x5806d5=$gameScreen['_shakeSpeed']*0.6,_0x4e7b18=$gameScreen[_0x3d1a87(0x6ee)];this['x']+=Math[_0x3d1a87(0x70a)](Math[_0x3d1a87(0x434)](_0x263bb9)-Math[_0x3d1a87(0x434)](_0x5806d5))*(Math[_0x3d1a87(0x1f3)](_0x4e7b18,0x1e)*0.5);},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x1c6)]=function(){const _0x25329b=_0x5f3bde,_0x5c4c21=VisuMZ[_0x25329b(0x23a)][_0x25329b(0x22e)][_0x25329b(0x2a8)];if(_0x5c4c21&&_0x5c4c21['vertJS'])return _0x5c4c21[_0x25329b(0x233)][_0x25329b(0x1f0)](this);const _0x568508=$gameScreen[_0x25329b(0x468)]*0.75,_0x2b6c66=$gameScreen[_0x25329b(0x1aa)]*0.6,_0x1df448=$gameScreen['_shakeDuration'];this['y']+=Math[_0x25329b(0x70a)](Math[_0x25329b(0x434)](_0x568508)-Math['randomInt'](_0x2b6c66))*(Math['min'](_0x1df448,0x1e)*0.5);},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x355)]=function(){const _0x2cf30a=_0x5f3bde;for(const _0x5db95a of this[_0x2cf30a(0x6f5)]){!_0x5db95a[_0x2cf30a(0x67b)]()&&this[_0x2cf30a(0x819)](_0x5db95a);}this[_0x2cf30a(0x7a5)]();},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x7a5)]=function(){const _0x111d1e=_0x5f3bde;for(;;){const _0x4e51c0=$gameTemp[_0x111d1e(0x570)]();if(_0x4e51c0)this[_0x111d1e(0x216)](_0x4e51c0);else break;}},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x216)]=function(_0x443b41){const _0x43f6ee=_0x5f3bde,_0x52d9bb=$dataAnimations[_0x443b41[_0x43f6ee(0x6df)]],_0x5a3c4a=_0x443b41[_0x43f6ee(0x81c)],_0x2bf0cb=_0x443b41[_0x43f6ee(0x340)],_0x39743e=_0x443b41['mute'];let _0xc3da73=this[_0x43f6ee(0x680)]();const _0x3bf886=this['animationNextDelay']();if(this[_0x43f6ee(0x1f8)](_0x52d9bb))for(const _0x1c3407 of _0x5a3c4a){this['createFauxAnimationSprite']([_0x1c3407],_0x52d9bb,_0x2bf0cb,_0xc3da73,_0x39743e),_0xc3da73+=_0x3bf886;}else this['createFauxAnimationSprite'](_0x5a3c4a,_0x52d9bb,_0x2bf0cb,_0xc3da73,_0x39743e);},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x5b9)]=function(_0x24f1d5,_0x1ec51e,_0x8e6c2b,_0x40f14f,_0x446de1){const _0x4ad862=_0x5f3bde,_0x3b6199=this[_0x4ad862(0x70d)](_0x1ec51e),_0x1145aa=new(_0x3b6199?Sprite_AnimationMV:Sprite_Animation)(),_0x434c44=this['makeTargetSprites'](_0x24f1d5);this[_0x4ad862(0x1f9)](_0x24f1d5[0x0])&&(_0x8e6c2b=!_0x8e6c2b),_0x1145aa[_0x4ad862(0x7c8)]=_0x24f1d5,_0x1145aa['setup'](_0x434c44,_0x1ec51e,_0x8e6c2b,_0x40f14f),_0x1145aa['setMute'](_0x446de1),this[_0x4ad862(0x659)][_0x4ad862(0x1bf)](_0x1145aa),this[_0x4ad862(0x6f5)]['push'](_0x1145aa);},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x819)]=function(_0x17787a){const _0x31f119=_0x5f3bde;this[_0x31f119(0x6f5)][_0x31f119(0x35c)](_0x17787a),this[_0x31f119(0x659)][_0x31f119(0x57b)](_0x17787a);for(const _0x221c76 of _0x17787a[_0x31f119(0x7c8)]){_0x221c76[_0x31f119(0x6fd)]&&_0x221c76['endAnimation']();}_0x17787a['destroy']();},Spriteset_Base['prototype']['removeAllFauxAnimations']=function(){const _0x5071fc=_0x5f3bde;for(const _0x192aa3 of this['_fauxAnimationSprites']){this[_0x5071fc(0x819)](_0x192aa3);}},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x2c1)]=function(){const _0x3e1a7a=_0x5f3bde;return this[_0x3e1a7a(0x6f5)][_0x3e1a7a(0x6d7)]>0x0;},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x250)]=function(){const _0x45aa19=_0x5f3bde;for(const _0x3c4fbf of this[_0x45aa19(0x259)]){!_0x3c4fbf[_0x45aa19(0x67b)]()&&this['removePointAnimation'](_0x3c4fbf);}this['processPointAnimationRequests']();},Spriteset_Base[_0x5f3bde(0x371)]['processPointAnimationRequests']=function(){const _0x4ade99=_0x5f3bde;for(;;){const _0x3f2730=$gameTemp[_0x4ade99(0x550)]();if(_0x3f2730)this[_0x4ade99(0x4d8)](_0x3f2730);else break;}},Spriteset_Base[_0x5f3bde(0x371)]['createPointAnimation']=function(_0x72cefa){const _0x9a353=_0x5f3bde,_0x50925a=$dataAnimations[_0x72cefa[_0x9a353(0x6df)]],_0x5351ce=this[_0x9a353(0x304)](_0x72cefa),_0xa4e0a7=_0x72cefa[_0x9a353(0x340)],_0x160bd5=_0x72cefa[_0x9a353(0x721)];let _0x11b4b8=this['animationBaseDelay']();const _0x207da9=this[_0x9a353(0x678)]();if(this[_0x9a353(0x1f8)](_0x50925a))for(const _0x3a92a7 of _0x5351ce){this['createPointAnimationSprite']([_0x3a92a7],_0x50925a,_0xa4e0a7,_0x11b4b8,_0x160bd5),_0x11b4b8+=_0x207da9;}else this[_0x9a353(0x4c7)](_0x5351ce,_0x50925a,_0xa4e0a7,_0x11b4b8,_0x160bd5);},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x304)]=function(_0x5197a3){const _0x1b21f1=_0x5f3bde,_0x20a457=new Sprite_Clickable();_0x20a457['x']=_0x5197a3['x'],_0x20a457['y']=_0x5197a3['y'],_0x20a457['z']=0x64;const _0x5d8ec1=this['getPointAnimationLayer']();return _0x5d8ec1[_0x1b21f1(0x1bf)](_0x20a457),[_0x20a457];},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x354)]=function(){return this;},Spriteset_Map[_0x5f3bde(0x371)][_0x5f3bde(0x354)]=function(){const _0x4d38a6=_0x5f3bde;return this[_0x4d38a6(0x1d7)]||this;},Spriteset_Battle['prototype'][_0x5f3bde(0x354)]=function(){const _0x3edcd3=_0x5f3bde;return this[_0x3edcd3(0x274)]||this;},Spriteset_Base['prototype'][_0x5f3bde(0x4c7)]=function(_0x13c4cc,_0x30274b,_0x391a20,_0x34281a,_0x4fe434){const _0x363b34=_0x5f3bde,_0x5b80f2=this[_0x363b34(0x70d)](_0x30274b),_0x43d700=new(_0x5b80f2?Sprite_AnimationMV:Sprite_Animation)();_0x43d700['targetObjects']=_0x13c4cc,_0x43d700['setup'](_0x13c4cc,_0x30274b,_0x391a20,_0x34281a),_0x43d700[_0x363b34(0x289)](_0x4fe434),this[_0x363b34(0x659)][_0x363b34(0x1bf)](_0x43d700),this['_pointAnimationSprites']['push'](_0x43d700);},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x312)]=function(_0x125878){const _0x36ca9a=_0x5f3bde;this[_0x36ca9a(0x259)][_0x36ca9a(0x35c)](_0x125878),this['_effectsContainer'][_0x36ca9a(0x57b)](_0x125878);for(const _0xd50147 of _0x125878[_0x36ca9a(0x7c8)]){_0xd50147[_0x36ca9a(0x6fd)]&&_0xd50147[_0x36ca9a(0x6fd)]();const _0x3f7ee0=this[_0x36ca9a(0x354)]();if(_0x3f7ee0)_0x3f7ee0[_0x36ca9a(0x57b)](_0xd50147);}_0x125878[_0x36ca9a(0x47d)]();},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x2a2)]=function(){const _0x5ceba2=_0x5f3bde;for(const _0x3a0415 of this[_0x5ceba2(0x259)]){this[_0x5ceba2(0x312)](_0x3a0415);}},Spriteset_Base[_0x5f3bde(0x371)][_0x5f3bde(0x1f4)]=function(){const _0x3f0a14=_0x5f3bde;return this[_0x3f0a14(0x259)][_0x3f0a14(0x6d7)]>0x0;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x677)]=Spriteset_Base[_0x5f3bde(0x371)]['isAnimationPlaying'],Spriteset_Base['prototype']['isAnimationPlaying']=function(){const _0x2b9273=_0x5f3bde;return VisuMZ['CoreEngine'][_0x2b9273(0x677)][_0x2b9273(0x1f0)](this)||this[_0x2b9273(0x1f4)]();},Spriteset_Battle['prototype'][_0x5f3bde(0x243)]=function(){const _0x5a14aa=_0x5f3bde;this[_0x5a14aa(0x4da)]=new PIXI['filters'][(_0x5a14aa(0x303))](clamp=!![]),this[_0x5a14aa(0x70f)]=new Sprite(),this['_backgroundSprite'][_0x5a14aa(0x2ba)]=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x5a14aa(0x6c5)]=[this[_0x5a14aa(0x4da)]],this[_0x5a14aa(0x4ce)][_0x5a14aa(0x1bf)](this[_0x5a14aa(0x70f)]);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x78f)]=Spriteset_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x3e2)],Spriteset_Battle['prototype'][_0x5f3bde(0x3e2)]=function(){const _0x47a745=_0x5f3bde;this[_0x47a745(0x18c)]()&&this[_0x47a745(0x36c)](),VisuMZ['CoreEngine'][_0x47a745(0x78f)][_0x47a745(0x1f0)](this);},Spriteset_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x18c)]=function(){const _0x18249c=_0x5f3bde,_0x20c8e1=VisuMZ[_0x18249c(0x23a)][_0x18249c(0x22e)]['ScreenResolution'];if(!_0x20c8e1)return![];if(Utils[_0x18249c(0x5af)]>=_0x18249c(0x824)&&!_0x20c8e1['RepositionEnemies130'])return![];return _0x20c8e1[_0x18249c(0x5a7)];},Spriteset_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x36c)]=function(){const _0x3106c3=_0x5f3bde;for(member of $gameTroop['members']()){member[_0x3106c3(0x7c5)]();}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x63a)]=Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x301)],Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x301)]=function(_0x34779c){const _0x323a7a=_0x5f3bde;_0x34779c['x']=Math[_0x323a7a(0x70a)](_0x34779c['x']),_0x34779c['y']=Math['round'](_0x34779c['y']),_0x34779c[_0x323a7a(0x431)]=Math['round'](_0x34779c[_0x323a7a(0x431)]),_0x34779c[_0x323a7a(0x5b1)]=Math[_0x323a7a(0x70a)](_0x34779c[_0x323a7a(0x5b1)]),this[_0x323a7a(0x5b8)](),VisuMZ['CoreEngine'][_0x323a7a(0x63a)][_0x323a7a(0x1f0)](this,_0x34779c),this[_0x323a7a(0x433)]();},Window_Base['prototype'][_0x5f3bde(0x5b8)]=function(){const _0x343ec8=_0x5f3bde;this[_0x343ec8(0x2c6)]=VisuMZ['CoreEngine'][_0x343ec8(0x22e)]['QoL'][_0x343ec8(0x813)],this['_digitGroupingEx']=VisuMZ[_0x343ec8(0x23a)][_0x343ec8(0x22e)]['QoL'][_0x343ec8(0x388)];},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x5c5)]=function(){const _0x3c416e=_0x5f3bde;return VisuMZ[_0x3c416e(0x23a)][_0x3c416e(0x22e)][_0x3c416e(0x410)]['LineHeight'];},Window_Base[_0x5f3bde(0x371)]['itemPadding']=function(){const _0x1fe396=_0x5f3bde;return VisuMZ['CoreEngine'][_0x1fe396(0x22e)][_0x1fe396(0x410)][_0x1fe396(0x5d0)];},Window_Base['prototype']['updateBackOpacity']=function(){const _0x511810=_0x5f3bde;$gameSystem[_0x511810(0x6ff)]?this[_0x511810(0x5c1)]=$gameSystem[_0x511810(0x6ff)]():this[_0x511810(0x5c1)]=VisuMZ[_0x511810(0x23a)][_0x511810(0x22e)][_0x511810(0x410)][_0x511810(0x639)];},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x3c0)]=function(){const _0x21adf7=_0x5f3bde;return VisuMZ[_0x21adf7(0x23a)][_0x21adf7(0x22e)][_0x21adf7(0x410)]['TranslucentOpacity'];},Window_Base[_0x5f3bde(0x371)]['openingSpeed']=function(){const _0x74b96f=_0x5f3bde;return VisuMZ[_0x74b96f(0x23a)][_0x74b96f(0x22e)]['Window'][_0x74b96f(0x2b2)];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x700)]=Window_Base['prototype']['update'],Window_Base['prototype'][_0x5f3bde(0x816)]=function(){const _0x1c7fb5=_0x5f3bde;VisuMZ['CoreEngine']['Window_Base_update']['call'](this),this[_0x1c7fb5(0x79e)]();},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x4a0)]=function(){const _0x5e1797=_0x5f3bde;this[_0x5e1797(0x618)]&&(this[_0x5e1797(0x66c)]+=this['openingSpeed'](),this['isOpen']()&&(this['_opening']=![]));},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x4aa)]=function(){const _0x521b9f=_0x5f3bde;this[_0x521b9f(0x5a2)]&&(this[_0x521b9f(0x66c)]-=this[_0x521b9f(0x513)](),this[_0x521b9f(0x498)]()&&(this[_0x521b9f(0x5a2)]=![]));},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x435)]=Window_Base['prototype'][_0x5f3bde(0x79f)],Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x79f)]=function(_0x4a9d93,_0x496272,_0x28c996,_0x2bd1fe,_0x38afd8){const _0x52d7a3=_0x5f3bde;if(this['useDigitGrouping']())_0x4a9d93=VisuMZ[_0x52d7a3(0x2ec)](_0x4a9d93);VisuMZ[_0x52d7a3(0x23a)][_0x52d7a3(0x435)]['call'](this,_0x4a9d93,_0x496272,_0x28c996,_0x2bd1fe,_0x38afd8);},Window_Base['prototype'][_0x5f3bde(0x555)]=function(){const _0x3eb1e8=_0x5f3bde;return this[_0x3eb1e8(0x2c6)];},VisuMZ[_0x5f3bde(0x23a)]['Window_Base_createTextState']=Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x7c7)],Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x7c7)]=function(_0x1bb341,_0x5836ff,_0x515347,_0x19c86e){const _0x13d619=_0x5f3bde;var _0xffae93=VisuMZ['CoreEngine']['Window_Base_createTextState'][_0x13d619(0x1f0)](this,_0x1bb341,_0x5836ff,_0x515347,_0x19c86e);if(this[_0x13d619(0x298)]())_0xffae93[_0x13d619(0x63f)]=VisuMZ['GroupDigits'](_0xffae93['text']);return _0xffae93;},Window_Base['prototype']['useDigitGroupingEx']=function(){const _0x458727=_0x5f3bde;return this[_0x458727(0x53d)];},Window_Base[_0x5f3bde(0x371)]['enableDigitGrouping']=function(_0x159ff1){const _0x51929c=_0x5f3bde;this[_0x51929c(0x2c6)]=_0x159ff1;},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x6fa)]=function(_0x319575){const _0x440487=_0x5f3bde;this[_0x440487(0x53d)]=_0x319575;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x3b5)]=Window_Base[_0x5f3bde(0x371)]['drawIcon'],Window_Base[_0x5f3bde(0x371)]['drawIcon']=function(_0x576ba1,_0x9dd51f,_0x475c76){const _0x5f92c=_0x5f3bde;_0x9dd51f=Math['round'](_0x9dd51f),_0x475c76=Math[_0x5f92c(0x70a)](_0x475c76),VisuMZ['CoreEngine'][_0x5f92c(0x3b5)][_0x5f92c(0x1f0)](this,_0x576ba1,_0x9dd51f,_0x475c76);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x591)]=Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x567)],Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x567)]=function(_0x297bc8,_0xe3a4ff,_0x44f55d,_0x2a6980,_0x55e055,_0x2d279d){const _0x337389=_0x5f3bde;_0x55e055=_0x55e055||ImageManager[_0x337389(0x19b)],_0x2d279d=_0x2d279d||ImageManager['faceHeight'],_0x44f55d=Math[_0x337389(0x70a)](_0x44f55d),_0x2a6980=Math['round'](_0x2a6980),_0x55e055=Math[_0x337389(0x70a)](_0x55e055),_0x2d279d=Math[_0x337389(0x70a)](_0x2d279d),VisuMZ[_0x337389(0x23a)]['Window_Base_drawFace'][_0x337389(0x1f0)](this,_0x297bc8,_0xe3a4ff,_0x44f55d,_0x2a6980,_0x55e055,_0x2d279d);},VisuMZ[_0x5f3bde(0x23a)]['Window_Base_drawCharacter']=Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x3bd)],Window_Base['prototype']['drawCharacter']=function(_0x1df55f,_0x22d689,_0x50e0eb,_0x219969){const _0x1eded9=_0x5f3bde;_0x50e0eb=Math[_0x1eded9(0x70a)](_0x50e0eb),_0x219969=Math[_0x1eded9(0x70a)](_0x219969),VisuMZ[_0x1eded9(0x23a)][_0x1eded9(0x7d3)][_0x1eded9(0x1f0)](this,_0x1df55f,_0x22d689,_0x50e0eb,_0x219969);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x332)]=Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x484)],Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x484)]=function(_0x3c2d8d){const _0x221c58=_0x5f3bde;let _0x583d5c=VisuMZ[_0x221c58(0x23a)]['Window_Selectable_itemRect'][_0x221c58(0x1f0)](this,_0x3c2d8d);return _0x583d5c['x']=Math[_0x221c58(0x70a)](_0x583d5c['x']),_0x583d5c['y']=Math[_0x221c58(0x70a)](_0x583d5c['y']),_0x583d5c['width']=Math[_0x221c58(0x70a)](_0x583d5c[_0x221c58(0x431)]),_0x583d5c[_0x221c58(0x5b1)]=Math[_0x221c58(0x70a)](_0x583d5c['height']),_0x583d5c;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x502)]=Window_StatusBase[_0x5f3bde(0x371)][_0x5f3bde(0x4d5)],Window_StatusBase[_0x5f3bde(0x371)]['drawActorSimpleStatus']=function(_0x325907,_0x5de91f,_0x4d9c8e){const _0x58a47d=_0x5f3bde;_0x5de91f=Math[_0x58a47d(0x70a)](_0x5de91f),_0x4d9c8e=Math[_0x58a47d(0x70a)](_0x4d9c8e),VisuMZ[_0x58a47d(0x23a)][_0x58a47d(0x502)]['call'](this,_0x325907,_0x5de91f,_0x4d9c8e);},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x433)]=function(){const _0x22c3e3=_0x5f3bde;this[_0x22c3e3(0x7d9)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x22c3e3(0x504)]['x'],'targetScaleY':this[_0x22c3e3(0x504)]['y'],'targetOpacity':this[_0x22c3e3(0x460)],'targetBackOpacity':this[_0x22c3e3(0x5c1)],'targetContentsOpacity':this[_0x22c3e3(0x343)]};},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x79e)]=function(){const _0xf7c03d=_0x5f3bde;if(!this[_0xf7c03d(0x7d9)])return;if(this[_0xf7c03d(0x7d9)][_0xf7c03d(0x4ee)]<=0x0)return;this['x']=this[_0xf7c03d(0x613)](this['x'],this[_0xf7c03d(0x7d9)][_0xf7c03d(0x749)]),this['y']=this[_0xf7c03d(0x613)](this['y'],this[_0xf7c03d(0x7d9)][_0xf7c03d(0x38d)]),this[_0xf7c03d(0x504)]['x']=this[_0xf7c03d(0x613)](this[_0xf7c03d(0x504)]['x'],this[_0xf7c03d(0x7d9)][_0xf7c03d(0x444)]),this[_0xf7c03d(0x504)]['y']=this[_0xf7c03d(0x613)](this[_0xf7c03d(0x504)]['y'],this[_0xf7c03d(0x7d9)]['targetScaleY']),this[_0xf7c03d(0x460)]=this[_0xf7c03d(0x613)](this[_0xf7c03d(0x460)],this[_0xf7c03d(0x7d9)][_0xf7c03d(0x72a)]),this[_0xf7c03d(0x5c1)]=this['applyCoreEasing'](this[_0xf7c03d(0x5c1)],this[_0xf7c03d(0x7d9)][_0xf7c03d(0x637)]),this[_0xf7c03d(0x343)]=this[_0xf7c03d(0x613)](this['contentsOpacity'],this[_0xf7c03d(0x7d9)][_0xf7c03d(0x7b0)]),this[_0xf7c03d(0x7d9)][_0xf7c03d(0x4ee)]--;},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x613)]=function(_0xec6446,_0xfbfcd8){const _0x577911=_0x5f3bde;if(!this[_0x577911(0x7d9)])return _0xfbfcd8;const _0x1c481c=this[_0x577911(0x7d9)][_0x577911(0x4ee)],_0x28a028=this[_0x577911(0x7d9)]['wholeDuration'],_0x1811e2=this[_0x577911(0x5f1)]((_0x28a028-_0x1c481c)/_0x28a028),_0x424427=this[_0x577911(0x5f1)]((_0x28a028-_0x1c481c+0x1)/_0x28a028),_0x474349=(_0xec6446-_0xfbfcd8*_0x1811e2)/(0x1-_0x1811e2);return _0x474349+(_0xfbfcd8-_0x474349)*_0x424427;},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x5f1)]=function(_0x49d96c){const _0x349b76=_0x5f3bde;if(!this[_0x349b76(0x7d9)])return _0x49d96c;return VisuMZ['ApplyEasing'](_0x49d96c,this[_0x349b76(0x7d9)][_0x349b76(0x7a9)]||_0x349b76(0x524));},Window_Base['prototype'][_0x5f3bde(0x500)]=function(_0x1dc17e,_0x3ee35a){const _0x1c19e4=_0x5f3bde;if(!this[_0x1c19e4(0x7d9)])return;this['x']=this[_0x1c19e4(0x7d9)][_0x1c19e4(0x749)],this['y']=this['_coreEasing'][_0x1c19e4(0x38d)],this[_0x1c19e4(0x504)]['x']=this[_0x1c19e4(0x7d9)]['targetScaleX'],this[_0x1c19e4(0x504)]['y']=this[_0x1c19e4(0x7d9)][_0x1c19e4(0x667)],this['opacity']=this['_coreEasing'][_0x1c19e4(0x72a)],this[_0x1c19e4(0x5c1)]=this[_0x1c19e4(0x7d9)][_0x1c19e4(0x637)],this[_0x1c19e4(0x343)]=this[_0x1c19e4(0x7d9)][_0x1c19e4(0x7b0)],this['setupCoreEasing'](_0x1dc17e,_0x3ee35a,this['x'],this['y'],this['scale']['x'],this[_0x1c19e4(0x504)]['y'],this[_0x1c19e4(0x460)],this['backOpacity'],this[_0x1c19e4(0x343)]);},Window_Base['prototype'][_0x5f3bde(0x3a7)]=function(_0x137267,_0x4afc74,_0x3f5274,_0x34a44d,_0x473c73,_0x1d5a4b,_0x1a25e3,_0xbbc835,_0x359af5){const _0x12c675=_0x5f3bde;this[_0x12c675(0x7d9)]={'duration':_0x137267,'wholeDuration':_0x137267,'type':_0x4afc74,'targetX':_0x3f5274,'targetY':_0x34a44d,'targetScaleX':_0x473c73,'targetScaleY':_0x1d5a4b,'targetOpacity':_0x1a25e3,'targetBackOpacity':_0xbbc835,'targetContentsOpacity':_0x359af5};},Window_Base['prototype'][_0x5f3bde(0x66d)]=function(_0x43d598,_0x5c93f8,_0x573cd1,_0x11fe2a,_0x13be57){const _0x21c0ee=_0x5f3bde;this[_0x21c0ee(0x814)](),this[_0x21c0ee(0x562)][_0x21c0ee(0x68e)]=VisuMZ[_0x21c0ee(0x23a)][_0x21c0ee(0x22e)][_0x21c0ee(0x736)][_0x21c0ee(0x42e)];const _0x307379=VisuMZ[_0x21c0ee(0x23a)][_0x21c0ee(0x22e)][_0x21c0ee(0x736)][_0x21c0ee(0x287)];if(_0x307379>0x0&&_0x5c93f8===TextManager['currencyUnit']){const _0x44a9f5=_0x11fe2a+(this[_0x21c0ee(0x5c5)]()-ImageManager[_0x21c0ee(0x78c)])/0x2;this['drawIcon'](_0x307379,_0x573cd1+(_0x13be57-ImageManager[_0x21c0ee(0x46b)]),_0x44a9f5),_0x13be57-=ImageManager[_0x21c0ee(0x46b)]+0x4;}else this[_0x21c0ee(0x1ba)](ColorManager[_0x21c0ee(0x4b1)]()),this['drawText'](_0x5c93f8,_0x573cd1,_0x11fe2a,_0x13be57,_0x21c0ee(0x7ed)),_0x13be57-=this[_0x21c0ee(0x3fc)](_0x5c93f8)+0x6;this[_0x21c0ee(0x7f5)]();const _0x2c703e=this[_0x21c0ee(0x3fc)](this[_0x21c0ee(0x2c6)]?VisuMZ[_0x21c0ee(0x2ec)](_0x43d598):_0x43d598);_0x2c703e>_0x13be57?this[_0x21c0ee(0x79f)](VisuMZ[_0x21c0ee(0x23a)][_0x21c0ee(0x22e)][_0x21c0ee(0x736)][_0x21c0ee(0x5b6)],_0x573cd1,_0x11fe2a,_0x13be57,_0x21c0ee(0x7ed)):this['drawText'](_0x43d598,_0x573cd1,_0x11fe2a,_0x13be57,_0x21c0ee(0x7ed)),this['resetFontSettings']();},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x780)]=function(_0x28c6db,_0x20c54d,_0x4f2641,_0x2119b8,_0x22dac2){const _0x2e3203=_0x5f3bde,_0x1df7d4=ImageManager[_0x2e3203(0x336)]('IconSet'),_0x1a5367=ImageManager[_0x2e3203(0x46b)],_0x5a2834=ImageManager['iconHeight'],_0x30c61f=_0x28c6db%0x10*_0x1a5367,_0x45120d=Math['floor'](_0x28c6db/0x10)*_0x5a2834,_0x4a83ab=_0x2119b8,_0xceec3=_0x2119b8;this[_0x2e3203(0x562)]['_context']['imageSmoothingEnabled']=_0x22dac2,this[_0x2e3203(0x562)][_0x2e3203(0x473)](_0x1df7d4,_0x30c61f,_0x45120d,_0x1a5367,_0x5a2834,_0x20c54d,_0x4f2641,_0x4a83ab,_0xceec3),this['contents'][_0x2e3203(0x26d)][_0x2e3203(0x563)]=!![];},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x58c)]=function(_0x20949a,_0x241f36,_0x2d7e3f,_0x45b665,_0x13e599,_0x2d7d08){const _0xc35177=_0x5f3bde,_0x1955ad=Math['floor']((_0x2d7e3f-0x2)*_0x45b665),_0x1e15bc=Sprite_Gauge[_0xc35177(0x371)][_0xc35177(0x61b)][_0xc35177(0x1f0)](this),_0x2a2781=_0x241f36+this[_0xc35177(0x5c5)]()-_0x1e15bc-0x2;this[_0xc35177(0x562)][_0xc35177(0x232)](_0x20949a,_0x2a2781,_0x2d7e3f,_0x1e15bc,ColorManager[_0xc35177(0x19c)]()),this[_0xc35177(0x562)]['gradientFillRect'](_0x20949a+0x1,_0x2a2781+0x1,_0x1955ad,_0x1e15bc-0x2,_0x13e599,_0x2d7d08);},Window_Selectable['prototype']['cursorDown']=function(_0x26de94){const _0x2beb42=_0x5f3bde;let _0x3ecca8=this[_0x2beb42(0x527)]();const _0x15d720=this[_0x2beb42(0x3aa)](),_0x28d981=this[_0x2beb42(0x51f)]();if(this['isUseModernControls']()&&(_0x3ecca8<_0x15d720||_0x26de94&&_0x28d981===0x1)){_0x3ecca8+=_0x28d981;if(_0x3ecca8>=_0x15d720)_0x3ecca8=_0x15d720-0x1;this[_0x2beb42(0x4af)](_0x3ecca8);}else!this[_0x2beb42(0x248)]()&&((_0x3ecca8<_0x15d720-_0x28d981||_0x26de94&&_0x28d981===0x1)&&this[_0x2beb42(0x4af)]((_0x3ecca8+_0x28d981)%_0x15d720));},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1bc)]=Window_Selectable['prototype'][_0x5f3bde(0x7a3)],Window_Selectable[_0x5f3bde(0x371)]['cursorDown']=function(_0x4c042f){const _0x141de4=_0x5f3bde;this[_0x141de4(0x248)]()&&_0x4c042f&&this[_0x141de4(0x51f)]()===0x1&&this['index']()===this[_0x141de4(0x3aa)]()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x141de4(0x23a)][_0x141de4(0x1bc)]['call'](this,_0x4c042f);},Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x7de)]=function(_0xda6ead){const _0x365770=_0x5f3bde;let _0x2f3c06=Math[_0x365770(0x615)](0x0,this['index']());const _0x2219c5=this[_0x365770(0x3aa)](),_0x293306=this['maxCols']();if(this[_0x365770(0x248)]()&&_0x2f3c06>0x0||_0xda6ead&&_0x293306===0x1){_0x2f3c06-=_0x293306;if(_0x2f3c06<=0x0)_0x2f3c06=0x0;this[_0x365770(0x4af)](_0x2f3c06);}else!this[_0x365770(0x248)]()&&((_0x2f3c06>=_0x293306||_0xda6ead&&_0x293306===0x1)&&this[_0x365770(0x4af)]((_0x2f3c06-_0x293306+_0x2219c5)%_0x2219c5));},VisuMZ[_0x5f3bde(0x23a)]['Window_Selectable_cursorUp']=Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x7de)],Window_Selectable['prototype']['cursorUp']=function(_0x3fe45c){const _0x1515db=_0x5f3bde;this[_0x1515db(0x248)]()&&_0x3fe45c&&this[_0x1515db(0x51f)]()===0x1&&this['index']()===0x0?this[_0x1515db(0x4af)](this[_0x1515db(0x3aa)]()-0x1):VisuMZ[_0x1515db(0x23a)][_0x1515db(0x1eb)]['call'](this,_0x3fe45c);},Window_Selectable['prototype']['isUseModernControls']=function(){const _0x75455e=_0x5f3bde;return VisuMZ[_0x75455e(0x23a)][_0x75455e(0x22e)]['QoL'][_0x75455e(0x65b)];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x442)]=Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x663)],Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x663)]=function(){const _0x450112=_0x5f3bde;this['isUseModernControls']()?(this['processCursorMoveModernControls'](),this[_0x450112(0x7af)]()):VisuMZ[_0x450112(0x23a)][_0x450112(0x442)][_0x450112(0x1f0)](this);},Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x483)]=function(){return!![];},Window_Selectable[_0x5f3bde(0x371)]['processCursorMoveModernControls']=function(){const _0x5b855c=_0x5f3bde;if(this[_0x5b855c(0x411)]()){const _0x1ecfde=this['index']();Input[_0x5b855c(0x486)](_0x5b855c(0x599))&&(Input[_0x5b855c(0x3b8)](_0x5b855c(0x1e2))&&this[_0x5b855c(0x483)]()?this[_0x5b855c(0x28d)]():this[_0x5b855c(0x7a3)](Input['isTriggered']('down'))),Input[_0x5b855c(0x486)]('up')&&(Input['isPressed'](_0x5b855c(0x1e2))&&this[_0x5b855c(0x483)]()?this[_0x5b855c(0x2a1)]():this[_0x5b855c(0x7de)](Input[_0x5b855c(0x36a)]('up'))),Input[_0x5b855c(0x486)](_0x5b855c(0x7ed))&&this[_0x5b855c(0x750)](Input[_0x5b855c(0x36a)](_0x5b855c(0x7ed))),Input[_0x5b855c(0x486)]('left')&&this[_0x5b855c(0x68c)](Input[_0x5b855c(0x36a)](_0x5b855c(0x2c3))),!this[_0x5b855c(0x3c3)](_0x5b855c(0x804))&&Input[_0x5b855c(0x486)]('pagedown')&&this[_0x5b855c(0x28d)](),!this[_0x5b855c(0x3c3)](_0x5b855c(0x23e))&&Input[_0x5b855c(0x486)](_0x5b855c(0x23e))&&this[_0x5b855c(0x2a1)](),this[_0x5b855c(0x527)]()!==_0x1ecfde&&this[_0x5b855c(0x767)]();}},Window_Selectable[_0x5f3bde(0x371)]['processCursorHomeEndTrigger']=function(){const _0x28f4e2=_0x5f3bde;if(this['isCursorMovable']()){const _0x346d10=this[_0x28f4e2(0x527)]();Input[_0x28f4e2(0x36a)](_0x28f4e2(0x5fd))&&this[_0x28f4e2(0x4af)](Math['min'](this[_0x28f4e2(0x527)](),0x0)),Input[_0x28f4e2(0x36a)](_0x28f4e2(0x3d5))&&this[_0x28f4e2(0x4af)](Math[_0x28f4e2(0x615)](this[_0x28f4e2(0x527)](),this['maxItems']()-0x1)),this[_0x28f4e2(0x527)]()!==_0x346d10&&this[_0x28f4e2(0x767)]();}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x1cb)]=Window_Selectable[_0x5f3bde(0x371)]['processTouch'],Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x6a9)]=function(){const _0x8c5d2e=_0x5f3bde;this[_0x8c5d2e(0x248)]()?this['processTouchModernControls']():VisuMZ['CoreEngine'][_0x8c5d2e(0x1cb)][_0x8c5d2e(0x1f0)](this);},Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x689)]=function(){const _0x2d4925=_0x5f3bde;VisuMZ[_0x2d4925(0x23a)][_0x2d4925(0x1cb)][_0x2d4925(0x1f0)](this);},Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x7d7)]=function(){const _0x559c2c=_0x5f3bde;return VisuMZ['CoreEngine'][_0x559c2c(0x22e)][_0x559c2c(0x410)][_0x559c2c(0x662)];},Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x321)]=function(){const _0x338307=_0x5f3bde;return VisuMZ['CoreEngine'][_0x338307(0x22e)]['Window'][_0x338307(0x224)];},Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x792)]=function(){const _0x3f5abc=_0x5f3bde;return Window_Scrollable[_0x3f5abc(0x371)][_0x3f5abc(0x792)]['call'](this)+VisuMZ['CoreEngine'][_0x3f5abc(0x22e)][_0x3f5abc(0x410)][_0x3f5abc(0x6d3)];;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x7dc)]=Window_Selectable[_0x5f3bde(0x371)]['drawBackgroundRect'],Window_Selectable[_0x5f3bde(0x371)][_0x5f3bde(0x6f8)]=function(_0x376d0b){const _0x3844c6=_0x5f3bde,_0x3ca3b8=VisuMZ[_0x3844c6(0x23a)][_0x3844c6(0x22e)][_0x3844c6(0x410)];if(_0x3ca3b8['ShowItemBackground']===![])return;_0x3ca3b8[_0x3844c6(0x23c)]?_0x3ca3b8[_0x3844c6(0x23c)][_0x3844c6(0x1f0)](this,_0x376d0b):VisuMZ[_0x3844c6(0x23a)]['Window_Selectable_drawBackgroundRect'][_0x3844c6(0x1f0)](this,_0x376d0b);},VisuMZ[_0x5f3bde(0x23a)]['Window_Gold_refresh']=Window_Gold[_0x5f3bde(0x371)][_0x5f3bde(0x4be)],Window_Gold[_0x5f3bde(0x371)][_0x5f3bde(0x4be)]=function(){const _0x5aa8f5=_0x5f3bde;this[_0x5aa8f5(0x46a)]()?this[_0x5aa8f5(0x75c)]():VisuMZ[_0x5aa8f5(0x23a)][_0x5aa8f5(0x41d)][_0x5aa8f5(0x1f0)](this);},Window_Gold[_0x5f3bde(0x371)][_0x5f3bde(0x46a)]=function(){const _0x371e5b=_0x5f3bde;if(TextManager['currencyUnit']!==this[_0x371e5b(0x471)]())return![];return VisuMZ['CoreEngine'][_0x371e5b(0x22e)][_0x371e5b(0x736)]['ItemStyle'];},Window_Gold[_0x5f3bde(0x371)][_0x5f3bde(0x75c)]=function(){const _0x20e4f8=_0x5f3bde;this[_0x20e4f8(0x814)](),this[_0x20e4f8(0x562)]['clear'](),this[_0x20e4f8(0x562)]['fontSize']=VisuMZ[_0x20e4f8(0x23a)][_0x20e4f8(0x22e)]['Gold'][_0x20e4f8(0x42e)];const _0x14673f=VisuMZ[_0x20e4f8(0x23a)][_0x20e4f8(0x22e)][_0x20e4f8(0x736)]['GoldIcon'],_0x53d242=this[_0x20e4f8(0x534)](0x0);if(_0x14673f>0x0){const _0x5e97b8=_0x53d242['y']+(this[_0x20e4f8(0x5c5)]()-ImageManager[_0x20e4f8(0x78c)])/0x2;this['drawIcon'](_0x14673f,_0x53d242['x'],_0x5e97b8);const _0x3f85c6=ImageManager[_0x20e4f8(0x46b)]+0x4;_0x53d242['x']+=_0x3f85c6,_0x53d242[_0x20e4f8(0x431)]-=_0x3f85c6;}this[_0x20e4f8(0x1ba)](ColorManager['systemColor']()),this[_0x20e4f8(0x79f)](this[_0x20e4f8(0x471)](),_0x53d242['x'],_0x53d242['y'],_0x53d242[_0x20e4f8(0x431)],_0x20e4f8(0x2c3));const _0x46f892=this[_0x20e4f8(0x3fc)](this[_0x20e4f8(0x471)]())+0x6;;_0x53d242['x']+=_0x46f892,_0x53d242[_0x20e4f8(0x431)]-=_0x46f892,this[_0x20e4f8(0x7f5)]();const _0x27b4f7=this[_0x20e4f8(0x4fe)](),_0x258eb8=this[_0x20e4f8(0x3fc)](this[_0x20e4f8(0x2c6)]?VisuMZ[_0x20e4f8(0x2ec)](this['value']()):this['value']());_0x258eb8>_0x53d242[_0x20e4f8(0x431)]?this[_0x20e4f8(0x79f)](VisuMZ[_0x20e4f8(0x23a)][_0x20e4f8(0x22e)]['Gold'][_0x20e4f8(0x5b6)],_0x53d242['x'],_0x53d242['y'],_0x53d242['width'],_0x20e4f8(0x7ed)):this[_0x20e4f8(0x79f)](this[_0x20e4f8(0x4fe)](),_0x53d242['x'],_0x53d242['y'],_0x53d242[_0x20e4f8(0x431)],_0x20e4f8(0x7ed)),this[_0x20e4f8(0x814)]();},Window_StatusBase[_0x5f3bde(0x371)][_0x5f3bde(0x5f9)]=function(_0x36995d,_0x467f77,_0x2fa8cf,_0x1f13a9,_0x2491b9){const _0x5666a7=_0x5f3bde;_0x1f13a9=String(_0x1f13a9||'')[_0x5666a7(0x22d)]();if(VisuMZ[_0x5666a7(0x23a)]['Settings'][_0x5666a7(0x275)]['DrawIcons']){const _0x9d17d5=VisuMZ[_0x5666a7(0x38b)](_0x1f13a9);_0x2491b9?(this[_0x5666a7(0x780)](_0x9d17d5,_0x36995d,_0x467f77,this[_0x5666a7(0x78b)]()),_0x2fa8cf-=this[_0x5666a7(0x78b)]()+0x2,_0x36995d+=this[_0x5666a7(0x78b)]()+0x2):(this[_0x5666a7(0x3fa)](_0x9d17d5,_0x36995d+0x2,_0x467f77+0x2),_0x2fa8cf-=ImageManager[_0x5666a7(0x46b)]+0x4,_0x36995d+=ImageManager[_0x5666a7(0x46b)]+0x4);}const _0x33faac=TextManager[_0x5666a7(0x5c4)](_0x1f13a9);this[_0x5666a7(0x814)](),this[_0x5666a7(0x1ba)](ColorManager[_0x5666a7(0x4b1)]()),_0x2491b9?(this[_0x5666a7(0x562)][_0x5666a7(0x68e)]=this[_0x5666a7(0x1b3)](),this['contents'][_0x5666a7(0x79f)](_0x33faac,_0x36995d,_0x467f77,_0x2fa8cf,this[_0x5666a7(0x78b)](),_0x5666a7(0x2c3))):this[_0x5666a7(0x79f)](_0x33faac,_0x36995d,_0x467f77,_0x2fa8cf),this[_0x5666a7(0x814)]();},Window_StatusBase['prototype'][_0x5f3bde(0x1b3)]=function(){const _0x1dc89a=_0x5f3bde;return $gameSystem[_0x1dc89a(0x74a)]()-0x8;},Window_StatusBase[_0x5f3bde(0x371)]['drawActorClass']=function(_0x24b52d,_0x29e1bd,_0x243d65,_0x5c2fa2){const _0x2960a2=_0x5f3bde;_0x5c2fa2=_0x5c2fa2||0xa8,this[_0x2960a2(0x7f5)]();if(VisuMZ[_0x2960a2(0x23a)][_0x2960a2(0x22e)]['UI'][_0x2960a2(0x389)])this['drawTextEx'](_0x24b52d[_0x2960a2(0x733)]()[_0x2960a2(0x6ad)],_0x29e1bd,_0x243d65,_0x5c2fa2);else{const _0x522c8e=_0x24b52d[_0x2960a2(0x733)]()[_0x2960a2(0x6ad)][_0x2960a2(0x3b4)](/\\I\[(\d+)\]/gi,'');this[_0x2960a2(0x79f)](_0x522c8e,_0x29e1bd,_0x243d65,_0x5c2fa2);}},Window_StatusBase[_0x5f3bde(0x371)][_0x5f3bde(0x29f)]=function(_0x5c1b14,_0x28a5b7,_0x4e4462,_0x1e1c23){const _0x258aad=_0x5f3bde;_0x1e1c23=_0x1e1c23||0x10e,this[_0x258aad(0x7f5)]();if(VisuMZ[_0x258aad(0x23a)][_0x258aad(0x22e)]['UI'][_0x258aad(0x459)])this[_0x258aad(0x1e6)](_0x5c1b14[_0x258aad(0x67d)](),_0x28a5b7,_0x4e4462,_0x1e1c23);else{const _0x4acb72=_0x5c1b14['nickname']()[_0x258aad(0x3b4)](/\\I\[(\d+)\]/gi,'');this[_0x258aad(0x79f)](_0x5c1b14['nickname'](),_0x28a5b7,_0x4e4462,_0x1e1c23);}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x3e7)]=Window_StatusBase[_0x5f3bde(0x371)][_0x5f3bde(0x238)],Window_StatusBase[_0x5f3bde(0x371)]['drawActorLevel']=function(_0x3e0e6f,_0x54efa2,_0x1653be){const _0x4ae8ab=_0x5f3bde;if(this[_0x4ae8ab(0x82a)]())this['drawActorExpGauge'](_0x3e0e6f,_0x54efa2,_0x1653be);VisuMZ['CoreEngine'][_0x4ae8ab(0x3e7)]['call'](this,_0x3e0e6f,_0x54efa2,_0x1653be);},Window_StatusBase[_0x5f3bde(0x371)][_0x5f3bde(0x82a)]=function(){const _0x339001=_0x5f3bde;return VisuMZ[_0x339001(0x23a)][_0x339001(0x22e)]['UI'][_0x339001(0x380)];},Window_StatusBase[_0x5f3bde(0x371)][_0x5f3bde(0x302)]=function(_0x7ba561,_0x493c64,_0x576408){const _0x1ef396=_0x5f3bde;if(!_0x7ba561)return;if(!_0x7ba561[_0x1ef396(0x1fa)]())return;const _0x154f13=0x80,_0x5d41d4=_0x7ba561[_0x1ef396(0x39e)]();let _0x5179d2=ColorManager['expGaugeColor1'](),_0x1d36a3=ColorManager[_0x1ef396(0x78d)]();_0x5d41d4>=0x1&&(_0x5179d2=ColorManager[_0x1ef396(0x2c9)](),_0x1d36a3=ColorManager[_0x1ef396(0x1ab)]()),this['drawGauge'](_0x493c64,_0x576408,_0x154f13,_0x5d41d4,_0x5179d2,_0x1d36a3);},Window_EquipStatus[_0x5f3bde(0x371)][_0x5f3bde(0x728)]=function(){const _0x13fed1=_0x5f3bde;let _0x4c85d0=0x0;for(const _0x5ce1d5 of VisuMZ[_0x13fed1(0x23a)]['Settings'][_0x13fed1(0x275)][_0x13fed1(0x2c7)]){const _0x13e841=this[_0x13fed1(0x6f4)](),_0x49ae8f=this[_0x13fed1(0x45d)](_0x4c85d0);this[_0x13fed1(0x78e)](_0x13e841,_0x49ae8f,_0x5ce1d5),_0x4c85d0++;}},Window_EquipStatus['prototype'][_0x5f3bde(0x59d)]=function(_0x30b3a0,_0x358f6f,_0x8ebcfc){const _0x3e7d3c=_0x5f3bde,_0x1f179a=this['paramX']()-this[_0x3e7d3c(0x6f4)]()*0x2;this[_0x3e7d3c(0x5f9)](_0x30b3a0,_0x358f6f,_0x1f179a,_0x8ebcfc,![]);},Window_EquipStatus[_0x5f3bde(0x371)][_0x5f3bde(0x456)]=function(_0x65216c,_0x276c98,_0xa82b42){const _0x803331=_0x5f3bde,_0x3df297=this['paramWidth']();this['resetTextColor'](),this[_0x803331(0x79f)](this[_0x803331(0x448)][_0x803331(0x6c0)](_0xa82b42,!![]),_0x65216c,_0x276c98,_0x3df297,'right');},Window_EquipStatus[_0x5f3bde(0x371)][_0x5f3bde(0x69b)]=function(_0x1079fe,_0x3464a){const _0x141c55=_0x5f3bde,_0x501955=this[_0x141c55(0x5d2)]();this[_0x141c55(0x1ba)](ColorManager['systemColor']());const _0x41a7c6=VisuMZ[_0x141c55(0x23a)][_0x141c55(0x22e)]['UI']['ParamArrow'];this['drawText'](_0x41a7c6,_0x1079fe,_0x3464a,_0x501955,_0x141c55(0x418));},Window_EquipStatus[_0x5f3bde(0x371)][_0x5f3bde(0x349)]=function(_0x4101f6,_0x58190b,_0x3a5b66){const _0x2b02f1=_0x5f3bde,_0x3a5ab4=this[_0x2b02f1(0x4e2)](),_0x20a834=this[_0x2b02f1(0x791)][_0x2b02f1(0x6c0)](_0x3a5b66),_0x5b56c3=_0x20a834-this[_0x2b02f1(0x448)][_0x2b02f1(0x6c0)](_0x3a5b66);this[_0x2b02f1(0x1ba)](ColorManager[_0x2b02f1(0x71f)](_0x5b56c3)),this[_0x2b02f1(0x79f)](this[_0x2b02f1(0x791)]['paramValueByName'](_0x3a5b66,!![]),_0x4101f6,_0x58190b,_0x3a5ab4,'right');},VisuMZ['CoreEngine'][_0x5f3bde(0x600)]=Window_EquipItem['prototype'][_0x5f3bde(0x2b8)],Window_EquipItem[_0x5f3bde(0x371)][_0x5f3bde(0x2b8)]=function(_0x4eb350){const _0x336aff=_0x5f3bde;return _0x4eb350&&this[_0x336aff(0x448)]?this['_actor']['canEquip'](_0x4eb350):VisuMZ[_0x336aff(0x23a)][_0x336aff(0x600)]['call'](this,_0x4eb350);},Window_StatusParams['prototype']['maxItems']=function(){const _0x375d94=_0x5f3bde;return VisuMZ[_0x375d94(0x23a)][_0x375d94(0x22e)][_0x375d94(0x275)][_0x375d94(0x2c7)][_0x375d94(0x6d7)];},Window_StatusParams[_0x5f3bde(0x371)][_0x5f3bde(0x78e)]=function(_0x383d78){const _0x1ce198=_0x5f3bde,_0x366cbc=this['itemLineRect'](_0x383d78),_0x489396=VisuMZ[_0x1ce198(0x23a)][_0x1ce198(0x22e)][_0x1ce198(0x275)][_0x1ce198(0x2c7)][_0x383d78],_0x54fbc2=TextManager[_0x1ce198(0x5c4)](_0x489396),_0x1ae149=this['_actor']['paramValueByName'](_0x489396,!![]);this['drawParamText'](_0x366cbc['x'],_0x366cbc['y'],0xa0,_0x489396,![]),this[_0x1ce198(0x7f5)](),this[_0x1ce198(0x79f)](_0x1ae149,_0x366cbc['x']+0xa0,_0x366cbc['y'],0x3c,_0x1ce198(0x7ed));};if(VisuMZ[_0x5f3bde(0x23a)]['Settings'][_0x5f3bde(0x42c)][_0x5f3bde(0x387)]){VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x42c)]['QwertyLayout']&&(Window_NameInput[_0x5f3bde(0x20d)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x5f3bde(0x427),'OK']);;VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6c8)]=Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x301)],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x301)]=function(_0xb6c742){const _0x375a92=_0x5f3bde;this[_0x375a92(0x657)]=this['defaultInputMode'](),VisuMZ[_0x375a92(0x23a)]['Window_NameInput_initialize'][_0x375a92(0x1f0)](this,_0xb6c742),this[_0x375a92(0x657)]===_0x375a92(0x77e)?this['select'](0x0):(Input[_0x375a92(0x6ec)](),this[_0x375a92(0x26f)]());},Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x419)]=function(){const _0x4d5c4b=_0x5f3bde;if(Input[_0x4d5c4b(0x627)]())return'default';return VisuMZ['CoreEngine'][_0x4d5c4b(0x22e)][_0x4d5c4b(0x42c)]['DefaultMode']||_0x4d5c4b(0x510);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x724)]=Window_NameInput[_0x5f3bde(0x371)]['processHandling'],Window_NameInput[_0x5f3bde(0x371)]['processHandling']=function(){const _0x251e66=_0x5f3bde;if(!this['isOpen']())return;if(!this[_0x251e66(0x24d)])return;if(this[_0x251e66(0x657)]===_0x251e66(0x510)&&Input[_0x251e66(0x7fc)]())this[_0x251e66(0x1b4)](_0x251e66(0x77e));else{if(Input[_0x251e66(0x673)](_0x251e66(0x59c)))Input['clear'](),this['processBack']();else{if(Input[_0x251e66(0x36a)](_0x251e66(0x44e)))Input['clear'](),this[_0x251e66(0x657)]===_0x251e66(0x510)?this[_0x251e66(0x1b4)](_0x251e66(0x77e)):this['switchModes']('keyboard');else{if(this[_0x251e66(0x657)]==='keyboard')this[_0x251e66(0x6da)]();else Input[_0x251e66(0x673)](_0x251e66(0x501))?(Input['clear'](),this[_0x251e66(0x1b4)](_0x251e66(0x510))):VisuMZ[_0x251e66(0x23a)]['Window_NameInput_processHandling'][_0x251e66(0x1f0)](this);}}}},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x7c0)]=Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x6a9)],Window_NameInput[_0x5f3bde(0x371)]['processTouch']=function(){const _0x19a69f=_0x5f3bde;if(!this[_0x19a69f(0x394)]())return;if(this['_mode']===_0x19a69f(0x510)){if(TouchInput[_0x19a69f(0x36a)]()&&this[_0x19a69f(0x521)]())this[_0x19a69f(0x1b4)](_0x19a69f(0x77e));else TouchInput[_0x19a69f(0x602)]()&&this[_0x19a69f(0x1b4)](_0x19a69f(0x77e));}else VisuMZ[_0x19a69f(0x23a)]['Window_NameInput_processTouch'][_0x19a69f(0x1f0)](this);},Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x6da)]=function(){const _0x5313a1=_0x5f3bde;if(Input[_0x5313a1(0x673)](_0x5313a1(0x3a8)))Input[_0x5313a1(0x6ec)](),this['onNameOk']();else{if(Input[_0x5313a1(0x826)]!==undefined){let _0x3d67d2=Input[_0x5313a1(0x826)],_0x3e3694=_0x3d67d2[_0x5313a1(0x6d7)];for(let _0x41f82f=0x0;_0x41f82f<_0x3e3694;++_0x41f82f){this[_0x5313a1(0x4df)]['add'](_0x3d67d2[_0x41f82f])?SoundManager[_0x5313a1(0x7fa)]():SoundManager[_0x5313a1(0x27a)]();}Input['clear']();}}},Window_NameInput[_0x5f3bde(0x371)]['switchModes']=function(_0x18bd7a){const _0x44efd2=_0x5f3bde;let _0x4d5b32=this[_0x44efd2(0x657)];this['_mode']=_0x18bd7a,_0x4d5b32!==this[_0x44efd2(0x657)]&&(this[_0x44efd2(0x4be)](),SoundManager['playOk'](),this['_mode']===_0x44efd2(0x77e)?this[_0x44efd2(0x545)](0x0):this[_0x44efd2(0x545)](-0x1));},VisuMZ[_0x5f3bde(0x23a)]['Window_NameInput_cursorDown']=Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x7a3)],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x7a3)]=function(_0xf166bc){const _0x252638=_0x5f3bde;if(this['_mode']===_0x252638(0x510)&&!Input['isArrowPressed']())return;if(Input[_0x252638(0x5d9)]())return;VisuMZ[_0x252638(0x23a)][_0x252638(0x830)][_0x252638(0x1f0)](this,_0xf166bc),this[_0x252638(0x1b4)]('default');},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x196)]=Window_NameInput['prototype'][_0x5f3bde(0x7de)],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x7de)]=function(_0x56f788){const _0x1316e7=_0x5f3bde;if(this[_0x1316e7(0x657)]===_0x1316e7(0x510)&&!Input[_0x1316e7(0x34b)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x1316e7(0x23a)][_0x1316e7(0x196)][_0x1316e7(0x1f0)](this,_0x56f788),this[_0x1316e7(0x1b4)](_0x1316e7(0x77e));},VisuMZ[_0x5f3bde(0x23a)]['Window_NameInput_cursorRight']=Window_NameInput[_0x5f3bde(0x371)]['cursorRight'],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x750)]=function(_0x427feb){const _0xd6886f=_0x5f3bde;if(this['_mode']===_0xd6886f(0x510)&&!Input[_0xd6886f(0x34b)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0xd6886f(0x23a)][_0xd6886f(0x6ab)][_0xd6886f(0x1f0)](this,_0x427feb),this['switchModes']('default');},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x5ae)]=Window_NameInput['prototype']['cursorLeft'],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x68c)]=function(_0x1377d4){const _0xbcb45c=_0x5f3bde;if(this['_mode']===_0xbcb45c(0x510)&&!Input[_0xbcb45c(0x34b)]())return;if(Input[_0xbcb45c(0x5d9)]())return;VisuMZ[_0xbcb45c(0x23a)]['Window_NameInput_cursorLeft'][_0xbcb45c(0x1f0)](this,_0x1377d4),this['switchModes'](_0xbcb45c(0x77e));},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6d5)]=Window_NameInput[_0x5f3bde(0x371)]['cursorPagedown'],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x28d)]=function(){const _0x5ba818=_0x5f3bde;if(this[_0x5ba818(0x657)]===_0x5ba818(0x510))return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x5ba818(0x6d5)][_0x5ba818(0x1f0)](this),this[_0x5ba818(0x1b4)](_0x5ba818(0x77e));},VisuMZ['CoreEngine'][_0x5f3bde(0x54a)]=Window_NameInput[_0x5f3bde(0x371)]['cursorPageup'],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x2a1)]=function(){const _0x5eb2a8=_0x5f3bde;if(this['_mode']===_0x5eb2a8(0x510))return;if(Input[_0x5eb2a8(0x5d9)]())return;VisuMZ[_0x5eb2a8(0x23a)][_0x5eb2a8(0x54a)][_0x5eb2a8(0x1f0)](this),this['switchModes'](_0x5eb2a8(0x77e));},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6bf)]=Window_NameInput['prototype'][_0x5f3bde(0x4be)],Window_NameInput[_0x5f3bde(0x371)][_0x5f3bde(0x4be)]=function(){const _0x306257=_0x5f3bde;if(this[_0x306257(0x657)]===_0x306257(0x510)){this[_0x306257(0x562)][_0x306257(0x6ec)](),this[_0x306257(0x29a)][_0x306257(0x6ec)](),this[_0x306257(0x7f5)]();let _0x58b680=VisuMZ['CoreEngine'][_0x306257(0x22e)][_0x306257(0x42c)][_0x306257(0x337)][_0x306257(0x58b)]('\x0a'),_0x3a09d1=_0x58b680[_0x306257(0x6d7)],_0xc84c27=(this[_0x306257(0x5c3)]-_0x3a09d1*this['lineHeight']())/0x2;for(let _0x46503f=0x0;_0x46503f<_0x3a09d1;++_0x46503f){let _0x1bec4a=_0x58b680[_0x46503f],_0x2bf553=this[_0x306257(0x5f0)](_0x1bec4a)[_0x306257(0x431)],_0x35320f=Math[_0x306257(0x43f)]((this[_0x306257(0x562)][_0x306257(0x431)]-_0x2bf553)/0x2);this[_0x306257(0x1e6)](_0x1bec4a,_0x35320f,_0xc84c27),_0xc84c27+=this[_0x306257(0x5c5)]();}}else VisuMZ[_0x306257(0x23a)][_0x306257(0x6bf)][_0x306257(0x1f0)](this);};};function _0x4e21(){const _0x5ed4b9=['type','MvAnimationRate','Origin','fromCharCode','PictureEraseRange','SwitchRandomizeOne','processCursorHomeEndTrigger','targetContentsOpacity','Show\x20Scrolling\x20Text\x20Script\x20Error','setActorHomeRepositioned','shake','131010VdOOCk','process_VisuMZ_CoreEngine_RegExp','pictureButtons','%1〘Choice\x20%2〙\x20%3%1','mpColor','([\x5c+\x5c-]\x5cd+)>','updateOnceParallelInterpreters','HOME','makeAutoBattleActions','_playTestFastMode','resetBattleSystem','layoutSettings','Window_NameInput_processTouch','isBottomButtonMode','original','drawTextTopAligned','_centerElementCoreEngine','moveRelativeToResolutionChange','_hp','createTextState','targetObjects','isBusy','key%1','OutlineColor','test','CallHandlerJS','FTB','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Graphics_defaultStretchMode','origin','valueOutlineWidth','Window_Base_drawCharacter','PRESERVCONVERSION(%1)','SParamVocab3','listWindowRect','colSpacing','_duration','_coreEasing','ParseArmorNotetags','(\x5cd+)([%％])>','Window_Selectable_drawBackgroundRect','updatePosition','cursorUp','loadIconBitmap','areButtonsOutsideMainUI','Game_Picture_show','75qeMjZG','INSERT','OPEN_CURLY_BRACKET','Graphics','mhp','VisuMZ_2_BattleSystemBTB','ActorRect','getBackgroundOpacity','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','VisuMZ_2_BattleSystemETB','createCustomBackgroundImages','right','ParseItemNotetags','Bitmap_strokeRect','processDigitChange','_customModified','_offsetX','isWindowMaskingEnabled','setActionState','resetTextColor','alignBottom','Input_pollGamepads','DATABASE','setAction','playOk','TextManager_param','isGamepadTriggered','SParamVocab8','ImprovedAccuracySystem','constructor','_downArrowSprite','WIN_OEM_RESET','pages','HYPHEN_MINUS','pagedown','Game_Interpreter_command111','isMenuButtonAssistEnabled','createCommandWindow','ctGaugeColor1','F13','playLoad','removeOnceParallelInterpreter','Wait','ButtonFadeSpeed','setupNewGame','Flat2','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','setupFont','JSON','DigitGroupingStandardText','resetFontSettings','xparamPlusJS','update','move','ConvertNumberToString','removeFauxAnimation','SParamVocab7','ATTN','targets','clearRect','paramRate2','_offsetY','updatePositionCoreEngineShakeRand','isMapScrollLinked','encounterStep','Sprite_AnimationMV_updatePosition','1.3.0','Scene_Options_create','_inputString','F17','textBaseline','EndingID','isExpGaugeDrawn','EQUAL','numberWindowRect','ListRect','_rate','TGR','Window_NameInput_cursorDown','adjustBoxSize','Scene_Boot_startNormalGame','setValue','GoldRect','coreEngineRepositionEnemies','CEV','nw.gui','ProfileBgType','MultiKeyFmt','tilesets','BasicParameterFormula','reduce','checkSubstitute','setupBattleTestItems','Window_NameInput_cursorUp','_pictureName','mainAreaTopSideButtonLayout','mainAreaHeight','Max','faceWidth','gaugeBackColor','clearStencil','isInstanceOfSceneMap','buttonAssistOffset4','resize','Sprite_Button_updateOpacity','Scene_GameEnd_createBackground','Spriteset_Base_updatePosition','subtitle','updateEffekseer','KEEP','stencilOp','STENCIL_TEST','EXCLAMATION','_shakeSpeed','maxLvGaugeColor2','animations','fadeSpeed','bitmapHeight','MODECHANGE','isSideButtonLayout','CAPSLOCK','_fauxAnimationQueue','smallParamFontSize','switchModes','Bitmap_drawText','\x0a\x0a\x0a\x0a\x0a','eva','tpColor','ColorGaugeBack','changeTextColor','267845KTthZZ','Window_Selectable_cursorDown','text%1','startNormalGame','addChild','BlendMode','status','moveCancelButtonSideButtonLayout','hit','CustomParam','description','updatePositionCoreEngineShakeVert','EscapeAlways','ONE','ALTGR','ARRAYNUM','Window_Selectable_processTouch','Sprite_Actor_setActorHome','SideView','ETB','initCoreEngineScreenShake','abs','Game_Actor_changeClass','command122','addCommand','ConvertParams','sparamRate2','Scene_MenuBase_mainAreaHeight','_tilemap','_backSprite1','WIN_OEM_CLEAR','\x5c}❪TAB❫\x5c{','volume','_timerSprite','yScrollLinkedOffset','playTestF6','targetSpritePosition','CLOSE_PAREN','GREATER_THAN','shift','meVolume','_changingClass','changeClass','drawTextEx','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','hpGaugeColor2','Sprite_Button_initialize','parse','Window_Selectable_cursorUp','Scene_Map_updateScene','forceOutOfPlaytest','%1/','NoTileShadows','call','setSideButtonLayout','PERCENT','min','isPointAnimationPlaying','createChildSprite','command105','SystemSetFontSize','isAnimationForEach','animationShouldMirror','isActor','params','WIN_OEM_FJ_LOYA','SceneManager_isGameActive','Game_Picture_x','erasePicture','processEscape','GET','onClick','buttonAssistCancel','LEFT','setSideView','BuyRect','_goldWindow','AllMaps','drawCircle','【%1】\x0a','SParamVocab4','Flat1','LATIN1','_dummyWindow','Flat','ceil','openURL','inBattle','system','PERIOD','TRAIT_PARAM','createFauxAnimation','Map%1.json','Unnamed','Game_Action_numRepeats','setupCustomRateCoreEngine','CategoryBgType','CrisisRate','initialLevel','updateMotion','isSceneMap','updateOpacity','textAlign','KANA','makeInputButtonString','RowSpacing','itemWindowRect','sin','WIN_OEM_AUTO','EnableJS','ParseClassNotetags','_animationQueue','map','NUMPAD6','toUpperCase','Settings','stringKeyMap','Sprite_Animation_processSoundTimings','Sprite_Battler_startMove','fillRect','vertJS','setClickHandler','parseForcedGameTroopSettingsCoreEngine','titles1','xScrollLinkedOffset','drawActorLevel','StatusEquipBgType','CoreEngine','BattleManager_processEscape','DrawItemBackgroundJS','buttonAssistKey3','pageup','CONTEXT_MENU','paramFlatBonus','KeySHIFT','addWindow','createBackground','EditRect','NewGameCommonEvent','nextLevelExp','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','isUseModernControls','PreserveNumbers','asin','ExtractStrFromList','process_VisuMZ_CoreEngine_Settings','active','darwin','paramFlatJS','updatePointAnimations','Duration','createWindowLayer','parallaxes','getColorDataFromPluginParameters','F12','buttonAssistOk','dashToggle','ARRAYSTR','_pointAnimationSprites','getInputButtonString','SwitchActorText','SwitchRandomizeRange','initButtonHidden','sellWindowRect','_colorTone','Window_NumberInput_processDigitChange','setLastPluginCommandInterpreter','EquipMenu','mpGaugeColor1','isMagical','Game_Screen_initialize','performEscape','RIGHT','ColorCrisis','SystemLoadImages','useFontWidthFix','4470CqRbOF','ctrl','_context','paramPlus','deselect','_repositioned','BACKSPACE','DigitGroupingDamageSprites','Abbreviation','_battleField','Param','buttonAssistWindowButtonRect','onEscapeSuccess','paramPlusJS','CustomParamNames','playBuzzer','updateLastTarget','DataManager_setupNewGame','TitleCommandList','WIN_OEM_JUMP','NUMPAD2','_lastX','paramMax','render','applyForcedGameTroopSettingsCoreEngine','evaded','cos','isGamepadButtonPressed','GoldIcon','_stored_systemColor','setMute','random','_stored_expGaugeColor2','createTitleButtons','cursorPagedown','updateData','addOnceParallelInterpreter','Spriteset_Base_initialize','Rate2','innerWidth','contains','drawSegment','AutoStretch','push','getCombinedScrollingText','useDigitGroupingEx','setFrame','contentsBack','_categoryWindow','BgFilename2','_sideButtonLayout','keypress','drawActorNickname','_scaleY','cursorPageup','removeAllPointAnimations','_stored_mpGaugeColor1','ParamMax','helpWindowRect','playTestF7','_stored_expGaugeColor1','ScreenShake','sparamPlus2','buttonY','parameters','terms','en-US','categoryWindowRect','setHandler','SlotRect','_sellWindow','OpenSpeed','NewGameCommonEventAll','restore','actor','updateScene','_refreshBack','isEnabled','IconParam3','bitmap','ListBgType','<%1\x20%2:[\x20]','OpenURL','F11','isKeyItem','clone','isFauxAnimationPlaying','_bitmap','left','xparamFlat1','EXECUTE','_digitGrouping','DisplayedParams','_cacheScaleY','maxLvGaugeColor1','ActorHPColor','bitmapWidth','helpAreaHeight','_windowskin','InputRect','_hideTileShadows','ItemBackColor2','updatePositionCoreEngineShakeHorz','F7key','displayX','updateTransform','createCancelButton','DECIMAL','SParameterFormula','setupButtonImage','Game_Map_setup','onLoad','updateOrigin','Manual','NUMPAD7','encounterStepsMinimum','Game_Troop_setup','renderNoMask','initialBattleSystem','buttonAssistText5','ImgLoad','FUNC','PictureEasingType','list','canUse','SnapshotOpacity','getCoreEngineScreenShakeStyle','BuyBgType','Scene_Base_createWindowLayer','GroupDigits','WIN_OEM_FJ_JISHO','SmartEventCollisionPriority','_itemWindow','determineSideButtonLayoutValid','StatusRect','buttonAssistText1','destroyCoreEngineMarkedBitmaps','windowRect','CommandWidth','FunctionName','SEMICOLON','_muteSound','Spriteset_Base_destroy','%1:\x20Exit\x20','Game_Action_itemHit','ONE_MINUS_SRC_ALPHA','font','setSize','scaleSprite','QUESTION_MARK','initialize','drawActorExpGauge','BlurFilter','createPointAnimationTargets','statusWindowRect','viewport','concat','ColorExpGauge1','bgs','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','EXR','CTRL','ColorTPCost','IconIndex','STENCIL_BUFFER_BIT','OptionsRect','_stored_hpGaugeColor2','removePointAnimation','_gamepadWait','$dataMap','DocumentTitleFmt','ExtractStrFromMap','xparamPlus','Chance','makeActionList','getLevel','showFauxAnimations','_action','touchUI','Graphics_centerElement','data/','Scene_MenuBase_createPageButtons','rowSpacing','filter','advanced','eventsXyNt','OUTQUART','hpGaugeColor1','UNDERSCORE','_anchor','popScene','_pollGamepads','F23','InputBgType','ColorCTGauge2','onButtonImageLoad','VisuMZ_2_BattleSystemFTB','NUM_LOCK','catchUnknownError','Window_Selectable_itemRect','2491308XfWLOr','valueOutlineColor','_defaultStretchMode','loadSystem','NameInputMessage','QoL','_clickHandler','HelpRect','STB','NUMPAD3','Untitled','isGameActive','buttonAssistWindowRect','mirror','isOptionValid','Game_BattlerBase_refresh','contentsOpacity','ActorBgType','INQUINT','_data','_troopId','OutlineColorDmg','drawNewParam','vertical','isArrowPressed','goto','_statusWindow','createTroopNote','Game_Interpreter_command355','button','_destroyInternalTextures','Linear','helpAreaTopSideButtonLayout','getPointAnimationLayer','updateFauxAnimations','VisuMZ_2_BattleSystemOTB','MAT','overrideMimeType','successRate','ColorMPCost','ARRAYJSON','remove','bgmVolume','ADD','outlineColorDmg','paramFlat','_lastPluginCommandInterpreter','_targetOffsetY','WIN_OEM_COPY','#%1','isTpb','Input_update','picture','TCR','Bitmap_drawCircle','isTriggered','DIVIDE','repositionEnemiesByResolution','titleCommandWindow','CTB','OUTELASTIC','Game_Interpreter_command105','prototype','buttonAssistKey5','_coreEasingType','createSpriteset','Plus','onMoveEnd','runCombinedScrollingTextAsCode','〘Common\x20Event\x20%1:\x20%2〙\x20End','number','EnableMasking','startShake','destroyed','F16','repeat','%1〘End\x20Choice\x20Selection〙%1','LvExpGauge','onKeyDown','_drawTextOutline','Sprite_Gauge_gaugeRate','TPB\x20ACTIVE','dimColor2','subjectHitRate','EnableNameInput','DigitGroupingExText','TextCodeClassNames','FontSmoothing','GetParamIcon','statusParamsWindowRect','targetY','open','drawValue','terminate','ExportCurTroopText','getCustomBackgroundSettings','DEF','isOpenAndActive','Game_Action_updateLastTarget','updateDocumentTitle','areTileShadowsHidden','FadeSpeed','setEnemyAction','IconParam7','Game_Picture_updateMove','PIPE','_dimmerSprite','expRate','_drawTextBody','_storedStack','sparamRateJS','mpCostColor','_animation','skipBranch','SUBTRACT','IconParam0','setupCoreEasing','enter','buttonAssistText%1','maxItems','PositionJS','dimColor1','strokeRect','buttonAssistKey2','_targetScaleY','isSmartEventCollisionOn','StatusParamsBgType','Pixelated','END','replace','Window_Base_drawIcon','createFauxAnimationQueue','startAnimation','isPressed','_updateFilterArea','SParamVocab9','Color','MULTIPLY','drawCharacter','MAX_SAFE_INTEGER','VOLUME_DOWN','translucentOpacity','StartID','SLASH','isHandled','Scene_MenuBase_helpAreaTop','xdg-open','forceStencil','ParamChange','Spriteset_Base_update','21394OQSEOf','ShowButtons','Bitmap_initialize','getLastPluginCommandInterpreter','IconXParam1','_pressed','updateKeyText','Scene_MenuBase_createCancelButton','DigitGroupingLocale','numRepeats','setViewport','ColorManager_loadWindowskin','end','VisuMZ_1_OptionsCore','_statusParamsWindow','setBackgroundType','OptionsBgType','ColorPowerDown','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','xparamPlus1','background','_playtestF7Looping','_viewportSize','CLEAR','needsUpdate','createEnemies','_pauseSignSprite','updatePlayTestF7','initCoreEngine','ARRAYEVAL','Window_StatusBase_drawActorLevel','performMiss','itemHit','MAXHP','Renderer','FINAL','FontSize','isForFriend','ESC','_backSprite2','requestPointAnimation','Game_System_initialize','gradientFillRect','_menuButton','sparam','itypeId','VisuMZ_2_BattleSystemCTB','charAt','isAnimationOffsetXMirrored','drawIcon','batch','textWidth','Sprite_destroy','skillTypeWindowRect','buttonAssistText4','_stored_ctGaugeColor2','playCursor','visible','bgsVolume','isInputting','addChildToBack','LevelUpFullHp','levelUpRecovery','NEAREST','MEV','Game_Actor_levelUp','drawGameSubtitle','isCollidedWithEvents','_moveEasingType','XParamVocab9','processKeyboardBackspace','Window','isCursorMovable','INBOUNCE','makeCoreEngineCommandList','sqrt','DTB','_commandWindow','〘Common\x20Event\x20%1:\x20%2〙\x20Start','center','defaultInputMode','IconParam4','INSINE','drawGameTitle','Window_Gold_refresh','updateDashToggle','pagedownShowButton','MenuBg','ParseAllNotetags','BTB','isNwjs','ExportStrFromAllMaps','EncounterRateMinimum','GoldMax','Page','updateMainMultiply','TPB\x20WAIT','powerUpColor','font-smooth','KeyboardInput','_onceParallelInterpreters','GoldFontSize','ForceNoPlayTest','onerror','width','context','initCoreEasing','randomInt','Window_Base_drawText','isNormalPriority','CreateBattleSystemID','SkillTypeRect','CommandRect','PGUP','Scene_Boot_loadSystemImages','showPointAnimations','Sprite_Picture_loadBitmap','isAlive','floor','slotWindowRect','<JS\x20%1\x20%2:[\x20](.*)>','Window_Selectable_processCursorMove','createPageButtons','targetScaleX','toFixed','_stored_maxLvGaugeColor1','DOLLAR','_actor','exit','windowPadding','jsQuickFunc','printError','buttonAreaHeight','tab','Title','command111','CancelText','209AYEymv','normal','onInputOk','Scene_Battle_update','drawCurrentParam','onInputBannedWords','ParseWeaponNotetags','TextCodeNicknames','F24','XParamVocab7','SideButtons','paramY','BaseTexture','reservePlayTestNewGameCommonEvent','opacity','doesNameContainBannedWords','retreat','updateWaitMode','image-rendering','hpColor','1196168KqBiau','WIN_ICO_HELP','_shakePower','PHA','isItemStyle','iconWidth','paramMaxJS','save','%1\x0a','tileHeight','_lastOrigin','currencyUnit','img/%1/','blt','areButtonsHidden','uiAreaHeight','clearOnceParallelInterpreters','commandWindowRect','toString','gainSilentTp','levelUp','stencilFunc','INOUTQUINT','destroy','XParamVocab1','Scene_Unlisted','addLoadListener','createButtonAssistWindow','targetPosition','allowShiftScrolling','itemRect','_CoreEngineSettings','isRepeated','ExtractStrFromTroop','learnings','ValueJS','battlebacks2','editWindowRect','cancel','LevelUpFullMp','setViewportCoreEngineFix','OptionsMenu','StatusParamsRect','blendFunc','Scene_Title_drawGameTitle','DimColor2','ColorNormal','CategoryRect','TILDE','ARRAYSTRUCT','isClosed','INQUAD','applyEasing','fillStyle','Tilemap_addShadow','top','ButtonHeight','_stored_mpGaugeColor2','updateOpen','DOUBLE_QUOTE','setWindowPadding','_createInternalTextures','globalAlpha','ColorCTGauge1','setupCoreEngine','position','HelpBgType','([\x5c+\x5c-]\x5cd+)([%％])>','updateClose','PixelateImageRendering','NUMPAD1','indexOf','DELETE','smoothSelect','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','systemColor','actorWindowRect','_isWindow','BattleManager_checkSubstitute','smooth','buttonAssistWindowSideRect','usableSkills','INELASTIC','_targetAnchor','expGaugeColor1','initVisuMZCoreEngine','tpGaugeColor1','skillTypes','refresh','isBottomHelpMode','Scene_Base_terminateAnimationClearBugFix','BACK_SLASH','MapOnceParallel','processKeyboardHome','pendingColor','ColorSystem','WIN_OEM_PA1','createPointAnimationSprite','Scene_Status_create','%2%1%3','AnimationPoint','isMaxLevel','command357','mainAreaBottom','_baseSprite','buttonAssistSwitch','F19','originalJS','offsetX','checkSmartEventCollision','_stored_powerUpColor','drawActorSimpleStatus','INOUTBOUNCE','Game_BattlerBase_initMembers','createPointAnimation','playOnceParallelInterpreter','_backgroundFilter','evade','Bitmap_fillRect','buttonAssistOffset1','ItemBgType','_editWindow','_commonEventLayers','buttonAssistKey1','paramWidth','%1%2','TimeProgress','Plus1','_targetX','_width','fillText','defineProperty','boxHeight','ItemRect','Scene_Equip_create','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','duration','CommandBgType','NewGameBoot','INCIRC','Mirror','Rate1','PictureID','REPLACE','BgType','xparam','currentLevelExp','reserveNewGameCommonEvent','INOUTQUAD','Layer','OPEN_BRACKET','ColorMaxLvGauge1','value','processTimingData','anchorCoreEasing','escape','Window_StatusBase_drawActorSimpleStatus','altKey','scale','createCustomParameter','\x5c}❪SHIFT❫\x5c{','IconSParam4','PAUSE','snapForBackground','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','guardSkillId','MCR','missed','IconSParam6','Sprite_Animation_setViewport','keyboard','_helpWindow','MRF','openingSpeed','Subtitle','_origin','tileWidth','createPointAnimationQueue','buttonAssistKey4','_stored_normalColor','_internalTextures','_height','buttonAssistOffset2','Scene_Battle_createCancelButton','Version','maxCols','dummyWindowRect','isTouchedInsideFrame','_hideButtons','ScaleY','LINEAR','GameEnd','SLEEP','index','level','_slotWindow','COMMA','RequireFocus','exportAllTroopStrings','Bitmap_resize','drawGameVersion','_realScale','WIN_OEM_BACKTAB','Bitmap_drawTextOutline','ExportAllMapText','isEnemy','itemLineRect','setColorTone','padZero','ExportString','setCommonEvent','process_VisuMZ_CoreEngine_jsQuickFunctions','ENTER','Power','show','_digitGroupingEx','CustomParamAbb','isSceneBattle','characters','isPhysical','ParseEnemyNotetags','_targetY','createDigits','select','isItem','gainItem','join','create','Window_NameInput_cursorPageup','processKeyboardDigitChange','_drawTextShadow','deathColor','mapId','MRG','retrievePointAnimation','HELP','INOUTCIRC','_onKeyDown','stop','useDigitGrouping','Game_Character_processMoveCommand','BattleSystem','MDF','VisuMZ_2_BattleSystemPTB','NUM','setEasingType','BgFilename1','anchor','INOUTSINE','PLAY','QUOTE','calcEasing','contents','imageSmoothingEnabled','OUTQUINT','IconXParam9','_screenY','drawFace','updateAnchor','Type','pressed','helpAreaTop','sparamPlus1','_pageupButton','_pictureContainer','MainMenu','retrieveFauxAnimation','Bitmap_blt','_cancelButton','_forcedTroopView','bgm','ExportStrFromAllTroops','0.00','ProfileRect','IconSParam7','Bitmap_measureTextWidth','DigitGroupingGaugeSprites','removeChild','ButtonAssist','_cacheScaleX','makeCommandList','PictureEraseAll','CNT','randomJS','Game_Picture_calcEasing','IconSParam2','_targetOffsetX','Input_shouldPreventDefault','_baseTexture','FontShadows','subject','1362FtNrIX','Game_Interpreter_updateWaitMode','split','drawGauge','filterArea','requestMotion','7OYMpak','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','Window_Base_drawFace','xparamFlatJS','META','outlineColor','isDying','Input_clear','_battlerName','_addShadow','down','RevertPreserveNumbers','startMove','backspace','drawParamName','(\x5cd+)>','getButtonAssistLocation','updatePictureAntiZoom','initMembersCoreEngine','_closing','ColorTPGauge2','up2','createBuffer','offsetY','RepositionEnemies','xparamRateJS','item','helpAreaBottom','CustomParamType','OUTQUAD','rgba(0,\x200,\x200,\x200.7)','Window_NameInput_cursorLeft','RPGMAKER_VERSION','paramName','height','traitObjects','_mapNameWindow','FDR','WIN_OEM_PA2','GoldOverlap','_isButtonHidden','initDigitGrouping','createFauxAnimationSprite','_cache','ACCEPT','OTB','clamp','playTestCtrlT','_movementWholeDuration','log','backOpacity','goldWindowRect','innerHeight','param','lineHeight','FontWidthFix','transform','note','Control\x20Variables\x20Script\x20Error','ShowDevTools','alwaysDash','IconXParam5','_listWindow','ColorExpGauge2','TextStr','ItemPadding','Location','rightArrowWidth','Scene_Map_initialize','updatePositionCoreEngine','OUTEXPO','Basic','Scene_Item_create','_storedMapText','isNumpadPressed','clearCachedKeys','》Comment《\x0a%1\x0a','makeDocumentTitle','LESS_THAN','_spriteset','_stored_deathColor','wait','_centerElement','itemHitImprovedAccuracy','OUTCUBIC','initMembers','optionsWindowRect','sparamPlusJS','sparamRate1','blockWidth','Window_ShopSell_isEnabled','IconParam1','SceneManager_onKeyDown','AGI','Mute','outbounce','textColor','textSizeEx','calcCoreEasing','Symbol','Scene_Skill_create','menu','HIT','XParamVocab2','process_VisuMZ_CoreEngine_Functions','itemEva','drawParamText','F21','option','%1〘Choice\x20Cancel〙%1','home','KeyTAB','processSoundTimings','Window_EquipItem_isEnabled','consumeItem','isCancelled','NameMenu','setTargetAnchor','GoldBgType','optSideView','_inputSpecialKeyCode','makeFontSmaller','_pagedownButton','MDR','setBattleSystem','onload','CommandList','ZOOM','INOUTQUART','OUTCIRC','Input_onKeyDown','loadMapData','applyCoreEasing','setup','max','code','WIN_OEM_ATTN','_opening','keyMapper','_coreEngineShakeStyle','gaugeHeight','_numberWindow','Game_Picture_y','checkCacheKey','getColor','Game_Picture_move','BTestItems','refreshDimmerBitmap','_onKeyPress','titles2','MAX_GL_TEXTURES','IconXParam0','isGamepadConnected','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','KeyUnlisted','isNextScene','ItemBackColor1','createDimmerSprite','ActorMPColor','PRINT','SParamVocab2','UpdatePictureCoordinates','_smooth','TitlePicButtons','xparamFlatBonus','isFullDocumentTitle','IconParam6','updateShadow','targetBackOpacity','includes','BackOpacity','Window_Base_initialize','_buyWindow','VisuMZ_2_BattleSystemSTB','PDR','equips','text','statusEquipWindowRect','WindowLayer_render','Keyboard','gameTitle','atbActive','getGamepads','command355','BTestAddedQuantity','pow','clearForcedGameTroopSettingsCoreEngine','ParseTilesetNotetags','toLowerCase','_number','setMoveEasingType','buttonAssistText2','_stored_pendingColor','Sprite_Gauge_currentValue','ColorDeath','hide','〘Show\x20Text〙\x0a','WIN_OEM_ENLW','Smooth','SceneManager_initialize','_mode','INQUART','_effectsContainer','trim','ModernControls','menuShowButton','inbounce','buyWindowRect','nah','NUMPAD8','loadTitle1','ColSpacing','processCursorMove','_makeFontNameText','sceneTerminationClearEffects','HANJA','targetScaleY','getBattleSystem','ARRAYFUNC','paramBaseAboveLevel99','_pictureCoordinatesMode','openness','drawCurrencyValue','SParamVocab5','catchNormalError','string','_maxDigits','ZERO','isSpecialCode','ExtDisplayedParams','sv_actors','Scene_Boot_onDatabaseLoaded','Spriteset_Base_isAnimationPlaying','animationNextDelay','\x20Origin:\x20%1','ExportCurMapText','isPlaying','KeyItemProtect','nickname','ExtJS','Graphics_printError','animationBaseDelay','NumberRect','INOUTCUBIC','_pictureCoordinatesWindow','ShowJS','_stored_maxLvGaugeColor2','targetEvaRate','bind','NUMPAD9','processTouchModernControls','pictures','CLOSE_CURLY_BRACKET','cursorLeft','updatePictureCoordinates','fontSize','IconSParam9','itemBackColor1','INBACK','buttonAssistOffset%1','_stored_tpGaugeColor1','_balloonQueue','platform','adjustSprite','IconXParam7','F20','easingType','updateMove','drawRightArrow','updatePositionCoreEngineShakeOriginal','Scene_Map_createMenuButton','measureText','textHeight','_stored_tpCostColor','Script\x20Call\x20Error','DimColor1','Game_Event_isCollidedWithEvents','sparamPlus','PTB','process_VisuMZ_CoreEngine_Notetags','SystemLoadAudio','Center','processTouch','REC','Window_NameInput_cursorRight','AccuracyBoost','name','_margin','_opacity','_skillTypeWindow','EQUALS','ParseActorNotetags','processAlwaysEscape','updatePadding','_inputWindow','ParseSkillNotetags','RegExp','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','ParamName','Sprite_Picture_updateOrigin','uiAreaWidth','get','moveMenuButtonSideButtonLayout','padding','Window_NameInput_refresh','paramValueByName','_optionsWindow','adjustPictureAntiZoom','backgroundBitmap','_actorWindow','filters','Window_NumberInput_start','Scene_MenuBase_mainAreaTop','Window_NameInput_initialize','XParamVocab3','_mp','paramBase','apply','sv_enemies','setActorHome','XParamVocab5','ATK','isMaskingEnabled','GRD','ItemHeight','loadSystemImages','Window_NameInput_cursorPagedown','SCROLL_LOCK','length','CRI','writeFile','processKeyboardHandling','AnimationMirrorOffset','LUK','playCancel','makeDeepCopy','animationId','Input_setupEventHandlers','_pointAnimationQueue','loadBitmap','showPicture','StatusBgType','storeMapData','setSkill','F14','_hovered','OkText','_targetScaleX','inputWindowRect','clear','_forcedBattleSys','_shakeDuration','WIN_ICO_CLEAR','faces','ALWAYS','Scene_Battle_createSpriteset','ColorMPGauge1','itemPadding','_fauxAnimationSprites','horizontal','SellBgType','drawBackgroundRect','NUMPAD0','enableDigitGroupingEx','XParameterFormula','ctGaugeColor2','endAnimation','child_process','windowOpacity','Window_Base_update','_buttonType','IconXParam3','Padding','processKeyboardDelete','gainGold','INEXPO','ColorPowerUp','application/json','initBasic','round','mmp','_active','isMVAnimation','Game_Actor_paramBase','_backgroundSprite','hideButtonFromView','_commandList','NumberBgType','stypeId','PRINTSCREEN','Scene_Name_onInputOk','style','CRSEL','_mainSprite','flush','EISU','registerCommand','onDatabaseLoaded','centerSprite','_upArrowSprite','paramchangeTextColor','EXSEL','mute','buttonAssistKey%1','_index','Window_NameInput_processHandling','_movementDuration','WIN_OEM_FINISH','isSideView','drawAllParams','attackSkillId','targetOpacity','Game_Picture_initBasic','_statusEquipWindow','_targetOpacity','buttonAssistOffset5','Y:\x20%1','IconXParam8','title','INOUTBACK','currentClass','1197044kwvAGe','_backSprite','Gold','BottomHelp','gaugeRate','process_VisuMZ_CoreEngine_CustomParameters','BoxMargin','currentValue','MAXMP','Troop%1','markCoreEngineModified','repositionCancelButtonSideButtonLayout','sparamFlatJS','WIN_OEM_FJ_ROYA','keyCode','win32','paramRateJS','SELECT','members','SParamVocab6','PositionY','targetX','mainFontSize','Total','onKeyDownKeysF6F7','Game_Interpreter_command122','boxWidth','version','cursorRight','_shouldPreventDefault','OUTBACK','paramRate','currentExp','buttons','SParamVocab0','ActorTPColor','Upper\x20Left','setCoreEngineScreenShakeStyle','Sprite_AnimationMV_processTimingData','WIN_OEM_FJ_TOUROKU','drawGoldItemStyle','_profileWindow','BTestWeapons','seVolume','PositionX','measureTextWidthNoRounding','maxLevel','format','setCoreEngineUpdateWindowBg','traitsPi','STRUCT','playCursorSound','TRG','_encounterCount','horzJS','xparamPlus2','playMiss','buttonAssistOffset3','_stored_ctGaugeColor1','mev','battlebacks1','Game_Action_setAttack','match','children','EVA','INOUTEXPO','toLocaleString','alpha','WIN_ICO_00','LoadError','Scene_Map_updateMainMultiply','IconSParam1','_scene','CommonEventID','default','HRG','drawIconBySize','processMoveCommand','OUTBOUNCE','movePageButtonSideButtonLayout','_windowLayer','connected','ApplyEasing','_colorCache','isRightInputMode','MenuLayout','_lastY','gaugeLineHeight','iconHeight','expGaugeColor2','drawItem','Spriteset_Battle_createEnemies','sparamFlat1','_tempActor','itemHeight','Plus2','PLUS','isPlaytest','XParamVocab0','OUTSINE','loadPicture','IconParam5','loadWindowskin','enemies','CONVERT','ParseStateNotetags','updateCoreEasing','drawText','_list','_screenX','Exported_Script_%1.txt','cursorDown','IconSet','processFauxAnimationRequests','IDs','IconSParam5','setAttack'];_0x4e21=function(){return _0x5ed4b9;};return _0x4e21();}VisuMZ['CoreEngine'][_0x5f3bde(0x5e9)]=Window_ShopSell[_0x5f3bde(0x371)]['isEnabled'],Window_ShopSell[_0x5f3bde(0x371)][_0x5f3bde(0x2b8)]=function(_0x1eaac5){const _0x608deb=_0x5f3bde;return VisuMZ[_0x608deb(0x23a)][_0x608deb(0x22e)][_0x608deb(0x338)]['KeyItemProtect']&&DataManager[_0x608deb(0x2bf)](_0x1eaac5)?![]:VisuMZ[_0x608deb(0x23a)]['Window_ShopSell_isEnabled']['call'](this,_0x1eaac5);},Window_NumberInput[_0x5f3bde(0x371)][_0x5f3bde(0x248)]=function(){return![];};VisuMZ['CoreEngine'][_0x5f3bde(0x22e)]['KeyboardInput']['EnableNumberInput']&&(VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6c6)]=Window_NumberInput[_0x5f3bde(0x371)]['start'],Window_NumberInput[_0x5f3bde(0x371)]['start']=function(){const _0x377649=_0x5f3bde;VisuMZ[_0x377649(0x23a)][_0x377649(0x6c6)][_0x377649(0x1f0)](this),this[_0x377649(0x545)](this['_maxDigits']-0x1),Input[_0x377649(0x6ec)]();},VisuMZ[_0x5f3bde(0x23a)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x5f3bde(0x371)][_0x5f3bde(0x7f0)],Window_NumberInput[_0x5f3bde(0x371)][_0x5f3bde(0x7f0)]=function(){const _0x21bf0e=_0x5f3bde;if(!this[_0x21bf0e(0x394)]())return;if(Input[_0x21bf0e(0x5d9)]())this[_0x21bf0e(0x54b)]();else{if(Input[_0x21bf0e(0x673)](_0x21bf0e(0x59c)))this[_0x21bf0e(0x40f)]();else{if(Input[_0x21bf0e(0x607)]===0x2e)this[_0x21bf0e(0x704)]();else{if(Input['_inputSpecialKeyCode']===0x24)this[_0x21bf0e(0x4c3)]();else Input[_0x21bf0e(0x607)]===0x23?this['processKeyboardEnd']():VisuMZ[_0x21bf0e(0x23a)][_0x21bf0e(0x260)][_0x21bf0e(0x1f0)](this);}}}},Window_NumberInput[_0x5f3bde(0x371)][_0x5f3bde(0x663)]=function(){const _0x468a26=_0x5f3bde;if(!this[_0x468a26(0x411)]())return;Input[_0x468a26(0x5d9)]()?this[_0x468a26(0x54b)]():Window_Selectable[_0x468a26(0x371)][_0x468a26(0x663)][_0x468a26(0x1f0)](this);},Window_NumberInput[_0x5f3bde(0x371)][_0x5f3bde(0x7af)]=function(){},Window_NumberInput[_0x5f3bde(0x371)]['processKeyboardDigitChange']=function(){const _0x37f308=_0x5f3bde;if(String(this[_0x37f308(0x64c)])[_0x37f308(0x6d7)]>=this[_0x37f308(0x671)])return;const _0x3a23ad=Number(String(this[_0x37f308(0x64c)])+Input['_inputString']);if(isNaN(_0x3a23ad))return;this[_0x37f308(0x64c)]=_0x3a23ad;const _0x1a7f96='9'[_0x37f308(0x37e)](this[_0x37f308(0x671)]);this['_number']=this[_0x37f308(0x64c)]['clamp'](0x0,_0x1a7f96),Input[_0x37f308(0x6ec)](),this[_0x37f308(0x4be)](),SoundManager[_0x37f308(0x401)](),this['select'](this[_0x37f308(0x671)]-0x1);},Window_NumberInput[_0x5f3bde(0x371)][_0x5f3bde(0x40f)]=function(){const _0x581a6f=_0x5f3bde;this[_0x581a6f(0x64c)]=Number(String(this[_0x581a6f(0x64c)])['slice'](0x0,-0x1)),this['_number']=Math[_0x581a6f(0x615)](0x0,this[_0x581a6f(0x64c)]),Input['clear'](),this[_0x581a6f(0x4be)](),SoundManager[_0x581a6f(0x401)](),this[_0x581a6f(0x545)](this['_maxDigits']-0x1);},Window_NumberInput[_0x5f3bde(0x371)][_0x5f3bde(0x704)]=function(){const _0x51d061=_0x5f3bde;this['_number']=Number(String(this[_0x51d061(0x64c)])['substring'](0x1)),this[_0x51d061(0x64c)]=Math[_0x51d061(0x615)](0x0,this['_number']),Input['clear'](),this[_0x51d061(0x4be)](),SoundManager[_0x51d061(0x401)](),this[_0x51d061(0x545)](this['_maxDigits']-0x1);});;Window_TitleCommand[_0x5f3bde(0x711)]=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x27d)],Window_TitleCommand[_0x5f3bde(0x371)][_0x5f3bde(0x57e)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x5f3bde(0x371)][_0x5f3bde(0x413)]=function(){const _0x34a65c=_0x5f3bde;for(const _0x5e7671 of Window_TitleCommand[_0x34a65c(0x711)]){if(_0x5e7671[_0x34a65c(0x684)][_0x34a65c(0x1f0)](this)){const _0x4e621b=_0x5e7671[_0x34a65c(0x5f2)];let _0x4f1274=_0x5e7671[_0x34a65c(0x5cf)];if(['',_0x34a65c(0x33d)][_0x34a65c(0x638)](_0x4f1274))_0x4f1274=_0x5e7671['TextJS']['call'](this);const _0x4664a7=_0x5e7671['EnableJS'][_0x34a65c(0x1f0)](this),_0x471f3a=_0x5e7671['ExtJS'][_0x34a65c(0x1f0)](this);this[_0x34a65c(0x1d3)](_0x4f1274,_0x4e621b,_0x4664a7,_0x471f3a),this[_0x34a65c(0x2af)](_0x4e621b,_0x5e7671[_0x34a65c(0x7cd)][_0x34a65c(0x687)](this,_0x471f3a));}}},Window_GameEnd['_commandList']=VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x22e)][_0x5f3bde(0x789)]['GameEnd'][_0x5f3bde(0x60d)],Window_GameEnd[_0x5f3bde(0x371)][_0x5f3bde(0x57e)]=function(){const _0x3449aa=_0x5f3bde;this[_0x3449aa(0x413)]();},Window_GameEnd[_0x5f3bde(0x371)]['makeCoreEngineCommandList']=function(){const _0x5e15e5=_0x5f3bde;for(const _0x5300b0 of Window_GameEnd[_0x5e15e5(0x711)]){if(_0x5300b0[_0x5e15e5(0x684)][_0x5e15e5(0x1f0)](this)){const _0x423009=_0x5300b0['Symbol'];let _0x11a323=_0x5300b0['TextStr'];if(['',_0x5e15e5(0x33d)][_0x5e15e5(0x638)](_0x11a323))_0x11a323=_0x5300b0['TextJS']['call'](this);const _0x305cab=_0x5300b0[_0x5e15e5(0x228)][_0x5e15e5(0x1f0)](this),_0x23ea44=_0x5300b0[_0x5e15e5(0x67e)][_0x5e15e5(0x1f0)](this);this[_0x5e15e5(0x1d3)](_0x11a323,_0x423009,_0x305cab,_0x23ea44),this['setHandler'](_0x423009,_0x5300b0[_0x5e15e5(0x7cd)][_0x5e15e5(0x687)](this,_0x23ea44));}}};function Window_ButtonAssist(){const _0x52ff95=_0x5f3bde;this[_0x52ff95(0x301)](...arguments);}Window_ButtonAssist[_0x5f3bde(0x371)]=Object[_0x5f3bde(0x549)](Window_Base['prototype']),Window_ButtonAssist[_0x5f3bde(0x371)][_0x5f3bde(0x7ff)]=Window_ButtonAssist,Window_ButtonAssist[_0x5f3bde(0x371)][_0x5f3bde(0x301)]=function(_0x231576){const _0x57ff3f=_0x5f3bde;this['_data']={},Window_Base[_0x57ff3f(0x371)][_0x57ff3f(0x301)][_0x57ff3f(0x1f0)](this,_0x231576),this['setBackgroundType'](VisuMZ[_0x57ff3f(0x23a)][_0x57ff3f(0x22e)][_0x57ff3f(0x57c)][_0x57ff3f(0x4f6)]||0x0),this[_0x57ff3f(0x4be)]();},Window_ButtonAssist[_0x5f3bde(0x371)]['makeFontBigger']=function(){const _0x12e71a=_0x5f3bde;this['contents'][_0x12e71a(0x68e)]<=0x60&&(this[_0x12e71a(0x562)][_0x12e71a(0x68e)]+=0x6);},Window_ButtonAssist[_0x5f3bde(0x371)][_0x5f3bde(0x608)]=function(){const _0x3f4369=_0x5f3bde;this[_0x3f4369(0x562)][_0x3f4369(0x68e)]>=0x18&&(this[_0x3f4369(0x562)][_0x3f4369(0x68e)]-=0x6);},Window_ButtonAssist[_0x5f3bde(0x371)]['update']=function(){const _0x1f8d9a=_0x5f3bde;Window_Base[_0x1f8d9a(0x371)][_0x1f8d9a(0x816)][_0x1f8d9a(0x1f0)](this),this['updateKeyText']();},Window_ButtonAssist[_0x5f3bde(0x371)][_0x5f3bde(0x6b4)]=function(){const _0x18e692=_0x5f3bde;this[_0x18e692(0x6be)]=SceneManager['_scene'][_0x18e692(0x59f)]()!==_0x18e692(0x350)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x5f3bde(0x3cf)]=function(){const _0x3dbe18=_0x5f3bde,_0x1dad15=SceneManager['_scene'];for(let _0x276aae=0x1;_0x276aae<=0x5;_0x276aae++){if(this['_data'][_0x3dbe18(0x7ca)[_0x3dbe18(0x763)](_0x276aae)]!==_0x1dad15[_0x3dbe18(0x722)[_0x3dbe18(0x763)](_0x276aae)]())return this[_0x3dbe18(0x4be)]();if(this[_0x3dbe18(0x346)]['text%1'[_0x3dbe18(0x763)](_0x276aae)]!==_0x1dad15[_0x3dbe18(0x3a9)[_0x3dbe18(0x763)](_0x276aae)]())return this[_0x3dbe18(0x4be)]();}},Window_ButtonAssist[_0x5f3bde(0x371)][_0x5f3bde(0x4be)]=function(){const _0x458689=_0x5f3bde;this[_0x458689(0x562)]['clear']();for(let _0x2ad57a=0x1;_0x2ad57a<=0x5;_0x2ad57a++){this[_0x458689(0x294)](_0x2ad57a);}},Window_ButtonAssist[_0x5f3bde(0x371)][_0x5f3bde(0x294)]=function(_0x31a0e6){const _0x4adc5a=_0x5f3bde,_0x1448b5=this[_0x4adc5a(0x292)]/0x5,_0x2e0c02=SceneManager['_scene'],_0x1d6fec=_0x2e0c02[_0x4adc5a(0x722)[_0x4adc5a(0x763)](_0x31a0e6)](),_0x265d88=_0x2e0c02[_0x4adc5a(0x3a9)[_0x4adc5a(0x763)](_0x31a0e6)]();this['_data'][_0x4adc5a(0x7ca)['format'](_0x31a0e6)]=_0x1d6fec,this[_0x4adc5a(0x346)][_0x4adc5a(0x1bd)['format'](_0x31a0e6)]=_0x265d88;if(_0x1d6fec==='')return;if(_0x265d88==='')return;const _0x4a6e70=_0x2e0c02[_0x4adc5a(0x692)['format'](_0x31a0e6)](),_0x55b182=this[_0x4adc5a(0x6f4)](),_0x358aa1=_0x1448b5*(_0x31a0e6-0x1)+_0x55b182+_0x4a6e70,_0x53d2f2=VisuMZ[_0x4adc5a(0x23a)][_0x4adc5a(0x22e)][_0x4adc5a(0x57c)]['TextFmt'];this[_0x4adc5a(0x1e6)](_0x53d2f2['format'](_0x1d6fec,_0x265d88),_0x358aa1,0x0,_0x1448b5-_0x55b182*0x2);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x58a)]=Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x463)],Game_Interpreter[_0x5f3bde(0x371)][_0x5f3bde(0x463)]=function(){const _0x21bc85=_0x5f3bde;if($gameTemp[_0x21bc85(0x66b)]!==undefined)return VisuMZ[_0x21bc85(0x23a)][_0x21bc85(0x630)]();return VisuMZ[_0x21bc85(0x23a)][_0x21bc85(0x58a)]['call'](this);},VisuMZ['CoreEngine'][_0x5f3bde(0x630)]=function(){const _0x4edb01=_0x5f3bde,_0x5a8b37=$gameTemp[_0x4edb01(0x66b)]||0x0;(_0x5a8b37<0x0||_0x5a8b37>0x64||TouchInput[_0x4edb01(0x602)]()||Input[_0x4edb01(0x36a)](_0x4edb01(0x48c)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x4edb01(0x6ec)](),TouchInput[_0x4edb01(0x6ec)]());const _0x4227b6=$gameScreen['picture'](_0x5a8b37);return _0x4227b6&&(_0x4227b6['_x']=TouchInput['_x'],_0x4227b6['_y']=TouchInput['_y']),VisuMZ[_0x4edb01(0x23a)][_0x4edb01(0x68d)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ['CoreEngine']['updatePictureCoordinates']=function(){const _0x2b4585=_0x5f3bde,_0x48beee=SceneManager[_0x2b4585(0x77c)];if(!_0x48beee)return;!_0x48beee[_0x2b4585(0x683)]&&(SoundManager[_0x2b4585(0x80a)](),_0x48beee[_0x2b4585(0x683)]=new Window_PictureCoordinates(),_0x48beee['addChild'](_0x48beee[_0x2b4585(0x683)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x2b4585(0x6dd)](),_0x48beee[_0x2b4585(0x57b)](_0x48beee[_0x2b4585(0x683)]),_0x48beee['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){const _0x33b648=_0x5f3bde;this[_0x33b648(0x301)](...arguments);}Window_PictureCoordinates[_0x5f3bde(0x371)]=Object[_0x5f3bde(0x549)](Window_Base[_0x5f3bde(0x371)]),Window_PictureCoordinates[_0x5f3bde(0x371)][_0x5f3bde(0x7ff)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x5f3bde(0x371)]['initialize']=function(){const _0x2754ee=_0x5f3bde;this['_lastOrigin']='nah',this['_lastX']=_0x2754ee(0x65f),this['_lastY']='nah';const _0x427b60=this[_0x2754ee(0x2f4)]();Window_Base['prototype'][_0x2754ee(0x301)][_0x2754ee(0x1f0)](this,_0x427b60),this[_0x2754ee(0x3d8)](0x2);},Window_PictureCoordinates[_0x5f3bde(0x371)][_0x5f3bde(0x2f4)]=function(){const _0x44617a=_0x5f3bde;let _0x56b1c6=0x0,_0x47f3b2=Graphics[_0x44617a(0x5b1)]-this[_0x44617a(0x5c5)](),_0x2de5e3=Graphics[_0x44617a(0x431)],_0x4a48d0=this[_0x44617a(0x5c5)]();return new Rectangle(_0x56b1c6,_0x47f3b2,_0x2de5e3,_0x4a48d0);},Window_PictureCoordinates['prototype'][_0x5f3bde(0x6b4)]=function(){const _0x57c194=_0x5f3bde;this[_0x57c194(0x6be)]=0x0;},Window_PictureCoordinates[_0x5f3bde(0x371)][_0x5f3bde(0x816)]=function(){const _0x3a1060=_0x5f3bde;Window_Base['prototype'][_0x3a1060(0x816)][_0x3a1060(0x1f0)](this),this[_0x3a1060(0x28e)]();},Window_PictureCoordinates[_0x5f3bde(0x371)][_0x5f3bde(0x28e)]=function(){const _0x103ce6=_0x5f3bde;if(!this[_0x103ce6(0x3e1)]())return;this[_0x103ce6(0x4be)]();},Window_PictureCoordinates['prototype']['needsUpdate']=function(){const _0x31333a=_0x5f3bde,_0xc6ba4c=$gameTemp[_0x31333a(0x66b)],_0x3422bb=$gameScreen[_0x31333a(0x367)](_0xc6ba4c);return _0x3422bb?this[_0x31333a(0x470)]!==_0x3422bb[_0x31333a(0x515)]||this[_0x31333a(0x280)]!==_0x3422bb['_x']||this['_lastY']!==_0x3422bb['_y']:![];},Window_PictureCoordinates[_0x5f3bde(0x371)]['refresh']=function(){const _0x547e47=_0x5f3bde;this['contents']['clear']();const _0xc406a3=$gameTemp[_0x547e47(0x66b)],_0x22ef17=$gameScreen['picture'](_0xc406a3);if(!_0x22ef17)return;this[_0x547e47(0x470)]=_0x22ef17['_origin'],this[_0x547e47(0x280)]=_0x22ef17['_x'],this[_0x547e47(0x78a)]=_0x22ef17['_y'];const _0x4afd37=ColorManager[_0x547e47(0x690)]();this[_0x547e47(0x562)][_0x547e47(0x232)](0x0,0x0,this[_0x547e47(0x292)],this[_0x547e47(0x5c3)],_0x4afd37);const _0x1bb608=_0x547e47(0x679)[_0x547e47(0x763)](_0x22ef17[_0x547e47(0x515)]===0x0?_0x547e47(0x758):_0x547e47(0x6a8)),_0x3aadd7='X:\x20%1'[_0x547e47(0x763)](_0x22ef17['_x']),_0x282264=_0x547e47(0x72f)['format'](_0x22ef17['_y']),_0x3b8a76=_0x547e47(0x2fa)[_0x547e47(0x763)](TextManager[_0x547e47(0x25a)]('cancel'));let _0x32c428=Math[_0x547e47(0x43f)](this[_0x547e47(0x292)]/0x4);this['drawText'](_0x1bb608,_0x32c428*0x0,0x0,_0x32c428),this['drawText'](_0x3aadd7,_0x32c428*0x1,0x0,_0x32c428,_0x547e47(0x418)),this[_0x547e47(0x79f)](_0x282264,_0x32c428*0x2,0x0,_0x32c428,_0x547e47(0x418));const _0x156659=this[_0x547e47(0x5f0)](_0x3b8a76)[_0x547e47(0x431)],_0x525800=this[_0x547e47(0x292)]-_0x156659;this[_0x547e47(0x1e6)](_0x3b8a76,_0x525800,0x0,_0x156659);},VisuMZ['ShowDevTools']=function(_0x54802c){const _0x4ecf2c=_0x5f3bde;if(Utils['isOptionValid'](_0x4ecf2c(0x7cc))){var _0x22c0c8=require(_0x4ecf2c(0x18e))[_0x4ecf2c(0x410)][_0x4ecf2c(0x6bc)]();SceneManager['showDevTools']();if(_0x54802c)setTimeout(_0x22c0c8['focus'][_0x4ecf2c(0x687)](_0x22c0c8),0x190);}},VisuMZ[_0x5f3bde(0x786)]=function(_0x7be728,_0xa21ec5){const _0xef0e99=_0x5f3bde;_0xa21ec5=_0xa21ec5[_0xef0e99(0x22d)]();var _0x2575b2=1.70158,_0x5c9833=0.7;switch(_0xa21ec5){case _0xef0e99(0x524):return _0x7be728;case _0xef0e99(0x41b):return-0x1*Math['cos'](_0x7be728*(Math['PI']/0x2))+0x1;case _0xef0e99(0x797):return Math[_0xef0e99(0x226)](_0x7be728*(Math['PI']/0x2));case _0xef0e99(0x55e):return-0.5*(Math[_0xef0e99(0x285)](Math['PI']*_0x7be728)-0x1);case _0xef0e99(0x499):return _0x7be728*_0x7be728;case _0xef0e99(0x5ac):return _0x7be728*(0x2-_0x7be728);case _0xef0e99(0x4fa):return _0x7be728<0.5?0x2*_0x7be728*_0x7be728:-0x1+(0x4-0x2*_0x7be728)*_0x7be728;case'INCUBIC':return _0x7be728*_0x7be728*_0x7be728;case _0xef0e99(0x5e3):var _0x3e05ec=_0x7be728-0x1;return _0x3e05ec*_0x3e05ec*_0x3e05ec+0x1;case _0xef0e99(0x682):return _0x7be728<0.5?0x4*_0x7be728*_0x7be728*_0x7be728:(_0x7be728-0x1)*(0x2*_0x7be728-0x2)*(0x2*_0x7be728-0x2)+0x1;case _0xef0e99(0x658):return _0x7be728*_0x7be728*_0x7be728*_0x7be728;case _0xef0e99(0x325):var _0x3e05ec=_0x7be728-0x1;return 0x1-_0x3e05ec*_0x3e05ec*_0x3e05ec*_0x3e05ec;case _0xef0e99(0x60f):var _0x3e05ec=_0x7be728-0x1;return _0x7be728<0.5?0x8*_0x7be728*_0x7be728*_0x7be728*_0x7be728:0x1-0x8*_0x3e05ec*_0x3e05ec*_0x3e05ec*_0x3e05ec;case _0xef0e99(0x345):return _0x7be728*_0x7be728*_0x7be728*_0x7be728*_0x7be728;case _0xef0e99(0x564):var _0x3e05ec=_0x7be728-0x1;return 0x1+_0x3e05ec*_0x3e05ec*_0x3e05ec*_0x3e05ec*_0x3e05ec;case _0xef0e99(0x47c):var _0x3e05ec=_0x7be728-0x1;return _0x7be728<0.5?0x10*_0x7be728*_0x7be728*_0x7be728*_0x7be728*_0x7be728:0x1+0x10*_0x3e05ec*_0x3e05ec*_0x3e05ec*_0x3e05ec*_0x3e05ec;case _0xef0e99(0x706):if(_0x7be728===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x7be728-0x1));case _0xef0e99(0x5d5):if(_0x7be728===0x1)return 0x1;return-Math[_0xef0e99(0x648)](0x2,-0xa*_0x7be728)+0x1;case _0xef0e99(0x775):if(_0x7be728===0x0||_0x7be728===0x1)return _0x7be728;var _0x29f7dd=_0x7be728*0x2,_0x5b845b=_0x29f7dd-0x1;if(_0x29f7dd<0x1)return 0.5*Math['pow'](0x2,0xa*_0x5b845b);return 0.5*(-Math[_0xef0e99(0x648)](0x2,-0xa*_0x5b845b)+0x2);case _0xef0e99(0x4f1):var _0x29f7dd=_0x7be728/0x1;return-0x1*(Math[_0xef0e99(0x414)](0x1-_0x29f7dd*_0x7be728)-0x1);case _0xef0e99(0x610):var _0x3e05ec=_0x7be728-0x1;return Math[_0xef0e99(0x414)](0x1-_0x3e05ec*_0x3e05ec);case _0xef0e99(0x552):var _0x29f7dd=_0x7be728*0x2,_0x5b845b=_0x29f7dd-0x2;if(_0x29f7dd<0x1)return-0.5*(Math['sqrt'](0x1-_0x29f7dd*_0x29f7dd)-0x1);return 0.5*(Math['sqrt'](0x1-_0x5b845b*_0x5b845b)+0x1);case _0xef0e99(0x691):return _0x7be728*_0x7be728*((_0x2575b2+0x1)*_0x7be728-_0x2575b2);case _0xef0e99(0x752):var _0x29f7dd=_0x7be728/0x1-0x1;return _0x29f7dd*_0x29f7dd*((_0x2575b2+0x1)*_0x29f7dd+_0x2575b2)+0x1;break;case _0xef0e99(0x732):var _0x29f7dd=_0x7be728*0x2,_0x47df47=_0x29f7dd-0x2,_0x59cb9b=_0x2575b2*1.525;if(_0x29f7dd<0x1)return 0.5*_0x29f7dd*_0x29f7dd*((_0x59cb9b+0x1)*_0x29f7dd-_0x59cb9b);return 0.5*(_0x47df47*_0x47df47*((_0x59cb9b+0x1)*_0x47df47+_0x59cb9b)+0x2);case _0xef0e99(0x4b8):if(_0x7be728===0x0||_0x7be728===0x1)return _0x7be728;var _0x29f7dd=_0x7be728/0x1,_0x5b845b=_0x29f7dd-0x1,_0x20de09=0x1-_0x5c9833,_0x59cb9b=_0x20de09/(0x2*Math['PI'])*Math[_0xef0e99(0x24a)](0x1);return-(Math[_0xef0e99(0x648)](0x2,0xa*_0x5b845b)*Math[_0xef0e99(0x226)]((_0x5b845b-_0x59cb9b)*(0x2*Math['PI'])/_0x20de09));case _0xef0e99(0x36f):var _0x20de09=0x1-_0x5c9833,_0x29f7dd=_0x7be728*0x2;if(_0x7be728===0x0||_0x7be728===0x1)return _0x7be728;var _0x59cb9b=_0x20de09/(0x2*Math['PI'])*Math[_0xef0e99(0x24a)](0x1);return Math[_0xef0e99(0x648)](0x2,-0xa*_0x29f7dd)*Math['sin']((_0x29f7dd-_0x59cb9b)*(0x2*Math['PI'])/_0x20de09)+0x1;case'INOUTELASTIC':var _0x20de09=0x1-_0x5c9833;if(_0x7be728===0x0||_0x7be728===0x1)return _0x7be728;var _0x29f7dd=_0x7be728*0x2,_0x5b845b=_0x29f7dd-0x1,_0x59cb9b=_0x20de09/(0x2*Math['PI'])*Math[_0xef0e99(0x24a)](0x1);if(_0x29f7dd<0x1)return-0.5*(Math[_0xef0e99(0x648)](0x2,0xa*_0x5b845b)*Math[_0xef0e99(0x226)]((_0x5b845b-_0x59cb9b)*(0x2*Math['PI'])/_0x20de09));return Math['pow'](0x2,-0xa*_0x5b845b)*Math[_0xef0e99(0x226)]((_0x5b845b-_0x59cb9b)*(0x2*Math['PI'])/_0x20de09)*0.5+0x1;case _0xef0e99(0x782):var _0x29f7dd=_0x7be728/0x1;if(_0x29f7dd<0x1/2.75)return 7.5625*_0x29f7dd*_0x29f7dd;else{if(_0x29f7dd<0x2/2.75){var _0x47df47=_0x29f7dd-1.5/2.75;return 7.5625*_0x47df47*_0x47df47+0.75;}else{if(_0x29f7dd<2.5/2.75){var _0x47df47=_0x29f7dd-2.25/2.75;return 7.5625*_0x47df47*_0x47df47+0.9375;}else{var _0x47df47=_0x29f7dd-2.625/2.75;return 7.5625*_0x47df47*_0x47df47+0.984375;}}}case _0xef0e99(0x412):var _0x3c58fd=0x1-VisuMZ['ApplyEasing'](0x1-_0x7be728,_0xef0e99(0x5ee));return _0x3c58fd;case _0xef0e99(0x4d6):if(_0x7be728<0.5)var _0x3c58fd=VisuMZ[_0xef0e99(0x786)](_0x7be728*0x2,_0xef0e99(0x65d))*0.5;else var _0x3c58fd=VisuMZ[_0xef0e99(0x786)](_0x7be728*0x2-0x1,_0xef0e99(0x5ee))*0.5+0.5;return _0x3c58fd;default:return _0x7be728;}},VisuMZ[_0x5f3bde(0x38b)]=function(_0x3087ea){const _0x10e2a2=_0x5f3bde;_0x3087ea=String(_0x3087ea)[_0x10e2a2(0x22d)]();const _0x148fda=VisuMZ[_0x10e2a2(0x23a)][_0x10e2a2(0x22e)][_0x10e2a2(0x275)];if(_0x3087ea===_0x10e2a2(0x3ea))return _0x148fda[_0x10e2a2(0x3a6)];if(_0x3087ea===_0x10e2a2(0x73c))return _0x148fda[_0x10e2a2(0x5ea)];if(_0x3087ea===_0x10e2a2(0x6d0))return _0x148fda['IconParam2'];if(_0x3087ea==='DEF')return _0x148fda[_0x10e2a2(0x2b9)];if(_0x3087ea===_0x10e2a2(0x357))return _0x148fda[_0x10e2a2(0x41a)];if(_0x3087ea===_0x10e2a2(0x558))return _0x148fda[_0x10e2a2(0x799)];if(_0x3087ea===_0x10e2a2(0x5ec))return _0x148fda[_0x10e2a2(0x635)];if(_0x3087ea==='LUK')return _0x148fda[_0x10e2a2(0x39a)];if(_0x3087ea==='HIT')return _0x148fda[_0x10e2a2(0x626)];if(_0x3087ea===_0x10e2a2(0x774))return _0x148fda[_0x10e2a2(0x3cd)];if(_0x3087ea==='CRI')return _0x148fda['IconXParam2'];if(_0x3087ea===_0x10e2a2(0x18d))return _0x148fda[_0x10e2a2(0x702)];if(_0x3087ea===_0x10e2a2(0x409))return _0x148fda['IconXParam4'];if(_0x3087ea===_0x10e2a2(0x512))return _0x148fda[_0x10e2a2(0x5cc)];if(_0x3087ea===_0x10e2a2(0x580))return _0x148fda['IconXParam6'];if(_0x3087ea===_0x10e2a2(0x77f))return _0x148fda[_0x10e2a2(0x697)];if(_0x3087ea===_0x10e2a2(0x54f))return _0x148fda[_0x10e2a2(0x730)];if(_0x3087ea===_0x10e2a2(0x768))return _0x148fda[_0x10e2a2(0x565)];if(_0x3087ea===_0x10e2a2(0x82f))return _0x148fda['IconSParam0'];if(_0x3087ea===_0x10e2a2(0x6d2))return _0x148fda[_0x10e2a2(0x77b)];if(_0x3087ea===_0x10e2a2(0x6aa))return _0x148fda[_0x10e2a2(0x583)];if(_0x3087ea===_0x10e2a2(0x469))return _0x148fda['IconSParam3'];if(_0x3087ea===_0x10e2a2(0x50c))return _0x148fda[_0x10e2a2(0x507)];if(_0x3087ea===_0x10e2a2(0x368))return _0x148fda[_0x10e2a2(0x7a7)];if(_0x3087ea==='PDR')return _0x148fda[_0x10e2a2(0x50e)];if(_0x3087ea===_0x10e2a2(0x60a))return _0x148fda[_0x10e2a2(0x578)];if(_0x3087ea===_0x10e2a2(0x5b4))return _0x148fda['IconSParam8'];if(_0x3087ea===_0x10e2a2(0x30b))return _0x148fda[_0x10e2a2(0x68f)];if(VisuMZ[_0x10e2a2(0x23a)]['CustomParamIcons'][_0x3087ea])return VisuMZ[_0x10e2a2(0x23a)]['CustomParamIcons'][_0x3087ea]||0x0;return 0x0;},VisuMZ[_0x5f3bde(0x818)]=function(_0x2d75c6,_0x37fda9,_0xa32814){const _0x2bdd21=_0x5f3bde;if(_0xa32814===undefined&&_0x2d75c6%0x1===0x0)return _0x2d75c6;if(_0xa32814!==undefined&&['MAXHP',_0x2bdd21(0x73c),_0x2bdd21(0x6d0),'DEF',_0x2bdd21(0x357),'MDF',_0x2bdd21(0x5ec),'LUK'][_0x2bdd21(0x638)](String(_0xa32814)[_0x2bdd21(0x22d)]()[_0x2bdd21(0x65a)]()))return _0x2d75c6;_0x37fda9=_0x37fda9||0x0;if(VisuMZ['CoreEngine']['CustomParamAbb'][_0xa32814])return VisuMZ[_0x2bdd21(0x23a)][_0x2bdd21(0x5ab)][_0xa32814]==='integer'?_0x2d75c6:String((_0x2d75c6*0x64)['toFixed'](_0x37fda9))+'%';return String((_0x2d75c6*0x64)[_0x2bdd21(0x445)](_0x37fda9))+'%';},VisuMZ[_0x5f3bde(0x2ec)]=function(_0x10e0de){const _0x5f227d=_0x5f3bde;_0x10e0de=String(_0x10e0de);if(!_0x10e0de)return _0x10e0de;if(typeof _0x10e0de!==_0x5f227d(0x670))return _0x10e0de;const _0x356b57=VisuMZ[_0x5f227d(0x23a)][_0x5f227d(0x22e)][_0x5f227d(0x338)][_0x5f227d(0x3d1)]||_0x5f227d(0x2ad),_0x566e7b={'maximumFractionDigits':0x6};_0x10e0de=_0x10e0de[_0x5f227d(0x3b4)](/\[(.*?)\]/g,(_0x10bbeb,_0x838e2)=>{const _0x3b320e=_0x5f227d;return VisuMZ[_0x3b320e(0x249)](_0x838e2,'[',']');}),_0x10e0de=_0x10e0de[_0x5f227d(0x3b4)](/<(.*?)>/g,(_0x2e8d8b,_0x392505)=>{const _0x4038e3=_0x5f227d;return VisuMZ[_0x4038e3(0x249)](_0x392505,'<','>');}),_0x10e0de=_0x10e0de[_0x5f227d(0x3b4)](/\{\{(.*?)\}\}/g,(_0x233d93,_0x2bb28b)=>{const _0x296a8a=_0x5f227d;return VisuMZ[_0x296a8a(0x249)](_0x2bb28b,'','');}),_0x10e0de=_0x10e0de[_0x5f227d(0x3b4)](/(\d+\.?\d*)/g,(_0x26a94f,_0x19adcb)=>{const _0x121f1a=_0x5f227d;let _0x33a4c5=_0x19adcb;if(_0x33a4c5[0x0]==='0')return _0x33a4c5;if(_0x33a4c5[_0x33a4c5[_0x121f1a(0x6d7)]-0x1]==='.')return Number(_0x33a4c5)[_0x121f1a(0x776)](_0x356b57,_0x566e7b)+'.';else return _0x33a4c5[_0x33a4c5[_0x121f1a(0x6d7)]-0x1]===','?Number(_0x33a4c5)['toLocaleString'](_0x356b57,_0x566e7b)+',':Number(_0x33a4c5)[_0x121f1a(0x776)](_0x356b57,_0x566e7b);});let _0x16ae6b=0x3;while(_0x16ae6b--){_0x10e0de=VisuMZ['RevertPreserveNumbers'](_0x10e0de);}return _0x10e0de;},VisuMZ['PreserveNumbers']=function(_0x360e4e,_0x3dc1b4,_0x22f466){const _0x117f34=_0x5f3bde;return _0x360e4e=_0x360e4e[_0x117f34(0x3b4)](/(\d)/gi,(_0x303c9d,_0x1e506b)=>_0x117f34(0x7d4)['format'](Number(_0x1e506b))),_0x117f34(0x4c9)[_0x117f34(0x763)](_0x360e4e,_0x3dc1b4,_0x22f466);},VisuMZ[_0x5f3bde(0x59a)]=function(_0x262053){const _0x5013ce=_0x5f3bde;return _0x262053=_0x262053[_0x5013ce(0x3b4)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x46b8ff,_0x564d7e)=>Number(parseInt(_0x564d7e))),_0x262053;},VisuMZ[_0x5f3bde(0x211)]=function(_0x4709be){const _0x778c9e=_0x5f3bde;SoundManager[_0x778c9e(0x7fa)]();if(!Utils[_0x778c9e(0x423)]()){const _0x528094=window[_0x778c9e(0x38e)](_0x4709be,'_blank');}else{const _0x4e7db7=process[_0x778c9e(0x695)]==_0x778c9e(0x24e)?_0x778c9e(0x38e):process['platform']==_0x778c9e(0x743)?'start':_0x778c9e(0x3c5);require(_0x778c9e(0x6fe))['exec'](_0x4e7db7+'\x20'+_0x4709be);}},Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x55d)]=function(){const _0x4f50da=_0x5f3bde;return this[_0x4f50da(0x328)];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x72b)]=Game_Picture[_0x5f3bde(0x371)]['initBasic'],Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x709)]=function(){const _0x31b3e7=_0x5f3bde;VisuMZ[_0x31b3e7(0x23a)][_0x31b3e7(0x72b)][_0x31b3e7(0x1f0)](this),this[_0x31b3e7(0x328)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ['CoreEngine']['Game_Picture_updateMove']=Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x69a)],Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x69a)]=function(){const _0x4ca876=_0x5f3bde;this[_0x4ca876(0x568)]();const _0xe1a4d6=this[_0x4ca876(0x7d8)];VisuMZ[_0x4ca876(0x23a)][_0x4ca876(0x39b)][_0x4ca876(0x1f0)](this),_0xe1a4d6>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x4ca876(0x4e6)],this['_y']=this[_0x4ca876(0x543)],this['_scaleX']=this[_0x4ca876(0x6ea)],this[_0x4ca876(0x2a0)]=this[_0x4ca876(0x3af)],this[_0x4ca876(0x6af)]=this[_0x4ca876(0x72d)],this[_0x4ca876(0x328)]&&(this[_0x4ca876(0x328)]['x']=this[_0x4ca876(0x4b9)]['x'],this['_anchor']['y']=this[_0x4ca876(0x4b9)]['y']));},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x53c)],Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x53c)]=function(_0x23ab46,_0x441dcb,_0x7a3ac5,_0x26867e,_0x40eaf9,_0x29a477,_0x3e4263,_0x3601bd){const _0x186b0d=_0x5f3bde;VisuMZ['CoreEngine'][_0x186b0d(0x7e1)][_0x186b0d(0x1f0)](this,_0x23ab46,_0x441dcb,_0x7a3ac5,_0x26867e,_0x40eaf9,_0x29a477,_0x3e4263,_0x3601bd),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x441dcb]||{'x':0x0,'y':0x0});},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x620)]=Game_Picture['prototype'][_0x5f3bde(0x817)],Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x817)]=function(_0x27be3b,_0x34a09e,_0x4987bc,_0x19b913,_0x137818,_0xe19401,_0x59da7,_0x41360b,_0x180203){const _0x41212c=_0x5f3bde;VisuMZ['CoreEngine'][_0x41212c(0x620)]['call'](this,_0x27be3b,_0x34a09e,_0x4987bc,_0x19b913,_0x137818,_0xe19401,_0x59da7,_0x41360b,_0x180203),this[_0x41212c(0x604)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x27be3b]||{'x':0x0,'y':0x0});},Game_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x568)]=function(){const _0x59d5d8=_0x5f3bde;this[_0x59d5d8(0x7d8)]>0x0&&(this['_anchor']['x']=this[_0x59d5d8(0x49a)](this['_anchor']['x'],this[_0x59d5d8(0x4b9)]['x']),this[_0x59d5d8(0x328)]['y']=this[_0x59d5d8(0x49a)](this[_0x59d5d8(0x328)]['y'],this[_0x59d5d8(0x4b9)]['y']));},Game_Picture[_0x5f3bde(0x371)]['setAnchor']=function(_0x3c5042){const _0xb83f39=_0x5f3bde;this['_anchor']=_0x3c5042,this['_targetAnchor']=JsonEx[_0xb83f39(0x6de)](this['_anchor']);},Game_Picture[_0x5f3bde(0x371)]['setTargetAnchor']=function(_0x48d7d7){const _0x57fbca=_0x5f3bde;this[_0x57fbca(0x4b9)]=_0x48d7d7;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6ba)]=Sprite_Picture['prototype'][_0x5f3bde(0x2db)],Sprite_Picture[_0x5f3bde(0x371)][_0x5f3bde(0x2db)]=function(){const _0x4a1a93=_0x5f3bde,_0x489741=this[_0x4a1a93(0x367)]();!_0x489741['anchor']()?VisuMZ[_0x4a1a93(0x23a)]['Sprite_Picture_updateOrigin'][_0x4a1a93(0x1f0)](this):(this[_0x4a1a93(0x55d)]['x']=_0x489741[_0x4a1a93(0x55d)]()['x'],this[_0x4a1a93(0x55d)]['y']=_0x489741[_0x4a1a93(0x55d)]()['y']);},Game_Action['prototype'][_0x5f3bde(0x399)]=function(_0x28f21a){const _0x59fef7=_0x5f3bde;if(_0x28f21a){const _0x287cab=_0x28f21a['skillId'];if(_0x287cab===0x1&&this[_0x59fef7(0x588)]()[_0x59fef7(0x729)]()!==0x1)this[_0x59fef7(0x7a8)]();else _0x287cab===0x2&&this['subject']()[_0x59fef7(0x50b)]()!==0x2?this['setGuard']():this[_0x59fef7(0x6e6)](_0x287cab);}else this[_0x59fef7(0x6ec)]();},Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x4b7)]=function(){const _0x2044aa=_0x5f3bde;return this['skills']()[_0x2044aa(0x322)](_0x2a0607=>this[_0x2044aa(0x2e7)](_0x2a0607)&&this[_0x2044aa(0x4bd)]()[_0x2044aa(0x638)](_0x2a0607[_0x2044aa(0x713)]));},Window_Base['prototype'][_0x5f3bde(0x62c)]=function(){const _0xb312f0=_0x5f3bde;this[_0xb312f0(0x39d)]=new Sprite(),this[_0xb312f0(0x39d)][_0xb312f0(0x2ba)]=new Bitmap(0x0,0x0),this[_0xb312f0(0x39d)]['x']=0x0,this[_0xb312f0(0x405)](this[_0xb312f0(0x39d)]);},Window_Base[_0x5f3bde(0x371)][_0x5f3bde(0x622)]=function(){const _0x4eb55c=_0x5f3bde;if(this['_dimmerSprite']){const _0x245f4d=this[_0x4eb55c(0x39d)]['bitmap'],_0x19b570=this['width'],_0x1abad6=this[_0x4eb55c(0x5b1)],_0x45304d=this[_0x4eb55c(0x6be)],_0x1d2360=ColorManager[_0x4eb55c(0x3ac)](),_0x4da931=ColorManager['dimColor2']();_0x245f4d[_0x4eb55c(0x1a0)](_0x19b570,_0x1abad6),_0x245f4d[_0x4eb55c(0x3f3)](0x0,0x0,_0x19b570,_0x45304d,_0x4da931,_0x1d2360,!![]),_0x245f4d[_0x4eb55c(0x232)](0x0,_0x45304d,_0x19b570,_0x1abad6-_0x45304d*0x2,_0x1d2360),_0x245f4d['gradientFillRect'](0x0,_0x1abad6-_0x45304d,_0x19b570,_0x45304d,_0x1d2360,_0x4da931,!![]),this[_0x4eb55c(0x39d)]['setFrame'](0x0,0x0,_0x19b570,_0x1abad6);}},Game_Actor[_0x5f3bde(0x371)][_0x5f3bde(0x7bc)]=function(){const _0x1e66ab=_0x5f3bde;for(let _0x44f967=0x0;_0x44f967<this['numActions']();_0x44f967++){const _0x5c81ad=this[_0x1e66ab(0x319)]();let _0x22fdc4=Number['MIN_SAFE_INTEGER'];this[_0x1e66ab(0x7f9)](_0x44f967,_0x5c81ad[0x0]);for(const _0x21e54c of _0x5c81ad){const _0x5b6e30=_0x21e54c['evaluate']();_0x5b6e30>_0x22fdc4&&(_0x22fdc4=_0x5b6e30,this[_0x1e66ab(0x7f9)](_0x44f967,_0x21e54c));}}this[_0x1e66ab(0x7f4)]('waiting');},Window_BattleItem['prototype'][_0x5f3bde(0x2b8)]=function(_0xaa1141){const _0x322d6e=_0x5f3bde;return BattleManager[_0x322d6e(0x2b5)]()?BattleManager[_0x322d6e(0x2b5)]()[_0x322d6e(0x2e7)](_0xaa1141):Window_ItemList[_0x322d6e(0x371)]['isEnabled'][_0x322d6e(0x1f0)](this,_0xaa1141);},VisuMZ[_0x5f3bde(0x23a)]['Scene_Map_createSpriteset']=Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x374)],Scene_Map[_0x5f3bde(0x371)][_0x5f3bde(0x374)]=function(){const _0x226cef=_0x5f3bde;VisuMZ['CoreEngine']['Scene_Map_createSpriteset'][_0x226cef(0x1f0)](this);const _0x1b848b=this[_0x226cef(0x5de)][_0x226cef(0x1dc)];if(_0x1b848b)this[_0x226cef(0x1bf)](_0x1b848b);},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x6f2)]=Scene_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x374)],Scene_Battle[_0x5f3bde(0x371)][_0x5f3bde(0x374)]=function(){const _0x4c5d30=_0x5f3bde;VisuMZ['CoreEngine'][_0x4c5d30(0x6f2)][_0x4c5d30(0x1f0)](this);const _0x3511e6=this[_0x4c5d30(0x5de)][_0x4c5d30(0x1dc)];if(_0x3511e6)this['addChild'](_0x3511e6);},Sprite_Actor['prototype'][_0x5f3bde(0x816)]=function(){const _0x4e2cf9=_0x5f3bde;Sprite_Battler[_0x4e2cf9(0x371)][_0x4e2cf9(0x816)][_0x4e2cf9(0x1f0)](this),this[_0x4e2cf9(0x636)]();if(this['_actor'])this[_0x4e2cf9(0x21e)]();else this[_0x4e2cf9(0x597)]!==''&&(this[_0x4e2cf9(0x597)]='');},Window[_0x5f3bde(0x371)]['_refreshArrows']=function(){const _0x2ab88e=_0x5f3bde,_0x4b74f8=this[_0x2ab88e(0x4e7)],_0x2dbe94=this[_0x2ab88e(0x51b)],_0x4eaeea=0x18,_0x4b8edc=_0x4eaeea/0x2,_0x293f8c=0x60+_0x4eaeea,_0x18b6ea=0x0+_0x4eaeea;this[_0x2ab88e(0x800)]['bitmap']=this[_0x2ab88e(0x2cd)],this['_downArrowSprite']['anchor']['x']=0.5,this[_0x2ab88e(0x800)][_0x2ab88e(0x55d)]['y']=0.5,this[_0x2ab88e(0x800)][_0x2ab88e(0x299)](_0x293f8c+_0x4b8edc,_0x18b6ea+_0x4b8edc+_0x4eaeea,_0x4eaeea,_0x4b8edc),this[_0x2ab88e(0x800)][_0x2ab88e(0x817)](Math['round'](_0x4b74f8/0x2),Math[_0x2ab88e(0x70a)](_0x2dbe94-_0x4b8edc)),this[_0x2ab88e(0x71e)][_0x2ab88e(0x2ba)]=this[_0x2ab88e(0x2cd)],this[_0x2ab88e(0x71e)][_0x2ab88e(0x55d)]['x']=0.5,this['_upArrowSprite'][_0x2ab88e(0x55d)]['y']=0.5,this['_upArrowSprite']['setFrame'](_0x293f8c+_0x4b8edc,_0x18b6ea,_0x4eaeea,_0x4b8edc),this[_0x2ab88e(0x71e)][_0x2ab88e(0x817)](Math[_0x2ab88e(0x70a)](_0x4b74f8/0x2),Math[_0x2ab88e(0x70a)](_0x4b8edc));},Window[_0x5f3bde(0x371)]['_refreshPauseSign']=function(){const _0x59167f=_0x5f3bde,_0x4ec0aa=0x90,_0xd80f3e=0x60,_0x43ef8d=0x18;this[_0x59167f(0x3e3)][_0x59167f(0x2ba)]=this[_0x59167f(0x2cd)],this[_0x59167f(0x3e3)][_0x59167f(0x55d)]['x']=0.5,this['_pauseSignSprite'][_0x59167f(0x55d)]['y']=0x1,this['_pauseSignSprite'][_0x59167f(0x817)](Math['round'](this[_0x59167f(0x4e7)]/0x2),this[_0x59167f(0x51b)]),this['_pauseSignSprite'][_0x59167f(0x299)](_0x4ec0aa,_0xd80f3e,_0x43ef8d,_0x43ef8d),this['_pauseSignSprite'][_0x59167f(0x777)]=0xff;},Window[_0x5f3bde(0x371)][_0x5f3bde(0x3b9)]=function(){const _0x1c2da3=_0x5f3bde,_0x4cb1f4=this['_clientArea']['worldTransform']['apply'](new Point(0x0,0x0)),_0x39d7bf=this['_clientArea'][_0x1c2da3(0x58d)];_0x39d7bf['x']=_0x4cb1f4['x']+this[_0x1c2da3(0x7d1)]['x'],_0x39d7bf['y']=_0x4cb1f4['y']+this[_0x1c2da3(0x7d1)]['y'],_0x39d7bf['width']=Math['ceil'](this[_0x1c2da3(0x292)]*this[_0x1c2da3(0x504)]['x']),_0x39d7bf[_0x1c2da3(0x5b1)]=Math[_0x1c2da3(0x210)](this['innerHeight']*this[_0x1c2da3(0x504)]['y']);},Window[_0x5f3bde(0x371)][_0x5f3bde(0x2b7)]=function(){const _0x1132e9=_0x5f3bde,_0xdd799e=this[_0x1132e9(0x6ae)],_0xb625e9=Math[_0x1132e9(0x615)](0x0,this[_0x1132e9(0x4e7)]-_0xdd799e*0x2),_0x18b53c=Math[_0x1132e9(0x615)](0x0,this[_0x1132e9(0x51b)]-_0xdd799e*0x2),_0x40a064=this[_0x1132e9(0x735)],_0x58bbef=_0x40a064[_0x1132e9(0x773)][0x0];_0x40a064[_0x1132e9(0x2ba)]=this[_0x1132e9(0x2cd)],_0x40a064[_0x1132e9(0x299)](0x0,0x0,0x60,0x60),_0x40a064[_0x1132e9(0x817)](_0xdd799e,_0xdd799e),_0x40a064[_0x1132e9(0x504)]['x']=_0xb625e9/0x60,_0x40a064[_0x1132e9(0x504)]['y']=_0x18b53c/0x60,_0x58bbef[_0x1132e9(0x2ba)]=this[_0x1132e9(0x2cd)],_0x58bbef[_0x1132e9(0x299)](0x0,0x60,0x60,0x60),_0x58bbef[_0x1132e9(0x817)](0x0,0x0,_0xb625e9,_0x18b53c),_0x58bbef[_0x1132e9(0x504)]['x']=0x1/_0x40a064[_0x1132e9(0x504)]['x'],_0x58bbef['scale']['y']=0x1/_0x40a064[_0x1132e9(0x504)]['y'],_0x40a064[_0x1132e9(0x535)](this[_0x1132e9(0x25f)]);},Game_Temp['prototype'][_0x5f3bde(0x665)]=function(){const _0x346855=_0x5f3bde;this[_0x346855(0x22a)]=[],this[_0x346855(0x1b2)]=[],this['_pointAnimationQueue']=[],this[_0x346855(0x694)]=[];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x4c0)]=Scene_Base['prototype'][_0x5f3bde(0x390)],Scene_Base[_0x5f3bde(0x371)][_0x5f3bde(0x390)]=function(){const _0x1b9fc7=_0x5f3bde;if($gameTemp)$gameTemp[_0x1b9fc7(0x665)]();VisuMZ['CoreEngine'][_0x1b9fc7(0x4c0)][_0x1b9fc7(0x1f0)](this);},Bitmap[_0x5f3bde(0x371)]['measureTextWidthNoRounding']=function(_0x55b416){const _0x49e9e1=_0x5f3bde,_0x4204d0=this[_0x49e9e1(0x432)];_0x4204d0[_0x49e9e1(0x46d)](),_0x4204d0['font']=this[_0x49e9e1(0x664)]();const _0x1489a2=_0x4204d0[_0x49e9e1(0x69e)](_0x55b416)[_0x49e9e1(0x431)];return _0x4204d0[_0x49e9e1(0x2b4)](),_0x1489a2;},Window_Message[_0x5f3bde(0x371)][_0x5f3bde(0x3fc)]=function(_0x99c456){const _0xe3b188=_0x5f3bde;return this[_0xe3b188(0x26a)]()?this[_0xe3b188(0x562)][_0xe3b188(0x761)](_0x99c456):Window_Base[_0xe3b188(0x371)][_0xe3b188(0x3fc)][_0xe3b188(0x1f0)](this,_0x99c456);},Window_Message[_0x5f3bde(0x371)]['useFontWidthFix']=function(){const _0x321d51=_0x5f3bde;return VisuMZ[_0x321d51(0x23a)][_0x321d51(0x22e)][_0x321d51(0x338)][_0x321d51(0x5c6)]??!![];},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x219)]=Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x3d2)],Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x3d2)]=function(){const _0x3e197c=_0x5f3bde;return this['item']()?VisuMZ['CoreEngine'][_0x3e197c(0x219)]['call'](this):0x0;},VisuMZ[_0x5f3bde(0x23a)][_0x5f3bde(0x771)]=Game_Action[_0x5f3bde(0x371)][_0x5f3bde(0x7a8)],Game_Action[_0x5f3bde(0x371)]['setAttack']=function(){const _0x582f51=_0x5f3bde;this[_0x582f51(0x588)]()&&this['subject']()['canAttack']()?VisuMZ['CoreEngine'][_0x582f51(0x771)]['call'](this):this[_0x582f51(0x6ec)]();},Sprite_Name[_0x5f3bde(0x371)][_0x5f3bde(0x1ae)]=function(){return 0x24;},Sprite_Name[_0x5f3bde(0x371)]['redraw']=function(){const _0x355a8f=_0x5f3bde,_0x57f6ed=this[_0x355a8f(0x6ad)](),_0x47dabf=this[_0x355a8f(0x2cb)](),_0x8e000=this[_0x355a8f(0x1ae)]();this[_0x355a8f(0x811)](),this['bitmap'][_0x355a8f(0x6ec)](),this[_0x355a8f(0x2ba)]['drawTextTopAligned'](_0x57f6ed,0x0,0x0,_0x47dabf,_0x8e000,_0x355a8f(0x2c3));},Bitmap[_0x5f3bde(0x371)][_0x5f3bde(0x7c3)]=function(_0x1d2303,_0x4894f5,_0x51f02f,_0x2f81ca,_0x1cf6c5,_0x27d1e9){const _0x19d54b=_0x5f3bde,_0x358c56=this[_0x19d54b(0x432)],_0x17f13f=_0x358c56['globalAlpha'];_0x2f81ca=_0x2f81ca||0xffffffff;let _0x2eb597=_0x4894f5,_0x3aa977=Math[_0x19d54b(0x70a)](_0x51f02f+0x18/0x2+this[_0x19d54b(0x68e)]*0.35);_0x27d1e9===_0x19d54b(0x418)&&(_0x2eb597+=_0x2f81ca/0x2),_0x27d1e9===_0x19d54b(0x7ed)&&(_0x2eb597+=_0x2f81ca),_0x358c56['save'](),_0x358c56[_0x19d54b(0x2fd)]=this[_0x19d54b(0x664)](),_0x358c56[_0x19d54b(0x221)]=_0x27d1e9,_0x358c56[_0x19d54b(0x828)]='alphabetic',_0x358c56[_0x19d54b(0x4a4)]=0x1,this[_0x19d54b(0x382)](_0x1d2303,_0x2eb597,_0x3aa977,_0x2f81ca),_0x358c56[_0x19d54b(0x4a4)]=_0x17f13f,this[_0x19d54b(0x39f)](_0x1d2303,_0x2eb597,_0x3aa977,_0x2f81ca),_0x358c56['restore'](),this[_0x19d54b(0x586)][_0x19d54b(0x816)]();},VisuMZ['CoreEngine'][_0x5f3bde(0x4b4)]=BattleManager['checkSubstitute'],BattleManager[_0x5f3bde(0x194)]=function(_0x26709a){const _0x61cc8e=_0x5f3bde;if(this[_0x61cc8e(0x31c)][_0x61cc8e(0x3ee)]())return![];return VisuMZ[_0x61cc8e(0x23a)][_0x61cc8e(0x4b4)][_0x61cc8e(0x1f0)](this,_0x26709a);};