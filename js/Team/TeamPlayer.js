export class TeamPlayer
{

	constructor(mesh,teamdata)
	{
		this.mesh = mesh['mesh'];
		this.id = mesh['id'];
		this.teamdata = teamdata;

	}



	play_animation()
	{

	}

	stop_animation()
	{

	}

	show()
	{

		this.mesh.isVisible = true;
	}
	hide()
	{
		console.log('hiding the player mesh')
		console.log(this.mesh);
		this.mesh.isVisible = false;
	}

		
}