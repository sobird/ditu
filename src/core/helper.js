(function(){
	Jaring.helper = {
		camelCase: (function(){
			var list = {};
			return function(string){
				return list[string] || (list[string] = string.substr(0, 1).toUpperCase() + string.substr(1));
			}
		})()
	};
})();