// pages/category/tab-menu/tab-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleIndexClick(e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent("itemClick",{index,item:this.data.categories[index]},{})
    }
  }
})
