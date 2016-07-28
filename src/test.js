log('inside test.js');

function testFn(){
	log('inside testFn');
}

var wrappedFn = module.exports = log.wrap(function wrappedFn(){
	log('yee haw');
})