(function(){
	Jaring.create('Jaring.maps.LngLat', {
		LngLat: function(lng, lat){
			this.lng = lng;
			this.lat = lat;
		},

		lng: function(){
			return this.lng;
		},

		lat: function(){
			return this.lat;
		}

		equals: function(lnglat){
			return !lnglat ? false : (Math.abs(this.lat() - lnglat.lat()) + Math.abs(this.lng() - lnglat.lng())) <= 1.0E-9;
		},
		
		toString: function(){
			return '(' + this.lng + ', ' + this.lat + ')';
		}
	});

	/**
	 * 比较两个值是否近似相等
	 * 
	 * @param  {Float/Number} a [description]
	 * @param  {Float/Number} b [description]
	 * @return {Boolean}   [description]
	 */
	function alike(a, b){
		return 1.0E-9 >= Math.abs(a - b);
	}
})();