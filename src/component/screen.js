import style from "../assets/styles/screen.module.css";
import {RightOutlined} from "@ant-design/icons";
import CoverFlow from "./features/cover-flow";
import Games from "./features/games";
import Settings from "./features/settings";
import Artist from "./features/artist";
import Song from "./features/song";
import {video} from "../constant";

export default function Screen({
  currentSelectedFeature,
  currentSelectedList,
  currentFeature,
}) {
  return (
    <div className={style.screen}>
      {/* render page according to selected features */}
      {currentFeature === "Cover flow" && <CoverFlow />}
      {currentFeature === "Games" && <Games />}
      {currentFeature === "Settings" && <Settings />}
      {currentFeature === "Artist" && <Artist />}
      {video.includes(currentFeature) && (
        <Song currentFeature={currentFeature} />
      )}

      {currentSelectedList && !currentFeature && (
        <div className={style.sidebar}>
          <div id={style.modal}>
            <span>iPod</span>
          </div>
          {currentSelectedList?.map(e => (
            <div
              key={e}
              className={`${style.feature} ${
                currentSelectedFeature === e ? style.active : ""
              } `}
            >
              <span>{e}</span>
              {currentSelectedFeature === e && (
                <RightOutlined className={style["left-arrow"]} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
