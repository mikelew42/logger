// log('hello two.js');

function twoA(){
	log('inside twoA()');
}

twoW = log.wrapc(function twoW(){
	log('inside twoW()');
});

function twoB(){
	log('inside twoB()');
	log('about to jump!');
	threeA();
	log('back to twoB()');
	log.groupc('this is a group');
		log('about to jump!');
		threeB();
		log('back to twoB()');
	log.end();
	log('group ended');
	log('about to jump!');
	threeA();
	log('back to twoB()');
	log('args and return value dont matter for unwrapped fns');
	log('end of twoB()');
}

// log('end of two.js');