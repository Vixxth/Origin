/*
 *
 * @command Reset SDP
 * @text Reset Panel(s) 
 * @desc Reset a panel for the player to level up by its key. Key must exist in the SDPs list above.
 * @arg actorId
 * @type actor
 * @desc The actor to modify the points of.
 * @arg keys
 * @type string[]
 * @desc The unique keys for the SDPs that will be reset.
 * 
 * @command Unlock Actor SDP
 * @text Unlock SDP(s) for Actor 
 * @desc Unlock a panel for the current Actor to level by its key. Key must exist in the SDPs list above.
 * @arg actorId
 * @type actor
 * @desc The actor to modify the points of.
 * @arg keys
 * @type string[]
 * @desc The unique keys for the SDPs that will be reset.
 * 
 * @command Damage Actor HP
 * @text Deal x dmg to ActorID 
 * @desc Deal int value damage to the actor ID.
 * @arg actorId
 * @type actor
 * @desc The actor to modify the points of.
 * @arg dmg
 * @type number
 * @desc Inte value of damage actor needs to take..
 * 
 */


var J = J || {};
J.SDP.OR = {};

 PluginManager.registerCommand(J.SDP.Metadata.Name, "Reset SDP", args =>
 {
   let {actorId,keys} = args;
   keys = JSON.parse(keys);
   actorId = parseInt(actorId);
   keys.forEach(key =>
   {
     $gameSystem.resetSdp(actorId,key);
   });
 });
 PluginManager.registerCommand(J.SDP.Metadata.Name, "Damage Actor HP", args =>
 {
   let {actorId,dmg} = args;
   dmg = parseInt(dmg);
   actorId = parseInt(actorId);
  $gameSystem.dealDmg(actorId,key);
 });


 PluginManager.registerCommand(J.SDP.Metadata.Name, "Unlock Actor SDP", args =>
 {
  let {actorId,keys} = args;
   keys = JSON.parse(keys);
   keys.forEach(key =>
   {
     $gameSystem.unlockSdpActor(actorId,key);
   });
 });
 

//Deal damage to specified Actor
Game_System.prototype.dealDmg = function(actorId,dmg)
{
  $gameActors.actor(actorId).hp -=dmg;
  
};


//Unlock Specific SDP for current actor
 Game_System.prototype.unlockSdpActor = function(actorId,key)
{
    const actor = $gameActors.actor(actorId);
  const panel = this.getSdp(key);
  if (panel)
  {
    actor.unlockSdpByKeyForActor(key);
  }
  else
  {
    console.error(`The SDP key of ${key} was not found in the list of panels.`);
  }
};
Game_Actor.prototype.unlockSdpByKeyForActor = function(key)
{
  const panelRanking = new PanelRanking(key, this.actorId());
  this._j._sdp._ranks.push(panelRanking)
};



/**
 * Resets a SDP by its key.
 * @param {string} key The key of the SDP to unlock.
 */
//Reset current SDP for current actor
 Game_System.prototype.resetSdp = function(actorId,key)
{
    const actor = $gameActors.actor(actorId);
  const panel = this.getSdp(key);
  if (panel)
  {
    actor.resetSdpRankByKey(key);
    //   const panelRanking = new PanelRanking(key, this.actorId());
    //   panelRanking.currentRank = 0;
    //   this._j._sdp._ranks.push(panelRanking);
  
      //if(panel.)
    //panel.unlock();
  }
  else
  {
    console.error(`The SDP key of ${key} was not found in the list of panels.`);
  }
};
Game_Actor.prototype.resetSdpRankByKey = function(key)
{
  // don't try to search if there are no rankings at this time.
  if (!this._j._sdp._ranks.length) return;
  this._j._sdp._ranks.find(panelRanking => panelRanking.key === key).currentRank = 0;
};