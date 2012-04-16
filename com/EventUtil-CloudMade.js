(function(){
	EventUtil = {
		addEventListener: function (eventName, handler, scope) {
			var events = this.__events_ = this.__events_ || {};
			events[eventName] = events[eventName] || [];
			events[eventName].push({
				handler: handler,
				scope: scope || this
			});
			return this;
		},

		hasEventListeners: function (eventName) {
			var k = '__events_';
			return (k in this) && (eventName in this[k]) && (this[k][eventName].length > 0);
		},

		removeEventListener: function (eventName, handler, scope) {
			if (!this.hasEventListeners(eventName)) {
				return this;
			}

			for (var i = 0, events = this._leaflet_events, len = events[eventName].length; i < len; i++) {
				if (
					(events[eventName][i].handler === handler) &&
					(!scope || (events[eventName][i].scope === scope))
				) {
					events[eventName].splice(i, 1);
					return this;
				}
			}
			return this;
		},

		fireEvent: function (eventName, data) {
			if (!this.hasEventListeners(eventName)) {
				return this;
			}

			var event = Jaring.util.extend({
				eventName: eventName,
				target: this
			}, data);

			var listeners = this._leaflet_events[eventName].slice();

			for (var i = 0, len = listeners.length; i < len; i++) {
				listeners[i].action.call(listeners[i].scope || this, event);
			}

			return this;
		}
	}
})();



(function(){
	var _indexid = 0;
	DomEvent = {
		addListener: function (instance, eventName, handler, scope) {
			var id = _indexid++,
				key = eventName + id,
				_self = this;

			if (instance[key]) {
				return this;
			}

			var handler = function (e) {
				return handler.call(scope || instance, e || _self._getEvent());
			};

			if (L.Browser.touch && (eventName === 'dblclick') && this.addDoubleTapListener) {
				this.addDoubleTapListener(instance, handler, id);
			} else if ('addEventListener' in instance) {
				if (eventName === 'mousewheel') {
					instance.addEventListener('DOMMouseScroll', handler, false);
					instance.addEventListener(eventName, handler, false);
				} else if ((eventName === 'mouseenter') || (eventName === 'mouseleave')) {
					var originalHandler = handler,
						newType = (eventName === 'mouseenter' ? 'mouseover' : 'mouseout');
					handler = function (e) {
						if (!L.DomEvent._checkMouse(instance, e)) {
							return;
						}
						return originalHandler(e);
					};
					instance.addEventListener(newType, handler, false);
				} else {
					instance.addEventListener(eventName, handler, false);
				}
			} else if ('attachEvent' in instance) {
				instance.attachEvent("on" + eventName, handler);
			}

			instance[key] = handler;

			return this;
		}
	}
})();