var WSHelper = {
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
 * 定义WebSign对象
 * @param {string} container 加载WebSign的容器id
 * @param {json} option {id:'默认值DWebSignSeal',version:默认1,1,1,2} 可选的参数
 * @returns {WebSign}
 */
function WebSign(container,option) {
	this.obj=null; //activex对象
	this.container = container;//控件的容器
	var cfg = {
        id : "DWebSignSeal",
        width : "0px",
        height : "0px",
        debug : false,          //调试模式
        version:"1,1,1,2"    	//控件的版本号
    
    };    
    //设置属性
    this.cfg = WSHelper.extend(cfg, option, true);
}

/**
 * 兼容加载了modal的alert美化处理
 * @param {type} msg
 * @returns {undefined}
 */
WebSign.prototype.Alert = function(msg) {
      window.alert(msg+"",{showframe:true});
    
};

WebSign.prototype.Msg = function(msg) {
    window.msg(msg+"",{showframe:true});
  
};

/**
 * 初始化方法
 * @param {json} option {id:'默认值DWebSignSeal',version:默认1,1,1,2}可选的参数
 * @returns {undefined}
 */
WebSign.prototype.Init = function(option) {
	//合并属性
	if(option !=null&&(typeof option!="undefined" )){
		WSHelper.extend(this.cfg,option,true);
	}

	var _ts=null;
	var _ug = window.navigator.userAgent; //取得浏览器的userAgent字符串
	var _pf=window.navigator.platform;//浏览器的位数

	if (!!window.ActiveXObject || "ActiveXObject" in window){//IE浏览器

    	if(_pf.indexOf("32")>0){//32位IE
			_ts="<OBJECT id='"+this.cfg.id+"' style='position:absolute;width:0px;height:0px;left:0px;top:0px;' ";
			_ts += "classid='clsid:77709A87-71F9-41AE-904F-886976F99E3E' codebase='"+WSHelper.contextPath()+"/loadocx/32/WebSign.dll#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_ExtentX' VALUE='2646'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='1323'>";
			_ts += "</OBJECT>";	
          
	    }else{//64位IE
	    	_ts="<OBJECT id='"+this.cfg.id+"' style='position:absolute;width:0px;height:0px;left:0px;top:0px;'";
			_ts += "classid='clsid:77709A87-71F9-41AE-904F-886976F99E3E' codebase='"+WSHelper.contextPath()+"/loadocx/64/WebSign.dll#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_ExtentX' VALUE='2646'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='1323'>";
			_ts += "</OBJECT>";	
	    }
	}
//	else if(_ug.indexOf("Firefox")>-1) {//firefox浏览器
//		if(_pf.indexOf("32")>0){//32位  
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{77709A87-71F9-41AE-904F-886976F99E3E}' ";
//			_ts +=" progid='' style='position:absolute;width:0px;height:0px;left:0px;top:0px;' codebase='"+WSHelper.contextPath()+"/loadocx/32/WebSign.dll#Version="+this.cfg.version+"' >";
//			_ts +="<param name='_ExtentX' value='2646'><param name='_ExtentY' value='1323'>";
//			_ts +="</OBJECT>";
//		}else{
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{77709A87-71F9-41AE-904F-886976F99E3E}' ";
//			_ts +=" progid='' style='position:absolute;width:0px;height:0px;left:0px;top:0px;' codebase='"+WSHelper.contextPath()+"/loadocx/64/WebSign.dll#Version="+this.cfg.version+"' >";
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