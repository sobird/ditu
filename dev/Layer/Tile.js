/**
 * 地图图层切片类 Tile
 * 
 * @author 	YJL <crossyou2009@gmail.com>
 * @version	$Id$
 */

(function(com){
	var Tile = com.createClass('Tile',{
		/**
		 * 切片类构造函数
		 * 
		 * @since 1.0.0
		 * @author YJL
		 * 
		 * @param {Layer}  layer 	切片所在的图层实例对象
		 * @param {String} src   	切片的URI
		 * @param {Offset} offset	切片位置
		 * @return {Tile}  tile  	切片类实例对象
		 */
		Tile : function(layer,src,offset){
			var _this 			= this;

			this._layer 		= layer;
			this.src 			= src;
			this.offset 		= offset;
			
			var img 			= new Image;
			var _img_style 		= img.style;
			_img_style.position = "absolute";
			_img_style.border 	= "none";
			_img_style.left   	= offset.left + "px";
			_img_style.top    	= offset.top  + "px";
			
			img.onload  	= function(){
				layer.tileOnLoad(_this);
			};
			img.onerror 	= function(){
				layer.tileOnError(_this);
			};
			
			img.src 	 	= src;
			this.img		= img;
			img 		 	= null;
		},
		
		/**
		 * 获取切片所在的图层对象
		 * 
		 * @since 	1.0.0
		 * @return 	{Layer} layer
		 */
		getLayer : function(){
			return this._layer;
		},
		
		/**
		 * 获取切片的名字
		 * 
		 * @since 	1.0.0
		 * @return 	{String} name
		 */
		getName  : function(){
			return this._name;
		}
	});
	
	com.Tile = Tile;
})(com);

