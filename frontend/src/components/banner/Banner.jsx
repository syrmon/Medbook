import { Person, Search } from "@mui/icons-material";
import styles from "./styles.module.css";
import { IconButton, Input, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const Banner = () => {
  const [searchValue, setSearchValue] = useState();

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.productName}`}>Medibook</h2>
      <div className={`${styles.searchContainer}`}>
        <TextField
          className={`${styles.searchInput}`}
          variant="standard"
          placeholder="Axtar"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
      </div>
      <div className={`${styles.personOutline}`}>
        <Person sx={{ fontSize: 30 }} style={{ color: "#fff" }} />
      </div>
    </div>
  );
};

export default Banner;
