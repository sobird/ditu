(function() {
	Jaring.create('Jaring.maps.Map extends Jaring.MVCObject', {
		/**
		 * 地图类(Map Class)钩子列表
		 *
		 * @type {Array}
		 */
		_hooks: [],

		/**
		 * 地图各个阶段的状态值
		 *
		 * @type {Number}
		 */
		phase: -1,

		/**
		 * MAP 构造函数
		 *
		 */
		Map: function(container, options) {
			this.phase = 0;
			/**
			 * 地图容器初始化: Map Container
			 *
			 * @type {HTML Element}
			 */
			this.container = Jaring.dom.get(container);

			this.size = this.container.size();

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
					center: new Jaring.maps.LngLat(116.39712896958922, 39.9165275426627),
					draggable: true,
					mixZoom: 3,
					maxZoom: 18,
				};

			this.setValues(Jaring.util.extend({}, defaults, options));
			this.init();
			/**
			 * 初始化 Map Hooks
			 */
			this._initHooks();

			this.addLayer(new Jaring.maps.TileLayer());
		},

		/**
		 * 地图对象初始化
		 *
		 * @return {[type]} [description]
		 */
		init: function() {
			if (this.phase > 0) {
				return;
			}

			var position = this.container.addClass('jaring-map-container').html('').css('overflow', 'hidden').css('position');

			if (position !== 'absolute' && position !== 'relative') {
				this.container.css('position', 'relative')
			}

			this.platform = this.container.create('div').addClass('jaring-map-platform').appendTo(this.container);

			this.tilewrap = null;

			this.somewrap = null;

			this.phase = 1;
		},

		getMapTypeId: function() {},

		/**
		 * 返回当前的 Projection。
		 * 如果还未启动地图（即 mapType 仍为 Null），则结果为 Null。
		 * 侦听 projection_changed 并检查它的值以确保它的值不为 Null。
		 * ----------------------------------------------------------------
		 * Returns the current Projection.
		 * If the map is not yet initialized (i.e. the mapType is still null) then the result is null.
		 * Listen to projection_changed and check its value to ensure it is not null.
		 *
		 * @return {Projection} [description]
		 */
		getProjection: function() {},

		/**
		 * 设置地图中心的地理坐标。
		 *
		 * @param {LngLat} center [经纬坐标 类]
		 */
		setCenter: function(center) {},

		/**
		 * 设置地图的缩放级别。
		 *
		 * @param {Number} zoom [缩放级别]
		 */
		setZoom: function(zoom) {},

		fitBounds: function(bounds) {},

		zoomIn: function() {},

		zoomOut: function() {},

		panTo: function(latlng) {},

		panBy: function(point) {},

		panToBounds: function(bounds) {},

		//Methods that get map state
		getCenter: function() {},

		getZoom: function() {},

		getBounds: function() {},

		/**
		 * 根据相对地图容器的像素坐标获取地理坐标.
		 *
		 * Computes the geographical coordinates from pixel coordinates in the map's container.
		 *
		 * @return {[type]} [description]
		 */
		fromContainerPixelToLatLng: function() {},

		/**
		 * 根据地理坐标获取相对地图容器的像素坐标.
		 *
		 * Computes the pixel coordinates of the given geographical location in the DOM element the map's outer container.
		 *
		 * @return {[type]} [description]
		 */
		fromLatLngToContainerPixel: function() {},
		fromLatLngToPixel: function() {},
		fromPixelToLatLng: function() {},

		//--------------------------------------------------------------
		/**
		 * 初始化为地图添加的钩子函数
		 *
		 * @return {none} [description]
		 */
		_initHooks: function() {
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
			addInitHook: function(fn) {
				var args = Array.prototype.slice.call(arguments, 1);

				var hook = typeof fn === 'function' ? fn : function() {
						this[fn].apply(this, args);
					};

				this.prototype._hooks.push(hook);
			}
		}

	});
})();

//添加一个地图钩子测试
Jaring.maps.Map.addInitHook(function() {

});