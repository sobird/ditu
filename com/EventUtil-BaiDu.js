(function(){
	var guid = 0;
	EventUtil = {
		addEventListener: function(eventName, handler, key) {//BaseClass addEventListener 原型
			this._listeners = this._listeners || {};

			var _listeners = this._listeners,_guid;
			if (typeof key == "string" && key) {
				if (/[^\w\-]/.test(key)) {//这个正则是干嘛用的??
					return false;
				} else {
					handler.hashCode = key;
					_guid = key;
				}
			}
			if (eventName.indexOf("on") != 0) {
				eventName = "on" + eventName;
			}
			if (typeof _listeners[eventName] != "object") {
				_listeners[eventName] = {};
			}
			_guid = _guid || guid++;
			handler.hashCode = _guid;
			if (_listeners[eventName][_guid]) {
				this._wlog("warning", "repeat key:" + _guid);
			}
			_listeners[eventName][_guid] = handler;
		}
	}



	// test script 
	// 
	EventUtil.addEventListener('click', function(){

	});

	console.log(EventUtil);
})();