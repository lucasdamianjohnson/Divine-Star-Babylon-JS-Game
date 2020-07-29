


export class Fear
{
	






	constructor(mesh,feardata)
	{

		this.mesh = mesh;
		this.data = feardata;
		this.create_anims();
	}



	hide()
	{
	 console.log('hiding fear mesh');
	 console.log(this.mesh);
	 this.mesh.isVisible = false;
	 this.mesh.visibility = 0;
	// this.mesh.position = new BABYLON.Vector3(0,0, 0);
	}

	show()
	{
	 this.mesh.isVisible = true;
	}


	create_anims()
	{
		    var attack_keys = [];
  var attack = new BABYLON.Animation("animation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var current_z  = this.mesh.position.z;

//ligth out keys
   attack_keys.push({
        frame: 0,
        value: current_z
    });

  
    attack_keys.push({
        frame: 15,
        value: current_z - 15
    });
     attack_keys.push({
        frame: 30,
        value: current_z + 15
    });
    attack.setKeys(attack_keys);
   var attack_animation = new BABYLON.AnimationGroup("attack");

attack_animation.addTargetedAnimation(attack,this.mesh);
attack_animation.normalize(0, 30);
this.attack_animation = attack_animation;
	}

	play_animation()
	{
		console.log('playing animation!')
		this.attack_animation.play(true);
	}

	stop_animation()
	{

	}

}