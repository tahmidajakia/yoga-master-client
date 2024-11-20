import useUser from "../../../hooks/useUser";
import welcome from '../../../assets/dashboard/urban-welcome.svg';
import { Link } from 'react-router-dom';

const StudentCP = () => {
  const { currentUser } = useUser();

  return (
    <div className="mt-16 flex justify-center items-center px-4 sm:px-8 md:px-16">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center items-center mb-6">
          <img
            onContextMenu={(e) => e.preventDefault()}
            className="h-[200px] w-auto"
            placeholder="blur"
            src={welcome}
            alt="Welcome"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl text-center font-bold mb-4">
          Hi, <span className="text-secondary italic">{currentUser?.name}</span>! Welcome to your dashboard
        </h1>
        <p className="text-center text-base mb-6 px-2 sm:px-4">
          Hey dear, this is a simple dashboard home. Our developer is updating the dashboard.
        </p>
        <div className="text-center mb-6">
          <h2 className="font-bold text-lg mb-4">You can jump to any page you want from here:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              <Link to="/dashboard/enrolled-class">My Enroll</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              <Link to="/dashboard/my-selected">My Selected</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              <Link to="/dashboard/my-payments">Payment History</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2">
              <Link to="/dashboard/apply-instructor">Join as an Instructor</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCP;
