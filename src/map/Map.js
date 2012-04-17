Jaring.create('Jaring.maps.Map extends Jaring.MvcObject',{

	/**
	 * 构造函数
	 * 
	 */
	Map: function(id, options){

	},

	//Methods that modify map state
	setOptions: function(options){},

	setCenter: function(center){},

	setZoom: function(zoom){},

	fitBounds: function(bounds){},

	zoomIn: function(){},

	zoomOut: function(){},

	panTo: function(latlng){},

	panBy: function(point){},

	panToBounds: function(bounds){},

	//Methods that get map state
	getCenter: function(){},

	getZoom: function(){},

	getBounds: function(){}

});