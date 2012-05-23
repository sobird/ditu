/**
 * DOMUtil 实现了一些 简单的dom操作
 * 
 * 实现了简单的链式调用
 * 
 * @author junlong.yang CrossYou2009@gmail.com
 * @since 1.0.0
 * @return {[type]} [description]
 */
(function(){
	Jaring.dom = {
		get: function(id){
			return (typeof id === 'string' ? document.getElementById(id) : id);
		},

		/**
		 * 
		 * 
		 * @see  http://jquery.com
		 * @see  http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
		 * @return {[type]} [description]
		 */
		css: function(){

		},

		attr: function(){

		},

		prop: function(){

		},

		create: function(tagName){
			var el = document.createElement(tagName);
			Jaring.util.extend(el, this);
			return el;
		},

		append: function(child){
			this.appendChild(child);
			return this;
		},

		appendTo: function(parent){
			parent.appendChild(this);
			return this;
		},

		/**
		 * 判断Element是否存在给定的className
		 * 
		 * @author junlong.yang
		 * @since 1.0.0
		 * @param  {[type]}  mix  [description]
		 * @param  {[type]}  name [description]
		 * @return {Boolean}      [description]
		 */
		hasClass: function (mix, name) {
			var el = name ? mix : this,
				cn = name || mix;

			return (el.className.length > 0) &&
					new RegExp("(^|\\s)" + cn + "(\\s|$)").test(el.className);
		},

		addClass: function(mix, name){
			var el = name ? mix : this,
				cn = name || mix;

			if (!el.hasClass(el, cn)) {
				el.className += (el.className ? ' ' : '') + cn;
			}

			return el;
		},

		removeClass: function (mix, name) {
			var el = name ? mix : this,
				cn = name || mix;

			el.className = el.className.replace(/(\S+)\s*/g, function (w, match) {
				if (match === cn) {
					return '';
				}
				return w;
			}).replace(/^\s+/, '');

			return el;
		}
	}
})();

//测试代码
console.log('Jaring.dom tester : begin');

console.log(Jaring.dom.create('div').append(Jaring.dom.create('p')).append(Jaring.dom.create('a')).appendTo(Jaring.dom.create('a')));

console.log(Jaring.dom.create('div').addClass('CrossYou').addClass('test').removeClass('CrossYou'));

console.log('Jaring.dom tester : end');