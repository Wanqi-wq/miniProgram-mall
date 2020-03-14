Page({

  data: {
    cartList: [],
    checkAll: true,
    checkLength: 0,
    totalPrice: 0
  },
  checkToggle(e) {
    //判断是否需要全选
    let cartList = getApp().globalData.cart
    let checked = cartList.filter(item => item.checked === true)
    let checkAll = true
    if (e.detail.item) {
      //是从上面的item处点击触发的
      if (checked.length === cartList.length) {
        this.setData({
          checkAll: true
        })
      } else {
        checkAll = false
      }
    } else {
      //从下面的全选处点击
      if (!checked || checked.length !== cartList.length) {
        cartList.forEach(item => item.checked = true)
      } else {
        cartList.forEach(item => item.checked = false)
        checkAll = false
      }
    }
    checked = cartList.filter(item => item.checked === true)
    //商品的价格计算
    let totalPrice = checked.length > 0 ? checked.reduce((preVal, good) => preVal + parseFloat(good.product.realPrice * good.count), 0) : 0
    //将变化储存在全局变量和本地中
    getApp().globalData.cart = cartList
    wx.setStorageSync('cart', cartList)
    this.setData({
      checkAll,
      cartList,
      checkLength: checked.length, //商品被选中的个数
      totalPrice: totalPrice.toFixed(2)
    })
  },
  calcClick() {
    if (this.data.checkLength == 0) {
      wx.showToast({
        title: '请选择商品',
        duration: 1000,
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let AppInstnce = getApp()
    this.setData({
      cartList: AppInstnce.globalData.cart
    })
    //修改标题
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`
    })
    //获取购物车中被选择的商品数量
    this.setData({
      checkLength: getApp().globalData.cart.filter(item => item.checked === true).length,
      totalPrice: getApp().globalData.cart.filter(item => item.checked === true).reduce((preVal, good) => preVal + parseFloat(good.product.realPrice * good.count), 0)
    })
  }
})