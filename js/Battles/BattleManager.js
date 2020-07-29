import {TurnExecuter} from './TurnExecuter.js';

export class BattleManager
{


	constructor()
	{
		this.picker_mesh = false;
		this.active_team_mesh = false;
		this.game_grid = false;
		this.scene = false;
		//modes include team and fear
		this.current_battle_select_mode = 'fear';

		//modes include selectactions selectfear selectteam runturn
		this.current_battle_mode = 'selectactions';

		this.current_team_selection = 0;
		this.current_fear_selection = 0;
		this.current_fear_row = 1;
		this.playerhud = false;

		this.current_battle_option_select = 0;
		this.current_battle_option_select_row = 1;
		this.battleoptions = [
			'Use Force','Cast Spell','Summon','Use Item','Try To Flee','Fear Type Stats'
		]
		this.battleoptions_length = this.battleoptions.length;
		/*
		[0][1]
		[2][3]
		[4][5]
		*/

		this.feartypes = false;
		this.active_team_member = 0;

		this.turn_excuter = new TurnExecuter();

		this.team_turn_data = [];
		this.teamplayers = false;
		this.fearplayers = false;
	}

	set_players(teamplayers,fearplayers)
	{
		this.teamplayers = teamplayers;
		this.fearplayers = fearplayers;
		this.turn_excuter.set_players(teamplayers,fearplayers);
	}

	clear_turn_data(){
		this.team_turn_data = null;
		this.team_turn_data = [];
	}

	remove_last_turn_data(){
		this.team_turn_data.pop();
	}

	add_to_turn_data(teammember,action,fear)
	{
		console.log(this.team);
		var turn = 	this.team.generate_turn_data(teammember,action,fear);
		this.team_turn_data.push(turn);

	}


	set_team(team)
	{
		this.team = team;
	}

	set_fear_types(feartypes)
	{
		this.feartypes = feartypes;
	}

	get_fear_turns()
	{
	var feartypes = [];


	  this.game_grid['feartypes'].forEach( function(item, index) {
	  		feartypes.push(item['id']);
	  });
	var currentteam = [];
	  this.game_grid['team'].forEach( function(item, index) {
	  		currentteam.push(item['id']);
	  });
	  return this.feartypes.get_turns(feartypes,currentteam);
	}



	set_player_hud(playerhud)
	{
		this.playerhud = playerhud;
	}

	set_scene(scene)
	{
		this.scene = scene;	
	}

	set_game_grid(game_grid){
		this.game_grid = game_grid;
		this.team_length = game_grid.team.length;
		this.fear_length = game_grid['feartypes'].length;
	}

	set_game_meshes(pickermesh,activeteammesh)
	{
		this.picker_mesh = pickermesh;
		this.active_team_mesh = activeteammesh;
	}

	turn_on_picker_mesh(){
		this.picker_mesh.isVisible = true;
	}

	turn_off_picker_mesh(){
		this.picker_mesh.isVisible = false;
	}

	turn_on_active_team_mesh(){
		this.active_team_mesh.isVisible = true;
	}

	turn_off_active_team_mesh(){
		this.active_team_mesh.isVisible = false;
	}

	set_active_team_mesh_on_player(player)
	{
		var position = this.game_grid['team'][player]['position'];
		this.active_team_mesh.position.y = 8;
		this.active_team_mesh.position.x = position.x - 2;
		this.active_team_mesh.position.z = position.z - 2;

	}

	set_picker_mesh_position(position)
	{
		this.picker_mesh.position.y = 8;
		//	this.picker_mesh.position.x = position.x - 2;
		//	this.picker_mesh.position.z = position.z - 2;
		this.picker_mesh.position.x = position.x;
		this.picker_mesh.position.z = position.z;
	}

	move_pick_mesh(direction) {

	
		if(this.current_battle_select_mode == 'team') {

			if(direction == 'up' ){
			if(this.current_team_selection == this.team_length - 1) {
				return;
			}
			this.current_team_selection++;
			}

			if(direction == 'down' ){
			if(this.current_team_selection == 0) {
				return;
			}
 		      this.current_team_selection--;
			}
			 
		   console.log(this.current_team_selection);

			var position = this.game_grid['team'][this.current_team_selection]['position'];
			this.set_picker_mesh_position(position);


		}
/*
*  2   1
*     [4]
* [8] [3]
* [7] [2]
* [6] [1]
* [5] [0] 
	this.current_fear_row 
	this.fear_length
	this.current_fear_selection
*/
		if(this.current_battle_select_mode == 'fear') {
				console.log(`called move pick mesh ${direction}`);
					if(direction == 'up' ){

					

						if(this.current_fear_selection == this.fear_length - 1){
							return;
						}

						this.current_fear_selection++;
					    if(this.current_fear_selection < 4) {
					    	this.current_fear_row = 1
					    }
					    if(this.current_fear_selection >= 5) {
					    	this.current_fear_row = 2
					    }

					}
					if(direction == 'down' ){

					

						if(this.current_fear_selection == 0){
							return;
						}

						this.current_fear_selection--;
						if(this.current_fear_selection < 4) {
					    	this.current_fear_row = 1
					    }
					    if(this.current_fear_selection >= 5) {
					    	this.current_fear_row = 2
					    }		

					}
					if(direction == 'left' ){

						if(this.current_fear_row == 1) {
							if(typeof this.game_grid['feartypes'][this.current_fear_selection + 5] == 'undefined') {
								return;
							}
							this.current_fear_selection += 5;
							this.current_fear_row = 2;
						}

					}
					if(direction == 'right' ){
						if(this.current_fear_row == 2) {
							if(typeof this.game_grid['feartypes'][this.current_fear_selection - 5] == 'undefined') {
								return;
							}
							this.current_fear_selection -= 5;
							this.current_fear_row = 1;
						}

					}



					var position = this.game_grid['feartypes'][this.current_fear_selection]['position'];
					console.log(this.current_fear_selection);
					console.log(this.current_fear_row);

					this.set_picker_mesh_position(position);
		}

	}


	start_battle()
	{


		var battleManger = this;
		setTimeout(function(){
			battleManger.active_team_mesh.isVisible = true;
			battleManger.playerhud.update_action_team_battle_bar_option(0,'active');
			battleManger.add_controls();
		}, 2000);
	}


	start_turns()
	{
		var fear_turns = this.get_fear_turns();

		this.turn_excuter.set_turn_data(this.team_turn_data,fear_turns);
		this.turn_excuter.start();

		
	}



	move_battle_option_select(direction){
	
		

		if(direction == 'up'){
			if(this.current_battle_option_select == 0 || this.current_battle_option_select == 1){
				return;
			}
			this.current_battle_option_select -= 2;
		}

		if(direction == 'down'){
			if(this.current_battle_option_select == this.battleoptions_length - 1
			|| this.current_battle_option_select == this.battleoptions_length - 2){
				return;
			}
			this.current_battle_option_select += 2;
		}

		if(direction == 'left'){
		 if(this.current_battle_option_select_row == 1) {
		 	return;
		 }
		if(this.current_battle_option_select_row == 2) {

			this.current_battle_option_select -= 1;
			this.current_battle_option_select_row = 1;
		}

		}

		if(direction == 'right'){
		 if(this.current_battle_option_select_row == 2) {
		 	return;
		 }

	    if(this.current_battle_option_select_row == 1) {

			this.current_battle_option_select += 1;
			this.current_battle_option_select_row = 2;
		}

		}

		this.playerhud.update_action_team_battle_bar_option(this.current_battle_option_select,"active");
	}

//	this.active_team_member = 0;
//	battleManger.playerhud.update_action_team_battle_bar_option(0,"active");
	finalize_option(option)
	{
	 var option = this.battleoptions[option]; 
		if(option == 'Use Force') {
				this.current_battle_mode = 'selectactions';
				this.turn_off_picker_mesh();
				var fear = this.game_grid['feartypes'][this.current_fear_selection]['id'];
				var teammember = this.game_grid['team'][this.active_team_member]['id'];
				this.add_to_turn_data(teammember,'Use Force',fear)
			

			}
		    if(option == 'Cast Spell') {

				
			}
			if(option == 'Try To Flee')
			{


			}
			if(option == 'Fear Type Stats')
			{


			}



				if(this.active_team_member<3){
				this.active_team_member++;
				this.set_active_team_mesh_on_player(this.active_team_member);
				} else {
					console.log('TURN BEGIN!!');
					this.active_team_member = 0;
					this.turn_off_active_team_mesh();
					this.set_active_team_mesh_on_player(0);
					this.start_turns();
				}

	}

	do_option(option)
	{

	 var option = this.battleoptions[option]; 
			//'Use Force','Cast Spell','Summon','Use Item','Try To Flee','Fear Type Stats'
		 console.log(`do option ${option}`);
			if(option == 'Use Force') {
				this.current_battle_mode = 'selectfear';
				this.turn_on_picker_mesh();
			}
		    if(option == 'Cast Spell') {

				
			}
			if(option == 'Try To Flee')
			{


			}
			if(option == 'Fear Type Stats')
			{


			}


	}
	un_do_option(option){
    

	 var option = this.battleoptions[option]; 
	 console.log(`undo option ${option}`);
			//'Use Force','Cast Spell','Summon','Use Item','Try To Flee','Fear Type Stats'
			if(option == 'Use Force') {
				this.current_battle_mode = 'selectactions';
				this.turn_off_picker_mesh();
			}
		    if(option == 'Cast Spell') {

				
			}
			if(option == 'Try To Flee')
			{


			}
			if(option == 'Fear Type Stats')
			{


			}

	}

	add_controls()
	{
		var battleManger = this;

		this.scene.onKeyboardObservable.add((key) => {

     if(key.type ==  BABYLON.KeyboardEventTypes.KEYUP){
     	   console.log('key up! ' + key.event.key)

			if(key.event.key == 'x' ) {

			 if(battleManger.current_battle_mode == 'selectfear'){
     	   		battleManger.playerhud.update_action_team_battle_bar_option(battleManger.current_battle_option_select,"active");

     	   			battleManger.un_do_option(battleManger.current_battle_option_select);
     	   			return;
     	   		}
     	   	}
     	   if(key.event.key == 'z' ) {
     	   		
			 if(battleManger.current_battle_mode == 'selectactions'){
     	   		battleManger.playerhud.update_action_team_battle_bar_option(battleManger.current_battle_option_select,"selected");
     	   	
     	   			battleManger.do_option(battleManger.current_battle_option_select);
     	   			return;

     	   		}


			 if(battleManger.current_battle_mode == 'selectfear'){
     	   			battleManger.playerhud.update_action_team_battle_bar_option(battleManger.current_battle_option_select,"active");
     	   			battleManger.finalize_option(battleManger.current_battle_option_select);
     	   			return;
     	   		}


     	   	}
     		if(key.event.key == 'w' || key.event.key == 'arrowUp') {

     			if(battleManger.current_battle_mode == 'selectactions'){
     				console.log('selectonactions');
     				battleManger.move_battle_option_select('up');
     			}
     			if(battleManger.current_battle_mode == 'selectfear' || battleManger.current_battle_mode == 'selectteam'){
     				battleManger.move_pick_mesh('up');
     			}

     		}
     		if(key.event.key == 's' || key.event.key == 'arrowDown') {


     			if(battleManger.current_battle_mode == 'selectactions'){

     				battleManger.move_battle_option_select('down');
     			}
     			if(battleManger.current_battle_mode == 'selectfear' || battleManger.current_battle_mode == 'selectteam'){

     				battleManger.move_pick_mesh('down');

     			}
     			
     		}
     		if(key.event.key == 'a' || key.event.key == 'arrowLeft') {
     			

     			if(battleManger.current_battle_mode == 'selectactions'){

     				battleManger.move_battle_option_select('left');
     			}
     			if(battleManger.current_battle_mode == 'selectfear' || battleManger.current_battle_mode == 'selectteam'){

     				battleManger.move_pick_mesh('left');

     			}

     		}
     		if(key.event.key == 'd' || key.event.key == 'arrowRight') {
     		

     			if(battleManger.current_battle_mode == 'selectactions'){

     				battleManger.move_battle_option_select('right');

     			}	
     			if(battleManger.current_battle_mode == 'selectfear' || battleManger.current_battle_mode == 'selectteam'){

     				battleManger.move_pick_mesh('right');

     			}	
     		}



     		}

     });

	}


}