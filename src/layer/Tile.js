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
		Tile: function(opts){
			var _self = this,
				defaults = {
					src: 'http://dev.crossyou.cn/misc/map/x=100;y=200;z=16;type=web;for=jaring',
					size: new Jaring.maps.Size(256, 256),
					offset: new Jaring.maps.Offset(0, 0),
					mixZoom: 3,
					maxZoom: 18,
				};

			/**
			 * 选项设置
			 * 
			 * @type {Options}
			 */
			this.options = Jaring.util.extend({},defaults, opts);

			/**
			 * 切片状态值
			 * 
			 * 0: not started.
			 * 1: started loading.
			 * 2: loading done.
			 * 
			 * @type {Number}
			 */
			this.phase = 0;
		},

		load: function(layer){
			if (this.phase != 0) {
				return;
			}
			var _self = this;

			this.phase = 1;

			var image = new Image(),
				style = image.style,
				options = this.options;

			style.cssText   = '';	
			style.width		= options.size.width + 'px';
			style.height	= options.size.height + 'px';
			style.top		= options.offset.top  + 'px';
			style.left   	= options.offset.left + 'px';
			

			image.onload 	= function(rawEvent){
				/**
				 * 设置切片当前状态值
				 * 
				 * @type {Number}
				 */
				_self.phase = 2;

				this.className += ' jaring-tile-loaded';

				layer.fire('tileload', {
					originalEvent: rawEvent,
					tile:this,
					src: this.src,
					type: 'tileload'
				});
			};

			image.onerror 	= function(e){
				//TODO 切片Tile加载出错
			};

			image.src		= options.src;
			this.image 		= image;
			image 			= null;
			return this;
		},

		/**
		 * 移除当前Tile
		 * 
		 * @return {[type]} [description]
		 */
		remove: function(){
			this.image = null;
		}
	});
})();