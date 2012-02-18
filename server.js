var fs = require("fs");
var express = require("express");
var now = require("now");



String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};



dir_list("./res/textures/",addToTextures);


var app = express.createServer();
var everyone = now.initialize(app);
app.use(express.static(__dirname + '/'));


app.listen(3000)


var known_textures = [];

now.on("connect",function(){
	for (id in known_textures){
		console.log({name:known_textures[id],texture:known_textures[id]});
		this.now.addTexture({name:known_textures[id],texture:known_textures[id]});
	}
	this.now.redrawTextures();
})

function dir_list(folder,cb) {
  var sys = require('util');
  var exec = require('child_process').exec;
  var execstr = "ls -1 {0}".format(folder);
  child = exec(execstr, function(error, stdout, stderr) {
    //I would like to return stdout but can't figure out how
    cb(folder,stdout);
  });
}


function addToTextures(path,tex){
	var textures = tex.split("\n");

	for (id in textures){
		var texture = textures[id];
		stats = fs.lstatSync(path+texture);
		if (known_textures.indexOf(texture) == -1 && texture != "" && stats.isFile()){
        	

			console.log("new texture: {0}".format(texture));
			known_textures.push(texture);
			var execstr = "convert -resize 250x250 "+path+texture+" "+ path+"thumbs/"+texture;
			console.log(execstr);
			var exec = require('child_process').exec;
			exec(execstr, function(error, stdout, stderr){
				console.log(stdout);
				everyone.now.addTexture({name:texture,texture:texture});
				everyone.now.redrawTextures();
			});
			
		}
	}
	//console.log(known_textures);
}

function watchTextures(){
	dir_list("./res/textures/",addToTextures);
}

setInterval(watchTextures,1000);