
export class BattleLoader
{


	constructor(sceneManager,dataManager,teamdata,battleManager,team,feartypes,playerhud)
	{
		this.sceneManager = sceneManager;
		this.dataManager = dataManager;
		this.battleManager = battleManager;
		this.team = team;
		this.teamdata = teamdata;
		this.feartypes = feartypes;
		this.playerhud = playerhud;
		this.sceneManager.set_battle_loader(this);
		this.is_loaded = false;
		this.scene = false;	
		this.camera_intro_animation = false;
	}

	is_battle_loaded()
	{
		return this.is_loaded;
	}

	clear_battle_loaded()
	{
		this.is_loaded = false;
	}


create_anims()
{

 console.log('called creat anims!');
 console.log(this.scene.camera);
  var camera_intro_keys = [];
  var camera_intro = new BABYLON.Animation("camera-intro", "position.x", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);


//ligth out keys
   camera_intro_keys.push({
        frame: 0,
        value: 1
    });

  
    camera_intro_keys.push({
        frame: 15,
        value: 15
    });
    camera_intro.setKeys(camera_intro_keys);
    this.scene.camera.animations.push(camera_intro);
//this.scene.animations.push(camera_intro);
this.camera_intro_animation = camera_intro;

}

start_battle()
{

	this.scene.beginAnimation(this.scene.camera, 0, 15, false);
	//.play(false);
	//console.log(	this.camera_intro_animation);
}




	load_battle(data,scene,fearspace_data)
	{

		console.log('called load battle');
		console.log(data);
		console.log(fearspace_data);
		var battleLoader = this;

	    this.is_loaded = false;
	    this.scene = scene;
	    var camera = this.scene.camera;
		var space = data.space;
		var fearmodels = data.models;
		var teammodels = data.teammodels;

		var player_position = fearspace_data['player_position'];
		var fear_type_position = fearspace_data['fear_type_position'];

	
space['model'].forEach(function(mesh,index){
  		

		if(mesh.name == 'camera-look-at'){
  			 camera.setTarget(mesh.position);
camera.lockedTarget = mesh; 

  			mesh.isVisible = false;
  			return;

  		}
  		if(mesh.name=='camera-position') {
  			
  			camera.position.y = 12;
  			camera.position.x =1;
        	camera.position.z =16;
  			mesh.isVisible = false;

  			return;
  		}
  		if(mesh.name =='player1-position'){
  			mesh.isVisible = false;
  

  			return;
  		}
  		if(mesh.name=='fear1-position'){
  		   mesh.isVisible = false;
  		   return;
  		}




  		if(mesh.name != 'player'){
  		mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

  		}

  		


  		});


        var game_grid = {
        	'team' : [],
        	'feartypes' : []
        }

 	

 		var player_meshes = [];
 		
      
      	 var player_1_mesh = teammodels[0]['model'];
	player_1_mesh.scaling.x = 	player_1_mesh.scaling.y = 	player_1_mesh.scaling.z = .8;
     player_1_mesh.position = player_position["1"]["position"];
     player_1_mesh.rotate(BABYLON.Axis.Y,player_position["1"]["rotation"], BABYLON.Space.WORLD);
     
     	game_grid['team'].push({ id:teammodels[0]['id'],position:player_position["1"]["position"]});
    	player_meshes.push({id:teammodels[0]['id'],mesh:teammodels[0]['model']});

    	 var player_2_mesh = teammodels[1]['model'];
	player_2_mesh.scaling.x = 	player_2_mesh.scaling.y = 	player_2_mesh.scaling.z = .8;
     player_2_mesh.position = player_position["2"]["position"];
     player_2_mesh.rotate(BABYLON.Axis.Y,player_position["2"]["rotation"], BABYLON.Space.WORLD);
    player_meshes.push({id:teammodels[1]['id'],mesh:teammodels[1]['model']});

   
     game_grid['team'].push({ id:teammodels[1]['id'],position:player_position["2"]["position"] });
    var player_3_mesh = teammodels[2]['model'];
	player_3_mesh.scaling.x = 	player_3_mesh.scaling.y = 	player_3_mesh.scaling.z = .8;
     player_3_mesh.position = player_position["3"]["position"];
     player_3_mesh.rotate(BABYLON.Axis.Y,player_position["3"]["rotation"], BABYLON.Space.WORLD);
     player_meshes.push({id:teammodels[2]['id'],mesh:teammodels[2]['model']});
 
     
        game_grid['team'].push({ id:teammodels[2]['id'],position:player_position["3"]["position"]});
     var player_4_mesh = teammodels[3]['model'];
	player_4_mesh.scaling.x = 	player_4_mesh.scaling.y = 	player_4_mesh.scaling.z = .8;
     player_4_mesh.position = player_position["4"]["position"];
     player_4_mesh.rotate(BABYLON.Axis.Y,player_position["4"]["rotation"], BABYLON.Space.WORLD);
 	player_meshes.push({id:teammodels[3]['id'],mesh:teammodels[3]['model']});

 	this.team.set_team_meshes(player_meshes);

 	game_grid['team'].push({ id:teammodels[3]['id'],position:player_position["4"]["position"]});
     



 	var feartypedata = [];

     var feartypes_models = [];

    var fear_objects = [];

     for(var k = 0; k < fearmodels.length; k++)
     {

         var new_feartype_mesh = fearmodels[k]['model'];
         var name = fearmodels[k]['id'];
  new_feartype_mesh.scaling.x =   new_feartype_mesh.scaling.y =   new_feartype_mesh.scaling.z = .8;

  	 var position = fear_type_position[k]["position"];
     new_feartype_mesh.position = position;
     feartypes_models.push(new_feartype_mesh);

     fear_objects.push(battleLoader.feartypes.create_fear(new_feartype_mesh,name));
     game_grid['feartypes'].push({id:name,position:position});
     var feardata = battleLoader.dataManager.get_data_value('feartypes',name);
     feartypedata.push(feardata);

    }





    //create battle selector 
    var battleselctor = BABYLON.MeshBuilder.CreateCylinder("battleselector", {height: 40, diameter: 4}, this.scene);
    battleselctor.isVisible = false;
    battleselctor.visibility = .5;
    var battleselctormaterial = new BABYLON.StandardMaterial("battleselector-material", this.scene);

    battleselctormaterial.diffuseColor = new BABYLON.Color4(.5, .04, .27,.8);
    battleselctor.position.y = 8;
    battleselctor.position.x = fear_type_position[0]["position"].x;
    battleselctor.position.z = fear_type_position[0]["position"].z;
    battleselctor.material = battleselctormaterial;

    

    //create activeteamselector selector 
    var activeteamselector = BABYLON.MeshBuilder.CreateCylinder("battleselector", {height: 40, diameter: 4}, this.scene);
    activeteamselector.isVisible = false;
    activeteamselector.visibility = .2;
    var activeteamselectormaterial = new BABYLON.StandardMaterial("activeteamselector-material", this.scene);

    activeteamselectormaterial.diffuseColor = new BABYLON.Color4(0, .5, 2.52,.8);
    activeteamselector.position.y = 8;
    activeteamselector.position.x = player_position["1"]["position"].x - 2;
    activeteamselector.position.z = player_position["1"]["position"].z - 2;
    activeteamselector.material = activeteamselectormaterial;
    this.battleManager.set_game_meshes(battleselctor,activeteamselector);

    this.battleManager.set_game_grid(game_grid);
     this.battleManager.set_scene(this.scene);
		this.create_anims();
	
			var currentteam = this.teamdata.get_data_value('teamdata','currentteam');

			var teamdata = this.teamdata.get_data('teamplayerdata');


			this.playerhud.update_team_battle_bar_html(currentteam,teamdata,feartypedata);


	    this.is_loaded = true;
	    this.battleManager.set_team(this.team);
	    this.battleManager.set_player_hud(this.playerhud);
	    this.battleManager.set_fear_types(this.feartypes);
	    this.battleManager.set_players(this.team.get_team_players(),fear_objects);

	    this.battleManager.start_battle();
	}



}