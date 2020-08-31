const defaultState = {
  inputValue: '',
  list: []
};
/**
 *
 * @param reducer 相关说明
 * @author xiaoming
 * @date 2020.08.28
 * 1. reducer 可以接收 state，但是绝不能修改 state；
 * 2. 输出必须是纯函数，纯函数指的是 给定固定的输出，就一定会有固定的输出，不会有任何副作用；
 */
export default (state = defaultState, action) => {
  const copy = val => (JSON.parse(JSON.stringify(val)))
  if (action.type === 'init_list_action') {
    const newState = copy(state);
    newState.list = action.value;
    return newState;
  } else if (action.type === 'change_input_value') {
    const newState = copy(state);
    newState.inputValue = action.value;
    return newState;
  } else if (action.type === 'add_list_item') {
    const newState = copy(state);
    newState.list.push(newState.inputValue);
    newState.inputValue = ''
    return newState;
  } else if (action.type === 'delete_list_item'){
    const newState = copy(state);
    newState.list.splice(action.value, 1);
    return newState;
  }
  return state;
}