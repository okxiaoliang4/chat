var Friends = React.createClass({
	getInitialState: function () {
		return {
			friendListData: []
		};
	},
	handleChange: function (rows) {
		this.setState({
			friendListData: rows
		});
	},
	addOneData: function (row) {
		var friendListData = this.state.friendListData;
		friendListData[friendListData.length] = row;
		this.setState(friendListData);
	},
	friendStatus: function(memberId,flag) {
		var friendListData = this.state.friendListData;
		for(var i = 0; i < friendListData.length; i++){
			if(friendListData[i].id == memberId){
				friendListData[i].online = flag;
			}
		}
		this.setState(friendListData);
	},
	render: function() {
		return( 
			<FriendsList friendListData={this.state.friendListData}/>
		);
	}
});

var FriendsList = React.createClass({
	render: function() {
		var friendsRows = this.props.friendListData.map(function(friend) {
			return(
				<FriendsRow 
				id={friend.id}
//				unread={friend.unread} 
				photoData={friend.photoData} 
				name={friend.name} 
				online={friend.online}></FriendsRow>
			);
		});
		return( 
			<ul className="list-friends">
				{friendsRows}
			</ul>
		);
	}
});

var FriendsRow = React.createClass({
	render: function() {
//		if(this.props.unread>99){
//			var unread = "99+";
//		}else{
//			var unread = this.props.unread;
//		}
		var photo;
		if (this.props.photoData == undefined || this.props.photoData==null) {
			photo = "../img/memberDefaultHeadImage.png";
		} else {
			photo = "data:image/png;base64," + this.props.photoData;
		}
		var statusClassName = "";
		var statusText = "";
		if(this.props.online){
			statusClassName = "status on";
			statusText = "在線";
		}else{
			statusClassName = "status off";
			statusText = "離線";
		}
		return(
			<li data-id={this.props.id}>
				<img src = {photo} />
				<div className = "info" >
					<div className = "user" > {this.props.name} < /div> 
					<div className = {statusClassName}>{statusText}< /div>
				</div>
			</li>
		);
	}
});

var myComponentListFriend = ReactDOM.render( 
	<Friends/> ,
	document.getElementById("list-friends-box")
);

myComponentListFriend.componentDidUpdate = function(){
	console.log("myComponentListFriend组件更新完成");
	if (IsPC() && !$.browser.webkit) {
		$.mCustomScrollbar.defaults.axis = "y"; 
		$("#list-friends-box").mCustomScrollbar({
			mouseWheelPixels : 200
		});
		$("#list-friends-box").css("overflow", "hidden");
	}
	$(".list-friends li").on("click",function(){
		recipientMemberId = $(this).attr("data-id");
		loadHistoryMessages();
		if ($(".slide-friend-button").attr("data-isShowSlideNav") == "true") {
			myAnimateObject.slideNavClose();
			$(".slide-friend-button").attr("data-isShowSlideNav", "false");
		}
	});
}