/**
 * Browser.js
 * 
 * @author	CrossYou at 2011/05/18 build.
 * @link	http://www.crossyou.cn/
 * @version	$Id$
 */

(function(com){
	var na = navigator, ua = na.userAgent;
	var browser = {
			/**
			 * Constant that is true if the browser is Opera.
			 *
			 * @property isOpera
			 * @type Boolean
			 * @final
			 */
			isOpera : window.opera && opera.buildNumber,

			/**
			 * Constant that is true if the browser is WebKit (Safari/Chrome).
			 *
			 * @property isWebKit
			 * @type Boolean
			 * @final
			 */
			isWebKit : /WebKit/.test(ua),

			/**
			 * Constant that is true if the browser is IE.
			 *
			 * @property isIE
			 * @type Boolean
			 * @final
			 */
			isIE : !this.isWebKit && !this.isOpera && (/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName),

			/**
			 * Constant that is true if the browser is IE 6 or older.
			 *
			 * @property isIE6
			 * @type Boolean
			 * @final
			 */
			isIE6 : this.isIE && /MSIE [56]/.test(ua),

			/**
			 * Constant that is true if the browser is Gecko.
			 *
			 * @property isGecko
			 * @type Boolean
			 * @final
			 */
			isGecko : !this.isWebKit && /Gecko/.test(ua),

			/**
			 * Constant that is true if the os is Mac OS.
			 *
			 * @property isMac
			 * @type Boolean
			 * @final
			 */
			isMac : ua.indexOf('Mac') != -1,

			/**
			 * Constant that is true if the runtime is Adobe Air.
			 *
			 * @property isAir
			 * @type Boolean
			 * @final
			 */
			isAir : /adobeair/i.test(ua),

			/**
			 * Constant that tells if the current browser is an iPhone or iPad.
			 *
			 * @property isIDevice
			 * @type Boolean
			 * @final
			 */
			isIDevice : /(iPad|iPhone)/.test(ua)
	};
	
	//将浏览器对象属性扩展到map对象
	com.extend(com,browser);
})(com);
