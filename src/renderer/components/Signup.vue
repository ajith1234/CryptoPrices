<template>

<v-container grid-list-xs >


  <v-layout row wrap align-center>
    
    <v-flex xs12 lg6 offset-lg3 class="mt-4">
    <v-card class="elevation-12">
    <v-card-title primary-title>
      <v-card-text class="text-xs-center display-1 lg-mb-0">
        Sign Up to Crypto Prices
      </v-card-text> 
    </v-card-title>
    </v-card>      
    </v-flex>

    <v-flex xs12 lg6 offset-lg3 align-start height="100%">
        <template>
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
            <v-text-field
              name="password2"
              label="re-enter your password"
              hint="At least 8 characters"
              v-model="password2"
              :append-icon="vis1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (vis1 = !vis1)"
              :type="!vis1 ? 'password' : 'text'"
              :rules="passwordRules2"
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
            >
              submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </template>
    </v-flex>


 
  </v-layout>
  
</v-container>

</template>
<script>
export default {
  name:'signup',
  data: () => ({
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      vis: false,
      vis1: false,
      password: '',
      passwordRules: [
         v => v.length >= 8 || 'Password is too Short'
      ],
      password2: '',
      passwordRules2: [
        v => v.length >= 8 || 'Password is too Short'
      ],     
      checkbox: false,
      valid:true
  }),
  
 methods: {
    submit() {
     
      if (this.$refs.form.validate()) {
        
        if(this.password!==this.password2){
        alert("passwords do not match")
        }else{
       
        console.log(" Sign in password: "+this.password)
        console.log("email:"+ this.email)
        console.log("Compare pass to:" + this.password2)
        console.log(this.checkbox)
        console.log(this.password==this.password2)
        let USER_DETAILS = {email: this.email, password: this.password}
        this.$electron.ipcRenderer.send('registerUser', USER_DETAILS)
        }
      }
    },
    clear(e) {
    
      this.$refs.form.reset();
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
