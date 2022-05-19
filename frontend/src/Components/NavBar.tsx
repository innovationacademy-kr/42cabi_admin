import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavBarStyles>
      <div className="left">
        <Link to="">
          <img src="/assets/cabinet.ico" alt="logo" />
        </Link>
        <Link to="status" className="menu">
          현황
        </Link>
        <Link to="search" className="menu">
          검색
        </Link>
      </div>
      <div className="right">
        <div className="menu">로그아웃</div>
      </div>
    </NavBarStyles>
  );
};

const NavBarStyles = styled.div`
  display: flex;
  justify-content: space-between;
  background: #7d57c9;
  color: white;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.5rem;

    img {
      margin: 1rem;
      height: 4.5rem;
      vertical-align: middle;
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
