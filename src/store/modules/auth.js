import Http from '@/utils/request';

const state = {
    user: null,
    posts: null,
    list: null,
    giftList: null,
    text: '',
    color: '',
    timeout: ''
};

const getters = {
    isAuthenticated: state => !!state.user,    
    StatePosts: state => state.posts,
    StateUser: state => state.user,
    UserList: state => state.list,
    GiftList: state => state.giftList
};

const actions = {
    async LogIn({commit}, payload) {
        await Http.post('login', payload)
        await commit('setUser', payload.username)
    },

    async LogOut({commit}) {
        let user = null
        commit('setUser', user)
    },

    async GetUserList({commit}) {
        let response = await Http.get('user')
        commit('setUserList', response.data.rows)
    },

    async GetGiftList({commit}) {
        let response = await Http.get('gifts')
        commit('setGiftList', response.data.rows)
    },

    async Register({dispatch}, form) {
        await Http.post('user', form)
        await dispatch('GetGiftList')
    },

    async RemoveGuest({dispatch}, id) {
        await Http.delete(`user/${id}`)
        await dispatch('GetUserList')
        await dispatch('GetGiftList')
    },

    async RemoveGift({dispatch}, id) {
        await Http.delete(`gifts/${id}`)
        await dispatch('GetGiftList')
    },

    async AddGift({dispatch}, item) {
        await Http.post('gifts', item)
        await dispatch('GetGiftList')
    },
};

const mutations = {
    setUser(state, username){
        state.user = username
    },

    setPosts(state, posts){
        state.posts = posts
    },

    setUserList(state, list) {
        state.list = list
    },

    setGiftList(state, list) {
        state.giftList = list
    },

    LogOut(state){
        state.user = null
        state.posts = null
        state.list = null
    },

    SHOW_MESSAGE(state, payload) {
        state.text = payload.text;
        state.color = payload.color;
        state.timeout = payload.timeout;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
