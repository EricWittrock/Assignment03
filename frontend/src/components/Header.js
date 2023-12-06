import React, { useEffect, useState } from 'react';

function Header({stateCallback}) {

  const [email, setEmail] = useState(window.globalVars.account._email);

  function shopClick() {
    stateCallback(0);
  }

  function checkoutClick() {
    stateCallback(1);
  }

  function aboutClick() {
    stateCallback(2);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">

        <a className="navbar-brand" type="button" onClick={shopClick}>Shop</a>
        <a className="navbar-brand" type="button" onClick={checkoutClick}>Checkout</a>
        <a className="navbar-brand" type="button" onClick={aboutClick}>About</a>

      </div>
    </nav>
  );
}

export default Header;