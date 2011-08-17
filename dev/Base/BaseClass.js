/**
 * BaseClass.js
 * 
 * @author	CrossYou at 2011/05/18 build.
 * @link	http://www.crossyou.cn/
 * @version	$Id$
 */

(function(com){
	var BaseClass = function(){
		this.name = 'test';
	};//static class
	
	/**
	 * 类实例集合
	 * 
	 * @since 1.0.0
	 * @type Object
	 */
	BaseClass.instances	= {};
	
	/**
	 * 类实例总数
	 * 
	 * @since 1.0.0
	 * @type Number
	 */
	BaseClass.inssumnum	= 0;
	
	/**
	 * 类实例化时将会触发此函数
	 * 只有使用com.createClass()方法创建的类，在实例化时才会调用此方法
	 * 
	 * @since 1.0.0
	 */
	BaseClass.onInstant = function(hash){
		var _hash = hash || BaseClass.guid();
		BaseClass.instances[_hash] = this;
		this._hash = _hash;
	};
	
	/**
	 * 生成类的hash值
	 * 
	 * @since 1.0.0
	 */
	BaseClass.guid = function(){
		return '_mc_'+ Math.round(Math.random()*10000000000) + (BaseClass.inssumnum++);
	};
	
	BaseClass.prototype = {
		getHash : function(){
			return this._hash;
		}
	};
	
	com.BaseClass = BaseClass;
	
})(com);
