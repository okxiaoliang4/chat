$(function() {
	var jelfAnimateObject = new jelfAnimateObject(500);

	jelfAnimateObject.messagesScrollToBottom();

	$("#text").focus(function() {
		jelfAnimateObject.messagesScrollToBottom();
	});

	// 输入框回车发送消息事件
	$("#text").keydown(function(e) {
		if(e.keyCode == 13) {
			// TODO 发送消息
		}
	})

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
			$(".messages").animate({
				scrollTop: $(".messages")[0].scrollHeight
			}, speed);
		};

		$(".slide-nav-button").on("click", function() {
			if($(this).attr("data-isShowSlideNav") == "true") {
				jelfAnimateObject.slideNavClose();
				$(this).attr("data-isShowSlideNav", "false");
			} else {
				jelfAnimateObject.slideNavOpen();
				$(this).attr("data-isShowSlideNav", "true");
			}
		});
	}
});