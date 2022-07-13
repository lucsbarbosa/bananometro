import { useEffect, useState } from "react";
import socket from "../service/socket";

import Date from "../components/Date";
import Toast from "../components/Toast";
import Header from "../components/Header";
import Loading from "../components/Loading";

import "../styles/Home.css";

export default function Home() {
  const [render, setRender] = useState(false);
  const [toast, setToast] = useState(false);
  const [dates, setDates] = useState([]);
  const [noComments, setNoComments] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateRender = () =>
      setRender((prevRender) => (prevRender ? false : true));
    socket.on("success", updateRender);
    return () => socket.off("sucess", updateRender);
  }, []);

  useEffect(() => {
    fetch("https://bananometro-api.herokuapp.com/")
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.length === 0) {
              setNoComments(true);
            } else {
              setNoComments(false);
              setDates(() => {
                const elements = data.flatMap((element, index) => {
                  return [
                    <Date
                      date={element.date}
                      comments={element.comments}
                      id={element._id}
                      key={element._id}
                    />,
                    <span className="line" key={index}></span>,
                  ];
                });
                elements.pop();
                return elements;
              });
            }
            setLoading(false);
          })
          .catch(() => {
            setToast(true);
          });
      })
      .catch(() => {
        setToast(true);
      });
  }, [render]);

  return (
    <>
      {toast && <Toast setToast={setToast} message="Algo deu errado..." />}
      <Header />
      {loading && <Loading />}
      <main>
        {noComments && (
          <div className="noComment">
            <p>Sem comentários por aqui...</p>
          </div>
        )}
        {!noComments && dates}
      </main>
    </>
  );
}
