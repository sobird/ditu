(function(){
	Jaring.create('Jaring.maps.Size', {
		Size: function(width, height){
			this.width = width;
			this.height = height;
		},

		equals: function(size){
			return !size ? false : size.width == this.width && size.height == this.height;
		},

		toString: function(){
			return '(' + this.width + ', ' + this.height + ')';
		}
	});
})();