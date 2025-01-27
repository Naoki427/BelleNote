import Image from "next/image";
import styles from './home.module.css'
import InputTable from "./components/InputTable";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <table cellSpacing="0" className={styles.tableFrame}>
        <thead>
            <tr className={styles.tableColumn}>
                <th>馬名</th>
                <th>性別</th>
                <th>馬齢</th>
                <th>脚質</th>
                <th>コメント</th>
            </tr>
        </thead>
        <InputTable />
        <InputTable />
      </table>
    </div>
  );
}
