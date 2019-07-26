var SealHelper = {
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
 * 定义MakeSeal对象
 * @param {string} container 加载MakeSeal的容器id
 * @param {json} option {id:'默认值DMakeSealV61',width:默认100%,height:默认100%,version:默认1,2,2,0} 可选的参数
 * @returns {AIP}
 */
function MakeSeal(container,option) {
	this.obj=null; //activex对象
	this.container = container;//控件的容器
	var cfg = {
        id : "DMakeSealV61",
        width : "100%",
        height : "100%",
        debug : false,          //调试模式
        version:"1,1,2,0"    	//控件的版本号
    
    };    
    //设置属性
    this.cfg = SealHelper.extend(cfg, option, true);
    
    //印章属性
    this.scfg={};
}

/**
 * 兼容加载了modal的alert美化处理
 * @param {type} msg
 * @returns {undefined}
 */
MakeSeal.prototype.Alert = function(msg) {
      window.alert(msg+"",{showframe:true});
    
};
MakeSeal.prototype.Msg = function(msg) {
    window.msg(msg+"",{showframe:true});
  
};

/**
 * 初始化方法
 * @param {json} option {id:'默认值DMakeSealV61',width:默认100%,height:默认100%,version:默认1,1,1,2} 可选的参数
 * @returns {undefined}
 */
MakeSeal.prototype.Init = function(option) {
	//合并属性
	if(option !=null&&(typeof option!="undefined" )){
		SealHelper.extend(this.cfg,option,true);
	}

	var _ts=null;
	var _ug = window.navigator.userAgent; //取得浏览器的userAgent字符串
	var _pf=window.navigator.platform;//浏览器的位数

	if (!!window.ActiveXObject || "ActiveXObject" in window){//IE浏览器

    	if(_pf.indexOf("32")>0){//32位IE
			_ts="<OBJECT id='"+this.cfg.id+"' style=' WIDTH:"+this.cfg.width+"; HEIGHT: "+this.cfg.height+"'";
			_ts += "classid='clsid:3F1A0364-AD32-4E2F-B550-14B878E2ECB1' codebase='"+SealHelper.contextPath()+"/loadocx/32/MakeSealV6.ocx#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_ExtentX' VALUE='2646'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='1323'>";
			_ts += "</OBJECT>";	
          
	    }else{//64位IE
	    	_ts="<OBJECT id='"+this.cfg.id+"' style='WIDTH:"+this.cfg.width+";HEIGHT: "+this.cfg.height+"'";
			_ts += "classid='clsid:3F1A0364-AD32-4E2F-B550-14B878E2ECB1' codebase='"+SealHelper.contextPath()+"/loadocx/64/MakeSealV6.ocx#Version="+this.cfg.version+"' >";
			_ts += "<PARAM NAME='_ExtentX' VALUE='2646'>";
			_ts += "<PARAM NAME='_ExtentY' VALUE='1323'>";
			_ts += "</OBJECT>";	
	    }
	}
//	else if(_ug.indexOf("Firefox")>-1) {//firefox浏览器
//		if(_pf.indexOf("32")>0){//32位  
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{3F1A0364-AD32-4E2F-B550-14B878E2ECB1}' ";
//			_ts +=" progid='' height='"+this.cfg.height+"' width='"+this.cfg.width+"' codebase='"+SealHelper.contextPath()+"/loadocx/32/MakeSealV6.ocx#Version="+this.cfg.version+"' >";
//			_ts +="<param name='_ExtentX' value='2646'><param name='_ExtentY' value='1323'>";
//			_ts +="</OBJECT>";
//		}else{
//			_ts= "<OBJECT id='"+this.cfg.id+"' TYPE='application/x-itst-activex'  clsid='{3F1A0364-AD32-4E2F-B550-14B878E2ECB1}' ";
//			_ts +=" progid='' height='"+this.cfg.height+"' width='"+this.cfg.width+"' codebase='"+SealHelper.contextPath()+"/loadocx/64/MakeSealV6.ocx#Version="+this.cfg.version+"' >";
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
 * 检查控件是否初始化完毕
 */
MakeSeal.prototype.checkObj =  function(){
	if(this.obj==null){
		this.Alert("控件初始化出错！");
		return false;
	}else{
		return true;
	}
}

/**
 * 选择印章图片的bmp文件
 *  @returns 错误：false  正确：{width:图片的宽度,height:图片的高度,path:图片的路面}
 */
MakeSeal.prototype.SelectBmpFile = function(){
	if(this.checkObj()==false){
		return false;
	}
	
	//初始化印章数据
	this.obj.ResetContent();
	//制作新的印章开始
    this.obj.NewSealStart();
	//在本地选择BMP文件，如果未选择则返回false
    var _ret=this.obj.SelectBmpFile();
	if(_ret != 0 ){
		this.Alert("选择图片文件出错:"+this.GetErrDesc(_ret));
		return false;
		
	}		
	//从控件中获得BMP文件的高度和宽度，如果为0则返回false 单位：毫米
	var _bHeight = parseInt(this.obj.fBmpHeightMM*100)/100; 
	var _bWidth = parseInt(this.obj.fBmpWidthMM*100)/100;
	var _bpath = this.obj.strBmpPath;
	
	
	if(_bHeight == 0  || _bWidth == 0){
		this.Alert("BMP图片错误");
		return false;
	}	
	return {width:_bWidth,height:_bHeight,path:_bpath};
};
/**
 * 选择印章图片的bmp文件
 * @param sealID(印章id)，sealName(印章名字)
 *  @returns 错误：false  正确：{width:图片的宽度,height:图片的高度,path:图片的路面}
 */
MakeSeal.prototype.selectBmpFile = function(sealID,sealName){
	if(this.checkObj()==false){
		return false;
	}
	//初始化印章数据
	this.obj.ResetContent();
	//制作新的印章开始
    this.obj.NewSealStart();
	//在本地选择BMP文件，如果未选择则返回false
    var _ret=this.obj.SelectBmpFile();
	if(_ret != 0 ){
		this.Alert("选择图片文件出错:"+this.GetErrDesc(_ret));
		return false;
		
	}		
	this.obj.strSealId=sealID;
	this.obj.strSealName=sealName;
	this.obj.lBitCount = 192;
	//从控件中获得BMP文件的高度和宽度，如果为0则返回false 单位：毫米
	this.obj.fSealHeightMM=Math.floor(this.obj.lBmpHeight/192*25.4);
	this.obj.fSealWidthMM=Math.floor(this.obj.lBmpWidth/192*25.4);
	var _bHeight = parseInt((Math.floor(this.obj.lBmpHeight/192*25.4))*100)/100; 
	var _bWidth = parseInt((Math.floor(this.obj.lBmpWidth/192*25.4))*100)/100;
	var _bpath = this.obj.strBmpPath;
	
	if(_bHeight == 0  || _bWidth == 0){
		this.Alert("BMP图片错误");
		return false;
	}	
	msObj.obj.NewSealEnd();
	return {width:_bWidth,height:_bHeight,path:_bpath};
};
/**
 * 获取印章加密图片和缩略图
 * @param sealconfig 印章配置参数{sealwidth:'印章宽度',sealheight:'印章高度',sealname:'印章名称',sealid:'印章id',compname:'部门名称',sealbit:'印章像素'}
 * @returns {Boolean} false 出错   成功：{encimg:'图片加密数据',previewimg:'图片缩略图数据'}
 */
MakeSeal.prototype.GetEncBmp = function(sealconfig){
	
	if(this.checkObj()==false){
		return false;
	}
	
	this.scfg=SealHelper.extend(this.scfg, sealconfig, true);
	
	this.obj.fSealWidthMM = this.scfg.sealwidth;
	this.obj.fSealHeightMM = this.scfg.sealheight;
	this.obj.strSealName = this.scfg.sealname;
	//生产ID
	this.obj.strSealID = this.scfg.sealid;
	
	this.obj.strCompName =  this.scfg.compname;
	this.obj.lBitCount = this.scfg.sealbit;
	//制作印章结束
	var _ret=this.obj.NewSealEnd();
	if(_ret != 0 ){
		this.Alert("载入印模失败:"+this.GetErrDesc(_ret));
		return false;
	}
	
	//返回印章的加密图片和缩略图的base64字符串
	return {encimg:this.obj.GetEncBmp(),previewimg:this.obj.GetPreviewImg(0)};
};
/**
 * 显示加密图片
 * @param engimgdata 要显示的加密图片数据
 * @returns {Boolean} false 出错  true 加载成功
 */
MakeSeal.prototype.SetEncBmp = function(engimgdata){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	this.obj.SetEncBmp(engimgdata);
	return true;
};
/**
 * 获取印章的base64字符
 * @param sealconfig 印章配置参数{sealwidth:'印章宽度',sealheight:'印章高度',sealname:'印章名称',sealid:'印章id',compname:'部门名称',sealbit:'印章像素'}
 * @returns {Boolean} false 出错   成功：印章的base64字符串
 */
MakeSeal.prototype.SaveData = function(sealconfig){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	
	this.scfg=SealHelper.extend(this.scfg, sealconfig, true);
	
	this.obj.fSealWidthMM = this.scfg.sealwidth;
	this.obj.fSealHeightMM = this.scfg.sealheight;
	this.obj.strSealName = this.scfg.sealname;
	//生产ID
	this.obj.strSealID = this.scfg.sealid;
	
	this.obj.strCompName =  this.scfg.compname;
	this.obj.lBitCount = this.scfg.sealbit;
	//制作印章结束
	if(0 != this.obj.NewSealEnd()){
		this.Alert("载入印章失败!");
		return false;
	}
	//返回印章的base64字符串
	return this.obj.SaveData();
};

/**
 * 获取当前印章的base64字符
 * @param sealconfig 印章配置参数{sealwidth:'印章宽度',sealheight:'印章高度',sealname:'印章名称',sealid:'印章id',compname:'部门名称',sealbit:'印章像素'}
 * @returns {Boolean} false 出错   成功：印章的base64字符串
 */
MakeSeal.prototype.SaveCurrSealData = function(sealconfig){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	
	this.scfg=SealHelper.extend(this.scfg, sealconfig, true);
	
	this.obj.fSealWidthMM = this.scfg.sealwidth;
	this.obj.fSealHeightMM = this.scfg.sealheight;
	this.obj.strSealName = this.scfg.sealname;
	//生产ID
	this.obj.strSealID = this.scfg.sealid;
	
	this.obj.strCompName =  this.scfg.compname;
	this.obj.lBitCount = this.scfg.sealbit;
	//制作印章结束
	if(0 != this.obj.NewSealEnd()){
		this.Alert("载入印章失败!");
		return false;
	}
	//返回印章的base64字符串
	return this.obj.SaveCurrSealData();
};
/**
 * 加载印章base64数据，并显示印章
 * @param sealData 要显示的印章base64字符串数据
 * @returns {Boolean} false 出错   true 显示成功
 */
MakeSeal.prototype.LoadData = function(sealData){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	
	this.obj.LoadData(sealData);
	return true;
};

/**
 * 把印章数据写入key中
 * @param sealData 要写入的seal数据
 * @returns {Boolean} false 出错   true 显示成功
 */
MakeSeal.prototype.WriteKey = function(sealData){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	var _ret=this.obj.LoadData(sealData);
	if(_ret == 0){
		var flag=this.obj.SaveSeal(2,"",0);//把印章数据写入key中
		if(0 != flag){
		
			this.Alert("写入印章失败:"+this.GetErrDesc(flag));
			return false;			
		}else{
			return true;
		}
	}else{
		this.Alert("加载印章数据出错:"+this.GetErrDesc(_ret));
		return false;
	}
};
/**
 * 保存当前的印章数据
 * @param saveTo 保存目标对象：1 保存到文件 2 写入key中
 * @param savePath 保存印章的路径：saveto=1时 印章保存的具体路径，saveto=2 时savepath=""
 * @returns {Boolean} false 出错   true 显示成功
 */
MakeSeal.prototype.SaveSeal = function(saveTo,savePath){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	//如果是写入key中，把savePath设置成“”
	if(saveTo==2){
		savePath="";
	}
	
	var _ret=this.obj.SaveSeal(saveTo,savePath,0);
	if(_ret==0){
		return true;
	}else{
		this.Alert("保存印章出错:"+this.GetErrDesc(_ret));
		return false;
	}	
	
};

/**
 * 在印章上添加标记
 * @param sealData 印章的base64数据
 * @returns {Boolean} false 错误  正确：添加标记后印章的base64数据
 */
MakeSeal.prototype.AddMarker = function(sealData){
	if(this.checkObj()==false){
		return false;
	}
	
	var _ret=this.obj.LoadData(sealData);
	if(_ret!=0){
		this.Alert("加载印章错误:"+this.GetErrDesc(_ret));
		return false;
	}
		
	var vID = this.obj.GetNextSeal(0);//获取第一个印章ID
	this.obj.SelectSeal(vID);//选择第一个印章
	this.obj.ShowDialog(2,0);//弹出添加标记的窗口
	var seal_data= this.obj.SaveData();//获取新的印章数据的base64字符串
	//数据发生改变，添加了新的标记
	if(sealData.length!=seal_data.length){
		return seal_data;
	}else{
		return false;
	}
}

/**
 * 从pfx文件中获取证书信息
 * @param pfxpath pxf文件的路径
 * @param pfxpwd pfx文件的读取密码
 * @returns {Boolean} false 读取出错  正确：{keysn:'证书的SN',keydn:'证书DN',certuser:'证书用户【证书所有者】',begintime:'开始时间',endtime:'截止时间',keycert:'证书公钥的base64字符串'}
 */
MakeSeal.prototype.GetInfoFromPfx = function(pfxpath,pfxpwd){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}	
	
	
	var certstr=this.obj.GetInfoFromPfx(pfxpath,pfxpwd);
	
	if(certstr.indexOf("errorcode")>-1){
		 this.Alert("证书无法解析，请确认是pfx文件，并且密码正确");
		 return false;
	}else{
		var key_sn=certstr.split("->");
		var _certinfo={};
		_certinfo["keysn"]=key_sn[0].split("<+N=")[1];
		_certinfo["keydn"]=key_sn[5].split("<+D=")[1];
		_certinfo["certuser"]=key_sn[1].split("<+S=")[1];
		_certinfo["begintime"]=this.formatDate(key_sn[2].split("<+B=")[1]);
		_certinfo["endtime"]=this.formatDate(key_sn[3].split("<+A=")[1]);
		_certinfo["keycert"]=key_sn[4].split("<+C=")[1];
		//返回证书信息
		return _certinfo;  	
	}
};
/**
 * 从cert文件中获取证书信息
 * @param certpath cert文件的路径
 * @returns {Boolean} false 读取出错  正确：{keysn:'证书的SN',keydn:'证书DN',certuser:'证书用户【证书所有者】',begintime:'开始时间',endtime:'截止时间',keycert:'证书公钥的base64字符串'}
 */
MakeSeal.prototype.GetInfoFromCert = function(certpath){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	var _ret=this.obj.CertGetInfo(certpath,"CERTDATAFILE");
	if(_ret!=0){
		this.Alert(this.GetErrDesc(_ret));
		return false;
	}
	
	var _certinfo={};
	_certinfo["keysn"]=this.obj.GetSerialNumberEx(0); //0 cert 文件   1key里,2 ie里
	_certinfo["keydn"]=this.obj.GetCertDNEx(0);
	_certinfo["certuser"]=this.obj.GetSubjectNameEx(0);
	_certinfo["begintime"]=this.formatDate(this.obj.GetCertStartTimeEx(0));
	_certinfo["endtime"]=this.formatDate(this.obj.GetCertEndTimeEx(0));
	_certinfo["keycert"]=this.obj.GetCardCert();
	
	return _certinfo;
	
}
/**
 * 从IE中获取证书信息
 * @returns {Boolean} false 读取出错  正确：{keysn:'证书的SN',keydn:'证书DN',certuser:'证书用户【证书所有者】',begintime:'开始时间',endtime:'截止时间',keycert:'证书公钥的base64字符串'}
 */
MakeSeal.prototype.GetInfoFromIE = function(){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	
	var _certinfo={};
	_certinfo["keysn"]=this.obj.GetSerialNumberEx(2); //1key里,2ie里
	_certinfo["keydn"]=this.obj.GetCertDNEx(2);
	_certinfo["certuser"]=this.obj.GetSubjectNameEx(2);
	_certinfo["begintime"]=this.formatDate(this.obj.GetCertStartTimeEx(2));
	_certinfo["endtime"]=this.formatDate(this.obj.GetCertEndTimeEx(2));
	_certinfo["keycert"]=this.obj.GetCardCert();
	
	return _certinfo;
	
};


/**
 * 从IE中获取证书信息
 * @returns {Boolean} false 读取出错  正确：{keysn:'证书的SN',keydn:'证书DN',certuser:'证书用户【证书所有者】',begintime:'开始时间',endtime:'截止时间',keycert:'证书公钥的base64字符串'}
 */
MakeSeal.prototype.GetIETwo = function(){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	var _certinfo={};
/*	_certinfo["keysn"]=this.obj.GetSerialNumberEx(2); //1key里,2ie里
	_certinfo["keydn"]=this.obj.GetCertDNEx(0);
	_certinfo["begintime"]=this.formatDate(this.obj.GetCertStartTimeEx(0));

	_certinfo["endtime"]=this.formatDate(this.obj.GetCertEndTimeEx(0));
	_certinfo["keycert"]=this.obj.GetCardCert();*/
	
	
	_certinfo["keysn"]=this.obj.GetSerialNumberEx(2); //0 cert 文件   1key里,2 ie里
	_certinfo["keydn"]=this.obj.GetCertDNEx(0);
	_certinfo["certuser"]=this.obj.GetSubjectNameEx(0);
	_certinfo["begintime"]=this.formatDate(this.obj.GetCertStartTimeEx(0));
	_certinfo["endtime"]=this.formatDate(this.obj.GetCertEndTimeEx(0));
	_certinfo["keycert"]=this.obj.GetCardCert();
	return _certinfo;
	
};

/**
 * 从Key中获取证书信息
 * @returns {Boolean} false 读取出错  正确：{keyid:'钥匙ID号',keysn:'证书的SN',keydn:'证书DN',certuser:'证书用户【证书所有者】',begintime:'开始时间',endtime:'截止时间',keycert:'证书公钥的base64字符串'}
 */
MakeSeal.prototype.GetInfoFromKey = function(){
	//检查控件对象
	if(this.checkObj()==false){
		return false;
	}
	
	if((this.obj.SerialNumber=="")||(this.obj.SerialNumber==null)){
	   this.Alert("读取证书信息失败，请检查key是否插入!");
	   return false;
	}else{
		
		var _certinfo={};
		_certinfo["keyid"]=this.obj.GetKeyID("");
		_certinfo["keysn"]=this.obj.SerialNumber; //1key里,2ie里
		_certinfo["keydn"]=this.obj.GetCertDN();
		_certinfo["certuser"]=this.obj.SubjectName;
		_certinfo["begintime"]=this.formatDate(this.obj.GetCertStartTimeEx(0));
		_certinfo["endtime"]=this.formatDate(this.obj.GetCertEndTimeEx(0));
		_certinfo["keycert"]=this.obj.GetCardCert();
		
		return _certinfo;
	}
};
/**
 * 对日期进行格式化
 * @param strdate 要格式化的日期
 */
MakeSeal.prototype.formatDate = function(strdate){
	if(strdate.length==14){
		return strdate.substring(0,4)+"-"+strdate.substring(4,6)+"-"+strdate.substring(6,8)+" "+strdate.substring(8,10)+":"+strdate.substring(10,12)+":"+strdate.substring(12,14);
	}else if(strdate.length==12){
		return strdate.substring(0,4)+"-"+strdate.substring(4,6)+"-"+strdate.substring(6,8)+" "+strdate.substring(8,10)+":"+strdate.substring(10,12);
	}else{
		return strdate.substring(0,4)+"-"+strdate.substring(4,6)+"-"+strdate.substring(6,8);
	}
	 
}
/**
 * 错误提示
 * @param {type} ErrCode
 * @returns ｛string｝
 */
MakeSeal.prototype.GetErrDesc = function(ErrCode) {
    switch(ErrCode) {
        case 0:
            return "正确";
        case -6:
            return "接口未实现";
        case -11:
            return "路径错误";
        case -12:
            return "印章ID错误";
        case -13:
            return "bmp图片错误";
        case -49:
            return "空间不足"
        case -120:
            return "无效的组件";
        case -121:
            return "无效的路径";
        case -131:
            return "内存溢出";
        case -142:
            return "未知'一般是空间不足'";
        case -144:
            return "没有授权";

        case -200:
            return "没有插入智能卡";
        case -201:
            return "错误的智能卡登录PIN码";
        case -202:
            return "系统未发现有效的私钥";
        case -203 :
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
            return "验证错误";

        case -211:
            return "没有印章";
        case -267:
            return "证书密码错误";
        case -268:
            return "证书无效";
        default :
            return "未知错误";
    }
    
    

};




