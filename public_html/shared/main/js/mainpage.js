jQuery.support.cors = true;
function initMenus(){
	
	//初始化菜单树
	$("#treeId").treeview({
		animated: 250, //slow、normal、fast 或者指定速度值
		collapsed: true, //初始化时的折叠状态。true，初始化为收缩节点状态；false，为全部节点展开
		unique: true, //展开同级节点的唯一性。true，当展开一个节点时，同级的其他节点会自动关闭；false，当展开一个节点时，同级的其他节点保持原形
		persist: "location", //记忆折叠的方式。location：页面刷新不保留折叠状态；cookie：页面刷新保留折叠状态
		toggle: function() {
			//获取浏览器信息
			var binfo=getBrowser();
			if(binfo.name=="IE"&&(binfo.version<=9)){
				document.querySelector("#div_homeNav").style.width = "220px";
				document.querySelector("#div_main").style.left = "220px";
				$(".webhmoe .homeNav .tree>ul>li>span").css("height","45px");
				document.querySelector("#treeId").style.background = '';			
			} else {
				document.querySelector("#div_homeNav").style.animation = "DivFlash01 0.5s ease-out 0s alternate forwards";
			}
			document.querySelector("#div_userinfo").style.display = "block";
			document.querySelector("#div_customScroll").style.top = "100px";
			$("#menutree>ul>li>span>b").css("display","inline-block");
			//$("#menutree>ul>li>span>i").css("display","none");
			$("#menutree>cite").css("display","none");
			$("#menutree>ul>li").css({"color":"#a7b1c2","line-height":"45px","border-left":"3px solid rgb(47,64,80)"});
			$("#menutree>ul>li>span").css("font-size","13px");
			
			if( this.getElementsByTagName("ul")[0].style.display == "block" ) {
				this.className = 'cur';
			} else {
				this.className = 'closed';
			}
			if( browserRedirect() ) {
				document.querySelector("#div_homeNav").style.boxShadow = "2px 0px 40px rgb(50,50,70)";
			} else {
				document.querySelector("#div_main").style.animation = "DivFlash03 0.5s ease-out 0s alternate forwards";
			}
		}
	});
	
	document.querySelector("#navBut").onmouseup = function() {
	
		var binfo=getBrowser();
		
		if ( document.querySelector("#menutree>ul>li>span>b").style.display != "none" ) {

			if(binfo.name=="IE"&&(binfo.version<=9)){
					document.querySelector("#div_homeNav").style.width = "70px";
					document.querySelector("#div_main").style.left = "70px";
					$(".webhmoe .homeNav .tree>ul>li>span").css("height","61px");
					//document.querySelector("#treeId").style.background = 'url("Images/icon03_1.png") no-repeat center top\0';
				
			} else {
				document.querySelector("#div_homeNav").style.animation = "DivFlash1 0.5s ease-out 0s alternate forwards";
				document.querySelector("#div_main").style.animation = "DivFlash3 0.5s ease-out 0s alternate forwards";
			}
				
			document.querySelector("#div_userinfo").style.display = "none";
			document.querySelector("#div_customScroll").style.top = "0px";
			$("#menutree>ul>li>span>b").css("display","none");
			$("#menutree>ul>li>span>i").show();
			$("#menutree>cite").css("display","block");
			$("#menutree>ul>li").css({"color":"rgb(47,64,80)","line-height":"60px","border-left":"none"});
			$("#menutree>ul>li>span").css("font-size","21px");
			$("#menutree>ul>li>span").css("color","#afb3bf");
			$("#menutree>ul>li ul").css("display","none");
			document.querySelector("#div_homeNav").style.boxShadow = "none";
		} else {
			if(binfo.name=="IE"&&(binfo.version<=9)){
					document.querySelector("#div_homeNav").style.width = "220px";
					document.querySelector("#div_main").style.left = "220px";
					$(".webhmoe .homeNav .tree>ul>li>span").css("height","45px");
					document.querySelector("#treeId").style.background = '';
				
			} else {
				document.querySelector("#div_homeNav").style.animation = "DivFlash01 0.5s ease-out 0s alternate forwards";
			}
			document.querySelector("#div_userinfo").style.display = "block";
			document.querySelector("#div_customScroll").style.top = "100px";
			$("#menutree>ul>li>span>b").css("display","inline-block");
			//$("#menutree>ul>li>span>i").hide();
			$("#menutree>cite").css("display","none");
			$("#menutree>ul>li").css({"color":"#a7b1c2","line-height":"45px","border-left":"3px solid rgb(47,64,80)"});
			$("#menutree>ul>li>span").css("font-size","13px");
			if( browserRedirect() ) {
				document.querySelector("#div_homeNav").style.boxShadow = "2px 0px 40px rgb(50,50,70)";
			} else {
				document.querySelector("#div_main").style.animation = "DivFlash03 0.5s ease-out 0s alternate forwards";
			}
		}
	}
	
	document.querySelector("#div_userinfo>u").onmouseup = function() {
		var binfo=getBrowser();
		if(binfo.name=="IE"&&(binfo.version<=9)){
				document.querySelector("#div_homeNav").style.width = "70px";
				document.querySelector("#div_main").style.left = "70px";
				$(".webhmoe .homeNav .tree>ul>li>span").css("height","61px");
				//document.querySelector("#treeId").style.background = 'url("Images/icon03_1.png") no-repeat center top\0';
			
		} else {
			document.querySelector("#div_homeNav").style.animation = "DivFlash1 0.5s ease-out 0s alternate forwards";
			document.querySelector("#div_main").style.animation = "DivFlash3 0.5s ease-out 0s alternate forwards";
		}
		document.querySelector("#div_userinfo").style.display = "none";
		document.querySelector("#div_customScroll").style.top = "0px";
		$("#menutree>ul>li>span>b").css("display","none");
		//$("#menutree>ul>li>span>i").show();
		$("#menutree>cite").css("display","block");
		$("#menutree>ul>li").css({"color":"rgb(47,64,80)","line-height":"60px","border-left":"none"});
		$("#menutree>ul>li>span").css("font-size","21px");
		$("#menutree>ul>li>span").css("color","#afb3bf");
		$("#menutree>ul>li ul").css("display","none");
		document.querySelector("#div_homeNav").style.boxShadow = "none";
	}
	
	document.querySelector("#menutree>cite").onmouseup = function() {
		var binfo=getBrowser();
		if(binfo.name=="IE"&&(binfo.version<=9)){
				document.querySelector("#div_homeNav").style.width = "220px";
				document.querySelector("#div_main").style.left = "220px";
				$(".webhmoe .homeNav .tree>ul>li>span").css("height","45px");
				document.querySelector("#treeId").style.background = '';
			
		} else {
			document.querySelector("#div_homeNav").style.animation = "DivFlash01 0.5s ease-out 0s alternate forwards";
		}
		document.querySelector("#div_userinfo").style.display = "block";
		document.querySelector("#div_customScroll").style.top = "100px";
		$("#menutree>ul>li>span>b").css("display","inline-block");
		//$("#menutree>ul>li>span>i").hide();
		$("#menutree>cite").css("display","none");
		$("#menutree>ul>li").css({"color":"#a7b1c2","line-height":"45px","border-left":"3px solid rgb(47,64,80)"});
		$("#menutree>ul>li>span").css("font-size","13px");
		if( browserRedirect() ) {
			document.querySelector("#div_homeNav").style.boxShadow = "2px 0px 40px rgb(50,50,70)";
		} else {
			document.querySelector("#div_main").style.animation = "DivFlash03 0.5s ease-out 0s alternate forwards";
		}
	}
	
	
	$("#div_tabs div").on('click','a',function(){
		var n = $("#div_tabs>div>i").index($(this.parentNode));
		$(this).parent().prev().mouseup();
		$(this).parent().remove();
		$("#div_tabs>.DatePage").eq(n).remove();
		doNothing(); //阻止冒泡
	})
	
	$("#div_tabs div").on('click','s',function(){
		var n = $("#div_tabs>div>i").index($(this.parentNode));
		$("#div_content>.DatePage").eq(n).attr('src',$(".date>.DatePage").eq(n).attr('src')+'?noCache='+new Date().getTime());
		doNothing(); //阻止冒泡
	})
	
	$("#userLayer").focus(function(){
		$("#infoUL").css("display","block");
		$("#infoUL").attr("class","showInfoUL");
	})
	
	$("#userLayer").blur(function(){
		$("#infoUL").attr("class","hiddenInfoUL");
		setTimeout(function(){$("#infoUL").css("display","none")},500);
	})
}

//替换默认菜单
$(window).load(function(){
	$("#div_customScroll").mCustomScrollbar();
});

function gotoTab(tobj,random) {
	var tabs = document.querySelectorAll("#div_tabs>div>i");
	for( i=0; i<tabs.length; i++ ) {
		tabs[i].className = "def";
	}
	tobj.className = "cur";
	$("#div_content .DatePage").css("display","none");
	$("#ifr_"+$(tobj).attr("id")).css("display","block");
}
function gotoNav(tabid,turl,mobj) {
	var tabs = document.querySelectorAll("#div_tabs>div>i");
	for( i=0; i<tabs.length; i++ ) {
		tabs[i].className = "def";
	}
	$("#div_content .DatePage").css("display","none");

	if( document.getElementById(tabid)) {
		$("#"+tabid).mouseup();
	} else {
		//带有页面刷新按钮

		if(_hasFresh){
			$("#showNext").before("<i onmouseup='gotoTab(this,new Date().getTime())' id='"+tabid+"' class='cur'>"+mobj.innerHTML+"<s></s><a></a></i>");
		}else{//无页面刷新按钮
			$("#showNext").before("<i onmouseup='gotoTab(this,new Date().getTime())' id='"+tabid+"' class='cur'>"+mobj.innerHTML+"<a></a></i>");
		}
		$("#div_content").append('<iframe class="DatePage" id="ifr_'+tabid+'" src="'+turl+'" frameborder="0" style="margin: 0px;padding: 0px" scrolling="no" width="100%" height="100%"></iframe>');
	}
}
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		//phone
		return true;
	} else {
		//pc
		return false;
	}
}

function getBrowser(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var browser=navigator.appName;
	var version=navigator.appVersion;	
	var _ret={};
	//IE浏览器
	if(browser=="Microsoft Internet Explorer"){
		_ret["name"]="IE";
		var bversion=navigator.appVersion.split(";");
		var trim_Version=bversion[1].replace(/[ ]/g,"");
		if(trim_Version=="MSIE6.0"){
			_ret["version"]=6;
		}else if(trim_Version=="MSIE7.0"){
			_ret["version"]=7;
		}else if(trim_Version=="MSIE8.0"){
			_ret["version"]=8;
		}else if(trim_Version=="MSIE9.0"){
			_ret["version"]=9;
		}else if(trim_Version=="MSIE10.0"){
			_ret["version"]=10;
		}else if(trim_Version=="MSIE11.0"){
			_ret["version"]=11;
		}else{
			_ret["version"]=5;
		}
	}else{
		
		if(userAgent.indexOf("Firefox")>-1){
			_ret["name"]="Firefox";
		}else if(userAgent.indexOf("Chrome")>-1){
			_ret["name"]="Chrome";
		}
		_ret["version"]=version.substring(0,version.indexOf("("));		
	}
	
	return _ret;
}

 function getContextPath(){
    	var location = (window.location+'').split('/');
    	var basePath = '/'+location[3];
    	return basePath;
    }
function doNothing (evt) { //阻止冒泡
	var e=(evt)?evt:window.event;
	if (window.event) {
		e.cancelBubble=true;// ie下阻止冒泡
	} else {
		//e.preventDefault();
		e.stopPropagation();// 其它浏览器下阻止冒泡
	}
}
//设置菜单路径
var _hasFresh=true;
/**
 * 生成菜单数据
 * @param turl 数据下载地址
 * @param hasFresh 是否带刷新：true 有  false 无 
 */
function createMenus(menuobj,turl,hasFresh){
	if(hasFresh!=null){
		_hasFresh=hasFresh;
	}	
	
	$.get(turl+"/userInfo?noCache="+new Date().getTime(), function (data) {
		//var menus = [{"name":"组织机构管理","icon":"f0e8","route":"module.organization","status":1,"createdAt":1529487628,"updatedAt":1529487628,"text1":null,"text2":null,"databaseSignData":"","id":"80","parentsId":"0","orderNo":80},{"name":"部门管理","icon":"","route":"../org/section.html","status":1,"createdAt":1529487628,"updatedAt":1529487628,"text1":null,"text2":null,"databaseSignData":"","id":"81","parentsId":"80","orderNo":81},{"name":"用户管理","icon":"","route":"../org/user_list.html","status":1,"createdAt":1529487628,"updatedAt":1529487628,"text1":null,"text2":null,"databaseSignData":"","id":"82","parentsId":"80","orderNo":82}];
		menus=convertMenuData(data.app);
		menuCallBack(menuobj,menus);
		//初始化菜单
		initMenus();	
    }, "json");
	
}

/*将新印章平台菜单数据进行转化成可识别的数据*/
function convertMenuData(menus){
	var new_menus=[];
	var menu_map_1_level=new Map();
	var len=menus.length;
	for(var i=0;i<len;i++){
		var menu={};
		var old_munu=menus[i];
		menu.id=old_munu.id;
		menu.text=old_munu.name;
		menu.icon=old_munu.icon;
		menu.url=convertRoute(old_munu.route);
		menu.children=[];
		if(old_munu.parentsId==0){
			new_menus.push(menu);
			menu_map_1_level.set(menu.id,menu);
		}else{
			var p_menu=menu_map_1_level.get(old_munu.parentsId);
			p_menu.children.push(menu);
		}		
	}
	return new_menus;	
}

//路由映射
function convertRoute(route){
	route = route.replace(/\./g,"/");
	route = '../../'+route+'.html';
	//route.replace("dashboard/module","");
	return route;
}


var number=0;
/**

**/
function menuCallBack(tparent,tdata){
	
	if(tdata.code!=null){
		layer.msg(tdata.msg);
		return;
	}
	$.each(tdata, function(i, item){
		var _tli=$('<li></li>');
    	_tli.appendTo(tparent);
    	//有子节点的菜单项
    	if(item.children != undefined && item.children.length >0){
    		number=number+1;
    		var _tclass="";
    		/*if(tparent.attr("id")=="treeId"){
    			_tclass=' class="treeSpan'+number+'"';
    			
    		}*/
    		_tclass=' class="treeSpan'+number+'"';
/*    		if(item.icon==null||item.icon=='null'){
        		$('<style>.webhmoe .homeNav .tree>ul>li>.treeSpan'+number+' ::before {font-family: "JavaKitFont";  content: "\\f07c"; position: relative; right: 8px;}</style>').appendTo('head')
    		}else{
        		//$('<style>.webhmoe .homeNav .tree>ul>li>.treeSpan'+number+' ::before {font-family: "JavaKitFont";  content: "\\'+item.icon+'"; position: relative; right: 8px;}</style>').appendTo('head')
    		}*/
    		$('<span '+_tclass+'><i class="fa '+item.icon+'" style="margin:0 10px 0 -40px"></i><b>'+item.text+'</b></span>').appendTo(_tli);
    		//$('<span '+_tclass+'><b>'+item.text+'</b><i></i></span>').appendTo(_tli);
    		//$('head').append('<style>.treeSpan'+(i+1)+' ::before {font-family: "JavaKitFont";  content: "\f2b9"; position: relative; right: 8px;}</style>');
    		var _tul=$("<ul></ul>");
    		_tul.appendTo(_tli);
    		menuCallBack(_tul,item.children);
    	}else{//无子菜单
    		if(item.icon!=""){
        		$("<span onmouseup=\"gotoNav('"+item.id+"','"+item.url+"',this);\">"+'<i class="fa '+item.icon+'" style="margin:0 10px 0 -40px"></i><b>'+item.text+"</b></span>").appendTo(_tli);
    		}else{
        		$("<span onmouseup=\"gotoNav('"+item.id+"','"+item.url+"',this);\" style=\"padding-left:8px\"><b>"+item.text+"</b></span>").appendTo(_tli);
    		}
    	}

	});
}

//自定义Map对象
function Map() {

    this.keys = new Array();
    this.data = new Object();

    this.set = function(key, value) {
        if (this.data[key] == null) {
            if ($.inArray(key,this.keys) == -1) {
                this.keys.push(key);
            }
        }
        this.data[key] = value;
    }

    this.get = function(key) {
        return this.data[key];
    }
}
