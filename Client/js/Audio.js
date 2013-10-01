var _AUDIO_SRC	= './audio/'
var _BGM_SRC 	= _AUDIO_SRC + 'BGM/'
var _SE_SRC 	= _AUDIO_SRC + 'SE/'

var _BGM_VOLUME	= 80
var _SE_VOLUME	= 50
var _SE_CHANNEL	= 32

function Sound()
{
	this.BGM	= new Sound_BGM()
	this.SE		= new Sound_SE()
}

function Sound_BGM()
{
	// Private
	var Src 	= ''
	var Volume	= _BGM_VOLUME
	var Loop 	= true
	
	var Audio_Obj 		= new Audio()
	Audio_Obj.volume	= Volume / 100
	Audio_Obj.loop 		= Loop
	Audio_Obj.autoplay	= false
	Audio_Obj.preload	= 'auto'
	
	
	/* Control */
	this.play = function(src)
	{
		if(src != '')
			this.setSrc(src)
			
		Audio_Obj.play()
	}
	
	/* Handel */
	Audio_Obj.error = function()
	{
		console.error('BGM Error.')
	}
	
	/* Set */
	this.setVolume = function(val)
	{
		Volume = val
		Audio_Obj.volume = this.Volume / 100
	}
	
	this.setSrc = function(val)
	{
		Src = _BGM_SRC + val
		Audio_Obj.src = Src
	}
	
	this.setLoop = function(val)
	{
		Loop = val
		Audio_Obj.loop = this.Loop
	}
}

function Sound_SE()
{
	var Channel	= _SE_CHANNEL
	var Volume		= _SE_VOLUME
	
	var Audio_Obj = []
	for(var i = 0; i < Channel; i++)
	{
		Audio_Obj[i] 			= new Audio()
		Audio_Obj[i].volume		= Volume / 100
		Audio_Obj[i].loop		= false
		Audio_Obj[i].autoplay 	= false
		Audio_Obj[i].preload 	= 'auto'
		
		Audio_Obj[i].playing 	= false
	}
	
	
	/* Control */
	this.play = function(src)
	{
		var i = -1
		while(++i<Channel && Audio_Obj[i].playing)
		
		Audio_Obj[i].playing = true
		Audio_Obj[i].addEventListener('ended', function(){	this.playing = false	})
		
		Audio_Obj[i].src = _SE_SRC + src
		Audio_Obj[i].play()
		
		return i
	}
	
	/* Handel */
	
	
	/* Set */
	this.SetVolume = function(val)
	{
		Volume = val
		for(var i = 0; i < Channel; i++)
			Audio_Obj[i].volume = Volume / 100
	}
}

var Sound = new Sound()