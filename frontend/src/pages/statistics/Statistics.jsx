import React from "react";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bura Statisctics sehifesidiri</h1>
      <button onClick={() => navigate("/appointments")}>
        appointments kec
      </button>
    </div>
  );
};

export default Statistics;
