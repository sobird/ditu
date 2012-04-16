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
		scripts.push(base + '../source/' + jsfile);
	}
	//----------------------------------------------------------------
	
	require('jaring.js');

	//Core 核心文件
	require('core/Util.js');
	require('core/Browser.js');
	require('core/MVCObject.js');

	require('dom/DomUtil.js');

	require('map/Map.js');
	//-----------------------------------------------------------------
	init(scripts);
 })();