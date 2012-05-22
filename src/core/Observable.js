(function(){
	Jaring.create('Jaring.Observable',{
		on: function(eventName, handler){
			Jaring.event.addListener(this, eventName, handler);
		},
		un: function(listener){
			Jaring.event.removeListener(listener);
		},
		fire: function(eventName, var_args){
			Jaring.event.trigger(this, eventName, var_args);
		},
		bind: function(eventName, handler, scope){
			Jaring.event.bind(this, eventName, handler, scope);
		}
	});
})();