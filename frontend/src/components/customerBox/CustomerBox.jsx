import styles from "./styles.module.css";

const CustomerBox = (props) => {
  const data = props.data;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.titles}`}>
        <h2 className={`${styles.name}`}>
          {data.name} {data.surname}
        </h2>
      </div>
      <div className={`${styles.info}`}>
        <p className={`${styles.desc}`}>{data.birthDate}</p>
        <h4 className={`${styles.desc}`}>{data.contactNumber}</h4>
      </div>
    </div>
  );
};

export default CustomerBox;
