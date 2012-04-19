(function(){
	Jaring.create('Jaring.maps.Bounds', {
		/**
		 * 此类表示地理坐标的矩形区域。
		 * Constructs a rectangle from the points at its south-west and north-east corners.
		 * 
		 * @param {LngLat} sw [description]
		 * @param {LngLat} ne [description]
		 */
		Bounds: function(sw, ne){
			sw && !ne && (ne = sw);
			if (sw) {
				var c = Cd(sw.lat(), -90, 90),
					d = Cd(ne.lat(), -90, 90);
				this.aa = new ge(c, d);
				c = sw.lng();
				d = ne.lng();
				360 <= d - c ? this.ba = new ce(-180, 180) : (c = Dd(c, -180, 180), d = Dd(d, -180, 180), this.ba = new ce(c, d))
			} else {
				this.aa = new ge(1, -1), 
				this.ba = new ce(180, -180)
			}
			//
			if(sw) {
				var swLat = Math.max(sw.lat(), -90),
					swLat = Math.min(sw.lat(),  90);
				var neLat = Math.max(ne.lat(), -90),
					neLat = Math.min(ne.lat(),  90);
				var swLng = sw.lng;
				var neLng = ng.lng;
				if(neLng - swLng >= 360){
					this.ba = new ce(-180, 180);
				} else {

				}
			}


		},

		equals: function(){

		},

		contains: function(){

		},

		getCenter: function(){

		},

		getNorthEast: function(){

		},

		getSouthWest: function(){

		},

		union: function(){

		},

		toString: function(){

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
		equals: function(){

		},

		isEmpty: function(){
			return 360 == this.swLng - this.neLng;
		},

		intersects: function(){
			
		}

	};
})();