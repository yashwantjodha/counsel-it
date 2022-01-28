import React from 'react';
import PropTypes from 'prop-types';
import { formatRelative } from 'date-fns';

const formatDate = date => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Admin = ({
  createdAt = null,
  text = '',
  type = '',
}) => {
  if (!text) return null;

  return (
    <div className="left-0 float-left px-4 py-4 rounded-md overflow-hidden flex items-start">
      <div className="bg-blue-100 py-7 px-5 rounded-lg shadow-sm right-0">
        <div className="flex items-center mb-1 font-bold">
          Counsellor
          {createdAt?.seconds ? (
            <span className="text-gray-800 mx-3 text-xs bg-green">
              {formatDate(new Date(createdAt.seconds * 1000))}
            </span>
          ) : null}
        </div>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
};

Admin.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  })
};

export default Admin;
