// pages/home/childComps/w-recommend/w-recommend.js
Component({
  data:{
    isLoad:false
  },
  properties: {
    recommends:{
     type:Array,
     value:[]
   }
  },
  methods: {
    imageLoad() {
      if(!this.data.isLoad){
        this.triggerEvent("imageload")
      }
      this.data.isLoad = true;
      
    }
  }
})
