import Image from "next/image";
import styles from "./page.module.css";
import SearchingPanel from "@/components/SearchingPanel/SearchingPanel";

export default function Home() {
  return (
    <div className={styles.page}>
      <SearchingPanel></SearchingPanel>
    </div>
  );
}
