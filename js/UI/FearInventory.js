
export class FearInventory
{
	

	constructor()
	{
		this.fear_inventory_list = document.getElementById('fear-type-inventory-list');
		this.dataManager = false;
		this.orbdata = false;
	}

	set_data_manager(dataManager){
		this.dataManager = dataManager;
		this.orbdata = dataManager.get_data_type('fearorbtypes')
		console.log(this.orbdata);
		console.log('called set datamanager in fear invetnroy')
	}


	update_inventory_slot(slot,new_html)
	{
	 var fearinventory = this.fear_inventory_list;
	 var slots = fearinventory.getElementsByTagName('li');
	 for(var i = 0; i < slots.length; i++ )  {
	 	console.log(slots[i]);
	 	if(slots[i].getAttribute('data-slot') == slot){
	 		slots[i].innerHTML = new_html;
	 		break;
	 	}
	 }

	}


	update_fear_inventory(fear_inventory_data){
		console.log('called update fear inventory!!!');
		var fearinventory = this;
		for(var slot in fear_inventory_data){
		var amount = fear_inventory_data[slot]['amount'];
	
		   if (amount != 0) {
		 var orbtype = fear_inventory_data[slot]['orbtype'];
		  var orbifno = fearinventory.orbdata[orbtype];	
		  var fearclass = orbifno['inventoryclasss'];
		  var orbname = orbifno['name'];
	var new_html = `<div class='iventory-item-grid'>
<div class='${fearclass} fear-invetory-list-item-image'>

</div>
<div class='fear-inventory-list-item-info'>
<strong>${orbname}</strong>
<p class='inventory-amount'>${amount}</p>
</div>
</div>`;
			fearinventory.update_inventory_slot(slot,new_html);
		   }

		}

	
	}
}