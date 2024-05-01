export default function ScoreBoard({ score, highScore }) {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
      <h2>High Score: {highScore}</h2>
    </div>
  );
}
