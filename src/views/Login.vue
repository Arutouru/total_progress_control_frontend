<template >
    <v-row  align="center" justify="center"> 
        <v-col cols="12" sm="8" md="4">
            <v-card>
                <v-toolbar color="deep-purple" dark flat>
                    <v-toolbar-title >Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form"> 
                        <v-text-field v-model="username" :rules="inputRules" color="deep-purple" prepend-icon="mdi-account-circle" label="Username"></v-text-field>
                        <v-text-field v-on:keyup.enter="submit" v-model="password" :rules="inputRules" color="deep-purple" prepend-icon="mdi-lock" label="Password" type="password"></v-text-field>
                    </v-form>
                    <v-row align="center" justify="center">
                        <v-progress-circular v-if="loading" color="purple" indeterminate></v-progress-circular>
                        <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                    </v-row>
                </v-card-text>
                 <v-card-actions>
                    <v-btn block outlined class="mb-2" @click="submit" color="deep-purple">Login</v-btn>
                </v-card-actions>
                <span class="mb-5 ml-4">Are your new? <router-link to="/register"> Sign Up</router-link> </span>
            </v-card>
            <v-alert type="info" class="mt-6">
                If you desire test the app without create an account try with this account already created: Username: User1, Password: 1234
            </v-alert>
        </v-col>   
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            loading:false,
            username: '',
            password: '',
            inputRules:[
                v => !!v || "This field is required"
            ],

            formErrors:[]
        }
    },

    methods:{
        submit(){
            this.formErrors = []
            if(this.$refs.form.validate()){
                 const user = {
                    'username': this.username,
                    'password': this.password,
                    'email': 'null'
                };
                const URL = 'https://tpc-rest.herokuapp.com/api/login'
                this.loading = true
                axios({
                    method: 'post',
                    url: URL,
                    data:user   
                })
                .then(response =>{
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('token', response.data.access_token)
                    location.reload()
                    this.formErrors = []
                }) 
                .catch(err =>{
                    this.loading = false;
                    //this.formErrors.push(err.data.message)
                    if (err.response.status == 401){
                        this.formErrors.push("Username or Password incorrect")
                    }
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