	//获取数据
	$(function(){
		var params = location.search;
		var myId = getParam(params, "id");
		var indexId = getParam(params, "indexid");
		var deobj=[];
		$.get("../json/goods.json", function(reponseData){
			var data =  reponseData.index;
			
			for(var i=0 ; i<data .length; i++){
				
				if(data[i].id == indexId){
					
					var productobj = data[i].product;
					for(var j=0; j<productobj.length; j++){
						var dearr = productobj[j];
						if(dearr.id==myId){
							deobj = dearr;
							refreshUI(deobj);
							console.log(deobj);
							var myObj={
								id:deobj.id,
								img:deobj.img,
								title:deobj.title,
								unit:deobj.unit,
								price:deobj.price,
								shop:deobj.shop,
								num: 1,
								checked: true 
							}
							//消除冒泡
							$(".but").click(function(event){
								event.stopPropagation(); 
								event.preventDefault(); 
							})
							$(".detials-relative").click(function(event){
								event.stopPropagation(); 
								event.preventDefault(); 
							})
							
							var deval = $(".details-unm").val();
							var addFlag = false;
							var reFlag = false;	
							//加 +
						
							$(".detials-add").click(function(){
								addFlag =true;
								deval++;
								$(".details-unm").val(deval);
							})
							
							// 减 -
							$(".detials-reduce").click(function(){
								reFlag =true
								deval--;
								if(deval <1 ){
									deval = 1;
								}
								$(".details-unm").val(deval);
							})
							
							$(".but #addcat").click(function(event){
								$(".addcar-prompt").show().fadeOut(2000);
								if( addFlag || reFlag){
									var denum = $.cookie("totalnum") ? JSON.parse($.cookie("totalnum")) : 0;
									var cookieArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
									var isExist = false;
									for(var k=0; k<cookieArr.length; k++){
										if(cookieArr[k].id == myObj.id){
											cookieArr[k].num = Number(cookieArr[k].num)+ Number(deval);
											denum = Number(deval) + Number(denum);
											$(".num").html(denum);
											isExist= true;
											break;
										}
									}
									if(!isExist){
										cookieArr.push(myObj);
									}
									$.cookie("totalnum", JSON.stringify(denum), {expires:30,path:"/"});
									$.cookie("cart", JSON.stringify(cookieArr), {expires:30, path:"/"});
									console.log($.cookie("cart"));
									
								}
								//不点击+ —(默认)
								else if( !addFlag || !reFlag ){
									var denum = $.cookie("totalnum") ? JSON.parse($.cookie("totalnum")) : 0;
									denum++;
									$(".num").html(denum);
									var cookieArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
									var isExist = false;
									for(var k=0; k<cookieArr.length; k++){
										if(cookieArr[k].id == myObj.id){
											cookieArr[k].num++;
											isExist= true;
											break;
										}
									}
									if(!isExist){
										cookieArr.push(myObj);
									}
									$.cookie("totalnum", JSON.stringify(denum), {expires:30,path:"/"});
									$.cookie("cart", JSON.stringify(cookieArr), {expires:30, path:"/"});
									console.log($.cookie("cart"));
								}
								
							})
							
					    }
					}
					
				}
			}
		})
		function refreshUI(obj){
			$(".middle-box img").attr("src",deobj.bigimg5);
			$(".bigImg").attr("src",deobj.bigimg5);
			$(".small-list img").eq(0).attr("src",deobj.smallimg5);
			$(".small-list img").eq(1).attr("src",deobj.smallimg1);
			$(".small-list img").eq(2).attr("src",deobj.smallimg2);
			$(".small-list img").eq(3).attr("src",deobj.smallimg3);
			
			$(".small-list img").eq(0).attr("data-msrc",deobj.bigimg5);
			$(".small-list img").eq(1).attr("data-msrc",deobj.bigimg1);
			$(".small-list img").eq(2).attr("data-msrc",deobj.bigimg2);
			$(".small-list img").eq(3).attr("data-msrc",deobj.bigimg3);
			
			$(".small-list img").eq(0).attr("data-bsrc",deobj.bigimg5);
			$(".small-list img").eq(1).attr("data-bsrc",deobj.bigimg1);
			$(".small-list img").eq(2).attr("data-bsrc",deobj.bigimg2);
			$(".small-list img").eq(3).attr("data-bsrc",deobj.bigimg3);
			$(".details-box h3").html(deobj.title);
			$(".p-price").html(deobj.unit + deobj.price);
			$(".volume").html(deobj.volume);
			$(".on").html(deobj.on);
			$(".msg-top img").attr("src",deobj.logo);
			$(".autotrophy").html(deobj.stylee);
			$(".shopname").html(deobj.shop);
			$(".detail-on").html(deobj.on);
			$(".detail-on1").html(deobj.on);
		}
		
		
		//获取参数字符串paramStr中的参数name
		function getParam(paramStr, name) {
			paramStr = paramStr.substring(1);
			var arr = paramStr.split("&");
			for (var i=0; i<arr.length; i++) {
				var str2 = arr[i]; //id=103
				
				var arr2 = str2.split("=");
				if (arr2[0] == name) {
					return arr2[1];
				}
			}
			return "";
		}
		
	})
	
	$(function(){
					
		//等比公式
		//小图width/大图width == 小区域width/大区域width

		$(".middle-box").mousemove(function(e){
			
			$(".small-box").show(); //显示小区域
			$(".big-box").show(); //显示大区域
			
			$(".small-box").width( $(".middle-box").width() * $(".big-box").width() / $(".bigImg").width() );
			$(".small-box").height( $(".middle-box").height() * $(".big-box").height() / $(".bigImg").height() );
		
			//放大系数
			var scale = $(".bigImg").width() / $(".middle-box img").width();
			var x = e.pageX - $(".middle-box").offset().left - $(".small-box").width()/2;
			var y = e.pageY - $(".middle-box").offset().top - $(".small-box").height()/2;
			
			//控制不超出左右边界
			if (x < 0){
				x = 0;
			}
			else if (x > $(".middle-box").width()-$(".small-box").width()){
				x = $(".middle-box").width()-$(".small-box").width();
			}
			//控制不超出上下边界
			if (y < 0){
				y = 0;
			}
			else if (y > $(".middle-box").height()-$(".small-box").height()) {
				y = $(".middle-box").height()-$(".small-box").height();
			}
			
			//小区域移动
			$(".small-box").css({left:x, top:y});
			//console.log(scale)
			//大图移动
			$(".bigImg").css({left: -scale*x,top: -scale*y});
		})
//		//移除小图
		$(".middle-box").mouseleave(function(e){
			$(".small-box").hide(); //隐藏小区域
			$(".big-box").hide(); //隐藏大区域
		})
	
	    //图片切换
		$(".small-list li").mouseenter(function(){
			//改变小图切换样式
			$(this).addClass("current-controller").siblings().removeClass("current-controller");
			
			var msrc=$(this).find("img").attr("data-msrc");
			var bsrc=$(this).find("img").attr("data-bsrc");	
			
			$(".middle-box img").attr("src",msrc);
			$(".bigImg").attr("src",bsrc);
		})
	})
//吸顶
$(function(){
	
	$(".introduce-nav li").mouseenter(function(){
		$(this).addClass("nav-active").siblings().removeClass("nav-active");
	})
	$(".introduce-nav-top li").mouseenter(function(){
		$(this).addClass("nav-active").siblings().removeClass("nav-active");
	})

	var boxtop= $(".introduce-nav").offset().top;
	$(window).scroll(function(){
		
		var scrollTop = $(window).scrollTop();
		
		if (scrollTop >= 852) {
			$(".introduce-nav-top").show();
		}
		else{
			$(".introduce-nav-top").hide();
		}
	})


})