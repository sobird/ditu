Jaring.Projection.LngLat = {
	project: function (lnglat) {
		return new Jaring.maps.Point(lnglat.lng, lnglat.lat);
	},

	unproject: function (point, noWrap) {
		return new Jaring.maps.LngLat(point.x, point.y, noWrap);
	}
};
