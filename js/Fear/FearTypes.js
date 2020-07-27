
import {FearOrb} from './FearOrb.js'
export class FearTypes
{



	constructor()
	{
		this.scene = false;
		this.mesh = false;
		this.sound = false;
		this.player = false;
		this.teamdata = false;
	
 	this.hitbox = false;
 	this.objects = {};
 	this.assets = false;
 	this.player_hud = false;
 	this.fear_scene_standby = false;

	}

	set_player_hud(playerhud)
	{
		this.player_hud = playerhud;
	}

	set_scene_standby(scene_data)
	{
	 	this.fear_scene_standby = scene_data;	
	 	console.log(this.fear_scene_standby);
	 	console.log('set stand by scene')
	}
	load_fear_scene()
	{

		//load scene
	}


	set_asset_manager(assetManager)
	{
		this.assets = assetManager;
	}
	set_scene(scene)
	{
	 this.scene = scene;
	}

	set_player(player)
	{

	this.player = player;
	}
	set_team_data(teamdata)
	{
		this.teamdata = teamdata;
	}

	destroy(id,type)
	{
		this.objects[type+'-'+id] = null;
		delete this.objects[type+'-'+id];
	}

	create(id,type,position,data1,data2){
		var var_return = false;
		if(type=='fearorb'){

			var fearorb = new FearOrb(id,data1);
			fearorb.set_fear_types(this);
			fearorb.set_scene(this.scene);
			fearorb.set_player(this.player);
			fearorb.set_assets_manager(this.assets);
			fearorb.set_team_data(this.teamdata);
			fearorb.create_orb(new BABYLON.Vector3(5, .6, 0))
			var_return = fearorb;		
			this.objects['fearorb-'+id] = fearorb;
		}

		return var_return;
	}


physicsupdate()
{

for(var objs in this.objects){

	this.objects[objs].physicsupdate();
}


}

}
	