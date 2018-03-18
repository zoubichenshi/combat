
$(function(){
				
	//获取购物车的cookie数据,并用节点显示
	refresh();
	function refresh() {
		var arr = $.cookie("cart");
		if (arr) {
			arr = JSON.parse(arr);
			
			//先清除旧节点
			$("#list").empty();
			
			//再添加新节点
			var totalPrice = 0; //总价
			var totalnum  =0;  //总数
			
			//遍历数组
			for (var i=0; i<arr.length; i++) {
				var obj = arr[i];
				
				//创建tr节点
				$(' <tr><th colspan=" ' + 20 + ' "><div class="ncc-store-name">店铺：<a href="#"> '
      				+ obj.shop + ' </a></div></th></tr> ').appendTo("#list");
      				
      			var shopList=$("<tr class='shop-list'></tr>").appendTo("#list");
      			
      			$(' <tr><td colspan=" ' + 20 + ' "></td></tr> ').appendTo("#list");
				//是否选中
				if (obj.checked) {
					$(' <td class="td-border-left"><input type="checkbox" checked="checked" class="checkedtop"></td>').appendTo(shopList);
				}
				else {
					$('<td class="td-border-left"><input type="checkbox" class="checkedtop"></td>').appendTo(shopList);
				}
      	
				$(' <td><a href="#" class="ncc-goods-thumb"><img src=" ' + obj.img + ' "></a></td> ').appendTo(shopList);	
	            $(' <td><a href="#" class="goods-title">' + obj.title + '</a><dt> ').appendTo(shopList);
	            $(' <td><em class="goods-price">'+ obj.price + '</em></td> ').appendTo(shopList); 
	            
	            $(' <td class="ws0"><a href="javascript:;" class="reducekey tip">-</a><input value=" ' 
	                + obj.num + ' " class="text w20" type="text"><a href="javascript:;" class="addkey tip">+</a></td>').appendTo(shopList);
	            //单个总价
	            $(' <td class="price-padd"><em class="goods-subtotal"> '+ obj.price * obj.num + '</em></td> ').appendTo(shopList);
	            $(' <td class="tl td-border-right"><a href="#">移入收藏夹</a><br><a class="del" href="javascript:;">删除</a></td> ').appendTo(shopList);
             
				//计算总价
				if (obj.checked) {
					totalPrice += obj.price * obj.num;
					totalnum +=obj.num;
				}
				$.cookie("totalnum", JSON.stringify(totalnum), {expires:30, path:"/"});
				
			}
			
			//显示总价
			$("#total").html("￥"+totalPrice);
			$("#totalnum").html(totalnum);
			$(".num").html(totalnum);
		}
		else {
			$(".ncc-null-shopping").show();
			$(".ncc-wrapper").hide();
		}
		
	}
	
	//+
	$("#list").on("click", ".addkey", function(){
		var index = $(this).index("#list .addkey");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		
		arr[index].num++;
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		//刷新节点数据
		refresh();
	
	})
	
	//-
	$("#list").on("click", ".reducekey", function(){
		var index = $(this).index("#list .reducekey");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num--;
		if (arr[index].num < 1) {
			arr[index].num = 1;
		}
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		//刷新节点数据
		refresh();
	})
	
	
	//删除
	$("#list").on("click", ".del", function(){
		var index = $(this).index("#list .del");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index, 1); //删除数组arr的第index个
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		isAllSelect();
		
		//刷新节点数据
		refresh();
	})
	
	
	//勾选
	$("#list").on("click", ".checkedtop", function(){
		
		var index = $(this).index("#list .checkedtop");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr[index].checked = !arr[index].checked;
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		//判断是否全选了
		isAllSelect();
		
		//刷新节点数据
		refresh();
	})
	
	//判断是否全部勾选了
	isAllSelect();
	function isAllSelect(){
		
		//判断是否为undefined
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}
		
		var arr = JSON.parse($.cookie("cart"));
		
		var sum = 0;
		for (var i=0; i<arr.length; i++) {
			sum += arr[i].checked;
		}
		
		//全选了
		if (arr.length!=0 && sum==arr.length) {
			$("#allSelect").prop("checked", true);
		}
		//未全选
		else {
			$("#allSelect").prop("checked", false);
		}
		
		if(arr.length==0){
			$(".ncc-null-shopping").show();
			$(".ncc-wrapper").hide();
		}
	}
	
	//全选
	$("#allSelect").click(function(){
		//判断是否为undefined
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}
		
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0; i<arr.length; i++) {
			//全选
			if ($(this).prop("checked")){
				arr[i].checked = true;
			}
			//全不选
			else {
				arr[i].checked = false;
			}
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		//刷新
		refresh();
	})
	
	//删除选中
	$("#delSelect").click(function(){
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		
		//将未选中的商品添加到新数组newArr中，再将newArr保存到cookie
		var newArr = [];
		for (var i=0; i<arr.length; i++) {
			if (!arr[i].checked) {
				newArr.push(arr[i]);
			}
		}
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});
		
		isAllSelect();
		
		//刷新节点数据
		refresh();
	})
	
})
$(function(){
	$("#backindex").click(function(){
		history.back(-1); //刷新上一页
		
	})
})