import { useState } from "react";
import Masonry from "react-masonry-css";
import "../styles/Date.css";
import Card from "./Card";
import Loading from './Loading'
import Toast from "./Toast";

export default function Date(props) {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)

  function handleUpdate(id, parentId) {
    setLoading(true);
    fetch("https://bananometro-api.herokuapp.com/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        parentId: parentId,
      }),
    }).then(response => {
      if (response.status === 400) {
        setToast(true);
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
      setToast(true);
    });
  }

  const breakpointColumnsObj = {
    default: 5,
    2080: 4,
    800: 3,
    608: 2,
    500: 1,
  };
  return (
    <>
    { toast && <Toast setToast={setToast} message="Algo deu errado..."/> }
    { loading && <Loading /> }
     <div className="date">
      <p>{props.date}</p>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {props.comments.sort((a, b) => b.upvote - a.upvote).map((element, i) => {
          return (
            <Card
              author={element.author}
              comment={element.comment}
              upvote={element.upvote}
              handleUpdate={handleUpdate}
              parentId={props.id}
              id={element._id}
              key={i}
            />
          );
        })}
      </Masonry>
    </div>
    </>
  );
}
