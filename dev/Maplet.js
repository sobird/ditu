/**
 * 地图核心类
 * 
 * @author	CrossYou
 * @link	http://www.crossyou.cn/
 * @version	$Id$
 */

(function(com){
	var Maplet = com.createClass('Maplet',{
		Maplet : function(container,opts){
			/**
			 * 地图容器对象
			 * 
			 * @since 1.0.0
			 * @access public
			 */
			this.container = container;
			
			/**
			 * 地图中心点坐标对象
			 * 
			 * @sicne 1.0.0
			 */
			this.center = new com.Point(0,0);
			
			/**
			 * 当前地图的显示级别
			 * 
			 * @since 1.0.0
			 */
			this.zoomLevel = 8;
			
			/**
			 * 地图容器的宽度 单位:pixel
			 * 
			 * @since 1.0.0
			 * @access public
			 */
			this.width  = 600;
			
			/**
			 * 地图容器的高度 单位:pixel
			 * 
			 * @since 1.0.0
			 * @access public
			 */
			this.height = 300;
			
			this.size	= new com.Size(600,350);
			
			this.offset	= new com.Offset(0,0);
			
			/**
			 * 地图容器X方向的偏移 单位:pixel
			 * 
			 * @since 1.0.0
			 * @access public
			 */
			this.offsetX = 0;
			
			/**
			 * 地图容器Y方向的偏移 单位:pixel
			 * 
			 * @since 1.0.0
			 * @access public
			 */
			this.offsetY = 0;
			
		},
		
		display : function(){},
		
		/**
		 * 渲染地图容器
		 * 
		 * @since 1.0.0
		 * @access private
		 */
		_render : function(){
			
		},
		
		/**
		 * 按给定的中心点和缩放级别设置地图视图。
		 * 
		 * @type user api
		 * @param {Point} center
		 * @param {Number} zoom
		 */
		centerAndZoom : function(centerPoint,zoomLevel){
			this.center = centerPoint;
			this.zoomLevel = zoomLevel;
			
			var baseLayer = new com.TileLayer();
		},
		
		// -- Maplet.prototype
		addOverlay : function(){
			
		},
		
		/**
		 * 添加一个图层
		 * 
		 * @since 1.0.0
		 * @param {TileLayer} layer 自定义的图层对象
		 */
		addLayer : function(layer){
			
		}
	});
	Maplet._proto_(com.BaseClass);
	com.Maplet = Maplet;
})(com);
