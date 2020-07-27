


export class AssetManager
{
	
constructor()
{
	this.sounds = {};
	this.modles = {};
	this.scene = false;

}

set_scene(scene)
{
	this.scene = scene;
}


get_sound(sound_name)
{
	return this.sounds[sound_name];
}

load_soudnds()
{
this.sounds['fearwub'] =	 new BABYLON.Sound("fearorb", "./assets/sounds/fearball/fearwub.wav", this.scene, null, {
  loop: true,
  autoplay: true,
  spatialSound: true,
  distanceModel: "exponential",
  rolloffFactor: 1.5
});
this.sounds['fear_orb_die'] =	 new BABYLON.Sound("fear_orb_die", "./assets/sounds/fearball/fearorbdie.wav", this.scene, null, {
  loop: false,
  autoplay: false,
  spatialSound: true,
  distanceModel: "exponential",
  rolloffFactor: 1.5
});
}


}