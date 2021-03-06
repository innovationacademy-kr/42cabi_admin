import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <div style={{ cursor: "pointer" }} onClick={handleLogout}>
      ๋ก๊ทธ์์
    </div>
  );
};

export default Logout;
