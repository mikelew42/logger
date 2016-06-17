/* 

log.config({}) // basically, the smart extend
 - smart deep extend
 - deep extend objects, but type check base.value and ext.value
 - call functions with arguments


1) you have the parent scope's logger

log.wrap({config}, function(){  2) you clone the parent scope's logger with this config
	var log = log.clone({config});  3) you clone the parent scope's logger, and add this config

!!! Now you need to reconcile.  Somehow, you want parent --> wrap --> internal
Maybe, there's a way to let the wrap listen for sub logs, and pre-configure them
Wouldn't the only way to do that, be to diff the parent and internal, in order to figure out
whether it should override?
Unless we store the internal config, and then remake the internal logger with 
	parent --> wrap --> internal

}); 

*/