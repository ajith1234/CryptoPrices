<template>
  <div id="app">
    <v-app id="inspire">
      <nav-bar></nav-bar>
      <v-container fluid fill-height>
         <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
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

          //Login and signup alerts
          ipcRenderer.on("alertError", (event, data) => {
            alert(data)
          })

          ipcRenderer.on("set-auth", (event, user)=>{
            console.log("Setting vuex state")
           
            this.$store.commit("setAuth")
            //
            this.$router.push('home')
          })

          ipcRenderer.on("set-user", (event, user)=>{
            console.log("setting vuex user state")
            console.log(user)
            this.$store.commit("setUser", user)
            
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
