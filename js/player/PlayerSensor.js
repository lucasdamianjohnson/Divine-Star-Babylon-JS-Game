


export class PlayerSesnor
{



call_me()
{
	console.log('hello from sesnor!');
}



constructor(scene,mesh)
{

	this.mesh = mesh;
	mesh.isVisible = false;
	this.scene = scene;
	this.active = false;

}


set_mesh(mesh)
{

	this.mesh = mesh;

}


check_objects(looking_for)
{
	var sensor = this;
	var var_return = false;
	console.log(`looking for: ${looking_for}`);
	this.scene.interactive_objects.forEach(function(item,index) {


	if (sensor.mesh.intersectsMesh(item, false)) {
		console.log(item.name);
		if(item.name == looking_for) {
		console.log('found it!');

		item 
		item.setEnabled(false);
		console.log(item.isEnabled());
		//var_return = item;
		//item.isVisible = false;

  	   
  	   // item = null;
  	    sensor.scene.interactive_objects.splice(index,1);

		return;
		}
	}


	});
//console.log('checked objects');
//console.log(var_return);

//return var_return;
}

setMessages(messages)
{
	this.messages = messages;
}
update()
{
if(this.mesh){
if (this.mesh.intersectsMesh(this.scene.test, false)) {

if(!this.messages.getActive()){
	this.messages.setAndShowMessage('Your are touching this mesh.');
}

} else {
 
if(this.messages.getActive()){
	this.messages.hideMessage();
}

}
}


}


}