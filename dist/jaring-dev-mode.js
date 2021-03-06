/**
 * JARING - 4 commemorate
 *
 * Copyleft 2011, AWEBGIS.COM
 * Released under LGPL License.
 *
 * License: http://www.awebgis.com/license
 *
 * This file loads the js files from source instead of a merged copy.
 * 
 * Version: $Id$
 */

 (function(){
 	var scripts = [];

 	//---------------------------------------------------------------
 	function getPath(){
 		var nl = document.getElementsByTagName('script');
		for (var i = 0; i < nl.length; i++) {
			var src = nl[i].src;
			if (src && src.indexOf('jaring-dev-mode.js') != -1) {
				var res = src.substring(0, src.lastIndexOf('/')+1);
				if (res) {
					return res ;
				}
			}
		}
 	}
 	function init(scripts){
 		var output = '';
		for (var i = 0; i < scripts.length; i++)
			output += '<script type="text/javascript" src="' + scripts[i] + '"></script>\n';
			
		document.write(output);
 	}
 	function require(jsfile){
 		var base = getPath();
		scripts.push(base + '../src/' + jsfile);
	}
	//----------------------------------------------------------------
	
	require('jaring.js');

	//Core 核心文件
	require('core/browser.js');
	require('core/constant.js');
	require('core/util.js');
	
	require('core/event.js');
	require('core/Observable.js');
	require('core/MVCObject.js');
	require('core/MVCArray.js');

	require('type/Transformation.js');
	require('type/LngLat.js');
	require('type/Point.js');
	require('type/Event.js');
	require('type/Size.js');
	require('type/Offset.js');
	require('type/Bounds.js');
	require('type/List.js');
	require('type/Hash.js');

	require('dom/dom.js');
	require('core/Draggable.js');
	
	require('geo/projection/Projection.js'),
	require('geo/projection/Projection.SphericalMercator.js'),
	require('geo/projection/Projection.LngLat.js'),
	require('geo/projection/Projection.Mercator.js'),

	require('geo/crs/CRS.js'),
	require('geo/crs/CRS.EPSG3857.js'),

	require('map/Map.js');
	require('map/initMapRawEvent.js');

	require('layer/BaseLayer.js');
	require('layer/Tile.js');
	require('layer/TileLayer.js');
	require('layer/LayerMgr.js');
	
	//-----------------------------------------------------------------
	init(scripts);
 })();