<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap>
      <v-flex xs1>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name:"portfolio",
  data: () => {
    return {

    }
  },
   computed: {
    
    ...mapGetters({
      Coins:'getCoin'
    })  
    
    
    }

}
</script>

