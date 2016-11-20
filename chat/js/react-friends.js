var Friends = React.createClass({displayName: "Friends",
	render: function() {
		return( 
			React.createElement(FriendsList, {data: this.props.data})
		);
	}
});

var FriendsList = React.createClass({displayName: "FriendsList",
	render: function() {
		var friendsRows = this.props.data.map(function(friend) {
			return(
				React.createElement(FriendsRow, {
				headImg: friend.headImg, 
				nickname: friend.nickname, 
				statusClass: friend.statusClass, 
				status: friend.status})
			);
		});
		return( 
			React.createElement("ul", {className: "list-friends"}, 
				friendsRows
			)
		);
	}
});

var FriendsRow = React.createClass({displayName: "FriendsRow",
	render: function() {
		return(
			React.createElement("li", null, 
				React.createElement("img", {src: this.props.headImg}), 
				React.createElement("div", {className: "info"}, 
					React.createElement("div", {className: "user"}, " ", this.props.nickname, " "), 
					React.createElement("div", {className: this.props.statusClass}, this.props.status)
				)
			)
		);
	}
});

var friendlistdata = [{
	id: 1,
	headImg: "img/0.jpg",
	nickname: "用户1",
	statusClass:"status on",
	status:"在线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/2.jpg",
	nickname: "用户3",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/3.jpg",
	nickname: "用户4",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/4.jpg",
	nickname: "用户5",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/5.jpg",
	nickname: "用户6",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/6.jpg",
	nickname: "用户7",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户8",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/3.jpg",
	nickname: "用户9",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户10",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/5.jpg",
	nickname: "用户11",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/3.jpg",
	nickname: "用户12",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/2.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/0.jpg",
	nickname: "用户1",
	statusClass:"status off",
	status:"在线"
}];

ReactDOM.render( 
	React.createElement(Friends, {data: friendlistdata}) ,
	document.getElementById("list-friends-box")
);