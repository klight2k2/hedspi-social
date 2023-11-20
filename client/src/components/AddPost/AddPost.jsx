import React, { useState,useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from "../../context/AuthContext";
import './addpost.css';
import { Select, Space, Button,message } from 'antd';
import { db } from "../../firebase";
import { addDoc, doc, serverTimestamp,collection, } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import PostService from '../../service/PostService';
const { Option } = Select;

export default function AddPost() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const tagOptions = [
    'Culture',
    'Language',
    'Travel',
    'History',
    'Cuisine',
    'Art',
    'Anime',
    'Education',
    'Business',
    'Cross-cultural',
    'Japanese lifestyle',
  ];
  // var toolbarOptions = [['bold', 'italic'], ['link', 'image']];
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],

    [{ header: 1 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  const handleChangeValue = value => {
    console.log(value);
    setContent(value);
  };

  const handleChangeTag = selectedValues => {
    setTags(selectedValues);
    console.log('Selected values:', selectedValues);
  };
  const handlCancel=async()=>{
    // setTags([])
    // setContent([])
    navigate('/home');
  }
  const handlePost=async()=>{
    console.log("tags",tags)
    if(tags.length<=0){
      message.open(
        {
          type: 'error',
          content: 'Please select at least 1 tag',
        }
      )
        return;
    }

    if(content.length<=0){
      message.open(
        {
          type: 'error',
          content: "Please input your content",
        }
      )
      return;
    }

  
    const post={
      tags:tags,
      content:content,
      uid:currentUser.uid,
      // is_approved:false,
      // comments:[],
      // like:[],
      // created_at:serverTimestamp(),
      // updated_at:serverTimestamp(),
    }
    console.log("content",post)
    const result= await PostService.uploadPost(post);
    console.log( result)
    navigate('/home');
    
    
  }

  return (
   <div className="container">
     <Space direction="vertical" className="create-post mt-16mt-" size={24}>
      <h2>Add post</h2>
      <Select
        mode="multiple"
        placeholder="Select tags"
        onChange={handleChangeTag}
      
        style={{ width: '100%' }}
      >
        {tagOptions.map(item => {
          return <Option value={item}>{item}</Option>;
        })}
      </Select>
      <ReactQuill
        className="quill-edit"
        modules={module}
        theme="snow"
        value={content}
        onChange={handleChangeValue}
        style={{ background: '#fff' }}
      />

      <Space className="float-btn">
        <Button >Cancel</Button>
        <Button type="primary" onClick={handlePost}>Post</Button>
      </Space>
    </Space>
   </div>
  );
}
