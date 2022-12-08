import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logoNoBg from "../../assets/logo-nobg.png";
import { categories } from "../../utils/data";

const Sidebar = ({ user, closeToggle }) => {
    const isNotActiveStyle =
        "flex items-center  px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize font-xl";
    const isActiveStyle =
        "flex items-center  px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out text-xl";



    const handleCloseSidebar = () => {
        if (closeToggle) {
            closeToggle(false);
        }
    };

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-21 hide-scrollbar">
            <div className="flex flex-col">
                <Link onClick={handleCloseSidebar} to="/" className="flex  px-5 gap-2 my-6 pt-1 w-190 items-center">
                    <img src={logoNoBg} alt="logonobg" className="w-20" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill className="text-2xl" />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
                    {categories.slice(0, categories.length - 1).map((category, index) => (

                        <NavLink
                            key={index}
                            to={`/category/${category.name}`}
                            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                            onClick={handleCloseSidebar}
                        >
                            {category.icon}
                            {category.name}

                        </NavLink>


                    ))}
                </div>
            </div>

            {user && (
                <Link to={`user-profile/${user?._id}`} className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg" onClick={handleCloseSidebar}>
                    <img src={user.image} className="w-10 h-10 rounded-full" alt={`user-profile ${user.userName}`} />
                    <p> {user.userName}</p>
                </Link>
            )}
        </div>
    );
};

export default Sidebar;
