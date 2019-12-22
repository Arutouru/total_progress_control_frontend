import axios from 'axios'

const state = {
    lists:[ ],
    list:{}
};

const getters = {
    allLists: (state) => state.lists,
    getList: (state) => state.list

};

const actions = {
    async fetchLists({ commit }, user_id){
        const response = await axios.get(`https://tpc-rest.herokuapp.com/api/lists/${user_id}`);
        commit('setLists', response.data.lists);
    },

    async fetchList({ commit }, id){
        const response = await axios.get(`https://tpc-rest.herokuapp.com/api/list/${id}`);
        commit('setList', response.data)
    },

    async addList({ commit }, newList){
        const response = await axios.post('https://tpc-rest.herokuapp.com/api/list/new', newList);
        commit('newList', response.data)
    },

    async deleteList({ commit }, id){
        await axios.delete(`https://tpc-rest.herokuapp.com/api/list/${id}`);
        commit('removeList', id);
    },

    async updateList({ commit }, updList){
        const response = await axios.put(`https://tpc-rest.herokuapp.com/api/list/${updList.list_id}`, updList);
        commit('updatedList', response.data);
    }
};

const mutations = {
    setLists: (state, lists) => (state.lists = lists),
    setList: (state, list) => (state.list = list),
    newList: (state, list) => state.lists.unshift(list),
    removeList: (state, id) => state.lists = state.lists.filter(list => list.list_id != id),
    updatedList: (state, updList) => {
        const index = state.lists.findIndex(list => list.list_id === updList.list_id);
        if (index !== -1){
            state.lists.splice(index, 1, updList);
        }
    }
};


export default{
    state,
    getters,
    actions,
    mutations
};