(function(){
	Jaring.create('Jaring.maps.Event', {
		/**
		 * 地图事件类, 让事件看起来更符合 W3C 标准
		 * 
		 * @author junlong.yang
		 * @since 1.0.0
		 * @param {[type]} type [description]
		 */
		Event: function(event){
			var event = event || window.event;
			this.originalEvent = event;
			Jaring.util.extendIf(this, event);

			//事件属性 兼容 ~~
			this.ctrlKey = event.ctrlKey || event.metaKey;

			if (typeof(event.button) !== "undefined") {
				var MOUSE_BUTTON = Jaring.constant.MOUSE_BUTTON;
				this.button = (typeof(event.which) !== "undefined") ? event.button: (event.button === 4) ? MOUSE_BUTTON.middle: (event.button === 2) ? MOUSE_BUTTON.right: MOUSE_BUTTON.left;
			}

			if (event.type === "keypress"){
				this.charCode = event.charCode || event.keyCode || 0;
			} else if (event.keyCode && (event.keyCode === 46)){
				this.keyCode = 127;
			}

			this.domType = this.type;

			this.domTarget = this.trigger = this.target = this.resolveTextNode(event.target || event.srcElement);
			
			this.x = this.x();
			this.y = this.y();

			this.point = new Jaring.maps.Point(this.x, this.y);

			if (event.type == "DOMMouseScroll") {
				this.type = "mousewheel";
				this.wheelDelta = this.getWheelDelta() * 24;
			}
		},

		x: function(event){
			var event = event ? (event.originalEvent || event) : this.originalEvent;
				
			return event.pageX ? (event.pageX || 0) : (event.clientX || 0) + Jaring.dom.scroll().left;
		},

		y: function(event){
			var event = event ? (event.originalEvent || event) : this.originalEvent;
				
			return event.pageY ? (event.pageY || 0) : (event.clientY || 0) + Jaring.dom.scroll().top;
		},

		/**
		 * 阻止/停止 事件冒泡
		 * 可以阻止原生事件(window.event), 以及封装的事件(Jaring.maps.Event)
		 * 
		 * @author junlong.yang
		 * @since 1.0.0
		 * @param  {Event} event [可选]
		 * @return {Jaring.maps.Event}       [description]
		 */
		stopPropagation: function(event){
			var event = event ? (event.originalEvent || event) : this.originalEvent;
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
			return this;
		},

		/**
		 * 阻止浏览器默认行为
		 * 
		 * @param  {[type]} event [description]
		 * @return {[type]}       [description]
		 */
		preventDefault: function(event){
			var event = event ? (event.originalEvent || event) : this.originalEvent;
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return this;
		},

		stop: function(event){
			var event = event ? (event.originalEvent || event) : this.originalEvent;
			return this.preventDefault().stopPropagation();
		},

		/**
		 * 获取鼠标滚轮值
		 * 
		 * @param  {[type]} event [description]
		 * @return {[type]}       [description]
		 */
		getWheelDelta: function(event){
			var event = event ? (event.originalEvent || event) : this.originalEvent;
			var delta = 0;
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
			}
			if (event.detail) {
				delta = -event.detail / 3;
			}
			return delta;
		},

		resolveTextNode: function(target) {
			try {
				return target && !target.tagName ? target.parentNode: target;
			} catch(e) {
				return null;
			}
		},

		getRelatedTarget: function(event) {
			var event = event ? (event.originalEvent || event) : this.originalEvent;
			var relatedTarget = event.relatedTarget;

			if (!relatedTarget){
				if (event.type == "mouseout"){
					relatedTarget = event.toElement;
				} else if (event.type == "mouseover"){
					relatedTarget = event.fromElement;
				} else if (event.type == "blur"){
					relatedTarget = document.elementFromPoint(this.x, this.y);
				}
			}
			return this.resolveTextNode(target)
		},

		offsetBy: function(mix, container){
			var event = container ? mix : this,
				container = container || mix,
				container = Jaring.dom.get(container);
			var offset = container.offset(true);

			return new Jaring.maps.Offset(this.x - offset.left, this.y - offset.top);
		},

		//swallow then digest
		swallow: function(event){
			Jaring.util.extendIf(this, event);

			//drain
			return this;
		}
	});
})();

//test script
console.log('Jaring.maps.Event : begin');


console.log('Jaring.maps.Event : end');