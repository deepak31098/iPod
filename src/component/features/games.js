import style from "../../assets/styles/features.module.css";
import games from "../../assets/images/mario.jpg";

export default function Games() {
  return (
    <div id={style.game} className={style.container}>
      <img src={games} alt="game" />
      Games
    </div>
  );
}
