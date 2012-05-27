(function(){
	Jaring.create('Jaring.maps.Size', {
		Size: function(width, height){
			this.width = width;
			this.height = height;
		},

		equals: function(size){
			return !size ? false : size.width == this.width && size.height == this.height;
		},

		clone: function(){
			return new Jaring.maps.Size(this.width, this.height);
		},

		toString: function(){
			return '(' + this.width + ', ' + this.height + ')';
		},

		toPoint: function(){
			return new Jaring.maps.Point(this.width, this.height);
		},

		//Math 一些数学计算方法
		plus: function(){
			return this.clone()._plus(size);
		},
		_plus: function(size){
			this.width += size.width;
			this.height += size.height;
			return this;
		},

		subtract: function (size) {
			return this.clone()._subtract(size);
		},
		_subtract: function (size) {
			this.width -= size.width;
			this.height -= size.height;
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
			this.width * num_x;
			this.height * num_y;
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
			this.width = this.width / num_x;
			this.height = this.height / num_y;
			return this;
		},

		distanceTo: function (size) {
			var width = size.width - this.width,
				height = size.height - this.height;
			return Math.sqrt(width * width + height * height);
		},

		round: function () {
			return this.clone()._round();
		},

		// destructive round
		_round: function () {
			this.width = Math.round(this.width);
			this.height = Math.round(this.height);
			return this;
		}
	});
})();