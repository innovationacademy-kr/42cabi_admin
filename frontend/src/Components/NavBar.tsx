import { Link } from "react-router-dom";
import styled from "styled-components";
import Logout from "./Logout";

const NavBar = () => {
  return (
    <NavBarStyles>
      <div className="left">
        <Link to="">
          <img src="/assets/cabinet.ico" alt="logo" />
        </Link>
        <Link to="task" className="menu">
          TASK
        </Link>
        <Link to="status" className="menu">
          연체/밴
        </Link>
        <Link to="search" className="menu">
          검색
        </Link>
      </div>
      <div className="right">
        <div className="menu">
          <Logout />
        </div>
      </div>
    </NavBarStyles>
  );
};

const NavBarStyles = styled.div`
  display: flex;
  justify-content: space-between;
  background: #7d57c9;
  color: white;
  font-size: 1.6rem;
  @media screen and (max-width: 477px) {
    font-size: 2.5vw;
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.5rem;

    img {
      margin: 1rem;
      height: 7vw;
      max-height: 4.5rem;
      vertical-align: middle;
      @media screen and (max-width: 400px) {
        margin-left: 0.1rem;
        margin-right: 0.1rem;
      }
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.5rem;
  }

  .menu {
    margin: 1rem;
    padding-left: 0.5rem;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
  }
`;

export default NavBar;
