<template>
  <nav>
      <v-app-bar flat app>
          <v-app-bar-nav-icon v-on:click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase grey--text">
              <span class="font-weight-light">TPC</span>
              <span class="deep-purple--text"> Total Progress Control</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          
          <v-btn @click="logout" depressed class="grey--text">
              <span>Sign Out</span>
              <v-icon right>mdi-exit-to-app</v-icon>
          </v-btn>
      </v-app-bar>

        <v-dialog v-model="addDialog" width="500">
            <AddList v-on:closeDialog="closeAddDialog"/>
        </v-dialog>

        <v-dialog v-model="editDialog"  width="500">
            <EditList v-bind:list="listObj" v-on:closeDialog="closeEditDialog"/>
        </v-dialog>

      <v-navigation-drawer v-model="drawer" app class="deep-purple lighten-1">
          <v-row  align="center" justify="center">
              <h1 class="white--text"> {{ user.username }} </h1>
          </v-row>
          <v-divider/>
          <v-row  align="center" justify="center">
              <v-btn color="deep-purple darken-4" class="white--text mt-5 mb-5" v-on:click="addDialog=true">
                  <v-icon left>mdi-plus</v-icon>New List</v-btn>
          </v-row>

        <v-list two-line>
               <v-row  class="deep-purple darken-1" align="center" justify="center">
              <v-subheader class="white--text">Your Lists</v-subheader>
                </v-row>
                <v-list-item  v-for="list in allLists" @click="getItems(list.list_id)" :key="list.list_id">
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-view-list</v-icon>
                    </v-list-item-icon>   
                    
                    <v-list-item-content>
                        <v-list-item-title  class="white--text" v-text="list.title"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon v-on:click="openEditDialog(list.list_id, list.title)"  class="white--text">mdi-pencil</v-icon>
                        <v-icon v-on:click="removeList(list.list_id)" class="white--text">mdi-delete-forever</v-icon>
                    </v-list-item-icon>  
                
                </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-row class="deep-purple darken-1" align="center" justify="center">
                    <h4 class="white--text" >Powered By:</h4>
                </v-row>
                
                <v-item-group class="mt-2">
                    <a href="https://vuejs.org/" target="blank">
                        <img width="13%" src="../assets/vuejs_logo.png" >
                    </a>
                    <a href="https://vuetifyjs.com/en/" target="blank">
                        <img width="13%" src="../assets/vuetify-logo.png" >
                    </a>
                    <a href="http://flask.palletsprojects.com/en/1.1.x/" target="blank">
                        <img width="13%" src="../assets/flask-logo.png" >
                    </a>
                </v-item-group>
            </div>
             <div class="pa2">
                <v-row class="deep-purple darken-1" align="center" justify="center">
                    <h4 class="white--text" >Source Code:</h4>
                </v-row>
                
                <v-item-group class="mt-2">

                    <a href="https://github.com/Arutouru/total_progress_control_frontend" target="blank">
                        <img width="13%" src="../assets/github.png" >
                    </a>
                    <span class="white--text caption">Front-End</span><br>
                    <a href="https://github.com/Arutouru/total_progress_control_backend" target="blank">
                        <img width="13%" src="../assets/github.png" >
                    </a>
                    <span class="white--text caption">Back-End</span>
    
                </v-item-group>
            </div>
            
        </template>
       
      </v-navigation-drawer>
      
  </nav>
</template>

<script>
import swal from 'sweetalert';
import {mapGetters, mapActions} from 'vuex';
import AddList from './AddList'
import EditList from './EditList'
import {eventBus} from "../main"
import axios from 'axios'
export default {
    computed: mapGetters(['allLists']),
    components:{
        AddList,
        EditList,
    },

    mounted(){
        
    },

    created(){
        this.getUserDetails()
        this.fetchLists(this.user.user_id);
    },
    
    data(){
        return{
            loading: false,
            drawer: true,
            listSelected: false,
            addDialog: false,
            editDialog: false,
            listObj: {
                title: null,
                list_id: null
            },

            user:{},
        }
    },
    methods:{
        ...mapActions(["fetchLists", 'fetchList','deleteList', 'fetchItems']),
        logout(){
            const URL = 'https://tpc-rest.herokuapp.com/api/logout'
                this.loading = true
                const token = localStorage.getItem('token')
                axios({
                    method: 'post',
                    url: URL,
                    headers:{
                        Authorization: `Bearer ${token}`}
                })
                .then(response =>{
                    localStorage.clear()
                    this.loading = false
                    location.reload()
                    return response
                }) 
                .catch(err =>{
                    swal("Somethin goes wrong", err , "error");
                    this.loading = false
                })
        },
        getUserDetails(){
            this.user =  JSON.parse(localStorage.getItem('user'))
        },
        getItems(list_id){
            eventBus.$emit('setItemVisible', true)
            this.fetchItems(list_id);
            this.fetchList(list_id);
        },
        removeList(id){
                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this List!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                        })
                        .then((willDelete) => {
                        if (willDelete) {
                            this.deleteList(id)
                            swal("The List has been deleted!", {
                            icon: "success",
                            });
                        } 
                        });
        },

        openEditDialog(id, title){
           this.listObj.list_id = id;
            this.listObj.title = title;
            this.editDialog=true;
        },

        closeEditDialog(){
            this.editDialog = false;
        },

        closeAddDialog(){
            this.addDialog = false;
        },

    },

}
</script>

<style scoped>
.list {
    margin: 5px;
    border-radius: 4px;
  }
  .list:hover {
    background: #311B92;
    cursor: pointer;
  }
  .list-active:active {
    background: #311B92;
  }

</style>