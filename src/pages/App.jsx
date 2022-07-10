import { useEffect, useState, useRef } from "react";
import Date from "../components/Date";
import Toast from "../components/Toast";
import Header from "../components/Header";

import "../styles/App.css";

function App() {
  const [render, setRender] = useState(false);
  const [toast, setToast] = useState(false);
  const [dates, setDates] = useState([]);
  const [noComments, setNoComments] = useState(false);
  const bottom = useRef(null);

  useEffect(() => {
    fetch("https://bananometro-api.herokuapp.com/api")
      .then((response) => {
        response.json().then((data) => {
          if (data.length === 0) {
            setNoComments(true);
          } else {
            setNoComments(false);
            setDates(() => {
              const elements = data.map((element, index) => {
                return (
                  <Date
                    date={element.date}
                    comments={element.comments}
                    key={index}
                  />
                );
              });
              let indexes = elements.length - 1;
              for (let i = 0; i <= indexes; i++) {
                if (i !== indexes) {
                  const concatArray = elements.slice(0, i + 1);
                  concatArray.push(<span className="line" />);
                  elements.splice(0, i + 1, ...concatArray);
                }
              }
              return elements;
            });
          }
        });
      })
      .catch(() => {
        setToast(true);
      });
  }, [render]);

  return (
    <div className="App">
      {toast && <Toast setToast={setToast} />}
      <Header setRender={setRender} scroll={bottom} />
      <main>
        {noComments && <div className="noComment"><p>Sem comentários por aqui...</p></div>}
        {!noComments && dates}
      </main>
      <div ref={bottom} />
    </div>
  );
}

export default App;
