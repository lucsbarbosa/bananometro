import Modal from "./Modal";
import "../styles/Header.css";
import { useState } from "react";

export default function Header(props) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setShowModal((prevShowModal) => {
      return prevShowModal ? false : true;
    });
  }

  return (
    <>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setRender={props.setRender}
          scroll={props.scroll}
        />
      )}
      <header>
        <div className="brand">
          <img src="./logo.png" alt="" />
          <h1>Bananômetro</h1>
        </div>
        <button onClick={handleClick}>Novo comentário</button>
      </header>
    </>
  );
}
