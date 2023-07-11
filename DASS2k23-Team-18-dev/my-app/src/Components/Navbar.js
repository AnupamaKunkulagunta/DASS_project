import React from 'react'
import Logo from "../logo-nobg.png";
import FOD from './FOD';
// import ModalDialog from './ModalDialog';

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-dark">
        {" "}
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
        >
            <span className="navbar-toggler-icon"></span>{" "}
        </button>
        <a className="navbar-brand" href="#">
            <img src={Logo} width="100" height="40" alt="" />{" "}
        </a>{" "}
        <div>
            {/* <ModalDialog /> */}
            <FOD />
        </div>
    </nav>
  )
}
