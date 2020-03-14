// pages/home/home.js
import { getMultiData, getGoodsData} from "../../service/home.js"

const TOP_DISTANCE = 1000;
Page({
  data:{
    banners:[],
    recommends:[],
    titles:["流行","新款","精选"],
    goods:{
      "pop": { page: 0, list: [] },
      "new": { page: 0, list: [] },
      "sell": { page: 0, list: [] }
    },
    currentType:"pop",
    currentList:["pop","new","sell"],
    showBackTop: false,
    isFixed: false,
    scrollTop: 0,
    tabCurrentIndex:0
  },
  onLoad: function (options) {
    //请求轮播图,推荐数据
    this._getMultiData()
    //请求上拉加载数据
    this._getGoodsData("pop")
    this._getGoodsData("sell")
    this._getGoodsData("new")
  
  },
  //-------------------------------------------------- 获取数据--------------------------------------------
  _getMultiData() {
    getMultiData().then(res => {
      //保存数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1;
    getGoodsData(page,type).then( res => {

      //获取数据
     const list = res.data.data.list


      //将数据push进原来的数组中
     const oldList = this.data.goods[type].list;
      oldList.push(...list)

      //替换goods[type].list中的数据
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
     this.setData({
       [typeKey]: oldList,
       [pageKey]: page
     }) 
    })
  },
   //--------------------------------------------------事件处理------------------------------------------------
  handleTabClick(event) {
  
   const index = event.detail.index;
   this.data.tabCurrentIndex = index;
   //设置currentType
   this.setData({
     currentType:this.data.currentList[index]
   })

    //使两个tab-control的currentIndex保持一致
    const tabControl = this.selectAllComponents(".control")
    for (let item of tabControl) {
      //item就是tabControl组件
      item.setData({
        currentIndex: index
      }) 
    }
  },

  //页面滚动到底部
  onReachBottom() {
    //上拉加载更多-->请求数据
    this._getGoodsData(this.data.currentType)
  },

  //点击回到顶部
  handleBackTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  //监听页滚动
  //避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时
  onPageScroll(options) {
    const flag1 = options.scrollTop >= TOP_DISTANCE;
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
        })
    }
    const flag2 = options.scrollTop >= this.data.scrollTop;
    if (flag2 != this.data.isFixed){
      this.setData({
        isFixed: flag2
      })
    }
    if(this.data.isFixed) {  //在上面那个tab-control显示出来时，currentIndex为当前选中的index
      this.selectComponent(".control").setData({
        currentIndex: this.data.tabCurrentIndex
      })
    }
   
  },
  //
  imgload() {
    //获取tab-control距顶部的距离
    let scrolltop = this.data.scrollTop;
    wx.createSelectorQuery().select('#tab-control').boundingClientRect( (rect) => {
      this.setData({
        scrollTop: rect.top
      }) 

    }).exec()
  },
  //点击商品，跳转到详情页
  hanldeGoodClick(event) {
    let iid = event.detail.iid
    wx.navigateTo({
      url: '/pages/detail/detail?iid='+ iid,
    })
  }
})