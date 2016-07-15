import Log from "./Log"
import { groupStyles } from "./utils"

export default class Var extends Log {
	custom(){
		this.styled.push({ str: this.name + ":", styles: groupStyles });
	}
}

// var Var = function Var(){
// 	this.assign.apply(this, arguments);
// 	this.initialize();
// };

// Var.prototype = Object.create(Log.prototype);

// Var.prototype.assign({
// 	custom: function(){
// 		this.styled.push({ str: this.name + ":", styles: groupStyles });
// 	}
// });

