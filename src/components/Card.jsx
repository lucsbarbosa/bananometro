import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

import "../styles/Card.css";

export default function Card(props) {
  return (
    <div className="wrap">
      <div className="upvote-container">
        <FontAwesomeIcon
          icon={faArrowCircleUp}
          className="card-icon"
          onClick={() => props.handleUpdate(props.id ,props.parentId)}
        />
        <p className="number">{props.upvote}</p>
      </div>
      <div className="card">
        <div className="card-container">
          <p className="author">{props.author}</p>
          <p className="comment">{props.comment}</p>
        </div>
      </div>
    </div>
  );
}
