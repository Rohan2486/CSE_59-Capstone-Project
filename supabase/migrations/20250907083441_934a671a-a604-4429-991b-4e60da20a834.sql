-- Create trigger for user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update profiles table with water footprint preferences
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS daily_water_goal numeric DEFAULT 2000,
ADD COLUMN IF NOT EXISTS sustainability_level text DEFAULT 'beginner';

-- Create user_calculations table to track calculations
CREATE TABLE IF NOT EXISTS public.user_calculations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  calculation_data jsonb NOT NULL,
  total_water_footprint numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on user_calculations
ALTER TABLE public.user_calculations ENABLE ROW LEVEL SECURITY;

-- Create policies for user_calculations
CREATE POLICY "Users can view their own calculations" 
ON public.user_calculations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own calculations" 
ON public.user_calculations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calculations" 
ON public.user_calculations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculations" 
ON public.user_calculations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for user_calculations timestamps
CREATE TRIGGER update_user_calculations_updated_at
BEFORE UPDATE ON public.user_calculations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();