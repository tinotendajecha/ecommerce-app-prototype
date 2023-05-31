import React from 'react';
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <div> 404 - Page does not exist
        <Link to="/">Go Home 
          <FaHome />
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage;
