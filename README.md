relay-controller
================

This's relay controller for Raspberry Pi

The initial version
====================

It can control <code>open</code>,<code>close</code>,<code>toggle</code>,<code>openAt</code>,<code>closeAt</code> and <code>toggleAt</code>

First:
==================
1. Install <code>gpio-admin</code> form https://github.com/quick2wire/quick2wire-gpio-admin
2. Install relay-controller <code>npm install relay-controller</code>

USE:
=================
1. <code>relay.open(pin,[times],[callback])</code>
	+. open relay 
	+. times Time delay opening
	+. callback will return status

```
var relay = require("relay-controller").relay;
var pin = 21;

relay.toggle(pin,function(status){
	console.log(status);
})

```  
