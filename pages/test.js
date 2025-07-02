import Image from "next/image";
import styles from "./test.module.css";
export default function Test() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image />
        </div>
        <div className={styles.image}>
          <Image />
        </div>
        <div className={styles.image}>
          <Image />
        </div>
      </div>
    </div>
  );
}
