	
	$(function(){
		
		var params = location.search;
		var myId = getParam(params, "id");
		
		var brandobj = [];   //品牌
		var fieldobj = [];   //地区
		var flavorobj = [];  //类型
		
		$.get("../json/goods.json", function(reponseData){
			var arr = reponseData.index;
			for (var i=0; i<arr.length; i++) {
				obj = arr[i];
				if (obj.id == myId){
					var agobj = obj.again;      //热卖单品
					var seeobj = obj.seemore;   //看了又看
					
					brandobj = obj.brand;   //品牌
					fieldobj = obj.field;   //地区
					flavorobj = obj.flavor; //类型
					
					//热卖单品
					for(var j=0; j<agobj.length; j++){
						var aglist = agobj[j];
						var agli= $(' <li></li>').appendTo("#aglist");
						$(' <a href="#"><img src=" ' +aglist.agimg + 
							' " ><p class="name-line">' +aglist.title+ '</p><p class="price-line">' +aglist.price+ 
								'</p></a>').appendTo(agli);
					}
				
					//看了又看
					for(var k=0; k<seeobj.length; k++){
						var seelist = seeobj[k];
						var seeli= $(' <li></li>').appendTo("#seemore");
						$(' <a href="#"><img src=" ' +seelist.seeimg + 
							' " ><p class="see-name">' +aglist.title+ '</p><p><span class="see-price">' +seelist.price+ 
								'</span><span class="see-comment">品论数<em>' +seelist.on+ 
									'</em></span></p></a>').appendTo(seeli);
					}
					
					//品牌
					for(var a=0; a<brandobj.length; a++){
						var brandlist = brandobj[a];
						var brandli = $(' <li></li>').appendTo("#brandlist");
						$(' <a href="#"><img src=" ' +brandlist.logoimg+ ' "></a><div class="logomask">'+ 
							brandlist.brand +'</div>').appendTo(brandli);
					}
					
					//地区
					for(var b=0; b<fieldobj.length; b++){
						var fieldlist = fieldobj[b];
						$(' <li> '+fieldlist.local +' </li> ').appendTo("#fieldlist");
					}
					
					//香型
					for(var d=0; d<flavorobj.length; d++){
						flavorlist = flavorobj[d];
						$(' <li> '+flavorlist.type +' </li> ').appendTo("#flavorlist");
					}
				}
			}
			
		})
		
		var brandid = 0;
		var fieldid = 0;
		var flavorid = 0; 
		var flag = 0;
		var productobj = []; //商品
		refresh();
		function refresh(){
			$("#productlist").empty();
			$.get("../json/goods.json", function(reponseData){
				var arr = reponseData.index;
				for (var i=0; i<arr.length; i++) {
					var obj = arr[i];
					var arr1 = []; 
					
					if (obj.id == myId){
						productobj = obj.product;
						
						if( brandid==0 && fieldid===0 && flavorid==0){
							for(var i= 0; i<productobj.length; i++){
								arr1.push(productobj[i]);
							}
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						else if( brandid != 0 && fieldid==0 && flavorid==0 ){
							for(var i= 0; i<productobj.length; i++){
								if( productobj[i].brand == brandid){
									arr1.push(productobj[i]);
								}
							}
							
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						
						else if( brandid != 0 && fieldid !=0 && flavorid==0 ){
							for(var i= 0; i<productobj.length; i++){
								if( productobj[i].brand == brandid && productobj[i].field == fieldid ){
									arr1.push(productobj[i]);
								}
							}
							
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						
						else if( brandid != 0 && fieldid ==0 && flavorid !=0 ){
							for(var i= 0; i<productobj.length; i++){
								if( productobj[i].brand == brandid && productobj[i].flavor == flavorid ){
									arr1.push(productobj[i]);
								}
							}
							
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						
						else if( brandid == 0 && fieldid !=0 && flavorid ==0 ){
							for(var i= 0; i<productobj.length; i++){
								if( productobj[i].field == fieldid ){
									arr1.push(productobj[i]);
								}
							}
							
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						
						else if( brandid == 0 && fieldid !=0 && flavorid !=0 ){
							for(var i= 0; i<productobj.length; i++){
								if( productobj[i].field == fieldid && productobj[i].flavor == flavorid){
									arr1.push(productobj[i]);
								}
							}
							
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						
						else if( brandid == 0 && fieldid ==0 && flavorid !=0 ){
							for(var i= 0; i<productobj.length; i++){
								if(productobj[i].flavor == flavorid){
									arr1.push(productobj[i]);
								}
							}
							
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						
						else{
							for(var i= 0; i<productobj.length; i++){
								if( productobj[i].brand == brandid && productobj[i].field== fieldid && productobj[i].flavor == flavorid){
									arr1.push(productobj[i]);
								}
							}
							
							arr1 = paixu(flag,arr1);
							create(arr1);
							deta (arr1)
							cdecart(arr1);
						}
						
						function paixu(flag,arr1){  //排序
							if(flag == 1){
								for(var i=0; i<arr1.length; i++ ){
									for( var j= 0; j<arr1.length-i-1; j++){
										if(arr1[j].price < arr1[j+1].price){
											var temp = arr1[j+1];
											arr1[j+1] = arr1[j];
											arr1[j] = temp;
										}
									}
								}
								
							}
							else if(flag == 2){
								for(var i=0; i<arr1.length; i++ ){
									for( var j= 0; j<arr1.length-i-1; j++){
										if(arr1[j].volume < arr1[j+1].volume){
											var temp = arr1[j+1];
											arr1[j+1] = arr1[j];
											arr1[j] = temp;
										}
									}
								}
							}
							
							else{
								return arr1;
							}
							
							return arr1;
							
							
						}
					
						function create(arr1){   //创建商品列表
							
							for(var i=0; i< arr1.length; i++){
								var probj=arr1[i];
								var prodli = $('<li></li>').appendTo("#productlist");
								var proda= $(' <a href="javascript:;"></a> ').appendTo(prodli)
								$(' <img src=" ' + probj.img+  ' " class="midimg" > ').appendTo(proda);
								$('<p><span class="produst-price">' + probj.unit+ probj.price+ ".00"+
									'</span><span class="produst-comment">成交 <em>' + probj.volume+ 
									'笔</span></p>').appendTo(proda); 
								$('<p class="produst-name">' + probj.title+ '</p>').appendTo(proda);
								$('<p class="product-shop">' + probj.shop+ '</p>').appendTo(proda);
								
								$('<div class="produst-active">'+ 
										'<img src="' + probj.smallimg1+' " '+ 'data-msrc=" ' + probj.middleimg1 + ' ">'+
										'<img src="' + probj.smallimg2+' " '+ 'data-msrc=" ' + probj.middleimg2 + ' ">'+
										'<img src="' + probj.smallimg3+' " '+ 'data-msrc=" ' + probj.middleimg3 + ' ">'+
										'<img src="' + probj.smallimg4+' " '+ 'data-msrc=" ' + probj.middleimg4 + ' ">'+
									'</div>').appendTo(prodli);
								$(' <div class="cata-addcart">加入购物车</div>').appendTo(prodli);
								
							}
						
						}
						
						
						function cdecart(arr){
							//点击加入购物车
							$('#productlist').on("click",".cata-addcart",function(){
								var index = $(this).index("#productlist .cata-addcart");
								var obj = arr[index];
								
								var myObj={
									id:obj.id,
									img:obj.img,
									title:obj.title,
									unit:obj.unit,
									price:obj.price,
									shop:obj.shop,
									num: 1,
									checked: true 
								}
								
								var cookieArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
								var isExist = false;
								for(var i=0; i<cookieArr.length; i++){
									if(cookieArr[i].id==myObj.id){
										cookieArr[i].num++;
										isExist = true;
									}
								}
								if(!isExist){
									cookieArr.push(myObj);
								}
								$.cookie("cart", JSON.stringify(cookieArr), {expires:30, path:"/"});
								console.log($.cookie("cart"));
								
							})
						}
						
						function deta (arr){
							//进入详情
							$("#productlist").on("click",".midimg",function(){
								var index = $(this).index("#productlist  .midimg ");
								var obj = arr[index];
								console.log(obj);
								location.href = "details.html?id="+obj.id + "&indexid=" + myId;
							})
						}
						
					}
					
				}	
				
			})
			
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
		
		
		//点击选择
		//品牌
		$("#brandlist").on("click","li",function(){
			var index = $(this).index("#brandlist li");
			var obj = brandobj[index];
			brandid = obj.id;
			refresh();
		})
		
		//地区
		$("#fieldlist").on("click","li",function(){
			var index = $(this).index("#fieldlist li");
			var obj = fieldobj[index];
			fieldid = obj.id;
			refresh();
		})
		
		
		//类型
		$("#flavorlist").on("click","li",function(){
			var index = $(this).index("#flavorlist li");
			var obj = flavorobj[index];
			flavorid = obj.id;
			refresh();
		})
		
		//排序
		$("#paixu").on("click","li",function(){
			var index = $(this).index("#paixu li");
			flag =index;
			console.log(flag);
			refresh();
		})
		
		//选择项样式
		$(".type-list").on("click","li",function(){
			$(this).css({"color":"#F00F34","font-weight":"700"}).siblings().css({"color":"#969896","font-weight":"100"});
		})
		
		//小图切换
	    $('#productlist').on("mouseenter",'.produst-active img',function(){
	    	var msrc = $(this).attr("data-msrc");
		    $(this).parent().parent().find(".midimg").attr("src",msrc);
	    })
	    
	})

	$(function(){
		//点击飞入indexadd
		var offset = $(".user").offset();  //结束的地方的元素
		
		$('#productlist').on("click",".cata-addcart",function(event){
			
		    //点击飞入
			console.log($(this).parent().find('.midimg').attr('src'));
			var img = $(this).parent().find('.midimg').attr('src');
			var flyer = $('<img class="u-flyer" src="'+img+'">');
			flyer.fly({
				//开始位置
				start: {
					left: event.clientX,
					top: event.clientY
				},
				//结束位置
				end: {
					left: offset.left,
					top: offset.top,
					width: 0,
					height: 0
				},
				//结束后
				onEnd: function(){
					console.log("结束");
					$("#cartmsg").show().animate({width: '250px'}, 200).fadeOut(1000);
					flyer.remove();
				}
			})
		})
	})
	
	
	