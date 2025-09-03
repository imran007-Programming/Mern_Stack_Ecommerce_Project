import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => {
  return useContext(BreadcrumbContext);
};

const BreadcrumbProvider = ({ children }) => {
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState([]);

  // Update breadcrumbs based on current location
  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbLinks = pathnames.map((name, index) => {
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        url: '/' + pathnames.slice(0, index + 1).join('/'),
        active: index === pathnames.length - 1,
      };
    });
    setBreadcrumb(breadcrumbLinks);
  }, [location]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbProvider;
