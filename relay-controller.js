var _path = "/sys/devices/virtual/gpio/",
	exec = require("child_process").exec,
	fs = require("fs");
	
var _read = function(gpio,callback){
	/*
	fs.readFile(_path + "gpio" + gpio + "/value",function(err,data){
		if(err) 
			callback(null);
		else if(typeof(callback) == "function")
			callback(parseInt(data));
	})
	*/
	try{
		var data = fs.readFileSync(_path + "gpio" + gpio + "/value");
		if(typeof(callback) == "function")
			callback(parseInt(data));
	}catch(e){
		callback(null);
	}
}

var _write = function(gpio,status,callback){
	/*
	fs.writeFile(_path + "gpio" + gpio + "/value",status,function(err){
		if(err)
			console.info(err);
		else if(typeof(callback) == "function")
			callback(status);
		
		if(status == 1)
			_unexport(gpio);
	})
	*/
	try{
		
		if(relay.direction == null || relay.direction == "in"){
			var direction = fs.readFileSync(_path + "gpio" + gpio + "/direction");
			if(direction.toString().replace("\n","") == "in"){
				fs.writeFileSync(_path + "gpio" + gpio + "/direction","out");
			}
			relay.direction = "out";
		}
		
		fs.writeFileSync(_path + "gpio" + gpio + "/value",status);
		if(status == 1){
			_unexport(gpio,function(){
				if(typeof(callback) == "function")
					callback(status);			
			});	
		}else{
			if(typeof(callback) == "function")
				callback(status);
		}
	}catch(e){
		console.error("Write Error ");
	}
}


var _export = function(gpio,callback){
	exec("gpio-admin export " + gpio ,function(err,stdout,stderr){
		if(err || stderr)
			console.info("The gpio is export");
		if(typeof(callback) == "function")
			callback();
	})
}

var _unexport = function(gpio,callback){
	exec("gpio-admin unexport " + gpio ,function(err,stdout,stderr){
		if(err || stderr)
			console.info("The gpio is unexport" );
		if(typeof(callback) == "function")
			callback();
	})
}

var relay = {
	
	direction:null,
	
	//get relay status 1 or 0
	getStatus:function(gpio,callback){
		_read(gpio,callback);
	},
	
	//open 0
	open:function(gpio,times,callback){
		if(typeof(times) == "function" || times == undefined){
			callback = times;
			relay.getStatus(gpio,function(status){
				if(status == null){
					_export(gpio,function(){
						_write(gpio,0,callback);
					});
				}
				if(status == 1)
					_write(gpio,0,callback);
					
			})			
		}else{
			relay.openAt(gpio,times,callback);
		}
	},
	
	//close 1
	close:function(gpio,times,callback){
		if(typeof(times) == "function" || times == undefined){
			callback = times;
			relay.getStatus(gpio,function(status){
				if(status == 0)
					_write(gpio,1,callback);
			})		
		}else{
			relay.closeAt(gpio,times,callback);
		}
	},

	//toggle 1 <=> 0
	toggle:function(gpio,callback){
		_read(gpio,function(status){
			if(status == null || status == 1){
				relay.open(gpio,callback);
			}else{
				relay.close(gpio,callback);
			}
		})		
	},
	
	//setTime to open
	openAt:function(gpio,times,callback){
		setTimeout(function(){
			relay.open(gpio,callback);
		},times);
	},
	
	//setTime to close
	closeAt:function(gpio,times,callback){
		setTimeout(function(){
			relay.close(gpio,callback);
		},times);
	},

	//toggle Time 
	toggleAt:function(gpio,obj,callback){
		if(typeof(obj) == "object"){
			var i = 0;
			var times = setInterval(function(){
				relay.toggle(gpio,callback);
				i++;
				if(i == obj.number)
					clearInterval(times);
			},obj.time);			
		}else{
			relay.toggle(gpio,callback);
		}		
	}

}

exports.relay = relay;