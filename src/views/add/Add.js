import React from 'react'
import { useState } from 'react'
import './Add.css'
import { Input, Button } from 'antd'
import local from '../../utils/local'
const { TextArea } = Input;

export default function Add() {
    let data = local.get('data')
    let [prop, setProp] = useState(data)
    let [value, setValue] = useState('')

    const onChange = e => {
        setValue(e.target.value)
    }

    const addData = () => {
        if (value) {
            prop.push({ text: value, isTrue: true })
        }
        setProp(prop)
        local.set('data', prop)
        back()
        window.location.reload()
    }

    const back = () => {
        setValue('')
        document.querySelector('.add').style.display = 'none'
    }

    return (
        <div className='add' style={{ display: 'none' }} >
            <div className='back'><span onClick={back}>&lt;</span></div>
            <TextArea placeholder="添加事项..." maxLength={50} onChange={onChange} className='text' value={value} />
            <Button type="primary" className='btn' onClick={addData}>添加</Button>
        </div>
    )
}
