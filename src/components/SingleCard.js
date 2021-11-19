import "./SingleCard.css";

export default function SingleCard({ card, handleChoice }) {
  // destructure card and handleChoice props from App

  return (
    <div className="card">
      <div className="flipped">
        <img className="front" src={card.src} alt="Card front" />
        <img className="back" src="/img/cover.png" alt="Card back" />
      </div>
    </div>
  );
}
