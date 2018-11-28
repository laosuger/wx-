Page({
	data: {
		nickName: "",
		avatarUrl: "",
		list:[],
		bool:false
	},
	onLoad: function() {
		var that = this
		wx.getUserInfo({
			success: function(res) {
				that.setData({
					nickName: res.userInfo.nickName,
					avatarUrl: res.userInfo.avatarUrl
				})
			}
		})
		wx.getStorage({
			key:"movies map",
			success:function(res){
				that.setData({list:res.data})
				// console.log(that.data.list)
				if(res.data.length>0){
					that.setData({bool:true})
				}
			}
		})
	}
})
