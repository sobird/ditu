/**
 * 官方统一规定了代码EPSG:3857来代替EPSG:900913
 * 谷歌使用的就是 EPSG:900913 即: EPSG:3857
 * 
 * GIS中, 通常用 EPSG 的代码来表示一种地图投影。
 * 最常用的 EPSG:4326, 在地图上将经纬度直接当做X/Y对待。
 * 
 * 球面墨卡托投影在官方指定的代码为EPSG:3857。
 * 但是在官方发布以前, 很多软件已经使用了EPSG:900931代码来表示该投影,
 * OpeanLayers仍然使用这个非官方的代码。
 * 
 * EPSG:4326 就是经纬度坐标的描述。
 * EPSG:900931 则是用 米 做单位的 X/Y 坐标的描述。
 * 
 * @type {[type]}
 */
Jaring.CRS.EPSG3857 = Jaring.util.extend({}, Jaring.CRS, {
	/**
	 * 所使用的参考坐标系 代码
	 * 
	 * @type {String}
	 */
	code: 'EPSG:3857',

	/**
	 * 该坐标系下, 所使用的投影
	 * 
	 * @default [Jaring.Projection.SphericalMercator] 球面墨卡托投影
	 * @type {[type]}
	 */
	projection: Jaring.Projection.SphericalMercator,

	/**
	 * 坐标转换对象
	 * 
	 * @type {Transformation}
	 */
	transformation: new Jaring.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

	project: function (latlng) { // (JaringatJaringng) -> Point
		var projectedPoint = this.projection.project(latlng),
			earthRadius = 6378137;
		return projectedPoint.multiplyBy(earthRadius);
	}
});

/**
 * 官方统一规定了代码EPSG:3857来代替EPSG:900913
 */
Jaring.CRS.EPSG900913 = Jaring.util.extend({}, Jaring.CRS.EPSG3857, {
	code: 'EPSG:900913'
});

// 测试一下 ~~
var point = Jaring.CRS.EPSG3857.latLngToPoint(new Jaring.maps.LngLat(116.39712896958922, 39.9165275426627), 13);
console.log(point);