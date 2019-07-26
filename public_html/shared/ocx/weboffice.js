var WOHelper = {
    extend : function(des, src, override){

    	if(src==null||typeof src=="undefined"){
    		return des;
    	}

        if(src instanceof Array){
            for(var i = 0, len = src.length; i < len; i++)
                extend(des, src[i], override);
        }
        for( var i in src){        	
            if(override || !(i in des)){
                des[i] = src[i];
            }
        }
        return des;
    },
    contextPath:function(){
    	var _arrlocal = (window.location+'').split('/');
    	var _bpath = '/'+_arrlocal[3];
    	return _bpath;
    }
};

/**
 * 定义WebOffice对象
 * @param {string} container 加载WebOffice的容器id
 * @param {json} option {id:'默认值WebOffice1',width:默认100%,height:默认100%,version:默认7.0.0.0} 可选的参数
 * @returns {WebOffice}
 */
function WebOffice(container,option) {
	this.obj=null; //activex对象
	this.container = container;//控件的容器
	var cfg = {
        id : "WebOffice1",
        width : "100%",
        height : "100%",
        debug : false,          //调试模式
        version:"7.0.0.0"    	//控件的版本号
    
    };    
    //设置属性
    this.cfg = WOHelper.extend(cfg, option, true);
}

/**
 * 兼容加载了modal的alert美化处理
 * @param {type} msg
 * @returns {undefined}
 */
WebOffice.prototype.Alert = function(msg) {
      window.alert(msg+"",{showframe:true});
    
};
WebOffice.prototype.Msg = function(msg) {
    window.msg(msg+"",{showframe:true});
  
};

/**
 * 初始化方法
 * @param {json} option {id:'默认值WebOffice1',width:默认100%,height:默认100%,version:默认7.0.0.0} 可选的参数
 * @returns {undefined}
 */
WebOffice.prototype.Init = function(option) {
	//合并属性
	if(option !=null&&(typeof option!="undefined" )){
		WOHelper.extend(this.cfg,option,true);
	}

	var _ts=null;
	var _ug = window.navigator.userAgent; //取得浏览器的userAgent字符串
	var _pf=window.navigator.platform;//浏览器的位数

	if (!!window.ActiveXObject || "ActiveXObject" in window){//IE浏览器

    	if(_pf.indexOf("32")>0){//32位IE
			_ts="<OBJECT id='"+this.cfg.id+"' style='LEFT: 0px; WIDTH:"+this.cfg.width+"; TOP: 0px; HEIGHT: "+this.cfg.height+"'";
			_ts += "classid='clsid:E77E049B-23FC-4DB8-B756-60529A35FAD5' codebase='"+WOHelper.contextPath()+"/loadocx/32/weboffice.ocx#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_ExtentX' VALUE='17410'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='10874'>";
			_ts += "</OBJECT>";	
          
	    }else{//64位IE
	    	_ts="<OBJECT id='"+this.cfg.id+"' style='LEFT: 0px; WIDTH:"+this.cfg.width+"; TOP: 0px; HEIGHT: "+this.cfg.height+"'";
			_ts += "classid='clsid:E77E049B-23FC-4DB8-B756-60529A35FAD5' codebase='"+WOHelper.contextPath()+"/loadocx/64/weboffice.ocx#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_ExtentX' VALUE='17410'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='10874'>";
			_ts += "</OBJECT>";	
	    }
	}
//	else if(_ug.indexOf("Firefox")>-1) {//firefox浏览器
//		if(_pf.indexOf("32")>0){//32位  
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{3F1A0364-AD32-4E2F-B550-14B878E2ECB1}' ";
//			_ts +=" progid='' height='"+this.cfg.height+"' width='"+this.cfg.width+"' event_NotifyCtrlReady='' codebase='"+WOHelper.contextPath()+"/loadocx/32/weboffice.ocx#Version="+this.cfg.version+"' >";
//			_ts +="<param name='_ExtentX' value='2646'><param name='_ExtentY' value='1323'>";
//			_ts +="</OBJECT>";
//		}else{
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{3F1A0364-AD32-4E2F-B550-14B878E2ECB1}' ";
//			_ts +=" progid='' height='"+this.cfg.height+"' width='"+this.cfg.width+"' event_NotifyCtrlReady='' codebase='"+WOHelper.contextPath()+"/loadocx/64/weboffice.ocx#Version="+this.cfg.version+"' >";
//			_ts +="<param name='_ExtentX' value='2646'><param name='_ExtentY' value='1323'>";
//			_ts +="</OBJECT>";
//		}
//			  
//	}
	else{
		this.Msg("控件不支持您的浏览器！");
	}

   
    var DOMContainer = document.getElementById(this.container);
    if(DOMContainer) {
        $(DOMContainer).html(_ts);
    }
    this.obj = document.getElementById(this.cfg.id);
};

