<template>
  <v-card>
        <v-card-title class="deep-purple lighten-2 white--text">Add New Item</v-card-title>
        <v-card-text>
            <v-form ref="form" @submit.prevent="onSubmit">
                <v-text-field prepend-icon="mdi-title" :rules="titleRules" v-model="title" label="Title" required></v-text-field>
                <v-text-field prepend-icon="mdi-short-text" :rules="totalQtyRules" v-model="totalQty" label="Total Quantity" required></v-text-field>
                <v-textarea prepend-icon="mdi-short-text" v-model="notes" label="Notes"></v-textarea>
                <v-btn  type="submit" color="success" class="mr-4">Add Item</v-btn>
                <v-btn class="mr-4" @click="closeDialog">Cancel</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert';

export default {
    name: 'AddItem',
    data(){
        return{
            title:'',
            totalQty:0,
            notes:'',
            titleRules: [
                        v => !!v || 'Title is required'
                    ],
            totalQtyRules:[
                v => !!v || 'Total Quantity'
            ],

            list: this.getList
        }
    },
    computed: mapGetters(['getList']),
    methods:{
        ...mapActions(["addItem"]),
        onSubmit(){
            if(this.$refs.form.validate()){
            const newItem ={
                title: this.title,
                total_qty: this.totalQty,
                notes: this.notes,
                list_id: this.getList.list_id
            };
            this.addItem(newItem);
            this.$refs.form.reset()
            swal("Nice", "New Item added", "success");
                }
            },
        closeDialog(){
            this.$emit('closeDialog')
            this.$refs.form.reset()
        },
    }


}
</script>

<style>

</style>