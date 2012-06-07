(function(){
	Jaring.create('Jaring.MVCArray extends Jaring.MVCObject', {
		/**
		 * javascript Array Object
		 * 
		 * @type {Array}
		 */
		__array: [],

		MVCArray: function(array){
			this.__array = array || [];
			this.set('length',this.__array.length);
		},

		/**
		 * Get an element at the specified index.
		 * 
		 * @param  {Number} index [description]
		 * @return {*} * [description]
		 */
		getAt: function(index){
			return this.__array[index];
		},

		/**
		 * Iterate over each element, calling the provided callback. 
		 * The callback is called for each element like: callback(element, index).
		 * 
		 * @param  {Function} callback [description]
		 * @return {Undefined} none [description]
		 */
		forEach: function(callback){
			var i = 0, 
				l = this.get("length");
			for (i ; i < l; ++i) {
				if (callback(this.__array[i], i) === false) 
					break;
			}
		},

		/**
		 * Sets an element at the specified index.
		 * 
		 * @param {Number} index [description]
		 * @param {*} elem  [description]
		 */
		setAt: function(index,elem){
			var last_value = this.__array[index],
				length = this.__array.length;
			if (index < length) {
				this.__array[index] = elem;

				//触发 set_at 事件
				EventUtil.trigger(this, "set_at", index, last_value);
			} else {
				for (var i = length; i < index; ++i) {
					this.insertAt(i, undefined);
				}
				this.insertAt(index, elem)
			}
			
		},

		/**
		 * Inserts an element at the specified index.
		 * 
		 * @param  {Number} index [description]
		 * @param  {*} elem [description]
		 * @return {Undefined} none [description]
		 */
		insertAt: function(index, elem){
			this.__array.splice(index, 0, elem);
			//this.set('length',this.__array.length);
			EventUtil.trigger(this, "insert_at", index);
		},

		/**
		 * Removes an element from the specified index.
		 * 
		 * @param  {Number} index [description]
		 * @return {*} elem [description]
		 */
		removeAt: function(index){
			var last_value = this.__array[index];
			this.__array.splice(index, 1);
			//this.set('length',this.__array.length);
			EventUtil.trigger(this, "remove_at", index, last_value);
			return last_value;
		},

		/**
		 * Adds one element to the end of the array and returns the new length of the array.
		 * 
		 * @param  {*} elem [description]
		 * @return {[type]}       [description]
		 */
		push: function(elem){
			this.insertAt(this.__array.length, elem);
			return this.__array.length;
		},

		/**
		 * Removes the last element of the array and returns that element.
		 * 
		 * @return {*} elem [description]
		 */
		pop: function(){
			return this.removeAt(this.__array.length - 1);
		},

		/**
		 * Returns a reference to the underlying Array. 
		 * Warning: if the Array is mutated, no events will be fired by this object.
		 * 
		 * @return {Array} __array [description]
		 */
		getArray: function(){
			return this.__array;
		},

		/**
		 * Returns the number of elements in this array.
		 * 
		 * @return {Number} length [description]
		 */
		getLength: function(){
			return this.get('length');
		},
		/**
		 * Removes all elements from the array.
		 * 
		 * @return {Undefined} none [description]
		 */
		clear: function(){
			this.__array.length = 0;
			this.set('length',this.__array.length);
		}
	});
})();