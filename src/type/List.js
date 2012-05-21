(function(){
	Jaring.create('Jaring.maps.List', {
		List: function(array){
			this.__array = array === undefined ? [] : array;
		},

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
		},

		each: function(iterator, scope) {
			for (var i = 0, l = this.length(); i < l; i++) {
				var value = this.at(i);
				if (typeof(value) !== "undefined"){
					if (iterator.call(scope, value, i, this) === false){
						break;
					}
				}
			}
		}
	});
})();