import "../styles/Card.css";

export default function Card(props) {
  return (
    <div className="card">
      <div className="author">
        <p>{props.author}</p>
      </div>
      <div className="comment">
        <p>{props.comment}</p>
      </div>
    </div>
  );
}
