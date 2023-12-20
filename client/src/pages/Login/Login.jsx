import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Button} from 'antd'
import { auth } from "../../firebase";

import "./login.scss"
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="login-logo" src="/icon/hedspi.png" alt="" />
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="メールアドレス" />
          <input type="password" placeholder="パスワード" />
          <Button htmlType="submit" type="primary" size="large">ログイン</Button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>アカウントをお持ちでないですか？ <Link to="/register">登録する</Link></p>
      </div>
    </div>
  );
};

export default Login;
