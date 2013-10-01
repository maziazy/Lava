var Debug = {}

/* Onload Initialization */
window.addEventListener('load', function()
{
	/* ControlHandler */
	ControlHandler_Initialization()
	
	ControlHandler.Register('Move', 38)
	ControlHandler.Register('Back', 40)
	ControlHandler.Register('Turn Left', 37)
	ControlHandler.Register('Turn Right', 39)

	ControlHandler.Bind('Move', function(){ Sound.SE.play('DragBull.wav') })
	ControlHandler.Bind('Back', function(){ Sound.BGM.play('212.mp3') })
	
	/* Graphic */
	Graphic.initial()
	Graphic.startRender()
	
	/* Core */
	Core.initial()
	
	/* Debug */
	//Debug.ControlHandler = true
	Debug.FPS = true
})

/* Libary */

function Rand(a, b)	{	return Math.ceil(Math.random()*(b-a+1))+a-1	}
function log(t)		{	console.log(t)	}

function RefeshFPS(fps)	{	document.getElementById('FPS').textContent = fps;	}