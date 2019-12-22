import Vue from 'vue'
import Vuex from 'vuex'
import lists from './modules/lists'
import items from './modules/items'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    lists,
    items,

  }
})
