import "../styles/Toast.css";

export default function Toast(props) {
  const handleClick = () => props.setToast(false);

  return (
    <div className="toast">
      <p className="icon" onClick={handleClick}>
        X
      </p>
      <p className="text">{props.message}</p>
    </div>
  );
}
