"use client";
import styles from "./avatar.module.css";

const Avatar = () => {
  return (
    <div
      className={`${styles.content} avatar`}
      onClick={() => console.log("Avatar was clicked")}
    >
      <div className={`${styles.image} w-10 rounded-full`}>
        <img
          alt="avatar"
          src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
        />
      </div>
    </div>
  );
};

export default Avatar;
