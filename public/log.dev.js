;(function(){
var Base = function Base(o){
	this.assign(o);
	this.initialize.apply(this, arguments);
};

Base.prototype.initialize = function(o, args){};

Base.prototype.assign = function(o){
	if (is.obj(o)){
		for (var i in o)
			this[i] = o[i];
	}
	return this;
};

var hashify = function(hash, fn){
	if (typeof hash === "function" && hash.name){
		hashify[hash.name] = hash;
		return hash;
	} else {
		hashify[hash] = fn;
		return fn;
	}
};

hashify.init = function(){
	if (hashify[window.location.hash.substr(1)])
		hashify[window.location.hash.substr(1)]();
};

window.addEventListener('hashchange', hashify.init);

var hashify2 = function(obj){
	for (var i in obj){
		if (typeof obj[i] === "function"){
			hashify2[i] = [obj[i], obj];
		}
	}
};

hashify2.init = function(){
	var hash = window.location.hash.substr(1);
	if (hashify2[hash])
		hashify2[hash][0].call(hashify2[hash][1]);
};

window.addEventListener('hashchange', hashify2.init);

// function ready(){
// 	document.body.appendChild(createPanel());
// }

// function createPanel(){
// 	window.panel = document.createElement("div");
// 	panel.innerHTML = "<h3>Panel</h3>";
// 	panel.classList.add('panel');
// 	Object.assign(panel.style, {
// 		background: "#eee",
// 		padding: "10px 20px"
// 	});

// 	return panel;
// }

// if (document.readyState != 'loading')
// 	ready();
// else
// 	document.addEventListener('DOMContentLoaded', ready);

log.tests = {
	docClick: false,
	std: function(){
		this.std1();
		this.std2();
		this.std3();
	},
	std1: function(){
		log('yo');
	},
	std2: function(){
		log('yo', 'adrian');
	},
	std3: function(){
		log('yo', 'adrian', 123, true, [1, 2, 3], { four: "five", six: 7, eight: { nine: [1, 0] } })
	}
};

hashify2(log.tests);

$(function(){
	var $afg = $("#afgCheckbox").change(function(){
		log.afg = $afg.is(":checked");
		log.closeAll();
	}).attr('checked', true);	

	var $resize = $("#resizeCheckbox").change(function(){
		log.resize = $resize.is(":checked");
		log.closeAll();
	}).attr('checked', true);
});



$(function(){
	log("weee, we're ready");
	$(document).click(log.cbc(function docClickHandler(){
		log('this is my click handler');
		log('something would probably happen in here...');
		log('all functionality originating from this click handler will now be organized for your enjoyment');
		myFunc(8, 9, 10);
		log('yerrp');
		globalFunction();
		log('mm yea');
	}));
});


myFunc = log.wrapc(function myFunc(a, b, c){
	log("inside myFunc, app.js");
	return a + b;
}); 

log('yo');
log.off();
log('off me');

var anotherFunc = log.wrapc(function anotherFunc(){
	return myFunc(1, 2) + myFunc(3, 4) * myFunc(5, 6);
}); 
log.on();
log("ruh roh, double digits");

log.group('My test group');
	if (log(5>4)){
		log({
			one: 1,
			two: "two"
		});
	}

	log.groupc("a group");
	log("word");
	log.end();
	
	log("here we go");
	
	globalFunction();
	
	log("a", a = myFunc(1, 2));
	
	log.group("another group");
		log("inside another group");
		myFunc(5, 123);
	log.end();
	
	anotherFunc();
log.end();

log('word');
log(123);
log(true);
log({one: 1, two: "two", three: true, four: function(){} }, "hello", 123)

wrappedGlobalFunction();

anotherFunc();

globalFunction();

log("back to app.js");

globalFunction2();

log("back to app.js");

// log.if(-1).then(function(){
// 	log('yo');
// })

var a = log.wrapc(function a(){
	return true;
});
var c = log.wrapc(function c(){
	return true;
});

var b = log.wrapc(function b(){
	return false;
});
var d = log.wrapc(function d(){
	return false;
});

if ( (a() && c()) && (b() || !d())){

}


var MyClass = log.wrapc(function MyClass(){

});

var myObj = new MyClass();


var testFn = log.wrap(function testFn(){
	log('my test fn');
	// globalFunction3();
	// utilJump();
	// log('my test fn');
});

globalFunction4 = function(){
	log('globalFunction4');
};

testFn();

hashify2.init();
})();