import { useState, useEffect } from "react";
import styles from './Table.module.css'

const AgeBox = ({ initialValue, onChange}) => {
    const [age, setAge] = useState('');
    useEffect(() => {
        setAge(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setAge(newValue);
        onChange(e);
      };

    return(
        <select id="options" name="Age"  className={styles.AgeBox} value={age} onChange={handleChange}>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>
    )
}

export default AgeBox;