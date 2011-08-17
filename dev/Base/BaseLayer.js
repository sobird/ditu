/**
 * BaseLayer.js
 * 
 * 
 */

(function(com){
	var BaseLayer = com.createClass('BaseLayer',{
		BaseLayer : function(opts){
			//图层的参数设置
			this.opts = {
				visible : true,
				imgExt	: 'png',
				zIndex	: -1,
				type	: 'tileLayer'
			};
			
			this.container = null;
			
		},
		
		/**
		 * 根据当前给定的切片序列号坐标及地图显示级别，计算并返回此切片的uri
		 * 
		 * 注:这是一个抽象的方法，自定义的图层类需要继承此类,并实现此方法
		 * 
		 * @param {Object} tileCoord
		 * @param {Number} zoomLevel
		 * @returns {String} tileUri
		 */
		getTileUri : function(tileCoord,zoomLevel){
			throw "请重载 "+ this._className+" 类中的 getTileUri() 方法";
		},
		
		getTileOffset : function(){
			throw "请重载 "+ this._className+" 类中的 getTileOffset() 方法";
		},
		
		/**
		 * 加载地图图层切片
		 * 
		 * @since 1.0.0
		 * 
		 * @param
		 */
		loadTile   : function(opts){
			console.log(opts.tileCoord.line);
			var _src  = this.getTileUri(opts);
			var _offset = this.getTileOffset(opts);
			var _tile = new com.Tile(this,_src,_offset);
		},
		
		/**
		 * 单个切片加载完毕后所要执行的
		 * 
		 * @since 1.0.0
		 */
		tileOnLoad : function(tile){
			document.getElementById('tester').appendChild(tile.img);
		},
		
		/**
		 * 切片加载错误处理程序
		 * 
		 * @since 1.0.0
		 */
		tileOnError : function(tile){
			console.log(tile);
			//this.div.appendChild(errorImg);
		},
		
		/**
		 * 显示切片
		 * 
		 * @since 1.0.0
		 */
		showTile : function(src){
			
		},
		
		/**
		 * 隐藏切片
		 * 
		 */
		hideTile : function(){
			
		},
		
		
		setZIndex : function(zIndex){
			
		}
		
	});
	
	
	BaseLayer._proto_(com.BaseClass);
	
	com.BaseLayer = BaseLayer;
})(com);