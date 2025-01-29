import { useState, useEffect } from "react";
import styles from './Table.module.css'

const SexBox = ({ initialValue, onChange}) => {
    const [sex, setSex] = useState('');
    useEffect(() => {
        setSex(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSex(newValue);
        onChange(e);
      };

    return(
        <select id="options" name="Sex" autoComplete='nope' className={styles.SexBox} value={sex} onChange={handleChange}>
            <option value="牡馬">牡馬</option>
            <option value="牝馬">牝馬</option>
            <option value="セン馬">セン馬</option>
        </select>
    )
}

export default SexBox;