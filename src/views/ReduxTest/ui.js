import React  from "react";
import { List, Input, Button, Avatar } from 'antd';
import './index.css'
export default props => {
  return (
    <div className="redux-test">
      <div>
        <Input
          value={props.inputValue}
          placeholder="Basic usage"
          style={{width:'300px',marginRight: '10px'}}
          onChange={props.handleInputChange}
        />
        <Button type="primary" onClick={props.handleAddItem}>提 交</Button>
      </div>
      <div>
        <List
          size="small"
          bordered
          style={{width:'300px'}}
          dataSource={props.list}
          renderItem={(item, index) => <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="#!">{item}</a>}
              description={item}
            />
            {/*<div><a href="javascript:;">{index}</a></div>*/}
            <div onClick={_ => props.handleDelItem(index)} style={{fontSize: '24px',cursor:'pointer'}}><i>×</i></div>
          </List.Item>}
        />
      </div>
    </div>
  )
}