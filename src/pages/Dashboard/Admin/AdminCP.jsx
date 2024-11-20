import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { Fade } from "react-awesome-reveal";
import AdminStats from "./AdminStats";

const AdminCP = () => {
  const { user } = useAuth();
  const axiosFetch = useAxiosFetch();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axiosFetch("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 mt-16 md:mt-10 lg:mt-8">
      <Fade delay={1000} cascade damping={0.1}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-4 sm:my-6 lg:my-7">
          Welcome Back,{" "}
          <span className="text-secondary text-xl sm:text-2xl md:text-3xl">{user?.displayName}</span>
        </h1>
        <AdminStats users={users} />
      </Fade>
    </div>
  );
};

export default AdminCP;
