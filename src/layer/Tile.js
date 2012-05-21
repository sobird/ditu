(function(){
	/**
	 * 这是一个对外不透明的内部类
	 * 
	 * 切片类
	 */
	Jaring.create('Jaring.maps.Tile', {
		/**
		 * 地图切片类
		 * 
		 * @param {[type]} layer [description]
		 * @param {[type]} opts  [description]
		 */
		Tile: function(layer,opts){
			var _self = this,
				defaults = {
					src: '',
					size: new Jaring.maps.Size(256, 256),
					offset: new Jaring.maps.Offset(0, 0);
					mixZoom: 3,
					maxZoom: 18,
				},
				options = Jaring.util.extend({},defaults, opts);

			var image = new Image(),
				style = image.style;

			style.width		= options.size.width + "px";
			style.height	= options.size.height + "px";
			style.top		= options.offset.top  + "px";
			style.left   	= options.offset.left + "px";
			style.cssText   = '';

			this._layer = layer;

			image.onload 	= function(e){

			};

			image.onerror 	= function(e){

			};

			image.src		= options.src;
			this.image 		= new Image;
			image 			= null;
		},

		onLoad: function(){

		},

		onError: function(){

		},

		/**
		 * 获取Image实例对象
		 * 
		 * @return {Image} [Image实例对象]
		 */
		getImage: function(){
			return this.image;
		},

		/**
		 * 移除当前Tile
		 * 
		 * @return {[type]} [description]
		 */
		remove: function(){
			this.image = null;
		},

		getLayer: function(){
			return this._layer;
		}
	});
})();