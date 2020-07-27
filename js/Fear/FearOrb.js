


export class FearOrb
{
	
	constructor(id,orbdata)
	{
		this.scene = false;
		this.mesh = false;
		this.sound = false;
		this.sound_die = false;
		this.player = false;
		this.teamdata = false;
		this.id = id;
 	this.hitbox = false;
 	this.assets = false;
 	this.fear_types = false;
 	this.orbdata = orbdata;
 	   this.player_hud = false;
     this.light = false;
     this.particle_system = false;
	}

set_player_hud(player_hud)
{
	this.player_hud = player_hud;
}
set_fear_types(fear_types)
{
	this.fear_types = fear_types;
}
set_team_data(teamdata)
{
this.teamdata = teamdata;
}
set_player(player)
	{
	this.player = player;
	}

set_assets_manager(assetManager)
{
this.assets = assetManager;
}


	set_scene(scene)
	{
		this.scene = scene;
	}

delete_self()
{
	this.fear_types.destroy(this.id,'fearorb');
}

on_asorb()
{

    this.mesh.dispose();
    this.hitbox.dispose();
    this.mesh = null;
    delete this.mesh;
    this.hitbox = null;
    delete this.hitbox;
    this.sound.stop();
    this.sound_die.play();
    var orb = this;
    this.player.get_actions().set_action('fearscene',function(sceneManager,teamdata){
        var scene = orb.orbdata['fearscene']
        console.log(scene);
       sceneManager.set_active_scene('fear',scene);
      teamdata.cancel_fear_prompt(function(sceneManager){
   
            
      });
     
    });
      var teamdata = this.teamdata;
     this.teamdata.prompt_fear_update(function(){
      teamdata.add_to_data('fear-types-total',1);
      teamdata.add_to_fear_inventory(orb.orbdata);
    });

    //this.fear_types.set_scene_standby(scene);




   this.delete_self();
}

	create_anims()
	{
    var particle_shrink_min_keys = [];
    var particle_shrink_max_keys = [];
var particle_shrink_min = new BABYLON.Animation("animation", "minSize", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var particle_shrink_max = new BABYLON.Animation("animation", "maxSize", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
   particle_shrink_max_keys.push({
        frame: 0,
        value: .09
    });

     particle_shrink_max_keys.push({
        frame: 5,
        value: 0
    });
   particle_shrink_min_keys.push({
        frame: 0,
        value: .01
    });

     particle_shrink_min_keys.push({
        frame: 5,
        value: 0
    });


particle_shrink_min.setKeys(particle_shrink_min_keys);
particle_shrink_max.setKeys(particle_shrink_max_keys);
    var light_out_keys = [];
  var light_out = new BABYLON.Animation("animation", "intensity", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);


//ligth out keys
   light_out_keys.push({
        frame: 0,
        value: 2
    });

  
    light_out_keys.push({
        frame: 15,
        value: 0
    });
    light_out.setKeys(light_out_keys);
   var light_out_animation = new BABYLON.AnimationGroup("fear_orb_shrink-"+this.id);

light_out_animation.addTargetedAnimation(light_out,this.light);
light_out_animation.addTargetedAnimation(particle_shrink_min,this.particle_system);
light_out_animation.addTargetedAnimation(particle_shrink_max,this.particle_system);
light_out_animation.normalize(0, 15);
this.light_out_animation = light_out_animation;

   var shrinkz = new BABYLON.Animation("animation", "scaling.z", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

var shrink_keys = [];
    var shrinkz = new BABYLON.Animation("animation", "scaling.z", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var shrinky = new BABYLON.Animation("animation", "scaling.y", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var shrinkx = new BABYLON.Animation("animation", "scaling.x", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
   shrink_keys.push({
        frame: 0,
        value: 1
    });

     shrink_keys.push({
        frame: 15,
        value: 0
    });

 shrinkz.setKeys(shrink_keys);
 shrinky.setKeys(shrink_keys);
 shrinkx.setKeys(shrink_keys);

    var shrink_animation = new BABYLON.AnimationGroup("fear_orb_shrink-"+this.id);
    shrink_animation.addTargetedAnimation(shrinkz, this.mesh);
    shrink_animation.addTargetedAnimation(shrinky, this.mesh);
    shrink_animation.addTargetedAnimation(shrinkx, this.mesh);

   shrink_animation.normalize(0, 15);

   this.shrink_animation = shrink_animation;
   var orb = this;
   this.shrink_animation.onAnimationGroupEndObservable.addOnce(function(){
   	console.log('it eneded!!');

    orb.on_asorb();



   });
var keys2 = [];
    var animation2 = new BABYLON.Animation("animation", "position.y", 40, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    var animation = new BABYLON.Animation("animation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
   
                                                                 BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

animation.framePerSecond = 80;

    keys.push({
        frame: 0,
        value: 6.5
    });

    keys.push({
        frame: 100,
        value: 0
    });

     keys2.push({
        frame: 0,
        value: .5
    });

    keys2.push({
        frame: 50,
        value: .7
    });
     keys2.push({
        frame: 100,
        value: .5
    });

    animation.setKeys(keys);
    animation2.setKeys(keys2);




    var idle_animation = new BABYLON.AnimationGroup("fear_orb_idle-"+this.id);
    idle_animation.addTargetedAnimation(animation, this.mesh);
    idle_animation.addTargetedAnimation(animation2, this.mesh);


   idle_animation.normalize(0, 100);


  idle_animation.play(true);

this.rotate_animation = animation;
this.up_and_down_animation = animation2;


	}


	play_shrink()
	{
		

		this.shrink_animation.play();
    this.light_out_animation.play();
	}


	create_orb(orb_position)
	{

 var fountainparent = BABYLON.MeshBuilder.CreateSphere("fountain", { diameter: .3}, this.scene);
 fountainparent.isVisible = false;
fountainparent.physicsImpostor =  new BABYLON.PhysicsImpostor(fountainparent, BABYLON.PhysicsImpostor.SphereImpostor, 
			{ damping: 100, friction: 5, mass: 10, restitution: 0,  }, this.scene);

fountainparent.physicsImpostor.physicsBody.collisionFilterGroup = 1 | 3;
fountainparent.physicsImpostor.physicsBody.collisionFilterMask = 2;
 fountainparent.position = orb_position;


 var partilelight = new BABYLON.PointLight("partilelight", new BABYLON.Vector3(2, .6, 0), this.scene);
    partilelight.diffuse = new BABYLON.Color3(1, 0, 1);
    partilelight.specular = new BABYLON.Color3(1, 1, 1);
    partilelight.intensity = 2;
    partilelight.position = new BABYLON.Vector3(-.05, -.05, 0);
    this.light = partilelight;
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, partilelight);

	shadowGenerator.useExponentialShadowMap = true;
  var fountain = BABYLON.MeshBuilder.CreateSphere("fountain", { diameter: .1}, this.scene);
   var fchild1 = BABYLON.MeshBuilder.CreateSphere("fountain", { diameter: .1}, this.scene);
   var fchild2 = BABYLON.MeshBuilder.CreateSphere("fountain", { diameter: .1}, this.scene);
   var fchild3 = BABYLON.MeshBuilder.CreateSphere("fountain", { diameter: .1}, this.scene);
  
 	fchild1.position = new BABYLON.Vector3(-.05, -.05, 0);
	 fchild2.position = new BABYLON.Vector3(.05, -.05, 0);
	 fchild3.position = new BABYLON.Vector3(0, -.1, 0);
    var fmaterial = new BABYLON.StandardMaterial("fountain", this.scene);
    fountain.material = fmaterial;
    fchild1.material = fmaterial;
    fchild2.material = fmaterial;
    fchild3.material = fmaterial;
    fchild1.parent = fountain;
    fchild2.parent = fountain;
    fchild3.parent = fountain;
    fountain.visibility = .5;
      fchild1.visibility = .5;
        fchild2.visibility = .5;
          fchild3.visibility = .5;
   // fountain.alpha = .5;
   partilelight.parent = fountain;
   fmaterial.diffuseColor = new BABYLON.Color4(.5, 0, .5,.1);
    //    fmaterial.diffuseTexture = new BABYLON.Texture("assets/black1.jpg", scene);
  fmaterial.hasAlpha = true;
    //fmaterial.backFaceCulling = false;
   
  fmaterial.transperancy = .5;


 var particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
   particleSystem.particleTexture = new BABYLON.Texture("assets/particles/orb1.jpg", this.scene);


    // Where the particles come from
    particleSystem.emitter = fountain; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(.2, 0,.2, 1.0);
    particleSystem.color2 = new BABYLON.Color4(.5, 0,.5, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(.1, 0, .1, 0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.09;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.03;
    particleSystem.maxLifeTime = .5;

    // Emission rate
    particleSystem.emitRate = 1000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
    particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = .1;
    particleSystem.maxEmitPower = .2;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();

this.particle_system = particleSystem;


 this.sound = this.assets.get_sound('fearwub');
this.sound.attachToMesh(fountain);
this.sound_die = this.assets.get_sound('fear_orb_die');
this.sound_die.attachToMesh(fountain);


fountain.position = new BABYLON.Vector3(0,0, 0);

fountain.parent = fountainparent;

//fountain.rotationQuaternion.x = 0;  fountain.rotationQuaternion.z = 0;		

console.log(fountain.rotation);


this.mesh = fountain;
this.hitbox = fountainparent;


this.create_anims();

	}



physicsupdate()
{		

if(this.hitbox){
	this.hitbox.rotationQuaternion.x = 0;  
			this.hitbox.rotationQuaternion.z = 0;
	//this.hitbox.rotationQuaternion.y = 0;
			//this.mesh.rotationQuaternion.x = 0;  
			if(this.mesh){
			   //this.mesh.rotation =  new BABYLON.Vector3(this.mesh.rotation.x,this.mesh.rotation.y, this.mesh.rotation.z);
			   this.mesh.rotation.x = 0;
		    }
           	var player_position = this.player.getPosition();
           	var sphere_position = this.hitbox.position;
           	var xx = (player_position.x - sphere_position.x) * -1;
			var zz = (player_position.z - sphere_position.z) * -1;
					
				if(  (xx < 2.5 && zz < 2.5)  ) {
					this.rotate_animation.framePerSecond = 40;
				}
				if( (xx < 2 && zz < 2)  ) {
					this.rotate_animation.framePerSecond = 100;
				}
				if(xx < 1.7 && zz < 1.7 && (xx > .8 || zz > .8)){
               	this.rotate_animation.framePerSecond = 100;
                var vector = this.hitbox.position.subtract( this.player.getPosition()).normalize().scale(-.1);
                this.hitbox.applyImpulse(vector, this.hitbox.getAbsolutePosition());

            } else if(xx < .8 && zz < .8 ){
     			this.rotate_animation.framePerSecond = 80;
            	var vector = this.hitbox.position.subtract( this.player.getPosition()).normalize().scale(-.01);
                this.hitbox.applyImpulse(vector, this.hitbox.getAbsolutePosition());
                this.play_shrink();
            }


}



}

}