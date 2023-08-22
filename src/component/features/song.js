import React from "react";
import styles from "../../assets/styles/features.module.css";

export default function Song({currentFeature}) {
  const videoSource = require(`../../assets/video/${currentFeature}.mp4`);

  return (
    <div style={{backgroundColor: "black"}} className={styles.container}>
      <video width="100%" height="100%" controls autoPlay>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
