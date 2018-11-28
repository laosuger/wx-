// pages/details/details.js
var QQMapWX = require('../.././libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
	data: {
		list: [],
		markers: [],
		latitude: "",
		longitude: ""
	},
	onLoad: function() {
		var that = this
		//初始化密钥
		qqmapsdk = new QQMapWX({
			key: 'TY7BZ-NQCWU-DVAVZ-2EJS6-EVJMK-5XBST'
		});
		wx.getLocation({
			success:function(res){
				that.setData({latitude:res.latitude,longitude:res.longitude})
			}
		})
	},
	onShow: function() {
		var that = this
		qqmapsdk.search({
			keyword: "电影院",
			success: function(res) {
				// res.data
				var mks = []
				for (var i = 0; i <= res.data.length - 1; i++) {
					mks.push({ // 获取返回结果，放到mks数组中
						title: res.data[i].title,
						id: res.data[i].id,
						latitude: res.data[i].location.lat,
						longitude: res.data[i].location.lng,
						iconPath: "/resources/my_marker.png", //图标路径
						width: 20,
						height: 20
					})
				}
				that.setData({markers:mks})
			}
		})
	}
})
