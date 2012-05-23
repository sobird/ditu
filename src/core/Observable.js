/**
 * Jaring 框架顶层事件机制模型
 * 该事件模型借用了Google的事件模型
 * 
 * 对Google的事件模型进行了一个简单的封装
 * 
 * @author junlong.yang
 * @since 1.0.0
 * @return {[type]} [description]
 */
(function(){
	Jaring.create('Jaring.Observable',{
		on: function(eventName, handler){
			return Jaring.event.addListener(this, eventName, handler);
		},
		un: function(listener){
			return Jaring.event.removeListener(listener);
		},
		fire: function(eventName){
			var var_args = Array.prototype.slice.call(arguments, 1);
			return Jaring.event.trigger.apply(this, [this, eventName].concat(var_args));
		},
		bind: function(eventName, handler, scope){
			return Jaring.event.bind(this, eventName, handler, scope);
		},
		clear: function(eventName){
			if(eventName){
				Jaring.event.clearListeners(this, eventName);
			} else {
				Jaring.event.clearInstanceListeners(this);
			}
			
		}
	});
})();