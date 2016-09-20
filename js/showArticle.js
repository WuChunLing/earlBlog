jQuery(document).ready(function($) {
	$("#back").click(function(){
		history.back();
	});
	$("header").text(sessionStorage.title);
	$(".author").text(sessionStorage.author);
	$(".time").text(sessionStorage.time);
	console.log(sessionStorage.main);
	$(".content").empty().append(sessionStorage.main);
});
