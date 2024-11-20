import useUser from "../../hooks/useUser";
import { HashLoader } from 'react-spinners';
import DashboardNavigate from "../../routes/DashboardNavigate";

const Dashboard = () => {
    const { currentUser, isLoading } = useUser();
    const role = currentUser?.role;

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen p-4'>
                <HashLoader
                    color="#FF1949"
                    size={50}
                />
            </div>
        );
    }

    return (
        <div className="w-full">
            <DashboardNavigate />
        </div>
    );
};

export default Dashboard;
