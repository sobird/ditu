(function(){
	var firstLetterUpperList = {};
	Jaring.create('Jaring.MVCObject extends Jaring.Observable',{
		/**
		 * MVCObject 获取值
		 * 
		 * @param {String} str
		 * @return {*}
		 */
		get : function(key) {
			var _accessor = getAccessors(this)[key];
			if (_accessor) {
				var _targetKey = _accessor.targetKey,
				_target = _accessor.target,
				_getterName = "get" + firstLetterUpper(_targetKey);
				return _target[_getterName] ? _target[_getterName]() : _target.get(_targetKey);
			} else {
				return this[key];
			}
		},
		
		/**
		 * MVCObject 设置值
		 * 
		 * @param {String} str
		 * @param {*} value
		 */
		set : function(key, value) {
			var _accessors = getAccessors(this);
			if (_accessors.hasOwnProperty(key)) {
				var _accessor = _accessors[key],
				_targetKey = _accessor.targetKey,
				_target = _accessor.target,
				_setterName = "set" + firstLetterUpper(_targetKey);
				if (_target[_setterName]){
					_target[_setterName](value);
				}else{
					_target.set(_targetKey, value);
				}
			} else {
				this[key] = value;
				triggerChanged(this, key);
			}
			
		},
		
		/**
		 * 通知所有观察者此属性有所改变。这会通知绑定到对象属性的对象以及绑定到的对象。
		 * 
		 * @param {String} key
		 */
		notify : function(key) {
			var _accessors = getAccessors(this);
			if(_accessors.hasOwnProperty(key)){
				var _accessor = _accessors[key];
				_accessor.target.notify(_accessor.targetKey);
			}else{
				triggerChanged(this, key);
			}
		},
		
		/**
		 * 设置键值对集合
		 * 
		 * @param {Object|undefined} keyValues
		 * @return {None}
		 */
		setValues : function(keyValues) {
			for (var key in keyValues) {
				var _value = keyValues[key],
				_setterName = "set" + firstLetterUpper(key);
				this[_setterName] ? this[_setterName](_value) : this.set(key, _value);
			}
		},
		
		/**
		 * 将视图绑定到模型
		 * 
		 * @param {String} key
		 * @param {MVCObject} target
		 * @param {String} targetKey
		 * @param {Boolean} noNotify
		 */
		bindTo : function(key, target, targetKey, noNotify) {
			var targetKey = targetKey || key,
			_self = this,
			eventName = targetKey.toLowerCase() + "_changed",
			handler = function() {
				triggerChanged(_self, key);
			};
			_self.unbind(key);
			//绑定外部监听器
			getBindings(_self)[key] = Jaring.event.addListener(target, eventName,handler);
			setAccessor(_self, key, target, targetKey, noNotify);
		},
		
		/**
		 * 删除绑定。取消绑定会将未绑定属性设置为当前值。将不会通知该对象，因为值尚未更改。
		 * 
		 * @param {String} key
		 */
		unbind : function(key) {
			var _listener = getBindings(this)[key];
			 if (_listener) {
				 delete getBindings(this)[key];
				 //移除外部绑定的监听器
				 Jaring.event.removeListener(_listener);
				 var _value = this.get(key);
				 delete getAccessors(this)[key];
				 this[key] = _value;
			 }
		},
		
		/**
		 * 删除所有绑定
		 */
		unbindAll : function() {
			var _keys = [];
			var _listeners = getBindings(this);
			for (var key in _listeners) {
				_keys.push(key);
			}
			if(_keys){
				var _self = this;
				for (var i = 0, len = _keys.length; i < len; ++i){
					(function() {
						return _self.unbind.apply(_self || this, arguments);
					})(_keys[i], i);
				}
			}
		},
		
		changed : function(key){}
	});

	function firstLetterUpper(string) {
		var list = firstLetterUpperList;
		return list[string] || (list[string] = string.substr(0, 1).toUpperCase() + string.substr(1));
	}

	function getAccessors(mvcObject) {
		if (!mvcObject._accessors) {
			mvcObject._accessors = {};
		}
		return mvcObject._accessors;
	}

	function setAccessor(mvcObject, key, target, targetKey, noNotify) {
		this.getAccessors(mvcObject)[key] = {
			'target': target,
			'targetKey': targetKey
		};
		noNotify || this.triggerChanged(mvcObject, key);
	}

	function getBindings(mvcObject) {
		if (!mvcObject._bindings) {
			mvcObject._bindings = {};
		}
		return mvcObject._bindings;
	}
		
	function triggerChanged(mvcObj, key) {
		var _change = key + "_changed";
		if (mvcObj[_change]){
			mvcObj[_change]();
		}else{
			mvcObj['changed'](key);
		}
		//触发外部绑定的监听器
		Jaring.event.trigger(mvcObj, key.toLowerCase() + "_changed");//触发事件
	}
})();