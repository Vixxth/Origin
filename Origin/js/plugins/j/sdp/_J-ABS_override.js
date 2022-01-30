/*
*
 * @command Damage Actor HP
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

 PluginManager.registerCommand(J.ABS.Metadata.Name, "Damage Actor HP", args =>
 {
   let {eventIds,dmg} = args;
   dmg = JSON.parse(dmg);
   eventIds = JSON.parse(eventIds);

   eventIds.forEach(eventId =>
    {
  $gameSystem.dealDmg(eventId,dmg);
    })
 });

//Deal damage to specified Actor
Game_System.prototype.dealDmg = function(eventId,dmg)
{
  const battlers = $gameMap.getEnemyBattlers();
  battlers.forEach(jabsBattler =>
  {
    // grab the battler being affected by this item.
    //var battler = jabsBattler.getBattler();
    //if(battler._enemyId ==eventId )
    if(jabsBattler._event._eventId==eventId)
    {   
      jabsBattler._battler._hp -= dmg;
      const gameAction = new Game_Action(jabsBattler._battler, false);
    }
    // create the game action based on the data.
  //$gameActors.actor(actorId).hp -=dmg;  
  }, 
  this);
};
