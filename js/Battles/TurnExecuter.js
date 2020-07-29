
export class TurnExecuter
{
	constructor()
	{

		this.teamturndata = false;
		this.fearturndata = false;
		this.team = false;
		this.feartypes = false;
		this.teamplayers = false;
		this.fearplayers = false;

	}

	set_turn_data(teamturn,fearturn){
		this.teamturndata = teamturn;
		this.fearturndata = fearturn;
	}

	start()
	{
		console.log('TURN EXECTUER START!');
		console.log(this.teamturndata);
		console.log(this.fearturndata);
		console.log(this.teamplayers);
		console.log(this.fearplayers);

		this.teamplayers.forEach(function(item,index){
			item.hide();
		});
		this.fearplayers.forEach(function(item,index){
			item.play_animation();
		});
	}


	set_players(teamplayers,fearplayers)
	{
		this.teamplayers = teamplayers;
		this.fearplayers = fearplayers;
	}


}