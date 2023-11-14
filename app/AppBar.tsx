"use client";
import Link from "next/link";
// import "../public/js/headerBar";
import "../styles/headerBar.scss";
import { auth, useAuthContext } from "./Providers";

const AppBar = () => {
  const { user } = useAuthContext();
  const onLogout = () => {
    auth.signOut();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" />
          <div className="hamburger-lines">
            <span className="line line1" />
            <span className="line line2" />
            <span className="line line3" />
          </div>
          <ul className="menu-items">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/animation"}>Animation</Link>
            </li>
            <li>
              <Link href={"/newpages"}>Server</Link>
            </li>
            {user ? (
              <li>
                <a href="/signin" onClick={onLogout}>
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <a href="/signin">Login</a>
              </li>
            )}
          </ul>
          <h1 className="logo">Navbar</h1>
        </div>
      </nav>
    </>
  );
};

export default AppBar;
