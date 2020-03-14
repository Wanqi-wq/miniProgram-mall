// pages/detail/detail.js
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from '../../service/detail.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iid: null,
    topImages: [],
    goods: {},
    shop: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommendList: [],
    isShow: false,
    isLoad: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getDetail()
    this._getRecommend()
  },
  _getDetail() {
    //请求商品详情的数据
    //.获取商品的iid
    const iid = getCurrentPages()[1].__displayReporter.query.iid
    getDetail(iid).then(res => {
      //1.获取商品
      let result = res.data.result
      //2.获取轮播图数据
      const topImages = result.itemInfo.topImages
      //3.获取商品信息
      const goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
      //4.获取店铺信息
      const shop = new Shop(result.shopInfo)
      //5.保存商品的详情数据
      const detailInfo = result.detailInfo
      //6.保存尺码参数
      const paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)
      //7.获取评论
      if (result.rate.cRate !== 0) {
        var commentInfo = result.rate.list[0];
      }
      this.setData({
        iid,
        topImages,
        goods,
        shop,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })

  },
  _getRecommend() {
    //获取页面跳转时传过来的商品iid
    const iid = getCurrentPages()[1].__displayReporter.query.iid
    getRecommend(iid).then(res => {
      //8.获取推荐数据
      const recommendList = res.data.data.list
      this.setData({
        recommendList
      })
    })
  },
  onPageScroll(options) {
    // 页面滚动时触发的处理函数,控制backtop是否显示
    let isShow = false;
    isShow = options.scrollTop > 1000 ? true : false
    if (this.data.isShow !== isShow) {
      this.setData({
        isShow
      })
    }
  },
  ScrollToTop() {
    //页面滚动到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      isLoad: true
    })
  },

  addToCart() {
    if (!this.data.isLoad) {
      //保证页面加载完成之后才能进行加入购物车
      return
    }
    //获取全局变量
    let cartList = getApp().globalData.cart
    let oldProduct = cartList.find(item => item.iid === this.data.iid)
    let oldProductIndex = cartList.findIndex(item => item.iid === this.data.iid)
    if (oldProduct) {
      //购物车中已存在该商品
      //1.数量加1
      cartList[oldProductIndex].count++;
      wx.showToast({
        title: '当前商品数量+1',
        duration: 1000,
        icon: 'success'
      })
    } else {
      //购物车中没有该商品
      cartList.push({
        iid: this.data.iid,
        count: 1,
        checked: true,
        img: this.data.topImages[0],
        product: this.data.goods
      })
      wx.showToast({
        title: '加入购物车成功',
        duration: 1000,
        icon: 'success'
      })
    }
    wx.setStorageSync('cart', cartList)
  }
})