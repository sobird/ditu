(function(){
	function MyArray(len){
		if (len === undefined) {
            this.__array = new Array();
        } else {
            this.__array = new Array(len);
        }
	}
	MyArray.prototype = {
		length: function() {
	       return this.__array.length;
	    },
	    at: function(i) {
	        return this.__array[i];
	    },
	    set: function(i, obj) {
	        this.__array[i] = obj;
	    },
	    push: function(obj) {
	        this.__array.push(obj);
	    },
	    slice: function(p) {
	        this.__array = this.__array.slice(p);
	    },
	    concat: function(array) {
	        this.__array = this.__array.concat(array);
	    },
	    remove: function(p, count) {
	        if (count === undefined) {
	            count = 1;
	        }
	        this.__array.splice(p, count);
	    },
	    join: function(p) {
	        return this.__array.join(p);
	    },
	    clear: function() {
	        this.__array.length = 0;
	    }
	};

	//
	function AAA(bufferLength){
		if (bufferLength !== null) {
			this._my_array = new MyArray(bufferLength);
		} else {
			this._my_array = new MyArray();
		}
		bufferLength = null;
	}
	AAA.prototype = {
		_indexOf: function(key) {
			var len = this._my_array.length(), i;
	        for (i = 0; i < len; i += 2) {
	            if (this._my_array.at(i) === key) {
	                break;
	            }
	        }
	        if (i === len) {
	            i = -1;
	        }
	        return i;
	    },
	    get: function(key) {
	        var i, value = null;
	        if ((i = this._indexOf(key)) !== -1) {
	            value = this._my_array.at(i + 1);
	        }
	        return value;
	    },
	    set: function(key, value) {
	        var i;
	        if ((i = this._indexOf(key)) !== -1) {
	            this._my_array[i + 1] = value;
	        } else {
	            this._my_array.push(key);
	            this._my_array.push(value);
	        }
	    },
	    length: function() {
	        return this._my_array.length() / 2;
	    },
	    at: function(i) {
	        var mapElement = {
	            first: null,
	            second: null
	        };
	        mapElement.first = this._my_array.at(2 * i);
	        mapElement.second = this._my_array.at(2 * i + 1);
	        i = null;
	        return mapElement;
	    },
	    remove: function(key) {
	        var i;
	        if ((i = this._indexOf(key)) !== -1) {
	            this._my_array.remove(i, 2);
	        }
	    },
	    clear: function() {
	        this._my_array.clear();
	    }
	};

	var test = new AAA(5);
	test.set('testdd','aaaa');

	console.log(test);

	function OP_Array(){
		this._my_array = new MyArray();
	};

	OP_Array.prototype = {
		_my_array: null,
		_index: 0,
		enqueue: function(obj) {
	        this._my_array.push(obj);
	    },
	    dequeue: function() {
	        var ret = null;
	        if (this._my_array.length()) {
	            ret = this._my_array.at(this._index);
	            if (++this._index * 2 >= this._my_array.length()) {
	                this._my_array.slice(this._index);
	                this._index = 0;
	            }
	        }
	        return ret;
	    },
	    top: function() {
	        var ret = null;
	        if (this._my_array.length()) {
	            ret = this._my_array.at(queueSpace);
	        }
	        return ret;
	    },
	    length: function() {
	        return this._my_array.length() - this._index;
	    },
	    empty: function() {
	        return (this._my_array.length() === 0);
	    }
	};

	//
	function Controller(mvc){
		this.mvc = mvc;
		this._mvc_array_one = new AAA();
		this._14 = new OP_Array();
		this._mvc_array_two = new AAA();
	}
	Controller.prototype = {
		_mvc_array_one: null,
		_14: null,
		_mvc_array_two: null,

		//注册事件句柄
		registerEventHandler: function(eventName, handler) {
            var handlerList;
            if ((handlerList = this._mvc_array_one.get(eventName)) !== null) {
                handlerList.push(handler);
            } else {
                handlerList = new MyArray();
                handlerList.push(handler);
                this._mvc_array_one.set(eventName, handlerList);
            }
        },

        //触发事件
        triggerEvent: function(event) {
        	//进入队列
			this._14.enqueue(event);
            if (!this.dispatchTimer_) {
				this.dispatchTimer_ = __setTimeout(this.dispatchEvent, 10, this);
			}
        },

        //派遣事件
        dispatchEvent: function(_self) {
            _self.dispatchTimer_ = null;
            var event, handlerList, handlerListLength, listenerList;
            var listenerListLength, i, renderEvent = null;
            var zoomLevelChangedEvent = null;
            var bOptimalRenderEvent = false;
            while (!_self._14.empty()) {
                event = _self._14.dequeue();
                if (event.eventType === "Render") {
                    if (event.isOptimal) {
                        bOptimalRenderEvent = true
                    }
                    renderEvent = event;
                    continue
                }

                if ((handlerList = _self._mvc_array_one.get(event.eventType)) !== null) {
                    handlerListLength = handlerList.length();
                    for (i = 0; i < handlerListLength; ++i) {
                        switch (event.eventType) {
                        case "TileGridReInit":
                            handlerList.at(i).onTileGridReInit(event);
                            break;
                        default:
                            break
                        }
                    }
                }
            }
            if (renderEvent !== null) {
                renderEvent.isOptimal = bOptimalRenderEvent;
                if ((handlerList = _self._mvc_array_one.get(renderEvent.eventType)) !== null) {
                    handlerListLength = handlerList.length();
                    for (i = 0; i < handlerListLength; ++i) {
                        handlerList.at(i).onRender(renderEvent)
                    }
                }
            }
        },

        //添加事件监听
        addEventListener: function(eventName, callback) {
            var listenerList;
            if ((listenerList = this._mvc_array_two.get(eventName)) !== null) {
                listenerList.push(callback);
            } else {
                listenerList = new MyArray();
                listenerList.push(callback);
                this._mvc_array_two.set(eventName, listenerList);
            }
            listenerList = null;
            var eventListener = new _a._ab.EventListener(eventName, callback);
            return eventListener;
        },

        //移除事件监听
        removeEventListener: function(eventListener) {
            var i, listenerList, len;
            var eventName = eventListener.eventName;
            var callback = eventListener.callback;
            if ((listenerList = this._mvc_array_two.get(eventName)) !== null) {
                len = listenerList.length();
                for (i = 0; i < len; i++) {
                    if (listenerList.at(i) == callback) {
                        listenerList.remove(i);
                        break;
                    }
                }
            }
        }
	};

	var controller = new Controller();
	controller.registerEventHandler('TileGridReInit',function(e){
		console.log(e);
	});

	controller.triggerEvent('TileGridReInit');
	console.log(controller);

	//模型类, 模型需要用户根据需求自定义
	function Model (mvc) {
		this.mvc = mvc;
        //this.model_ = new QViewMgrModel(); MVCObject
	};

	Model.prototype = {

	}

	function View (mvc, container) {
		this.mvc = mvc;
	}
	View.prototype = {

	};

	//Javascript MVC架构
	function MVC(container){
		this.controller = new Controller(this);
		this.model = new Model(this);
		this.view = new View(this, container);

		//注册MVC监听事件句柄
		this.controller.registerEventHandler("ViewSizeChanged", this.model);

		//垃圾回收标记
		var _self = this;
		EventUtil.addDomListener(window, 'unload',function() {
			_self.model = null;
			_self.controller = null;
			_self.view = null
		})
	}
	MVC.prototype = {
		triggerEvent: function(event) {
			this.controller.triggerEvent(event)
		},
		addEventListener: function(eventName, handler) {
			return this.controller.addEventListener(eventName, handler)
		},
		removeEventListener: function(eventListener) {
			this.controller.removeEventListener(eventListener)
		}
	}

	// some helper function 
	function __setTimeout(handler, delay) {
        var _timeout = window.setTimeout, argu, f;
        if (typeof(handler) === "function") {
            argu = Array.prototype.slice.call(arguments, 2);
            f = (function() {
                handler.apply(null, argu);
            });
            return _timeout(f, delay);
        }
        return _timeout(handler, delay);
    };

    //test script 

    var mvc = new MVC(document.getElementById('tester'));

})();