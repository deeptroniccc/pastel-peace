import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Activity, BookOpen } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/mood', label: 'Mood', icon: Activity },
    { path: '/resources', label: 'Resources', icon: BookOpen }
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">MindfulSpace</span>
          </Link>
          
          <div className="flex space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;