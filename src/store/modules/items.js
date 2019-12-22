import axios from 'axios'

const state = {
    items:[ ]
};

const getters = {
    allItems: (state) => state.items

};

const actions = {
    async fetchItems({ commit }, list_id){
        const response = await axios.get(`https://tpc-rest.herokuapp.com/api/items/${list_id}`)
        commit('setItems', response.data.items);    
    },

    async addItem({ commit }, newItem){
        const response = await axios.post('https://tpc-rest.herokuapp.com/api/item/new', newItem);
        commit('newItem', response.data)
    },

    async deleteItem({ commit }, id){
        await axios.delete(`https://tpc-rest.herokuapp.com/api/item/${id}`);
        commit('removeItem', id);
    },

    async updateItem({ commit }, updItem){
        const response = await axios.put(`https://tpc-rest.herokuapp.com/api/item/${updItem.item_id}`, updItem);
        commit('updatedItem', response.data);
    }
};

const mutations = {
    setItems: (state, items) => (state.items = items),
    newItem: (state, item) => state.items.unshift(item),
    removeItem: (state, id) => state.items = state.items.filter(item => item.item_id != id),
    updatedItem: (state, updItem) => {
        const index = state.items.findIndex( item => item.item_id === updItem.item_id);
        if (index !== -1){
            state.items.splice(index, 1, updItem);
        }
        
    }
};


export default{
    state,
    getters,
    actions,
    mutations
};