$(function(){
		//console.log(object);

		textures = TAFFY([

			])

		
		function addTexture(texture){
			textures.insert(texture);
		}

		now.addTexture = addTexture;

		function TextureWindow(){
			var id=0;
			var divTemplate = '<div id="texture-{0}" class="texture-img"><div class="texture-name">{1}</div><img src="/res/textures/thumbs/{2}" height="250px" width="250px" class="texture-picture" /></div>'
			$("#textures").html("");
			textures().each(function (tex){
				
				$("#textures").append(divTemplate.format(id,tex.name,tex.texture));
				$("#texture-{0}".format(id)).click(function (event){
					texture = "/res/textures/{0}".format(tex.texture);
					updateMaterial();
				})
				id++;


			}
			);
		}

		now.redrawTextures = TextureWindow;

		TextureWindow();





		$( "#speed" ).slider({
			min: 0.1,
			max: 3,
			step: 0.1,
			value:speed,
		   	change: function(event, ui) {
		   		var s = ui.value;
		   		speed = s;

		   }
		});

		$( "#shininess" ).slider({
			min: 1,
			max: 1000,
			value: shininess,
		   	change: function(event, ui) {
		   		shininess = ui.value;
		   		updateMaterial();

				
				//world.add(object);
				//world.remove(prev);
				//console.log(object);

		   }
		});

		$( "#textures-scrollbar" ).slider({
			orientation: "vertical",
				min: 0,
				max: 100,
				value: 100,
			slide: function (event, ui){
				var scrollContent = $("#textures"),
					scrollPane = $("#textures-scrollbar");
				if ( scrollContent.height() > scrollPane.height() ) {
					scrollContent.css( "margin-top", Math.round(
						(100-ui.value) / 100 * ( scrollPane.height() - scrollContent.height() )
					) + "px" );
				} else {
					scrollContent.css( "margin-top", 0 );
				}
			}
		});

		var top = $("#textures").position().top;
		var screenheight = window.innerHeight,
			screenwidth = window.innerWidth;

		var scheight = screenheight - top - 80;

		$("#textures-scrollbar").height(scheight);
		//$("#texturebox").height(scheight);
});