(function($){	
	//jqgrid扩展函数
	$.jgrid.extend({
		onSelectRow: function(rowid){ //当选择行时触发此事件。rowid：当前行id；status：选择状态，当multiselect 为true时此参数才可用、
			var jgobj=$(this);
			jgobj.find(".selectcolor").removeClass('selectcolor');
			$(this.selector+" #"+rowid).find("td").addClass("selectcolor"); 
		},
		//获取选择行的对应的数据		
		selArrData:function(){
			var jgobj=$(this);
			var ids=jgobj.jqGrid("getGridParam","selarrrow");
			var _seldata=[];
			if(ids!=null&&ids.length>0){
				for(var i=0;i<ids.length;i++){
					var rowData = jgobj.jqGrid("getRowData",ids[i]);
					_seldata.push(rowData);
				}
			}			
			return _seldata;	
		},
		selData:function(){
			var jgobj=$(this);
			var sid=jgobj.jqGrid("getGridParam","selrow");
			
			var _seldata = null;
			if(sid!=null&&sid!=""){
				_seldata=jgobj.jqGrid("getRowData",sid);
			}			
			return _seldata;	
		},
		setHeight:function(nheight){
		
			var jgobj=$(this);		
			var _tid=jgobj.attr("id");
			var _ctobj=$("#gbox_"+_tid);
			if(_ctobj.length<1){
				return false;
			}
			
			
			var _jp=_ctobj.parent().parent();
			var _ht=_jp.height();//grid的高度
			_jp.children().each(function(index,item){
				//如果是非grid的div就把高度减去
				var _tjq=$(item);
				if(!_tjq.hasClass("gridcontent")){
					_ht-=_tjq.outerHeight();
				}
			});

			//计算grid内部表格的高度
			//分页高度
			_ht-=_ctobj.find(".ui-jqgrid-pager").outerHeight();
			//表头高度
			_ht-=_ctobj.find(".ui-jqgrid-hdiv").outerHeight();
			//标题的高度
			var tcp=jgobj.jqGrid("getGridParam","caption");
			if(tcp!=null&&tcp!=""){
				_ht-=_ctobj.find(".ui-jqgrid-titlebar").outerHeight();
			}
			var ttb=jgobj.jqGrid("getGridParam","toolbar");
			if(ttb!=null&&ttb[0]==true){
				_ctobj.find(".ui-userdata").each(function(index,item){
					_ht-=$(item).outerHeight();
				});
			}
			//设置高度
			_ctobj.find(".ui-jqgrid-bdiv").css("cssText","height:"+(_ht-3)+"px!important;");
			
		},
		//自动调整高度和宽度
		autoSize:function(){
			var jgobj=$(this);		
			var _tid=jgobj.attr("id");
			var _ctobj=$("#gbox_"+_tid);
			if(_ctobj.length<1){
				return false;
			}
			
			
			var _jp=_ctobj.parent().parent();
//			console.log(_jp.height());
			var _ht=_jp.height();//grid的高度
//			console.log("parent:"+_ht+"::"+document.offsetHeight);
			_jp.children().each(function(index,item){
				//如果是非grid的div就把高度减去
				var _tjq=$(item);
				if(!_tjq.hasClass("gridcontent")&&!_tjq.hasClass("down")&&!_tjq.hasClass("up")){
					_ht-=_tjq.outerHeight();
				}
			});

			//计算grid内部表格的高度
			//分页高度
			_ht-=_ctobj.find(".ui-jqgrid-pager").outerHeight();
			//表头高度
			_ht-=_ctobj.find(".ui-jqgrid-hdiv").outerHeight();
			//标题的高度
			var tcp=jgobj.jqGrid("getGridParam","caption");
			if(tcp!=null&&tcp!=""){
				_ht-=_ctobj.find(".ui-jqgrid-titlebar").outerHeight();
			}
			var ttb=jgobj.jqGrid("getGridParam","toolbar");
			if(ttb!=null&&ttb[0]==true){
				_ctobj.find(".ui-userdata").each(function(index,item){
					_ht-=$(item).outerHeight();
				});
			}
			//设置高度
			jgobj.jqGrid("setGridHeight",(_ht-3));
			//设置宽度setGridHeight
			jgobj.jqGrid("setGridWidth",(_jp.innerWidth()-2));
			
		}
	});
	
	//jqgrid初始化配置信息
	$(document).ready(function(){

		$(document).ajaxSend(function(event, jqxhr, settings) {
			var url1=settings.url;
			var page=jsUrlHelper.getUrlParam(url1,'page');
			if(page){
				page=page-1;
				url1=jsUrlHelper.putUrlParam(url1,'page',page);
			}
			settings.url=url1;
		});
		$.jgrid.defaults={
			altRows:true, 
			mtype:"GET",//url地址数据获取方式：POST或GET 推荐用POST
			datatype : "json",//数据类型
			height : "auto",  //设置高度
			loadtext : "",
			hidegrid:false,//启用或者禁用控制表格显示、隐藏的按钮，只有当caption 属性不为空时起效
			rowNum : 20,
			rowList : [20,30,40,50,100],//可供用户选择一页显示多少条
			jsonReader : {		
				root: "content",
				page: "number",
				total: "totalPages",
				records: "totalElements",
				repeatitems : false, //设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
				cell: "cell",
				id: "id",
				userdata: "userdata",
				subgrid: {root:"rows", repeatitems: true, cell:"cell"}
			},
			prmNames:{page:"page",rows:"size"},
			multiselect : false,
			multiselectWidth : 35,
			shrinkToFit : false,
			autoScroll : false,
			/*beforeRequest : function(){//jqgrid发送数据请求前
				//显示数据加载页面
				var val = "<div id='progress_div' class='load-container load8'><div class='loading_pic'><div class='loader'></div><div class='loading_word'>数据加载中，请稍候...</div></div></div>";
				$("body").append(val);
			},*/
			loadComplete:function(data){
				//设置总行数
				if(data.records!=null){
					$(this).jqGrid("setGridParam",{rowTotal:data.records});
//					this.p.rowTotal=data.records;
				}
				//var tobj = $("#progress_div");
				//if(tobj!=null&&tobj.length>0){
				//	tobj.remove();
				//}
			},		
			loadError : function(xhr, status, error) {		
				layer.alert('加载数据错误！', {icon: 5});
				//var tobj = $("#progress_div");
				//if(tobj!=null&&tobj.length>0){
				//	tobj.remove();
				//}
			},	
			onSelectRow: function(rowid){ //当选择行时触发此事件。rowid：当前行id；status：选择状态，当multiselect 为true时此参数才可用、
				
				$(this).find(".selectcolor").removeClass('selectcolor');
				$("#"+rowid +" td").addClass('selectcolor');
			},
			viewrecords : true,
			recordtext: "共 {2} 条",	// 共字前是全角空格
			emptyrecords: "无数据",
			pgtext : " {0} 共 {1} 页",
			toolbar:[false,"both"]  //是否显示工具条  “top”,”bottom”, “both”
			
	 	};
	});
	
	
	$.ajaxSetup({
	    xhrFields: {
	        withCredentials: true
	    }
	});
	
	
	var jsUrlHelper = {
		    getUrlParam : function(url, ref) {
		        var str = "";

		        // 如果不包括此参数
		        if (url.indexOf(ref) == -1)
		            return "";

		        str = url.substr(url.indexOf('?') + 1);

		        arr = str.split('&');
		        for (i in arr) {
		            var paired = arr[i].split('=');

		            if (paired[0] == ref) {
		                return paired[1];
		            }
		        }

		        return "";
		    },
		    putUrlParam : function(url, ref, value) {

		        // 如果没有参数
		        if (url.indexOf('?') == -1)
		            return url + "?" + ref + "=" + value;

		        // 如果不包括此参数
		        if (url.indexOf(ref) == -1)
		            return url + "&" + ref + "=" + value;

		        var arr_url = url.split('?');

		        var base = arr_url[0];

		        var arr_param = arr_url[1].split('&');

		        for (i = 0; i < arr_param.length; i++) {

		            var paired = arr_param[i].split('=');

		            if (paired[0] == ref) {
		                paired[1] = value;
		                arr_param[i] = paired.join('=');
		                break;
		            }
		        }

		        return base + "?" + arr_param.join('&');
		    },
		    delUrlParam : function(url, ref) {

		        // 如果不包括此参数
		        if (url.indexOf(ref) == -1)
		            return url;

		        var arr_url = url.split('?');

		        var base = arr_url[0];

		        var arr_param = arr_url[1].split('&');

		        var index = -1;

		        for (i = 0; i < arr_param.length; i++) {

		            var paired = arr_param[i].split('=');

		            if (paired[0] == ref) {

		                index = i;
		                break;
		            }
		        }

		        if (index == -1) {
		            return url;
		        } else {
		            arr_param.splice(index, 1);
		            return base + "?" + arr_param.join('&');
		        }
		    }
		};
	
})(jQuery);