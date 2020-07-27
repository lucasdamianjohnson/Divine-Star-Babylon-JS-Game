import {PlayerSesnor} from './PlayerSensor.js'
import {TeamPlayers} from './TeamPlayers.js'
import {PlayerActions} from './PlayerActions.js'
export class PlayerObject
{



	constructor(){
		this.player_mesh = false;
		this.hitbox = false;
		this.player_moving = false;
		this.current_game_xy = {x:0,y:0};
		this.play_run_stop = false;
		this.anim_start = false;
		this.run_stop_buffer_current_steps = 0;
		this.run_stop_buffer_steps = 10;
		this.scene = false;
		this.inputMap = {};
		this.camera = false;
		this.movement_mode = 'joystick'
		this.camera_on_player = true;
		this.sensor = false;
		this.current_move_key = '';
		this.player_actions = new PlayerActions();
		this.scene_manager = false;
		this.teamdata = false;
	}

set_team_data(teamdata){
	this.teamdata = teamdata;
	this.player_actions.set_team_data(teamdata);
}

setCameraOnPlayer(set){
this.camera_on_player = set;
if(set){
this.camera.lockedTarget = this.hitbox; 
} else {
//this.camera.lockedTarget = null;
}
}

set_scene_manager(sceneManager)
{
	this.scene_manager = sceneManager;
	this.player_actions.set_scene_manager(sceneManager);
}
getHitbox()
{
	return this.hitbox;
}
isReady()
{
	return this.player_mesh;
}

getPosition()
{

	return this.hitbox.position;
}

setMessages(messages)
{

this.sensor.setMessages(messages);
}

setScene(scene){
	this.scene = scene;
}
setCamera(camera){
   this.camera = camera;
}

setMovementMode(mode)
{
	this.movement_mode = mode; 
}

 getAnim(name,animations){

	var varreturn = null;
		animations.forEach(function(anim,index){
			
    					if(anim.name == name) {
    					
    						varreturn = anim;
    					}
    			
    		});
		return varreturn;
}


setModel(meshes){

	
  var hitbox = BABYLON.MeshBuilder.CreateCylinder("playerhitbox", {height: .5, diameter: .2}, this.scene);
    hitbox.position = new BABYLON.Vector3(1, .5, 0);
var playersesnor =  BABYLON.MeshBuilder.CreateSphere("sesnor", { diameter: .3}, this.scene);
var player = this;
    playersesnor.position = new BABYLON.Vector3(0, .5, .1);

		meshes.forEach(function(mesh,index){


		if(mesh.name == '__root__') {
		player.player_mesh = mesh;
		mesh.parent = hitbox;
		playersesnor.parent = hitbox;
		hitbox.physicsImpostor =  new BABYLON.PhysicsImpostor(hitbox, BABYLON.PhysicsImpostor.CylinderImpostor, 
			{ damping: 100, friction: 5, mass: 10, restitution: 0,  }, player.scene);
		hitbox.physicsImpostor.physicsBody.collisionFilterGroup = 1 | 2

		hitbox.isVisible = false;
		player.hitbox = hitbox;
		}

		});

		this.camera.lockedTarget = this.hitbox;
		this.getAnim('idle',this.scene.animationGroups);


																
	this.getAnim('idle',this.scene.animationGroups).enableBlending = true;
	this.getAnim('idle',this.scene.animationGroups).blendingSpeed = 0.01;
	this.getAnim('running',this.scene.animationGroups).enableBlending = true;
	this.getAnim('running',this.scene.animationGroups).blendingSpeed = 0.01;
	this.getAnim('running_stop',this.scene.animationGroups).enableBlending = true;
	this.getAnim('running_stop',this.scene.animationGroups).blendingSpeed = 0.01;

		this.player_mesh.isVisible = false;
		this.player_mesh.ellipsoid = new BABYLON.Vector3(1, 3, 2);
		this.player_mesh.ellipsoidOffset = new BABYLON.Vector3(0, 0, 0);

		this.player_mesh.scaling.x = 	this.player_mesh.scaling.y = 	this.player_mesh.scaling.z = .08;


		this.player_mesh.checkCollisions = true;

		this.player_mesh.rotationQuaternion.x = 0;  this.player_mesh.rotationQuaternion.z = 0;		

		this.sensor = new PlayerSesnor(this.scene,playersesnor);
	


}

getHitbox()
{
	return this.hitbox;
}

get_actions()
{
	return this.player_actions;
}
do_action()
{
		this.player_actions.do_action();
}



 addcontrols(inputMap){

 	this.inputMap = inputMap;


this.scene.audioListenerPositionProvider = () => {
  // Returns a static position

  return this.hitbox.absolutePosition;
};



this.scene.onKeyboardObservable.add((kbInfo) => {

     if(kbInfo.type ==  BABYLON.KeyboardEventTypes.KEYUP){
         if(kbInfo.event.key == 'x'){
         		this.sensor.check_objects('test');
         }
         if(kbInfo.event.key == 'z'){
         		this.do_action();
         }
     }

    if(kbInfo.type ==  BABYLON.KeyboardEventTypes.KEYDOWN){
    
         if(kbInfo.event.key == 'w' || kbInfo.event.key == 's' || kbInfo.event.key == 'ArrowUp' || kbInfo.event.key == 'ArrowDown'){
         	         this.player_moving = true;
         			 this.current_move_key = 'w'
         	        
        }

        if( this.current_move_key != 'w'){
        	if(kbInfo.event.key == 'a' || kbInfo.event.key == 'd' || kbInfo.event.key == 'ArrowLeft' || kbInfo.event.key == 'ArrowRight'){
        		 this.player_moving = true;
         		 this.current_move_key = 's'
        	}
        }

     }
    if(kbInfo.type ==  BABYLON.KeyboardEventTypes.KEYUP){


         if(kbInfo.event.key == 'w' || kbInfo.event.key == 's' || kbInfo.event.key == 'ArrowUp' || kbInfo.event.key == 'ArrowDown' ){
         		this.play_run_stop = true;
         		this.player_moving = false;
         		console.log('calling stop')
         		this.current_move_key = '';
         }
         if( (kbInfo.event.key == 'a' || kbInfo.event.key == 'd'
         	|| kbInfo.event.key == 'ArrowLeft' || kbInfo.event.key == 'ArrowRight')
         	 && !(this.current_move_key == 'w')){
         	    console.log(this.current_move_key == 'w');
         		this.play_run_stop = true;
         		this.player_moving = false;
         }


     }
  
});





	var gamepadManager = new BABYLON.GamepadManager();
gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{
    gamepad.onButtonDownObservable.add((button, state)=>{
        //Button has been pressed
 
        if(button == 9) {
        	var dis = document.getElementById('menu').style.display;
        	if(dis == 'block'){
        	document.getElementById('menu').style.display = 'none';
        	} else {
        	document.getElementById('menu').style.display = 'block';
        	}

        }
    })
    /*
    * right =  x->1
    * left =  x->-1
    * up = y->-1
    * down = y->1
    */
    gamepad.onleftstickchanged((values)=>{
    	var x = Math.floor(values.x);
    	var y = Math.floor(values.y);
    

    	if(x == 0 && y == 0) {
    	this.player_moving = false;
   
    	} else {
    	this.player_moving = true;
    	}
     	this.current_game_xy.x = x;
    	this.current_game_xy.y = y;
        //Left stick has been moved

       // moveplayer(values.x,values.y)
    })
     gamepad.onrightstickchanged((values)=>{
     	var x = Math.floor(values.x);
    	var y = Math.floor(values.y);
    	if(x != 0 && y != 0) {
    	this.player_moving = true;

    	} else {
    	this.player_moving = false;
    	}
    	this.current_game_xy.x = x;
    	this.current_game_xy.y = y;
        //Left stick has been moved

       // moveplayer(values.x,values.y)
    })
}
);


}


player_movement()
{
			if(this.player_moving){
		
		
				if(!this.anim_start){
				
					this.getAnim('idle',this.scene.animationGroups).stop();
					this.getAnim('running',this.scene.animationGroups).play(true);

					this.anim_start = true;
				}
				this.moveplayer();
			} else {
			this.hitbox.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
				this.hitbox.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
				if(this.play_run_stop){
					if(!this.anim_start){
			
						this.getAnim('running',this.scene.animationGroups).stop();
						this.getAnim('running_stop',this.scene.animationGroups).play(true);
						this.anim_start = true;
					}

					if(this.run_stop_buffer_current_steps < this.run_stop_buffer_steps){
						this.run_stop_buffer_current_steps++;
					} else if(this.run_stop_buffer_current_steps == this.run_stop_buffer_steps) {
						this.run_stop_buffer_current_steps = 0;
						this.play_run_stop = false;

					}

				} else {
					this.getAnim('running_stop',this.scene.animationGroups).stop();
					this.getAnim('idle',this.scene.animationGroups).play(true);
					this.anim_start = false;	
				}
			}	
}


    moveplayer(x,y){
		

			if(this.hitbox){



			    if(y == -1  || this.inputMap["w"] || this.inputMap["ArrowUp"]){
			    			rotate_angle = .02;
			    }
					
	   var rotate_angle = .08;
   if(x == -1 || this.inputMap["a"] || this.inputMap["ArrowLeft"]){
					// this.player_mesh.parent.rotate(BABYLON.Axis.Y, -.03, BABYLON.Space.WORLD);
					 this.hitbox.rotate(BABYLON.Axis.Y, -rotate_angle, BABYLON.Space.WORLD);
					    } 
					
					  if(x == 1 || this.inputMap["d"] || this.inputMap["ArrowRight"]){			  
					  // this.player_mesh.parent.rotate(BABYLON.Axis.Y, .03, BABYLON.Space.WORLD);
					     this.hitbox.rotate(BABYLON.Axis.Y, rotate_angle, BABYLON.Space.WORLD);
					    }

    if((x == 1 && y == 0) || (x == -1 && y == 0)){
					  
					    			if(!this.anim_start){
					    				//this.play_run_stop  = true;
					    			getAnim('idle',scene.animationGroups).play(true);
					    			return;
					    			}
					    		}

				

					    	var xx = this.player_mesh.forward.x * 0;
					       var z = this.player_mesh.forward.z * 0;

					    if(y == -1  || this.inputMap["w"] || this.inputMap["ArrowUp"]){
 				  this.hitbox.physicsImpostor.setLinearVelocity(this.player_mesh.forward.scaleInPlace(1));
							this.anim_start = true;
	
					
					   }  else  if(y == 1 || this.inputMap["s"] || this.inputMap["ArrowDown"]){
			
					  	this.hitbox.physicsImpostor.setLinearVelocity(this.player_mesh.forward.scaleInPlace(-1));

					    } 

					     else {
					    
					     this.anim_start = false;
					  
					 	this.hitbox.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
					 	 this.hitbox.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));

					        }


					

		
}
}






update()
{
	if(this.hitbox && this.scene){

this.sensor.update();







			this.hitbox.rotationQuaternion.x = 0;  
			this.hitbox.rotationQuaternion.z = 0;
			//this.hitbox.rotationQuaternion.y = 0;
			this.player_mesh.rotationQuaternion.x = 0;
			this.player_mesh.rotationQuaternion.z = 0;

			//console.log(this.camera.rotationQuaternion.z);
			if(this.camera_on_player){
			this.camera.position.x = this.hitbox.position.x + 0;
			this.camera.position.y = this.hitbox.position.y + 6;
			this.camera.position.z = this.hitbox.position.z - 3;
		}
	this.player_movement();
			/*
			if(this.movement_mode == 'keyboard'){

			if (this.inputMap["w"] || this.inputMap["ArrowUp"] || this.inputMap["a"] || this.inputMap["ArrowLeft"] || this.inputMap["d"] 
				|| this.inputMap["ArrowRight"] || this.inputMap["s"] || this.inputMap["ArrowDown"]){
			this.player_moving = true;
	
			} else {
			this.player_moving = false;

			}
			}


			if(this.movement_mode == 'joystick') {
				if( (this.current_game_xy.x != 0 || this.current_game_xy.y != 0)  &&  !(this.current_game_xy.x == 0 && this.current_game_xy.y == 0)) {
					this.player_moving = true;
				} else {
					this.player_moving = false;

				}

			}
*/


	}



}



}