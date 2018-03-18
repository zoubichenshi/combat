	$(function(){
		$(".details-topbiimg").load("index.html .top-bgimg-warrp");
		$(".catalogue-tophead").load("index.html .head-warrp");
		$(".catalogue-nav").load("index.html .head-nav-warrp");
		$(".catalogue-footer").load("index.html .footer-warrp");
		$(".catalogue-nav").on("mouseenter",".head-allnav" , function(){
			$(".classify").show();
		})
		$(".catalogue-nav").on("mouseleave",".classify",function(){
			$(".classify").hide();
		})
	})
	
	$(function(){
		var sidebarwarrp = $('<div class="sidebar"></div>').appendTo(".sidebar-warrp");
		var sidebar = $(' <ul class="sidebar-top"><ul>').appendTo(sidebarwarrp); 
		$(' <li><i class="user"><s></s></i><span>个人中心<em class="right"></em></span></li><s></s> ').appendTo(sidebar);
		
		$(' <li class="side-cart"><i class="cart"><a href="cart.html"><s></s></i><p>购物车</p><em class="num"></em></li><s></s></a><div id="cartmsg">已成功加入购物车！</div> ').appendTo(sidebar);
		
		$(' <li><i class="asset"><s></s></i><span>资产中心<em class="right"></em></span></li><s></s> ').appendTo(sidebar);
		
		$(' <li><i class="at-goods"><s></s></i><span>关注商品<em class="right"></em></span></li><s></s> ').appendTo(sidebar);
		
		$(' <li><i class="history"><s></s></i><span>浏览历史<em class="right"></em></span></li><s></s> ').appendTo(sidebar);
		
		$(' <li><i class="kefu"><em>客服</em></i><span>妮妮 　佳佳<em class="right"></em></span></li> ').appendTo(sidebar);
		
		$(' <li class="gotop"><i><b></b></i><span>回到顶部<em class="right"></em></span></li> ').appendTo(sidebar);
	})

 	$(function(){
 	
		var name =  $.cookie("username"); 
		if(name){
			name=JSON.parse($.cookie("username")) ;
			console.log(name);
			$(".top-login li").eq(0).html('<a href="#">' +name+ '</a><span class="L-line"></span>');
			$(".top-login li").eq(1).html('<a href="#" id>[ 退出 ]</a></li>');
			
			$(".top-login li").eq(1).click(function(){
				$.cookie("username","",{expires:-1,path:"/"});
				console.log($.cookie("username"));
				$(".top-login li").eq(0).html('<a href="login.html">请登录</a><span class="L-line"></span>');
				$(".top-login li").eq(1).html('<a href="register.html">免费注册</a>');
			})
		}
		else{
			$(".top-login li").eq(0).html('<a href="login.html">请登录</a><span class="L-line"></span>');
			$(".top-login li").eq(1).html('<a href="register.html">免费注册</a>');
		}
		
	})

	$(function(){
		var carnum = $.cookie("totalnum");
		if(carnum){
			carnum = JSON.parse($.cookie("totalnum"));
			$(".num").html(carnum);
		}
		else{
			$(".num").html("0");
		}
		
		var clicknum = $(".num").html();
		
		$('#productlist').on("click",".cata-addcart",function(){
			clicknum++;
			$(".num").html(clicknum);
			$.cookie("totalnum", JSON.stringify(clicknum), {expires:30,path:"/"});
			
		})
		
	})
	
	$(function(){
		$(function() {
			$(".gotop").hide();
	        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
	        $(function() {
	            $(window).scroll(function() {
	                if ($(window).scrollTop() > 100) {
	                    $(".gotop").fadeIn(1000);
	                } else {
	                    $(".gotop").fadeOut(1000);
	                }
	            });
	            //当点击跳转链接后，回到页面顶部位置
	            $(".gotop").click(function() {
	                $('body,html').animate({
	                    scrollTop: 0
	                },
	                1000);
	                return false;
	            });
	        });
		})
	})





