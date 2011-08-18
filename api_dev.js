/**
 * 开发版
 *
 * Copyleft 2011, AWEBGIS.COM
 * Released under LGPL License.
 *
 * License: http://www.awebgis.com/license
 *
 * This file should only be used while developing MapApi 
 * This file loads the js files from classes instead of a merged copy.
 * 
 * Version: $Id$
 */

(function(){
	var i,flag = false, nl = document.getElementsByTagName('script'), base, src, p, li, query = '', it, scripts = [] ,_script;
	
	for (i=0; i<nl.length; i++) {
		src = nl[i].src;

		if (src && src.indexOf("api_dev.js") != -1) {
			base = src.substring(0, src.lastIndexOf('/'));
			
			if ((p = src.indexOf('?')) != -1)
				query = src.substring(p + 1);
		}
	}
	
	// Parse query string
	li = query.split('&');
	query = {};
	for (i=0; i<li.length; i++) {
		it = li[i].split('=');
		query[unescape(it[0])] = unescape(it[1]);
	}

	nl = null; // IE leak fix
	
	function initJs(scripts){
		var i, html = '';
		for (i = 0; i < scripts.length; i++)
			html += '<script type="text/javascript" src="' + scripts[i] + '"></script>\n';
			
		document.write(html);
	}
	
	function require(jsfile){
		scripts.push(base + '/dev/' + jsfile);
	}
	// -- end require defined --
	
	if (query.debug)
		//require('firebug/firebug-lite.js');
	
	//Core 核心文件
	require('map.js');
	
	require('Helper.js');
	require('Browser.js');
	require('Constant.js');
	
	//
	require('Base/BaseTypes.js');
	require('Base/BaseClass.js');
	require('Base/BaseEvent.js');
	require('Base/BaseLayer.js');
	require('Base/MVCObject.js');
	require('Layer/LayerManager.js');
	//
	
	require('Layer/TileLayer.js');
	require('Layer/Tile.js');
	
	require('Maplet.js');
	
	////////////////
	initJs(scripts);
})();
