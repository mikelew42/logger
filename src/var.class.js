/* * * * * * * * * * *
 *  VAR
 
Cleanup groups with timeout?
 */

	var Var = function Var(){
		this.assign.apply(this, arguments);
		this.initialize();
	};

	Var.prototype = Object.create(Log.prototype);

	Var.prototype.assign({
		custom: function(){
			this.styled.push({ str: this.name + ":", styles: groupStyles });
		}
	});

