import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Droplets } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; email?: string | undefined; confirmed_at?: string | null; last_sign_in_at?: string | null; } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check session and redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current session state:', { session, user, error });
      setCurrentUser(user);
      
      if (user) {
        console.log('User is logged in:', {
          id: user.id,
          email: user.email,
          emailConfirmed: user.confirmed_at,
          lastSignIn: user.last_sign_in_at
        });

        // If user is logged in and email is confirmed, redirect to home
        if (user.confirmed_at) {
          toast({
            title: "Already logged in",
            description: "Redirecting to home page..."
          });
          navigate('/');
        }
      }
    };
    
    checkSession();
  }, [navigate, toast]);

  // Check for email confirmation success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const confirmed = params.get('confirmed');
    const tab = params.get('tab');
    
    const checkConfirmation = async () => {
      if (confirmed === 'true') {
        // Double check with Supabase that the email is actually confirmed
        const { data: { user }, error } = await supabase.auth.getUser();
        console.log('Checking confirmation status:', { user, error });
        
        if (user?.confirmed_at) {
          // Log email confirmation
          const { error: logError } = await supabase
            .from('user_logs')
            .insert({
              user_id: user.id,
              action: 'email_confirmed',
              metadata: {
                email: user.email,
                confirmed_at: user.confirmed_at
              }
            });

          if (logError) {
            console.error('Error logging email confirmation:', logError);
          }

          toast({
            title: "Email confirmed!",
            description: "Your email has been confirmed. You can now sign in.",
          });
          navigate('/auth?tab=signin');
        } else {
          console.log('Email not confirmed yet:', { confirmed_at: user?.confirmed_at });
          toast({
            title: "Confirmation pending",
            description: "Your email confirmation is still pending. Please check your email and click the confirmation link.",
            variant: "destructive"
          });
        }
      }
    };

    checkConfirmation();

    if (tab === 'signin') {
      const tabsList = document.querySelector('[role="tablist"]');
      const signinTab = tabsList?.querySelector('[value="signin"]');
      if (signinTab instanceof HTMLElement) {
        signinTab.click();
      }
    }
  }, [navigate, toast]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Log successful sign in
      if (data.user) {
        const { error: logError } = await supabase
          .from('user_logs')
          .insert({
            user_id: data.user.id,
            action: 'login',
            metadata: {
              email: data.user.email,
              provider: 'email'
            }
          });

        if (logError) {
          console.error('Error logging login:', logError);
        }

        toast({
          title: "Welcome back!",
          description: "Successfully signed in."
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Error signing in",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?confirmed=true`
        }
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration."
      });
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Error signing up",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 h-screen flex items-center justify-center">
      <Card className="w-[400px] bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Droplets className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Water Footprint Tracker</CardTitle>
          <CardDescription>
            Track and reduce your water consumption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    type="submit"
                    disabled={loading}
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Choose a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    type="submit"
                    disabled={loading}
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;