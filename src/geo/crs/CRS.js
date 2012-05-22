/**
 * 坐标参考系
 * {Jaring.CRS} namespace
 * 
 * @see  CloudMade - Leaflet
 * @type {Object}
 */
Jaring.CRS = {
	/**
	 * 将经纬度坐标 转换为 地理像素坐标
	 * 
	 * @param  {LngLat} lnglat [经纬度]
	 * @param  {Number} zoom [缩放级别]
	 * @return {Point} point [new Jaring.maps.Point()]
	 */
	latLngToPoint: function (lnglat, zoom) {
		var projectedPoint = this.projection.project(lnglat),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	/**
	 * 将地理像素坐标 转换为 经纬度坐标
	 * 
	 * @param  {Point} point     [new Jaring.maps.Point()]
	 * @param  {Number} zoom      [缩放级别]
	 * @param  {Boolean} unbounded [description]
	 * @return {LngLat}           [new Jaring.maps.LngLat()]
	 */
	pointToLatLng: function (point, zoom, unbounded) {
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint, unbounded);
	},

	project: function (lnglat) {
		return this.projection.project(lnglat);
	},

	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	}
};
