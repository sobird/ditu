(function(){
	Jaring.create('Jaring.maps.Map extends Jaring.MVCObject',{

		/**
		 * 构造函数
		 * 
		 */
		Map: function(id, options){
			var _self = this,
				defaults = {
					backgroundColor: 116.39712896958922,
					center: 39.9165275426627,
					draggable: true,
					mixZoom: 3,
					maxZoom: 18,
				},
				options = Jaring.util.extend({},defaults, options);
			this.setOptions(options);
		},

		//Methods that modify map state
		/**
		 * 地图选项
		 * 
		 * @param {MapOptions} options [description]
		 */
		setOptions: function(options){},

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

		getBounds: function(){}

	});
})();