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

		equals: function(size){
			return !size ? false : size.left == this.left && size.top == this.top;
		},

		toString: function(){
			return '(' + this.left + ', ' + this.top + ')';
		},

		toPoint: function(){
			return new Jaring.maps.Point(this.left, this.top);
		},
	});
})();