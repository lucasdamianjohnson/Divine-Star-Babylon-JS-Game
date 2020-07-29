import {fearinventory} from './TeamData/fearinventory.js';
import {teamdata} from './TeamData/teamdata.js';
import {teamplayerdata} from './TeamData/teamplayerdata.js';
export class TeamData
{
	

	constructor()
	{
		this.data = {};
		this.data['fear-types-total'] = 0;
		this.data['crystals-total'] = 0;
		this.data['fearinventory'] = fearinventory;
		this.data['teamplayerdata'] = teamplayerdata;
		this.data['teamdata'] = teamdata;
		this.player_hud = false;

	}

	get_data_value(looking_for,index)
	{
	  return this.data[looking_for][index];
	}

	get_data(looking_for)
	{
		return this.data[looking_for];
	}

	add_to_data(looking_for,add)
	{
	    this.data[looking_for] += add;
	    this.player_hud.update(looking_for,this.data[looking_for],add);
	}


	set_player_hud(player_hud)
	{
		this.player_hud = player_hud;
	}


	prompt_fear_update(callback)
	{
		this.player_hud.create_time_prompt('Will you enter the fear now?',callback)
	}
	cancel_fear_prompt(callback)
	{
		console.log('calling cancel fear prompt!');
		this.player_hud.cancel_time_prompt(callback);
	}




	add_to_fear_inventory(orbdata)
	{
		console.log('got orb data!');
		console.log(orbdata);

		var teamdata = this;
		var orbtype = orbdata['orbtype'];
		var updated = false;

		for(var slot in this.data['fearinventory']){
		  var iorbtype =  teamdata.data['fearinventory'][slot]['orbtype']
		  
		   if (orbtype == iorbtype) {
		   	teamdata.data['fearinventory'][slot]['amount'] += 1;
		   	updated = true;
		   	break;
		   }

		}

		if(!updated){

		for(var slot in this.data['fearinventory']){

		  var amount = teamdata.data['fearinventory'][slot]['amount'];

		   if (amount == 0) {

		   	teamdata.data['fearinventory'][slot]['amount'] = 1;
		   	teamdata.data['fearinventory'][slot]['orbtype'] += orbdata['orbtype'];
		   	break;

		   }

		}

	    }

       this.player_hud.update_fear_inventory(this.data['fearinventory']);
	   console.log(this.data['fearinventory']);
	}



}