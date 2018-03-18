	
//热销爆款
	$(function(){
		
		$(".discount-top").mouseenter(function(event){
			event.stopPropagation(); 
			event.preventDefault(); 
		})
		
		$(".discount-top b").eq(0).mouseenter(function(event){
			event.stopPropagation(); 
			event.preventDefault(); 
			$(this).addClass("discount-top-active").parent().siblings().find("b").removeClass("discount-top-active");
			$(".discount-show").stop().animate({"top":0},500);
		})
		
		$(".discount-top b").eq(1).mouseenter(function(event){
			event.stopPropagation(); 
			event.preventDefault(); 
			$(this).addClass("discount-top-active").parent().siblings().find("b").removeClass("discount-top-active");
			$(".discount-show").stop().animate({"top":-480},500);
		})
		
		//热销爆款动画			
		$(".discount-selling img").hover(function(){
			$(this).stop(true).animate({"margin-left":-10},500).parent().siblings().find("img").stop(true).animate({"margin-left":0},500);
		},function(){
			$(this).stop(true).animate({"margin-left":0},500).parent().siblings().find("img").stop(true).animate({"margin-left":0},500);
		})
		
		//一天倒计时
		function countTime(){
			var current=new Date();
			var hours = current.getHours();
			var minutes = current.getMinutes();
			var sec = current.getSeconds();
			var target=(hours*3600+minutes*60+sec)*1000;
			var interval=86400000-target;
			if(interval>0){
				
				var ohour=formate(Math.floor(interval/1000/60/60%24));
				var omin=formate(Math.floor(interval/1000/60%60));
				var osec=formate(Math.floor(interval/1000%60));
				
				$(".seckill-timer input").eq(0).val(ohour);
				$(".seckill-timer input").eq(1).val(omin);
				$(".seckill-timer input").eq(2).val(osec);
				
			}
			function formate(num){
				if(num<10){
					return '0'+num;
				}
				else{
					return num;
				}
			}

		}
		setInterval(function(){
			countTime();
		},1000);
		
		
		//限时抢购动画
		
		$(".seckill-list").on("mouseenter","li",function(){
			$(this).stop().fadeTo(1000, 1);
			$(this).find("img").stop().animate({"width":220,"height":220},1000).siblings().find("img").stop().animate({"width":200,"height":200},500);
		})
		$(".seckill-list").on("mouseleave","li",function(){
			$(this).stop().fadeTo(500, 0.7);
			$(this).find("img").stop().animate({"width":200,"height":200},500).siblings().find("img").stop().animate({"width":200,"height":200},500);
		})
		
	})

//主要内容导航
	$(function(){
		$(".liquor-nav").on("mouseenter","li",function(){
			$(this).addClass("top-active").siblings().removeClass("top-active");
		})
		
		//图片效果
		
		$(".liquor-right li:not(.fore1)").hover(function(){
			$(this).css({"box-shadow" : "0 0 5px #666"});
			$(this).stop().animate({"top":-5},500).siblings().stop().animate({"top":0},1000);
		},function(){
			$(this).css({"box-shadow" : "0 0 0px #FFF"});
			$(this).stop().animate({"top":0},500).siblings().stop().animate({"top":0},1000);
		})
		
		$(".liquor-bt-bt li").hover(function(){
			$(this).css({"box-shadow" : "0 0 5px #666"});
			$(this).stop().animate({"top":-5},500).siblings().stop().animate({"top":0},1000);
		},function(){
			$(this).css({"box-shadow" : "0 0 0px #FFF"});
			$(this).stop().animate({"top":0},500).siblings().stop().animate({"top":0},1000);
		})
		
	})
	
	//楼梯效果

	$(function(){
				
		//表示是否点击了楼层按钮正在执行动画
		var isMoving = false;
		
		//点击楼层按钮， 让页面滚动到对应的楼层
		$("#nav li").click(function(){
			$(this).find("span").addClass("active")
				.parent().siblings().find("span").removeClass("active")
			
			var index = $(this).index();
			
			var top = $("#main .liquor").eq(index).offset().top;
			
			isMoving = true;
			$("html,body").stop(true).animate({scrollTop: top}, function(){
				isMoving = false;
			});
			
		})
		
		//滚动页面
		$(window).scroll(function(){
			
			//如果没有点击楼层按钮执行动画， 则执行代码
			if (!isMoving) {
				
				var scrollTop = $(window).scrollTop();
				var main = $(".discount-warrp").offset().top;
			
				if(scrollTop > main ){
					$("#nav").fadeIn(1000);
				}
				else{
					$("#nav").fadeOut(1000);
				}
				//遍历所有的楼层div
				var index = 0;
				$("#main .liquor").each(function(){
					//每个楼层div的top值
					var top = $(this).offset().top;
					var winH = $(window).height(); //页面高度
					
					if (scrollTop + winH/2 >= top) {
						index = $(this).index();
					}
				})
				
				$("#nav li").eq(index).find("span").addClass("active")
					.parent().siblings().find("span").removeClass("active")
			}
			
		})
		
	})
	
	
//数据导入
	$(function(){
		var arr=[];
		$.get("../json/goods.json",function(responsedata){
			arr = responsedata.index;
			
			for( var i=0; i<arr.length; i++){
				var obj=arr[i];
				var div = $('<div class="indexcata" ></div>').insertBefore(".brand-shop");
				$(' <a href="#"><img src="' +obj.indeximg+ '"></a><div class="mask"><b class="more">查看更多</b></div>').appendTo(div);
			}
			$(".indexcata").eq(0).addClass("brand-left");
			$(".indexcata").eq(1).addClass("brand-right");
			
		})
		
		$(".brand-buttom").on("click",".more",function(){
			var index = $(this).index(".brand-buttom .more");
			var obj = arr[index];
			console.log(obj.id);
			location.href = "catalogue.html?id=" + obj.id;
		})
			
	})
	