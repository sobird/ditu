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
	        	alert(i + 1);
	            value = this._my_array.at(i + 1);
	        }
	        return value;
	    },
	    set: function(key, value) {
	        var i;
	        alert(this._indexOf(key));
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
	alert(test.get('test'));
	console.log(test);
	/*
	var QQMapImpl._aae = function(){
		this._my_array = new MyArray();
	};

	QQMapImpl._aae.prototype = {
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

	var QQMapImpl._aad = function(){

	}
	//
	function Controller(mvc){
		this.mvc = mvc;
		this._6 = new AAA();
		this._14 = new QQMapImpl._aae();
		this._7 = new AAA();
	}
	Controller.prototype = {
		registerEventHandler: function(eventName, eventHandler) {
            var handlerList;
            if ((handlerList = this._6.get(eventName)) !== null) {
                handlerList.push(eventHandler)
            } else {
                handlerList = new MyArray();
                handlerList.push(eventHandler);
                this._6.set(eventName, handlerList)
            }
            eventName = null;
            eventHandler = null;
            handlerList = null
        },
        triggerEvent: function(qevent) {
            var handlerList, listenerList, i;
            var handlerListLength, listenerListLength;
            switch (qevent.eventType) {
            case 'ViewSizeChanged':
                if ((handlerList = this._6.get(qevent.eventType)) !== null) {
                    handlerListLength = handlerList.length();
                    for (i = 0; i < handlerListLength; ++i) {
                        handlerList.at(i).onViewSizeChanged(qevent)
                    }
                }
                if ((listenerList = this._7.get('bounds_changed')) !== null) {
                    listenerListLength = listenerList.length();
                    for (i = 0; i < listenerListLength; ++i) {
                        listenerList.at(i).apply(null, [])
                    }
                }
                break;
            case 'CenterChanged':
                QQMapImpl.util.centerChangedFixDisplayBBox(qevent, this.mvc.model.displayBBox);
                if ((handlerList = this._6.get(qevent.eventType)) !== null) {
                    handlerListLength = handlerList.length();
                    for (i = 0; i < handlerListLength; ++i) {
                        handlerList.at(i).onCenterChanged(qevent)
                    }
                }
                if ((listenerList = this._7.get('center_changed')) !== null) {
                    listenerListLength = listenerList.length();
                    for (i = 0; i < listenerListLength; ++i) {
                        listenerList.at(i).apply(null, [])
                    }
                }
                break;
            case 'ZoomLevelChanged':
                if ((handlerList = this._6.get(qevent.eventType)) !== null) {
                    if (qevent.zoomLevel === undefined || qevent.zoomLevel === null) {
                        qevent.zoomLevel = this.mvc.model.tileGrid.get('zoom') + qevent.deltaZoomLevel
                    }
                    if (this.mvc.model.zmin !== null) {
                        if (qevent.zoomLevel < this.mvc.model.zmin) {
                            qevent.zoomLevel = this.mvc.model.zmin
                        } else if (qevent.zoomLevel > this.mvc.model.zmax) {
                            qevent.zoomLevel = this.mvc.model.zmax
                        }
                    }
                    handlerListLength = handlerList.length();
                    for (i = 0; i < handlerListLength; ++i) {
                        handlerList.at(i).onZoomLevelChanged(qevent)
                    }
                }
                if ((listenerList = this._7.get('zoom_changed')) !== null) {
                    listenerListLength = listenerList.length();
                    for (i = 0; i < listenerListLength; ++i) {
                        listenerList.at(i).apply(null, [])
                    }
                }
                break;
            default:
                this._14.enqueue(qevent);
                if (!this.dispatchTimer_) {
                    this.dispatchTimer_ = QQMapImpl.util.setTimeout(this.dispatchEvent, QQMapImpl._aab._aabc, this)
                }
                break
            }
            qevent = null;
            handlerList = null;
            listenerList = null;
            i = null;
            handlerListLength = null;
            listenerListLength = null
        },
        dispatchEvent: function(this_) {
            this_.dispatchTimer_ = null;
            var qevent, handlerList, handlerListLength, listenerList;
            var listenerListLength, i, renderEvent = null;
            var zoomLevelChangedEvent = null;
            var bOptimalRenderEvent = false;
            while (!this_._14.empty()) {
                qevent = this_._14.dequeue();
                if (qevent.eventType === "Render") {
                    if (qevent.isOptimal) {
                        bOptimalRenderEvent = true
                    }
                    renderEvent = qevent;
                    continue
                } else if (qevent.eventType === "ZoomLevelChanged") {}
                if ((handlerList = this_._6.get(qevent.eventType)) !== null) {
                    handlerListLength = handlerList.length();
                    for (i = 0; i < handlerListLength; ++i) {
                        switch (qevent.eventType) {
                        case "TileGridReInit":
                            handlerList.at(i).onTileGridReInit(qevent);
                            break;
                        case "ThemeChanged":
                            handlerList.at(i).onThemeChanged(qevent);
                            break;
                        case "ContextMenuItemAdded":
                            handlerList.at(i).onContextMenuItemAdded(qevent);
                            break;
                        case "QOverlayAdded":
                            handlerList.at(i).onQOverlayAdded(qevent);
                            break;
                        case "QOverlayModified":
                            handlerList.at(i).onQOverlayModified(qevent);
                            break;
                        case "QOverlayMoved":
                            handlerList.at(i).onQOverlayMoved(qevent);
                            break;
                        case "QOverlayRemoved":
                            handlerList.at(i).onQOverlayRemoved(qevent);
                            break;
                        case "QOverlaysCleared":
                            handlerList.at(i).onQOverlaysCleared(qevent);
                            break;
                        default:
                            break
                        }
                    }
                }
            }
            if (renderEvent !== null) {
                renderEvent.isOptimal = bOptimalRenderEvent;
                if ((handlerList = this_._6.get(renderEvent.eventType)) !== null) {
                    handlerListLength = handlerList.length();
                    for (i = 0; i < handlerListLength; ++i) {
                        handlerList.at(i).onRender(renderEvent)
                    }
                }
            }
            this_ = null;
            qevent = null;
            handlerList = null;
            handlerListLength = null;
            listenerList = null;
            listenerListLength = null;
            i = null;
            renderEvent = null;
            zoomLevelChangedEvent = null
        },
        addEventListener: function(eventName, callback) {
            var listenerList;
            if ((listenerList = this._7.get(eventName)) !== null) {
                listenerList.push(callback)
            } else {
                listenerList = new MyArray();
                listenerList.push(callback);
                this._7.set(eventName, listenerList)
            }
            listenerList = null;
            var eventListener = new _a._ab.EventListener(eventName, callback);
            return eventListener
        },
        removeEventListener: function(eventListener) {
            var i, listenerList, len;
            var eventName = eventListener.eventName;
            var callback = eventListener.callback;
            if ((listenerList = this._7.get(eventName)) !== null) {
                len = listenerList.length();
                for (i = 0; i < len; i++) {
                    if (listenerList.at(i) == callback) {
                        listenerList.remove(i);
                        break
                    }
                }
            }
        }
	};

	function Model (mvc) {
		this.mvc = mvc;
        this.model_ = new QViewMgrModel();
        this.tileGrid = new _a._ac._aco();
        this._2 = new MyArray();
        this.qOverlayChangeList = new MyArray();
        this.qContextMenuItemList = new MyArray();
        this.qControlList = new MyArray();
        this.qOverlayCount = 0;
        this._19 = new _a._ac._acl(this.mvc);
        this.initAllDisplayBBox();
        mvc = null
	};

	Model.prototype = {

	}

	function MVC(){
		this.model = new _a._ac.Model(this);
		this.controller = new _a._ab.Controller(this);
		this.view = new _a._ad.View(this, container);

		//注册MVC监听事件句柄
		this.controller.registerEventHandler("ViewSizeChanged", this.model);

		//垃圾回收
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
		addEventListener: function(eventName, callback) {
			return this.controller.addEventListener(eventName, callback)
		},
		removeEventListener: function(eventListener) {
			this.controller.removeEventListener(eventListener)
		}
	}*/
})();