import styels from './tools.module.css'

const AddButton = ({onButtonClick}) => {

  return (
    <div>
      <button onClick={onButtonClick} className={styels.addButton}>＋</button>
    </div>
  );
};

export default AddButton;