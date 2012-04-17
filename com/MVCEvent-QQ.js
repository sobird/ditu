(function(){
	function EventListener(eventName, listener){
		this.eventName = eventName;
		this.listener = listener;
	}
	/**
	 * Array Like Class
	 * 
	 * @param {Number} len [description]
	 */
	function List(len){
        this.__array = len === undefined ? [] : new Array(len);
	}
	List.prototype = {
		/**
		 * 返回数组长度
		 * 
		 * @return {Number} length [数组长度]
		 */
		length: function() {
	       return this.__array.length;
	    },

	    at: function(index) {
	        return this.__array[index];
	    },

	    set: function(index, obj) {
	        this.__array[index] = obj;
	    },

	    /**
	     * 向数组的末尾添加一个或多个元素，并返回新的长度。
	     * 
	     * @param  {*} obj [description]
	     * @return {Number} length [新数组的长度]
	     */
	    push: function(obj) {
	        return this.__array.push(obj);
	    },

	    /**
	     * 返回数组中选定的元素
	     * 
	     * @param  {Number} start [必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。]
	     * @param  {Number} end [可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素]
	     * @return {Array} newArray  [description]
	     */
	    slice: function(start, end) {
	        return this.__array = this.__array.slice(start, end);
	    },

	    concat: function(array) {
	        this.__array = this.__array.concat(array);
	    },

	    remove: function(index, count) {
	        if (count === undefined) {
	            count = 1;
	        }
	        this.__array.splice(index, count);
	    },

	    join: function(separator) {
	        return this.__array.join(separator);
	    },

	    clear: function() {
	        this.__array.length = 0;
	    }
	};

	//
	function Buffer(length){
		this.__list = length === undefined ? new List() : new List(length);
	}
	Buffer.prototype = {
		_indexOf: function(key) {
			var len = this.__list.length(), i;
	        for (i = 0; i < len; i += 2) {
	            if (this.__list.at(i) === key) {
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
	            value = this.__list.at(i + 1);
	        }
	        return value;
	    },
	    set: function(key, value) {
	        var i;
	        if ((i = this._indexOf(key)) !== -1) {
	            this.__list[i + 1] = value;
	        } else {
	            this.__list.push(key);
	            this.__list.push(value);
	        }
	    },
	    length: function() {
	        return this.__list.length() / 2;
	    },
	    at: function(i) {
	        var mapElement = {
	            first: null,
	            second: null
	        };
	        mapElement.first = this.__list.at(2 * i);
	        mapElement.second = this.__list.at(2 * i + 1);
	        i = null;
	        return mapElement;
	    },
	    remove: function(key) {
	        var i = this._indexOf(key);
	        if (i !== -1) {
	            this.__list.remove(i, 2);
	        }
	    },
	    clear: function() {
	        this.__list.clear();
	    }
	};

	/**
	 * 先进先出队列 (First Input First Output)
	 * 
	 * 一种先进先出的数据缓存器
	 */
	function Queue(){
		this.__list = new List();
	};

	Queue.prototype = {
		_index: 0,

		/**
		 * 排队
		 * 
		 * @param  {Object} obj [description]
		 * @return {[type]}     [description]
		 */
		push: function(obj) {
			this.__list.push(obj);
		},

		/**
		 * 出队
		 * 
		 * @return {Object} [description]
		 */
		pop: function() {
			var ret = null;
			if (this.__list.length()) {
				ret = this.__list.at(this._index);
				if (++this._index * 2 >= this.__list.length()) {
					this.__list.slice(this._index);
					this._index = 0;
				}
			}
			return ret;
		},

		/**
		 * 返回队列中头部(即最新添加的)的动态对象 
		 * 
		 * @return {Object} [description]
		 */
		head: function() {
			var ret = null, len = this.__list.length();
			if (len) {
				ret = this.__list.at(len - 1);
			}
			return ret;
		},

		/**
		 * 返回队列中尾部(即最早添加的)的动态对象
		 * 
		 * @return {Object} [description]
		 */
		tail: function(){
			var ret = null, len = this.__list.length();
			if (len) {
				ret = this.__list.at(this._index);
			}
			return ret;
		},

		/**
		 * 返回数据队列长度
		 * 
		 * @return {Number} [description]
		 */
		length: function() {
			return this.__list.length() - this._index;
		},

		/**
		 * 队列是否为空
		 * 
		 * @return {Boolean} [description]
		 */
		empty: function() {
			return (this.__list.length() === 0);
		},

		clear: function(){
			this.__list.clear();
		}
	};

	//
	function Controller(mvc){
		this.mvc = mvc;

		/**
		 * 实例化一个队列对象
		 * 
		 * @type {Queue}
		 */
		this._queue = new Queue();

		this._handler_list_buffer = new Buffer();
		this._listener_list_buffer = new Buffer();
	}
	Controller.prototype = {
		//注册事件句柄
		registerEventHandler: function(eventName, handler) {
            var handlerList = this._handler_list_buffer.get(eventName);
            if (handlerList !== null) {
                handlerList.push(handler);
            } else {
                handlerList = new List();
                handlerList.push(handler);

                //把事件句柄放入_handler_list_buffer对象中去
                this._handler_list_buffer.set(eventName, handlerList);
            }
        },

        //触发事件
        triggerEvent: function(event) {
        	var listenerList = this._listener_list_buffer.get('test_changed'),listenerListLength;
			if(listenerList != null){
				listenerListLength = listenerList.length();
				for (i = 0; i < listenerListLength; ++i) {
					listenerList.at(i).apply(null, [])
				}
			}

        	//将事件对象压入队列中去
			this._queue.push(event);

            if (!this.__dispatchTimer_) {
				this.__dispatchTimer_ = __setTimeout(this.dispatchEvent, 10, this);
			}
        },

		//派遣事件
		dispatchEvent: function(_self) {
			_self.__dispatchTimer_ = null;
			var i, event, handlerList, handlerListLength

			//如果事件队列不为空，则不断压出事件对象
			while (!_self._queue.empty()) {
				event = _self._queue.pop();
				console.log(event);

				handlerList = _self._handler_list_buffer.get(event.eventType);
				if (handlerList !== null) {
					handlerListLength = handlerList.length();
					for (i = 0; i < handlerListLength; ++i) {
						handlerList.at(i).onDivSizeChanged(event);
					}
				}
			}
		},

		//添加事件监听
		addEventListener: function(eventName, listener) {
			var listenerList = this._listener_list_buffer.get(eventName);
			if (listenerList !== null) {
				listenerList.push(listener);
			} else {
				listenerList = new List();
				listenerList.push(listener);
				this._listener_list_buffer.set(eventName, listenerList);
			}
			return new EventListener(eventName, listener);
		},

        //移除事件监听
        removeEventListener: function(eventListener) {
            var i, l, 
            	listenerList = this._listener_list_buffer.get(eventName),
            	eventName = eventListener.eventName,
            	listener = eventListener.listener;
            if (listenerList !== null) {
                l = listenerList.length();
                for (i = 0; i < l; i++) {
                    if (listenerList.at(i) == listener) {
                        listenerList.remove(i);
                        break;
                    }
                }
            }
        }
	};

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
		onDivSizeChanged: function(event){
			var tester = document.getElementById('tester');
			console.log(tester);
			tester.style.width = event.width + 'px';
			tester.style.height = event.height + 'px';
		}
	};

	//Javascript MVC架构
	function MVC(container){
		this.controller = new Controller(this);
		this.model = new Model(this);
		this.view = new View(this, container);

		//注册MVC监听事件句柄
		this.controller.registerEventHandler("DivSizeChanged", this.view);

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
    /**
     * 一个事件对象
     * 
     * @param {[type]} width  [description]
     * @param {[type]} height [description]
     */
    function DivSizeChangedEvent(width, height){
    	this.width = width;
    	this.height = height;
    }
    DivSizeChangedEvent.prototype.eventType = 'DivSizeChanged';

    function setDivSize(width, height){
    	var divSizeEvent = new DivSizeChangedEvent(width, height);
    	var mvc = new MVC();
    	mvc.triggerEvent(divSizeEvent);
    }

    setDivSize(500,300);
})();