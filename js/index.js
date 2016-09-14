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
	// var nav=$("#nav"); //得到导航对象
	// var win=$(window); //得到窗口对象
	// var sc=$(document);//得到document文档对象。
	// win.scroll(function(){
	// 	if(sc.scrollTop()>=800){
	// 		nav.addClass("fixnav"); 
	// 	}else{
	// 	nav.removeClass("fixnav");
	// 	}
	// });
});