


export class Messages
{
	
constructor()
{
var message = document.getElementById('message');
var message_text = document.getElementById('message-text');
	this.message = message;
	this.message_text = message_text;
	this.active = false;
}



showMessage()
{
addClass(this.message,'show');
this.active = true;
}

hideMessage()
{
removeClass(this.message,'show');
this.active = false;
}

getActive()
{
	return this.active;
}

setMessage(message)
{
this.message_text.innerHTML = message;
}

setAndShowMessage(message){
this.setMessage(message);	
this.showMessage();
}


showAndHideMessage(message,show_speed=1000,duration=1000,end_speed=1000)
{

this.setMessage(message);
var messages = this;
setTimeout(function(){

messages.showMessage();

setTimeout(function(){

setTimeout(function(){
messages.hideMessage();
},end_speed);

},duration);


}, show_speed );

}



}