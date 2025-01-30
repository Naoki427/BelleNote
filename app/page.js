"use client";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import styles from './home.module.css'
import useUniqueId from "@/lib/useId"
import AddButton from './components/tools/AddButton';
import DeleteButton from "./components/tools/DeleteButton";
import NameBox from "./components/table/NameBox";
import SexBox from "./components/table/SexBox";
import AgeBox from "./components/table/AgeBox";
import StyleBox from "./components/table/StyleBox";
import CommentBox from "./components/table/CommentBox";

export default function Home() {
  useUniqueId();
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('id');
  const [order, setOrder] = useState('ASC');

  const fetchData = useCallback(async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await fetch(`/api/get-data?id=${userId}&search=${search}&sort=${sort}&order=${order}`);
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log('fetchedata',fetchedData);
      } else {
          console.log('No userId found in localStorage');
      }
  }, [add, del, search, sort, order]);
  
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
  
  const handleAddButtonClick = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No userId found in localStorage');
      return;
    }
    
    try {
      const response = await fetch('/api/new-field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      if (response.ok) {
        console.log('Data inserted successfully');
      } else {
        console.error('Failed to insert data');
      }
    } catch (error) {
        console.error('Error:', error);
    }
    setAdd(prev => !prev);
    setSearch('');
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await fetch('/api/delete-data', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (response.ok) {
        console.log('Data deleted successfully');
      } else {
        console.error('Failed to delete data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setDel(prev => !prev);
  };

  const handleSearch = debounce((e) => {
    const {value} = e.target;
    setSearch(value);
  },1000);

  const handleSort = (e) => {
    const {value} = e.target;
    setSort(value);
  }

  const handleOrder = (e) => {
    const {value} = e.target;
    setOrder(value);
  }

  return (
      <div className={styles.homeContainer}>
        <div className={styles.searchContainer}>
          <input placeholder="検索..." className={styles.searchBox} onChange={(e) => handleSearch(e)}></input>
        </div>
        <div className={styles.sortContainer}>
          <select id="options" name="Sort" onChange={(e) => handleSort(e)} className={styles.sortButton}>
            <option value='id'>作成順</option>
            <option value='name'>名前順</option>
            <option value='age'>馬齢順</option>
          </select>
          <select id="options" name="Order" onChange={(e) => handleOrder(e)} className={styles.sortButton}>
            <option value='ASC'>昇順</option>
            <option value='DESC'>降順</option>
          </select>
        </div>
        <table cellSpacing="0" className={styles.tableFrame}>
          <thead >
              {data && data.length != 0 && Array.isArray(data) && <tr className={styles.tableColumn}>
                  <th>馬名</th>
                  <th>性別</th>
                  <th>馬齢</th>
                  <th>脚質</th>
                  <th>コメント</th>
              </tr>}
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
                      <td>
                          <DeleteButton onButtonClick={() => handleDeleteButtonClick(item.id)}/>
                      </td>
                  </tr>
              ))}
          </tbody>
          </table>
          <AddButton onButtonClick={handleAddButtonClick}/>
      </div>
  );
}
