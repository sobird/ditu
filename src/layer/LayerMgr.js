(function(){
	/**
	 * 这是一个图层管理器类。
	 * 
	 * 该类主要用来管理地图中添加的各个图层
	 * 包括图层的添加、删除、更新等操作
	 */
	Jaring.create('Jaring.maps.LayerMgr', {
		LayerMgr: function(){

		},

		add: function(layer){

		},

		remove: function(layer){

		},

		clear: function(){

		},

		/**
		 * 渲染图层管理器中的图层
		 * 
		 * @return {[type]} [description]
		 */
		renderLayer: function(){

		}
	});
})();

Jaring.maps.Map.addInitHook(function(){
	var layerMgr = new Jaring.maps.LayerMgr();



	/**
	 * 该方法将作为用户API对外提供使用
	 * 
	 * @author junlong.yang
	 * @access public
	 * @since 1.0.0
	 * 
	 * @param {Layer} layer [图层实例对象]
	 */
	this.addLayer = function(layer){
		console.log(layerMgr);
	}
});
