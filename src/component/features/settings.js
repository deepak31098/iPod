import style from "../../assets/styles/features.module.css";
import settings from "../../assets/images/settings.png";

export default function Settings() {
  return (
    <div id={style.settings} className={style.container}>
      <img src={settings} alt="settings" />
      Settings
    </div>
  );
}
