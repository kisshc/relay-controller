relay-controller
================

This's relay controller for Raspberry Pi

It can control # open #,# close #,# toggle #

```
var relay = require("relay-controller").relay;
var pin = 21;

relay.toggle(pin,function(status){
	console.log(status);
})

```  