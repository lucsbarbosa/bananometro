import "../styles/Date.css";
import Card from "./Card";

export default function Date(props) {
  const columns = [[], [], [], []];
  const cards = props.comments;

  let index = 0;
  for (let i = 0; i < cards.length; i++) {
    columns[index].push(cards[i]);
    let newIndex = (index += 1);
    newIndex < columns.length ? (index = newIndex) : (index = 0);
  }

  return (
    <div className="date">
      <p>{props.date}</p>
      <div className="card-grid">
        {columns.map((column, i) => {
          return (
            <div className="column" key={i}>
              {column.map((element, x) => {
                return (
                  <Card
                    author={element.author}
                    comment={element.comment}
                    key={x}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
