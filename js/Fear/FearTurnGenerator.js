



export class FearTurnGenerator
{
	


	constructor(dataManager)
	{
 	this.dataManager = dataManager;
 	this.teamdata = false;
	}


	set_team_data(teamdata)
	{
		this.teamdata = teamdata;
	}


	get_turns(feartypes,currentteam)
	{
		console.log('got the turn data!');
		console.log(feartypes);
		console.log(currentteam);

		var turn_data = [];

		var teamlength = currentteam.length;
		var turnGenerator = this;

		feartypes.forEach(function(item,index){
		console.log(item);
		var speed = turnGenerator.dataManager.get_data_value('feartypes',item)['Speed'];
		var totalspeed = speed +   getRandomNumber(0,3);

		var strength = turnGenerator.dataManager.get_data_value('feartypes',item)['Strength'];

		var damage = strength +  getRandomNumber(0,2);

		var target = getRandomNumber(1,teamlength);

			turn_data.push({
				"damage": damage,
				"speed" :totalspeed,
				"target" : target,
				"move" : '',
				"id" : 10

			});



		});




		return turn_data;

	}


	generate_turn()
	{

	}

}