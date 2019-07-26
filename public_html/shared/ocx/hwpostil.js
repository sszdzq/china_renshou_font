
var HWPHelper = {
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
 * 定义HWPostil对象
 * @param {string} container 加载AIP的容器id
 * @param {json} option {id:'默认值HWPostil1',width:默认100%,height:默认100%,designMode:是否设计模式} 可选的参数，参考def的定义
 * @returns {AIP}
 */
function HWPostil(container,option) {
	this.obj=null; //activex对象
	this.container = container;//控件的容器
	var cfg = {
        id : "HWPostil1",
        width : "100%",
        height : "100%",       
        showMenu : 0,           //菜单栏参数 0为隐藏; 1为显示
        showScrollBar: 1,       //滚动条及底部工具条参数: 0全显示; 1只显示滚动条; 2全隐藏
        showToolBar : 0,        //工具栏参数: 0为隐藏; 1为显示; 2大图标模式
        designMode : 0,     //设计模式 非设计模式 0  设计模式 1
        penColor : 0,           //默认画笔颜色
        penWidth : 3,           //默认画笔宽度
        pageMode : 1,           //页面显示模式，1:自定义模式,放大缩小比例根据sZoomPercent而定。2:适用宽度模式,sZoomPercent无效。4:适用窗口模式,sZoomPercent无效。8:多列显示模式,sZoomPercent指定排列的列数。16:平滑显示模式,sZoomPercent为1表示平滑显示;为0表示非平滑显示(一般用户编辑页和手写页)。32:播放模式,sZoomPercent为非0表示进入播放模式;为0表示退出播放模式。64:特殊模式
        pageModeParam: 100,     //页面模式参数,
        signContentPosition : 0, //会签意见位置
        loginUser:'',           //当前登录用户
        loginPwd:'',           //当前登录用户密码
        loginUrl:'',           //登录的服务端地址
        debug : false,          //调试模式
        version:"3,1,0,6"    	//控件的版本号
    
    };

    this.noteValueType = {
        allData : 1, //所有数据
        text : 2,   //文本
        index : 3,  //顺序索引
        lineNumber: 4,  //编辑区域行号
        lineHeight: 5,  //编辑区域行高
        left: 6,        //坐标left
        top: 7,         //坐标top
        width: 8,       //宽度
        height: 9,       //高度
        hasText: 10,     //是否存在文本
        hasPostil: 11,   //是否存在签章
        type: 12,
        image: 14,
        hasImage: 15,
        pageIndex: 20,
        userName: 21,
        parentName: 22,
        createTime: 27
    };
    
    //设置属性
    this.cfg = HWPHelper.extend(cfg, option, true);
}

/**
 * 初始化方法
 * @param {json} option {id:'默认值HWPostil1',width:默认100%,height:默认100%,designMode:是否设计模式} 可选的参数，参考def的定义
 * @returns {undefined}
 */
HWPostil.prototype.Init = function(option) {
	//合并属性
	if(option !=null&&(typeof option!="undefined" )){
		HWPHelper.extend(this.cfg,option,true);
	}

	var _ts=null;
	var _ug = window.navigator.userAgent; //取得浏览器的userAgent字符串
	var _pf=window.navigator.platform;//浏览器的位数

	if (!!window.ActiveXObject || "ActiveXObject" in window){//IE浏览器

    	if(_pf.indexOf("32")>0){//32位IE
			_ts="<OBJECT id='"+this.cfg.id+"' style='LEFT: 0px; WIDTH:"+this.cfg.width+"; TOP: 0px; HEIGHT: "+this.cfg.height+"'";
			_ts += "classid='clsid:FF1FE7A0-0578-4FEE-A34E-FB21B277D561' codebase='"+HWPHelper.contextPath()+"/loadocx/32/HWPostil-client.ocx#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_Version' VALUE='65536'>";
			_ts += "<PARAM NAME='_ExtentX' VALUE='17410'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='10874'>";
			_ts += "<PARAM NAME='_StockProps' VALUE='0'>";
			_ts += "</OBJECT>";	
          
	    }else{//64位IE
	    	_ts="<OBJECT id='"+this.cfg.id+"' style='LEFT: 0px; WIDTH:"+this.cfg.width+"; TOP: 0px; HEIGHT: "+this.cfg.height+"'";
			_ts += "classid='clsid:FF1FE7A0-0578-4FEE-A34E-FB21B277D561' codebase='"+HWPHelper.contextPath()+"/loadocx/64/HWPostil-client.ocx#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_Version' VALUE='65536'>";
			_ts += "<PARAM NAME='_ExtentX' VALUE='17410'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='10874'>";
			_ts += "<PARAM NAME='_StockProps' VALUE='0'>";
			_ts += "</OBJECT>";	
	    }
	}
//	else if(_ug.indexOf("Firefox")>-1) {//firefox浏览器
//		if(_pf.indexOf("32")>0){//32位  
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{3F1A0364-AD32-4E2F-B550-14B878E2ECB1}' ";
//			_ts +=" progid='' height='"+this.cfg.height+"' width='"+this.cfg.width+"' codebase='"+HWPHelper.contextPath()+"/loadocx/32/HWPostil-client.ocx#Version="+this.cfg.version+"' >";
//			_ts +="<param name='_ExtentX' value='2646'><param name='_ExtentY' value='1323'>";
//			_ts +="</OBJECT>";
//		}else{
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{3F1A0364-AD32-4E2F-B550-14B878E2ECB1}' ";
//			_ts +=" progid='' height='"+this.cfg.height+"' width='"+this.cfg.width+"' codebase='"+HWPHelper.contextPath()+"/loadocx/64/HWPostil-client.ocx#Version="+this.cfg.version+"' >";
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
/**
设置是否模板设计模式:  非设计模式  0  设计模式  1
*/
HWPostil.prototype.setDesignMode = function(model){
	this.obj.InDesignMode = model;
};


/**
关闭文档
* @param saveType 保存类型：0:关闭文档，不保存当前修改  1:关闭文档，保存当前修改;2:如果文档已经被修改，显示保存文档对话框，
否则直接关闭。

*/
HWPostil.prototype.CloseDoc = function(saveType){
	this.obj.CloseDoc(saveType);
};

/**
获得指定目录下的所有文件列表
*/
HWPostil.prototype.getFileListUnderDir = function(turl){
	return this.obj.GetFileListUnderDir(turl);
};

/**
获取模板中所有节点信息的base64字符串
*/
HWPostil.prototype.getAllFieldData = function(){
	//执行全选节点操作
	this.obj.RunCommand(3, 20, 0);
	//获取剪切板节点数据
	var _retd=this.obj.GetValue("PASTE_NODES_TODATA");//获取剪切板节点数据
	return _retd;
};
/**
*把当前文件以pdf文件上传到服务端
*@param turl 服务器端接收文件地址
*@param fileName 当前文件的文本域名称
*@param params 同时需要传的其它参数
**/
HWPostil.prototype.savePdfToServer = function(turl,fileName,params){
        //把当前文件另存成pdf文件
        var fpath=this.obj.GetTempFileName("pdf");
        var sret=this.obj.SaveTo(fpath,"pdf",0);
        if(sret!=1){
            this.Alert(HWPHelper.GetErrDesc(sret));
            return;
        }

        this.obj.HttpInit();
        //添加当前文件
        this.obj.HttpAddPostFile(fileName,fpath);
        //添加其他属性
        if(typeof params!="undefined"){
            for(var fldname in params) {
                this.obj.HttpAddPostString(fldname,params[fldname]);           
            }
        }
        //上传服务器
        var ret=this.obj.HttpPost(turl);
        //删除本地文件
        this.obj.DeleteLocalFile(fpath);
        return ret; 
};

/**
*把当前文件以aip文件上传到服务端
*@param turl 服务器端接收文件地址
*@param fileName 当前文件的文本域名称
*@param params 同时需要传的其它参数
**/
HWPostil.prototype.saveAipToServer = function(turl,fileName,params){
        //把当前文件另存成pdf文件
        var fpath=this.obj.GetTempFileName("aip");
        var sret=this.obj.SaveTo(fpath,"aip",0);
        if(sret!=1){
            this.Alert(HWPHelper.GetErrDesc(sret));
            return;
        }

        this.obj.HttpInit();
        //添加当前文件
        this.obj.HttpAddPostFile(fileName,fpath);
        //添加其他属性
        if(typeof params!="undefined"){
            for(var fldname in params) {
                this.obj.HttpAddPostString(fldname,params[fldname]);   
            }
        }
        //上传服务器
        var ret=this.obj.HttpPost(turl);
        //删除本地文件
        this.obj.DeleteLocalFile(fpath);
        return ret; 
};

/**
*把当前文件上传到服务端
*@param turl 服务器端接收文件地址
*@param fileName 当前文件的文本域名称
*@param params 同时需要传的其它参数
**/
HWPostil.prototype.saveToServer = function(turl,fileName,params){
		this.obj.HttpInit();
		//添加当前文件
		this.obj.HttpAddPostCurrFile(fileName);
		//添加其他属性
		if(typeof params!="undefined"){
			for(var fldname in params) {
				this.obj.HttpAddPostString(fldname,params[fldname]);           
        	}
		}
		//上传服务器
		var ret=this.obj.HttpPost(turl);
		return ret;	
}

/**
控件属性初始化
*/
HWPostil.prototype.OnCtrlReady = function() {
    this.obj.ShowDefMenu = this.cfg.showMenu ;
    this.obj.ShowScrollBarButton = this.cfg.showScrollBar;
    this.obj.ShowToolBar = this.cfg.showToolBar;
    this.obj.InDesignMode = this.cfg.designMode;
    this.obj.JSEnv = 1;

     this.obj.SetPageMode(this.cfg.pageMode, this.cfg.pageModeParam);

    {
        this.obj.CurrPenColor = this.cfg.penColor;
    }
    {
        this.obj.CurrPenWidth = this.cfg.penWidth;
    }
};

/**
 * 兼容加载了modal的alert美化处理
 * @param {type} msg
 * @returns {undefined}
 */
HWPostil.prototype.Alert = function(msg) {
     window.alert(msg+"",{showframe:true});
};
/**
 * msg信息
 * @param msg
 */
HWPostil.prototype.Msg = function(msg) {
    window.msg(msg+"",{showframe:true});
  
};
/**
 * 从base64字符串加载文件
 * @param {string} strBase64
 * @returns {undefined}
 */
HWPostil.prototype.LoadFileBase64 = function(strBase64) {
    if (strBase64 !== "") {
        var ret = this.obj.LoadFileBase64(strBase64);
        if (ret !== 0) {
            this.Alert(this.GetErrDesc(ret));
        }
    }
};

/**
获取控件中当前文件的base64值
*/
HWPostil.prototype.GetCurrFileBase64 = function(){
	return this.obj.GetCurrFileBase64();
}

/**
*打开url路径指定的文件，如果是aip直接打开，其它类型的文件转化成aip文件
*/
HWPostil.prototype.openFile = function(turl,ftype){
	if(turl!=""){		
		var _tin=turl.lastIndexOf(".");
		var _ret=0;
		if(_tin>0){
			var _fext=turl.substring(_tin);
			if(_fext==".aip"||_fext==".AIP"){//aip文件
				_ret=this.obj.LoadFile(turl);
			}else{//其它类文件
				_ret=this.obj.LoadFileEx(turl,"tpl",0,0);
			}
		}else{
			_ret=this.obj.LoadFileEx(turl,"tpl",0,0);
		}

		
		if(_ret!=1){
			this.Alert(this.GetErrDesc(_ret));
		}
	}else{
		ftype=(ftype==null?"aip":ftype);
		var _ret=0;
		if(ftype=="aip"||ftype=="AIP"){
			_ret=this.obj.LoadFile(turl);
		}else{
			_ret=this.obj.LoadFileEx("","tpl",0,0);
		}
		if(_ret!=1){
			this.Alert(this.GetErrDesc(_ret));
		}
	}
};
/**
 * 以原始文件打开方式打开或创建文件，不转化为aip文件
 * @param turl 文件地址
 * @param ftype 文件类型：doc，ppt，xls，wps，pdf，unk：不支持创建和远程打开方式，original：清稿的时候，设置Word文件。
 */
HWPostil.prototype.openOriginalFile = function(turl,ftype){
     this.LoadOriginalFile(turl,ftype);
};

/**
 * 以原始文件打开方式打开或创建文件，不转化为aip文件
 * @param turl 文件地址
 * @param ftype 文件类型：doc，ppt，xls，wps，pdf，unk：不支持创建和远程打开方式，original：清稿的时候，设置Word文件。
 */
HWPostil.prototype.LoadOriginalFile = function(turl,ftype){
	if(turl!=""){
		var _tin=turl.lastIndexOf(".");
		var _ret=0;
		if(_tin>0){
			var _fext=turl.substring(_tin);
			ftype=(ftype==null?_fext:ftype);
			_ret=this.obj.LoadOriginalFile(turl,ftype);
		}else{
			ftype=(ftype==null?"doc":ftype);
			_ret=this.obj.LoadOriginalFile(turl,ftype);
		}
		
		if(_ret!=1){
			this.Alert(this.GetErrDesc(_ret));
		}
	}else{
		ftype=(ftype==null?"doc":ftype);
		var _ret=this.obj.LoadOriginalFile("",ftype);
		if(_ret!=1){
			this.Alert(this.GetErrDesc(_ret));
		}
	}
};

/**
 * 获取节点值
 * @param {type} noteName
 * @returns {AIP.prototype@pro;obj@call;GetValueEx}
 */
HWPostil.prototype.GetNoteValue = function(noteName) {
    return this.obj.GetValueEx(noteName, this.noteValueType.allData);
}
/**
 * 获取节点类型
 * @param {type} noteName
 * @returns {AIP.prototype@pro;obj@call;GetValueEx}
 */
HWPostil.prototype.GetNoteType = function(noteName) {
    return this.obj.GetValueEx(noteName, this.noteValueType.type);
};

/**
 * 获取节点大小
 * @param {type} noteName
 * @returns {AIP.prototype.GetNoteSize.Anonym$0}
 */
HWPostil.prototype.GetNoteSize = function(noteName) {
    return {
        width:this.obj.GetValueEx(noteName, this.noteValueType.width),
        height:this.obj.GetValueEx(noteName, this.noteValueType.height)
    };
};

/**
 * 获取节点位置
 * @param {type} noteName
 * @returns {AIP.prototype.GetNotePos.Anonym$1}
 */
HWPostil.prototype.GetNotePos = function(noteName) {
    return {
        left:this.obj.GetValueEx(noteName, this.noteValueType.left),
        top:this.obj.GetValueEx(noteName, this.noteValueType.top)
    };
};


/**
 * 登陆
 * @param {type} user  登录用户名
 * @param {type} type  登录类型  0 测试用户，1 本地key用户，2 服务器key用户
 * @param {type} access 访问权限 65535 最大权限
 * @param {type} pass 用户密码
 * @param {type} address 服务器端登录时接口地址
 * @returns {undefined}
 */
HWPostil.prototype.Login = function(user, type, access,pass,address) {

	var _access=access||65535;
	var _pass=pass||"";
	var _address=address||"";
	var ret=0;
	if(type===0){
		ret =  this.obj.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
	}else{
		ret = this.obj.Login(user, type, _access, _pass, _address);
	}   
    /*if(ret !== 0) {
        this.Alert(this.GetErrDesc(ret));
    }*/
};
/**
 * 登陆返回结果码
 * @param {type} user  登录用户名
 * @param {type} type  登录类型  0 测试用户，1 本地key用户，2 服务器key用户
 * @param {type} access 访问权限 65535 最大权限
 * @param {type} pass 用户密码
 * @param {type} address 服务器端登录时接口地址
 * @returns {undefined}
 */
HWPostil.prototype.LoginRet = function(user, type, access,pass,address) {

    var _access=access||65535;
    var _pass=pass||"";
    var _address=address||"";
    var ret=0;
    if(type===0){
        ret =  this.obj.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
    }else{
        ret = this.obj.Login(user, type, _access, _pass, _address);
        //ret = this.obj.Login("gz",3, 65535, "Admin123", "http://localhost:8080/ESS/api/serviceForAip/");
    }
    return ret;
};
/**
 * 返回当前登录用户名 0 无用户登录
 * @returns {*}
 * @constructor
 */
HWPostil.prototype.GetCurrUserID = function() {
    return this.obj.GetCurrUserID();
};
/**
 * GetNextNote 获取下一节点信息
 * @returns {*}
 * @constructor
 */
HWPostil.prototype.GetNextNote = function(pcUserID,isServerID,pcNoteID) {
    return this.obj.GetNextNote(pcUserID,isServerID,pcNoteID);
};
/**
 * GetNextNote 删除指定节点信息
 * @returns {*}
 * @constructor
 */
HWPostil.prototype.DeleteNote = function(strNoteName) {
    return this.obj.DeleteNote(strNoteName);
};

/**
 * 设置大小
 * @param {type} width
 * @param {type} height
 * @returns {undefined}
 */
HWPostil.prototype.SetSize = function(width, height) {
    this.obj.width = width;
    this.obj.height = height;
    $('#'+this.container).css({'width':width, 'height':height});
};

/**


/**
 * 节点是否存在
 * @param {type} noteName
 * @returns {Boolean}
 */
HWPostil.prototype.isNoteExist = function(noteName) {
    var tmpNote = null;
    while(tmpNote = this.obj.GetNextNote("", 0, tmpNote)){
        if(tmpNote == noteName) {
            return true;
        }
    }
    return false;
};

/**
 * 插入节点
 * @param {type} name 节点名称
 * @param {type} page 页面
 * @param {type} type 节点类型
 * @param {type} posX 节点x坐标
 * @param {type} posY 节点y坐标
 * @param {type} w 节点宽度
 * @param {type} h 节点高度
 * @param {type} props{BORDER:边样式,FACENAME:字体,FONTSIZE:字体大小,FRONTCOLOR:字体颜色,LABEL:0非只读 3只读,TIPSINFO:输入前提示信息,CONTENTTYPE:输入框内数据类型【文本:0 密码:1 日期：2 整数：3 小数：4 大写金额:5 图片：6 印章：7}
 * @returns {unresolved}

 */
HWPostil.prototype.InsertNote = function(name, page, type, posX, posY, w, h, props) {
    
   
    if(!page) {
        page = this.obj.CurrPage;
    }
    if(!type) {
        type = 3;
    }
    var note = this.obj.InsertNote(name, page, type, posX, posY, w, h);
    if(note!="" && props!=null&&(typeof props != "undefined"))
    {
    	var tpg=parseInt(page)+1;
        
        for(var propName in props) {
        	if(propName=="LABEL"){
        		this.obj.SetValue("Page"+tpg+"."+name,":PROP::"+propName+":"+props[propName]+"");
        	}else{
        		this.obj.SetValue("Page"+tpg+"."+name,":PROP:"+propName+":"+props[propName]+"");
        	}
        	
        }
    }

    return note;
};

/**
 * 设置笔色
 * @param {type} penColor
 * @returns {undefined}
 */
HWPostil.prototype.SetPenColor = function(penColor){  
    this.obj.CurrPenColor = penColor;
};

/**
 * 设置笔宽
 * @param {type} penWidth
 * @returns {undefined}
 */
HWPostil.prototype.SetPenWidth = function(penWidth){

    this.obj.CurrPenWidth = penWidth;
};

/**
 * 缩放
 * @param {type} percent
 * @returns {undefined}
 */
HWPostil.prototype.Zoom = function(percent) {
    var currPageMode = this.obj.JSGetPageMode();
    var currZoomPercent = this.obj.JSValue;
    if(currPageMode == 1) {
        this.obj.SetPageMode(currPageMode,currZoomPercent + percent);
    }
};

/**
手写action
*/
HWPostil.prototype.ActHandWrite = function() {
    if(this.obj.IsLogin() === 0) {
        this.Login(this.cfg.loginUser, 1 , 32767, "", "");
    }
    this.obj.CurrAction = 264;
};
/**
加章action
*/
HWPostil.prototype.ActAddSeal = function() {
    if(this.obj.IsLogin() === 0) {
        this.Login(this.cfg.loginUser, 1 , 32767, "", "");
    }
    this.obj.CurrAction = 2568;
};

/**
擦除action
*/
HWPostil.prototype.ActErase = function() {
    if(this.obj.IsLogin() === 0) {
        this.Login(this.cfg.loginUser, 1 , 32767, "", "");
    }
    this.obj.CurrAction = 16;
};

/**
设置是否进行全屏显示  slog 1 全屏显示    0 正常显示
*/
HWPostil.prototype.setFullScreen = function(slog){
	this.obj.ShowFullScreen = slog;
}


/****************************************************************************************************

方法名：PrintDoc						打印文档
参  数：plog							0快速打印，1有打印对话框

*****************************************************************************************************/
HWPostil.prototype.PrintDoc = function(plog) {
	
	var isprint = this.obj.PrintDoc(1, plog);
	if (isprint == 0) {
		//this.Alert("打印失败！");
	}
	return isprint;
}
/****************************************************************************************************

方法名：FileMerge						合并文件
参  数：filepath						要合并文件路径，如果只为空则插入一个空白页
		page							文件要插入的页数,插入到第一页值为0
   
*****************************************************************************************************/
HWPostil.prototype.FileMerge = function(filepath,page) {
	
	if(this.obj.IsLogin() === 0) {
		this.obj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	}

	var isMerge = 0;

	if(filepath==""){
		isMerge = this.obj.InsertEmptyPage(page,0,0,0);
	}else{
		isMerge = this.obj.MergeFile(page,filepath);
	}
	if (isMerge == 0) {
		this.Alert("合并文档失败！");
	}
};

/****************************************************************************************************

方法名：GetSignData						获取当前用户手写签名数据
参  数：

*****************************************************************************************************/
HWPostil.prototype.GetSignData = function () {	
	return this.obj.GetValue("PASTE_UNODES_TODATA:"+this.cfg.loginUser);
}
/****************************************************************************************************

方法名：SetSignData						设置签名数据
参  数：

*****************************************************************************************************/
HWPostil.prototype.SetSignData = function (signData) {

	var ret=this.obj.SetValue("PASTE_NODES_FROMDATA:1",signData);
	if(ret!=1){
		this.Alert(HWPHelper.GetErrDesc(ret));
	}	
}


/**
 * 错误提示
 * @param {type} ErrCode
 * @returns ｛string｝
 */
HWPostil.prototype.GetErrDesc = function(ErrCode) {
    switch(ErrCode) {
        case 0:
            return "正确";
        case -1:
            return "AIP服务器正忙，请稍候再试";
        case -2:
            return "服务器无效，请检查其是否已启动";
        case -3:
            return "出现未知的连接错误";
        case -5:
            return "无效的命令，可能系统不支持本操作";
        case -6:
            return "系统不支持本操作"
        case -7:
            return "错误的数据包格式，可能数据传输不正确";
        case -8:
            return "本机与服务器时间不符，被拒绝登录，请保证本机时间和服务器时间误差在十五分钟之内";

        case -11:
            return "指定证书已经被作废，无法使用";
        case -12:
            return "指定证书已经过期，无法使用";
        case -13:
            return "服务器数据库中未发现本用户对应的证书";

        case -20:
            return "权限错误，本用户无权使用指定的印章";
        case -21:
            return "指定印章已经被作废，无法使用";
        case -22:
            return "指定印章已经过期，无法使用";
        case -23:
            return "指定印章不存在";

        case -30:
            return "权限错误，你无权操作本文档";
        case -31:
            return "文档已经被锁定，你无权操作";
        case -33:
            return "指定文档不存在";
        case -35:
            return "权限错误，你无权打印本文档";
        case -36:
            return "文档打印份数已用完，你无权打印本文档";

        case -40:
            return "打开服务器数据库失败";
        case -41:
            return "更新服务器数据库失败";
        case -42:
            return "读取服务器数据库失败";
        case -43:
            return "操作服务器数据库失败";

        case -50:
            return "本用户还没有登录服务器，无法进行本操作";
        case -51:
            return "用户登录密码错误";
        case -52:
            return "本用户已被服务器作废";
        case -53:
            return "指定用户不存在";
        case -54:
            return "用户密码不符合格式，请联系管理员";
        case -55:
            return "未发现当前用户的证书信息";

        case -70:
            return "服务器未注册，请联系管理员";
        case -71:
            return "服务器上用户数多于授权数量，请联系管理员";
        case -72:
            return "本用户不属于本域服务器，请联系管理员";
        case -73:
            return "域服务器不支持此种登录方式";
        case -74:
            return "服务器端处理超时";
        case -75:
            return "服务器端发生未知错误，请联系管理员";

        case -100:
            return "域服务器地址无效，请保证其类似于IP:Port(直连)，或HTTP URL(如http://www.xx.com:8080/aipserver.jsp)";
        case -101:
            return "连接超时";
        case -102:
            return "用户取消";
        case -103:
            return "测试用户ID应该以'HWSEALDEMO'开始";
        case -104:
            return "未发现用户列表";

        case -110:
            return "有新用户登录";
        case -111:
            return "出现错误，操作被终止";

        case -120:
            return "无效的对象";
        case -121:
            return "无效数据错误";
        case -122:
            return "无效的窗口";
        case -123:
            return "无效的密码";

        case -130:
            return "身份校验出错";
        case -131:
            return "内存无法分配";

        case -140:
            return "错误的授权";
        case -141:
            return "错误的类型";
        case -142:
            return "未知错误";

        case -200:
            return "没有插入智能卡";
        case -201:
            return "错误的智能卡登录PIN码";
        case -202:
            return "系统未发现有效的私钥";
        case -203:
            return "系统未发现有效的证书";
        case -204:
            return "本机不存在CSP服务";
        case -205:
            return "本机存在多个智能卡";
        case -206:
            return "CSP驱动未安装,请确认已经安装了正确的智能卡驱动";
        case -209:
            return "操作智能卡过程中出现未知错误";
        case -210:
            return "身份验证未通过";
        case -211:
            return "智能卡中不存在印章";

        default :
            return "未知错误";
    }
};

/**
 * 控件SetValue操作
 */
HWPostil.prototype.setValue = function (key,value) {
	return this.obj.SetValue(key,value);
}

/**
 * 控件GetValue操作
 */
HWPostil.prototype.getValue = function (key) {
	return this.obj.GetValue(key);
}

/**
 * 控件convertToAip操作
 */
HWPostil.prototype.convertToAip = function (blAddOri,blNormal) {
	return this.obj.ConvertToAip(blAddOri,blNormal);
}

/**
 * 关闭文档
 */
HWPostil.prototype.closeDoc = function (key) {
	return this.obj.CloseDoc(key);
}

/**
获取控件中当前文件指定格式的base64值
 */
HWPostil.prototype.getFileBase64 = function(filePath,blCompress){
    return this.obj.GetFileBase64(filePath,blCompress);
}
/**
 * 打开本地文件
 * @param filePath
 * @returns {*}
 */
HWPostil.prototype.loadFile = function(filePath){
    return this.obj.LoadFile(filePath);
}
/**
 * 返回节点个数
 *
 * @param type
 * @returns {*}
 */
HWPostil.prototype.getNoteNum = function(type){
    return this.obj.GetNoteNum(type);
}
/**
 * 保存文件
 * @param path
 * @param type
 * @param isclose
 * @returns {*}
 */
HWPostil.prototype.saveTo = function(path,type,isclose){
    return this.obj.SaveTo(path,type,isclose);
}

/**
设置是否打开文件: 打开  0  不打开  1
*/
HWPostil.prototype.setSilentMode = function(model){
	this.obj.SilentMode = model;
};

/**
设置是否显示菜单: 隐藏  0  显示  1
 */
HWPostil.prototype.setShowDefMenu = function(model){
	this.obj.ShowDefMenu = model;
};

/**
设置是否显示工具栏: 隐藏  0  显示  1
 */
HWPostil.prototype.setShowToolBar = function(model){
	this.obj.ShowToolBar = model;
};

/**
 设置是否显示滚动条工具栏: 隐藏  2 显示  1 0 3
 */
HWPostil.prototype.showScrollBarButton  = function(model){
    this.obj.ShowScrollBarButton  = model;
};

/**
设置JSEnv:0 非js环境;1 js环境
 */
HWPostil.prototype.setJSEnv = function(model){
	this.obj.JSEnv = model;
};

/**
设置JSValue:0 终止默认事件的操作
 */
HWPostil.prototype.setJSValue = function(model){
	this.obj.JSValue = model;
};

/**
获得所有打印机
 */
HWPostil.prototype.GetPrinterList = function(){
	return this.obj.GetPrinterList;
};

/**
 *定义打印
 *strPrinterName打印机名,lPrintFlag打印节点,blShowDlg显示对话框,blZoom宽高比例,
 *lFromPage开始页, lToPage终止页, blOriSize原始页面大小, lCopys打印份数,
 *blCollate 0每页打印多个 1先打完一份,blTranFirst 0先输出文档 1先输出节点,blDulpex 0单面打印 1双面打印
 */
HWPostil.prototype.PrintDocEx = function(strPrinterName,lPrintFlag, blShowDlg,blZoom,lFromPage,lToPage,blOriSize,lCopys,blCollate,blTranFirst,blDulpex){
	return this.obj.PrintDocEx(strPrinterName,lPrintFlag,blShowDlg,blZoom,lFromPage, lToPage, blOriSize, lCopys,blCollate,blTranFirst,blDulpex); 

};

/****************************************************************************************************

方法名：PrintDocNum						打印文档
参  数：plog							0快速打印，1有打印对话框

*****************************************************************************************************/
HWPostil.prototype.PrintDocNum = function(pnode,plog,num) {
	var isprint = this.obj.PrintDoc(pnode,plog,num);
	return isprint;
}

/**
 *获取文档页码
*/
HWPostil.prototype.PageCount = function(){
	return this.obj.PageCount;
};

/**
*把当前文件以原格式上传到服务端
*@param turl 服务器端接收文件地址
*@param filePath 文件路径
*@param fileName 当前文件的文本域名称
*@param params 同时需要传的其它参数
**/
HWPostil.prototype.saveFileToServer = function(turl,fileName,params){
		this.obj.HttpInit();
		//添加当前文件
		//var filePath=this.obj.PathName;
		//console.log(filePath);
		//this.obj.HttpAddPostFile(fileName,filePath);
		this.obj.HttpAddPostCurrFile(fileName);
		//添加其他属性
		if(typeof params!="undefined"){
			for(var fldname in params) {
				this.obj.HttpAddPostString(fldname,params[fldname]);           
        	}
		}
		//上传服务器
		var ret=this.obj.HttpPost(turl);
		return ret;	
}

/**
 *把当前文件以原格式上传到服务端
 *@param turl 服务器端接收文件地址
 *@param filePath 文件路径
 *@param fileName 当前文件的文本域名称
 *@param params 同时需要传的其它参数
 **/
HWPostil.prototype.savePatchFileToServer = function(filePath,turl,fileName,params){
	this.obj.HttpInit();
	this.obj.HttpAddPostFile(fileName,filePath);
	//添加其他属性
	if(typeof params!="undefined"){
		for(var fldname in params) {
			this.obj.HttpAddPostString(fldname,params[fldname]);           
		}
	}
	//上传服务器
	var ret=this.obj.HttpPost(turl);
	return ret;	
}

/**
 *把当前文件以原格式上传到服务端
 *@param turl 服务器端接收文件地址
 *@param filePath 文件路径
 *@param fileName 当前文件的文本域名称
 *@param params 同时需要传的其它参数
 **/
HWPostil.prototype.saveFileToPdfToServer=function(turl,fileName,params){
    //把当前文件另存成pdf文件
    var fpath=this.obj.GetTempFileName("pdf");
    var sret=this.obj.SaveTo(fpath,"pdf",0);
    if(sret!=1){
        this.Alert(HWPHelper.GetErrDesc(sret));
        return;
    }

    this.obj.HttpInit();
    //添加当前文件
    this.obj.HttpAddPostFile(fileName,fpath);
    //添加其他属性
    if(typeof params!="undefined"){
        for(var fldname in params) {
            this.obj.HttpAddPostString(fldname,params[fldname]);
        }
    }
    //上传服务器
    var ret=this.obj.HttpPost(turl);
    //删除本地文件
    this.obj.DeleteLocalFile(fpath);
    return ret;
}


HWPostil.prototype.savePdfPatchToServer = function(ofilepath,turl,fileName,params){
    //把当前文件另存成pdf文件
    this.obj.loadFile(ofilepath);
    var fpath=this.obj.GetTempFileName("pdf");
    var sret=this.obj.SaveTo(fpath,"pdf",0);
    if(sret!=1){
        this.Alert(HWPHelper.GetErrDesc(sret));
        return;
    }

    this.obj.HttpInit();
    //添加当前文件
    this.obj.HttpAddPostFile(fileName,fpath);
    //添加其他属性
    if(typeof params!="undefined"){
        for(var fldname in params) {
            this.obj.HttpAddPostString(fldname,params[fldname]);
        }
    }
    //上传服务器
    var ret=this.obj.HttpPost(turl);
    //删除本地文件
    this.obj.DeleteLocalFile(fpath);
    return ret;
};
