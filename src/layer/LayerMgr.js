(function(){
	/**
	 * 这是一个图层管理器类。
	 * 
	 * 该类主要用来管理地图中添加的各个图层
	 * 包括图层的添加、删除、更新等操作
	 */
	Jaring.create('Jaring.maps.LayerMgr', {
		LayerMgr: function(map){
			this.map = map;
			this.layerHash = new Jaring.maps.Hash();
			
		},

		add: function(layer){
			this.layerHash.set(layer.__uuid, layer);
			layer.add(new Jaring.maps.Tile());
		},

		remove: function(layer){

		},

		clear: function(){

		},

		update: function(){

		},

		/**
		 * 渲染图层管理器中的图层
		 * 
		 * @return {[type]} [description]
		 */
		renderLayer: function(layer){
			//TODO 从地图的左上角向右下角逐个渲染
			for(var row = this.northwest.row; row <= this.southeast.row; row++){
				for(var column = this.northwest.column-1; column <= this.southeast.column; column++){
					if(row >= 0 && row < Math.pow(2,this.level)){
						layer.add(new Jaring.maps.Tile());
					}
				}
			}
		},

		/**
		 * 渲染图层切片
		 * 
		 * @return {[type]} [description]
		 */
		renderTile: function(){

		}
	});
})();

Jaring.maps.Map.addInitHook(function(){
	var layerMgr = new Jaring.maps.LayerMgr();


console.log(layerMgr);
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
		layerMgr.add(layer);

	}
});
