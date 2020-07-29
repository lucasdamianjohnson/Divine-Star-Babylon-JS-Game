

export class TeamTurnGenerator
{
	
	constructor(teamdata)
	{

		this.teamdata = teamdata;
	
	}


	generate_turn_data(teammember,action,fear)
	{
		console.log(teammember);
		var memberstats = this.teamdata.get_data_value('teamplayerdata',teammember);
		console.log(memberstats);
		var strength = memberstats['Strength'];
		var damage = strength + getRandomNumber(0,3);
		var speed = memberstats['Strength'];

		var turndata = {
			'damage' : damage,
			'speed' : speed,
			'move' : '',
			'target' : fear,
			'id' : teammember
		}

		return turndata;
	}



}