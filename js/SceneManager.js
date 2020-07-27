
export class SceneManager
{


	constructor()
	{
		this.scenes = {};
		this.scenes['level'] =[];
		this.scenes['fear'] = [];
		this.scenes['menu'] = [];
		this.active_scene = false;
		this.active_scene_data = {type:'',scene_id:''}
		this.playerhud = false;
	}

	set_player_hud(playerhud){
		this.playerhud = playerhud;
	}


	add_scene(type,scene_id,scene)
	{
		this.scenes[type][scene_id] = scene;
	}

	get_scene(type,scene_id)
	{
		return this.scenes[type][scene_id];
	}

	set_active_scene(type,scene_id)
	{
		this.active_scene_data.type = type;
		this.active_scene_data.scene_id = scene_id;
	    this.active_scene = this.get_scene(type,scene_id);

	    if(type=='fear')
	    {
	    	console.log('loading type!');
			this.playerhud.animate_bottom_bar_down(function(playerhud){
				playerhud.animate_battle_bar_up();
			});
			
	    }


	}

	render_active_scene()
	{
		if(this.active_scene){
			this.active_scene.render();
		}
	}


}

