//初始化地图原生事件
Jaring.maps.Map.addInitHook(function(){
	this.container.once('click',function(event){
		console.log(event);
	});
console.log(this, 'addInitHook');
	this.on('dragend',function(event){
		console.log(event);
	});
});