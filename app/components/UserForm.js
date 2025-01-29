import { useEffect, useState, useCallback } from "react";
import styles from "./UserForm.module.css"
import AddButton from "./AddButton";
import { debounce } from "lodash";
import NameBox from "./table/NameBox";
import SexBox from "./table/SexBox";
import AgeBox from "./table/AgeBox";
import StyleBox from "./table/StyleBox";
import CommentBox from "./table/CommentBox";

const UserForm = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('ASC');

    const fetchData = useCallback(async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await fetch(`/api/get-data?id=${userId}&search=${search}&sort=${sort}&order=${order}`);
          const fetchedData = await response.json();
          setData(fetchedData);
        } else {
            console.log('IDがlocalStorageに存在しません');
        }
    }, [search, sort, order]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const handleInputChange = debounce(async (e, id) => {
        const { name, value } = e.target;
        try {
            const response = await fetch('/api/update-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, fieldName: name, fieldValue: value }),
            });
            const result = await response.json();
            console.log('Update result:', result);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    },500);
    
    return (
        <div className={styles.homeContainer}>
        <table cellSpacing="0" className={styles.tableFrame}>
            <thead >
                <tr className={styles.tableColumn}>
                    <th>馬名</th>
                    <th>性別</th>
                    <th>馬齢</th>
                    <th>脚質</th>
                    <th>コメント</th>
                </tr>
            </thead>
            <tbody>
                {data && Array.isArray(data) && data.map(item => (
                    <tr key={item.id} className={styles.tableContainer}>
                        <td className={styles.tdTop}>
                            <NameBox initialValue={item.name || ''}  onChange={(e) => handleInputChange(e, item.id)}/>
                        </td>
                        <td className={styles.tdTop}>
                            <SexBox initialValue={item.sex || ''}  onChange={(e) => handleInputChange(e, item.id)}/>
                        </td>
                        <td className={styles.tdTop}>
                            <AgeBox initialValue={item.age || ''}  onChange={(e) => handleInputChange(e, item.id)}/>
                        </td>
                        <td className={styles.tdTop}>
                            <StyleBox initialValue={item.style || ''}  onChange={(e) => handleInputChange(e, item.id)}/>
                        </td>
                        <td className={styles.tdTop}>
                            <CommentBox  initialValue={item.comment || ''}  onChange={(e) => handleInputChange(e, item.id)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            <AddButton/>
        </div>
    );
}

export default UserForm;