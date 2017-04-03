<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Error from './components/Error'

export default {
  name: 'app',
  components:{Navbar, Error}
}
</script>

<style>


</style>
