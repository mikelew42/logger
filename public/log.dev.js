;(function(){

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

$(function(){
	var $afg = $("#afgCheckbox").change(function(){
		log.afg = $afg.is(":checked");
		log.closeAll();
	}).attr('checked', true);
});

})();