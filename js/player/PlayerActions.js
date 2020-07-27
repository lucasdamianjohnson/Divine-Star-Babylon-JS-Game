
export class PlayerActions
{
	

	constructor(){

		this.aviable_action = {
			type: '',
			actioncallback:false
		}
		this.scene_manager = false;
		this.teamdata = false;
   }
set_team_data(teamdata){
	this.teamdata = teamdata;
}
set_scene_manager(sceneManager){
		this.scene_manager = sceneManager;
} 
	do_action()
	{

	var type = this.aviable_action['type'];
	if(type=='fearscene'){
		
this.aviable_action['actioncallback'](this.scene_manager,this.teamdata);
}

		this.unset_action();
	}



	set_action(type,callback)
	{

  
	this.aviable_action = {
			type: type,
			actioncallback:callback
		}

	}
	unset_action()
	{
	this.aviable_action = {
			type: '',
			actioncallback:false
		}
	}

}