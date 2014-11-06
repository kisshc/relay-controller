relay-controller
================

This's relay controller for Raspberry Pi

The initial version
====================

It can control <code>open</code>,<code>close</code> and <code>toggle</code>

First your shuold install <code>gpio-admin</code> form https://github.com/quick2wire/quick2wire-gpio-admin

```
var relay = require("relay-controller").relay;
var pin = 21;

relay.toggle(pin,function(status){
	console.log(status);
})

```  
