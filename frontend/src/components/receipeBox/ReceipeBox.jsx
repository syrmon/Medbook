import styles from "./styles.module.css";

const ReceipeBox = (props) => {
  const data = props.data;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.titles}`}>
        <h2 className={`${styles.name}`}>
          {data.name} {data.surname}
        </h2>
      </div>
      <div className={`${styles.info}`}>
        <p className={`${styles.desc}`}>{data.workDescription}</p>
        <h4 className={`${styles.amount}`}>{data.amount} AZN</h4>
      </div>
      <div className={`${styles.info}`}>
        <p className={`${styles.desc}`}>{data.outcomeDetails}</p>
        <h4 className={`${styles.amount}`}>{data.outcome} AZN</h4>
      </div>
      <div className={`${styles.info}`}>
        <p className={`${styles.date}`}>
          {data.date} {data.time}
        </p>
      </div>
    </div>
  );
};

export default ReceipeBox;
