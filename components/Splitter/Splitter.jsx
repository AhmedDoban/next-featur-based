import "./Splitter.css";
function Splitter({ text, size }) {
  return (
    <div className={`Splitter ${size}`}>
      <span>{text}</span>
    </div>
  );
}
export default Splitter;
