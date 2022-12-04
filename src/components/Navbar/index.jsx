import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';


const Navbar = ({ searchTerms, setSearchTerms, user }) => {
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md border-none outline-none focus-within:shadow-sm'>
                <IoMdSearch className='ml-1' fontSize={21} />
                <input onChange={(e) => setSearchTerms(e.target.value)}
                    placeholder='Search'
                    value={searchTerms}
                    onFocus={() => navigate('/search')}
                    className='w-full p-2 bg-white outline-none'

                />
            </div>

            <div className="flex gap-3">
                <Link to={`user-profile/${user?.id}`} className="hidden md:block">
                    <img src={user.image} alt="user-image" className='w-14 h-12 rounded-full' />
                </Link>
                <Link to='/create-pin' className='bg-black text-white rounded-lg h-12 w-12 md:w-14 md:h-12 flex justify-center items-center'>
                    <IoMdAdd className='text-2xl' />
                </Link>
            </div>
        </div>
    )
}

export default Navbar;