<template>

  <v-container fill-height class="full" >


  <v-layout row wrap align-center>
    
    <v-flex xs12 lg6 offset-lg3 class="">
    <v-card>
    <v-card-title primary-title>
      <v-card-text class="text-xs-center display-1 lg-mb-0">
        Login to Crypto Prices
      </v-card-text> 
    </v-card-title>
    </v-card>      
    </v-flex>

    <v-flex xs12 lg6 offset-lg3 align-start height="100%">
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
                <v-text-field
              name="password"
              label="Enter your password"
              hint="At least 8 characters"
              v-model="password"
              :rules="passwordRules"
              :append-icon="vis ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (vis = !vis)"
              :type="!vis ? 'password' : 'text'"
              
            ></v-text-field>         
            <v-checkbox
              label="Do you agree?"
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              required
            ></v-checkbox>
        
            <v-btn
              @click="submit"
              :disabled="!valid"
              class="green darken-3 white--text"
            >
              Login
            </v-btn>
          </v-form>
        
    </v-flex>


 
  </v-layout>
  
</v-container>
</template>
<script>
export default {
  name:'login',
   data: () => ({
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      vis: false,
      password: '',
      passwordRules: [
         v => v.length >= 8 || 'Password is too Short'
      ],
      checkbox: false,
      valid:true
  }),
  
 methods: {
    submit() {
     
      if (this.$refs.form.validate()) {
       
        
       
        let USER_DETAILS = { email: this.email, password:this.password}
        this.$electron.ipcRenderer.send('send-login', USER_DETAILS)
        console.log("request sent to main process")

        }
    },
    clear() {
    
      
    }
   
  }
}
</script>
<style scoped>
.full{
  width: 100%;
  height: 100%;
}


</style>