(function(){
	/**
	 * 这是图层的基础类
	 */
	Jaring.create('Jaring.maps.TileLayer extends Jaring.maps.BaseLayer', {
		TileLayer: function(){
			Jaring.maps.BaseLayer.apply(this,arguments);
		},

		/**
		 * 需要子类复写该方法, 否则该方法将抛出异常
		 * 
		 * @param  {[type]} x [description]
		 * @param  {[type]} y [description]
		 * @param  {[type]} z [description]
		 * @return {[type]}   [description]
		 */
		getTileUrl: function(x, y, z){
			return 'http://dev.crossyou.cn/misc/map/x=' + x + ';y=' + y + ';z=' + z + ';type=web;for=jaring';
		},

		/**
		 * 需要子类复写该方法, 否则该方法将抛出异常
		 * 
		 * @return {[type]} [description]
		 */
		getTileOffset : function(x, y){
			
		},
	});
})();