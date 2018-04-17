<template>
<v-container grid-list-xs fill-height>
  

  
    <v-layout row wrap fill-height>
      
      <v-jumbotron class="ma-4" height="200px" width="100%">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Crypto Portfolio Manager</h3>
          <span class="subheading">Track all your holdings from all exchanges and wallets in one place</span>
          <v-divider class=""></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>

      <v-flex xs4 v-for="Coin in Coins" :key="Coin.id">
       <v-card class="ma-1 pa-2" height="20vh">
         <div :class="{'display-2 mb-4': $vuetify.breakpoint.lgAndUp}" class="headline text-xs-center mb-1 ">({{Coin.symbol}})</div>
         <div :class="{'headline': $vuetify.breakpoint.lgAndUp}" class="text-xs-left text-lg-center ">Price: ${{Coin.price_usd}}</div>
      <p v-bind:class="{ 'red--text': (Coin.percent_change_24h < 0), 'green--text':(Coin.percent_change_24h>0), 'headline':$vuetify.breakpoint.lgAndUp }" class="text-xs-left text-lg-center">Change (24h): {{Coin.percent_change_24h}}%</p>
         <div :class="{'headline': $vuetify.breakpoint.lgAndUp}" class="text-xs-left text-lg-center">Marketcap: ${{Coin.market_cap_usd}}</div>
        </v-card>   
      </v-flex>
    </v-layout>
</v-container>  
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: "home",
    data() {
      return{
        activeClass : 'text-success',
        redP : 'text-danger'
       
      }
    },
    computed: {
    
    ...mapGetters({
      Coins:'getCoin'
    })  
    
    
    }
}


</script>
<style scoped>



</style>
