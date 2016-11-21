Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad",
			"iPod" ];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
	return uuid;
};

function myAlert(str, callBack) {
	var uuid = generateUUID();
	var myAlert = "<div id="
			+ uuid
			+ " class='myAlert myAlertShow'>"
			+ "<img class='myAlertImg' src='../img/alert.png' width='30' height='30'>"
			+ "<span class='myAlertText'>" + str + "</span>"
			+ "<span class='myAlertClose'>X</span>"
			+ "<span class='myAlertProgress'></span></div>";
	$(".myAlertBox").append(myAlert);
	$(".myAlertClose").on("click", function() {
		myAlertClose($(this).parent(), callBack);
	});
	$("#" + uuid + " .myAlertProgress").stop().velocity({
		"width" : "0%"
	}, {
		"duration" : 5000,
		"complete" : function() {
			myAlertClose($("#" + uuid), callBack);
		}
	});

	function myAlertClose(jqueryElement, callBack) {
		jqueryElement.stop().velocity({
			"opacity" : "0",
			"translateY" : "-30%"
		}, {
			"duration" : 1000,
			"complete" : function() {
				$("#" + uuid).remove();
				if (typeof callBack === 'function') {
					callBack();
				}
			}
		});
	}
}

function closeWindow() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			window.opener = null;
			window.close();
		} else {
			window.open('', '_top');
			window.top.close();
		}
	} else if (navigator.userAgent.indexOf("Firefox") > 0) {
		window.location.href = 'about:blank ';
	} else {
		window.opener = null;
		window.open('', '_self', '');
		window.close();
	}
}

function showMsgNotification(option) {
	var Notification = window.Notification || window.mozNotification
			|| window.webkitNotification;

	if (Notification && Notification.permission === "granted") {
		var instance = new Notification(option.title, {
			body : option.message,
			icon : option.Img
		});

		instance.onclick = function() {
			// Something to do
		};
		instance.onerror = function() {
			// Something to do
		};
		instance.onshow = function() {
			// Something to do
			// console.log(instance.close);
			// setTimeout(instance.close, 3000);
		};
		instance.onclose = function() {
			// Something to do
		};
	} else if (Notification && Notification.permission !== "denied") {
		Notification.requestPermission(function(status) {
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
			// If the user said okay
			if (status === "granted") {
				var instance = new Notification(option.title, {
					body : option.message,
					icon : option.Img
				});

				instance.onclick = function() {
					// Something to do
				};
				instance.onerror = function() {
					// Something to do
				};
				instance.onshow = function() {
					// Something to do
					// setTimeout(instance.close, 3000);
				};
				instance.onclose = function() {
					// Something to do
				};

			} else {
				return false
			}
		});
	} else {
		return false;
	}

}