var Friends = React.createClass({
	render: function() {
		return( 
			<FriendsList data = {this.props.data} />
		);
	}
});

var FriendsList = React.createClass({
	render: function() {
		var friendsRows = this.props.data.map(function(friend) {
			return(
				<FriendsRow 
				headImg={friend.headImg} 
				nickname={friend.nickname} 
				statusClass={friend.statusClass}
				status={friend.status}></FriendsRow>
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
		return(
			<li>
				<img src = {this.props.headImg}/>
				<div className = "info" >
					<div className = "user" > {this.props.nickname} < /div> 
					<div className = {this.props.statusClass}>{this.props.status}< /div> 
				</div>
			</li>
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
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
	nickname: "用户2",
	statusClass:"status off",
	status:"离线"
}, {
	id: 2,
	headImg: "img/1.jpg",
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
	<Friends data={friendlistdata}/> ,
	document.getElementById("list-friends-box")
);