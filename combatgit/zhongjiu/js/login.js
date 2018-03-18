	$(function(){
		
		$(".qq").hover(function(){
			$(".qq").attr("src","../images/l-qq2.png");
		},function(){
			$(".qq").attr("src","../images/l-qq1.png");
		})
		
		$(".weibo").hover(function(){
			$(".weibo").attr("src","../images/l-weibo2.png");
		},function(){
			$(".weibo").attr("src","../images/l-weibo1.png");
		})
		
		$(".weixin").hover(function(){
			$(".weixin").attr("src","../images/l-weixin2.png");
		},function(){
			$(".weixin").attr("src","../images/l-weixin1.png");
		})
	    
	    $("#users").focus(function(){
			$("#users").css("border-color","#7bcbf4");
		})
	    $("#users").blur(function(){
			$("#users").css("border-color","#0ff31a");
		})
	    
		$("#psd").focus(function(){
			$("#psd").css("border-color","#7bcbf4");
		})
		 $("#psd").blur(function(){
			$("#psd").css("border-color","#0ff31a");
		})
		 
		//点击登录
		$("#login-but").click(function(){
			
	        //ajax
	        var xhr = new XMLHttpRequest();
	        xhr.open("post", "http://127.0.0.1/zhongjiu/php/login.php", true);
	        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        var str = "username="+ $("#users").val() + "&pwd=" + $("#psd").val();
	        $.cookie("username",JSON.stringify($("#users").val()),{path:"/"});
	        xhr.send(str);
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState==4 && xhr.status==200) {
	                var obj=JSON.parse(xhr.response);
						
					if(obj.status==1){
						$(".login-hint").html(obj.msg);
						location.href="../html/index.html";
					}
					else{
						$(".login-hint").html(obj.msg);
					}
	                
	            }
	            
	        }
	    
		})
	
	
	
	
	
	
	})