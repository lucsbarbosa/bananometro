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
    if (
      author.trim() !== "" &&
      !author.trim().includes("⠀") &&
      comment.trim() !== "" &&
      !comment.trim().includes("⠀")
    ) {
      fetch("https://bananometro-api.herokuapp.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author,
          comment: comment,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            props.setShowModal(false);
          } else {
            setMessage("Algo deu errado...");
            setToast(true);
          }
        })
        .catch(() => {
          setMessage("Erro no servidor");
          setToast(true);
        });
    } else {
      setMessage("Preencha os campos!");
      setToast(true);
    }
  }

  const handleClick = () => props.setShowModal(false);

  return (
    <>
      {toast && <Toast setToast={setToast} message={message} />}
      <div className="overlay">
        <div className="modal">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-container">
              <div style={{ height: "fit-content" }}>
                <textarea
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    e.target.style.height = "inherit";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  className="author-ta"
                  placeholder="Nome"
                  rows={1}
                ></textarea>
                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    e.target.style.height = "inherit";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  className="comment-ta"
                  placeholder="Escreva seu comentário aqui"
                ></textarea>
              </div>
            </div>
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
