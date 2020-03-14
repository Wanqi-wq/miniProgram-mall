// components/w-tab-control/w-tab-control.js
Component({
  data:{
   currentIndex:0
  },
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },
  methods:{
    itemClick(event) {
     const index = event.currentTarget.dataset.index;
     this.setData({
       currentIndex:index
     })
     this.triggerEvent("item-click",{index,title:this.properties.list[index]},{})
    }
  }
})
