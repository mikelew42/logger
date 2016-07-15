
 	var FunctionDefinition = function FunctionDefinition(){
 		this.assign.apply(this, arguments);
 		this.initialize();
 	};

 	FunctionDefinition.prototype = Object.create(Base.prototype);

 	FunctionDefinition.prototype.assign({
 		initialize: function(){
 			this.resolveArgs();
 		},
 		resolveArgs: function(){
 			if (is.str(this.arguments[0])){
 				this.label = this.arguments[0];
 				if (is.fn(this.arguments[1])){
 					this.fn = this.arguments[1];
 				}
 			} else if (is.fn(this.arguments[0])){
 				this.fn = this.arguments[0];
 				if (this.fn.name)
 					this.label = this.fn.name;
 			}

 			this.argNames = getParamNames(this.fn);

 			this.line = this.trace.line;
 			this.file = this.trace.file;
 		},
 		wrapper: function(){
 			var def = this;
 			return function wrapper(){
 				if (!def.logger.log)
 					return def.fn.apply(this, arguments);

 				return new FunctionGroup({
 					trace: getBacktrace()[2],
 					def: def,
 					fnArgs: arguments,
 					ctx: this
 				}).execute();
 				return ret;
 			};
 		}
 	});