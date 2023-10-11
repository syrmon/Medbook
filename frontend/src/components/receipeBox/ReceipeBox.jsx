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
        <p className={`${styles.desc}`}>{data.workDescription} ve sair elave xercler oldu tutaqki onda nece gorsenecek</p>
        <h4 className={`${styles.amount}`}>{data.amount} AZN</h4>
      </div>
      <div className={`${styles.info}`}>
        <p className={`${styles.desc}`}>{data.outcomeDetails}</p>
        <h4 className={`${styles.outcome}`}>-{data.outcome} AZN</h4>
      </div>
      <div className={`${styles.info}`}>
        <p className={`${styles.date}`}>
          {data.date} {data.time}
        </p>
        <h4 >
          Qazanc: <span className={`${styles.income}`}> {Number(data.amount) - Number(data.outcome)} AZN</span>
        </h4>
      </div>
    </div>
  );
};

export default ReceipeBox;
