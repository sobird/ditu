(function(){
	Jaring.create('Jaring.maps.Offset', {
		Offset: function(left, top, round){
			var left = parseFloat(left),
				top  = parseFloat(top);

			if (isNaN(left) || isNaN(top)) {
				throw new Error('Invalid Offset object: (' + left + ', ' + top + ')');
			}

			this.left = (round ? Math.round(left) : left);
			this.top = (round ? Math.round(top) : top);
		},

		equals: function(offset){
			return !offset ? false : offset.left == this.left && offset.top == this.top;
		},

		clone: function(){
			return new Jaring.maps.Offset(this.left, this.top);
		},

		toString: function(){
			return '(' + this.left + ', ' + this.top + ')';
		},

		toPoint: function(){
			return new Jaring.maps.Point(this.left, this.top);
		},

		plus: function(offset){
			return this.clone()._plus(offset);
		},
		_plus: function(offset){
			this.left += offset.left;
			this.top += offset.top;
			return this;
		},
	});
})();