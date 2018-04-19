<template>
<div>
   <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      
    >
      <v-list dense>
        <v-list-tile
         router
         :to="'home'"
         v-show="Auth">
          <v-list-tile-action >
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  
        router
        :to="'settings'"
        v-show="Auth">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  
        router
        :to="'signup'"
        v-show="!Auth">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  
        router
        :to="'login'"
        v-show="!Auth">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log in</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  
        @click="logout"
        v-show="Auth">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left class="draggable primary darken-3 white--text">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="nodrag white--text"></v-toolbar-side-icon>
      <v-toolbar-title>CryptoPrices</v-toolbar-title>
      <v-spacer></v-spacer>
       <v-btn small icon color="info controls"  v-on:click.native="min" class="nodrag"><v-icon small>remove</v-icon></v-btn>
      <v-btn small icon color="warning controls" v-on:click.native="max" class="nodrag"><v-icon small>add</v-icon></v-btn>
      <v-btn small icon color="error controls" v-on:click.native="close" class="nodrag"><v-icon small>close</v-icon></v-btn>
    </v-toolbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "navbar",
    data: () => ({
        drawer: false
    }),
    methods: {
       close: function () {
           this.$electron.remote.app.quit()
       },
       min: function () {
           this.$electron.remote.getCurrentWindow().minimize()

       },
       max: function () {
           this.$electron.remote.getCurrentWindow().maximize()
       },

       logout: function() {
          this.$electron.ipcRenderer.send("logout")
          this.$store.commit("setAuth")
          this.$store.commit("destroyUser")
          this.$router.push('login')
       }

       
    },
    computed: {
    
    ...mapGetters({
      Auth:'getAuth'
    })  
    
    
    }
}
</script>

<style scoped>
.draggable {
    -webkit-app-region: drag;
}
.nodrag{
    -webkit-app-region: no-drag;
}

</style>
