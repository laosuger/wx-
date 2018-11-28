
//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../.././libs/qqmap-wx-jssdk.min.js');
var demo = new QQMapWX({
    key: 'GOEBZ-HICCO-QWTWO-SUU42-G25DE-H4FOD' // 必填
});
Page({
	data: {
		active: 0,
		tabTitle: ["正在热映", "即将上映"],
		list:[],
		bannerList:[],
		filmList:[],
		bool:false,
		number:5,
		count:5,
		loadingText:"加载更多...",
		city:""
	},
	handleClick: function(e) {
		var i = e.currentTarget.dataset.index
		this.setData({
			active: i
		})
	},
	onLoad:function(){
		var that = this
		wx.getLocation({
			success:function(res){
				demo.reverseGeocoder({
					location: {
						latitude: res.latitude,
						longitude: res.longitude
					},
					success: function(res) {
						that.setData({city:res.result.address_component.city})
					}
				})
			}
		})
	},
	onShow:function(){
		var that = this
		wx.cloud.init({
			env: 'text-3dac2d'
		})
		wx.cloud.callFunction({
			name:"showData"
		}).then(function(res){
			var newList = res.result.data[0].data
			
			that.setData({list:newList})
			
			var result = newList.slice(0,3)
			
			that.setData({bannerList:result})
			
			var flim = newList.slice(0,5)
			
			that.setData({filmList:flim})
//			console.log(res.result.data[0].data)
		})
	},
	onReachBottom:function(){
		var that = this
		this.setData({bool:true})
		this.setData({number:that.data.number+=that.data.count})
		setTimeout(function(){
			var flim = that.data.list.slice(0,that.data.number)
			
			that.setData({filmList:flim})
			
			that.setData({bool:false})
			
			if(that.data.filmList.length === that.data.list.length){
				that.setData({loadingText:"加载完毕"})
			}
		},2000)
	}
})





