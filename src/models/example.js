
export default {

  namespace: 'extension',

  state: {
    searchParams: {},
    domainToRap2: window.localStorage.getItem('domainToRap2') && JSON.parse(window.localStorage.getItem('domainToRap2')) || [],
    checked: window.localStorage.getItem('domainSwitch')  === 'true' ? true : false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      const domainToRap2 = state.domainToRap2
      let data = {...action.payload}
      let newData = data.domainToRap2 ? [...domainToRap2, ...data.domainToRap2] : [...domainToRap2]
      return { ...state, domainToRap2: newData };
    },
    replace(state, action){
      let data = {...action.payload}
      return { ...state, domainToRap2: data.domainToRap2 };
    },
    setSwitch(state, action){
      let data = {...action.payload}
      return {...state, checked: data.checked}
    }
  },

};
