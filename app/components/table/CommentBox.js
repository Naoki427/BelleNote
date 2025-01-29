import { useState, useEffect } from "react";
import styles from './Table.module.css'

const CommentBox = ({ initialValue, onChange}) => {
    const [comment, setComment] = useState('');
    useEffect(() => {
        setComment(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setComment(newValue);
        onChange(e); // 親コンポーネントのコールバック関数を呼び出す
      };

    return(
        <textarea name="comment" className={styles.commentBox} value={comment} onChange={handleChange}></textarea>
    )
}

export default CommentBox;