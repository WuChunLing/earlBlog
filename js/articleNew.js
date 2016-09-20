var outlineView = [] ;//概要视图文章
var listView = [];//列表视图文章
var outlineTag = [];//标签
var listTag = [];//标签
var totalPage;

var upTimeSortURL ="./json/upTime.json";//按最新时间排序的文章接口
var downTimeSortURL ="./json/downTime.json ";//按最旧时间排序的文章接口

var upHotSortURL ="./json/upHot.json";//按最热排序的文章接口
var downHotSortURL ="./json/downHot.json";//按最不热排序的文章接口

var searchURL ="./json/search.json";//搜索文章的接口

var url = upTimeSortURL;

//文档加载预先显示第一分页文章信息
jQuery(document).ready(function($) {
	getArticle(url,1,5,null);//获取第一页的文章概要信息
	getArticle(url,1,20,null);//获取第一页的文章列表信息

	// 搜索文章
	$(".Searchtext").keyup(function(event) {
		if (event.keyCode == 13){
			search();
		};
	});//文本框回车
	$(".glyphicon-search").click(function(event){
		search();
	});//放大镜点击

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
		$("#new").toggleClass("glyphicon-arrow-up");
		$("#new").toggleClass("glyphicon-arrow-down");
		$(".pagination").find("li").removeClass('active');
		$(".list_page").find("li").first().addClass('active');	
		$(".gaiyao_page").find("li").first().addClass('active');
		if ( $("#new").hasClass("glyphicon-arrow-up") )
		{
			url = upTimeSortURL;
		}
		else{
			url = downTimeSortURL;
		}
		getArticle(url,1,5,null);
		getArticle(url,1,20,null);
	});

	// 最热排序点击事件
	$("#hot").click(function(event) {	
		$("#hot").toggleClass("glyphicon-arrow-up");
		$("#hot").toggleClass("glyphicon-arrow-down");
		$(".pagination").find("li").removeClass('active');
		$(".list_page").find("li").first().addClass('active');	
		$(".gaiyao_page").find("li").first().addClass('active');	
		if ( $("#hot").hasClass("glyphicon-arrow-up") )
		{
			url = upHotSortURL;
		}
		else{
			url = downHotSortURL;
		}	
		getArticle(url,1,5,null);
		getArticle(url,1,20,null);
	});

	// 显示文章
	$("#article_intro").find("#post_view").on('click', '.showOutline', function(){
		console.log("click");
		var i = this.id;
		sessionStorage.title = outlineView[i][1];
		sessionStorage.author = outlineView[i][3];
		sessionStorage.time = outlineView[i][7];
		sessionStorage.main = outlineView[i][2];
		// window.location.href='./showArticle.html';
	});
	$("body").find(".content").on('click', '.showList', function(){
		console.log("click");
		var i = this.id;
		sessionStorage.title = listView[i][1];
		sessionStorage.author = listView[i][3];
		sessionStorage.time = listView[i][2];
		sessionStorage.main = listView[i][7];
		// window.location.href='./showArticle.html';
	});

	// 页码点击事件
	$("body").find(".gaiyao_page").on('click', 'li', function(){
		console.log("pageClick");
		$(this).siblings().removeClass('active');
		$(this).addClass('active');		
		var page = $(this).text();
		if(page=="第一页"){page = 1;}
		else if(page=="最后一页")
		{
			var page_prev = $(this).prev().text();
			if(page_prev=="第一页"){page_prev = 1 ;}
			page = parseInt(page_prev) + 1;
		}
		else{ page = parseInt(page);}
		scroll(0,0);
		var text = $("input")[0].value;
		getArticle(url,page,5,text);
	});
	$("body").find(".list_page").on('click', 'li', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');		
		var page = $(this).text();
		if(page=="第一页"){page = 1;}
		else if(page=="最后一页")
		{
			var page_prev = $(this).prev().text();
			if(page_prev=="第一页"){page_prev = 1 ;}
			page = parseInt(page_prev) + 1;
		}
		else{ page = parseInt(page);}
		scroll(0,0);
		var text = $("input")[0].value;
		getArticle(url,page,20,text);
	});
});

// 从接口接收文章
// url接口 ，pageNum 第几页信息，index 每页几条记录，text 查询字段 
function getArticle(url,pageNum,index,text){
	$.post(url, {
		page:pageNum,
		articleNum:index,
		search:text
		},
		function(json) {
			var data = JSON.parse(json);
			var articleNum = data.numberOfElements;	//获得当前页文章总数
			totalPage = data.totalPages;	//获得分页数目
			if(index == 5){
				arr(outlineView,outlineTag,articleNum,data);
				put(outlineView,outlineTag,articleNum,5);
			}
			else{
				arr(listView,listTag,articleNum,data);
				put(listView,listTag,articleNum,20);
			}
			//页码显示
			if (pageNum == 1){
				if (index == 5) {getPage(totalPage,5);}
				else{getPage(totalPage,20);}
			}
	});
}

// 把从接口收到的数据存入数组中
// 参数 article要存入的文章数组，tag要存入的标签数组，articleNum文章总数或数组长度，data从接口接收到的数据
function arr(article,tag,atricleNum,data){
	for(var i=0;i<atricleNum;i++){	
		article[i] = new Array(9);	//定义为二维数组
		tag[i] = new Array();		//定义为二维数组
		article[i][0] = data.content[i].id ;	 // id
		article[i][1] = data.content[i].title  ;  //  标题
		article[i][2] = data.content[i].html   ;  // 内容
		article[i][3] = data.content[i].user.userName  ;  // 作者
		article[i][4] = data.content[i].readNum ;  // 阅读数
		article[i][5] = data.content[i].outline ;  // 片段
		article[i][6] = data.content[i].likeNum ;  // 点赞数
		var createTime= new Date(parseInt(data.content[i].createTime)).toLocaleString();
		article[i][7] = createTime ;  // 发表时间
		article[i][8] = data.content[i].tag ;  // 标签
		var tipText = article[i][8].split(",");
		for (var j=0;j<tipText.length;j++){
			tag[i][j] = tipText[j];
		} 
	}
}

// 把数组内容放入写入页面中
function put(article,tag,articleNum,index){
	//概要视图
	if(index == 5){
		var str = '';
		for(var i=0;i<articleNum;i++){
			// 遍历每篇文章标签
			var tipStr = "";
			for(var j=0;j<tag[i].length;j++){
				tipStr +=  '<span class="tip">'+tag[i][j]+'</span>';
			}
   			str += 	'<div class="post"><h3 class="title"><a href="./showArticle.html" class="showOutline"  id='+i+' >'+article[i][1] +'</a></h3><p class="meta"><span class="date">'+article[i][7]+'&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span><span class="posted">作者 <a>'+article[i][3]+'</a></span></p><div class="entry"><p>'+article[i][5]+'</p><p class="links"><a class="showOutline"  href="./showArticle.html" id='+i+'>阅读全文</a>'+tipStr+'</p></div></div>';		
		}
		$("#post_view").empty().append(str);
	}
	// 列表视图
	else{
		var str = '';
		for(var i=0;i<articleNum;i++){
			str += '<tr><td><a href="./showArticle.html" class="showList" id='+i+' >'+article[i][1]+'</a></td><td>'+article[i][3]+'</td><td>'+article[i][7] +'</td><td>'+'<span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span>'+'</td></tr>';
		}
		$("#tbody").empty().append(str);
	}
}
// 显示页码
function getPage(totalPage,index){
	if(totalPage != 1)
	{	
		var str = " "
		for (var i = 1;i<=totalPage;i++){
			if(i==1){
				str += "<li class='active'><a>第一页</a></li>";
			}
			else{
				if(i==totalPage){
					str += "<li><a>最后一页</a></li>";
				}
				else{
					str += "<li><a>"+i+"</a></li>";
				}	
			}
		}
		if (index == 5) {$(".gaiyao_page").empty().append(str);}
		else{$(".list_page").empty().append(str);}	
	}
}


// 搜索文章
function search(){
	var text = $("input")[0].value;
	if(text!=''){
		url = searchURL;
		getArticle(url,1,5,text);//获取第一页的文章概要信息
		getArticle(url,1,20,text);//获取第一页的文章列表信息
	}
}

