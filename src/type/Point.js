(function(){
	Jaring.create('Jaring.maps.Point',{
		/**
		 * 一个两维平面上的点
		 * A point on a two-dimensional plane.
		 * 
		 * @param {Number} x [left]
		 * @param {Number} y [top]
		 */
		Point: function(x, y){
			this.x = x;
			this.y = y;
		},
		
		/**
		 * Compares two Points
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