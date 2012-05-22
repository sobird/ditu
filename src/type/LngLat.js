(function(){
	Jaring.create('Jaring.maps.LngLat', {
		LngLat: function(lng, lat, noWrap){
			// var lng = parseFloat(lng),
			// 	lat = parseFloat(lat);

			if (noWrap) {
				lng = ((lng - 180) % 360 + 360) % 360 - 180;
				lat = Math.max(Math.min(lat,  90), -90);
			}

			this.lng = lng;
			this.lat = lat;
		},

		lng: function(){
			return this.lng;
		},

		lat: function(){
			return this.lat;
		},

		equals: function(lnglat){
			var MAX_MARGIN = 1.0E-9;

			if (!(lnglat instanceof Jaring.maps.LngLat)) {
				return false;
			}
			var margin = Math.abs(this.lat() - lnglat.lat()) + Math.abs(this.lng() - lnglat.lng());

			return margin < MAX_MARGIN;
		},

		/**
		 * Haversine distance formula
		 * 
		 * @see http://en.wikipedia.org/wiki/Haversine_formula
		 * @see http://www.movable-type.co.uk/scripts/latlong.html
		 * @param  {[type]} lnglat [description]
		 * @return {[type]}        [description]
		 */
		distanceTo: function (lnglat){
			var R = 6378137;

			var deltalng = (lnglat.lng - this.lng) * Math.PI / 180;
			var deltaLat = (lnglat.lat - this.lat) * Math.PI / 180;
			var lat1 = this.lat * Math.PI / 180;
			var lat2 = lnglat.lat * Math.PI / 180;

			var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.pow(Math.sin(deltalng / 2), 2) * Math.cos(lat1) * Math.cos(lat2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			return R * c;
		}
		
		toString: function(){
			return '(' + this.lng + ', ' + this.lat + ')';
		}
	});
})();