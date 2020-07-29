
export class SceneManager
{


	constructor(assettManager,dataManager,teamData)
	{
		this.scenes = {};
		this.scenes['level'] =[];
		this.scenes['fear'] = [];
		this.scenes['menu'] = [];
		this.active_scene = false;
		this.active_scene_data = {type:'',scene_id:''}
		this.playerhud = false;
		this.battleLoader = false;
		this.assettManager = assettManager;
		this.dataManager = dataManager;
		this.teamData = teamData;
		this.gameEngine = false;
		this.gameCanvas = false;

		this.load_scene = false;
	}

	set_game_canvas(gameCanvas)
	{
		this.gameCanvas = gameCanvas;
	}
	set_game_engine(gameEngine)
	{
		this.gameEngine = gameEngine;
	}
	set_player_hud(playerhud){
		this.playerhud = playerhud;
	}

	set_battle_loader(battleLoader)
	{
	  this.battleLoader = battleLoader;
	}


	add_scene(type,scene_id,scene)
	{
		this.scenes[type][scene_id] = scene;
	}

	get_scene(type,scene_id)
	{
		return this.scenes[type][scene_id];
	}

	set_active_scene(type,scene_id,data)
	{


		if(!this.load_scene){
			this.load_scene = this.create_load_scene();
		}

		this.active_scene_data.type = type;
		this.active_scene_data.scene_id = scene_id;


		if(type == 'level'){	
		this.active_scene = this.get_scene(type,scene_id);
		}

	    var sceneManager = this;
	    if(type=='fear')
	    {
	    	this.active_scene.dispose();
	    	sceneManager.playerhud.animate_bottom_bar_down();
	 	   
	 		var fearscene = this.createfearscene();
	    	var space = data['fearspace'];
	    	var fearbattlesets = data['fearbattlesets'];

	    	
	    	var fearspace_data = sceneManager.dataManager.get_data_value('fearspaces',space);

	    	var loaded = false;
	    	var types = [];
	    	fearbattlesets.forEach( function(item, index) {
	    			var battleset = sceneManager.dataManager.get_data_value('fearbattlesets',item);
	    			var battlesettypes = battleset['fear-types'];
	    			battlesettypes.forEach( function(type, i) {
	    		
	    				var min = type['min'];
	    				var max = type['max'];
	    				var num = getRandomNumber(min,max);
	    				var name = type['name'];
	    				for(var nums = 0; nums < num; nums++){
	    				types.push(name);
	    				}
	    			});
	    	});
	    	




	    	var currentteam = sceneManager.teamData.get_data_value('teamdata','currentteam');

	    	sceneManager.assettManager.set_scene(fearscene);
	    	sceneManager.assettManager.loadfeartype_models(types);
	    	sceneManager.assettManager.loadfear_space(space);
	    	sceneManager.assettManager.load_team_models(currentteam);
	    
	    	var load_wait = function() {setTimeout(function(){
	    			

	    		if(sceneManager.assettManager.is_battle_assets_loaded())
	    		{
	    			sceneManager.assettManager.clear_battle_assets_load();
	    			var battleassets = sceneManager.assettManager.get_loaded_battle_assets();
	    	
	    			sceneManager.createfearscene();
	    
	 
			

				    sceneManager.battleLoader.load_battle(battleassets,fearscene,fearspace_data);

					load_battle()
	    			clearTimeout(load_wait);
	    		} else {
	    			load_wait();
	    		}

	    	}, 200);

	        }
			

			setTimeout(function(){	
				 sceneManager.active_scene = sceneManager.load_scene;

				load_wait();}, 1000, );
			
			var load_battle = function(){
				setTimeout(function(){
			
					if(sceneManager.battleLoader.is_battle_loaded()){
						sceneManager.battleLoader.clear_battle_loaded()
					   sceneManager.active_scene = fearscene;
					
				
						 setTimeout(function(){

						 	sceneManager.battleLoader.start_battle()
						 	sceneManager.playerhud.animate_battle_bar_up();


						 }, 500, );
						 clearTimeout(load_battle());
					}


						
				},200);

			}



	    }


	}

	render_active_scene()
	{
		if(this.active_scene){
			this.active_scene.render();
		}
	}




create_load_scene()
{
var scene = new BABYLON.Scene(this.gameEngine);

scene.clearColor = new BABYLON.Color3(0, 0, 0);


   var camera = new BABYLON.UniversalCamera("LoadSceneCamera", new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(this.gameCanvas, true);

     scene.activeCamera = camera;
   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  
 	return scene;
}


createfearscene()
{


    var scene = new BABYLON.Scene(this.gameEngine);
	//scene.debugLayer.show();
scene.clearColor = new BABYLON.Color3(.37, .23, .23);
    var gravityVector = new BABYLON.Vector3(0,-9.8, 0);
	var physicsPlugin = new BABYLON.CannonJSPlugin();
	scene.enablePhysics(gravityVector, physicsPlugin);
    scene.collisionsEnabled = true;

   var camera = new BABYLON.UniversalCamera("FearSceneCamera", new BABYLON.Vector3(10, 8, 16), scene);
        camera.attachControl(this.gameCanvas, true);

    scene.camera = camera;

     scene.activeCamera = camera;
   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 2;
 	return scene;
 }












}

