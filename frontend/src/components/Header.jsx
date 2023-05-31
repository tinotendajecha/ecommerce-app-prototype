import React from 'react';
import { FaSignInAlt, FaUserPlus, FaUser, FaCartPlus, FaShoppingCart, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { NavDropdown, Badge} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/apiSlices/userApiSlice';
import { clearCredentials } from '../features/slices/authSlice';
import { toast } from 'react-toastify';



const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { qauntity } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ logout ] = useLogoutMutation();

  const logoutHandler = async() => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/')
      toast.success('Come back again!')
    } catch (error) {
      console.log(error)
    }
  }
  
  if(userInfo){

    return(
      <>
        <nav className="flex flex-column ">
              
              <div className="flex justify-between ">
                <div>
                  <h1>
                      <Link className="no-underline" to="/"><h1 className="text-navBg text-2xl ml-2 mt-1 md:text-3xl lg:text-5xl">Ruelus </h1></Link>
                  </h1>
                </div>

                <div className="flex">

                      <ul className="flex bg-gray" >
                        
                        <li className="mr-2 text-sm "><Link to="/profile" className="flex p-2 no-underline text-textCl" >
                          <span className="text-navBg md:text-2xl"><FaUser className="mt-1 mr-1 " /></span>
                          <span className="md:text-2xl">{userInfo.surname}</span>
                          </Link>
                        </li>

                        <li className="mr-2 text-sm "><Link to="/myCart" className="flex p-2 no-underline text-textCl" >
                          
                          <span className="text-navBg md:text-2xl"><FaShoppingCart className="mt-1 mr-1" /></span>
                          <span>{qauntity}</span>
                          
                          </Link>
                        </li>

                        <li className="flex mt-2 mr-2 text-sm ">
                          <span className=" h-6 text-navBg md:text-2xl"><FaSignOutAlt className="mt-1 mr-1" /></span>
                          <button className=" h-6 text-textCl md:text-2xl" onClick={ logoutHandler }>
                            Logout 
                          </button>
                        </li>
                        
                      </ul>
                
                </div>

              </div>

              
              
        </nav>
      </>
    )
  }else{
    return (
      <>
        <nav  >
                <div className="flex justify-between ">
                  <h1>
                      <Link className="no-underline" to="/"><h1 className="text-headingCl text-lg ml-2 mt-1 md:text-4xl">Ruelus</h1></Link>
                  </h1>

                  <div className="flex">
                    <ul className="flex bg-gray">

                        <li className="mr-2 text-sm "><Link to="/login" className="flex p-2 no-underline text-textCl" >
                          <span className="text-navBg"><FaSignInAlt className="mt-1 mr-1 md:text-2xl" /></span>
                          <span className="md:text-2xl">Login</span>
                          </Link>
                        </li>

                        <li className="mr-2 text-sm "><Link to="/register" className="flex p-2 no-underline text-textCl" >
                          <span className="text-navBg"><FaUserPlus className="mt-1 mr-1 md:text-2xl" /></span>
                          <span className="md:text-2xl">Sign up</span>
                          </Link>
                        </li>

                        <li className="mr-2 text-sm "><Link to="/myCart" className="flex p-2 no-underline text-textCl" >
                          <span className="text-navBg"><FaShoppingCart className="mt-1 mr-1 md:text-2xl" /></span>
                          <span className="md:text-2xl">Cart</span>
                          </Link>
                        </li>

                    </ul>
                  </div>

                </div>
                
              
        </nav>
      </>
    )
  }
}

export default Header;
