export default{
    state: {
        items: []
    },
    mutations: {
        setItems: (state, items) => (state.items = items),
        newItem: (state, item) => state.items.push(item),
        removeItem: (state, id) => (state.items = state.items.filter(item => item.id !== id)),
        updateItem: (state, edit) => {
            const index = state.items.findIndex(item => item.id === edit.id);
            if (index !== -1) {
                state.items.splice(index, 1, edit);
            }
        }
    },
    actions: {
        async fetchItems({ commit }, url) {
            await axios({
                method: 'get',
                url: url
            })
            .then(
                response => {
                    commit('setItems', response.data);
                }
            ).catch(error => {
                console.log(error);
            })
        },
        async addItems({ commit }, data) {
            await axios({
                method: 'post',
                url: data.url,
                data: data.item
            })
            .then(
                response => {
                    commit('newItem', response.data);
                }
            ).catch(error => {
                console.log(error);
            })
        },
        async updateItems({ commit }, data) {
            await axios({
                method: 'put',
                url: `${data.url}/${data.item.id}`,
                data: data.item
            })
            .then(
                response => {
                    commit('updateItem', response.data);
                }
            ).catch(error => {
                console.log(error);
            })
        },
        async deleteItems({ commit }, data) {
            await axios({
                method: 'delete',
                url: `${data.url}/${data.id}`,
            })
            .then(
                () => {
                    commit('removeItem', data.id);
                }
            ).catch(error => {
                console.log(error);
            })
        },
    },
    getters: {
        allItems(state) {
            return state.items;
        }
    }
};
