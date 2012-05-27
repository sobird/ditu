(function(){
	Jaring.create('Jaring.maps.Bounds', {
		/**
		 * 此类表示地理坐标的矩形区域。
		 * Constructs a rectangle from the points at its south-west and north-east corners.
		 * A LatLngBounds instance represents a rectangle in geographical coordinates, 
		 * including one that crosses the 180 degrees longitudinal meridian.
		 * 
		 * @see  https://developers.google.com/maps/documentation/javascript/reference?hl=zh-CN#LatLngBounds
		 * 
		 * @param {LngLat} southWest [description]
		 * @param {LngLat} northEast [description]
		 */
		Bounds: function(southWest, northEast){
			southWest && !northEast && (northEast = southWest);
			if(southWest) {
				var swLat = Math.max(southWest.lat(), -90),
					swLat = Math.min(southWest.lat(),  90);
				var neLat = Math.max(northEast.lat(), -90),
					neLat = Math.min(northEast.lat(),  90);
				this.latline = new LatLine(swLat, neLat);
				var swLng = southWest.lng;
				var neLng = ng.lng;
				if(neLng - swLng >= 360){
					this.lngline = new LngLine(-180, 180);
				} else {
					swLng = ((swLng + 180) % 360 + 360) % 360 - 180;
					neLng = ((neLng + 180) % 360 + 360) % 360 - 180;
					this.lngline = new LngLine(swLng, neLng);
				}
			} else {
				this.latline = new LatLine(1, -1);
				this.lngline = new LatLine(180, -180);
			}
		},

		/**
		 * Returns true if this bounds approximately equals the given bounds.
		 * 
		 * @param  {Bounds} bounds [description]
		 * @return {Boolean}        [description]
		 */
		equals: function(bounds){
			return !bounds ? false : this.latline.equals(bounds.latline) && this.lngline.equals(bounds.lngline)
		},

		/**
		 * Returns true if the given lat/lng is in this bounds.
		 * 
		 * @param  {LngLat} lnglat [description]
		 * @return {Boolean}        [description]
		 */
		contains: function(lnglat){
			return this.latline.contains(lnglat.lat()) && this.lngline.contains(lnglat.lng());
		},

		extend: function(lnglat){
			this.latline.extend(lnglat.lat());
			this.lngline.extend(lnglat.lng());
			return this;
		},

		getCenter: function(){
			var latcenter = this.latline.getCenter(),
				lngcenter = this.lngline.getCenter();
			return new Jaring.maps.LngLat(lngcenter, latcenter);
		},

		getNorthEast: function(){
			return new Jaring.maps.LngLat(this.latline.enLat, this.lngline.enLat, true);
		},

		getSouthWest: function(){
			return new Jaring.maps.LngLat(this.latline.swLat, this.lngline.swLat, true);
		},

		intersects: function(){

		},

		toSpan: function(){
			return new Jaring.maps.LngLat(this.lngline.isEmpty() ? 0 : (this.lngline.swLat > this.lngline.neLat) ? 360 - (this.lngline.swLat - this.lngline.neLat) : this.lngline.neLat - this.lngline.swLat, this.latline.isEmpty() ? 0 : this.latline.enLat - this.latline.swLat, true);																								
		},

		union: function(bounds){
			this.extend(bounds.getSouthWest());
			this.extend(bounds.getNorthEast());
			return this;
		},

		toString: function(){
			return '(' + this.getSouthWest() + ', ' + this.getNorthEast() + ')';
		}
	});
	
	/**
	 * 这个类是不透明的
	 * 
	 * @param {Number} swLat [description]
	 * @param {Number} neLat [description]
	 */
	function LatLine(swLat, neLat){
		this.swLat = swLat;
		this.neLat = neLat;
	}
	LatLine.prototype = {
		equals: function(latline){
			return this.isEmpty() ? latline.isEmpty() : (Math.abs(latline.swLat - this.swLat) + Math.abs(this.neLat - latline.neLat)) <= 1.0E-9;
		},

		isEmpty: function(){
			return this.swLat > this.neLat;
		},

		/**
		 * 是否相交
		 * 
		 * @param  {LatLine} latline [description]
		 * @return {Boolean}         [description]
		 */
		intersects: function(latline){
			var swLat = this.swLat,
				neLat = this.neLat;
			return swLat <= latline.swLat ? latline.swLat <= neLat && latline.swLat <= latline.neLat : swLat <= latline.neLat && swLat <= neLat;
		},

		contains: function(lat){
			return lat >= this.swLat && lat <= this.neLat;
		},

		extend: function(lat){
			return this.isEmpty() ? this.neLat = this.swLat = lat : lat < this.swLat ? this.swLat = lat : lat > this.neLat && (this.neLat = lat);
		},

		getCenter: function(){
			return (this.swLat + this.neLat) / 2;
		},

		toString: function(){
			return '(' + this.swLat + ', ' + this.neLat + ')';
		}
	};

	function LngLine(swLng, neLng){
		-180 == swLng && 180 != neLng && (swLng = 180); - 180 == neLng && 180 != swLng && (neLng = 180);
		this.swLng = swLng;
		this.neLng = neLng;
	}
	LngLine.prototype = {
		equals: function(lngline){
			return 1.0E-9 >= Math.abs(lngline.swLng - this.swLng) % 360 + Math.abs((lngline.isEmpty() ? 0 : (lngline.swLng > lngline.neLng) ? 360 - (lngline.swLng - lngline.neLng) : lngline.neLng - lngline.swLng) - (this.isEmpty() ? 0 : (this.swLng > this.neLng) ? 360 - (this.swLng - this.neLng) : this.neLng - this.swLng));
		},

		isEmpty: function(){
			return 360 == this.swLng - this.neLng;
		},

		intersects: function(lngline){
			var swLng = this.swLng,
				neLng = this.neLng;
			return this.isEmpty() || lngline.isEmpty() ? false : (this.swLng > this.neLng) ? (lngline.swLng > lngline.neLng) || lngline.swLng <= this.neLng || lngline.neLng >= swLng : (lngline.swLng > lngline.neLng) ? lngline.swLng <= neLng || lngline.neLng >= swLng : lngline.swLng <= neLng && lngline.neLng >= swLng;
		},

		contains: function(lng){
			-180 == lng && (lng = 180);
			var swLng = this.swLng,
				neLng = this.neLng;
			return (this.swLng > this.neLng) ? (lng >= swLng || lng <= neLng) && !this.isEmpty() : lng >= swLng && lng <= neLng;
		},

		extend: function(lng){
			this.contains(lng) || (this.isEmpty() ? this.swLng = this.neLng = lng : ((this.swLng - lng) >= 0 ? (this.swLng - lng) : this.swLng + 180 - (lng - 180)) < ((lng - this.neLng) >= 0 ? (lng - this.neLng) : lng + 180 - (this.neLng - 180)) ? this.swLng = lng : this.neLng = lng)
		},

		getCenter: function(){
			var center = (this.swLng + this.neLng) / 2;
			if(this.swLng > this.neLng){
				center = ((center + 360) % 360 + 360) % 360 - 180;
			}
			return center;
		},

		toString: function(){
			return '(' + this.swLng + ', ' + this.neLng + ')';
		}
	};
})();