(function(){
	var eventListenerIdIndex = 0;
	function EventListener(target, eventName, handler, type){
		this.target = target;
		this.eventName = eventName;
		this.handler = handler;
		this.type = type;
		this.bindHandler = null;
		this.id = eventListenerIdIndex++;
		getEventList(target, eventName)[this.id] = this;
		target = null;
	}
	EventListener.prototype.remove = function() {
		if (this.target) {
			switch (this.type) {
				case 1:
					this.target.removeEventListener(this.eventName, this.handler, false);
					break;
                case 4:
					this.target.removeEventListener(this.eventName, this.handler, true);
					break;
                case 2:
					this.target.detachEvent('on' + this.eventName, this.bindHandler);
					break;
                case 3:
					this.target['on' + this.eventName] = null;
					break;
			}
			delete getEventList(this.target, this.eventName)[this.id];
			this.handler = null;
			this.target = null;
		}
	}

	EventUtil = {
		addDomListener: function(){
			
		}
	}
})();