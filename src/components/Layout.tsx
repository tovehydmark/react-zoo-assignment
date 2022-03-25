import { Link, Outlet } from "react-router-dom";
import { Nav } from "./styledComponents/Nav";

export const Layout = () => {
  return (
    <>
      <header>
        <Nav>
          <ul>
            <li>
              <Link to={"/"}>Hem</Link>
            </li>
          </ul>
        </Nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};
