// log('hello three.js');

function threeA(){
	log('inside threeA()');
}

threeW = log.wrapc(function threeW(){
	log('inside threeW()');
});

function threeB(){
	log('inside threeB()');
	log('about to jump!');
	oneA();
	log('back to threeB()');
	log('about to jump!');
	twoA();
	log('back to threeB()');
	log.groupc('this is a group');
		log('about to jump!');
		oneA();
		log('back to threeB()');
		log('about to jump!');
		twoA();
		log('back to threeB()');
	log.end();
	log('group ended');
	log('about to jump!');
	oneA();
	log('back to threeB()');
	log('about to jump!');
	twoA();
	log('back to threeB()');
	log('args and return value dont matter for unwrapped fns');
	log('end of threeB()');
}