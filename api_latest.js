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
	
	each : function(object, callback, s) {
		var n, l;

		if (!object || !com.helper.is(callback,'function'))
			return 0;

		s = s || object;

		if (object.length !== undefined) {
			// Indexed arrays, needed for Safari
			for (n = 0, l = object.length; n < l; n++) {
				if (callback.call(s, object[n], n, object) === false)
					return 0;
			}
		} else {
			// Hashtables
			for (n in object) {
				if (object.hasOwnProperty(n)) {
					if (callback.call(s, object[n], n, object) === false)
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
	 * 扩展方法
	 */
	extend : function(o, e) {
		var i, l, a = arguments;

		for (i = 1, l = a.length; i < l; i++) {
			e = a[i];

			com.helper.each(e, function(v, n) {
				if (v !== undefined)
					o[n] = v;
			});
		}

		return o;
	}
}

com.create = function(namespace){
	
}
s = /^((static) )?([\w.]+)(:([\w.]+))?/.exec('com.test.hhh')
console.log(s);

function tilenum(lng,lat,level){
	var x = Math.floor(((lng+180)/360)*Math.pow(2,level));
	
	var sinlat = Math.sin(lat * Math.PI/180);
	var y = Math.floor((0.5-Math.log((1+sinlat)/(1-sinlat)) / (4 * Math.PI)) * Math.pow(2,level));
	
	return {
		x:x,
		y:y
	}
}

console.log(tilenum(-146.07421862499996,0.486551102694577,3));