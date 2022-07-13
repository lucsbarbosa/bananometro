import { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import Modal from "./Modal";
import "../styles/Header.css";

export default function Header(props) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setShowModal((prevShowModal) => {
      return prevShowModal ? false : true;
    });
  }

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
      <header>
        <div className="brand">
          <Link to={"/easteregg"}><img src="./logo.png" alt="" /></Link>
          <h1>Bananômetro</h1>
        </div>
        <button onClick={handleClick}>
          <FontAwesomeIcon icon={faSquarePlus} className="header-icon"/>
          <p>Novo comentário</p>
        </button>
      </header>
    </>
  );
}
