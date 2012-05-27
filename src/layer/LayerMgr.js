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
	Jaring.create('Jaring.maps.LayerMgr', {
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

			this.container = Jaring.dom.create('div');

		},

		/**
		 * 向图层管理器重添加一个图层
		 *
		 * @param {TileLayer} layer [description]
		 */
		add: function(layer) {
			this.layerHash.set(layer.__uuid, layer);
			layer.add(new Jaring.maps.Tile());
		},

		/**
		 * 从图层管理器中移除一个图层
		 *
		 * @param  {[type]} layer [description]
		 * @return {[type]}       [description]
		 */
		remove: function(layer) {

		},

		/**
		 * 清空图层管理器中的图层
		 *
		 * @return {} [description]
		 */
		clear: function() {

		},

		/**
		 * 更新图层管理器
		 *
		 * @return {[type]} [description]
		 */
		update: function() {
			var mapObj = this.map,
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

			var fragment = document.createDocumentFragment();
			for (var row = northWest.row; row <= southEast.row; row++) {
				for (var column = northWest.column - 1; column <= southEast.column; column++) {
					var src = 'http://dev.crossyou.cn/misc/map/x=' + row + ';y=' + column + ';z=' + zoom + ';type=web;for=jaring';
					var tile = new Jaring.maps.Tile({
						src: src,
						offset: this.getTileOffset(new Jaring.maps.Point(row, column))
					}).load();
					fragment.appendChild(tile.image);
				}
			}
			mapObj.platform.append(fragment);

		},

		/**
		 * 切片由中心点向外 扩散添加
		 *
		 * @return {[type]} [description]
		 */
		fromCenterToOut: function(pixelBounds, pixelCenter) {

		},

		getTileOffset: function(tilePoint){
			var initialNorthWestPoint = this.map._initial.northWestPoint;

			return tilePoint.multiplyBy(256).subtract(initialNorthWestPoint).toOffset();
		},

		/**
		 * 渲染图层管理器中的图层
		 *
		 * @return {[type]} [description]
		 */
		renderLayer: function(layer) {
			//TODO 从地图的左上角向右下角逐个渲染
			for (var row = this.northwest.row; row <= this.southeast.row; row++) {
				for (var column = this.northwest.column - 1; column <= this.southeast.column; column++) {
					if (row >= 0 && row < Math.pow(2, this.level)) {
						layer.add(new Jaring.maps.Tile());
					}
				}
			}
		},

		/**
		 * 渲染切片
		 *
		 * @return {[type]} [description]
		 */
		renderTile: function() {

		}
	});
})();

Jaring.maps.Map.addInitHook(function() {
	//对图层管理器进行示例化
	var layerMgr = new Jaring.maps.LayerMgr(this);
	layerMgr.update();
	console.log(this._initial);
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