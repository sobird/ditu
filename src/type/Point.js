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
		Point: function(x, y, round){
			this.x = (round ? Math.round(x) : x);
			this.y = (round ? Math.round(y) : y);
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

		clone: function(){
			return new Jaring.maps.Point(this.x, this.y);
		},

		/**
		 * Returns a string representation of this Point.
		 * 
		 * @return {String} [description]
		 */
		toString: function(){
			return '(' + this.x + ', ' + this.y + ')';
		},

		//Math 一些数学计算方法
		plus: function(size){
			return this.clone()._plus(size);
		},
		_plus: function(size){
			this.x += size.x;
			this.y += size.y;
			return this;
		},

		subtract: function (size) {
			return this.clone()._subtract(size);
		},
		_subtract: function (size) {
			this.x -= size.x;
			this.y -= size.y;
			return this;
		},

		multiplyBy: function (mix) {
			return this.clone()._multiplyBy(mix);
		},
		_multiplyBy: function(mix){
			if(Jaring.util.is(mix, 'array')){
				var num_x = mix[0];
				var num_y = mix[1];
			} else {
				var num_x = num_y = mix;
			}
			this.x = this.x * num_x;
			this.y = this.y * num_y;
			return this;
		},

		divideBy: function (mix, round) {
			return this.clone()._divideBy(mix, round);
		},
		_divideBy: function(mix){
			if(Jaring.util.is(mix, 'array')){
				var num_x = mix[0];
				var num_y = mix[1];
			} else {
				var num_x = num_y = mix;
			}
			this.x = this.x / num_x;
			this.y = this.y / num_y;
			return this;
		},

		distanceTo: function (size) {
			var x = size.x - this.x,
				y = size.y - this.y;
			return Math.sqrt(x * x + y * y);
		},

		round: function () {
			return this.clone()._round();
		},

		// destructive round
		_round: function () {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			return this;
		}
	});
})();