import { Link, useLocation } from 'react-router-dom';
import { Droplets, Calculator, BookOpen, Info, Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

const Navigation = () => {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/calculator', label: 'Calculator', icon: Calculator },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <div>
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-ocean rounded-full shadow-water">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">AquaFootprint</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    location.pathname === path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={signOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigation;