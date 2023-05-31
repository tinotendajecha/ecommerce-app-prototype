import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
    return (       
            <div className="flex flex-column ">
                  <div className="flex mx-auto w-80 ">
                  <input className="bg-blue-200 rounded-tl-lg rounded-bl-lg p-2 border w-full h-8 max-w-md outline-none" type="text" id="search-bar" placeholder="Search for a gadget" />
                      <span className="my-auto bg-navBg rounded-br-lg h-8 rounded-tr-lg"><FaSearch className="text-white mt-2 ml-2 mr-2" /></span>
                  </div>  
                </div>
    )
}

export default SearchBar;
