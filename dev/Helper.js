/**
 * 助手函数
 * 用来完成一些比较有用的功能,  未完待续...
 * @namespace Helper
 * 
 * @author 	CrossYou
 * @link	http://crossyou.cn/
 * @version	$Id$
 */

(function(com){
	
	var helper = {
			/**
			 * 阻止事件的默认行为
			 * 
			 * @since 1.0.0
			 * 
			 * @param event
			 * @return {Boolean}
			 */
			preventDefault:function(event) {
				var event = window.event || event;
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
				return false;
			},

			/**
			 * 阻止事件冒泡
			 * 
			 * @since 1.0.0
			 * 
			 * @param event
			 * @return {Void}
			 */
			stopPropagation:function(event) {
				var event = window.event || event;
				event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
			},
			
			/**
			 * 阻止事件
			 * 
			 * @since 1.0.0
			 * 
			 * @param {Event} event
			 * @return {Boolean}
			 */
			stopEvent : function(event){
				this.stopPropagation(event);
				return this.preventDefault(event);
			},
			
			/**
			 * GPS坐标偏移加密
			 * 将真实地理坐标加密为Mapbar经纬度坐标
			 *
			 * @param {Point} point 经纬坐标对象
			 * @return {Point} point 加密后的 经纬坐标对象
			 */
			coordOffsetEncrypt:function(point){
				point.lng = parseFloat(point.lng)*100000%36000000;
				point.lat = parseFloat(point.lat)*100000%36000000;

				var _lng = parseInt(((Math.cos(point.lat/100000))*(point.lng/18000))+((Math.sin(point.lng/100000))*(point.lat/9000))+point.lng);
				var _lat = parseInt(((Math.sin(point.lat/100000))*(point.lng/18000))+((Math.cos(point.lng/100000))*(point.lat/9000))+point.lat);

				return new com.Point(_lng/100000.0,_lat/100000.0);
			},

			/**
			 * GPS坐标偏移解密
			 * 将加密后的经纬坐标解密为真实地理坐标
			 *
			 * @param x 经度值
			 * @param y 维度值
			 * @return [x,y]
			 */
			coordOffsetDecrypt:function(point){
				point.lng = parseFloat(point.lng)*100000%36000000;
				point.lat = parseFloat(point.lat)*100000%36000000;

				var _lng1 = parseInt(-(((Math.cos(point.lat/100000))*(point.lng/18000))+((Math.sin(point.lng/100000))*(point.lat/9000)))+point.lng);
				var _lat1 = parseInt(-(((Math.sin(point.lat/100000))*(point.lng/18000))+((Math.cos(point.lng/100000))*(point.lat/9000)))+point.lat);

				var _lng2 = parseInt(-(((Math.cos(_lat1/100000))*(_lng1/18000))+((Math.sin(_lng1/100000))*(_lat1/9000)))+point.lng+((point.lng>0)?1:-1));
				var _lat2 = parseInt(-(((Math.sin(_lat1/100000))*(_lng1/18000))+((Math.cos(_lng1/100000))*(_lat1/9000)))+point.lat+((point.lat>0)?1:-1));

				return new com.Point(_lng2/100000.0,_lat2/100000.0);
			},
			
			/**
			 * 将角度转换为弧度
			 * 
			 * @param {Number} degrees 度数 (经纬度)
			 * @return {Number} radians 弧度
			 */
			toRadians:function(degrees) {
				return Math.PI * degrees / 180;
			},
			
			/**
			 * 将弧度转换为角度
			 * 
			 * @param {Number} radians 弧度
			 * @return {Number} degrees 度数 (经纬度)
			 */
			toDegrees:function(radians) {
				return (180 * radians) / Math.PI;
			}
	};
	
	com.helper = helper;
})(com);