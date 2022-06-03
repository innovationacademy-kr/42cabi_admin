import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <div style={{ cursor: "pointer" }} onClick={handleLogout}>
      로그아웃
    </div>
  );
};

export default Logout;
