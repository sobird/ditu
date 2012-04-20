(function(){
	Jaring.create('Jaring.maps.LngLat', {
		LngLat: function(lng, lat, noWrap){
			if (noWrap) {
				lng = ((lng - 180) % 360 + 360) % 360 - 180;
				lat = Math.max(lat, -90);
				lat = Math.min(lat,  90);
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
			return !lnglat ? false : (Math.abs(this.lat() - lnglat.lat()) + Math.abs(this.lng() - lnglat.lng())) <= 1.0E-9;
		},
		
		toString: function(){
			return '(' + this.lng + ', ' + this.lat + ')';
		}
	});
})();