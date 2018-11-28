Page({
  data: {
		value:"",
		list:[]
  },
	input:function(event){
		this.setData({value:event.detail.value})
	},
	search:function(){
		// console.log(this.data.value)
		var that = this
		wx.cloud.init({
			env: "test-18fdcd"
		})
		wx.cloud.callFunction({
			name: "showDetailsPages",
			data: {
				movieName: that.data.value
			}
		}).then(function(res) {
			that.setData({list:res.result.data})
			console.log(res)
// 			if(res.result.data.length === 0){
// 				wx.showToast({
// 					title: '没有此影片',
// 					icon: 'none',
// 					duration:2000
// 				})
// 			}else{
// 				wx.navigateTo({
// 					url: '/pages/details/details?movieName='+that.data.value
// 				})
// 			}
		})
	}
})
