(function(){
	Jaring.dom = {
		get: function(id){
			return (typeof id === 'string' ? document.getElementById(id) : id);
		}
	}
})();