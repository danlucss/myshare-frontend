import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../../utils/data";
import { client } from "../../client";
import MasonryLayout from "../MasonryLayout";
import Spinner from "../Spinner";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [pins, setPins] = useState(null);
    const [text, setText] = useState("Saved");
    const [activeBtn, setActiveBtn] = useState("created");
    const navigate = useNavigate();
    const { userId } = useParams();

    const User =
        localStorage.getItem("user") !== "undefined" ? JSON.parse(localStorage.getItem("user")) : localStorage.clear();

    const randomImage = "https://source.unsplash.com/random/1600x900/?nature,water,moon,stars";

    const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full  w-20 outline-none";
    const notActiveBtnStyles = "bg-primary text-black font-bold p-2 rounded-full  w-20 outline-none";

    useEffect(() => {
        const query = userQuery(userId);

        client
            .fetch(query)
            .then(data => {
                console.log(data);
                setUser(data[0]);
            })
            .catch(err => console.error(err));
    }, [userId]);

    useEffect(() => {
        if (text === 'created') {
            const createdPinsQuery = userCreatedPinsQuery(userId);

            client.fetch(createdPinsQuery)
                .then(data => {
                    setPins(data);
                })
                .catch(err => console.error(err));
        } else {
            const savedPinsQuery = userSavedPinsQuery(userId);

            client.fetch(savedPinsQuery)
                .then(data => {
                    setPins(data);
                })
                .catch(err => console.error(err));
        }
    }, [text, userId]);

    const Logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    if (!user) {
        <Spinner msg={"Loading user profile..."} />;
    }

    return (
        <>
            <div className="relative pb-2 h-full justify-center items-center">
                <div className="flex flex-col pb-5">
                    <div className="relative flex flex-col mb-7">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                src={randomImage}
                                alt="image"
                                className="w-full h-370 2xl:h-510 shadow-lg object-cover"
                            />
                            <img
                                src={user?.image}
                                alt="user-image   "
                                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                            />
                            <h1 className="font-bold text-3xl text-center mt-3">{user?.userName}</h1>
                            <div className="absolute top-0 z-1 right-0 p-2">
                                {userId === User.googleId && (
                                    <GoogleLogout
                                        clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
                                        buttonText="Login"
                                        render={renderProps => (
                                            <button
                                                type="button"
                                                className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                            >
                                                <AiOutlineLogout color="red" fontSize={21} />
                                            </button>
                                        )}
                                        onLogoutSuccess={Logout}
                                        cookiePolicy={"single_host_origin"}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="text-center mb-7">
                            <button
                                type="button"
                                onClick={e => {
                                    setText(e.target.TextContent);
                                    setActiveBtn("created");
                                }}
                                className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles}`}
                            >
                                Created
                            </button>
                            <button
                                type="button"
                                onClick={e => {
                                    setText(e.target.TextContent);
                                    setActiveBtn("saved");
                                }}
                                className={`${activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles}`}
                            >
                                Saved
                            </button>
                        </div>
                        {pins?.length ? (
                            <div className="px-2">
                                <MasonryLayout pins={pins} />
                            </div>
                        ) : (
                            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                                No Pins Found!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
