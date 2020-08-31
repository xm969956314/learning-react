import React, { Component } from 'react';
import PropTypes from 'prop-types';
class TestItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    /**
     * 1. 将要处理的 事件绑定统一在 constructor 内部处理，提升性能优化；
     * 2. key 值绑定问题，父组件与子组件都必须绑定，父组件是react检验，而子组件是渲染问题；
     */
  }
  render() {
    console.log('child render')
    return (
      <li onClick={this.handleClick} dangerouslySetInnerHTML={{__html: this.props.content}} />
    )
  }
  // 如果当前的内容没有被改变则不需要更新子组件
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(nextProps.content !== this.props.content) {
      return true;
    }else{
      return false;
    }
  }

  /**
   *
   * @param nextProps
   * 子组件属性更新（将不允许使用）
   * 条件：1. 一个组件要从父组件接受参数；
   *      2. 如果这个组件第一次存在于父组件中，不会执行；
   *      3. 如果这个组件之前已经存在于父组件中，才会执行；
   */
  componentWillReceiveProps(nextProps, nextContext) {
    console.log('componentWillReceiveProps');
  }
  // 组件被删除时执行
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick() {
    console.log(this.props)
    this.props.deleteClick(this.props.index)
  }
}
// 在 prop-types 包里面，添加对组件的属性 进行类型校验
TestItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  deleteClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  other: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
// 在 defaultProps 包里面，添加对组件的属性 进行类型校验
TestItem.defaultProps = {
  type: "aaaa"
};
export default TestItem;