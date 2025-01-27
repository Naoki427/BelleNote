
import styles from './InputTable.module.css'
const InputTable = () => {
    return (
            <tbody>
                <tr className={styles.tableContainer}>
                    <td className={styles.tdTop}>
                        <input type="text" name="name" autoComplete='off' className={styles.nameBox}>
                        </input></td>
                    <td className={styles.tdTop}>
                        <select id="options" name="sex" className={styles.sexBox}>
                            <option value="牡馬">牡馬</option>
                            <option value="牝馬">牝馬</option>
                            <option value="セン馬">セン馬</option>
                        </select>
                    </td>
                    <td className={styles.tdTop}>
                        <select id="options" name="age" className={styles.ageBox}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                    </select>
                    </td>
                    <td className={styles.tdTop}>
                        <select id="options" name="style" className={styles.styleBox}>  
                            <option value="逃げ">逃げ</option>
                            <option value="先行">先行</option>
                            <option value="差し">差し</option>
                            <option value="追込">追込</option>
                        </select>
                    </td>
                    <td className={styles.tdTop}>
                        <textarea className={styles.commentBox}></textarea>
                    </td>
                </tr>
            </tbody>
    );
}

export default InputTable;