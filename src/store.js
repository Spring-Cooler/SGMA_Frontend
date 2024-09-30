import { createStore } from 'vuex';

const store = createStore({
  state: {
    postData: {
      id: '',
      title: '',
      content: '',
      start_time: '',
      end_time: '',
      group_id: '',
      member_id: '',
      post_type: '',
      category: '',
      group_name: '',
    }
  },
  mutations: {
    setPostData(state, postData) {
      state.postData = { ...state.postData, ...postData };
    }
  },
  actions: {
    updatePostData({ commit }, postData) {
      commit('setPostData', postData);
    }
  },
  getters: {
    getPostData(state) {
      return state.postData;
    }
  }
});

export default store;