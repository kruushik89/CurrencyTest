import React from 'react';

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      ©{new Date().getFullYear()} all right reserved
    </div>
  );
};

export default Footer;