
wrappedGlobalFunction = log.wrapc(function wrappedGlobalFunction(){
	log("wrappedGlobalFunction in log.js");
	globalFunction();
	log("calling myFunc in app.js");
	log("fn ending");
});

globalFunction = xlog.wrapc(function globalFunction(){
	log('globalFunction, from log.js');
	log.groupc('a group inside globalFunction', 1234, function(){});
	log('whatup');
	log.end();
	log("back to root level of globalFunction");
});

globalFunction2 = function(){
	// log('globalFunction, from log.js');
	log.group('a group inside globalFunction2', 1234, function(){});
	log('whatup');
	log('whatup');
	log('whatup');
	log.end();
};

globalFunction3 = log.wrapc(function globalFunction3(){
	log('globalFunction3');
	utilsGlobalFunction();
	log('globalFunction3');
});