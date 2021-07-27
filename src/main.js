import   { createApp } from "vue";
import App from "./App.vue";
import {createStore} from "vuex";
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret} from '@fortawesome/free-solid-svg-icons'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)

const store = createStore({
  state(){
    return{
      numb:1,
      nav: true,
      bookmark : [],
      followers : []
    }
  },
  mutations:{
    increase(state){
      state.numb++
    },
    decrease(state, payload){
      state.numb += payload.anything
    },
    closeNav(state){
      return state.nav = false
    },
    openNav(state){
      return state.nav = true
    },
    setFollower(state, payload){
      state.followers = payload.payload
    },
    setBookmark(state, payload){
      state.bookmark = payload.payload

    },
    increaseBook(state, payload){
      state.bookmark = payload.payload
    },
    increaseFollower(state, payload){
      state.followers.unshift(payload.payload)
    },
    decreaseBook(state, payload){
      state.bookmark.splice(payload.payload, 1)
    },
    unFollow(state, payload){
      state.followers.splice(payload.payload, 1)
    }
  },
  actions:{
    increment(context, payload){
    context.commit("decrease", payload)
    },
    closeNav(context){
      context.commit("closeNav")
    },
    openNav(context){
      context.commit("openNav")
    },
    setFollower(context, payload){
      context.commit("setFollower", payload)
    },
    setBookmark(context, payload){
      context.commit("setBookmark", payload)
    },
    increaseBook(context, payload){
      context.commit("increaseBook", payload)
    },
    increaseFollower(context, payload){
      context.commit("increaseFollower", payload)
    },
    decreaseBook(context, payload){
      context.commit("decreaseBook", payload)
    },
    unFollow(context, payload){
      context.commit("unFollow", payload)
    },
  }
})

createApp(App).use(router).use('font-awesome-icon', FontAwesomeIcon).use(store).mount("#app");
