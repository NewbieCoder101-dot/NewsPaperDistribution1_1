// // src/components/Sidebar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = ({ role }) => {
//   return (
//     <div className="sidebar">
//       <ul className="sidebar-list">
//         <li className="sidebar-item">
//           <Link to="/" className="sidebar-link">Home</Link>
//         </li>
//         {role === 'admin' && (
//           <li className="sidebar-item">
//             <Link to="/admin/dashboard" className="sidebar-link">Admin Dashboard</Link>
//           </li>
//         )}
//         {role === 'mainDistributor' && (
//           <li className="sidebar-item">
//             <Link to="/main/distributor" className="sidebar-link">Main Distributor Dashboard</Link>
//           </li>
//         )}
//         {role === 'subDistributor' && (
//           <li className="sidebar-item">
//             <Link to="/sub/distributor" className="sidebar-link">Sub Distributor Dashboard</Link>
//           </li>
//         )}
//         {role === 'retailer' && (
//           <li className="sidebar-item">
//             <Link to="/retailer" className="sidebar-link">Retailer Dashboard</Link>
//           </li>
//         )}
//         {role === 'producer' && (
//           <li className="sidebar-item">
//             <Link to="/producer" className="sidebar-link">Producer Dashboard</Link>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">Home</Link>
        </li>
        {role === 'admin' && (
          <li className="sidebar-item">
            <Link to="/admin/dashboard" className="sidebar-link">Admin Dashboard</Link>
          </li>
        )}
        {role === 'mainDistributor' && (
          <li className="sidebar-item">
            <Link to="/main/distributor" className="sidebar-link">Main Distributor Dashboard</Link>
          </li>
        )}
        {role === 'subDistributor' && (
          <li className="sidebar-item">
            <Link to="/sub/distributor" className="sidebar-link">Sub Distributor Dashboard</Link>
          </li>
        )}
        {role === 'retailer' && (
          <li className="sidebar-item">
            <Link to="/retailer" className="sidebar-link">Retailer Dashboard</Link>
          </li>
        )}
        {role === 'producer' && (
          <li className="sidebar-item">
            <Link to="/producer" className="sidebar-link">Producer Dashboard</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
