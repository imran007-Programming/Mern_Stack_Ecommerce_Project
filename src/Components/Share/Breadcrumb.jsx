import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from '../../Contexapi/BreadcrumbContext';


const Breadcrumb = () => {
  const { breadcrumb } = useBreadcrumb();

  return (
    <div className="flex space-x-2 text-sm">
      {breadcrumb.map((link, index) => (
        <React.Fragment key={index}>
          <span className={link.active ? 'text-black' : 'text-gray-500'}>
            {link.active ? (
              link.name
            ) : (
              <Link to={link.url} className="hover:text-blue-500">
                {link.name}
              </Link>
            )}
          </span>
          {index < breadcrumb.length - 1 && (
            <span className="text-gray-500"> &#8594; </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
