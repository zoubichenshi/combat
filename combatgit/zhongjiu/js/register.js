
	$(function(){
		var key1=false;
		var key2=false;
		var key3=false;
		var key4=false;
		
		
		//用户名验证
		$("#username").focus(function(){
			$("#username").css("border-color","#7bcbf4");
		})
		
		$("#username").blur(function(){
			var user=/^[\d\w\u4e00-\u9fa5]{3,15}$/;
			var userpure=/^(?:[0-9]+)$/;
			
			//要求填写
			if(user.test($("#username").val())){
				$("#username").css("border-color","#0ff31a");
				$(".num-hint").html(' <img src= "../images/r-yes.png">');
				//纯数字
			    if(userpure.test($("#username").val())){
			    	$("#username").css("border-color","#ff9900");
			    	$(".num-hint").html('<img src= "../images/r-warn.png">可包含“_”、“-”，不能是纯数字 ').css("color","#ff9900");
				}
			    else{
			    	key1 = true;
			    }
			}
		    //为空
			else if($("#username").val()==""){
				$("#username").css("border-color","#ff9900");
				$(".num-hint").html(' <img src= "../images/r-warn.png">用户名不能为空').css("color","#ff9900");
			}
			else{
				$("#username").css("border-color","#f8115d");
				$(".num-hint").html(' <img src= "../images/r-no.png">用户名必须在3-15个字符之间').css("color","#f8115d");
			}
		})
		
		//验证码验证
		$("#code_input").focus(function(){
			$("#code_input").css("border-color","#7bcbf4");
		})
		
		var verifyCode = new GVerify("v_container");
		$("#code_input").blur(function(){
			var res = verifyCode.validate(document.getElementById("code_input").value);
			if(res){
				key2=true;
				$(".code-hint").html(' <img src= "../images/r-yes.png">');
				$("#code_input").css("border-color","#0ff31a");
			}
			else if($("#code_input").val() == ""){
				$("#code_input").css("border-color","#ff9900");
				$(".code-hint").html(' <img src= "../images/r-warn.png">验证码不能为空').css("color","#ff9900");
			}
			else{
				$("#code_input").css("border-color","#f8115d");
				$(".code-hint").html(' <img src= "../images/r-no.png">请输入正确的验证码').css("color","#f8115d");
			}
		})
 
 		//密码验证 
 		//密码长度只能在6-20位字符之间，不包含空格
		//数字(强度s=1)，字母(s=1)，其他字符(s=1)，长度6-10(s=1), 长度11-15(s=2), 长度16-20(s=3),  
		//如果强度s<=2(弱) , 3<=s<=4(中)，5<=s<=6(强)
		
		$("#pwd").focus(function(){
			$("#pwd").css("border-color","#7bcbf4");
		})
		
		$("#pwd").blur(function(){
			var pure = /^(?:[0-9]+|[a-zA-Z]+|[!@#$%^&*]+)$/; //弱：纯数字，纯字母，纯特殊字符
			var charreg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;//中：字母+数字，字母+特殊字符，数字+特殊字符
			var numreg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;//字母+数字+特殊字符     
			var sapacereg = /\s/g;//空格
			//长度至少为6位，最多20位，
			
			if($("#pwd").val() == "" || sapacereg.test($("#pwd").val())){
				
				$("#pwd").css("border-color","#ff9900");
				$(".pwd-hint").html(' <img src= "../images/r-warn.png">密码长度只能在6-20位字符之间，不包含空格').css("color","#ff9900");
				$(".strength span").eq(0).css("background","#cacaca");
				$(".strength span").eq(1).css("background","#cacaca");
				$(".strength span").eq(2).css("background","#cacaca");
			}
			
			else if($("#pwd").val().length >= 6 && $("#pwd").val().length <= 20){
				key3=true;
				$("#pwd").css("border-color","#0ff31a");
				$(".pwd-hint").html(' <img src= "../images/r-yes.png">');
				
				
				//1、   长度6-10,s=1     
				//弱：纯数字，纯字母，纯特殊字符, (s=1+1=2)  
				//中：字母+数字，字母+特殊字符，数字+特殊字符     
				//中：字母+数字+特殊字符
				if($("#pwd").val().length <= 10){
					
					// 弱：纯数字，纯字母，纯特殊字符 (s=1+1=2)
					if(pure.test($("#pwd").val())){
					
						$(".strength span").eq(0).css("background","#f8115d");
						$(".strength span").eq(1).css("background","#cacaca");
						$(".strength span").eq(2).css("background","#cacaca");
					}
				
				    //中：字母+数字，字母+特殊字符, 数字+特殊字符 (s=1+1+1=3)    
				    //中：字母+数字+特殊字符 (s=1+1+1+1=4)
					else if( charreg.test($("#pwd").val()) || numreg.test($("#pwd").val()) ){
						$(".strength span").eq(0).css("background","#ff9900");
						$(".strength span").eq(1).css("background","#ff9900");
						$(".strength span").eq(2).css("background","#cacaca");
					    
					}
			    }
				
				// 2、长度11-15,s=2(弱)
				// 中：纯数字，纯字母，纯特殊字符 (s=2+1=3)
				// 中：字母+数字，字母+特殊字符, 数字+特殊字符 (s=2+1+1=4)     
				// 强：字母+数字+特殊字符(中)(s=2+1+1+1=5)
				
				else if($("#pwd").val().length >= 11 && $("#pwd").val().length <= 15){
					
					// 中：纯数字，纯字母，纯特殊字符 (s=2+1=3)
					// 中：字母+数字，字母+特殊字符, 数字+特殊字符 (s=2+1+1=4)
					if(pure.test($("#pwd").val()) || charreg.test($("#pwd").val())){
						
						$(".strength span").eq(0).css("background","#ff9900");
						$(".strength span").eq(1).css("background","#ff9900");
						$(".strength span").eq(2).css("background","#cacaca");
					}
					
					// 强：字母+数字+特殊字符(s=2+1+1+1=5)
					else if(numreg.test($("#pwd").val())){
						$(".strength span").eq(0).css("background","#0ff31a");
						$(".strength span").eq(1).css("background","#0ff31a");
						$(".strength span").eq(2).css("background","#0ff31a");
					}
					
				}
				
				// 3、长度16-20,s=3(中)
				// 中：纯数字，纯字母，纯特殊字符 (s=3+1=4)
				// 强：字母+数字，字母+特殊字符, 数字+特殊字符 (s=3+1+1=5)     
				// 强：字母+数字+特殊字符 (s=3+1+1+1=6)
				else if( $("#pwd").val().length >= 16 && $("#pwd").val().length <= 20 ){
					
					// 中：纯数字，纯字母，纯特殊字符 (s=3+1=4)
					if(pure.test($("#pwd").val())){
						$(".strength span").eq(0).css("background","#ff9900");
						$(".strength span").eq(1).css("background","#ff9900");
						$(".strength span").eq(2).css("background","#cacaca");
					}
					
					// 强：字母+数字，字母+特殊字符, 数字+特殊字符 (s=3+1+1=5)     
				    // 强：字母+数字+特殊字符 (s=3+1+1+1=6)
					else if(charreg.test($("#pwd").val()) || numreg.test($("#pwd").val())){
						$(".strength span").eq(0).css("background","#0ff31a");
						$(".strength span").eq(1).css("background","#0ff31a");
						$(".strength span").eq(2).css("background","#0ff31a");
					}
					
				}	
			}
			
		})
		//确认密码
		$("#again").focus(function(){
			$("#again").css("border-color","#7bcbf4");
		})
		
		$("#again").blur(function(){
			
			if( $("#again").val()==$("#pwd").val()){
				key4 = true;
				$("#again").css("border-color","#0ff31a");
				$(".true-hint").html(' <img src= "../images/r-yes.png">');
			}
			else{
				$("#again").css("border-color","#f8115d");
				$(".true-hint").html(' <img src= "../images/r-no.png">密码输入不正确').css("color","#f8115d");
			}
			
		})
		
		//邮箱验证
		$("#email").focus(function(){
			$("#email").css("border-color","#7bcbf4");
		})
		
		$("#email").blur(function(){
			
			var pattern = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
			
			if(pattern.test($("#email").val())){
				key5 = true;
				$("#email").css("border-color","#0ff31a");
				$(".email-hint").html(' <img src= "../images/r-yes.png">');
			}
			else if($("#email").val()==""){
				$("#email").css("border-color","#ff9900");
				$(".email-hint").html(' <img src= "../images/r-warn.png">邮箱不能为空').css("color","#ff9900");
			}
			else{
				$("#email").css("border-color","#f8115d");
				$(".email-hint").html(' <img src= "../images/r-no.png">请输入有效的邮箱').css("color","#f8115d");
			}
		})
		
		$("#register-but").click(function(){
			if( key1==true && key2==true && key3==true && key4==true && $("#check").prop("checked", true)){
				//ajax
	            var xhr = new XMLHttpRequest();
	            xhr.open("post", "http://127.0.0.1/zhongjiu/php/register.php", true);
	            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	            var str = "username="+ $("#username").val() + "&pwd=" + $("#pwd").val() +"&email=" + $("#email").val();
	            xhr.send(str);
	            xhr.onreadystatechange = function () {
	            	
	                if (xhr.readyState==4 && xhr.status==200){
	                    var obj=JSON.parse(xhr.response);
							
						if(obj.status==1){
							alert(obj.msg);
							location.href="login.html";
						}
						
						else{
							alert(obj.msg);
						}
	                    
	                }
	                
	            }
			}
			
		})
		
    })