//获取URL请求路径
function getUrlPath(){
	return 'http://192.168.1.22:8080/ESS/api';
}

var nextDayTime = 24*60*60 - 1;

/**
 * 通过id获取dom对象
 * @param objid
 * @returns
 */
function $ID(objid){
	return document.getElementById(objid);
}

/**
 * 显示加载进度条
 */
function showLoading(){
	var val = "<div id='progress_div' class='load-container load8'><div class='loading_pic'><div class='loader'></div><div class='loading_word'>数据处理中，请稍候...</div></div></div>";
	$("body").append(val);
}
/**
 * 隐藏加载进度条
 */
function hideLoading(){
	var obj = document.getElementById("progress_div");
	if(obj!=null){
		$(obj).remove();
	}
}


//以下两个方法获取offsetTop、offsetLeft  兼容IE7等老版本
function getOffsetTop( elements ){
	var top = elements.offsetTop;
	var parent = elements.offsetParent;
	while( parent != null ){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}
function getOffsetLeft( elements ){
	var left = elements.offsetLeft;
	var parent = elements.offsetParent;
	while( parent != null ){
		left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	return left;
}

/**
 * 如果有控件时候layer的外边框被控件遮挡，通过此方法在div上加一个iframe可以解决遮挡问题
 */
function layerAddIframe(layindex){
	var _laydiv=$("#layui-layer"+layindex);
	//未找到layer的主窗体时直接退出
	if(_laydiv.length<1){
		return;
	}
	_laydiv.prepend("<iframe src=\"javascript:false\"  id='layer"+layindex+"_frm_div' frameborder=\"0\" scrolling=\"no\" style=\"position:absolute; visibility:inherit;left: -1px; top:-1px;z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';\"></iframe>");

	var _dfh=_laydiv.outerHeight()+2;//outerHeight()-2;
	var _dfw=_laydiv.outerWidth()+2;
	$("#layer"+layindex+"_frm_div").css({"width":_dfw+"px","height":_dfh+"px"});
}

/**
 * 获取form表单的数据
 * @param {Object} formid
 */
function getFormData(formid){
	var tfobj=document.getElementById(formid);
	var ckflag=JPlaceHolder._check();
	if(tfobj!=null){
		var retd={};
		$("input[type='text'],input[type='hidden'],input[type='password'],textarea,select",$(tfobj)).each(function(index,titem){
			var _itmobj=$(titem);		
			var tkey=_itmobj.attr("name")||_itmobj.attr("id");
			if((_itmobj[0].tagName=="INPUT"||_itmobj[0].tagName=="input")&&ckflag==false&&_itmobj.val()==_itmobj.attr('placeholder')){
				retd[tkey]="";
			}else
			{
				retd[tkey]=_itmobj.val();
			}
			
			
		});
		
		$("input[type='radio']:checked,input[type='checkbox']:checked",$(tfobj)).each(function(index,titem){
			var _itmobj=$(titem);		
			var tkey=_itmobj.attr("name")||_itmobj.attr("id");			
			retd[tkey]=_itmobj.val();
			
		});
				
		return retd;
		
	}else{
		return {};
	}
}

/**
 * 显示工作流处理过程和处理人员
 * @param gzlid 工作流ID
 * @param showdiv 工作流对应的divID
 */
function showGzlc(gzlid,showdiv){
	//查询流程图
    $.post(utils.getContextPath()+"/lcdyController/getGzlcJd.mvc?_rm="+Math.random(),{gzlid:gzlid},
    function(retval){
    	var divgzl=$("#"+showdiv);
    	if(retval.flag){
    		$.each(retval.data,function(tin,titem){
    			var hexe="";
    			if(titem.hasexe=="Y"){
    				hexe="<span class='splcD'></span>";
    			}
    			var _tutype=(titem.etype=="one"?" 或 ":" 和 ");
    			var _uhtml="";
    			if(titem.users.length>0){        				
    				_uhtml+="【";
        			for(var i=0;i<titem.users.length;i++){
        				if(i>0){
        					_uhtml+=_tutype;
        				}
        				_uhtml+="<span uid='"+titem.users[i].yhid+"' data-hasqtip='15'>"+titem.users[i].yhxm+"</span>"+hexe;
        			}
        			
        			_uhtml+="】";
    			}
    			
    			var _nexthtml="";
    			if(titem.islast!="Y"){
    				_nexthtml="<span class='splcE'></span>";
    			}            			
    			divgzl.append("<div class='splcA' nodeid='"+titem.jdid+"'><span class='splcB'>"+titem.gnmc+"</span><span class='splcC'>"+_uhtml+"</span>"+_nexthtml+"</div>");
    		});
    	}else{
            alert("未定义流程！");
        }
    },"json");
}

//重写confirm函数调用方法:confirm(msg,function(tindex){});
var _winconfirm=window.confirm;
window.confirm = function(msg,callback){
	if(typeof window.layer === "object" || typeof window.layer === "function") {
		//删除提示
		layer.alert(msg, {
			  time: 0, //不自动关闭,
			  btn: ['确定', '取消'],
			  yes: callback
		});
	}else{
		var ret=_winconfirm(msg);
		if(ret==true){
			callback.call();
		}
	}
};
//重写alert函数调用方法：alert(msg,{icon:5,showframe:true})
var _winalert=window.alert;
window.alert = function(msg,options){
	if(typeof window.layer === "object" || typeof window.layer === "function") {
		var ticon=5;
		var tiframe=false;
		if(options!=null&&typeof options !="undefined"){
			if(typeof options.icon != "undefined"){
				ticon=options.icon;
			}
			
			if(typeof options.showframe != "undefined"){
				tiframe=options.showframe;
			}
		}
		
		var _lin=window.layer.alert(msg,{icon:ticon});
		
		//如果显示iframe
		if(tiframe){
			layerAddIframe(_lin);
		}		
	}else{
		_winalert(msg);
	}
}
//window中新增加msg方法提示msg(msg,{showframe:true})
window.msg = function(msg,options){
	if(typeof window.layer === "object" || typeof window.layer === "function") {
	
		var tiframe=false;
		if(options!=null&&typeof options !="undefined"){
						
			if(typeof options.showframe != "undefined"){
				tiframe=options.showframe;
			}
		}
		
		var _lin=layer.msg(msg);
		//如果显示iframe
		if(tiframe){
			layerAddIframe(_lin);
		}		
	}else{
		_winalert(msg);
	}
}
//加载控件
function initMakeSealV6(id){
	var objDom='<object id="makeSealV6" classid="clsid:3F1A0364-AD32-4E2F-B550-14B878E2ECB1" width=100% height=400px codebase=\'../ocx/MakeSealV6.ocx#version=1,1,2,0\'></object>'
	var _tdiv=$('#'+id);
	_tdiv.append(objDom);
}
jQuery.support.cors = true;
