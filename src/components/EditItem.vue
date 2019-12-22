<template>
 <v-card>
        <v-card-title class="deep-purple lighten-2 white--text">Add New Item</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="onSubmit">
                <v-text-field v-model="itemObj.title" :rules="titleRules" label="Title" required></v-text-field>
                <v-text-field v-model="itemObj.total_qty" :rules="totalQtyRules" label="Total Quantity" required></v-text-field>
                <v-text-field v-model="itemObj.qty_done" color="success" label="Quantity Done"></v-text-field>
                <v-textarea v-model="itemObj.notes" label="Notes"></v-textarea>
                <v-btn  type="submit" color="success" class="mr-4">Update Item</v-btn>
                <v-btn class="mr-4" @click="closeDialog">Cancel</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'EditItem',
    props:['itemObj'],
    data(){
        return{
            titleRules: [
                        v => !!v || 'Title is required'
                    ],
            totalQtyRules:[
                v => !!v || 'Total Quantity is required'
            ]

        }
    },
    methods:{
        ...mapActions(['updateItem']),
        onSubmit(){
            const updItem ={
                title: this.itemObj.title,
                item_id: this.itemObj.item_id,
                total_qty: this.itemObj.total_qty,
                qty_done: this.itemObj.qty_done,
                notes: this.itemObj.notes
            }
            this.updateItem(updItem);
            this.closeDialog()
        },
        closeDialog(){
            this.$emit('closeDialog')
        },
    }


}
</script>
<style>

</style>