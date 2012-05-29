/**
 * DOM元素 拖放 类
 */
(function(){
	Jaring.create('Jaring.Draggable extends Jaring.Observable',{
		Draggable: function(dragElement, dragTarget){
			this.map = dragElement;
			this.dragElement = Jaring.dom.get(dragElement.platform);
			this.dragTarget  = Jaring.dom.get(dragElement.container);
		},

		enable: function(){
			if (this.enabled) {
				return;
			}
			this.dragTarget.on('mousedown', Jaring.util.bind(this.onMouseDown, this));
			this.enabled = true;
			return this;
		},

		disable: function(){
			if (!this.enabled) {
				return;
			}
			this.dragTarget.un('mousedown');
			this.enabled = false;
			this._moved = false;
		},

		onMouseDown: function(e){
			e.preventDefault(e);
			this._moved = false;
			if (this._moving) {
				return;
			}


			this._startPos = this._newPos = this.dragElement.offset().toPoint();
			this._startPoint = new Jaring.maps.Point(e.x, e.y);
			this.mousemoveListener = Jaring.event.addDomListener(document,'mousemove', Jaring.util.bind(this.onMouseMove, this));
			this.mouseupListener = Jaring.event.addDomListener(document, 'mouseup', Jaring.util.bind(this.onMouseUp, this));
		},

		onMouseMove: function(e){
			//console.log(e);
			e.preventDefault(e);
			if (!this._moved) {
				this.fire('dragstart');
				this._moved = true;
			}
			this._moving = true;

			var newPoint = new Jaring.maps.Point(e.x, e.y);

			this._newPos = this._startPos.plus(newPoint).subtract(this._startPoint).toOffset();

			//console.log(this._newPos);
			this.dragElement.offset(this._newPos);
			this.map.refreshLayer();
		},

		onMouseUp: function(e){

			Jaring.dom.un(this.mousemoveListener);
			Jaring.dom.un(this.mouseupListener);
			this.mousemoveListener = null;
			this.mouseupListener = null;
			
			if (this._moved) {
				this.fire('dragend');
			}
			this._moving = false;
		}
	})
})();