(function(){
	Jaring.create('Jaring.maps.Map extends Jaring.MVCObject',{
		_hooks: [],
		/**
		 * MAP 构造函数
		 * 
		 */
		Map: function(id, options){
			var _self = this,
				defaults = {
					/**
					 * 该地图所使用的 参考坐标系
					 * 
					 * @type {CRS}
					 */
					CRS: Jaring.CRS.EPSG3857,

					/**
					 * 地图背景颜色
					 * 
					 * @type {String}
					 */
					backgroundColor: '#ccc',

					/**
					 * 地图中心点坐标
					 * 
					 * @type {LngLat}
					 */
					center: new Jaring.maps.LngLat(116.39712896958922,39.9165275426627),
					draggable: true,
					mixZoom: 3,
					maxZoom: 18,
				};

			this.setValues(Jaring.util.extend({},defaults, options));

			this._initHooks();

			this.addLayer(new Jaring.maps.TileLayer());
		},

		

		//Methods that modify map state
		/**
		 * 地图选项
		 * 
		 * @param {MapOptions} options [description]
		 */
		setOptions: function(options){
			this.setValues(options);
		},

		/**
		 * 设置地图中心的地理坐标。
		 * 
		 * @param {LngLat} center [经纬坐标 类]
		 */
		setCenter: function(center){},

		/**
		 * 设置地图的缩放级别。
		 * 
		 * @param {Number} zoom [缩放级别]
		 */
		setZoom: function(zoom){},

		fitBounds: function(bounds){},

		zoomIn: function(){},

		zoomOut: function(){},

		panTo: function(latlng){},

		panBy: function(point){},

		panToBounds: function(bounds){},

		//Methods that get map state
		getCenter: function(){},

		getZoom: function(){},

		getBounds: function(){},

		//--------------------------------------------------------------
		/**
		 * 初始化为地图添加的钩子函数
		 * 
		 * @return {none} [description]
		 */
		_initHooks: function () {
			for (var i = 0, len = this._hooks.length; i < len; i++) {
				this._hooks[i].call(this);
			}
		},

		'static': {
			/**
			 * Map Class Hook static method
			 * 
			 * @param {Function} fn [hook method]
			 */
			addInitHook: function(fn){
				var args = Array.prototype.slice.call(arguments, 1);

				var hook = typeof fn === 'function' ? fn : function () {
					this[fn].apply(this, args);
				};

				this.prototype._hooks.push(hook);
			}
		}

	});
})();

//添加一个地图钩子测试
Jaring.maps.Map.addInitHook(function(){
	console.log('this is a hook!');
	console.log(this);
	console.log('hook end!');
});