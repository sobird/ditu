(function(){
	Jaring.util = {
		/**
		 * 判断对象是否为给定的类型
		 * 
		 * @return Boolean
		 */
		is: function(object, type) {
			if (!type){
				return object !== undefined;
			}

			if (type == 'array' && (object.hasOwnProperty && object instanceof Array)){
				return true;
			}

			return typeof(object) == type;
		},

		bind: function(fn, obj){
			var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
			return function () {
				return fn.apply(obj, args || arguments);
			};
		},

		each: function(object, callback, scope) {
			var n, l;

			if (!object || !this.is(callback,'function'))
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
		inArray: function(array, value) {
			var i, l;

			if (array) {
				for (i = 0, l = array.length; i < l; i++) {
					if (array[i] === value)
						return i;
				}
			}

			return -1;
		},
		
		trim: function(s) {
			return (s ? '' + s : '').replace(whiteSpaceReg, '');
		},

		/**
		 * 简单的浅拷贝
		 */
		extend: function(destination) {
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
		namespace: function(namespace,root){
			var i, v, ns;

			ns = root || window;

			if(namespace == ''){
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
		createClass: function(name,body,root){
			var part, namespace, classname, extendclass, construct, haveConstruct = false;
			
			part = /^((static) )?([\w.]+)( extends ([\w.]+))?/.exec(name);
			
			//classname 类名称
			classname = part[3].match(/(^|\.)(\w+)$/i)[2];
			
			//类命名空间
			namespace = part[3].replace(/\.\w+$/, '');
			
			namespace = classname == namespace?'':namespace;
			
			namespace = this.namespace(namespace,root);
			
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
				body[classname] = Jaring.emptyFn;//默认空的构造方法(函数)
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
					if(name != superclassname){
						namespace[classname].prototype[name] = fn;
					}
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
		
		resolve: function(Class, root) {
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
	}

	Jaring.create = Jaring.util.bind(Jaring.util.createClass, Jaring.util);
})();