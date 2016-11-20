$(function() {
	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"
		];
		var flag = true;
		for(var v = 0; v < Agents.length; v++) {
			if(userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	if(IsPC() && !$.browser.webkit) {
		$.mCustomScrollbar.defaults.axis = "y"; //enable 2 axis scrollbars by default
		$("#list-friends-box").mCustomScrollbar({
			mouseWheelPixels: 200
		});
		$(".messages").mCustomScrollbar({
			theme: "dark",
			mouseWheelPixels: 200
		});
		$("#list-friends-box").css("overflow", "hidden");
		$(".messages").css("overflow", "hidden");
	}

	var jelfAnimateObject = new jelfAnimateObject(500);

	function jelfAnimateObject(speed) {
		this.speed = speed;
		this.slideNavOpen = function(speed) {
			$(".slide-nav").velocity({
				translateX: "100%"
			}, speed);
			$(".slide-nav-button-top").velocity({
				rotateZ: "-45deg",
			}, speed);
			$(".slide-nav-button-bottom").velocity({
				rotateZ: "45deg",
			}, speed);
		};
		this.slideNavClose = function(speed) {
			$(".slide-nav").velocity({
				translateX: "0%"
			}, speed);
			$(".slide-nav-button-top").velocity({
				rotateZ: "45deg",
			}, speed);
			$(".slide-nav-button-bottom").velocity({
				rotateZ: "-45deg",
			}, speed);
		};

		this.messagesScrollToBottom = function(speed) {
			if(IsPC() && !$.browser.webkit) {
				$(".messages").mCustomScrollbar("update");
				$(".messages").mCustomScrollbar("scrollTo", "bottom");
			} else {
				$(".messages").animate({
					scrollTop: $(".messages")[0].scrollHeight
				}, speed);
			}
		};
	}

	$(".slide-nav-button").on("click", function() {
		if($(this).attr("data-isShowSlideNav") == "true") {
			jelfAnimateObject.slideNavClose();
			$(this).attr("data-isShowSlideNav", "false");
		} else {
			jelfAnimateObject.slideNavOpen();
			$(this).attr("data-isShowSlideNav", "true");
		}
	});

	jelfAnimateObject.messagesScrollToBottom(1000);

	// 输入框回车发送消息事件
	$("#text").keydown(function(e) {
		if(e.keyCode == 13) {
			// TODO 发送消息
		}
	})
	
	var websocket;
	if('WebSocket' in window) {
		websocket = new WebSocket("ws://localhost:8080/SpringWebSocketHibernate/ws");
	} else if('MozWebSocket' in window) {
		websocket = new MozWebSocket("ws://ws");
	} else {
		websocket = new SockJS("http://localhost:8080/SpringWebSocketHibernate/sockjs/ws");
	}
	websocket.onopen = function(event) {
		console.log("连接成功")
	};
	websocket.onmessage = function(event) {
		dealWithMessage(event);
	};
	websocket.onerror = function(event) {
		console.log("连接出错")
	};
	websocket.onclose = function(event) {
		console.log("与服务器断开连接")
	};

	$(".send").bind('click', function() {
		send();
	});

	$("#text").keydown(function(e) {
		if(e.keyCode == 13) {
			send();
		}
	});
	$("#text").focus();

	function send() {
		if($("#text").val().trim() == "") {
			return;
		}
		if(websocket != null) {
			var data = JSON.stringify({
				"toUserId": "91e8319d-2bef-48f9-b857-2bd139379399",
				"message": $("#text").val().trim()
			});
			$("#text").val("");
			websocket.send(data);
		} else {
			alert('未与服务器链接.');
		}
	}

	function dealWithMessage(event) {
		var data = jQuery.parseJSON(event.data);
		var message = data.message.replace("&", "&amp;").replace("<", "&lt;");
		var date = new Date(data.date).Format("hh:mm:ss");
		console.log(message);
		if(userId == data.userId) {
			// 发送者
			$(".messages")
				.append(
					"<li class='friend-message'>"+
						"<div class='head'>"+
							"<span class='time'>"+date+"</span>"+
							"<span class='name'>friend</span>"+
						"</div>"+
						"<div class='message'>"+message+"</div>"+
					"</li>");
		} else {
			$(".messages")
				.append(
					"<li class='i'>"+
						"<div class='head'>"+
							"<span class='time'>"+date+"</span>"+
							"<span class='name'>我</span>"+
						"</div>"+
						"<div class='message'>"+message+"</div>"+
					"</li>");
		}
		// TODO jquery scroll无法append进去
		jelfAnimateObject.messagesScrollToBottom(1000);
	}
});