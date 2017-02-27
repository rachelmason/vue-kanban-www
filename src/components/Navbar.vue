<template>
    
<div class="navbar-fixed">
<nav>
    <div class="nav-wrapper" v-if ="!user.name">
      <a href="#" class="brand-logo">AR-ganize</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#"><router-link to="/login">Login</a></router-link></li>
        <li><a href="#"><router-link to="/register">Register</a></router-link></li>
        
      </ul>
    </div>
    <div v-else> 
      <a href="#" class="brand-logo">AR-ganize</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>Welcome, {{user.name}}!</li>
      <li><a href="#" @click="logout"> Logout</a></li>
      </ul>
    </div>
  </nav>
    

</div>

    

</template>
<script>
import Register from './Register'

export default {
    name: 'navbar',
    components: {Register},
    mounted(){
      this.$root.$data.store.actions.authenticate()
    },
  
   computed:{
     user(){
       return this.$root.$data.store.state.activeUser
     }
       
    },
    methods:{
      logout(){
            this.$root.$data.store.actions.logout()
           
        }
    }
    

}


</script>
<style>
nav{
  background: #354649;
}

</style>