import { Person } from "@mui/icons-material";
import styles from "./styles.module.css";

const Banner = () => {
  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.productName}`}>Medibook</h2>
      <div className={`${styles.personOutline}`}>
        <Person
          sx={{ fontSize: 30 }}
          style={{ color: "#fff"}}
        />
      </div>
    </div>
  );
};

export default Banner;
