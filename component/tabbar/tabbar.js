// component/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		
  },
  data: {
	tabbar:{},
	curRoute:''
  },
  attached() {
    this.data.tabbar = getApp().globalData.tabbar;
    let pages = getCurrentPages();
    this.data.curRoute = pages[pages.length - 1].route;
    this.setData(this.data)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    redirectTo(e){
      console.log(e)
      let taburl = e.currentTarget.dataset.taburl;
      if(taburl == this.data.curRoute) return
      wx.reLaunch({
        url:"/"+taburl
      })
    }
	}
})
