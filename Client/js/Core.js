var _CORE_TPS_GOAL		= 50

var X = 0

function Core()
{
	var Loop_Lock = true
	
	/* Tick */
	var Clock_Delta = 1000 / _CORE_TPS_GOAL
	var Clock_Timer
	
	var gameloop = function(offset, expired)
	{
		var start_offset = offset ? offset : new Date().getTime()
		var time_passed		= expired ? expired : Clock_Delta
		var tpd				= 1000 / time_passed
		
		
		if(X > 1000)
			X = 0
		X+=100/tpd
		
		// Next
		if(Loop_Lock)	return
		
		var end_offset	= new Date().getTime()
		var diff_offset	= end_offset - start_offset
		
		if(diff_offset > Clock_Delta)
			gameloop(end_offset, diff_offset)
		else
			setTimeout(function(){	gameloop(start_offset+Clock_Delta)	}, Clock_Delta-diff_offset)
	}
	
	this.run 	= function(){	Loop_Lock = false;	gameloop()	}
	this.pause	= function(){	Loop_Lock = true				}
	
	/* Initialization */	
	this.initial = function()
	{
		this.run()
	}
}

var Core = new Core()