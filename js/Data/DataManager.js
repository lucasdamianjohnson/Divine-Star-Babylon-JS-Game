import {fearspaces} from './FearData/fearspaces.js';
import {fearorbtypes} from './FearData/fearorbtypes.js';
import {feartypes} from './FearData/feartypes.js';
import {fearbattlesets} from './FearData/fearbattlesets.js';
export class DataManager
{
	

	constructor()
	{

		this.data = {}
		this.data['fearspaces'] = fearspaces;
		this.data['fearorbtypes'] = fearorbtypes;
		this.data['feartypes'] = feartypes;
		this.data['fearbattlesets'] = fearbattlesets;
	}


	get_data_type(type){
		return this.data[type];
	}

	get_data_value(type,index){
		return this.data[type][index];
	}


}