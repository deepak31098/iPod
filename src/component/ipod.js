import {useEffect, useRef, useState} from "react";
import style from "../assets/styles/ipod-style.module.css";
import Controls from "./controls";
import Screen from "./screen";
import {Features, MusicSubOptions, video} from "../constant";
import {Battery, Instruction} from "./icons/ipod";
import {Modal, Button} from "antd";

export default function Ipod() {
  const [currentSelectedFeature, setCurrentSelectedFeature] = useState(null);
  const [currentSelectedList, setCurrentSelectedList] = useState(null);
  const [currentFeature, setCurrentFeature] = useState(null);
  const containerRef = useRef(null);
  const [isCharging, setIsCharging] = useState(false);
  const [showManual, setShowManual] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleSelect = identifier => {
    if (isCharging) {
      setCurrentFeature(null);
      setCurrentSelectedList(null);
      setCurrentSelectedFeature(null);
      setShowAlert(true);
      return;
    }
    if (identifier === Features[0] && currentSelectedFeature === "Music") {
      setCurrentSelectedList(MusicSubOptions);
    } else if (
      identifier === MusicSubOptions[0] &&
      currentSelectedFeature === "Video"
    ) {
      setCurrentSelectedList(video);
    } else {
      setCurrentFeature(currentSelectedFeature);
    }
  };

  const handleBack = identifier => {
    if (isCharging) {
      setCurrentFeature(null);
      setCurrentSelectedFeature(null);
      setCurrentSelectedList(null);
      setShowAlert(true);
      return;
    }
    // all features are unique
    // first feature used to identify list
    if (!currentSelectedList) {
      setCurrentSelectedList(Features);
    } else if (!currentFeature && identifier === MusicSubOptions[0]) {
      setCurrentSelectedList(Features);
    } else if (!currentFeature && identifier === Features[0]) {
      setCurrentSelectedList(null);
    } else if (!currentFeature && identifier === video[0]) {
      setCurrentSelectedList(MusicSubOptions);
    }
    setCurrentFeature(null);
  };

  // drag and drop feature
  const dragAndDrop = () => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    const onMouseDown = event => {
      // if we are inside controls - drag and drop should not work
      if (event.target.dataset.type === "controls") return;
      isDragging = true;
      startX = event.clientX - initialX;
      startY = event.clientY - initialY;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = event => {
      if (!isDragging) return;
      const newX = event.clientX - startX;
      const newY = event.clientY - startY;
      initialX = newX;
      initialY = newY;
      containerRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    containerRef.current.addEventListener("mousedown", onMouseDown);
  };

  useEffect(() => {
    dragAndDrop();
  }, []);

  return (
    <>
      <div className={style.container}>
        {/* charging button */}
        <div className={style.chargingPoint}>
          <div>
            <div>
              <div
                className="pointer"
                onClick={() => {
                  setShowManual(true);
                }}
              >
                <Instruction />
              </div>
              <Battery />
            </div>
            {!isCharging && (
              <div
                id={`${style.on}`}
                onClick={() => {
                  setIsCharging(true);
                }}
                className={`${style.powerButton} pointer`}
              ></div>
            )}
            {isCharging && (
              <div
                id={`${style.off}`}
                onClick={() => {
                  setIsCharging(false);
                }}
                className={`${style.powerButton} pointer`}
              ></div>
            )}
          </div>
        </div>
        <div className={style["ipod-container"]} ref={containerRef}>
          {/* battery indicator */}
          <div className={style.batteryContainer}>
            {isCharging && <Battery />}
            <div className={` ${style.indicator}`}>
              <div className={`  ${isCharging ? style.charging : ""}`}></div>
            </div>
          </div>

          <Screen
            currentSelectedFeature={currentSelectedFeature}
            currentSelectedList={currentSelectedList}
            currentFeature={currentFeature}
          />
          <Controls
            setCurrentSelectedFeature={setCurrentSelectedFeature}
            currentSelectedList={currentSelectedList}
            handleSelect={handleSelect}
            handleBack={handleBack}
            setCurrentFeature={setCurrentFeature}
            currentFeature={currentFeature}
          />
        </div>
      </div>
      <Modal
        title="iPod Manual"
        centered
        open={showManual}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => setShowManual(false)}
          >
            OK
          </Button>,
        ]}
      >
        <ul>
          <li>
            The application is equipped with a drag-and-drop feature, allowing
            you to easily place the iPod anywhere within the window.
          </li>
          <li>
            A charging facility is provided at the top-right corner to
            conveniently charge the iPod.
          </li>
          <li>
            The Next, Previous, and Stop buttons will function while watching a
            video.
          </li>
          <li>Press the Menu button to display the menu and navigate back.</li>
          <li>Press the central Select button to choose/select the item.</li>
          <li>
            Click and hold on the circular menu and move the mouse in a circular
            fashion inside the menu boundary (white circle is the menu) to
            navigate in the iPod menu
          </li>
          <li>You can either watch videos or view dummy screens.</li>
        </ul>
      </Modal>
      <Modal
        title="Alert"
        centered
        open={showAlert}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => setShowAlert(false)}
          >
            OK
          </Button>,
        ]}
      >
        <p>Wait while iPod is getting charged</p>
      </Modal>
    </>
  );
}
