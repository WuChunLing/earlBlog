jQuery(document).ready(function($) {
	var data = new Date();
	var year = data.getFullYear();
	var month = data.getMonth() + 1;
	var day = data.getDate();
	$(".month").text(month+"月");
	$(".day").text(day+"日");
	$(".year").text(","+year);


	// // 获取本网站的访问量
	// 	$.get(url,function(data){
	// 	$(".glyphicon-eye-open").text(data);
	// });
	
	// if(localStorage.load){
	// 	localStorage.load = localStorage.load + sessionStorage.load ;
	// }
	// else{ 
	// 	localStorage.load = 1;
	// }
});