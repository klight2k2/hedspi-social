import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Button,Form,Input,message} from 'antd'
import { auth } from "../../firebase";

import "./login.scss"
const Login = () => {
  const [err, setErr] = useState(false);
  const [form]=Form.useForm()
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const {email,password}={...values}
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // message
      navigate("/home")
    } catch (err) {
      message.open({type:"error",content:err.message})
      console.log("login",err)
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="login-logo" src="/icon/hedspi.png" alt="" />
       
        <Form
          form={form}
          autoComplete="off"
          onFinish={handleSubmit}
          //   onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'このフィールドは必須です。' }]}
          >
            <Input placeholder="メール" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'このフィールドは必須です。' }]}
          >
            <Input placeholder="パスワード" />
          </Form.Item>
    
         <Button htmlType="submit" type="primary" size="large">ログイン</Button>

          
         
        <p>アカウントをお持ちでないですか？ <Link to="/register">登録する</Link></p>
        </Form>
       
      </div>
    </div>
  );
};

export default Login;
