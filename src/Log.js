var Base = require("./Base");
var groupStyles = require("./utils").groupStyles;

var Log = function Log(o){
	this.assign(o);
	this.initialize();
};

Log.prototype = Object.create(Base.prototype);

Log.prototype.assign({
	method: "log",
	afg: true,
	styled: [], // objects { str: "str", styles: "css: props;" }
	initialize: function(){
		this.styled = [];
		this.autoFileGroup();
		this.custom();
		this.log();
	},
	initLog: function(){
		this.styled = [];
		this.autoFileGroup();
		this.custom();
		this.log();
	},
	autoFileGroup: function(){
		if (this.afg && this.logger.afg){
			this.styledIcon();

			if (this.logger.currentFile !== this.trace.file) {
				if (this.logger.currentGroup.type == "file")
					this.logger.currentGroup.close();

				if (this.logger.currentFile !== this.trace.file){
					new FileGroup({
						trace: this.trace,
						lastFile: this.logger.currentFile,
						logger: this.logger
					});
				}
			}

		} else {
			if (this.logger.currentGroup.type == "file")
				this.logger.currentGroup.close();
		}
	},
	custom: function(){},
	styledLineNumber: function(){
		this.styled.unshift({ str: this.trace.line, styles: groupStyles });
	},
	styledIcon: function(){
		var icon;
		if (this.icon)
			icon = this.icon;
		else 
			icon = this.trace.line;
		
		this.styled.push({ str: icon, styles: groupStyles })
	},
	getStyledArgsArray: function(){
		var str = "", styles = [], styled;
		for (var i in this.styled){
			styled = this.styled[i];
			str += "%c" + styled.str;
			styles.push(styled.styles);
		}
		return [].concat(str, styles);
	},
	log: function(args){
		console[this.method].apply(console, this.getStyledArgsArray().concat(Array.prototype.slice.call(this.arguments || [] )));
	}
})

module.exports = Log;