/**
 * 
 */


function MVCObject(){}

MVCObject.prototype =  {
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
			_getterName = "get" + _firstUpper(_targetKey);
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
			_setterName = "set" + _firstUpper(_targetKey);
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
			_setterName = "set" + _firstUpper(key);
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
		getBindings(_self)[key] = Event.addListener(target, eventName,handler);
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
			 Event.removeListener(_listener);
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
};

// -- 下面是一些全局的函数方法 --

MVCObject.prototype.setOptions = MVCObject.prototype.setValues;

function triggerChanged(mvcObj, key) {
	var _change = key + "_changed";
	if (mvcObj[_change]){
		mvcObj[_change]();
	}else{
		mvcObj['changed'](key);
	}
	//触发外部绑定的监听器
	Event.trigger(mvcObj, key.toLowerCase() + "_changed");//触发事件
}

var _firstUpperList = {};
/**
 * 将给定的字符串首字母转为大写
 * 
 * @param {String} str
 * @return {String} str
 */
function _firstUpper(str) {
	return _firstUpperList[str] || (_firstUpperList[str] = str.substr(0, 1).toUpperCase() + str.substr(1));
}

function setAccessor(mvcObject, key, target, targetKey, noNotify) {
	getAccessors(mvcObject)[key] = {
		'target': target,
		'targetKey': targetKey
	};
	noNotify || triggerChanged(mvcObject, key);
}

function getAccessors(mvcObject) {
	if (!mvcObject._accessors) mvcObject._accessors = {};
	return mvcObject._accessors;
}
function getBindings(mvcObject) {
	if (!mvcObject._bindings) mvcObject._bindings = {};
	return mvcObject._bindings;
}