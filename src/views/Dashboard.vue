<template>
  <div class="dashboard">
      <v-container v-if="token">
          <Navbar/>
          <ItemList/>
      </v-container>
      <v-content v-else>
          <Login/>
      </v-content>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import ItemList from '../components/ItemsList'
import Login from '../views/Login'
export default {
    name: 'Dashboard',
    components:{
        Navbar,
        ItemList,
        Login
    },
    data(){
        return{
            token: localStorage.getItem('token')

        }
    },
    methods:{
       
    }
}
</script>


<style>

</style>