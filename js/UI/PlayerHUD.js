

import {Messages} from './Messages.js'
import {FearInventory} from './FearInventory.js'
export class PlayerHUD
{
	

	constructor()
{
var message = document.getElementById('message');
this.message = message;
this.messages = new Messages();
this.fear_inventory = new FearInventory();
this.icon_groups = {}
this.icon_groups['fear-types']  = document.getElementById('fear-types');
this.icon_groups['crystals']  = document.getElementById('crystals-display');
this.fear_total_amount = document.getElementById('fear-types-total');
this.prompt_countdown_bar = document.getElementById('prompt-count-bar');
this.prompt_countdown = document.getElementById('prompt-count-down');
this.fear_invetory_button = document.getElementById('fear-invetory-player-hud');
this.fear_invetory_menu = document.getElementById('fear-type-inventory-menu');
this.cancel_count_down_bar = false;
this.cancel_count_down_bar_callback = false;
this.dataManager = false;
this.player_hud_bottom_bar = document.getElementById('player-hud');
this.team_battle_bar = document.getElementById('team-battle-bar');
this.add_click_listeners();
}


animate_battle_bar_up()
{
console.log('animating_battle_bar_up!!');
var top = 100;
var player_hud = this;
 var animate_battle_bar_out_id = setInterval(animate_battle_bar_out_id_frame, 30);

    function animate_battle_bar_out_id_frame() {

      if (top <= 85) {
    		callback(player_hud);
        clearInterval(animate_battle_bar_out_id);

      } else {
        top--;

        player_hud.team_battle_bar.style.top = top + "%";
      }




    }
}

animate_bottom_bar_up(callback)
{

var top = 100;
var player_hud = this;
 var animate_bottom_bar_out_id = setInterval(animate_bottom_bar_out_id_frame, 30);

    function animate_bottom_bar_out_id_frame() {

      if (top <= 85) {
    		callback(player_hud);
        clearInterval(animate_bottom_bar_out_id);

      } else {
        top--;

        player_hud.player_hud_bottom_bar.style.top = top + "%";
      }




    } 
}
animate_bottom_bar_down(callback)
{
console.log('calling this!!');
var top = 85;
var player_hud = this;
 var animate_bottom_bar_out_id = setInterval(animate_bottom_bar_out_id_frame, 30);

    function animate_bottom_bar_out_id_frame() {

      if (top >= 100) {
  	callback(player_hud);
        clearInterval(animate_bottom_bar_out_id);
  
      } else {
        top++;
   
        player_hud.player_hud_bottom_bar.style.top = top + "%";
      }




    } 
}

set_data_manager(dataManger)
{
this.dataManger = dataManger;
this.fear_inventory.set_data_manager(dataManger);
}

add_click_listeners(){
var player_hud = this;
this.fear_invetory_button.addEventListener("click", function(){
	console.log('toggle classs');
	toggleClass(player_hud.fear_invetory_menu,'show');
});
}



cancel_time_prompt(callback)
{
removeClass(this.prompt_countdown,'show');
removeClass(this.message,'show');
this.cancel_count_down_bar = true;
this.cancel_count_down_bar_callback = callback;

}

/*
* Creates a time prompt on the screen. Updates the value if the user does not do anything.
* 
*
*/
create_time_prompt(message,callback)
{

this.trigger_count_down_bar(callback);
//this.messages.showAndHideMessage('Will you enter the fear now?',0,1800);
this.messages.showAndHideMessage(message,0,1800);
}


update(looking_for,new_value,added)
{

if('fear-types-total')
{
this.fear_total_amount.innerText = new_value;
this.add_to_fear_bar(added);
this.trigger_active_icon('fear-types')

}
if('crystals-total')
{

}
 

}









trigger_count_down_bar(callback)
{
	 addClass(this.prompt_countdown,'show');

var width = 100;
var player_hud = this;
 
 var trigger_count_down_bar_id = setInterval(trigger_count_down_bar_frame, 30);
    function trigger_count_down_bar_frame() {

      if (width < 0) {
        removeClass(player_hud.prompt_countdown,'show');
        callback();
        clearInterval(trigger_count_down_bar_id);
        setTimeout(function(){
        	        player_hud.prompt_countdown_bar.style.width = "100%";
        },1010);
      } else {
        width--;

        player_hud.prompt_countdown_bar.style.width = width + "%";
      }

      if(player_hud.cancel_count_down_bar){
      	clearInterval(trigger_count_down_bar_id);
      	player_hud.cancel_count_down_bar_callback();
      	player_hud.cancel_count_down_bar = false;
      	console.log('canceling!!');
      	return;
      }


    } 



}

trigger_active_icon(group,show_speed=1,duration=1000,end_speed=1)
{

var teamdata = this;
setTimeout(function(){

addClass(teamdata.icon_groups[group],'active');

setTimeout(function(){

setTimeout(function(){
removeClass(teamdata.icon_groups[group],'active');
},end_speed);

},duration);


}, show_speed );

}










 subtract_from_fear_bar(amount)
{
  var elem = document.getElementById("fear-bar");
var width = parseInt(elem.getAttribute('data-width'));
var total = width - amount;
if(total < 0) {
  total = 0;
}

 var subtract_from_fear_bar_frame_id = setInterval(subtract_from_fear_bar_frame, 30);
    function subtract_from_fear_bar_frame() {
      console.log('calling subtract');
      console.log(`${width} ${total}`)
      if (width <= total) {
        clearInterval(subtract_from_fear_bar_frame_id);

      } else {
        width--;
        elem.style.width = width + "%";
      }
    } 
}

 add_to_fear_bar(amount)
{
 var elem = document.getElementById("fear-bar");
var width = parseInt(elem.getAttribute('data-width'));
var total = width + amount;
if(total > 100) {
  total = 100;
}

elem.setAttribute('data-width', total);
 var add_to_fear_bar_frame_id = setInterval(add_to_fear_bar_frame, 30);
    function add_to_fear_bar_frame() {
      if (width >= total) {

        clearInterval(add_to_fear_bar_frame_id);

      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
}



update_fear_inventory(fear_inventory)
{
this.fear_inventory.update_fear_inventory(fear_inventory);
}

}