<template>
    <v-card>
        <v-card-title class="deep-purple lighten-2 white--text">Update List</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="onSubmit">
                <v-text-field v-model="list.title" label="Title" required></v-text-field>
                
                <v-btn type="submit" color="success" class="mr-4">Update</v-btn>
                <v-btn v-on:click="closeDialog" class="mr-4">Cancel</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "EditList",
    props: ['list'],
    data(){
        return{
           
        }
    },

    methods:{
        ...mapActions(['updateList']),
        onSubmit(){
            const updList ={
                title: this.list.title,
                list_id: this.list.list_id
            }
            this.updateList(updList);
            this.closeDialog()
        },

        closeDialog(){
            this.$emit('closeDialog')
        }
    }

}
</script>

<style>

</style>