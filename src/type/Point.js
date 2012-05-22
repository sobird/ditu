(function(){
	Jaring.create('Jaring.maps.Point',{
		/**
		 * 一个两维平面上的点; 地理像素点
		 * A point on a two-dimensional plane.
		 * 单位(unit): 像素(pixel)
		 * 
		 * @param {Number} x [left]
		 * @param {Number} y [top]
		 */
		Point: function(x, y){
			this.x = x;
			this.y = y;
		},
		
		/**
		 * Compares two Points if equals
		 * 
		 * @param  {Point} point [other point]
		 * @return {Boolean}       [description]
		 */
		equals: function(point) {
			return !point ? false : point.x == this.x && point.y == this.y;
		},

		/**
		 * Returns a string representation of this Point.
		 * 
		 * @return {String} [description]
		 */
		toString: function(){
			return '(' + this.x + ', ' + this.y + ')';
		}
	});
})();