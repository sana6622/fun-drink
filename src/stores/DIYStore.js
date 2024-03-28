import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore ('DIYStore' ,{
  state: ()=>({
    diyProducts:[],
    diyBasic:[],
    diyIngredient:[],
    diySweet:[],

  }),
  actions:{
    addToDIY(product){
      console.log('pinia cate',product.category)
      if(product.category ==='茶類' || product.category ==='果汁' || product.category ==='其他基底'){
        const check = this.diyBasic.some((item) => item.id === product.id)
        if(!check) this.diyBasic.push(product)
      }else if(product.category ==='口感配料' || product.category ==='水果類' || product.category ==='香料與草本'|| product.category ==='其他配料'){
        const check = this.diyIngredient.some((item) => item.id === product.id)
        if(!check) this.diyIngredient.push(product)
      }else if(product.category ==='糖類'){
        const check = this.diySweet.some((item) => item.id === product.id)
        if(!check) this.diySweet.push(product)
      }
   
    }
  }
})
