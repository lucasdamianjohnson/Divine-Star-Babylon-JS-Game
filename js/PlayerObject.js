


export class PlayerObject
{

	 callme() {
		console.log('call me')
		console.log(screen);
	}


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
	}
setCameraOnPlayer(set){
this.camera_on_player = set;
if(set){
this.camera.lockedTarget = this.hitbox; 
} else {
//this.camera.lockedTarget = null;
}
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
	    console.log('loading mesh!!');
	
  
		this.getAnim('idle',this.scene.animationGroups);

		this.player_mesh = meshes[0];
		this.player_mesh.isVisible = false;
		this.player_mesh.ellipsoid = new BABYLON.Vector3(1, 3, 2);
		this.player_mesh.ellipsoidOffset = new BABYLON.Vector3(0, 0, 0);

		this.player_mesh.scaling.x = 	this.player_mesh.scaling.y = 	this.player_mesh.scaling.z = .08;


		//this.player_mesh.position.y -= .6;
		//this.player_mesh.position.x -= 0;
		//this.player_mesh.position.z -= .25;
		//this.player_mesh.rotation.z -= 1;

		this.player_mesh.checkCollisions = true;
	


		this.player_mesh.rotationQuaternion.x = 0;  this.player_mesh.rotationQuaternion.z = 0;

		/*var bodyVisible = true;
		this.hitbox = BABYLON.MeshBuilder.CreateCylinder("player_hitbox", {height: .5,diameter: 0.25}, this.scene);
		this.hitbox.position.y =.5;
		this.hitbox.position.x = .9;
		this.hitbox.position.z = 1.3;
		this.hitbox.isVisible = true;
*/
		//shadowGenerator.addShadowCaster(this.player_mesh);
		//shadowGenerator.getShadowMap().renderList.push(this.player_mesh);

		//this.hitbox = mesh[1];

		//this.hitbox.physicsImpostor = new BABYLON.PhysicsImpostor(this.hitbox, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 30,restitution: 0 }, this.scene);



		var hitbox;
		var player = this;
	

		//this.player_mesh.addChild(this.hitbox);


}

getHitbox()
{
	return this.hitbox;
}
setHitBox(hitbox)
{
this.hitbox = hitbox;
if(this.camera_on_player){
this.camera.lockedTarget = this.hitbox; 
}
		//this.player_mesh.addChild(this.hitbox);

}


 addcontrols(inputMap){
 	console.log('adding controls!!!');
 	this.inputMap = inputMap;

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
        	console.log(document.getElementById('menu'))
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
    	this.play_run_stop = true;
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





    moveplayer(x,y){
		

			if(this.hitbox){
						 if(true){
	x = Math.floor(this.current_game_xy.x);
			y = Math.floor(this.current_game_xy.y);


			
					    if((x == 1 && y == 0) || (x == -1 && y == 0)){
					  
					    			if(!this.anim_start){
					    				//this.play_run_stop  = true;
					    			getAnim('idle',scene.animationGroups).play(true);
					    			}
					    		}


					   var rotate_angle = .08;

					    	var xx = this.player_mesh.forward.x * 0;
					       var z = this.player_mesh.forward.z * 0;

					    if(y == -1  || this.inputMap["w"] || this.inputMap["ArrowUp"]){
 				  this.hitbox.physicsImpostor.setLinearVelocity(this.player_mesh.forward.scaleInPlace(1));
							this.anim_start = true;
	
							rotate_angle = .02;
					   }  else  if(y == 1 || this.inputMap["s"] || this.inputMap["ArrowDown"]){
			
					  	this.hitbox.physicsImpostor.setLinearVelocity(this.player_mesh.forward.scaleInPlace(1));

					    } 

					     else {
					    
					     this.anim_start = false;
					     this.play_run_stop  = true;
					 	this.hitbox.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
					 	 this.hitbox.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));

					        }


					   if(x == -1 || this.inputMap["a"] || this.inputMap["ArrowLeft"]){
					// this.player_mesh.parent.rotate(BABYLON.Axis.Y, -.03, BABYLON.Space.WORLD);
					 this.hitbox.rotate(BABYLON.Axis.Y, -rotate_angle, BABYLON.Space.WORLD);
					    } 
					
					  if(x == 1 || this.inputMap["d"] || this.inputMap["ArrowRight"]){			  
					  // this.player_mesh.parent.rotate(BABYLON.Axis.Y, .03, BABYLON.Space.WORLD);
					     this.hitbox.rotate(BABYLON.Axis.Y, rotate_angle, BABYLON.Space.WORLD);
					    }


			}
}
}






update()
{
	if(this.hitbox && this.scene){
		if(true){

if (this.hitbox.intersectsMesh(this.scene.test, false)) {
console.log('this worked!!')
} else {
 
}



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
	

			if(this.movement_mode == 'keyboard'){

			if (this.inputMap["w"] || this.inputMap["ArrowUp"] || this.inputMap["a"] || this.inputMap["ArrowLeft"] || this.inputMap["d"] 
				|| this.inputMap["ArrowRight"] || this.inputMap["s"] || this.inputMap["ArrowDown"]){
			this.player_moving = true;
			console.log('player moving')
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


			if(this.player_moving){
		
				if(!this.anim_start){
					console.log('play run');
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
								console.log('play run stop');
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


	}



}



}