var Messages = React.createClass({
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
			<MessagesList 
			senderMemberId={this.state.messagesListData.senderMemberId}
			recipientMemberId={this.state.messagesListData.recipientMemberId}
			messagesData={this.state.messagesListData.messagesData}/>
		);
	}
});

var MessagesList = React.createClass({
	render: function() {
		var senderMemberId = this.props.senderMemberId;
		var recipientMemberId = this.props.recipientMemberId;
		var messagesRows = this.props.messagesData.map(function(message) {
			return(
				<MessagesRow 
				date={message.date} 
				message={message.message}
				memberId={message.memberId}
				toMemberId={message.toMemberId}
				senderMemberId={senderMemberId}
				recipientMemberId={recipientMemberId}></MessagesRow>
			);
		});
		return( 
			<ul className="messages">
				{messagesRows}
			</ul>
		);
	}
});

var MessagesRow = React.createClass({
	render: function() {
		this.props.date = new Date(this.props.date).Format("yyyy-MM-dd hh:mm:ss");
		if(this.props.memberId==this.props.senderMemberId){
			return(
				<li className="i">
					<div className="head">
						<span className="time">{this.props.date}</span>
						<span className="name">我</span>
					</div>
					<div className="message">{this.props.message}</div>
				</li>
			);
		}else if(this.props.senderMemberId == this.props.toMemberId && this.props.recipientMemberId == this.props.memberId){
			return(
				<li className="friend-message">
					<div className="head">
						<span className="name">friend</span>
						<span className="time">{this.props.date}</span>
					</div>
					<div className="message">{this.props.message}</div>
				</li>
			);
		}else{
			return(
				null
			);
		}
	}
});

var myComponentListMessage = ReactDOM.render( 
	<Messages /> ,
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
