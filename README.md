relay-controller
================

This's relay controller for Raspberry Pi

The initial version
====================

It can control <code>open</code>,<code>close</code>,<code>toggle</code>,<code>openAt</code>,<code>closeAt</code> and <code>toggleAt</code>

First
==================
1. Install <code>gpio-admin</code> form https://github.com/quick2wire/quick2wire-gpio-admin
2. Install relay-controller <code>npm install relay-controller</code>

USE
=================
1. <code>relay.open(pin,[times],[callback])</code>
	+ open relay 
	+ times Time delay opening
	+ callback will return status
2. <code>relay.close(pin,[times],[callback])</code>
	+ close relay
	+ times Timing closure
	+ callback
3. <code>relay.toggle(pin,[callback])</code>
	+ toggle relay open or close
	+ callback will return relay status
4. <code>relay.openAt(pin,times,[callback])</code>
5. <code>relay.closeAt(pin,times,[callback])</code>
6. <code>relay.toggleAt(pin,object,[callback])</code>
	+ toggle relay open pr close timing 
	+ object {time:1000,number:10}
	+ callback will return relay status
	
Explain
======================
```
var relay = require("relay-controller").relay;
var pin = 21;
```

To open relay ...

```
relay.open(pin,function(status){
	console.log(status);
})
```

Timing close
 
```
relay.closeAt(pin,1000,function(){
	console.log("close...");
})
``` 

Or

```
relay.close(pin,1000,function(){
	console.log("close...");
})
```

Website
=================
http://www.kisshc.com

