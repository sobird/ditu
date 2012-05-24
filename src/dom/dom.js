/**
 * DOMUtil 实现了一些 简单的dom操作
 * 
 * 简单的链式调用
 * 
 * @author junlong.yang CrossYou2009@gmail.com
 * @since 1.0.0
 * @return {[type]} [description]
 */
(function(){
	var _prop_cache = {};

	Jaring.dom = {
		get: function(id){
			var el = (typeof id === 'string' ? document.getElementById(id) : id);
			Jaring.util.extendIf(el, this);
			return el;
		},

		/**
		 * 设置/获取/清空 DOM Element 的透明度
		 * 
		 * 参数可能情况:
		 * 1、(element, opacity) 为element设置透明度 setOpacity
		 * 2、(element, '') 清空element的透明度 clearOpcity
		 * 3、(opacity) 为this.element设置透明度 setOpacity
		 * 4、('') 清空this.element的透明度 clearOpcity
		 * 5、(element) 获取element的透明度 getOpacity
		 * 6、() 获取this.element的透明度 getOpacity
		 * 
		 * @author junlong.yang
		 * @since 1.0.0
		 */
		opacity: function(){

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

		/**
		 * 获取DOM Element 计算后的 样式属性值
		 * 
		 * 传参情况说明:
		 * 1.(element, prop, value) 为element设置style样式
		 * 2.(prop, value) 为this.element设置style样式
		 * 3.(element, props)
		 * 4.(props)
		 * 5.(element, prop)
		 * 6.(prop)
		 * 7.('')
		 * 8.()
		 * 
		 * @param  {[type]} mix  [description]
		 * @param  {[type]} name [description]
		 * @return {[type]}      [description]
		 */
		style: function(mix, name){
			var el = name ? mix : this,
				cn = name || mix;

			var ret = el.style[cn];
			if (!ret && el.currentStyle) {
				ret = el.currentStyle[cn];
			}
			if (!ret || ret === 'auto') {
				var css = document.defaultView.getComputedStyle(el, null);
				ret = css ? css[cn] : null;
			}
			return (ret === 'auto' ? null : ret);
		},

		getStyle: function(mix, name){
			var el = name ? mix : this,
				cn = name || mix,
				ret = null;

			if(document.defaultView && document.defaultView.getComputedStyle) {
				if (cn == "float") {
					cn = "cssFloat";
				}
				if (ret = el.style[cn]) {
					return ret;
				}
				var style = document.defaultView.getComputedStyle(el, null);
				ret = style ? style[cn] : null;
			} else {
				if (cn == "opacity") {
					return this.opacity(el);
				} else if (cn == "float") {
					cn = "styleFloat";
				}

				if (ret = el.style[cn]) {
					return ret;
				}

				var style = el.currentStyle;
				ret = style ? style[cn] : null;
			}
			return (ret === 'auto' ? null : ret);
		}

		/**
		 * 设置style/获取计算后的style
		 * 
		 * @see  http://jquery.com
		 * @see  http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
		 * @return {[type]} [description]
		 */
		css: function(elem, name){
			//TODO
		},

		attr: function(){
			//TODO
		},

		prop: function(){
			//TODO
		},

		create: function(tagName){
			var el = document.createElement(tagName);
			Jaring.util.extendIf(el, this);
			return el;
		},

		remove: function(){

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

		/**
		 * 为一个DOM对象, 值注册一次事件处理程序
		 * 当该事件处理程序触发后, 立刻注销该处理程序
		 * 
		 * 传参情况说明:
		 * 1.(instance, eventName, handler, capture)
		 * 2.(eventName, handler, capture)
		 * 其中 capture 为可选参数 控制事件属于:冒泡还是捕获
		 * 
		 * @param  {[type]} instance  [description]
		 * @param  {[type]} eventName [description]
		 * @param  {[type]} handler   [description]
		 * @param  {[type]} capture   [description]
		 * @return {[type]}           [description]
		 */
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
		 * 传参情况说明:
		 * 1.(element, offset) 为element设置left,top值
		 * 2.(offset) 为this.element设置left,top值
		 * 3.(element) 获取element的left,top值
		 * 4.() 获取this.element的left,top值
		 * 5.(element, true) 获取element,相对于文档页面左上角的left,top值
		 * 6.(true) 获取this.element 相对于文档页面左上角的left,top值
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
							Jaring.dom.style(el, 'position') === 'absolute') {
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
		 * @return {Offset} [Jaring.maps.Offsets]
		 */
		scroll: function() {
			var html = document.documentElement,
				body = document.body,
				scrollLeft = 0,
				scrollTop  = 0;

			if (html && (html.scrollTop || html.scrollLeft)){
				scrollLeft = html.scrollLeft;
				scrollTop  = html.scrollTop;
			} else if (body){
				scrollLeft = body.scrollLeft;
				scrollTop  = body.scrollTop;
			}
			return new Jaring.maps.Offset(scrollLeft, scrollTop);
		}
	}
})();

//测试代码
console.log('Jaring.dom tester : begin');

window.onload = function(){
	console.log(Jaring.dom.get('map').offset(true));


}

console.log(Jaring.dom.create('div').addClass('CrossYou').addClass('test').offset(new Jaring.maps.Offset(22,33)).offset(true));

console.log('Jaring.dom tester : end');