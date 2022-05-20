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

  const handleLogin = () => {
    console.log(inputId);
    console.log(inputPassword);
    window.location.href = "/saerom";
  };

  return (
    <LoginStyles>
      <img src="/assets/logo_purple.png" alt="logo" style={{}} />
      <FormStyles>
        <input
          type="text"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
          placeholder="Login"
        />
        <input
          type="password"
          name="input_pw"
          value={inputPassword}
          onChange={handleInputPassword}
          placeholder="Password"
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

    border: 0.1rem solid #512d83;
    border-radius: 0.5rem;
    background-color: #00000011;
  }
`;

const LoginButtonStyles = styled.button`
  width: 37rem;
  height: 4.5rem;
  margin-top: 1.5rem;

  color: #512d83;
  border: 0.25rem solid #512d83;
  border-radius: 0.5rem;
  background-color: #00000000;
  letter-spacing: 0.5rem;

  /* pointer-events: none; */

  :hover {
    background-color: #00000011;
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

  & > img {
    width: 60rem;
  }
`;

export default Login;
