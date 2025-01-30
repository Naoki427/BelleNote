import styles from './tools.module.css'

const DeleteButton = ({onButtonClick}) => {

    return (
      <div>
        <button onClick={onButtonClick} className={styles.deleteButton}>削除</button>
      </div>
    );
  };
  
  export default DeleteButton;