
<template>
  <v-card >
    <v-alert border="top" colored-border type="info" elevation="2">
        <p>This app is for having a control for the progress of your quantity activities that are done or you are doing</p>
    </v-alert>
    <div v-if="isVisible">
        <div class="deep-purple--text text-center mb-4 display-1">
            {{ getList.title }}
        </div>
        <v-btn  v-on:click="openAddDialog" class="ml-5 mb-2 mt-2" rounded color="info">
            <v-icon left>mdi-plus</v-icon> New Item</v-btn>
        <v-spacer></v-spacer>

            <v-tabs color="deep-purple">
                <v-tab @click="tabIncomplete = true; tabCompleted = false">Incomplete</v-tab>
                <v-tab @click="tabIncomplete = false; tabCompleted = true">Completed</v-tab>
            </v-tabs>
            <div v-if="tabIncomplete">
                <v-text-field append-icon="mdi-magnify" v-model="searchIncomplete" class="ml-10 mr-10" color="deep-purple" label="Search" />
                <v-list>
                    <template v-for="item in filterItemIncomplete">
                    <v-divider :key="item.item_id"></v-divider>
                    <v-list-item v-if="item.qty_done !== item.total_qty" :key="item.title">
                        
                        <v-list-item-icon>
                            <v-icon >mdi-label</v-icon>
                        </v-list-item-icon>   
                        
                        <v-list-item-content v-on:click="openEditDialog(item.title, item.total_qty, item.qty_done, item.notes, item.item_id)">
                            <v-list-item-title   v-text="item.title"></v-list-item-title>
                            <v-progress-linear color="deep-purple" :value="(item.qty_done/item.total_qty)*100" ></v-progress-linear>
                        </v-list-item-content>
                        <v-chip class="ma-2">{{ item.qty_done }}/{{ item.total_qty }}</v-chip>
                        <v-list-item-icon>
                            <v-icon class="purple--text" @click="openEditDialog(item.title, item.total_qty, item.qty_done, item.notes, item.item_id)" >mdi-pencil</v-icon>
                            <v-icon @click="removeItem(item.item_id)" class="red--text">mdi-delete-forever</v-icon>
                        </v-list-item-icon>  
                    
                    </v-list-item>
                    </template>
                </v-list>
            </div>
            <div v-if="tabCompleted">
            <v-text-field append-icon="mdi-magnify" v-model="searchCompleted" class="ml-10 mr-10" color="deep-purple" label="Search" />
            <v-list>
                <template v-for="item in filterItemCompleted">
                <v-divider :key="item.item_id"></v-divider>
                <v-list-item v-if="item.qty_done === item.total_qty"  :key="item.title">
                    
                    <v-list-item-icon>
                        <v-icon class="green--text">mdi-label</v-icon>
                    </v-list-item-icon>   
                    
                    <v-list-item-content v-on:click="openEditDialog(item.title, item.total_qty, item.qty_done, item.notes, item.item_id)">
                        <v-list-item-title  v-text="item.title"></v-list-item-title>
                        <v-progress-linear color="deep-purple" :value="(item.qty_done/item.total_qty)*100" ></v-progress-linear>
                    </v-list-item-content>
                    <v-chip class="ma-2">{{ item.qty_done }}/{{ item.total_qty }}</v-chip>
                    <v-list-item-icon>
                        <v-icon class="purple--text" @click="openEditDialog(item.title, item.total_qty, item.qty_done, item.notes, item.item_id)" >mdi-pencil</v-icon>
                        <v-icon @click="removeItem(item.item_id)" class="red--text">mdi-delete-forever</v-icon>
                    </v-list-item-icon>  
                
                </v-list-item>
                </template>
            </v-list>
            </div>
            <v-dialog  v-model="addDialog"  width="500">
                <AddItem v-on:closeDialog="closeAddDialog"/>
            </v-dialog>
            <v-dialog  v-model="editDialog"  width="500">
                <EditItem v-bind:itemObj="itemObj" v-on:closeDialog="closeEditDialog"/>
            </v-dialog>
        </div>
  </v-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import AddItem from './AddItem'
import EditItem from './EditItem'
import {eventBus} from "../main"
import swal from 'sweetalert';


export default {
    name: "ItemList",
    components:{
        AddItem,
        EditItem,
    },
    data(){
        return{
            isVisible: false,
            addDialog: false,
            editDialog: false,
            tabIncomplete: true,
            tabCompleted:false,
            itemObj: {
                title: '',
                item_id: null,
                total_qty: 0,
                qty_done: 0,
                notes: "",
            },

            searchIncomplete: "",
            searchCompleted: "",
        }
    },

    computed: {
        ...mapGetters(['allItems', 'getList']),
        filterItemIncomplete(){
                const search = this.searchIncomplete.toLowerCase()

                return this.allItems.filter(item =>{
                    const title = item.title.toLowerCase()

                    return title.match(search)
                })
            },

        filterItemCompleted(){
                const search = this.searchCompleted.toLowerCase()

                return this.allItems.filter(item =>{
                    const title = item.title.toLowerCase()

                    return title.match(search)
                })
            }
        },

    mounted(){
          eventBus.$on('setItemVisible', (p) =>{
            this.isVisible = p
        })
    },

    methods:{
        ...mapActions(["fetchItems", "deleteItem"]),
        openAddDialog(){
            this.addDialog = true;
        },

        closeAddDialog(){
            this.addDialog = false;
        },

         openEditDialog(title, totalQty, qtyDone, notes, id){
            this.itemObj.title = title;
            this.itemObj.item_id = id;
            this.itemObj.total_qty = totalQty;
            this.itemObj.qty_done = qtyDone;
            this.itemObj.notes = notes;
            this.editDialog = true;
        },

        closeEditDialog(){
            this.editDialog = false;
        },

        removeItem(id){
             swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this Item!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    })
                    .then((willDelete) => {
                    if (willDelete) {
                        this.deleteItem(id)
                        swal("The List has been deleted!", {
                        icon: "success",
                        });
                    } 
                    });
        }

        
    }

}
</script>

<style>

</style>