
log.resize = true;

if (typeof $ !== "undefined"){
	$(document).ready(function(){
		if (log.currentGroup.type === "root"){
			log.rgroup("document.ready");
			setTimeout(function(){
				log.end();
			}, 0);
		}
	});
	$(window).load(function(){
		// if (log.currentGroup.type === "root"){
			log.rgroup("window.load");
			setTimeout(function(){
				log.end();
			}, 0);
		// }
	});

	$(window).on('resize.log', function(){
		if (log.resize){
			log.rgroup("window.resize");
			setTimeout(function(){
				log.end();
			}, 0);
		}
	});

	$(document).scroll(function(){
		// if (log.currentGroup.type === "root"){
			log.rgroup("document.scroll");
			setTimeout(function(){ log.end() }, 0);
		// }
	});

	// log.closureGroup({ name: "test" }, function(){
	// 	log('yo');
	// })
}