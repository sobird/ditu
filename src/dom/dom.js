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
			var el = (typeof id === 'string' ? document.getElementById(id) : id);
			Jaring.util.extendIf(el, this);
			return el;
		},

		/**
		 * 返回/获取 DOM Element 的长度 宽度
		 * 
		 * @return {Size} size [Jaring.maps.Size]
		 */
		size: function(){
			var args = Array.prototype.slice.call(arguments, 0),
				last = args[args.length - 1];

			if (last instanceof Jaring.maps.Size){
				var el = (args[0] instanceof Jaring.maps.Size) ? this : args[0];
				el.style.width = last.width + 'px';
				el.style.height  = last.height  + 'px';
				el._jaring_size_ = last;
				return el;
			} else {
				var el = args[0] || this;
				if (el._jaring_size_){
					return el._jaring_size_;
				}

				return new Jaring.maps.Size(el.clientWidth||0, el.clientHeight||0);
			}
		},

		style: function(elem, name){

		},

		/**
		 * 设置style/获取计算后的style
		 * 
		 * @see  http://jquery.com
		 * @see  http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
		 * @return {[type]} [description]
		 */
		css: function(elem, name){

		},

		attr: function(){

		},

		prop: function(){

		},

		create: function(tagName){
			var el = document.createElement(tagName);
			Jaring.util.extendIf(el, this);
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
		},

		//DOM EVENT
		on: function(instance,eventName, handler, capture){
			var args = Array.prototype.slice.call(arguments, 0);

			if(Jaring.util.is(args[0], 'string')){
				var el = this;
				args.unshift(el);
			} else {
				var el = instance;
			}
			
			var listener = Jaring.event.addDomListener.apply(Jaring.event, args);
			el.listener = listener;
			return el;
		},

		un: function(listener){
			var listener = listener ? (listener.listener || listener) : this.listener;
			Jaring.event.removeListener(listener);
		},

		once: function(instance, eventName, handler, capture){
			var args = Array.prototype.slice.call(arguments, 0);

			if(Jaring.util.is(args[0], 'string')){
				var el = this;
				args.unshift(el);
			} else {
				var el = instance;
			}
			
			var listener = Jaring.event.addDomListenerOnce.apply(Jaring.event, args);
			el.listener = listener;
			return el;
		},

		/**
		 * 集成了各种与offset相关的方法
		 * 
		 * @author junlong.yang
		 * @since 1.0.0
		 * 
		 * @param  {Mix} mix [description]
		 * @return {Element/Offset}         [description]
		 */
		offset: function () {
			var args = Array.prototype.slice.call(arguments, 0);
			var last = args[args.length - 1];
			
			if( last === true ) {

				var element = args[0] === true ? this : args[0];

				var top = 0,
					left = 0,
					el = element,
					body = document.body;

				do {
					top += el.offsetTop || 0;
					left += el.offsetLeft || 0;

					if (el.offsetParent === body &&
							L.DomUtil.getStyle(el, 'position') === 'absolute') {
						break;
					}
					el = el.offsetParent;
				} while (el);

				el = element;

				do {
					if (el === body) {
						break;
					}

					top -= el.scrollTop || 0;
					left -= el.scrollLeft || 0;

					el = el.parentNode;
				} while (el);

				return new Jaring.maps.Offset(left, top);

			} else if(last instanceof Jaring.maps.Offset) {

				var el = (args[0] instanceof Jaring.maps.Offset) ? this : args[0];
				el.style.left = last.left + 'px';
				el.style.top  = last.top  + 'px';
				el._jaring_offset_ = last;
				return el;

			} else {

				var el = args[0] || this;
				if (el._jaring_offset_){
					return el._jaring_offset_;
				}

				return new Jaring.maps.Offset(el.style.left||0, el.style.top||0);
			}
		},

		/**
		 * 获取浏览器滚动条 偏移量
		 * 
		 * @author junlong.yang
		 * @return {Offset} [Jaring.maps.Offset]
		 */
		scroll: function() {
			var html = document.documentElement,
				body = document.body;

			return new Jaring.maps.Offset((html.scrollLeft + body.scrollLeft) || 0, (html.scrollTop + body.scrollTop) || 0);
		}
	}
})();

//测试代码
console.log('Jaring.dom tester : begin');

console.log(Jaring.dom.create('div').append(Jaring.dom.create('p')).append(Jaring.dom.create('a')).appendTo(Jaring.dom.create('a')));

console.log(Jaring.dom.create('div').addClass('CrossYou').addClass('test').offset(new Jaring.maps.Offset(22,33)).offset(true));

console.log('Jaring.dom tester : end');