/**
 * 一些基本数据类型
 * 
 * @version $Id$
 */

(function(com){
	var Point = com.createClass('Point',{
		Point : function(lng,lat){
			
			this.lng = lng;
			this.lat = lat;
		}
	});


	var Pixel = com.createClass('Pixel',{
		Piexl : function(x,y){
			
			this.x = x;
			this.y = y;
		}
	});

	var Size  = com.createClass('Size',{
		Size : function(width,height){
			
			this.width  = width;
			this.height = height;
		}
	});
	
	var Coord  = com.createClass('Coord',{
		Coord : function(line,column){
			
			this.line  	= line;
			this.column = column;
		}
	});
	
	var Offset  = com.createClass('Offset',{
		Offset : function(left,top){
			
			this.left  	= left;
			this.top = top;
		}
	});
	
	com.Offset = Offset;
	com.Point = Point;
	com.Pixel = Pixel;
	com.Coord = Coord;
	com.Size  = Size;
})(com);