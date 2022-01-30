/*
*
 * @command Deal HP Damage
 * @text Deal x dmg to ActorID 
 * @desc Deal int value damage to the actor ID.
 * @arg eventIds
 * @type number[]
 * @desc The actor to modify the points of.
 * @arg dmg
 * @type number
 * @desc Inte value of damage actor needs to take..
 * 
 */


var J = J || {};
J.ABS.OR = {};
/**
 * Registers a plugin command for dealing arbitrary damage to an enemy based
 * on the event id associated with the target.
 */
 PluginManager.registerCommand(J.ABS.Metadata.Name, "Deal HP Damage", args =>
 {
   // extract the event ids and damage from the plugin args.
   const { eventIds, dmg } = args;
 
   // translate the damage.
   const damageToDeal = parseInt(dmg) * -1;
 
   // translate the event ids.
   const targetEventIds = JSON.parse(eventIds);
 
   // iterate over all parsed event ids.
   targetEventIds.forEach(eventId =>
   {
     // scan the map for the matching event id.
     const [targetEnemy] = $gameMap.findBattlerByEventId(eventId);
 
     // check to see if we found one.
     if (targetEnemy)
     {
       // apply the damage directly to the target's hp.
       targetEnemy.getBattler().gainHp(damageToDeal);
     }
   });
 });
 
/**
 * Removes a battler from tracking by its index in the master tracking list.
 * @param {number} index The index to splice away.
 */
Game_Map.prototype.deleteBattlerByIndex = function(index)
{
  this._j._allBattlers.splice(index, 1);
};/**
* Finds the battler and its index in the collection by its `_eventId`.
*
* The result of this is intended to be destructured from the array.
* If no result is found, the battler will be null, and index will be -1.
* @param {number} eventId The `_eventId` of the battler to find.
* @returns {[JABS_Battler, number]}
*/
Game_Map.prototype.findBattlerByEventId = function(eventId)
{
 let targetIndex = -1;
 const battler = this._j._allBattlers.find((battler, index) =>
 {
   // do not process non-enemies.
   if (!battler.isEnemy()) return false;

   // check if the enemy matches the event we're looking for.
   const isTargetEvent = battler.getCharacter().eventId() === JSON.parse(eventId);

   // if it isn't the event we're looking for, keep looking.
   if (!isTargetEvent) return false;

   // grab the index in the collection.
   targetIndex = index;

   // we found a match!
   return true;
 });

 // return the results.
 return [battler, targetIndex];
};
//  PluginManager.registerCommand(J.ABS.Metadata.Name, "Damage Actor HP", args =>
//  {
//    let {eventIds,dmg} = args;
//    dmg = JSON.parse(dmg);
//    eventIds = JSON.parse(eventIds);

//    eventIds.forEach(eventId =>
//     {
//   $gameSystem.dealDmg(eventId,dmg);
//     })
//  });

// //Deal damage to specified Actor
// Game_System.prototype.dealDmg = function(eventId,dmg)
// {
//   const battlers = $gameMap.getEnemyBattlers();
//   battlers.forEach(jabsBattler =>
//   {
//     // grab the battler being affected by this item.
//     //var battler = jabsBattler.getBattler();
//     //if(battler._enemyId ==eventId )
//     if(jabsBattler._event._eventId==eventId)
//     {   
//       jabsBattler._battler._hp -= dmg;
//       const gameAction = new Game_Action(jabsBattler._battler, false);
//     }
//     // create the game action based on the data.
//   //$gameActors.actor(actorId).hp -=dmg;  
//   }, 
//   this);
//};
