// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    currentIndex: 0,
    categoryData: [],
    title: ['综合', '新品', '销量'],
    currentType: 'pop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      //1.请求分类数据，并保存下来
      let list = res.data.data.category.list
      this.setData({
        categories: list
      })
      //2.初始化各分类数据
      for (let i = 0; i < this.data.categories.length; i++) {
        let categorydata = `categoryData[${i}]`
        this.setData({
          [categorydata]: {
            subCategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        })
      }
      //请求第一个分类的数据
      this._getSubcategories(0)
    }).catch(err => {
      console.log(err)
    })
  },
  _getSubcategories(index) {
    //获取对应的子标题
    let maitKey = this.data.categories[index].maitKey
    getSubcategory(maitKey).then(res => {
      let subCategories = `categoryData[${index}].subCategories`
      this.setData({
        [subCategories]: res.data
      })
      this._getCategoryDetail('pop')
      this._getCategoryDetail('sell')
      this._getCategoryDetail('new')

    })
  },
  _getCategoryDetail(type) {
    //获取内容详情
    let miniWallkey = this.data.categories[this.data.currentIndex].miniWallkey
    getCategoryDetail(miniWallkey, type).then(res => {
      //将请求的数据保存下来
      let categoryDetail = `categoryData[${this.data.currentIndex }].categoryDetail.${type}]`
      this.setData({
        [categoryDetail]: res
      })
    })

  },
  itemClick(e) {
    //切换currentIndex
    this.setData({
      currentIndex: e.detail.index
    })
    this._getSubcategories(e.detail.index)
  },
  tabClick(e) {
    //切换currentType
    let type = e.detail.index === 0 ? 'pop' : e.detail.index === 1 ? 'new' : 'sell'
    this.setData({
      currentType: type
    })
  }
})