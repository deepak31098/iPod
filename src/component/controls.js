import {useEffect, useState} from "react";
import style from "../assets/styles/controls.module.css";
// import button icons
import {
  FastForwardFilled,
  FastBackwardFilled,
  CaretRightOutlined,
} from "@ant-design/icons";
import ZingTouch from "zingtouch";
import {video} from "../constant";

export default function Controls({
  setCurrentSelectedFeature,
  currentSelectedList,
  handleSelect,
  handleBack,
  setCurrentFeature,
  currentFeature,
}) {
  const [currIndex, setCurrIndex] = useState(0);

  // on mount
  useEffect(() => {
    // check rotation of wheel
    const touchArea = document.getElementById("wheel");
    const myRegion = new ZingTouch.Region(touchArea);
    myRegion.bind(touchArea, "rotate", function (e) {
      let index = 0;
      // clockwise rotation
      if (Math.floor(e.detail.distanceFromOrigin) > 30) {
        index =
          (currIndex + Math.floor(e.detail.distanceFromOrigin / 30)) %
          currentSelectedList?.length;
      }
      //   anticlockwise rotation
      if (Math.floor(e.detail.distanceFromOrigin) < 30) {
        index =
          (currentSelectedList?.length -
            (Math.floor(Math.abs(e.detail.distanceFromOrigin) / 30) %
              currentSelectedList?.length)) %
          currentSelectedList?.length;
      }
      setCurrIndex(index);
    });
    return () => {
      myRegion.unbind(touchArea, "rotate");
    };
  }, [currentSelectedList]);

  // current active icon should be updated whenever index change
  useEffect(() => {
    if (!currentSelectedList) return;
    setCurrentSelectedFeature(currentSelectedList[currIndex]);
  }, [currIndex, currentSelectedList]);

  // previous and next button
  const nextPrev = async increment => {
    if (video.includes(currentFeature)) {
      if (increment === 0) {
        setCurrentFeature(null);
        return;
      }
      await setCurrentFeature(null);
      let index =
        Math.abs(video.indexOf(currentFeature) + increment) % video.length;
      setCurrentFeature(video[index]);
    }
  };

  return (
    <div className={style.control} id="wheel" data-type="controls">
      <div
        data-type="controls"
        id={style.menu}
        onClick={() => {
          setCurrIndex(0);
          handleBack(currentSelectedList && currentSelectedList[0]);
        }}
        className={style.pointer}
      >
        MENU
      </div>
      <div id={style.forward} className={style.pointer} data-type="controls">
        {/* next button */}
        <FastForwardFilled onClick={() => nextPrev(1)} />
      </div>

      {/* previous button */}
      <div id={style.backward} className={style.pointer} data-type="controls">
        <FastBackwardFilled onClick={() => nextPrev(-1)} />
      </div>

      {/* stop button */}
      <div id={style.stop} className={style.pointer} data-type="controls">
        <CaretRightOutlined onClick={() => nextPrev(0)} />
      </div>

      {/* center button */}
      <div
        id={style.select}
        data-type="controls"
        onClick={() => {
          setCurrIndex(0);
          handleSelect(currentSelectedList && currentSelectedList[0]);
        }}
        className={style.pointer}
      ></div>
    </div>
  );
}
