import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleInputId = (e: any) => {
    setInputId(e.target.value);
  };

  const handleInputPassword = (e: any) => {
    setInputPassword(e.target.value);
  };

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!inputId || !inputPassword) {
      alert("아이디 또는 비밀번호를 확인해주세요!");
      return;
    }
    try {
      // console.log(inputId, inputPassword);
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        id: inputId,
        password: inputPassword,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      console.log(res.data);
      window.location.href = "/saerom";
    } catch (e) {
      alert("잘못된 계정입니다!");
    }
  };

  return (
    <LoginStyles>
      <div className="LoginBackground" />
      <img src="/assets/logo.png" alt="logo" />
      <FormStyles>
        <input
          type="text"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
          placeholder="ID"
        />
        <input
          type="password"
          name="input_pw"
          value={inputPassword}
          onChange={handleInputPassword}
          placeholder="Password"
          onKeyDown={handleEnterKey}
        />
      </FormStyles>
      <LoginButtonStyles onClick={handleLogin}>LOGIN</LoginButtonStyles>
    </LoginStyles>
  );
};

const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > input {
    width: 35rem;
    height: 3.5rem;
    margin-top: 1rem;
    padding-left: 1.5rem;

    border: 0.1rem solid #ffffff;
    border-radius: 0.5rem;
    background-color: #ffffff22;
    color: #ffffff;

    ::placeholder {
      color: #aaa;
    }
  }
`;

const LoginButtonStyles = styled.button`
  width: 37rem;
  height: 4.5rem;
  margin-top: 1.5rem;

  color: #ffffff;
  border: 0.25rem solid #ffffff;
  border-radius: 0.5rem;
  background-color: #00000000;
  letter-spacing: 0.5rem;

  /* pointer-events: none; */

  :hover {
    background-color: #ffffff22;
    transition: background-color 0.4s;
    cursor: pointer;
  }

  :active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
`;

const LoginStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;

  .LoginBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #512d83;
    z-index: -1;
  }

  & > img {
    width: 60rem;
  }
`;

export default Login;
