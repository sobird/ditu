/**
 * 系统基本切片(BaseTileLayer)图层
 * 
 * @author  crossyou <crossyou2009@gmail.com>
 * @version	$Id$
 */

(function(com){
	var TileLayer = com.createClass('TileLayer',{
		TileLayer : function(opts){
			com.BaseLayer.call(this,opts);
		},
		
		_generateServerId : function(fileX,fileY){
			var s = [["",1],[2,3]];
			return s[(fileX%2)<0?0:fileX%2][(fileY%2)<0?0:fileY%2];
		},
		
		/**
		 * 初始化图层管理器,图层绘制初始化,绘图算法在这里
		 * 
		 */
		initLayerManager : function(map){
			this.tileEndNo_X = 'adasdf';
		},
		
		/**
		 * 根据当前给定的切片序列号坐标及地图显示级别，计算并返回此切片的uri
		 * 
		 * @param {Object} tileCoord
		 * @param {Number} zoomLevel
		 * @returns {String} tileUri
		 */
		getTileUri : function(opts){
			var _line = opts.tileCoord.line;
			var _column = opts.tileCoord.column;
			var blockSize = opts.blockSize;
			var tileLineSum = opts.tileLineSum;
			var levelFolder = opts.zoomLevel-1;
			
			_line = _line % tileLineSum;

			if (_line >= (tileLineSum / 2))  
				_line -= tileLineSum;  
			if (_line < (-tileLineSum / 2))  
				_line += tileLineSum; 
			
			var folderX = parseInt(Math.floor((_line) / blockSize));  
			var folderY = parseInt(Math.floor((_column) / blockSize));
			
			if (folderX < 0)  
				folderX += 1;  
			if (folderY < 0)  
				folderY += 1;  
			  
			var fileX = (_line) - folderX * blockSize;
			var fileY = (_column) - folderY * blockSize;
			
			var folder = folderX + '_' + folderY;//切片文件夹
			var file   = fileX + '_' + fileY;//切片文件名
			
			var uri = 'http://img'+this._generateServerId(fileX, fileY)+'.mapbar.com/maplite/mapbank/mapbar/' + levelFolder + '/' + folder + '/' + file + '.' + this.opts.imgExt;

			return uri;
		},
		
		fixTileCoord : function(coord){
			
		},
		
		/**
		 * 获取切片在图层中显示的位置
		 * 
		 * @since 1.0.0
		 * @param
		 * @return {Offset} offset 切片位置对象
		 */
		getTileOffset : function(opts){
			var mapX=opts.mapSize.width/2-Math.round(((opts.center.lng*opts.multiple)%(opts.tileRange.lng*opts.multiple))*opts.tileSize.width/(opts.tileRange.lng*opts.multiple));
			if(opts.center.lat>=0) {
				mapY=opts.mapSize.height/2-opts.tileSize.height+Math.round(((opts.center.lat*opts.multiple)%(opts.tileRange.lat*opts.multiple))*opts.tileSize.height/(opts.tileRange.lat*opts.multiple));
			}else {
				mapY=opts.mapSize.height/2+Math.round(((opts.center.lat*opts.multiple)%(opts.tileRange.lat*opts.multiple))*opts.tileSize.height/(opts.tileRange.lat*opts.multiple));
			}
			var _left = (opts.tileCoord.line-opts.centerTileNo_X) * opts.tileSize.width + parseInt(mapX);
			var _top  = -((opts.tileCoord.column-opts.centerTileNo_Y) * opts.tileSize.height) + parseInt(mapY);
			_top = _top + LAT_OFFSET[opts.zoomLevel];

			return new com.Offset(_left,_top);
		}
	});
	
	TileLayer._proto_(com.BaseLayer);
	com.TileLayer = TileLayer;	
	
})(com);

