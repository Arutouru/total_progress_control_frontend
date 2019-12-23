<template >
    <v-row  align="center" justify="center"> 
        <v-col cols="12" sm="8" md="4">
            <v-card>
                <v-toolbar color="deep-purple" dark flat>
                    <v-toolbar-title >Register form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="isValid"> 
                        <v-text-field required v-model="username" :rules="inputRules" color="deep-purple" prepend-icon="mdi-account-circle" label="Username"></v-text-field>
                        <v-text-field required v-model="email" :rules="emailRules" color="deep-purple" prepend-icon="mdi-email" label="Email"></v-text-field>
                        <v-text-field required v-model="password" :rules="inputRules" color="deep-purple" prepend-icon="mdi-lock" label="Password" type="password"></v-text-field>
                    </v-form>
                    <v-row align="center" justify="center">
                        <v-progress-circular v-if="loading" color="purple" indeterminate></v-progress-circular>
                    </v-row>
                </v-card-text>
                 <v-card-actions>
                    <v-btn v-on:click="submit" :disabled="!isValid" block outlined class="mb-2"  color="deep-purple" >Register</v-btn>
                </v-card-actions>
                <span class="mb-5 ml-4">Do you have already an account? <router-link to="/login">Login</router-link> </span> 
            </v-card>
            
        </v-col>   
    </v-row>
</template>

<script>
//import { mapActions} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return{
            loading:false,
            isValid:true,
            username: '',
            email: '',
            password: '',
            inputRules:[
                v => !!v || "This field is required"
            ],

            emailRules:[
                v => !!v || "This field is required",
                v => /.+@.+/.test(v) || "Email must be valid"

            ]
        }
    },

    methods:{
        submit(){
            if(this.$refs.form.validate()){
                const user = {
                    'username': this.username,
                    'email': this.email,
                    'password': this.password
                };
                const URL = 'https://tpc-rest.herokuapp.com/api/register'
                this.loading = true
                axios({
                    method: 'post',
                    url: URL,
                    data:user   
                })
                .then(response =>{
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('token', response.data.access_token)
                    this.$router.push('/')
                    this.loading = false
                }) 
                .catch(err =>{
                    this.loading = false
                    return err
                })       
            }
        }
    }

}
</script>
<style scoped>
.button-hover:hover{
    color: white;
    background-color: #673AB7;
}

</style>