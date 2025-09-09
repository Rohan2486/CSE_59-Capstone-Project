-- Drop and recreate the foreign key constraint to use VARCHAR instead of UUID for item_id
ALTER TABLE public.footprints DROP CONSTRAINT IF EXISTS footprints_item_id_fkey;

-- Temporarily disable RLS to perform the update
ALTER TABLE public.footprints DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.items DISABLE ROW LEVEL SECURITY;

-- Clear existing data
DELETE FROM public.footprints;
DELETE FROM public.items;

-- Insert items with string IDs (items.id is VARCHAR)
INSERT INTO public.items (id, name, category, default_unit) VALUES
  ('beef-1kg', 'Beef', 'food', '1 kg'),
  ('chicken-1kg', 'Chicken', 'food', '1 kg'),
  ('rice-1kg', 'Rice', 'food', '1 kg'),
  ('wheat-1kg', 'Wheat', 'food', '1 kg'),
  ('coffee-1cup', 'Coffee', 'food', '1 cup (125ml)'),
  ('milk-1glass', 'Milk', 'food', '1 glass (200ml)'),
  ('cotton-tshirt', 'Cotton T-shirt', 'clothing', '1 piece'),
  ('jeans', 'Jeans', 'clothing', '1 pair'),
  ('leather-shoes', 'Leather Shoes', 'clothing', '1 pair'),
  ('smartphone', 'Smartphone', 'technology', '1 device'),
  ('laptop', 'Laptop', 'technology', '1 device'),
  ('paper-a4', 'Paper', 'household', '1 sheet'),
  ('plastic-bottle', 'Plastic Bottle', 'household', '1 bottle');

-- Change footprints item_id column to VARCHAR to match items.id
ALTER TABLE public.footprints ALTER COLUMN item_id TYPE VARCHAR USING item_id::VARCHAR;

-- Insert footprint data
INSERT INTO public.footprints (item_id, unit, direct_water_l_per_unit, virtual_water_l_per_unit) VALUES
  ('beef-1kg', '1 kg', 550, 14865),
  ('chicken-1kg', '1 kg', 222, 4063),
  ('rice-1kg', '1 kg', 1555, 1324),
  ('wheat-1kg', '1 kg', 199, 1182),
  ('coffee-1cup', '1 cup', 4.2, 136.5),
  ('milk-1glass', '1 glass', 20, 235),
  ('cotton-tshirt', '1 piece', 101, 2495),
  ('jeans', '1 pair', 1800, 5900),
  ('leather-shoes', '1 pair', 2257, 14992),
  ('smartphone', '1 device', 910, 0),
  ('laptop', '1 device', 2720, 0),
  ('paper-a4', '1 sheet', 2, 8),
  ('plastic-bottle', '1 bottle', 22, 0);

-- Re-enable RLS
ALTER TABLE public.footprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;