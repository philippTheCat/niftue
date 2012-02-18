$(function(){
		logger.log("initalizing niftue");
		world	= tQuery.createWorld().appendTo($("#viewport").get(0)).start();


		tQuery.createAmbientLight().addTo(world).color(new THREE.Color(0x444444));
		tQuery.createDirectionalLight().addTo(world).color(new THREE.Color(0xffffff)).position(-2,2,1);
		tQuery.createDirectionalLight().addTo(world).color(new THREE.Color(0xffffff)).position(2,2,1);
		tQuery.createDirectionalLight().addTo(world).color(new THREE.Color(0xffffff)).position(0,-2,1);
		//tQuery.createDirectionalLight().addTo(world).color(new THREE.Color(0xffffff));
		//tQuery.createDirectionalLight().addTo(world).color(new THREE.Color(0xffffff));

		var material	= getMat();

		var object	= tQuery.createSphere(0.5,64,64,material).addTo(world);
		world.loop().hook(function(deltaTime,present){
			var angle = present * speed * Math.PI;
			tQuery("sphere").rotation(0,angle,0);
		})

		console.log(world);
		logger.log("finished initalizing niftue")

});
		function getMat(){
			return new THREE.MeshPhongMaterial({
			ambient	: ambient,
			color	: color,
			specular: specular,
			//specular: 0xCC88ff,
			shininess: shininess,
			map	: THREE.ImageUtils.loadTexture( texture ),
			
		});
		}



		function updateMaterial(){
			var material	= getMat();
			world.stop();
				var prev = tQuery("sphere").each(function(obj){
					obj.material = material;
				});

			world.start();
		}


