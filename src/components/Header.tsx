import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{height:"5vh"}}>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/detatil"}>detail</Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
