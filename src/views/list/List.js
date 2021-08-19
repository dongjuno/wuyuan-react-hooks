import { List, Button } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import './List.css'
import local from '../../utils/local'
import Add from '../add/Add'

export default function App() {
  let n = [
    { text: '1 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '2 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '3 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '4 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '5 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '6 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '7 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '8 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '9 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '10 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '11 Racing car sprays burning fuel into crowd.', isTrue: true },
    { text: '12 Racing car sprays burning fuel into crowd.', isTrue: true },
  ]

  let [isLoading, setIsLoading] = useState(true);

  let [data, setData] = useState(n)

  const fetchData = () => {
    const newData = local.get('data');
    setData(newData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isLoading]);

  const eaitData = (index) => {
    let newData = data.map((v, i) => {
      if (i === index) {
        v.isTrue = !v.isTrue
        v.text = document.querySelectorAll('.input')[index].value
      }
      return v
    })
    setData(newData)
    local.set('data', newData)
  }

  const clearData = (index) => {
    data.splice(index, 1)
    let newData = [...data]
    setData(newData)
    local.set('data', newData)
  }

  const openAdd = () => {
    document.querySelector('.add').style.display = 'block'
  }

  return (
    <div>
      <List
        size="small"
        className='list-warpper'
        header={<div className='header'><p>代办事项</p><Button onClick={openAdd}>添加</Button></div>}
        bordered
        dataSource={data}
        renderItem={(item, i) =>
          <List.Item className='lists'
            actions={[<Button onClick={() => { eaitData(i) }}>{item.isTrue ? '编辑' : '完成'}</Button>, <Button onClick={() => { clearData(i) }}>删除</Button>]}
          >
            <div className='content'>
              <p className='text' style={{ display: item.isTrue ? 'block' : 'none' }}>{item.text}</p>
              <input type="text" defaultValue={item.text} style={{ display: item.isTrue ? 'none' : 'block' }} className='input' />
            </div>
          </List.Item>
        }
      />
      <Add />
    </div>
  )
}
