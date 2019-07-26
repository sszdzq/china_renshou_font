//重写jquery ajax的方法
(function($){
	$.ajaxSetup({
	    xhrFields: {
	        withCredentials: true
	    }
	});
	
	var _bajax=$.ajax;
	 //重写jquery的ajax方法
	$.ajax=function(opt){
		var _ppath=utils.getUrlPath();
		
		if(utils.isNull(opt.type)){
			opt.type="POST";
		}
		
		var _opt = $.extend(opt,{
			traditional:true,//阻止深度序列化，数组序列号结果：p1=["value1","value2"]-》p1=value1&p1=value2
			beforeSend:function(XMLHttpRequest){
				//XMLHttpRequest.setRequestHeader("djSafeId", _ppath);
				//显示数据加载页面
				if(utils.isNull(opt.lockPage)==false&&opt.lockPage===true){
					var val = "<div id='progress_div' class='load-container load8'><div class='loading_pic'><div class='loader'></div><div class='loading_word'>数据处理中，请稍候...</div></div></div>";
					window.jQuery("body").append(val);
				}				
            },
            complete:function(XMLHttpRequest,status){
            	if(utils.isNull(opt.lockPage)==false&&opt.lockPage===true){
            		var _cobj=window.jQuery("#progress_div");
            		if(_cobj.length>0){
            			_cobj.remove();
            		}
            	}
            }
		});
		
		return _bajax(_opt);
	};
	
	var _bpost=$.post;
	//重写Post方法
	$.post=function(turl,tdata,tsuccess,ttype){
		var _opt={url:turl,type:"POST"};
		if(utils.isNull(ttype)==false){
			_opt.dataType=ttype;
		}
		if(utils.isNull(tsuccess)==false){
			_opt.success=tsuccess;
			if(typeof(tsuccess)==="function"){
				_opt.success=tsuccess;
			}else{
				if(typeof(tsuccess)=="string"){
					_opt.dataType=tsuccess;
				}
			}
		}
		if(utils.isNull(tdata)==false){
			if(typeof(tdata)==="function"){
				_opt.success=tdata;
			}else{
				if(typeof(tdata)=="object"){
					_opt.data=tdata;
				}else if(typeof(tdata)=="string"){
					if(tdata.indexOf("=")>0){
						_opt.data=tdata;
					}else{
						_opt.dataType=tdata;
					}
				}
			}			
		}
		
		$.ajax(_opt);
	};
	var _bget=$.get;
	//重写get方法
	$.get=function(turl,tdata,tsuccess,ttype){
		var _opt={url:turl,type:"GET"};
		if(utils.isNull(ttype)==false){
			_opt.dataType=ttype;
		}
		if(utils.isNull(tsuccess)==false){
			_opt.success=tsuccess;
			if(typeof(tsuccess)==="function"){
				_opt.success=tsuccess;
			}else{
				if(typeof(tsuccess)=="string"){
					_opt.dataType=tsuccess;
				}
			}
		}
		if(utils.isNull(tdata)==false){
			if(typeof(tdata)==="function"){
				_opt.success=tdata;
			}else{
				if(typeof(tdata)=="object"){
					_opt.data=tdata;
				}else if(typeof(tdata)=="string"){
					if(tdata.indexOf("=")>0){
						_opt.data=tdata;
					}else{
						_opt.dataType=tdata;
					}
				}
			}			
		}
		
		$.ajax(_opt);
	};
	
	//扩展form的方法 $("#formid").getData()
	$.fn.extend({
		//获取form表单中对象的数据
		getData:function(){
			var jfobj=$(this);
			var ckflag=JPlaceHolder._check();
			if(jfobj.length>0){
				var retd={};
				jfobj.find("input[type='text'],input[type='hidden'],input[type='password'],textarea,select").each(function(index,titem){
					var _itmobj=$(titem);		
					var tkey=_itmobj.attr("name")||_itmobj.attr("id");
					if((_itmobj[0].tagName=="INPUT"||_itmobj[0].tagName=="input")&&ckflag==false&&_itmobj.val()==_itmobj.attr('placeholder')){
						retd[tkey]="";
					}else{
						retd[tkey]=_itmobj.val();
					}
					
				});
				
				jfobj.find("input[type='radio']:checked,input[type='checkbox']:checked").each(function(index,titem){
					var _itmobj=$(titem);		
					var tkey=_itmobj.attr("name")||_itmobj.attr("id");
					if(utils.isNull(retd[tkey])){
						retd[tkey]=_itmobj.val();
					}else{
						var _oval=retd[tkey];
						if(typeof(_oval)==="string"){
							retd[tkey]=[_oval,_itmobj.val()];
						}else{
							retd[tkey].push(_itmobj.val());
						}
					}					
				});	
				return retd;
				
			}else{
				return {};
			}
		},
		//设置form中对象的数据  $("#formid").setData(tdata)
		loadData:function(tdata){
			var jfobj=$(this);
			if(jfobj.length>0){
				var retd={};
				$("input,textarea,select",jfobj).each(function(index,titem){					
					var _itmobj=$(titem);			
					var tkey=_itmobj.attr("name")||_itmobj.attr("id");
					//兼容低版本IE获取值					
					var _tval=tdata[tkey];
					if(_tval!=null){
						_itmobj.val(_tval);
					}					
				});				
			}
		},
		//form验证初始化$("#formid").formInit()
		formInit:function(checkflag){
			//初始化form表单
			V.init(this.attr("id"));			
		},
        /**
         * 在窗口显示数据提交信息
         * @param url 后台保存数据地址
         * @param extdata 扩展数据
         * @param callback 数据保存成功后的回调函数
         * @param rettype 数据返回类型:text/json/xml等
         * @param lock 是否锁定form避免重复提交  true 锁定添加重复提交
         */
        formSubmit:function(url,extdata,callback,rettype,lock){
            var jfobj=$(this);
            //判断是否进行锁定
            if(lock!=null&&lock==true){
                if(jfobj.attr("formlock")!=null&&jfobj.attr("formlock")=="true"){
                    alert("数据已提交不能重复操作！");
                    return false;
                }
            }

            if(jfobj.validate()==false){
                msg("数据有效性验证未通过，请检查！");
                return false;
            }
            //显示数据处理
            var msg="数据处理中，请稍候...";
            var val = "<div id='progress_div' class='load-container load8'><div class='loading_pic'><div class='loader'></div><div class='loading_word'>"+msg+"</div></div></div>";
            jQuery("body").append(val);
            jfobj.attr("formlock","true");
            //获取数据
            var fdata=jfobj.getData();

            if(extdata!=null&&typeof(extdata)=="object"){
                fdata = jQuery.extend({}, fdata, extdata);
            }
            if(typeof(rettype)=="undefined"||rettype==null){
                rettype="json";
            }
            //提交数据
            jQuery.ajax({
                type:"POST",//以post方式提交数据
                url:url,
                dataType: rettype, //返回值类型 一般设置为json
                data: fdata,//除文件外的其它数据
                success: function (retval, status){ //服务器成功响应处理函数
                    if(callback){
                        callback(retval,status);
                    }
                    jQuery("#progress_div").remove();
                }
            });
        },
		//检查form数据的有效性 $("#formid").validate()
		validate:function(){
			//检查数据的有效性
			return V.validate(this.attr("id"));
		}
	});
	
})(jQuery);

////////////////////utils工具js方法/////////////////////////////
var utils={
		//时间日期验证正则表达式
		dtregs:[/^(\d{1,4})[-/](\d{1,2})[-/](\d{1,2})$/,/^(\d{1,4})[-/](\d{1,2})[-/](\d{1,2}) (\d{1,2}):(\d{1,2})$/,/^(\d{1,4})[-/](\d{1,2})[-/](\d{1,2}) (\d{1,2})$/],
		//检查当前只是不是日期
		isDate:function(tdate,tobj){
			for(var i=0;i<this.dtregs.length;i++){
				var d=tdate.match(utils.dtregs[i]);
				if(d!=null){				
					if(d.length==4){
						var date = new Date(d[1], d[2]-1, d[3]);
						if(typeof(tobj)!="undefined")
							tobj.value=(d[1]+"-"+(d[2].length==1?("0"+d[2]):d[2])+"-"+(d[3].length==1?("0"+d[3]):d[3]));
						return (date.getFullYear()==d[1]&&(date.getMonth()+1)==d[2]&&date.getDate()==d[3]);	
					}else if(d.length==6){
						var date = new Date(d[1], d[2]-1, d[3],d[4],d[5]);
		        if(typeof(tobj)!="undefined")
		            tobj.value=(d[1]+"-"+(d[2].length==1?("0"+d[2]):d[2])+"-"+(d[3].length==1?("0"+d[3]):d[3])+" "+(d[4].length==1?("0"+d[4]):d[4])+":"+(d[5].length==1?("0"+d[5]):d[5])); 
		        return (date.getFullYear()==d[1]&&(date.getMonth()+1)==d[2]&&date.getDate()==d[3]&&date.getHours()==d[4]&&date.getMinutes()==d[5]);
					}else{
						var date = new Date(d[1], d[2]-1, d[3],d[4]);
	          if(typeof(tobj)!="undefined")
	              tobj.value=(d[1]+"-"+(d[2].length==1?("0"+d[2]):d[2])+"-"+(d[3].length==1?("0"+d[3]):d[3])+" "+(d[4].length==1?("0"+d[4]):d[4]));
	              
	          return (date.getFullYear()==d[1]&&(date.getMonth()+1)==d[2]&&date.getDate()==d[3]&&date.getHours()==d[4]);
					}
				}
			}
			//如果上面没有验证通过是非日期
			return false;	
		},
		//获取时间与零时区的绝对毫秒数
		getTimezero:function(tdate){
			for(var i=0;i<utils.dtregs.length;i++){
				var d=tdate.match(utils.dtregs[i]);
				if(d!=null){
					var tstr=null;
					if(d.length==4){
						tstr=d[2]+"-"+d[3]+"-"+d[1];		
					}else if(d.length==6){
						tstr=d[2]+"-"+d[3]+"-"+d[1]+" "+d[4]+":"+d[5];		
					}else{
						tstr=d[2]+"-"+d[3]+"-"+d[1]+" "+d[4]+":";
					}
					return Date.parse(tstr);
				}
			}	
		},
		//是否为空
		isNull:function(tobj){
			if(typeof(tobj)=="undefined"||tobj==null||tobj==""||tobj.length<1){
				return true;
			}else{
				return false;
			}
		},
		//是否在两个值之间,type为：date/datetime/num/char
		isBetween:function(tval,tmax,tmin,ttype){
			//日期类型值
			if(ttype=="date"||ttype=="datetime"){
				var flag=true;
				if(!utils.isNull(tval)&&!utils.isNull(tmax)){
					flag=utils.getTimezero(tval)<=utils.getTimezero(tmax);				
				}
				
				if(flag&&!utils.isNull(tval)&&!utils.isNull(tmin)){
					flag=utils.getTimezero(tval)>=utils.getTimezero(tmin);				
				}
				
				return flag;
			}else if(ttype=="num"){
				var flag=true;
				if(!utils.isNull(tval)){
					var tmpv=tval.replace(/,/g,"");
					//非数字直接返回
					if(isNaN(tmpv))
						return false;
						
					if(!utils.isNull(tmax)&&!isNaN(tmax)){
						flag=parseFloat(tmpv)<=parseFloat(tmax);
					}
					if(flag&&!utils.isNull(tmin)&&!isNaN(tmin)){
						flag=parseFloat(tmpv)>=parseFloat(tmin);
					}
				}			
				return flag;
			}else if(ttype=="char"){//字符串只判断字符串长度
				var flag=true;
				if(!utils.isNull(tval)&&!utils.isNull(tmax)){
					flag=utils.getLength(tval)<=parseInt(tmax);				
				}
				if(flag&&!utils.isNull(tval)&&!utils.isNull(tmin)){
					flag=utils.getLength(tval)>=parseInt(tmin);				
				}
				
				return flag;
			}else{
				return true;
			}
		},
		//获取字符串长度
		getLength: function(str) {
			 return str.replace(/([^\x00-\xFF])/g,'**').length;
		},
		getContextPath:function(){
	    	var location = (window.location.href+"").split('/');
	    	var basePath = '/'+location[3];
	    	return basePath;
	    },
	    getUrlPath:function(){
	    	var _locations = (window.location.href+"").split('/');
	    	var _path ="";
	    	for(var i=3;i<_locations.length;i++){
	    		_path+="/"+_locations[i];
	    	}
	    	return Base64.encode(_path);
	    }
	};
//////////////////////////////end utils.js////////////////

/////////////////////////////base64编码///////////////
~(function(root, factory) {
	  if (typeof define === "function" && define.amd) {
	    define([], factory);
	  } else if (typeof module === "object" && module.exports) {
	    module.exports = factory();
	  } else {
	    root.Base64 = factory();
	  }
	}(this, function() {
	   'use strict';
	   
	    function Base64() {
	        // private property
	        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	    }
	    //public method for encoding
	    Base64.prototype.encode = function (input) {
	        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
	        input = this._utf8_encode(input);
	        while (i < input.length) {
	            chr1 = input.charCodeAt(i++);
	            chr2 = input.charCodeAt(i++);
	            chr3 = input.charCodeAt(i++);
	            enc1 = chr1 >> 2;
	            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	            enc4 = chr3 & 63;
	            if (isNaN(chr2)) {
	                enc3 = enc4 = 64;
	            } else if (isNaN(chr3)) {
	                enc4 = 64;
	            }
	            output = output +
	            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	        }
	        return output;
	    }

	    // public method for decoding
	    Base64.prototype.decode = function (input) {
	        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
	        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	        while (i < input.length) {
	            enc1 = this._keyStr.indexOf(input.charAt(i++));
	            enc2 = this._keyStr.indexOf(input.charAt(i++));
	            enc3 = this._keyStr.indexOf(input.charAt(i++));
	            enc4 = this._keyStr.indexOf(input.charAt(i++));
	            chr1 = (enc1 << 2) | (enc2 >> 4);
	            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	            chr3 = ((enc3 & 3) << 6) | enc4;
	            output = output + String.fromCharCode(chr1);
	            if (enc3 != 64) {
	                output = output + String.fromCharCode(chr2);
	            }
	            if (enc4 != 64) {
	                output = output + String.fromCharCode(chr3);
	            }
	        }
	        output = this._utf8_decode(output);
	        return output;
	    }

	    // private method for UTF-8 encoding
	    Base64.prototype._utf8_encode = function (string) {
	        string = string.replace(/\r\n/g,"\n");
	        var utftext = "";
	        for (var n = 0; n < string.length; n++) {
	            var c = string.charCodeAt(n);
	            if (c < 128) {
	                utftext += String.fromCharCode(c);
	            } else if((c > 127) && (c < 2048)) {
	                utftext += String.fromCharCode((c >> 6) | 192);
	                utftext += String.fromCharCode((c & 63) | 128);
	            } else {
	                utftext += String.fromCharCode((c >> 12) | 224);
	                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	                utftext += String.fromCharCode((c & 63) | 128);
	            }
	    
	        }
	        return utftext;
	    }

	    // private method for UTF-8 decoding
	    Base64.prototype._utf8_decode = function (utftext) {
	        var string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
	        while ( i < utftext.length ) {
	            c = utftext.charCodeAt(i);
	            if (c < 128) {
	                string += String.fromCharCode(c);
	                i++;
	            } else if((c > 191) && (c < 224)) {
	                c2 = utftext.charCodeAt(i+1);
	                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	                i += 2;
	            } else {
	                c2 = utftext.charCodeAt(i+1);
	                c3 = utftext.charCodeAt(i+2);
	                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	                i += 3;
	            }
	        }
	        return string;
	    }
	    
	    var Base = new Base64();
	    
	    return Base;
	}));
///////////////////////////end base64编码///////////////////////




//////////////////////数据验证相关方法/////////////////////////////////////////////////////////////////////
var V = {
		_basePath:"/"+window.location.href.split("/")[3],
		_iform:{},
		_checkflag:false,//是否在初始化的时候进行检查
		 /**
		  * 通过formid对form中的元素进行验证初始化
		  * @param formid
		  * @param checkflag  是否在初始化的时候进行检查
		  */
		init : function(formid,checkflag){
			if(!utils.isNull(checkflag)){
				V._checkflag=checkflag;
			}
			
			//获取form对象
			var _formobj=$("#"+formid);
			
			//处理必须填写的字段标签的
			_formobj.find(".table_insert .must").each(function(index,titem){
				
				 var _item=$(titem);
				 var _thtml=_item.html();
				 //console.log(_thtml);
				 _item.html("<font color='red'>*</font>"+_thtml);
			 });
		
			 
			_formobj.find("input[type='text'],input[type='password'],textarea,select").each(function(index,titem){
				 var _item=$(titem);
				 //为select对象设置选中值
				 if(_item[0].tagName=="SELECT"||_item[0].tagName=="select"){
					 
					 var _val=_item.attr("val");
					 if(_val!=null&&_val!=""){
						 _item.val(_val);
					 }
					//设置dataflag来获取值
					 if(_item.attr("dataflag")!=null&&_item.attr("dataflag")!=""){
						 var _param={};
						 _param["dataflag"]=_item.attr("dataflag");
						 $.ajax({
	         				url : V._basePath+"/commonlist/getListData.mvc",
	         				type:"POST",
	         				data : _param,
	         				dataType : "json",
	         				success : function(retdata) {
	         					if(retdata.length>0){
	         						$.each(retdata,function(index,item){
	         							var _selected="";
	         							if(_val!=null&&_val!=""&&_val==item.value){
	         								_selected="selected=\"selected\"";
	         							}
	         							var _topt=$("<option value=\""+item.value+"\" "+_selected+" >"+item.text+"</option>");
	         							_topt.appendTo(_item);
	         						});
	         					}
	         				}
	         			});
					 }
				 }
				 
				 
				 var _ctype=_item.attr("checktype");
				 if(!utils.isNull(_ctype)){
					_item.off("blur");
					_item.off("focus");
					_item.on("blur",function(){
						 var _tobj=$(this);
						 _tobj.removeClass('form_input_hover');
						 V._checkObj(_tobj);					
					});
					_item.on("focus",function(){
						 var _tobj=$(this);
						 _tobj.addClass('form_input_hover');
						 V._checkObj(_tobj);					
					});
					//在需要检测的对象上设置提示属性				
					
					//设置页面中对象的原始值yval,为了在修改的时候existsurl判断做准备 existurl
					if(_item.attr("existurl")!=null&&_item.attr("existurl")!=""){
						_item.attr("yval",_item.val());
					}
					
					
					//触发focus验证数据
					if(V._checkflag==true){
//						if(_item.val()==""&&_ctype.indexOf("b")>=0&&_ctype!="mobile")
						{
							_item.focus();
						}
					}
					
					 
					//处理值相等的事件
					var _eqid=_item.attr("eqid");
					if(!utils.isNull(_eqid)){
						var _eqobj=$("#"+_eqid);
						if(_eqobj!=null){
							_eqobj.on("blur",function(){						
								V._checkObj(_item);
							});
						}
					}
				 }else{
					 //添加已经验证过标示
					 _item.addClass('has-success');
				 }
				 
			});
			
			//设置初始化标示
			V._iform[formid]=true;
			 
		 },
		 /**
		  * 验证指定form数据的有效性
		  * @param {Object} formid
		  */
		 validate:function(formid){
		 	if(utils.isNull(V._iform[formid])||V._iform[formid]==false){
		 		V.init(formid);
		 	}
		 	//检查是不是已经处理完成
		 	var _formobj=$("#"+formid);
		 	var _flag=true;
		 	_formobj.find("input[type='text'],input[type='password'],textarea,select").each(function(index,titem){
				var _item=$(titem);			
				if(!utils.isNull(_item.attr("checktype"))){
					
					if(!_item.hasClass('has-success')){
						var _ret=V._checkObj(_item);
						if(_ret==false){
							_flag=false;
						}
					}
				}
			});
		 	
			return _flag;
		 },
		 /**
		  * 检查数据的有效性 支持的检查类型：num[数字]/date[日期]/ datetime[日期时间]/ mobile[手机]/ email[邮箱]/ userid[登陆用户id]/ password[用户密码]/phone[电话]/cardid[身份证]/zzjgid[组织机构代码]
		  * @param evt
		  */
		 _checkObj:function(jqobj){
			var ttype=jqobj.attr('checktype');//检查类型
			var tlabel=jqobj.attr('label');//提示标签
			var tvalue=jqobj.val();//对象的值	
			var tminval=jqobj.attr("min");//最小值或字符最小长度		
			var tmaxval=jqobj.attr("max");//最大值或字符最大长度
			
			var tminlength=jqobj.attr("minlength")||tminval;//最小长度
			var tmaxlength=jqobj.attr("maxlength")||tmaxval;//最大长度
				 
			var t_type=ttype.toLowerCase();
			
			//值必须性检查
			if(/^\s+$/gi.test(tvalue)||tvalue==""){
				if((t_type=="b"||t_type.indexOf("b_")>-1)){
					return V.hasError(jqobj,tlabel||'不能为空');
				}
			}
					
			//值有效性检查
			var m_match="";
			if(t_type.indexOf("num")>-1){//数字型的数据验证			
				var regnum=/^(-|\+)?\d[,|\d]*(\.\d+)?$/;
				if(regnum.test(tvalue)){				
					
					if(!utils.isNull(tmaxlength)||utils.isNull(tminlength)){
						if(!utils.isBetween(tvalue,tmaxlength,tminlength,"char")){
							if(utils.isNull(tmaxlength)){
								return V.hasError(jqobj,tlabel||"不少于"+tminlength+"位的数字");
							}else{
								return V.hasError(jqobj,tlabel||tminlength+"~"+tmaxlength+"位的数字");
							}
						}
					}			
					
					
					if(!utils.isNull(tmaxval)||!utils.isNull(tminval)){
						if(!utils.isBetween(tvalue,tmaxval,tminval,"num")){
							var tmsg="输入数字必须";
							if(!utils.isNull(tminval))
								tmsg+="大于'"+tminval+"'";
							if(!utils.isNull(tmaxval))
								tmsg+="小于'"+tmaxval+"'";
																					
							return V.hasError(jqobj,tlabel||tmsg);
						}
					}				
				}else{				
					return V.hasError(jqobj,tlabel||"请输入数字");
				}
			}else if(t_type.indexOf("date")>-1||t_type.indexOf("datetime")>-1){//日期时间类型验证
				
				if(utils.isDate(tvalue,tobj)){
					if(!utils.isNull(tmaxval)||!utils.isNull(tminval)){
						if(!utils.isBetween(tvalue,tmaxval,tminval,"date")){
							var tmsg="日期必须";
							if(!utils.isNull(tobj.minvalue))
								tmsg+="大于'"+tobj.minvalue+"'";
							if(!utils.isNull(tmaxval))
								tmsg+="小于'"+tmaxval+"'";
																					
							return V.hasError(jqobj,tlabel||tmsg);
						}
					}				
				}else{
					return V.hasError(jqobj,tlabel||"请输入日期,格式:2016-2-18");
				}
			}
			
			
			else if(t_type.indexOf("zsxm")>-1){
				var zsxm =/^[\u4e00-\u9fa5]+$/; 
				if(!zsxm.test(tvalue)){
					return V.hasError(jqobj,tlabel||"请输入汉字");
				}
				if(tvalue.length<2||tvalue.length>10){
					return V.hasError(jqobj,tlabel||"长度为2-10个字");
				}
			}
			else if(t_type.indexOf("email")>-1){//Email地址验证
				var regmail=/^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|net|cn|net\.cn|org|biz|info|gov|gov\.cn|edu|edu\.cn)/;
				if(!regmail.test(tvalue)){
					return V.hasError(jqobj,tlabel||"请输入Email,格式:name@163.com");
				}
			}else if(t_type.indexOf("phone")>-1){//电话号码验证
				var regph=/^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
				if(!regph.test(tvalue)){
					return V.hasError(jqobj,tlabel||"请输入电话号码");
				}
				
			}else if(t_type.indexOf("mobile")>-1){//手机号码验证
				var regmb=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if(!regmb.test(tvalue)){
					return V.hasError(jqobj,tlabel||"请输入11位手机号");				
				}
			}else if(t_type.indexOf("cardid")>-1){//身份证验证
				var m_match=/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[Xx]$)/;//军官证
				if(!m_match.test(tvalue)){
					return V.hasError(jqobj,tlabel||"请输入有效的身份证");
				}
			}else if(t_type.indexOf("userid")>-1){//验证用户ID
				var m_match = /^([a-zA-Z0-9]+)*$/; 
			    var _min=tminlength||'6';
			    var _max=tmaxlength||'9';
				if(!tvalue.match(m_match)){				
					return V.hasError(jqobj,_min+"~"+_max+"位的字母、数字");
				}
				
				if(!utils.isBetween(tvalue,_max,_min,"char")){				
					return V.hasError(jqobj,_min+"~"+_max+"位的字母、数字");
				}
			}else if(t_type.indexOf("char")>-1){//验证字符串
				var m_match = /^([a-zA-Z0-9]+)*$/; 
			    var _min=tminlength||'6';
			    var _max=tmaxlength;
			    
				if(!tvalue.match(m_match)){
					if(utils.isNull(_max)){
						return V.hasError(jqobj,"不少于"+_min+"位的字母、数字");
					}else{
						return V.hasError(jqobj,_min+"~"+_max+"位的字母、数字");
					}				
				}
				
				if(!utils.isBetween(tvalue,_max,_min,"char")){
					if(utils.isNull(_max)){
						return V.hasError(jqobj,"不少于"+_min+"位的字母、数字");
					}else{
						return V.hasError(jqobj,"请输入"+_min+"位的数字，或者"+_max+"位的字母、数字");
					}
				}
				
			
				
			}else if(t_type.indexOf("password")>-1){//验证用户ID
				var m_match = /^([a-zA-Z0-9]+)*$/; 
			    var _min=tminlength||'6';
			    var _max=tmaxlength;
			    
				if(!tvalue.match(m_match)){
					if(utils.isNull(_max)){
						return V.hasError(jqobj,"不少于"+_min+"位的字母、数字");
					}else{
						return V.hasError(jqobj,_min+"~"+_max+"位的字母、数字");
					}				
				}
				
				if(!utils.isBetween(tvalue,_max,_min,"char")){
					if(utils.isNull(_max)){
						return V.hasError(jqobj,"不少于"+_min+"位的字母、数字");
					}else{
						return V.hasError(jqobj,_min+"~"+_max+"位的字母、数字");
					}
				}
				
				var _eqid=jqobj.attr("eqid");
				if(!utils.isNull(_eqid)){
					var tpass=$("#"+_eqid).val();
					if(tpass!=tvalue&&!utils.isNull(tpass)){
						return V.hasError(jqobj,"输入的密码不一致");
					}
				}
				
			}else if(t_type.indexOf("zzjgid")>-1){//验证组织机构代码
				var m_match = /^([0-9A-Z]){8}-[a-zA-Z0-9]$/; //此处的正字表达式
				if(!tvalue.match(m_match)){
					return V.hasError(jqobj,"机构代码不正确");
				}			
			}		
			
			
			//检查数据是否存在
			var texisturl=jqobj.attr("existurl");
			if(utils.isNull(texisturl)){			
				//设置验证成功标示
				return V.success(jqobj);
			}else{			
				//值为空不进行后台验证
				if(tvalue==""){
					return V.success(jqobj);
				}
				//如果是获取焦点事件也不进行后台验证
				if(jqobj.hasClass("form_input_hover")){
					return V.success(jqobj);
				}
				//如果值没有发生改变也不进行后台验证
				if(tvalue==jqobj.attr("yval")){
					return V.success(jqobj);
				}
				
				var tdata={};
				tdata[jqobj.attr("name")||jqobj.attr("id")]=tvalue;
								
				var _exflag=false;
				$.ajax({
					type:"post",
					url:texisturl+"?_rnum="+Math.random(),
					data: tdata,
					async:false,
					success: function (result) {
						//对象存在
						if(result=="true"||result==true){
							layer.msg("'"+tvalue+"'已经存在");
							_exflag = V.hasError(jqobj,"'"+tvalue+"'已经存在");
						}else if(result=="false"||result==false){
							_exflag = V.success(jqobj);
						}
						
						
					},
					error:function(){
						_exflag = V.hasError(jqobj,"验证出错");					
					}
				});
				
				return _exflag;
			}
		},	
		// 表单状态信息提示 ---错误 显示提示信息
		hasError : function(tobj,txt){
			var tjqobj=$(tobj);
			tjqobj.attr("title",txt);
			tobj.addClass("has-error").removeClass("has-success");
			//设置样式
			if(V.isIE8()){
		 		tjqobj.css({"border": "1px solid rgb(245,114,144)"})
		 	}else{
				tjqobj.css({"border-color":"rgba(243, 75, 111, 0.8)",
					"outline":"0",
					"outline":"thin dotted 0.1",
					"-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(243, 72, 72, 0.6)",
		     		"-moz-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(243, 72, 72, 0.6)",
		          	"box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(243, 72, 72, 0.6)"});
		 	}
			return false;
		 },	 
		 // 表单状态信息提示 ----成功  隐藏提示信息
		 success : function(tobj){
		 	var tjqobj=$(tobj);
		 	
	 		tjqobj.css({"border-color":"",
		 		"outline":"",
		 		"outline":"",
				"-webkit-box-shadow": "",
	     		"-moz-box-shadow": "",
	          	"box-shadow": ""});
		 	
		 	
		 	tjqobj.attr("title","");
			tobj.addClass("has-success").removeClass("has-error");
			return true;
		 },
		 isIE8:function(){
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
				var browser=navigator.appName;
				var bversion=navigator.appVersion.split(";");
				if(bversion.length>1){
					var version=bversion[1].replace(/[ ]/g,"");
					if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
						if(browser=="Microsoft Internet Explorer" && version=="MSIE8.0" || browser=="Microsoft Internet Explorer" && version=="MSIE9.0") {
							return true;
						}else{
							return false;
						}
					}else{
						return false;
					}
				}else{
					return false;
				}
				
						
		 }
		 
	};
//////////////////end 数据验证///////////////////////////////


////////////////placeholder////////////////////////////////

/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author JENA
 * @since 20131115.1504
 * @website ishere.cn
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复,此处只
    fix : function(){
        jQuery('#search_form input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');            
            if(!self.val()){
            	self.css({color:'#aaa'});
            	self.val(txt);
            }
            self.focusin(function(e) {
            	if(self.val()==txt){
            		self.val('');
            	}            		
            	self.css({color:'#000000'});
            }).focusout(function(e) {
                if(!self.val()){
                	self.css({color:'#aaa'});
                	self.val(txt);
                }
            });
        });
    }
};

/**
 * 屏蔽password的复制、剪切、粘土
 */
$(document).ready(function() {
	//修复ie6、7、8、9的PlaceHolder不显示问题
	JPlaceHolder.init();	
	$("input[type=password]").bind("copy cut paste",function(e){
		  return false;
	});
	
		
});
////////////////////////end PlaceHolder///////////////////////



