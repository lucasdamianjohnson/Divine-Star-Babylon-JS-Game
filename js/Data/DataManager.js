import {fearscenes} from './FearData/fearscenes.js';
import {fearorbtypes} from './FearData/fearorbtypes.js';
import {feartypes} from './FearData/feartypes.js';
export class DataManager
{
	

	constructor()
	{

		this.data = {}
		this.data['fearscenes'] = fearscenes;
		this.data['fearorbtypes'] = fearorbtypes;
		this.data['feartypes'] = feartypes;
	}


	get_data_type(type){
		return this.data[type];
	}
	get_data_value(type,index){
		return this.data[type][index];
	}
}