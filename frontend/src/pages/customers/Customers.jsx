import CustomerBox from "components/customerBox/CustomerBox";
import styles from "./styles.module.css";
import { useGetCustomersQuery } from "state/api";
import Dashboard from "components/dashboard/Dashboard";
import Banner from "components/banner/Banner";

const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery();

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.dashboardContainer}`}>
        <Dashboard />
      </div>
      <div className={`${styles.appointmentContainer}`}>
        {data !== undefined
          ? data.map((customer) => {
              return (
                customer !== false && (
                  <CustomerBox data={customer} key={customer.name} />
                )
              );
            })
          : isLoading && <div> is Loading </div>}
      </div>
      <Banner />
    </div>
  );
};

export default Customers;
