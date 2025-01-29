import { useState, useEffect } from "react";
import styles from './Table.module.css'

const NameBox = ({ initialValue, onChange}) => {
    const [name, setName] = useState('');
    useEffect(() => {
        setName(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setName(newValue);
        onChange(e);
      };

    return(
        <input type="text" name="name" autoComplete='nope' className={styles.nameBox} value={name} onChange={handleChange}></input>
    )
}

export default NameBox;