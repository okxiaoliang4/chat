var Messages = React.createClass({displayName: "Messages",
	getInitialState : function () {
		return {
			messagesListData: {
				senderMemberId:senderMemberId,
				recipientMemberId:recipientMemberId,
				messagesData:[]
			}
		};
	},
	handleChange : function (rows) {
		this.setState({
			messagesListData: {
				senderMemberId:senderMemberId,
				recipientMemberId:recipientMemberId,
				messagesData:rows
			}
		});
	},
	addOneData : function (row) {
		var messagesData = this.state.messagesListData.messagesData;
		messagesData[messagesData.length] = row;
		this.setState(messagesData);
	},
	render : function() {
		return( 
			React.createElement(MessagesList, {
			senderMemberId: this.state.messagesListData.senderMemberId, 
			recipientMemberId: this.state.messagesListData.recipientMemberId, 
			messagesData: this.state.messagesListData.messagesData})
		);
	}
});

var MessagesList = React.createClass({displayName: "MessagesList",
	render: function() {
		var senderMemberId = this.props.senderMemberId;
		var recipientMemberId = this.props.recipientMemberId;
		var messagesRows = this.props.messagesData.map(function(message) {
			return(
				React.createElement(MessagesRow, {
				date: message.date, 
				message: message.message, 
				memberId: message.memberId, 
				toMemberId: message.toMemberId, 
				senderMemberId: senderMemberId, 
				recipientMemberId: recipientMemberId})
			);
		});
		return( 
			React.createElement("ul", {className: "messages"}, 
				messagesRows
			)
		);
	}
});

var MessagesRow = React.createClass({displayName: "MessagesRow",
	render: function() {
		this.props.date = new Date(this.props.date).Format("yyyy-MM-dd hh:mm:ss");
		if(this.props.memberId==this.props.senderMemberId){
			return(
				React.createElement("li", {className: "i"}, 
					React.createElement("div", {className: "head"}, 
						React.createElement("span", {className: "time"}, this.props.date), 
						React.createElement("span", {className: "name"}, "我")
					), 
					React.createElement("div", {className: "message"}, this.props.message)
				)
			);
		}else if(this.props.senderMemberId == this.props.toMemberId && this.props.recipientMemberId == this.props.memberId){
			return(
				React.createElement("li", {className: "friend-message"}, 
					React.createElement("div", {className: "head"}, 
						React.createElement("span", {className: "name"}, "friend"), 
						React.createElement("span", {className: "time"}, this.props.date)
					), 
					React.createElement("div", {className: "message"}, this.props.message)
				)
			);
		}else{
			return(
				null
			);
		}
	}
});

var myComponentListMessage = ReactDOM.render( 
	React.createElement(Messages, null) ,
	document.getElementById("list-messages-box")
);

myComponentListMessage.componentDidUpdate = function(){
	console.log("myComponentListMessage组件更新完成");
	if (IsPC() && !$.browser.webkit) {
		$.mCustomScrollbar.defaults.axis = "y";
		$("#list-messages-box").mCustomScrollbar({
			theme : "dark",
			mouseWheelPixels : 200
		});
		$("#list-messages-box").css("overflow", "hidden");
	}
	myAnimateObject.$listMessagesBox = $("#list-messages-box");
	setTimeout(function() {
		myAnimateObject.messagesScrollToBottom();
	}, myAnimateObject.speed);
}
