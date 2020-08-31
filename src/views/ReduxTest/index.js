import React, { Component }  from "react";
import './index.css';
import UI from './ui';
import store from "@/store";
import { inputChangeAction, addListItemAction, delListItemAction, initListAction } from "@/store/action";
class ReduxTest extends Component{
  constructor(props) {
    super(props);
    // redux 通过 getState 获取 state中的数据
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDelItem = this.handleDelItem.bind(this);
    console.log(this.state);
    store.subscribe(_ => this.setState(store.getState()));
  }
  render() {
    return (
      <UI
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleAddItem={this.handleAddItem}
        handleDelItem={this.handleDelItem}
      />
    );
  }
  componentDidMount() {
    initListAction();
  }

  handleInputChange(e) {
    inputChangeAction(e.target.value)
  }
  handleAddItem() {
    addListItemAction()
  }
  handleDelItem(i) {
    delListItemAction(i)
  }
}
export default  ReduxTest;
