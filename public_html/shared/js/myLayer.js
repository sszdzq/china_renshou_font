(function ($) {
	/**
	初始化左右结构
	*/
	var bottomHeight_=0;
	function _initlr(_mobj,lobj,robj){
			var _lobj=lobj;
			var _robj=robj;
			//初始化左侧部分
			if(_lobj.length>0){
				var _lwidth=_lobj.attr("width")||200;
				var _lct=_lobj.attr("controle")||false;
				_lobj.css({"width":""+_lwidth+"px"});
				//显示控制按钮
				if(_lct==true||_lct=="true"){
					var _cleft=_lwidth*1+5+12;
					var _lbutton=$("<button class=\"le\"></button>");
					_lbutton.appendTo(_lobj);
					_lbutton.on("click",function(e){
						var _bt=$(this);
						var _dl=_bt.parent(".leftLayer");
						var _dc=_dl.parent();
						var _dm=_dc.find(".centerLayer");
						var _lct=_dl.find(".divcontent");						
						//展开
						if(_dl.innerWidth()<=1){
							var _rw=_dl.attr("width")||"200";
							_dl.css({"width":""+_rw+"px"});
							_dm.css({"left":""+(_rw*1+17)+"px"});
							_bt.removeClass("ri");
							_bt.addClass("le");
							_lct.css({"display":"block"});
						}else{
							_dl.css({"width":"0px"});
							_dm.css({"left":"17px"});
							_bt.removeClass("le");
							_bt.addClass("ri");
							_lct.css({"display":"none"});
						}
						
						//调整grid的高度和宽度
						_dm.find(".gridcontent").each(function(index,item){
							var _jdiv=$(item).children(".ui-jqgrid");
							if(_jdiv.length>0){
								var _jqid=_jdiv.attr("id").substring(5);
								$("#"+_jqid).jqGrid("autoSize");
							}
						});

					});
					
					_mobj.css({"left":""+_cleft+"px","border-left":"1px solid #efefef"});
				}else{
					var _cleft=_lwidth*1+5;
					_mobj.css({"left":""+_cleft+"px"});
				}
				
			}
			//初始化右侧部分
			if(_robj.length>0){
				var _rwidth=_robj.attr("width")||200;
				var _rct=_robj.attr("controle")||false;
				_robj.css({"width":""+_rwidth+"px"});
				//显示控制按钮
				if(_rct==true||_rct=="true"){
					var _cright=_rwidth*1+5+12;
					var _rbutton=$("<button class=\"ri\"></button>");
					_rbutton.appendTo(_robj);
					_rbutton.on("click",function(e){
						var _bt=$(this);
						var _dr=_bt.parent(".rightLayer");
						var _dc=_dr.parent();
						var _dm=_dc.find(".centerLayer");
						var _rct=_dr.find(".divcontent");
						//展开
						if(_dr.innerWidth()<=1){
							var _rw=_dr.attr("width")||"200";
							_dr.css({"width":""+_rw+"px"});
							_dm.css({"right":""+(_rw*1+17)+"px"});
							_bt.removeClass("le");
							_bt.addClass("ri");
							_rct.css({"display":"block"});
						}else{						
							_dr.css({"width":"0px"});
							_dm.css({"right":"17px"});
							_bt.removeClass("ri");
							_bt.addClass("le");
							_rct.css({"display":"none"});
						}
						
						//调整grid的高度和宽度
						_dm.find(".gridcontent").each(function(index,item){
							var _jdiv=$(item).children(".ui-jqgrid");
							if(_jdiv.length>0){
								var _jqid=_jdiv.attr("id").substring(5);
								$("#"+_jqid).jqGrid("autoSize");
							}
						});
						
					});					
					_mobj.css({"right":""+_cright+"px","border-right":"1px solid #efefef"});
				}else{
					var _cright=_rwidth*1+5;
					_mobj.css({"right":""+_cright+"px"});
				}
			}
			//检查是否有其它结构
		var _tttb=_mobj.find(".middleLayer");
		if(_tttb.length>0){
			var _tobj=_mobj.find(".topLayer");
			var _bobj=_mobj.find(".bottomLayer");
			_inittb(_tttb,_tobj,_bobj);
		}

	}
	function _inittb(_mobj,tobj,bobj){
		var _tobj=tobj;
		var _bobj=bobj;
		//初始化上部
		if(_tobj.length>0){
			var _tht=_tobj.attr("height")||200;
			var _tct=_tobj.attr("controle")||false;
			_tobj.css({"height":""+_tht+"px"});
			//显示控制按钮
			if(_tct==true||_tct=="true"){
				var _mtp=_tht*1+5+12;
				var _tbtn=$("<button class=\"up\"></button>");
				_tbtn.appendTo(_tobj);
				_tbtn.on("click",function(e){
					var _bt=$(this);
					var _dt=_bt.parent(".topLayer");
					var _dc=_dt.parent();
					var _dm=_dc.find(".middleLayer");
					var _tct=_dt.find(".divcontent");						
					//展开
					if(_dt.innerHeight()<=1){
						var _th=_dt.attr("height")||200;
						_dt.css({"height":""+_th+"px"});
						_dm.css({"top":""+(_th*1+17)+"px"});
						_bt.removeClass("down");
						_bt.addClass("up");
						_tct.css({"display":"block"});
					}else{
						_dt.css({"height":"0px"});
						_dm.css({"top":"17px"});
						_bt.removeClass("up");
						_bt.addClass("down");
						_tct.css({"display":"none"});
					}
					//调整grid的高度和宽度
					_dm.find(".gridcontent").each(function(index,item){
						var _jdiv=$(item).children(".ui-jqgrid");
						if(_jdiv.length>0){
							var _jqid=_jdiv.attr("id").substring(5);
							$("#"+_jqid).jqGrid("autoSize");
						}
					});

				});
				
				_mobj.css({"top":""+_mtp+"px","border-bottom":"1px solid #efefef"});
			}else{
				var _mtp=_tht*1+5;					
				_mobj.css({"top":""+_mtp+"px"});
			}
			
		}

		//初始化下部
		
		if(_bobj.length>0){
			var _bht=_bobj.attr("height")||200;
			var _bct=_bobj.attr("controle")||false;
			_bobj.css({"height":""+_bht+"px"});
			//显示控制按钮
			if(_bct==true||_bct=="true"){
				var _mtp=_bht*1+5+12;
				var _bbtn=$("<button class=\"down\"></button>");
				_bbtn.appendTo(_bobj);
				_bbtn.on("click",function(e){
					var _bt=$(this);
					var _dt=_bt.parent(".bottomLayer");
					var _dc=_dt.parent();
					var _dm=_dc.find(".middleLayer");
					var _tct=_dt.find(".divcontent");						
					//展开
					if(_dt.innerHeight()<=1){
						var _th=bottomHeight_||200;
						_dt.css({"height":""+_th+"px"});
						_dm.css({"bottom":""+(_th*1+17)+"px"});
						_bt.removeClass("up");
						_bt.addClass("down");
						_tct.css({"display":"block"});
						bottomHeight_=0;
					}else{
						bottomHeight_=_dt.height();
						_dt.css({"height":"0px"});
						_dm.css({"bottom":"17px"});
						_bt.removeClass("down");
						_bt.addClass("up");
						_tct.css({"display":"none"});
					}
					
					//调整grid的高度和宽度
					_dm.find(".gridcontent").each(function(index,item){
						var _jdiv=$(item).children(".ui-jqgrid");
						if(_jdiv.length>0){
							var _jqid=_jdiv.attr("id").substring(5);
							$("#"+_jqid).jqGrid("autoSize");
						}
					});

				});
				
				_mobj.css({"bottom":""+_mtp+"px","border-top":"1px solid #efefef"});
			}else{
				var _mtp=_bht*1+5;
				_mobj.css({"bottom":""+_mtp+"px"});
			}
			
		}

		//检查是否有其它结构
		var _ttlr=_mobj.find(".centerLayer");
		if(_ttlr.length>0){
			var _lobj=_mobj.find(".leftLayer");
			var _robj=_mobj.find(".rightLayer");
			_initlr(_ttlr,_lobj,_robj);
		}

	}
	/**
	*初始化layer
	**/
	function init(target,param){
		var _t = $(target);		
		var _tid=_t.attr("id");
		var _lrobj=$("#"+_tid+">.centerLayer");
		var _tbobj=$("#"+_tid+">.middleLayer");		
		//左右布局
		if(_lrobj.length>0){
			var _lobj=$("#"+_tid+">.leftLayer");
			var _robj=$("#"+_tid+">.rightLayer");
			_initlr(_lrobj,_lobj,_robj);

		}else if(_tbobj.length>0){//上下布局
			var _tobj=$("#"+_tid+">.topLayer");
			var _bobj=$("#"+_tid+">.bottomLayer");
			_inittb(_tbobj,_tobj,_bobj);

		}
	}

	function showLeft(target){
		var _t = $(target);
		var _dl=_t.find(".leftLayer");
		if(_dl.length>0){
			var _dc=_dl.parent();
			var _dm=_dc.find(".centerLayer");
			var _lct=_dl.find(".divcontent");	
			var _bt=_dl.find("button[class='ri']");
			//展开		
			var _rw=_dl.attr("width")||"200";
			_dl.css({"width":""+_rw+"px"});
			_dm.css({"left":""+(_rw*1+17)+"px"});
			_bt.removeClass("ri");
			_bt.addClass("le");
			_lct.css({"display":"block"});
			
		}
	}
	function hiddenLeft(target){
		var _t = $(target);
		var _dl=_t.find(".leftLayer");
		if(_dl.length>0){
			var _dc=_dl.parent();
			var _dm=_dc.find(".centerLayer");
			var _lct=_dl.find(".divcontent");
			var _bt=_dl.find("button[class='le']");
			
			_dl.css({"width":"0px"});
			_dm.css({"left":"17px"});
			_bt.removeClass("le");
			_bt.addClass("ri");
			_lct.css({"display":"none"});
			
		}
	}
	function showRight(target){
		var _t = $(target);
		var _dr=_t.find(".rightLayer");
		if(_dr.length>0){
			var _dc=_dr.parent();
			var _dm=_dc.find(".centerLayer");
			var _rct=_dr.find(".divcontent");
			var _bt=_dr.find("button[class='le']");
			//展开			
			var _rw=_dr.attr("width")||"200";
			_dr.css({"width":""+_rw+"px"});
			_dm.css({"right":""+(_rw*1+17)+"px"});
			_bt.removeClass("le");
			_bt.addClass("ri");
			_rct.css({"display":"block"});
		}
		
	}
	function hiddenRight(target){
		var _t = $(target);
		var _dr=_t.find(".rightLayer");
		if(_dr.length>0){
			var _dc=_dr.parent();
			var _dm=_dc.find(".centerLayer");
			var _rct=_dr.find(".divcontent");
			var _bt=_dr.find("button[class='ri']");
			//展开			
			_dr.css({"width":"0px"});
			_dm.css({"right":"17px"});
			_bt.removeClass("ri");
			_bt.addClass("le");
			_rct.css({"display":"none"});
		}		
	}
	function showTop(target){
		var _t = $(target);
		var _dt=_t.find(".topLayer");
		if(_dt.length>0){
			var _dc=_dt.parent();
			var _dm=_dc.find(".middleLayer");
			var _tct=_dt.find(".divcontent");
			var _dt=_dr.find("button[class='down']");
			//展开
			var _th=_dt.attr("height")||200;
			_dt.css({"height":""+_th+"px"});
			_dm.css({"top":""+(_th*1+17)+"px"});
			_bt.removeClass("down");
			_bt.addClass("up");
			_tct.css({"display":"block"});
		}
		
			
		
	}
	function hiddenTop(target){
		var _t = $(target);
		var _dt=_t.find(".topLayer");
		if(_dt.length>0){
			var _dc=_dt.parent();
			var _dm=_dc.find(".middleLayer");
			var _tct=_dt.find(".divcontent");
			var _dt=_dr.find("button[class='up']");
			//展开
			_dt.css({"height":"0px"});
			_dm.css({"top":"17px"});
			_bt.removeClass("up");
			_bt.addClass("down");
			_tct.css({"display":"none"});
		}
		
		
	}
	function showBottom(target){
		var _t = $(target);
	
		var _dt=_t.find(".bottomLayer");
		if(_dt.length>0){
			var _dc=_dt.parent();
			var _dm=_dc.find(".middleLayer");
			var _tct=_dt.find(".divcontent");
			var _bt=_dt.find("button[class='up']");
			var _th=_dt.attr("height")||200;
			_dt.css({"height":""+_th+"px"});
			_dm.css({"bottom":""+(_th*1+17)+"px"});
			_bt.removeClass("up");
			_bt.addClass("down");
			_tct.css({"display":"block"});
		}		
	}
	function hiddenBottom(target){
		
		var _t = $(target);
		
		var _dt=_t.find(".bottomLayer");
		if(_dt.length>0){
			var _dc=_dt.parent();
			var _dm=_dc.find(".middleLayer");
			var _tct=_dt.find(".divcontent");
			var _bt=_dt.find("button[class='down']");
			
			_dt.css({"height":"0px"});
			_dm.css({"bottom":"17px"});
			_bt.removeClass("down");
			_bt.addClass("up");
			_tct.css({"display":"none"});
		}
	}

	

	$.fn.mylayer = function(options, param){
		if (typeof options == 'string'){
			return $.fn.mylayer.methods[options](this, param);
		}
	};

	$.fn.mylayer.defaults = {
		showButton:false
	};

	$.fn.mylayer.methods = {
		init:function(jq,param){
			return init(jq,param);
		},
		showLeft:function(jq){
			return showLeft(jq);
		},
		hiddenLeft:function(jq){
			return hiddenLeft(jq);
		},
		showRight:function(jq){
			return showRight(jq);
		},
		hiddenRight:function(jq){
			return hiddenRight(jq);
		},
		hiddenTop:function(jq){
			return hiddenTop(jq);
		},
		showTop:function(jq){
			return showTop(jq);
		},
		hiddenBottom:function(jq){
			return hiddenBottom(jq);
		},
		showBottom:function(jq){
			return showBottom(jq);
		}
			
	};	
	$.fn.extend({
		 mylayer: $.fn.mylayer
	});

})(jQuery);