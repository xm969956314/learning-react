import store from "./index";
export const initListAction = val => {
  store.dispatch({ type: 'init_list_sagas' })
  // store.dispatch(dispatch => {
  //   return new Promise(resolve => {
  //     resolve(['aaa', 'bbb', '123'])
  //   }).then(res => {
  //     dispatch({
  //       type: 'init_list_action',
  //       value: res
  //     })
  //   })
  // })
};
export const inputChangeAction = val => {
  store.dispatch({
    type: 'change_input_value',
    value: val
  })
};
export const addListItemAction = _ => {
  store.dispatch({
    type: 'add_list_item'
  })
};
export const delListItemAction = val => {
  store.dispatch({
    type: 'delete_list_item',
    value: val
  })
};