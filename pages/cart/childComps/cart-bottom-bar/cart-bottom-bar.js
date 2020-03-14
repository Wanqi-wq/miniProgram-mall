// pages/cart/childComps/cart-bottom-bar/cart-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkAll: {
      type: Boolean,
      value: true
    },
    totalPrice: {
      type: Number,
      value: 0
    },
    checkLength: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkClick() {
      //点击全选按钮，判断是否要进行全选
      this.triggerEvent("checkClick", {})
    },
    calcClick() {
      this.triggerEvent("calcClick", {})
    }
  }
})