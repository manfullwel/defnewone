import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {}

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Demand Report
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/reports"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/reports')}`}
            >
              Relatórios
            </Link>
            <Link
              to="/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/analytics')}`}
            >
              Análises
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
