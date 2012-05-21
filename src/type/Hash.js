/**
 * 该类依赖: Jaring.maps.Lish 类
 * 
 * @return {[type]} [description]
 */
(function(){
	Jaring.create('Jaring.maps.Hash', {
		Hash: function(list){
			this.__list = list === undefined ? new Jaring.maps.List() : list;
		},

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

		/**
		 * Hash表长度
		 * 
		 * @return {Number} length [description]
		 */
		length: function() {
			return this.__list.length() / 2;
		},

		size: function(){
			return this.length();
		},

		at: function(i) {
			var pair = {
				key: null,
				value: null
			};
			pair.key = this.__list.at(2 * i);
			pair.value = this.__list.at(2 * i + 1);
			i = null;
			return pair;
		},

		/**
		 * 删除某一项
		 * 
		 * @param  {Number/String} key [description]
		 * @return {None}     [description]
		 */
		remove: function(key) {
			var i = this._indexOf(key);
			if (i !== -1) {
				this.__list.remove(i, 2);
			}
		},

		clear: function() {
			this.__list.clear();
		},

		each: function(iterator, scope){
			for (var i = 0, l = this.length(); i < l; i++) {
				var pair = this.at(i);
				if (typeof(pair) !== "undefined"){
					if (iterator.call(scope, pair) === false){
						break;
					}
				}
			}
		}
	});
})();