// log('hello one.js');

function oneA(){
	log('inside oneA()');
}

oneW = log.wrapc(function oneW(){
	log('inside oneW()');
});

function oneB(){
	log('inside oneB()');
	log('about to jump!');
	twoA();
	log('back to oneB()');
	log.groupc('this is a group');
		log('about to jump!');
		twoB();
		log('back to oneB()');
	log.end();
	log('group ended');
	log('about to jump!');
	twoA();
	log('back to oneB()');
	log('args and return value dont matter for unwrapped fns');
	log('end of oneB()');
}

oneBW = log.wrap('oneBW', function(){
	log('inside oneBW()');
	log('about to jump!');
	twoW();
	log('back to oneBW()');
	log.groupc('this is a group');
		log('about to jump!');
		twoBW();
		log('back to oneBW()');
	log.end();
	log('group ended');
	log('about to jump!');
	twoW();
	log('back to oneBW()');
	log('args and return value dont matter for unwrapped fns');
	log('end of oneBW()');
});

// function oneA(a, b, c){
// 	log('this is function oneA()');
// 	log.groupc('this is a group inside oneA()');
// 	log.var('a', a);
// 	log.var('b', b);
// 	log.var('c', c);
// 	log.end();
// 	return a*b+c;
// }

// oneW = log.wrap(function oneW(a, b, c){
// 	c = a - oneA(a, b, c);
// 	log('c', c);
// 	log.var('c', c);

// 	log.groupc('just make sure groups work everywhere');
// 		log('yo!');
// 	log.end();

// 	return c*c;
// });

// oneTwoThreeW = log.wrap('oneTwoThreeW', function(one, two, three){
// 	one = twoA(one);
// 	two = twoThree(three);
// 	return one / two + three;
// });