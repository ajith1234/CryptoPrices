<template>
  <div id="app">
    <v-app id="inspire">
      <nav-bar></nav-bar>
      <v-container dark fluid fill-height color="white" :class="{'px-0': $vuetify.breakpoint.xsOnly }">
       <v-slide-y-transition mode="out-in">
            <router-view class="content"></router-view>
          </v-slide-y-transition>
      </v-container>
    <v-footer app fixed>
       
      <span class="ml-1">&copy; Ajith Abraham 2018</span>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
   import Navbar from './components/Navbar.vue'
  import {ipcRenderer} from 'electron'
   

   

  export default {
    name: 'cryptoprices',
    components: {
      'nav-bar': Navbar
    },
    mounted(){
          
         

           //Calls to Main Process for Coin data and repeats
           this.$store.dispatch("getData")
           setInterval(()=>{this.$store.dispatch("getData")}, 1000)
           
           //sets the result returned from data->main->app in the vuex store
           ipcRenderer.on("set-data", (event, data) => {
            this.$store.commit("setData", data)
          })

          ipcRenderer.on("auth-error", (event, data) => {
            alert(data)
          })
       
    
  },
    data: () => ({
        
     
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */

 html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0;
    background: transparent;  /* optional: just make scrollbar invisible */
}



</style>
