function Logger(div){
	this.nr = 0;

	this.window = div;
	this.div = div.children("#messages");

	this.divTemplate = '<div class="{0}" id="{1}">{2} <span class="log-time">{3}</span></div>';

	this.classTemplate = 'logger-{0}';
	this.idTemplate = 'msg-{0}';

	this.timeTemplate = '{0}:{1}:{2}:{3}';

	this.stayOpen = false;

	this.getTime = function(){
		var now = new Date();
		var hour        = now.getHours();
		var minute      = now.getMinutes();
		var second      = now.getSeconds();
		var millisecond      = now.getMilliseconds();
		var monthnumber = now.getMonth();
		var monthday    = now.getDate();
		var year        = now.getYear();

		var time = this.timeTemplate.format(hour,minute,second,millisecond);
		return time;
	}

	this.toggle = function(){
		if (this.stayOpen){
			this.div.slideDown();
		} else {
			this.div.slideToggle();
			this.window.children("#log-header span").toggleClass("ui-icon-carat-1-s");
			this.window.children("#log-header span").toggleClass("ui-icon-carat-1-n");
		}
	}

	this.log = function(str){
		var classtemp = this.classTemplate.format("log");
		var idtemp = this.idTemplate.format(this.nr);
		this.nr++;

		var time = this.getTime();
		var divtemp = this.divTemplate.format(classtemp,idtemp,str,time);
		this.div.append(divtemp);

		//this.div.fadeIn(100).delay(1000).fadeOut(2000);
	}
	
	this.critical = function(str){
		var classtemp = this.classTemplate.format("critical");
		var idtemp = this.idTemplate.format(this.nr);
		this.nr++;

		var time = this.getTime();
		var divtemp = this.divTemplate.format(classtemp,idtemp,str,time);
		this.div.append(divtemp);

		this.stayOpen = true;

		this.toggle();
		//this.div.fadeIn(100).delay(1000).fadeOut(2000);
	}
}