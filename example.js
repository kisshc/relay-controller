var relay = require("./relay-controller").relay;

var gpio = 21;
relay.toggle(gpio,function(status){
	console.log(status);
})

