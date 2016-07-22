var Log = require("./Log");
var Group = require("./Group");
var styles = require("./utils").styles;

var FileGroup = function FileGroup(){
	this.assign.apply(this, arguments);
	this.initialize();
};

FileGroup.prototype = Object.create(Group.prototype);

FileGroup.prototype.assign({
	type: "file",
	initialize: function(){
		this.styled = [];
		this.logger.add(this);
		this.lastFile = this.logger.currentFile;
		this.logger.currentFile = this.trace.file;
		this.styledFileName();
		this.log();

		var self = this;
		this.autoCloseTimeout = setTimeout(function(){
			self.close(1);
		}, 0);
	},
	styledFileName: function(){
		this.styled.push({ 
			str: "📄 " +  this.trace.file, 
			styles: "padding: 3px 7px 2px; font-size: 13px; line-height: 18px;" + styles.border + styles.background 
		});
	},
	closeCustom: function(){
		clearTimeout(this.autoCloseTimeout);
		this.logger.currentFile = this.lastFile;
	}
});

Log.prototype.assign({
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
	}
});

module.exports = FileGroup;