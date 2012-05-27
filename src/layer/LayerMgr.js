(function() {
	/**
	 * 图层管理器 类 包括图层中切片的渲染算法
	 *
	 * 该类主要用来管理地图中添加的各个图层
	 * 包括图层的添加、删除、更新等操作
	 *
	 * @author junlong.yang CrossYou2009@gmail.com
	 * @version $Id$
	 */
	Jaring.create('Jaring.maps.LayerMgr extends Jaring.MVCObject', {
		LayerMgr: function(map) {
			/**
			 * 图层管理器当前执行阶段 状态码
			 *
			 * 0: 表示图层管理器类(LayerMgr)即将准备初始化, 但是还没有进行初始化的一个状态
			 * 1：表示图层管理器类(LayerMgr)刚刚实例化完毕
			 * 2：开始添加图层
			 * 3: 图层加载完毕
			 *
			 * @type {Number}
			 */
			this.phase = 0;

			/**
			 * 地图对象, 富含一些计算坐标的方法
			 *
			 * @type {Jaring.maps.Map}
			 */
			this.map = map;

			/**
			 * 用来存放图层的哈希表
			 *
			 * @type {Jaring.maps.Hash}
			 */
			this.layerHash = new Jaring.maps.Hash();

			this.container = Jaring.dom.create('div').addClass('jaring-layer-mgr').appendTo(this.map.platform);

		},

		/**
		 * 向图层管理器重添加一个图层
		 *
		 * @param {TileLayer} layer [description]
		 */
		add: function(layer) {
			layer.init(this);
			this.layerHash.set(layer.__uuid, layer);
			

			this.fire('layeradd', {layer: layer});
			this.reader();
		},

		/**
		 * 从图层管理器中移除一个图层
		 *
		 * @param  {[type]} layer [description]
		 * @return {[type]}       [description]
		 */
		remove: function(layer) {
			this.layerHash.remove();
		},

		/**
		 * 清空图层管理器中的图层
		 *
		 * @return {} [description]
		 */
		clear: function() {

		},

		reader: function(){
			var _self = this,
				mapObj = this.map,
				pixelCenter = mapObj.getPixelCenter(),
				pixelBounds = mapObj.getPixelBounds(),
				zoom = mapObj.getZoom();

			var northWest = {
				row: Math.floor(pixelBounds.northWest.x / 256),
				column: Math.floor(pixelBounds.northWest.y / 256)
			};
			var southEast = {
				row: Math.floor(pixelBounds.southEast.x / 256),
				column: Math.floor(pixelBounds.southEast.y / 256)
			};


			this.layerHash.each(function(pairs){
				var layer = pairs.value;
				layer.reader(northWest, southEast, zoom);
			});
		},

		/**
		 * 刷新管理器中的图层
		 * 
		 * @return {[type]} [description]
		 */
		refresh: function(){

		}
	});
})();

Jaring.maps.Map.addInitHook(function() {
	//对图层管理器进行示例化
	var layerMgr = new Jaring.maps.LayerMgr(this).add(new Jaring.maps.TileLayer());
	/**
	 * 该方法将作为用户API对外提供使用
	 *
	 * @author junlong.yang
	 * @access public
	 * @since 1.0.0
	 *
	 * @param {Layer} layer [图层实例对象]
	 */
	this.addLayer = function(layer) {
		layerMgr.add(layer);

	}

	this.removeLayer = function(layer) {
		//TODO
	}
});