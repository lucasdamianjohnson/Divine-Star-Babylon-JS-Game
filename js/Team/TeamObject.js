import {TeamPlayer} from './TeamPlayer.js';
import {TeamTurnGenerator} from './TeamTurnGenerator.js';
export class TeamObject
{
	constructor(teamdata,dataManager)
	{

		this.teamdata = teamdata;
		this.meshes = false;
		this.players = [];
		this.turnGenerator = new TeamTurnGenerator(teamdata,dataManager);
	}


	set_team_meshes(meshes)
	{
		var team = this;
		meshes.forEach(function(item,index){
			team.players.push( new TeamPlayer(item,team.teamdata));
		});
		this.meshes = meshes;
	}


	generate_turn_data(teammember,action,fear)
	{
		return this.turnGenerator.generate_turn_data(teammember,action,fear)
	}

	get_team_players()
	{
		return this.players;
	}



}