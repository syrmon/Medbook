import CustomerBox from "components/customerBox/CustomerBox";
import styles from "./styles.module.css";
import { useGetCustomersQuery } from "state/api";
import Dashboard from "components/dashboard/Dashboard";
import Banner from "components/banner/Banner";

const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery();
  return (
    <div className={`${styles.container}`}>
      <Banner />
      <div className={`${styles.appointmentContainer}`}>
        <div className={`${styles.statisticsContainer}`}>
          <h3>Müştəri sayı: </h3>{" "}
          <h3>{data !== undefined ? data.length : 0}</h3>
        </div>
        {data !== undefined
          ? data.map((customer) => {
              return (
                customer !== false && (
                  <CustomerBox data={customer} key={customer.name} />
                )
              );
            })
          : isLoading && ""}
      </div>
      <Dashboard />
    </div>
  );
};

export default Customers;
