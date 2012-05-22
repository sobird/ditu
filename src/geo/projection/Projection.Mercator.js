/**
 * 墨卡托(Mercator)投影
 * 
 * @see  http://baike.baidu.com/view/301981.htm
 * @type {Object}
 */
Jaring.Projection.Mercator = {
	/**
	 * 最大的维度值
	 * 
	 * @const
	 * @type {Object.<Number>}
	 */
	MAX_LATITUDE: 85.0840591556,

	/**
	 * 地球半径最小值
	 * 
	 * @const
	 * @type {Object.<Number>}
	 */
	R_MINOR: 6356752.3142,

	/**
	 * 地球半径最大值
	 * 
	 * @const
	 * @type {Object.<Number>}
	 */
	R_MAJOR: 6378137,

	project: function (lnglat) { // (LatLng) -> Point
		var d = Math.PI / 180,
			max = this.MAX_LATITUDE,
			lat = Math.max(Math.min(max, lnglat.lat), -max),
			r = this.R_MAJOR,
			r2 = this.R_MINOR,
			x = lnglat.lng * d * r,
			y = lat * d,
			tmp = r2 / r,
			eccent = Math.sqrt(1.0 - tmp * tmp),
			con = eccent * Math.sin(y);

		con = Math.pow((1 - con) / (1 + con), eccent * 0.5);

		var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
		y = -r2 * Math.log(ts);

		return new Jaring.maps.Point(x, y);
	},

	unproject: function (point, unbounded) { // (Point, Boolean) -> LatLng
		var d = Jaring.LatLng.RAD_TO_DEG,
			r = this.R_MAJOR,
			r2 = this.R_MINOR,
			lng = point.x * d / r,
			tmp = r2 / r,
			eccent = Math.sqrt(1 - (tmp * tmp)),
			ts = Math.exp(- point.y / r2),
			phi = (Math.PI / 2) - 2 * Math.atan(ts),
			numIter = 15,
			tol = 1e-7,
			i = numIter,
			dphi = 0.1,
			con;

		while ((Math.abs(dphi) > tol) && (--i > 0)) {
			con = eccent * Math.sin(phi);
			dphi = (Math.PI / 2) - 2 * Math.atan(ts * Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
			phi += dphi;
		}

		return new Jaring.LatLng(phi * d, lng, unbounded);
	}
};
