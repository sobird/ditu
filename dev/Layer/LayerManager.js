/**
 * LayerManager.js
 * 
 * 图层管理器，管理系统内置图层及用户自定义图层
 * 
 * 控制图层的绘制(切片排列)，显示与隐藏，zIndex,以及事件触发机制等
 * 
 * 
 * @author	CrossYou at 2011/05/18 build.
 * @link	http://www.crossyou.cn/
 * @version	$Id$
 */

(function(com){
	var LayerManager = com.createClass('LayerManager',{
		LayerManager : function(map){
			/**
			 * 地图对象
			 * 
			 * @access private
			 */
			this._map 			= map;
			
			/**
			 * 图层集合数组
			 * 
			 * @access private
			 */
			this._layers 		= {};
			
			/**
			 * 图层西北角的切片二维序列
			 * 
			 * @access private
			 */
			this._nouthwest		= {line:0,column:0};
			
			/**
			 * 图层东南角的切片二维序列
			 * 
			 * @access private
			 */
			this._southeast		= {line:0,column:0};
			
			/**
			 * 图层数量
			 * 
			 * @access private
			 */
			this._layerNumber 	= 0;
			
			
			/**
			 * 图层切片数
			 * 
			 * @access private
			 */
			this._tileNumber 	= 0;
			
			/**
			 * 各种参数集合
			 * 
			 * @access private
			 */
			this._params		= {};
			
			//this.initialize();
		},
		
		/**
		 * 更新所有图层的切片
		 * 
		 * 
		 */
		updateLayers : function(){
			var layers = this._layers;
			for(hash in layers){
				var layer = layers[hash];
				
				if(typeof layer.initLayerManager == 'function'){
					layer.initLayerManager.call(this,this._map);
				}
				this.updateParams();
				this.renderLayer(layer);
				
			}
		},
		
		
		
		/**
		 * 更新地图图层绘制所需要的相关参数
		 * 
		 * 例如: 缩放地图时: 地图对象更新 zoomLevel center 等属性; 拖动地图时更新 center等
		 * 
		 * @since 1.0.0
		 * 
		 */
		updateParams : function(){
			var _map = this._map;
			var _mapSize = _map.size || new com.Size(500,350);
			var _zoomLevel = _map.zoomLevel || 8;
			var _tileSize = new com.Size(300,300);
			var _center = com.helper.coordOffsetDecrypt(new com.Point(120.15689,35.96333));
			var _tileRange = new com.Point(TILE_LNG_RANGE[_zoomLevel],TILE_LAT_RANGE[_zoomLevel]);
			var _multiple = MULTIPLE;
			var _tileLineSum			= 360/_tileRange.lng;
			var _blockSize = BLOCK_SIZE[_zoomLevel];
			var halfTileNum_X  	= Math.ceil(_mapSize.width /_tileSize.width /2);
			var halfTileNum_Y	= Math.ceil(_mapSize.height/_tileSize.height/2);
			
			//地图中心点所在的切片序号
			var centerTileNo_X 	= Math.floor(_center.lng/_tileRange.lng);
			var centerTileNo_Y 	= Math.floor(_center.lat/_tileRange.lat);
			if(centerTileNo_X<0)centerTileNo_X+=1;
			
			this._nouthwest		= new com.Coord((-halfTileNum_X-1) + centerTileNo_X,(-halfTileNum_Y-1) + centerTileNo_Y);
			this._southeast		= new com.Coord(halfTileNum_X + centerTileNo_X,halfTileNum_Y + centerTileNo_Y);
			
			this._params.mapSize		= _mapSize;
			this._params.zoomLevel		= _zoomLevel;
			this._params.tileSize		= _tileSize;
			this._params.tileRange		= _tileRange;
			this._params.center			= _center;
			this._params.multiple		= MULTIPLE;
			this._params.tileLineSum	= _tileLineSum;
			this._params.blockSize		= _blockSize;
			this._params.centerTileNo_X		= centerTileNo_X;
			this._params.centerTileNo_Y		= centerTileNo_Y;
		},
		
		
		
		/**
		 * 向图层管理器中添加一个图层对象
		 * 
		 * @since 1.0.0
		 * @access public
		 */
		addLayer : function(layer){
			
			var hash = layer.getHash();
			if(this._layers[hash])return;
			
			this._layers[hash] = layer;
			this._layerNumber++;
			
			this.updateLayers();
		},
		
		/**
		 * 移除图层管理器中的某个图层对象
		 * 
		 * @since 1.0.0
		 * @access public
		 */
		removeLayer : function(layer){
			
		},
		
		showLayer : function(){
			
		},
		
		hideLayer : function(){
			
		},
		
		/**
		 * 渲染图层管理器中的图层
		 * 
		 * @since 1.0.0
		 * @access private
		 */
		renderLayer : function(layer){
			
			for(var _line = this._nouthwest.line; _line <= this._southeast.line; _line++){
				for(var _column = this._nouthwest.column; _column <= this._southeast.column; _column++){
					this._params.tileCoord = new com.Coord(_line,_column);//图层切片二维序列号

					layer.loadTile(this._params);
					
				}
			}
		},
		
		displayLayer : function(){}
	});
	
	com.LayerManager = LayerManager;
	
})(com);

