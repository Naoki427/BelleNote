import { useState, useEffect } from "react";
import styles from './Table.module.css'

const StyleBox = ({ initialValue, onChange}) => {
    const [style, setStyle] = useState('');
    useEffect(() => {
        setStyle(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setStyle(newValue);
        onChange(e);
      };

    return(
        <select id="options" name="Style" className={styles.StyleBox} value={style} onChange={handleChange}>
            <option value="逃げ">逃げ</option>
            <option value="先行">先行</option>
            <option value="差し">差し</option>
            <option value="追込">追込</option>
        </select>
    )
}

export default StyleBox;