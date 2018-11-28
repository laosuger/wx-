// pages/details/details.js


Page({
	data: {
		btnText: "下",
		bool: false,
		movieDetails: "",
		colorBool: true
	},
	toggle: function() {
		if (this.data.btnText === "上") {
			this.setData({
				btnText: "下",
				bool: false
			})
		} else {
			this.setData({
				btnText: "上",
				bool: true
			})
		}
	},
	onLoad: function(query) {
//		var that = this
//		wx.cloud.init({
//			env:"text-3dac2d"
//		})
		 console.log(query)

//		wx.cloud.callFunction({
//			name: "showData",
//			data: {
//				movieName: query.movieName
//			}
//			
//		}).then(function(res) {
//			that.setData({
//				movieDetails: res.result.data[0]
//			})
//		})
	},
	handleClick: function() {
		var that = this
		var arr= []
		
		try{
			var v = wx.getStorageSync('filmInfo')
			if(v){
				arr = v
			}
		}catch(e){
			arr = []
		}
		
		if (this.data.colorBool) {
			this.setData({colorBool: false})
			wx.showToast({
				title: '收藏成功',
				icon: 'none',
				duration: 1500
			})
			arr.push(that.data.movieDetails.movieName)
			wx.setStorage({
				key:"filmInfo",
				data:arr
			})
		} else {
			this.setData({colorBool: true})
		}
	}
})
