import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './addpost.css'


export default function AddPost() {
    const [value, setValue] = useState('');
    var toolbarOptions = [['bold', 'italic'], ['link', 'image']];
    const module={
        toolbar:toolbarOptions
    }
    const handleChangeValue=(value)=>{
        console.log(value)
        setValue(value)
    }
  return (
    <div>
        <h2>Add post</h2>
        <ReactQuill modules={module} theme="snow" value={value} onChange={handleChangeValue} />
        <p dangerouslySetInnerHTML={{__html:value}}></p>
    </div>
  )
}
