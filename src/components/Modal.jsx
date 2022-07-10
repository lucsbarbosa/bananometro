import { useState } from "react";
import Toast from "./Toast";
import "../styles/Modal.css";

export default function Modal(props) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (author.trim() !== "" && comment.trim() !== "") {
      fetch("https://bananometro-api.herokuapp.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: author,
          comment: comment,
        }),
      })
        .then((response) => {
          if (response.status === 400) {
            setMessage("Algo deu errado...");
            setToast(true);
          } else if (response.status === 200) {
            props.setRender((prevRender) => (prevRender ? false : true));
            props.setShowModal(false);
            setTimeout(() => {
              props.scroll.current?.scrollIntoView({ behavior: "smooth" });
            }, 5);
          }
        })
        .catch(() => {
          setMessage("Algo deu errado...");
          setToast(true);
        });
    } else {
      setMessage("Preencha os campos corretamente!")
      setToast(true);
    }
  }

  const handleClick = () => props.setShowModal(false);

  return (
    <>
      {toast && <Toast setToast={setToast} message={message}/>}
      <div className="overlay">
        <div className="modal">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              placeholder="Nome"
              className="input"
            />
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Escreva o comentário aqui"
              className="textarea"
            ></textarea>
            <button type="submit">Adicionar comentário</button>
          </form>
          <button className="closeModal" onClick={handleClick}>
            X
          </button>
        </div>
      </div>
    </>
  );
}
