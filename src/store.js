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
    }
  },
  mutations: {
    setPostData(state, postData) {
      state.postData.id = postData.id;
      state.postData.title = postData.title;
      state.postData.content = postData.content;
      state.postData.start_time = postData.start_time;
      state.postData.end_time = postData.end_time;
      state.postData.group_id = postData.group_id;
      state.postData.member_id = postData.member_id;
      state.postData.post_type = postData.post_type;
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