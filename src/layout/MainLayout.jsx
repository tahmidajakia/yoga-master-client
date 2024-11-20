import { Outlet } from "react-router-dom";
import NavBar from "../components/headers/NavBar";
import Footer from "../components/footer/Footer";


const MainLayout = () => {
    return (
        <main className="dark:bg-black overflow-hidden">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </main>
    );
};

export default MainLayout;