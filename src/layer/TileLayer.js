/**
 * http://mt2.google.cn/vt/lyrs=y&scale=2&hl=zh-CN&gl=cn&x=6891&y=3040&z=13
 *
 * h 街道图
 * m 街道图
 * p 街道图
 * r 街道图
 * s 影像无标注
 * t 地形图
 * y 影像含标注
 * 
 * @author  Yang,junlong at 2019-05-17 01:05:16 build.
 * @version $Id$
 */
(function() {
	/**
	 * 这是图层的基础类
	 */
	Jaring.create('Jaring.maps.TileLayer extends Jaring.maps.BaseLayer', {
		TileLayer: function(options) {
			var defaults = {
				tileUrlTemplate: 'https://mt3.google.cn/vt/scale=2&x={x}&y={y}&z={z}&type=web&for=jaring',
				tileSubdomains: '123',
				opacity: 1,
				minZoom: 3,
				maxZoom: 18
			}
			this.options = Jaring.util.extend({}, defaults, options);

			this.tileHash = new Jaring.maps.Hash();

			this.tiles = [];
		},

		init: function(layerMgr){
			this.layerMgr = layerMgr;
			this.initialNorthWestPoint = this.layerMgr.map.options.northWestPoint;
			this.container = Jaring.dom.create('div').addClass('jaring-layer-base').appendTo(this.layerMgr.container);
		},

		/**
		 * 渲染图层
		 * 
		 * @return {[type]} [description]
		 */
		reader: function(northWest, southEast, zoom){


			var fragment = document.createDocumentFragment();
			for (var row = northWest.row; row <= southEast.row; row++) {
				for (var column = northWest.column - 1; column <= southEast.column; column++) {
					var tilePoint = new Jaring.maps.Point(row, column);
					if(!(this.tileHash.get(row + '_' +column) == true)){
						var tile = new Jaring.maps.Tile({
							src: this.getTileUrl(tilePoint,zoom),
							offset: this.getTileOffset(tilePoint)
						}).load();
						this.tileHash.set(row + '_' +column, true);
						fragment.appendChild(tile.image);
					}
				}
			}
			this.container.append(fragment);
		},

		/**
		 * 需要子类复写该方法, 否则该方法将抛出异常
		 *
		 * @param  {[type]} x [description]
		 * @param  {[type]} y [description]
		 * @param  {[type]} z [description]
		 * @return {[type]}   [description]
		 */
		getTileUrl: function(tilePoint, zoom) {
			var subdomains = this.options.tileSubdomains,
				index = (tilePoint.x + tilePoint.y) % subdomains.length,
				s = this.options.tileSubdomains[index];

			var data = Jaring.util.extend({
				s: s,
				z: zoom,
				x: tilePoint.x,
				y: tilePoint.y
			}, this.options);

			return tileUrl = this.options.tileUrlTemplate.replace(/\{ *([\w_]+) *\}/g, function(str, key) {
				var value = data[key];
				if (!data.hasOwnProperty(key)) {
					throw new Error('No value provided for variable ' + str);
				}
				return value;
			});
		},

		/**
		 * 需要子类复写该方法, 否则该方法将抛出异常
		 *
		 * @return {[type]} [description]
		 */
		getTileOffset: function(tilePoint) {
			var initialNorthWestPoint = this.initialNorthWestPoint;
			return tilePoint.multiplyBy(256).subtract(initialNorthWestPoint).toOffset();
		}
	});
})();
