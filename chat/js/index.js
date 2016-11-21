loadHistoryMessages();
loadFriends();

function myAnimateObject(speed) {
	this.speed = speed;
	this.elements = {
		$chat : $(".chat"),
		$slideNav : $(".slide-friend"),
		$slideNavButtonTop : $(".slide-friend-button-top"),
		$slideNavButtonBottom : $(".slide-friend-button-bottom"),
		$listMessagesBox : $("#list-messages-box")
	};
	this.slideNavOpen = function(speed) {
		this.elements.$chat.velocity({
			translateX : "40%"
		}, speed);
		this.elements.$slideNav.velocity({
			translateX : "100%"
		}, speed);
		this.elements.$slideNavButtonTop.velocity({
			rotateZ : "-45deg",
		}, speed);
		this.elements.$slideNavButtonBottom.velocity({
			rotateZ : "45deg",
		}, speed);
	};
	this.slideNavClose = function(speed) {
		this.elements.$chat.velocity({
			translateX : "0%"
		}, speed);
		this.elements.$slideNav.velocity({
			translateX : "0%"
		}, speed);
		this.elements.$slideNavButtonTop.velocity({
			rotateZ : "45deg",
		}, speed);
		this.elements.$slideNavButtonBottom.velocity({
			rotateZ : "-45deg",
		}, speed);
	};
	this.messagesScrollToBottom = function(speed) {
		if (IsPC() && !$.browser.webkit) {
			this.$listMessagesBox.mCustomScrollbar("update");
			this.$listMessagesBox.mCustomScrollbar("scrollTo", "bottom");
		} else {
			this.$listMessagesBox.stop().animate({
				scrollTop : this.$listMessagesBox[0].scrollHeight
			}, speed);
		}
	};
}

var myAnimateObject = new myAnimateObject(500);

var websocket;
var webSocketErrorDisconnect = false;
if ('WebSocket' in window) {
	websocket = new WebSocket(socketPath);
} else {
	websocket = new SockJS(sockJSPath);
}

websocket.onopen = webSocketOnOpen;
websocket.onmessage = webSocketOnMessage;
websocket.onerror = webSocketOnError;
websocket.onclose = webSocketOnClose;

function webSocketOnOpen(event) {
	console.log("连接成功");
	window.clearInterval(websocket.breakTimer);
	websocket.heartbeatTimer = setInterval(function() {// 心跳包
		var heartbeatData = JSON.stringify({
			"title" : "heartbeat",
			"message" : "heartbeat"
		});
		websocket.send(heartbeatData);
	}, 50000)
}
function webSocketOnMessage(result) {
	var resultData = jQuery.parseJSON(result.data);
	if (resultData.state == 1999) {
		if (document.hidden) {// 如果瀏覽器當前標籤頁顯示的不是此頁面則調用HTML5桌面原生彈窗
			showMsgNotification({
				title : "系統通知",
				message : resultData.message
			});
		} else {
			myAlert(resultData.message);
		}
	} else if (resultData.title == "login") {
		myComponentListFriend.friendStatus(resultData.data, true);
	} else if (resultData.title == "logout") {
		myComponentListFriend.friendStatus(resultData.data, false);
	} else {
		dealWithMessage(resultData);
	}
}
function webSocketOnError(execption) {
	webSocketErrorDisconnect = true;
	console.log("连接出错");
}
function webSocketOnClose(event) {
	window.clearInterval(websocket.heartbeatTimer);
	websocket.breakTimer = setInterval(function() {
		if (webSocketErrorDisconnect) {// 斷線重連機制
			if ('WebSocket' in window) {
				websocket = new WebSocket(socketPath);
			} else {
				websocket = new SockJS(sockJSPath);
			}
			websocket.onopen = webSocketOnOpen;
			websocket.onmessage = webSocketOnMessage;
			websocket.onerror = webSocketOnError;
			websocket.onclose = webSocketOnClose;
			webSocketErrorDisconnect = false;
		}
	}, 5000)
	console.log("与服务器断开连接");
}

function sendMessage() {
	if ($("#text").val().trim() == "") {
		return;
	}
	if (websocket != null) {
		var data = JSON.stringify({
			"title" : "memberMessage",
			"message" : $("#text").val().trim(),
			"toMemberId" : recipientMemberId
		});
		$("#text").val("");
		websocket.send(data);
		myAnimateObject.messagesScrollToBottom(500);
	} else {
		alert('未与服务器链接.');
	}
}

function dealWithMessage(resultData) {
	if (document.hidden) {// 如果瀏覽器當前標籤頁顯示的不是此頁面則調用HTML5桌面原生彈窗
		if (resultData.toMemberId == senderMemberId) {
			var memberId = resultData.memberId;
			var memberImgBase64Data = $(
					".list-friends li[data-id=" + memberId + "] img").attr(
					"src");
			var memberName = $(
					".list-friends li[data-id=" + memberId + "] .user").text();
			showMsgNotification({
				title : memberName
						+ "  "
						+ new Date(resultData.date)
								.Format("yyyy-MM-dd hh:mm:ss"),
				message : resultData.message,
				Img : memberImgBase64Data
			});
		}
	}

	if (senderMemberId == resultData.memberId
			|| senderMemberId == resultData.toMemberId
			&& recipientMemberId == resultData.memberId) {// 當前聊天的人
		myComponentListMessage.addOneData(resultData);
		$(".count").text(parseInt($(".count").text()) + 1);
	} else if ($(".list-friends li[data-id=" + resultData.memberId + "]").length == 0) {// 發送消息過來的人不是正在聊天的人
		loadFriends();
	}
}

$(function() {

	$(".slide-friend-button").on("click", function() {
		if ($(this).attr("data-isShowSlideNav") == "true") {
			myAnimateObject.slideNavClose();
			$(this).attr("data-isShowSlideNav", "false");
		} else {
			myAnimateObject.slideNavOpen();
			$(this).attr("data-isShowSlideNav", "true");
		}
	});

	$(".send").bind('click', function() {
		sendMessage();
	});

	$("#text").keydown(function(e) {
		if (e.keyCode == 13) {
			sendMessage();
		}
	});

	$("#text").on("focus", function() {
		myAnimateObject.messagesScrollToBottom();
	});

	Notification.requestPermission();// 获取允许桌面通知的权限

});