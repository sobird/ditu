/**
 * google.maps.event
 * 
 * @see  https://developers.google.com/maps/documentation/javascript/reference?hl=zh-CN#MapsEventListener
 */

(function(){
	console.log('EventUtil : Begin');
	var eventListenerIdIndex = 0;
	function EventListener(target, eventName, handler, type){
		this.target = target;
		this.eventName = eventName;
		this.handler = handler;
		this.type = type;
		this.bindHandler = null;
		this.id = eventListenerIdIndex++;
		getEventList(target, eventName)[this.id] = this;
		target = null;
	}
	EventListener.prototype.remove = function() {
		if (this.target) {
			switch (this.type) {
				case 1:
					this.target.removeEventListener(this.eventName, this.handler, false);
					break;
                case 4:
					this.target.removeEventListener(this.eventName, this.handler, true);
					break;
                case 2:
					this.target.detachEvent('on' + this.eventName, this.bindHandler);
					break;
                case 3:
					this.target['on' + this.eventName] = null;
					break;
			}
			delete getEventList(this.target, this.eventName)[this.id];
			this.handler = this.target = this.bindHandler = null;
		}
	}

	EventUtil = {
		/**
		 * 跨浏览器事件处理程序注册。可以通过调用该函数所返回句柄的 eventRemoveListener(handle) 来删除此监听器。
		 * 
		 * @param {Object} instance  [description]
		 * @param {String} eventName [description]
		 * @param {Function} handler   [description]
		 * @param {Boolean} capture   [description]
		 * @return {Undefined} [description]
		 */
		addDomListener: function(instance, eventName, handler, capture){
			var listener = null;
			if (instance.addEventListener) {
				var type = capture ? 4 : 1;
				instance.addEventListener(eventName, handler, capture);
				listener = new EventListener(instance, eventName, handler, type);
			} else if (instance.attachEvent) {
				listener = new EventListener(instance, eventName, handler, 2);
				instance.attachEvent('on' + eventName, fixListener(listener));
			} else {
				instance['on' + eventName] = handler;
				listener = new EventListener(instance, eventName, handler, 3);
			}
			return listener;
		},

		/**
		 * 将在第一个事件之后删除侦听器的 addDomListener 周围的包装。
		 * 
		 * @param {[Object]} instance  [description]
		 * @param {[String]} eventName [description]
		 * @param {[Function]} handler   [description]
		 * @param {[Boolean]} capture   [description]
		 * @return {Undefined} [description]
		 */
		addDomListenerOnce: function(instance, eventName, handler, capture){
			var listener = this.addDomListener(instance, eventName, function(){
				listener.remove();
				handler.apply(instance, arguments);
			}, capture);
			return listener;
		},

		/**
		 * 将指定侦听器函数添加到指定对象实例的指定事件名称。
		 * 返回监听器的标识符，该标识符可与 removeListener() 配合使用。
		 * 
		 * @param {[Object]} instance  [description]
		 * @param {[String]} eventName [description]
		 * @param {[Function]} handler   [description]
		 * @return {Undefined} [description]
		 */
		addListener: function(instance, eventName, handler){
			return new EventListener(instance, eventName, handler, 0);
		},

		/**
		 * 将指定侦听器函数添加到指定对象实例的指定事件名称。
		 * 返回监听器的标识符，该标识符可与 removeListener() 配合使用。
		 * 
		 * @param {[Object]} instance  [description]
		 * @param {[String]} eventName [description]
		 * @param {[Function]} handler   [description]
		 * @return {Undefined} [description]
		 */
		addListenerOnce: function(instance, eventName, handler){
			var listener = this.addListener(instance, eventName, function(){
				listener.remove();
				handler.apply(instance, arguments);
			});
			return listener;
		},

		/**
		 * 对于指定实例，删除其所有事件的所有侦听器。
		 * 
		 * @param  {[Object]} instance [description]
		 * @return {[Undefined]}          [description]
		 */
		clearInstanceListeners: function(instance){
			var _eventList = getEventList(instance);
			for (var _uid in _eventList) {
				_eventList[_uid] && _eventList[_uid].remove();
			}
		},

		/**
		 * 对于指定实例，删除其指定事件的所有侦听器。
		 * 
		 * @param  {[Object]} instance  [description]
		 * @param  {[String]} eventName [description]
		 * @return {[Undefined]}           [description]
		 */
		clearListeners:function(instance, eventName){
			var _eventList = getEventList(instance, eventName);
			for (var _uid in _eventList) {
				_eventList[_uid] && _eventList[_uid].remove();
			}
		},

		/**
		 * 删除应由上述 addListener 返回的指定监听器。
		 * 
		 * @param  {[EventListener]} listener [description]
		 * @return {[Undefined]}          [description]
		 */
		removeListener: function(listener){
			listener.remove();
		},

		/**
		 * 触发指定事件。eventName 后的所有参数都以参数的形式传递到侦听器。
		 * 
		 * @param  {Object} instance  [description]
		 * @param  {String} eventName [description]
		 * @param  {*} var_args  [description]
		 * @return {Undefined           [description]
		 */
		trigger: function(instance, eventName, var_args){
			var _events = instance.__events_;
			if(_events && _events[eventName]) {
				var _args = Array.prototype.slice.call(arguments, 2),
				_eventList = getEventList(instance, eventName);

				for(var _uid in _eventList){
					var _event = _eventList[_uid];
					_event &&　_event.handler.apply(_event.target, _args);
				}
			}


		},

		bind: function(instance, eventName, handler, scope){
			return this.addListener(instance, eventName,bind(handler, scope));
		},

		forward: function(instance, eventName, otherInstance){
			return this.addListener(instance, eventName,(function(eventName, otherInstance){
				return function() {
					var _args = [otherInstance, eventName];
					for (var l = arguments ? arguments.length : 0, i = 0; i < l; ++i) {
						_args.push(arguments[i]);
					}
					EventUtil.trigger.apply(this, _args);
				}
			})(eventName, otherInstance));
		}
	};


	// --- some helper fn for EventUtil ---
	function bind(fn, scope) {
		if (2 < arguments.length) {
			var _t_args = Array.prototype.slice.call(arguments, 2);
			return function() {
				return fn.apply(scope || this, 0 < arguments.length ? _t_args.concat(Array.prototype.slice.call(arguments, 0)) : _t_args)
			};
		}
		return function() {
			return fn.apply(scope || this, arguments);
		}
	}
	function fixListener(listener){
		return listener.bindHandler = function(event){
			event = event || window.event;
			if(event && event.target) try {
				event.target = event.srcElement;
			} catch (e) {}

			var returnValue = listener.handler.apply(listener.target, [event]);
			if(event && 'click' == event.type){
				var target = event.srcElement;
				if(target && target.tagName === 'A' && target.href === 'javascript:void(0)') {
					return false;
				}
			}
			return returnValue;
		}
	}
	function getEventList(instance, eventName) {
		if (eventName) {
			instance.__events_ || (instance.__events_ = {});
			var _events = instance.__events_;
			_events[eventName] || (_events[eventName] = {});
			return _events[eventName];
		} else {
			var _eventList, _events = instance.__events_ || {};
			_eventList = {};
			for (var _eventName in _events) {
				for (var _uid in _events[_eventName]) {
					_eventList[_uid] = _events[_eventName][_uid];
				}
			}
			return _eventList
		}
	}

	//the follow is some test script
	//
	//		
	var tester = document.getElementById('tester');
	var listener = EventUtil.addDomListener(tester,'click',function(e){
		//alert('listener-1');
		//alert(e);
		console.log(this);
	});

	EventUtil.addDomListener(tester,'click',function(e){
		//alert('listener-2');
		//console.log(e);
	});

	EventUtil.addDomListener(tester,'mousehover',function(e){
		//alert(arguments.callee.caller);
		//console.log(e);
	});

	//console.log(getEventList(tester));
	//console.log(getEventList(tester,'click'));

	//EventUtil.clearInstanceListeners(tester);

	//EventUtil.clearListeners(tester,'click');

	//EventUtil.removeListener(listener);

	//EventUtil.trigger(tester, 'click');


	EventUtil.bind(tester, 'click', function(e){
		console.log(this);
		//alert('test EventUtil.bind');
	});
	//EventUtil.forward(tester, 'click', tester);

	EventUtil.trigger(tester, 'click','test');
	//
	function _tester(){
		return Function.prototype.call.apply(Array.prototype.slice, arguments);
	}

	//console.log(_tester(['a', 'b', 'c','d'],2));//c
	//
	console.log(undefined == null);
	console.log('EventUtil : End');
})();