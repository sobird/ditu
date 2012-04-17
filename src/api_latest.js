/**
 * 暂时在这一个文件中进行开发
 *
 * Copyleft 2011, AWEBGIS.COM
 * Released under LGPL License.
 *
 * @link	http://awebgis.com
 * @license	http://awebgis.com/license
 * @version	$Id$
 */

/**
 * 全局变量定义
 * 
 * Global VAR
 */
var whiteSpaceReg = /^\s*|\s*$/g;

com = {
	version:'1.0.0',
	license:'http://awebgis.com/license/',
	subversion:'$Id$',
	author:'CrossYou',
	link:'http://awebgis.com/',
	emptyFn: function(){}
};

/**
 * 一些助手函数
 * 
 * @namespace com.helper
 */
com.helper = {
	is : function(object, type) {
		if (!type)
			return object !== undefined;

		if (type == 'array' && (object.hasOwnProperty && object instanceof Array))
			return true;

		return typeof(object) == type;
	},
	
	each : function(object, callback, scope) {
		var n, l;

		if (!object || !com.helper.is(callback,'function'))
			return 0;

		scope = scope || object;

		if (object.length !== undefined) {
			// Indexed arrays, needed for Safari
			for (n = 0, l = object.length; n < l; n++) {
				if (callback.call(scope, object[n], n, object) === false)
					return 0;
			}
		} else {
			// Hashtables
			for (n in object) {
				if (object.hasOwnProperty(n)) {
					if (callback.call(scope, object[n], n, object) === false)
						return 0;
				}
			}
		}

		return 1;
	},
	
	/**
	 * 判断某元素是否在数组中，若在数组中，返回其位置索引值，否则返回 -1
	 * 
	 * @param {Array} array
	 * @param {Mixed} value
	 * @return {Number} index
	 */
	inArray : function(array, value) {
		var i, l;

		if (array) {
			for (i = 0, l = array.length; i < l; i++) {
				if (array[i] === value)
					return i;
			}
		}

		return -1;
	},
	
	trim : function(s) {
		return (s ? '' + s : '').replace(whiteSpaceReg, '');
	},
	
	/**
	 * 扩展方法,简单的浅拷贝
	 */
	extend : function(destination) {
		var i, l;

		for (i = 1, l = arguments.length; i < l; i++) {
			this.each(arguments[i], function(value, property) {
				if (value !== undefined){
					destination[property] = value;
				}
			});
		}

		return destination;
	},
	
	/**
	 * 创建命名空间
	 */
	createNamespace : function(namespace,root){
		var i, v, ns;

		ns = root || window;

		if(!this.is(namespace,'string')){
			return ns;
		}

		namespace = namespace.split('.');
		for (i=0; i<namespace.length; i++) {
			v = namespace[i];

			if (!ns[v]){
				ns[v] = {};
			}

			ns = ns[v];
		}

		return ns;
	},
	
	/**
	 * 创建一个类
	 */
	createClass : function(name,body,root){
		var part, namespace, classname, extendclass, construct, haveConstruct = false;
		
		part = /^((static) )?([\w.]+)( extends ([\w.]+))?/.exec(name);
		//console.log(part);
		
		//classname 类名称
		classname = part[3].match(/(^|\.)(\w+)$/i)[2];
		//console.log(classname);
		
		//类命名空间
		namespace = part[3].replace(/\.\w+$/, '');
		//console.log(namespace);
		
		namespace = classname == namespace?'':namespace;
		//console.log(namespace);
		
		namespace = this.createNamespace(namespace,root);
		console.log(namespace);
		
		//若在给定命名空间下的类已经存在，则返回
		if(namespace[classname]){
			return;
		}
		
		//静态类，对象字面量
		if (part[2] == 'static') {
			namespace[classname] = body;
			
			return;
		}
		
		// Create default constructor
		if (!body[classname]) {
			body[classname] = com.emptyFn;//默认空的构造方法(函数)
			haveConstruct = true;
		}
		
		//在给定命名空间下创建类/构造函数
		namespace[classname] = body[classname];
		this.extend(namespace[classname].prototype, body);
		
		//extends
		extendclass = part[5];
		if (extendclass) {
			superprototype = this.resolve(extendclass).prototype;
			superclassname = extendclass.match(/\.(\w+)$/i)[1];
			
			construct = namespace[classname];
			
			if (haveConstruct) {
				// Add passthrough constructor
				namespace[classname] = function() {
					return superprototype[superclassname].apply(this, arguments);
				};
			} else {
				// Add inherit constructor
				namespace[classname] = function() {
					this.parent = superprototype[superclassname];
					return construct.apply(this, arguments);
				};
			}
			//起什么作用了?
			namespace[classname].prototype[classname] = namespace[classname];
			
			// Add super methods
			this.each(superprototype, function(fn, name) {
				namespace[classname].prototype[name] = fn;
			});
			
			// Add overridden methods
			this.each(body, function(fn, name) {
				// Extend methods if needed
				if (superprototype[name]) {
					namespace[classname].prototype[name] = function() {
						this.parent = superprototype[name];
						return fn.apply(this, arguments);
					};
				} else {
					if (name != classname){
						namespace[classname].prototype[name] = fn;
					}
				}
			});
		}
		
		namespace[classname].prototype['toString'] = function(){return classname};
		// 添加类静态方法
		this.each(body['static'], function(f, n) {
			namespace[classname][n] = f;
		});
	},
	
	resolve : function(Class, root) {
		var i, l, n, o;

		o = root || window;

		n = Class.split('.');

		for (i = 0, l = n.length; i < l; i++) {
			o = o[n[i]];

			if (!o){
				throw new Error('类{'+Class+'}未定义');
				break;
			}
				
		}

		return o;
	},
	
	/**
	 * 首字母大写
	 */
	firstLetterUpper : function(string) {
		var list = com.static['firstLetterUpperList'];
		return list[string] || (list[string] = string.substr(0, 1).toUpperCase() + string.substr(1));
	}
};//com.helper : END

//扩展javascript的Function原型
com.helper.extend(Function.prototype,{
	/**
	 * 将给定的obj对象应用到Function对象
	 * 
	 * @param Object : obj
	 */
    bind: function(obj) {
        var _this = this;
        return function() {
            return _this.apply(obj, arguments);
        };
    },
    
    /**
     * 延迟 将给定的obj对象应用到Function对象
     */
    defer: function(time, obj, args) {
        var _this = this;
        return setTimeout(function() {
            _this.apply(obj, args || []);
        },time);
    },
    
    time: function(time, obj, args, $) {
        var _this = this;
        if ($) _this.apply(obj, args || []);
        return setInterval(function() {
            _this.apply(obj, args || [])
        },time)
    }
});

com.createClass = com.helper.createClass.bind(com.helper);

//创建静态变量命名空间
com.createClass('static com.static',{
	firstLetterUpperList : {}
})

/**
 * MVCObject
 * 
 * @namespace com.BaseClass
 * @classname MVCObject
 */
com.createClass('com.BaseClass.MVCObject',{
	/**
	 * MVCObject 获取值
	 * 
	 * @param {String} str
	 * @return {*}
	 */
	get : function(key) {
		var _accessor = this.MVCObject.getAccessors(this)[key];
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
		var _accessors = this.MVCObject.getAccessors(this);
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
			this.MVCObject.triggerChanged(this, key);
		}
		
	},
	
	/**
	 * 通知所有观察者此属性有所改变。这会通知绑定到对象属性的对象以及绑定到的对象。
	 * 
	 * @param {String} key
	 */
	notify : function(key) {
		var _accessors = this.MVCObject.getAccessors(this);
		if(_accessors.hasOwnProperty(key)){
			var _accessor = _accessors[key];
			_accessor.target.notify(_accessor.targetKey);
		}else{
			this.MVCObject.triggerChanged(this, key);
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
			this.MVCObject.triggerChanged(_self, key);
		};
		_self.unbind(key);
		//绑定外部监听器
		this.MVCObject.getBindings(_self)[key] = Event.addListener(target, eventName,handler);
		this.MVCObject.setAccessor(_self, key, target, targetKey, noNotify);
	},
	
	/**
	 * 删除绑定。取消绑定会将未绑定属性设置为当前值。将不会通知该对象，因为值尚未更改。
	 * 
	 * @param {String} key
	 */
	unbind : function(key) {
		var _listener = this.MVCObject.getBindings(this)[key];
		 if (_listener) {
			 delete this.MVCObject.getBindings(this)[key];
			 //移除外部绑定的监听器
			 Event.removeListener(_listener);
			 var _value = this.get(key);
			 delete this.MVCObject.getAccessors(this)[key];
			 this[key] = _value;
		 }
	},
	
	/**
	 * 删除所有绑定
	 */
	unbindAll : function() {
		var _keys = [];
		var _listeners = this.MVCObject.getBindings(this);
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
	
	changed : function(key){},
	
	'static': {
		setAccessor : function(mvcObject, key, target, targetKey, noNotify) {
			this.getAccessors(mvcObject)[key] = {
				'target': target,
				'targetKey': targetKey
			};
			noNotify || this.triggerChanged(mvcObject, key);
		},
		
		getAccessors : function(mvcObject) {
			if (!mvcObject._accessors) mvcObject._accessors = {};
			return mvcObject._accessors;
		},
		
		getBindings : function(mvcObject) {
			if (!mvcObject._bindings) mvcObject._bindings = {};
			return mvcObject._bindings;
		},
		
		triggerChanged : function (mvcObj, key) {
			var _change = key + "_changed";
			if (mvcObj[_change]){
				mvcObj[_change]();
			}else{
				mvcObj['changed'](key);
			}
			//触发外部绑定的监听器
			Event.trigger(mvcObj, key.toLowerCase() + "_changed");//触发事件
		}
	}
});//com.BaseClass.MVCObject : END


var mvc = new com.BaseClass.MVCObject();
//console.log(mvc.bindTo('name'));





com.BaseClass.MVCObject.name = 'test';

com.createClass('com.maps.Map extends com.BaseClass.MVCObject',{
	Map:function(){
		this.name = 'test';
	},
	get:function(){
		alert('test');
	}
});

var ttt = new com.maps.Map();
ttt.get();
console.log(ttt);



(function(){
	var k = 0;

	/**
	 * 此类是不透明的。它没有方法和构造函数。
	 * 此类的实例从 addListener()、addDomListener() 返回，并最终传递回 removeListener()。
	 * 
	 * @return MapsEventListener
	 */
	com.createClass('MapsEventListener',{
		MapsEventListener : function(target, eventName, handler, type) {
	        this.target = target;
	        this.eventName = eventName;
	        this.handler = handler;
	        this.type = type;
	        this.bindHandler = null;
	        this.id = k++;
	        r(target, eventName)[this.id] = this;
	        if (Util.Browser().ie) {//如果是IE浏览器
	        	Event.listeners[this.id] = this;
	        }
	    },
	    remove: function() {
	        if (this.target) {
	            switch (this.type) {
	            case 1:
	                this.target.removeEventListener(this.eventName, this.handler, false);
	                break;
	            case 4:
	                this.target.removeEventListener(this.eventName, this.handler, true);
	                break;
	            case 2:
	                this.target.detachEvent("on" + this.eventName, this.bindHandler);
	                break;
	            case 3:
	                this.target["on" + this.eventName] = null
	            }
	            delete r(this.target, this.eventName)[this.id];
	            delete Event.listeners[this.id];
	            this.target = this.handler = null
	        }
	    }
	})
})();



/**
 * 切片生成核心规则
 * 
 * @param lng
 * @param lat
 * @param level
 * @returns {___anonymous2224_2240}
 */
function tilenum(lng,lat,level){
	var x = Math.floor(((lng+180)/360)*Math.pow(2,level));
	
	var sinlat = Math.sin(lat * Math.PI/180);
	var y = Math.floor((0.5-Math.log((1+sinlat)/(1-sinlat)) / (4 * Math.PI)) * Math.pow(2,level));
	
	return {
		x:x,
		y:y
	}
}

//console.log(tilenum(-146.07421862499996,0.486551102694577,3));