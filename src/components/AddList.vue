<template>
    <v-card>
        <v-card-title class="deep-purple lighten-2 white--text">Add New List</v-card-title>
        <v-card-text>
            <v-form ref="form" @submit.prevent="onSubmit">
                <v-text-field :rules="titleRules" v-model="title" label="Title" required prepend-icon="mdi-title"></v-text-field>
                <v-btn  type="submit" color="success" class="mr-4">Create</v-btn>
                <v-btn class="mr-4" @click="closeDialog">Cancel</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import swal from 'sweetalert';

export default {
    name: "AddList",
    data(){
        return{
            title: "",
             titleRules: [
                        v => !!v || 'Title is required'
                    ],
        }
    },

    methods:{
        ...mapActions(['addList']),
        onSubmit(){
            if(this.$refs.form.validate()){
            const user = JSON.parse(localStorage.getItem('user'))
            const newList ={
                title: this.title,
                user_id: user.user_id 
            }
            this.addList(newList);
            swal("Nice", "New list added", "success");
            this.$refs.form.reset()
                }
            },

        closeDialog(){
            this.$emit('closeDialog')
            },

    }
}
</script>

<style>

</style>