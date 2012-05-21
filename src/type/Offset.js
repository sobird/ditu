(function(){
	Jaring.create('Jaring.maps.Offset', {
		Offset: function(left, top){
			this.left = left;
			this.top = top;
		},

		equals: function(size){
			return !size ? false : size.left == this.left && size.top == this.top;
		},

		toString: function(){
			return '(' + this.left + ', ' + this.top + ')';
		}
	});
})();