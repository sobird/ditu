/**
 * mapbar.js
 * 
 * 
 * @author	CrossYou at 2011/05/18 build.
 * @link	http://www.crossyou.cn/
 * @version	$Id$
 */

(function(win){
	var d = document;
	
	var com = {
		/**
		 * mapbar 的创建日期
		 * 
		 * @type String
		 */	
		build 		: '20110518',
		
		/**
		 * Mapbar Api 的发布日期
		 * 
		 * @type String
		 */	
		release		: '{release date}',
		
		/**
		 * Mapbar Api 版本号
		 * 
		 * @type String
		 */
		version 	: '1.0.0',

		/**
		 * 
		 * 如果需要退出 each 循环可使回调函数返回 false，其它返回值将被忽略
		 * 
		 * @param {Object} o 需要遍历的对象
		 * @param {Function} cbk 用来执行每一项的回调函数
		 * @param {Object} s 
		 * @returns {Boolean}
		 */
		each 		: function(o, cbk, s){
			if(!o){
				return false;
			}
			if(typeof cbk != 'function'){
				return o;
			}
			
			s = s || o;
			
			if(o.length === undefined ){
				for (var n in o) {
					if (o.hasOwnProperty(n)) {
						if (cbk.call(s, o[n], n, o) === false)
							return 0;
					}
				}
			} else {
				for (var n=0, l = o.length; n < l; n++) {
					if (cbk.call(s, o[n], n, o) === false)
						return 0;
				}
			}
			
			return true;
			
		},
		
		/**
		 * 将给定的对象扩展到目标对象中
		 * 
		 * @param {Object} destination
		 * @param {Object} source
		 * @returns {Object}
		 */
		extend 		: function(destination, source) {//扩展对象函数
			var value	 = null;
			var property = null;
			if (destination && source) {
				for (property in source) {
					value = source[property];
					if (value !== undefined) {
						destination[property] = value;
					}
				}
				var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;
				if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
					destination.toString = source.toString;
				}
			}
			return destination;
		},
		
		/**
		 * 创建一个类
		 * 
		 * @returns {Class}
		 */
		createClass	: function(){
			var _class = function() {
				com.BaseClass.onInstant.call(this);//实例化创建对象hashCode并保存
				var cn = _class._className;
				if (this[cn]) {
					this.toString  = function(){return this._className;};
					this[cn].apply(this, arguments);
				}
				if(cn)this._className = cn;
			};
			var extended = {}, parent;
			
			for (var i = 0,l = arguments.length; i < l; ++i) {
				var arg = arguments[i];
				
				if(i == 0 && typeof arg == 'string'){
					_class._className = arg;
				}else{
					if (typeof arg == 'function') {
						parent = arg.prototype;
					} else {
						parent = arg;
					}
				}
				this.extend(extended, parent);
			}
			_class.prototype = extended;
			
			_class._proto_ = function(parent){//类原型继承法
				var property,_obj,_source = this.prototype,
				_Temp = function() {};
				_Temp.prototype = parent.prototype;
				_obj = this.prototype = new _Temp();

				for (property in _source) {
					//if(property.substr(0,1)!="_" ){
						_obj[property] = _source[property];
					//}
				}
				
				this.prototype.constructor = _source.constructor;
				
				_source = _Temp = null;
				
				return _obj;
			};
			
			return _class;
		}
		
	};
	
	//将ditu对象设置为全局对象(window)
	window.com = window.ditu = com;
	
})(window);
