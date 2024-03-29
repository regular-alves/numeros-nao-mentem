import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.ga === undefined) return;

    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
  }, [location]);
};

export default PageTracking;
