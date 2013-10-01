function ControlHandler() 
{
	var F2K_Map	= {}		/* Function to Key */
	var K2F_Map	= {}		/* Key to Function */
	var F2E_Map	= {}		/* Function to Event */
	
	/* Keybind */
	
	this.Register = function(Function, Default_Key) 
	{
		this.AssignKey(Function, Default_Key)
		
		F2E_Map[Function] = []
	}
	
	this.AssignKey = function(Function, Key) 
	{
		if(typeof(K2F_Map[Key]) != 'undefined') 
		{
			console.error('Key ['+Key+'] already assigned.')
			return 0
		}	

		this.RecedeKey(Function)
		
		F2K_Map[Function] = Key
		K2F_Map[Key] = Function
		
		return 1
	}
		
	this.RecedeKey = function(Function) 
	{
		if(typeof(F2K_Map[Function]) == 'undefined') 
			return
		
		var Key = F2K_Map[Function]
		F2K_Map[Function] = ''
		delete K2F_Map[Key]
	}
	
	/* Bind Method */
	
	this.Bind = function(Function, Method) 
	{
		if(typeof(F2E_Map[Function]) == 'undefined') 
		{
			console.error('Function ['+Function+'] does not exist.')
			return 0
		}
		
		F2E_Map[Function].push(Method)
	}
	
	
	/* Listen */
	this.Keydown = function(e)
	{
		if(Debug.ControlHandler)
			console.debug('[Event] Keydown on '+e.keyCode+'('+String.fromCharCode(e.keyCode)+')')
		
		with(ControlHandler)
		{
			if(typeof(K2F_Map[e.keyCode]) == 'undefined')
				return
				
			var FN = K2F_Map[e.keyCode]
			for(key in F2E_Map[FN])
				F2E_Map[FN][key]()
		}
	}
	
	window.addEventListener('keydown', this.Keydown)
}


var ControlHandler = new ControlHandler()

function ControlHandler_Initialization()
{
	Debug.ControlHandler = false
}