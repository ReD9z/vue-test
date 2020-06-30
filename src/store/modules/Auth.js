import axios from 'axios';

export default{
    state: {
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        auth_success(state, { token }){
            state.token = token;
        },
        logout(state){
            state.token = '';
        },
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: 'http://localhost:3004/users',
                })
                .then(
                    response => {
                        const users = response.data;
                        const result = users.filter(item => item.login === user.login);
                        if(result.length != 0) {
                            const password = result.filter(item => item.password === user.password);
                            if(password.length != 0) {
                                const token = Math.floor(Date.now() / 1000);
                                localStorage.setItem('token', token);
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                                commit('setItems', token);
                            }
                        }
                        resolve(response);
                    }
                ).catch(error => {
                    localStorage.removeItem('token')
                    reject(error)
                })
            })
        },
        logout({commit}) {
            commit('logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
    }
};
