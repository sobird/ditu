/**
 * 球面墨卡托投影
 * 该投影在OpenLayers community 版本和其他 OSG community版本中都有使用。
 * Google Maps、微软 Virtual Earth、Yahoo Maps 和其他商业地图API的提供者都是使用该投影。
 * 该投影式是将地球当做一个球体而不是椭球体。然后应用墨卡托投影的方法，将地图投影到一个地图平面上。
 * 
 * 为了正确的在商业地图API上叠加地图数据，就必须使用该投影。
 * 最基本的是在商业地图API上显示栅格瓦片地图, 例如: TMS, WMS以及其他类似的瓦片。
 * 
 * 为了更好的使用商业地图API, 基于Google Maps的数据生成人员也需要使用该投影，最基本的例如: OpenStreetMap,
 * 栅格地图瓦片都是使用的 球面墨卡托投影
 * 
 * @type {Object}
 */
Jaring.Projection.SphericalMercator = {
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) { // (LatLng) -> Point
		var d = Math.PI / 180,
			max = this.MAX_LATITUDE,
			lat = Math.max(Math.min(max, latlng.lat), -max),
			x = latlng.lng * d,
			y = lat * d;
		y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

		return new Jaring.maps.Point(x, y);
	},

	unproject: function (point, unbounded) { // (Point, Boolean) -> LatLng
		var d = 180 / Math.PI,
			lng = point.x * d,
			lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;

		return new Jaring.maps.LngLat(lat, lng, unbounded);
	}
};
