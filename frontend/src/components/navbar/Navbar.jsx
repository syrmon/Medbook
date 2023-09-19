import { Search } from "@mui/icons-material";
import styles from "./styles.module.css";

const Navbar = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.searchContainer}`}>
        <Search />
        <input type="text" />
      </div>
    </div>
  );
};

export default Navbar;
