// pages/cart/childComps/cart-list-item/cart-list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
     
    },
    checkAll:{
      type: Boolean,
      value: true 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkToggle() {
      //点击改变是否选中
      const index = getApp().globalData.cart.findIndex(item => item.iid === this.data.item.iid)
      getApp().globalData.cart[index].checked = ! getApp().globalData.cart[index].checked
      //将点击这个事件传出去
      this.triggerEvent('checkToggle',{item:this.data.item},{}) 
    }
  }
})
