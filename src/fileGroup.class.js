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