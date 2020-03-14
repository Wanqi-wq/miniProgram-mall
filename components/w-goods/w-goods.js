// components/w-goods/w-goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   list:{
     type:Array,
     value:[]
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
    onTap(event) {
      //将点击的商品的id传给父组件
      const iid = event.currentTarget.dataset.iid
      this.triggerEvent('good-click',{iid},{})
    }
  }
})
