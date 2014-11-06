var _path = "/sys/devices/virtual/gpio/",
	exec = require("child_process").exec,
	fs = require("fs");
	
var _read = function(gpio,callback){
	/*
	fs.readFile(_path + "gpio" + gpio + "/direction",function(err,data){
		if(err) 
			callback(null);
		else if(typeof(callback) == "function")
			callback(data.toString().replace('\n',""));
	})
	*/
	try{
		var data = fs.readFileSync(_path + "gpio" + gpio + "/direction");
		if(typeof(callback) == "function")
			callback(data.toString().replace('\n',""));
	}catch(e){
		callback(null);
	}
}

var _write = function(gpio,status,callback){
	/*
	fs.writeFile(_path + "gpio" + gpio + "/direction",status,function(err){
		if(err)
			console.info(err);
		else if(typeof(callback) == "function")
			callback(status);
		
		if(status == "in")
			_unexport(gpio);
	})
	*/
	try{
		fs.writeFileSync(_path + "gpio" + gpio + "/direction",status);
		if(status == "in"){
			_unexport(gpio,function(){
				if(typeof(callback) == "function")
					callback(status);			
			});	
		}else{
			callback(status);
		}
	}catch(e){
		console.error("Write Error " + status);
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

	//get relay status in or out
	getStatus:function(gpio,callback){
		_read(gpio,callback);
	},
	
	//open out
	open:function(gpio,callback){
		this.getStatus(gpio,function(status){
			if(status == null){
				_export(gpio,function(){
					_write(gpio,"out",callback);
				});
			}
			if(status == "in")
				_write(gpio,"out",callback);
				
		})
	},
	
	//close in
	close:function(gpio,callback){
		this.getStatus(gpio,function(status){
			if(status == "out")
				_write(gpio,"in",callback);
		})
	},

	//toggle in <=> out
	toggle:function(gpio,callback){
		_read(gpio,function(status){
			if(status == null || status == "in"){
				relay.open(gpio,callback);
			}else{
				relay.close(gpio,callback);
			}
		})		
	}

}

exports.relay = relay;
