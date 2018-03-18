//轮播图
	$(function(){
		var arr = [];
		$.get("../json/goods.json", function(resopnsData){
			arr =resopnsData.lunbotu;
			for (var i=0; i<arr.length; i++) {
				var obj = arr[i];
				var li1 = $("<li></li>").appendTo(".list1");
				$("<img src="+ obj.imgsrc +">").appendTo(li1);
				var li2 = $("<li></li>").appendTo(".list2");
			}
			lunbo();
		})
		//函数
		function lunbo(){
			var _ul1 = $(".list1");
			var _ul2 = $(".list2");
			var _li1 = $(".list1 li");
			var _li2 = $(".list2 li");
			//初始化显示第一张图
			_li1.eq(0).stop().show().siblings().stop().hide();
			
			var size = $(".list1 li").size(); 
			
			//自动轮播
			var i = 0; //记录图片下标
			var timer = setInterval(function(){
				i++;
				move(); 
			}, 3000);
			
			//li2上面的按钮
			_li2.hover(function(){
				var index = $(this).index();
				//console.log(index);
				i = index;
				move();
			})
			
			//移动的函数
			function move(){
				
				//如果i超出了图片总数量
				if(i<0){
					i=size-1;
				}
				if (i == size) {
					i = 0; //即将移动到2张图
				}
				
				//透明度切换到第i张图
				_li1.eq(i).fadeIn().siblings().fadeOut();
				
				//改变ul2的按钮状态
				_li2.eq(i).removeClass().addClass("list2-active").siblings().removeClass("list2-active"); 
				
			}
			//上一页
			$(".prev-page").click(function(){
				i--;
				move();
			})
			//下一页
			$(".next-page").click(function(){
				i++;
				move();
			})
			//移入box, 移出box
			$(".banner").mouseenter(function(){
				$(".prev-page").fadeIn();
				$(".next-page").fadeIn();
				//移入, 关闭定时器
				clearInterval(timer);
			}) 
			//移出, 重新开启定时器
			$(".banner").mouseleave(function(){
				$(".prev-page").fadeOut();
				$(".next-page").fadeOut();
				timer = setInterval(function(){
					i++;
					move();
				}, 3000);
			})
		}
	})
	
//向左轮播
	$(function(){
		var box = $(".discount-bottom");
		var list = $(".seckill-list");
		var li = $(".seckill-list ul");
		var prev =$(".seckill-prev");
		var next =$(".seckill-next"); 
		lunbo(box,list,li,prev,next );
		
		var box1 = $("#box1");
		var list1 = $("#login1");
		var li1 = $("#login1 .login-li");
		var prev1 = $("#prev1");
		var next1 = $("#next1");
		lunbo(box1,list1,li1,prev1,next1 );
		
		var box2 = $("#box2");
		var list2 = $("#login2");
		var li2 = $("#login2 .login-li");
		var prev2 = $("#prev2");
		var next2 = $("#next2");
		lunbo(box2,list2,li2,prev2,next2 );
		
		var box3 = $("#box3");
		var list3= $("#login3");
		var li3 = $("#login3 .login-li");
		var prev3 = $("#prev3");
		var next3 = $("#next3");
		lunbo(box3,list3,li3,prev3,next3 );
		
		var box4 = $("#box4");
		var list4 = $("#login4");
		var li4 = $("#login4 .login-li");
		var prev4 = $("#prev4");
		var next4 = $("#next4");
		lunbo(box4,list4,li4,prev4,next4 );
		
		var box5 = $("#box5");
		var list5 = $("#login5");
		var li5 = $("#login5 .shop-slide-li");
		var prev5 = $("#prev5");
		var next5 = $("#next5");
		lunbo(box5,list5,li5,prev5,next5 );
		
		function lunbo(box,list,li,prev,next ){
			
			li.eq(0).clone(true).appendTo(list);
			var liWidth = li.eq(0).width();
			var index = $(".seckill-list ul").size();
			list.width( index * liWidth);
			var i=0;
			function move(){
				if(i==index){
					list.css("left",0);
					i=1;
				}
				if(i<0){
					list.css("left",-(index-1)*liWidth);
					i=index-2;
				}
				list.stop().animate({"left":-i*liWidth},1500);
			}
			prev.click(function(){
				i--;
				move();
			})
			next.click(function(){
				i++;
				move();
			})
				
		}
		
	})
	