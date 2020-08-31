import React, { Component, Fragment } from 'react'
import TestItem from './TestItem';
import axios from 'axios'
import './Test.css'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
// 组件需要默认 导出，不同于 vue 类似于 angular4
export default class Test extends Component {
  constructor(props) {
    super(props)
    /**
     *
     * @type {{inputValue: string, list: []}}
     * props state render三者关系：
     * 1. 当组件内的 state发生改变时，render 函数会被重新执行一次；
     * 2. 当父组件内的传值发生改变时，子组件的 props值发生改变，那么render函数也会被重新执行一次；
     * 3. 当父组件的 render函数被重新执行一次的时候，子组件 render函数也会被重新执行；
     */
    this.state = {
      inputValue: '',
      list: [],
      show: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.addItem = this.addItem.bind(this)
    // 这里重新绑定 this，this指向问题，是因为传入子组件 this指向的是当前的子组件而不是父组件
    this.itemClick = this.itemClick.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  // 组件第一次被挂载前执行（将不允许使用）
  componentWillMount() {
    console.log('componentWillMount')
  }
  /**
   * @param {*} h
   * React 学习:
   * 1. Component 组件渲染默认引入 Component组件；
   * 2. Fragment 是一个占位符标签，渲染时会清除；
   * 3. 每个组件都有 constructor 控制器，首行必须调用父类 super(props)；
   * 4. 定义数据必须放在 state里面，规定的；
   * 5. render 挂载必须定义返回数据，return (...) 里面是标签；
   * 6. 标签绑定元素 必须是 单花括号 {} 里面是一段JS代码块, 不同于 vue 或 angular {{}}；
   * 7. 标签绑定事件，onChange on 后面的事件名 首字母 *必须是大写，
   *      并且使用的 方法，统一挂载到 组件下面，用 this指向，如：onChange={this.handleChange.bind(this)};
   * 8. *标签绑定事件 this.addItem.bind(this) this指向会有问题，需要重新绑定；
   * 9. 标签内循环列表：需要使用 ES6迭代函数来使用，如：map返回值使用标签的形式，不需要使用 () 包裹，或是 filter筛选过滤；
   * 10. 使用方法要想改变 state 所定义的值：必须使用 this.setState；
   * 11. 想要改变 state里面的数组不能直接使用 this.state.list.splice(i, 1)，这种方式不能起到效果，需要重新取值再赋值；
   * 12. 使用类名 使用 className 而不使用 class；
   * 13. 希望使用 HTML代码块不被转义，需要使用：dangerouslySetInnerHTML={{__html: item}}；
   * 14. 使用 label for指定区域，不能直接使用 for 需要使用 htmlFor；
   * 15. 使用 ref操作返回的是一个函数，需要重新指定赋值，参数名随意；
   */
  render(h) {
    console.log('parent render')
    return (
      <Fragment>
        {/* react-transition-group CSSTransition */}
        <CSSTransition in={this.state.show} unmountOnExit onEntered={el=>el.style.color='orange'} timeout={1000} classNames='fade' appear={true}>
          <h2 ref={h2=>this.h2=h2} className={this.state.show?'show':'hidden'}>{this.state.inputValue}</h2>
        </CSSTransition>
        <div>
          <label htmlFor="inputs">输入内容</label>
          <input id="inputs" value={this.state.inputValue} onChange={this.handleChange} />
          <button onClick={this.addItem}>提交</button>
          <button onClick={this.toggle}>切换</button>
        </div>
        <ul>
          <TransitionGroup>
            {
              this.loadList()
            }
          </TransitionGroup>
        </ul>
      </Fragment>
    )
  }
  // 组件第一次被挂载后执行，类似于 vue mounted函数
  componentDidMount() {
    console.log('componentDidMount')
    console.log(this.h2)
    axios.get('/get/componentDidMount')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('error!!')
      })
  }
  // 组件是否需要被更新
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate')
    return true
  }
  // 组件更新前，必须是 shouldComponentUpdate 返回true，需要被执行（将不允许使用）
  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('componentWillUpdate')
  }
  // 组件更新后
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
  }

  loadList() {
    // 这个地方需要将值默认返回出去，在 jsx语法里面可以使用 HTML代码块无需处理
    return this.state.list.map((item, i) => {
      // 组件之间如果使用 key值，尽量少用 index key={i}，会出问题；
      return (
        /**
         * react-transition-group：
         * CSSTransition 必要属性 in 改变状态值，timeout持续时长 classNames 动画类 appear 出场动画
         * TransitionGroup  必要属性 key值，timeout持续时长 classNames 动画类 appear 出场动画
         */
        <CSSTransition key={i} onEntered={el=>el.style.color='orange'} timeout={1000} classNames='fade' appear={true}>
          <TestItem content={item} index={i} deleteClick={this.itemClick} />
        </CSSTransition>
      );
    })
  }
  handleChange(e) {
    //
    const inputValue = e.target.value;
    // 新版使用函数返回，并且 传递一个 state 上一次的状态值
    this.setState(_ => ({
        inputValue
    }));
    // this.setState({
    //     inputValue: e.target.value
    // })
  }
  addItem() {
    this.setState(state =>({
      list: [...state.list, state.inputValue],
      inputValue: ''
    }))
      // this.setState({
      //     list: [...this.state.list, this.state.inputValue],
      //     inputValue: ''
      // })
  }
  itemClick(i) {
      /**
       * immutable：state不允许我们做任何的改变，后期性能优化会有问题；
       */
      // 错误的写法
      // this.state.list.splice(i, 1);
      // 正确的写法
      // const _list = [...this.state.list];
      // _list.splice(i, 1);
      // this.setState({
      //     list: _list
      // });
    this.setState(state => {
      const list = [...state.list];
      list.splice(i, 1);
      return { list };
    });

  }
  toggle() {
    this.setState(state => ({show: !state.show}))
  }

};