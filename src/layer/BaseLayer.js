(function(){
	/**
	 * 这是图层的基础类
	 */
	Jaring.create('Jaring.maps.BaseLayer extends Jaring.MVCObject', {
		BaseLayer: function(){
			this.tileHash = new Jaring.maps.Hash();
		},

		/**
		 * 添加一个切片对象到当前图层对象
		 */
		add: function(tile){
			this.tileHash.set(tile.__uuid, tile.load(this));
			
		},

		remove: function(tile){

		},

		clear: function(){

		},

		/**
		 * 需要子类复写该方法, 否则该方法将抛出异常
		 * 
		 * @param  {[type]} x [description]
		 * @param  {[type]} y [description]
		 * @param  {[type]} z [description]
		 * @return {[type]}   [description]
		 */
		getTileUrl: function(x, y, z){
			throw 'Please override '+ this.toString() +' class getTileUrl() method!';
		},

		/**
		 * 需要子类复写该方法, 否则该方法将抛出异常
		 * 
		 * @return {[type]} [description]
		 */
		getTileOffset : function(x, y){
			throw 'Please override  '+ this.toString() +' class getTileOffset() method!';
		},

		/**
		 * 切片加载完毕的回调方法
		 * 
		 * @param  {[type]} tile [description]
		 * @return {[type]}      [description]
		 */
		onTileLoad : function(tile){
			//TODO 暂时这样处理 测试, 此处可以添加其他一些处理，
			//例如，切片的 fadeOn 效果动画
			console.log(tile.image);
			document.getElementById('map').appendChild(tile.image);
		},
	});
})();