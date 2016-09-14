$(document).ready(function(){
	getArticle();
	getArticleHot();
	// 列表视图点击事件
	$("#list_view").click(function(event) {
		$("#article_intro").removeClass('current_article');
		$("#article_list").addClass('current_article');		
	});

	// 概要视图点击事件
	$("#gaiyao_view").click(function(event) {
		$("#article_list").removeClass('current_article');
		$("#article_intro").addClass('current_article');		
	});

	// 最新排序点击事件
	$("#new").click(function(event) {
		temp.reverse();
		article = temp ;
		$("#new").toggleClass("glyphicon-arrow-up");
		$("#new").toggleClass("glyphicon-arrow-down");
		$(".pagination").find("li").removeClass('active');
		$(".list_page").find("li").first().addClass('active');	
		$(".gaiyao_page").find("li").first().addClass('active');	
		get_view(5);
		get_view(30);
	});

	// 最热排序点击事件
	$("#hot").click(function(event) {
		 articleHot.reverse();
		 article = articleHot ;
		 $("#hot").toggleClass("glyphicon-arrow-up");
		 $("#hot").toggleClass("glyphicon-arrow-down");
		 $(".pagination").find("li").removeClass('active');
		 $(".list_page").find("li").first().addClass('active');	
		 $(".gaiyao_page").find("li").first().addClass('active');	
		 get_view(5);
		 get_view(30);
	});

	// 概要视图页码的点击事件
	$("#article_intro").find(".gaiyao_page").on('click', 'li', function(){
		// 页码的css变化
		$(this).siblings().removeClass('active');
		$(this).addClass('active');		
		// 获取当前点击的页码
		var page = $(this).text(); 
		if(page=="第一页"){get_view(5);}
		else if(page=="最后一页"){
			var page_prev = $(this).prev().text();
			if(page_prev=="第一页"){page_prev = 1 ;}
			page = parseInt(page_prev) + 1;
			last_page(page,5);
		}
		else{
			var str = '';
			var j =( parseInt(page) - 1 ) * 5 ;
			var z = parseInt(page) * 5 ;
			for(var i=j;i<z;i++){
				var tipStr = "";
				for(var m=0;m<tip[i].length;m++){
					tipStr +=  '<span class="tip">'+tip[i][m]+'</span>';
				}
	       		str += 	'<div class="post"><h3 class="title"><a href="#">'+article[i][1] +'</a></h3><p class="meta"><span class="date">'+article[i][7]+'&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span><span class="posted">作者 <a href="#">'+article[i][3]+'</a></span></p><div class="entry"><p>'+article[i][5]+'</p><p class="links"><a href="#">阅读全文</a>'+tipStr+'</p></div></div>';
			}
			$("#post_view").empty();
			$("#post_view").append(str);
		}
		 scroll(0,0);
		// window.moveTo(0, 0);
	});

	// 列表视图页码的点击事件
	$("#article_list").find(".list_page").on('click', 'li', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');		
		var page = $(this).text();
		if(page=="第一页"){page = 1;get_view(30);}
		else if(page=="最后一页"){
			var page_prev = $(this).prev().text();
			if(page_prev=="第一页"){page_prev = 1 ;}
			page = parseInt(page_prev) + 1;
			last_page(page,30);
		}
		else{
			var str = '';
			var j =( parseInt(page) - 1 ) * 30 ;
			var z = parseInt(page) * 30 ;
			for(var i=j;i<z;i++){
				str += '<tr><td>'+article[i][1]+'</td><td>'+article[i][3]+'</td><td>'+article[i][7] +'</td><td>'+'<span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span>'+'</td></tr>';
			}
			$("#tbody").empty();
			$("#tbody").append(str);
		}
		// $(window).father.scroll(0,0);
		// window.moveTo(0, 0);
	});

	// 搜索文章
	$(".Searchtext").keyup(function(event) {
		if (event.keyCode == 13){
			search();
		};
	});//文本框回车
	$(".glyphicon-search").click(function(event){
		search();
	});//放大镜点击
});


var article = [] ;// 存放文章数据的二维数组，按发最新排序
var articleHot = [] ;// 存放文章数据的二维数组，按最热排序
var articleSearch = [] ;// 存放搜索到的文章
var temp = [];
temp = article;
var article_num;// 文章总数
var search_num;// 搜索到的文章总数
var tip = [] ; //存放所有文章标签的二维数组
var tipHot = [] ;
var tipSearch = [] ;
// 获取所有文章的数据存入数组 , 最新发表排序
function getArticle(){	
	var getArticle_url = "E:/project/blog/json/article.json" ;
	$.ajax({
	    type: "get",//请求方式
	    url:getArticle_url,//地址，就是action请求路径
	    data: "json",//数据类型text xml json  script  jsonp
	    success: function(json){//返回的参数就是 action里面所有的有get和set方法的参数
	    	var data = JSON.parse(json);
	    	article_num = data.length;
	  		for(var i=0;i<data.length;i++){	
				article[i] = new Array(9);
				tip[i] = new Array();
				article[i][0] = data[i].article_id ;	 // id
				article[i][1] = data[i].article_title ;  //  标题
				article[i][2] = data[i].article_content  ;  // 内容
				article[i][3] = data[i].article_user_name  ;  // 作者
				article[i][4] = data[i].article_read  ;  // 阅读数
				article[i][5] = data[i].article_fragment ;  // 片段
				article[i][6] = data[i].article_like;  // 点赞数
				article[i][7] = data[i].article_time ;  // 发表时间
				article[i][8] = data[i].article_type ;  // 类型
				var tipText = article[i][8].split(",");
				for (var j=0;j<tipText.length;j++){
					tip[i][j] = tipText[j];
				}
			}
			get_page(5);
			get_page(30);
			get_view(5);
			get_view(30);	
	    }
	}); 
}

// 获取所有文章的数据存入数组 , 最热排序
function getArticleHot(){	
	var getArticle_url = "E:/project/blog/json/articleHot.json" ;
	$.ajax({
	    type: "get",//请求方式
	    url:getArticle_url,//地址，就是action请求路径
	    data: "json",//数据类型text xml json  script  jsonp
	    success: function(json){//返回的参数就是 action里面所有的有get和set方法的参数
	    	var data = JSON.parse(json);
	  		for(var i=0;i<data.length;i++){	
				articleHot[i] = new Array(9);
				tipHot[i] = new Array();
				articleHot[i][0] = data[i].article_id ;	 // id
				articleHot[i][1] = data[i].article_title ;  //  标题
				articleHot[i][2] = data[i].article_content  ;  // 内容
				articleHot[i][3] = data[i].article_user_name  ;  // 作者
				articleHot[i][4] = data[i].article_read  ;  // 阅读数
				articleHot[i][5] = data[i].article_fragment ;  // 片段
				articleHot[i][6] = data[i].article_like;  // 点赞数
				articleHot[i][7] = data[i].article_time ;  // 发表时间
				articleHot[i][8] = data[i].article_type ;  // 类型
				var tipText = articleHot[i][8].split(",");
				for (var j=0;j<tipText.length;j++){
					tipHot[i][j] = tipText[j];
				}
			}
	    }
	}); 
}

// 显示页码
function get_page(index){
	var yu = article_num % index;
	var page =parseInt(article_num / index);
	if (yu != 0) { page = page + 1 ;}
	var str = '';
	if(page > 1)
	{
		for (var i = 1;i<=page;i++){
			if(i==1){
				str += "<li class='active'><a>第一页</a></li>";
			}
			else{
				if(i==page){
					str += "<li><a>最后一页</a></li>";
				}
				else{
					str += "<li><a>"+i+"</a></li>";
				}	
			}
			
		}
	}
	if (index==5) {$(".gaiyao_page").append(str);}
	else{$(".list_page").append(str);}
}

// 显示第一页的视图文章数据
function get_view(index){
	var str = '';
	// 文章数少于页面排版的数目 5或者30
	if (article_num<index) {
		for(var i=0;i<article_num;i++){
			// 概要视图
			if(index==5){
				// 遍历每篇文章标签
				var tipStr = "";
				for(var j=0;j<tip[i].length;j++){
					tipStr +=  '<span class="tip">'+tip[i][j]+'</span>';
				}
       			str += 	'<div class="post"><h3 class="title"><a href="#">'+article[i][1] +'</a></h3><p class="meta"><span class="date">'+article[i][7]+'&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span><span class="posted">作者 <a href="#">'+article[i][3]+'</a></span></p><div class="entry"><p>'+article[i][5]+'</p><p class="links"><a href="#">阅读全文</a>'+tipStr+'</p></div></div>';
			}
			// 列表视图
			else{
				str += '<tr><td>'+article[i][1]+'</td><td>'+article[i][3]+'</td><td>'+article[i][7] +'</td><td>'+'<span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span>'+'</td></tr>';
			}
		}
	}
	// 文章数多于页面排版的数目
	else{
		for(var i=0;i<index;i++){
			// 概要视图
			if(index==5){
				// 遍历每篇文章标签
				var tipStr = "";
				for(var j=0;j<tip[i].length;j++){
					tipStr +=  '<span class="tip">'+tip[i][j]+'</span>';
				}
       			str += 	'<div class="post"><h3 class="title"><a href="#">'+article[i][1] +'</a></h3><p class="meta"><span class="date">'+article[i][7]+'&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span><span class="posted">作者 <a href="#">'+article[i][3]+'</a></span></p><div class="entry"><p>'+article[i][5]+'</p><p class="links"><a href="#">阅读全文</a>'+tipStr+'</p></div></div>';
			}
			// 列表视图
			else{
				str += '<tr><td>'+article[i][1]+'</td><td>'+article[i][3]+'</td><td>'+article[i][7] +'</td><td>'+'<span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span>'+'</td></tr>';
			}
		}
	}
	if(index==5){$("#post_view").empty();$("#post_view").append(str);}
	else{$("#tbody").empty();$("#tbody").append(str);}
}

// 显示最后一页的视图
function last_page(page,index){	
	var str ='';
	// 概要视图
	if (index == 5) {
		$("#post_view").empty();
		var j = (page-1)*5 ; 
		for(var i=j;i<article_num;i++){
			var tipStr = "";
			for(var m=0;m<tip[i].length;m++){
				tipStr +=  '<span class="tip">'+tip[i][m]+'</span>';
			}
       		str += 	'<div class="post"><h3 class="title"><a href="#">'+article[i][1] +'</a></h3><p class="meta"><span class="date">'+article[i][7]+'&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span><span class="posted">作者 <a href="#">'+article[i][3]+'</a></span></p><div class="entry"><p>'+article[i][5]+'</p><p class="links"><a href="#">阅读全文</a>'+tipStr+'</p></div></div>';
		}
		$("#post_view").append(str);
	}
	// 列表视图
	else{
		$("#tbody").empty();
		var j = (page-1)*30 ;
		for(var i=j;i<article_num;i++){
			str += '<tr><td>'+article[i][1]+'</td><td>'+article[i][3]+'</td><td>'+article[i][7] +'</td><td>'+'<span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span>'+'</td></tr>';
		}
		$("#tbody").append(str);
	}
}

function search(){
	var text = $("input")[0].value;
	if(text!=''){
		var search_url = "E:/project/blog/json/search.json";
		$.post(search_url,text,function(json){
			var data = JSON.parse(json);
			search_num = data.length;
	  		for(var i=0;i<data.length;i++){	
				articleSearch[i] = new Array(9);
				tipSearch[i] = new Array();
				articleSearch[i][0] = data[i].article_id ;	 // id
				articleSearch[i][1] = data[i].article_title ;  //  标题
			    articleSearch[i][2] = data[i].article_content  ;  // 内容
				articleSearch[i][3] = data[i].article_user_name  ;  // 作者
				articleSearch[i][4] = data[i].article_read  ;  // 阅读数
				articleSearch[i][5] = data[i].article_fragment ;  // 片段
				articleSearch[i][6] = data[i].article_like;  // 点赞数
				articleSearch[i][7] = data[i].article_time ;  // 发表时间
				articleSearch[i][8] = data[i].article_type ;  // 类型
				var tipText = articleSearch[i][8].split(",");
				for (var j=0;j<tipText.length;j++){
					tipSearch[i][j] = tipText[j];
				}
			}
			get_page(5);
			get_page(30);
			get_view(5);
			get_view(30);	
		});
	}
}