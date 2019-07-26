/*WSN.js
*2013-10-1 许庆磊 表单签名相关的接口及调用说明 
*/
/**
taipserver:aipserver地址，[必须] 正式地址：http://10.79.3.15:8000/sealserver/interface/;测试地址：http://10.79.1.220/sealserver/interface/
thhid:用户登录后的hhid [必须]
**/
function WS(taipserver,thhid)
{
	
	this._servid=taipserver;
	//当前用户会话id
	this._hhid=thhid;
	//签名对象ID
	this._objid="DWebSignSeal";
		
	//初始化DWebSignSeal对象
	this._wsobj=null;	
	
	//创建DWebSignSeal对象 
	this.Create=function(dwid){
		//设置hwpostil对象ID
		if(dwid!=null&&dwid!="")
			this._objid=dwid;
		else
			this._objid="DWebSignSeal";
		
		var _s = "<object id='"+this._objid+"' classid='CLSID:77709A87-71F9-41AE-904F-886976F99E40' style='filter:none;background-color:red;position:absolute;width:0px;height:0px;left:0px;top:0px;' ></object>";
		document.write(_s);	
		//初始化hwpostil对象
		this._wsobj=document.getElementById(this._objid);
	};	
	this.AppendBody=function(dwid){
		//设置hwpostil对象ID
		if(dwid!=null&&dwid!="")
			this._objid=dwid;
		else
			this._objid="DWebSignSeal";
		
		var _s = "<object id='"+this._objid+"' classid='CLSID:77709A87-71F9-41AE-904F-886976F99E40' style='filter:none;background-color:red;position:absolute;width:0px;height:0px;left:0px;top:0px;' ></object>";
		$(_s).appendTo("body");
		//初始化hwpostil对象
		this._wsobj=document.getElementById(this._objid);
	};
	//当前盖章人
	this._sealuser="";
	//设置盖章人
	this.setSealUser=function(username)
	{
		if(username!=null&&username!="")
			{
				this._sealuser=username;
			}
	};
	//签名数据,签名数据没有固定的格式，注意签名和验证时保持格式一致就可以
	this._signdata="";
	/**
	设置签名数据,签名的数据没有固定格式，只要保证签名时和验证是格式一致就可以。
	因为签名的数据在验证的时候，需要先通过SetSealSignData(印章名称，签名数据)设置后才调用ShowWebSeals显示印章。
	*/
	this.setSignData=function(tdata)
	{
		if(tdata!=null&&tdata!="")
		{
			this._signdata=tdata;
		}
	};
	
	//盖章后tips上面显示的扩展信息
	this._extinfo="";
	//设置盖章扩展信息
	this.setExInfo=function(tinfo)
	{
		if(tinfo!=null&&tinfo!="")
		{
			this._extinfo=tinfo;
		}
	};
	//盖章时间
	this._sealtime="";
	//设置盖章时间
	this.setSealTime=function(ttime)
	{
		if(ttime!=null&&ttime!="")
		{
			this._sealtime=ttime;
		}
	};
	/**
	sealName:同一流程中，印章名称不能相同，这个也必须传
	sealPostion：印章的位置，即页面上的div、td等元素的id值
	xpos:横向偏移量
	ypos:纵向偏移量
	如果盖章成功返回：true
	*/
	this.addSeal=function(sealName,sealPostion,xpos,ypos,yztype){
			if(this._wsobj==null)
			{
				alert("控件没有安装，请刷新本页面，控件会自动下载。\r\n或者下载安装程序安装。");
				return false;
			}
			
			try{	 		
					
					//1、清楚以前的数据
					this._wsobj.SetSignData("-");
					//2、设置签名数据
					if(this._signdata!=null&&this._signdata!="")//再检测是否有签名数据
					{
						//绑定数据在显示印章前必须设置验证数据才能验证通过						
						this._wsobj.SetSignData("+DATA:"+this._signdata);
					}else{
						this._wsobj.SetSignData("+DATA:nodata");
					}				
			    
					//3、设置盖章人，可以是OA的用户名
					if(this._sealuser!=null&&this._sealuser!=""){
						this._wsobj.SetCurrUser(this._sealuser);
					}
				  
				  //4、设置盖章环节ID
				  if(sealName!=null&&sealName!="")//如果印章环节ID存在就设置此环节ID
						this._wsobj.SealSetID = sealName;
					
					//5、设置印章类型： 1:公章 0：私章 
					if(this._hhid!=null&&this._hhid!="")
	        	this._wsobj.AdditionalInfo =yztype+";"+this._hhid;
	        else
	        	this._wsobj.AdditionalInfo =yztype;
					//6、网络版的设置服务器路径地址:http://10.79.1.242:8090/interface/
					//alert(this._servid);
					this._wsobj.HttpAddress = this._servid;
					//网络版的SessionID
				  //this._wsobj.RemoteID = "1023123";
					//附加信息
					if(this._extinfo!=null&&this._extinfo!="")
						this._wsobj.AppendTipInfo = this._extinfo;
					//设置盖章时间，可以有服务器传过来
					if(this._sealtime!=null&&this._sealtime!="")
			 			this._wsobj.SetCurrTime(this._sealtime);
					//7、设置当前印章的位置,相对于sealPostion1 (<div id="sealPostion1"> </div> 也可以是 td) 的位置相左偏移50px,向上偏移50px
					//这样就可以很好的固定印章的位置 this._wsobj.SetPosition(50,-50,"sealPostion1");
					if((typeof xpos)=="undefined"||xpos==null)
					    xpos=0;
					if((typeof ypos)=="undefined"||ypos==null)
					    ypos=0;
	        
					this._wsobj.SetPosition(xpos,ypos,sealPostion);
			    //8、调用盖章的接口
					if("" == this._wsobj.AddSeal("", sealName)){
						 alert("盖章失败");
						 return false;
					}
			}catch(e) {
			  alert("盖章出错：" +e.message);
			  return false;
			}
			return true;
	};
	
	/**
	获取签名后的数据，数据包括：印章数据+证书数据+签名数据...
	如果成功返回签名数据，否则返回：false;
	*/
	this.getStoreData=function()
	{
		if(this._wsobj==null)
		{
				alert("控件没有安装，请刷新本页面，控件会自动下载。\r\n或者下载安装程序安装。");
				return false;
		}
		var _tval = this._wsobj.GetStoreData();
		if(_tval.length < 200){
				alert("必须先盖章才可以获取签名数据！");
				return false;
		}
		else
			return _tval;
		
	};
	
	/**
	设置签名数据并，显示印章
	如果是用数字签名，在签名前要先调用setSignData，设置签名和验证的数据，然后再调用setStoreData设置印章和签名后的数据
	tsigndata:签名数据信息
	sealdata:签名时的印章数据:格式[{sealName:'印章名称',sealData:'盖章时的数据'},{sealName:'印章名称',sealData:'盖章时的数据'}]
	*/
	this.setStoreData=function(tsigndata,sealdata)
	{
		if(this._wsobj==null)
		{
				alert("控件没有安装，请刷新本页面，控件会自动下载。\r\n或者下载安装程序安装。");
				return false;
		}
		
		try{
			this._wsobj.SetStoreData(tsigndata);
			//显示印章
			this._wsobj.ShowWebSeals();
			if(sealdata!=null&&sealdata!=""){
				for(var i=0;i<sealdata.length;i++){
					var tmpd=sealdata[i];
					this._wsobj.SetSealSignData(tmpd.sealName,tmpd.sealData);
				}
			}else{
				//显示印章前需要设置印章签名数据
				var _td="no";
				if(this._signdata!=null&&this._signdata!="")
				{
					_td=this._signdata;
				}	
				var _strObjectName = this._wsobj.FindSeal("",0);  
				while(_strObjectName  != ""){ 
					this._wsobj.SetSealSignData(_strObjectName,_td);
					_strObjectName = this._wsobj.FindSeal(_strObjectName,0);
				}
			}
					
			
		}catch(e) {
			  alert("显示签名数据出错：" +e.message);
		}
	};	
	
	/**
	验证印章签名的数据是否有效
	sealname:要验证的印章的名称
	如果验证成功：true，否则：false
	*/
	this.verifySeal=function(sealname)
	{
		if(this._wsobj==null)
		{
				alert("控件没有安装，请刷新本页面，控件会自动下载。\r\n或者下载安装程序安装。");
				return false;
		}
		
		var tval = this._wsobj.GetStoreData();
		if(tval.length<200)
		{
			alert("必须有签名数据才能获取图片！");
			return false;
		}
		
		if(this._wsobj.VerifySeal(sealname)!=0)//验证失败
			return false;
		else
			return true; 
	};
	
	/**
	获取印章
	成功：返回的是一个数组，数组项是由[{sealName,sealPath},{sealName,sealPath},{sealName,sealPath}...]对象
	失败返回：false;
	调用例子：
	var arr_seal=websign.getSealPic();
	var i;
	for(i=0;i<arr_seal.length;i++)
	{
		//获取印章名称
		alert(arr_seal[i].sealName);
		//获取印章临时文件路径
		alert(arr_seal[i].sealPath);
	}
	
	*/
	this.getSealPic=function()
	{
		if(this._wsobj==null)
		{
				alert("控件没有安装，请刷新本页面，控件会自动下载。\r\n或者下载安装程序安装。");
				return false;
		}
		//判断是否有印章
		var tval = this._wsobj.GetStoreData();
		if(tval.length<200)
		{
			alert("必须有签名数据才能获取图片！");
			return false;
		}
		
		var _arr_tmp=new Array();
		
		//把印章临时保存图片
		var _strObjectName=this._wsobj.FindSeal("",0);
		var _vTempPath;
		var _tmpobj;
		while(_strObjectName  != ""){
			//创建对象
			_tmpobj=new Object();
			//给对象设置印章名称
			_tmpobj.sealName=_strObjectName;
			
			//获取临时文件的路径
			_vTempPath = this._wsobj.GetTempFileName();
			//把印章保存到临时文件中
			this._wsobj.GetSealBP(_strObjectName,_vTempPath);	
			
			
			//给对象设置印章图片路径
			_tmpobj.sealPath=	_vTempPath;
			//将对象添加到数组中
			_arr_tmp.push(_tmpobj);
			
			_strObjectName = this._wsobj.FindSeal(_strObjectName,0);
		}
		
		return _arr_tmp;	
	};
}