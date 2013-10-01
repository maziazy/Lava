function Graphic()
{
	var Canvas		= 'Uninitialization'
	var Res_Ratio	= 16/9
	var Viewport	= {'width': 800, 'height': 450}
	
	var Render_Lock = true
	
	var Camera 		= new Graphic_Camera(Viewport)
	
	
	/* Set */
	this.getResRatio	= function()	{	return Res_Ratio	}
	this.getFPS			= function()	{	return FPS			}
	
	
	/* FPS */
	var FPS			= 'NaN'
	var FPS_Count	= 0
	var FPS_Limit	= 30
	var FPS_Delta	= 1000 / FPS_Limit
	var FPS_Timer
	
	this.resetFPS	= function()
	{
		FPS = FPS_Count
		FPS_Count = 0
			
		// Debug
		if(Debug.FPS)
			RefeshFPS(FPS);
	}
	
	/* Render */
	var render = function(offset)
	{
		var start_offset = offset ? offset : new Date().getTime()
		
		Canvas.clear()
		Canvas.setViewBox(Camera.getX(), Camera.getY(), Camera.getWidth(), Camera.getHeight())
		
		Canvas.circle(X, 100, 25)
		
		// Next
		FPS_Count++
		if(Render_Lock)	return
		
		var end_offset	= new Date().getTime()
		var diff_offset	= end_offset - start_offset
		
		if(diff_offset > FPS_Delta)
			render(end_offset)
		else
			setTimeout(function(){	render(start_offset+FPS_Delta)	}, FPS_Delta-diff_offset)
	}
	
	this.startRender	= function()	{	Render_Lock = false;	render();	}
	this.stopRender 	= function()	{	Render_Lock = true;					}
	this.stepRender		= function()	{	Render_Lock = true;		render();	}
	
	/* Initialization */
	this.resize = function()
	{
		// Res Ratio
		var width	= window.innerWidth
		var height	= window.innerHeight
		var ratio = Graphic.getResRatio()
		
		if(width > height * ratio)
			width = height * ratio
		else
			height = width / ratio
		
		// Set Size
		Canvas.setSize(width, height)
	}
	
	this.initial = function()
	{
		Canvas = new Raphael('canvas')
		this.resize()
		
		FPS_Timer	= setInterval(Graphic.resetFPS, 1000)
		// Event Bind
		window.addEventListener('resize', Graphic.resize)
	}
}

function Graphic_Camera(viewport)
{
	var width	= viewport.width
	var height	= viewport.height
	var x		= 0
	var y		= 0
	
	this.getX 		= function(){	return x;		}
	this.getY 		= function(){	return y;		}
	this.getWidth 	= function(){	return width;	}
	this.getHeight 	= function(){	return height;	}
}

var Graphic = new Graphic()