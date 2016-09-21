$(document).ready(function() {
	var nav_list = $(".menu_li");
	var iframe = $("#iframe");
	for(var i=0;i<nav_list.length;i++)
	{
		$(nav_list[i]).click(function(){
			for(var j=0;j<nav_list.length;j++){
				$(nav_list[j]).removeClass('current_page_item');
			}
			var index = $(this).index();
			$(this).addClass('current_page_item');						
		});
	}
	// $(".home").click(function(event) {
	// 	iframe.height("1200");
	// });
	// $(".article").click(function(event) {
	// 	iframe.height("1500");
	// });
	// $(".aboutUs").click(function(event) {
	// 	iframe.height("1500");
	// });
	// $(".new").click(function(event) {
	// 	iframe.height("100%");
	// });
});