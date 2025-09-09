-- Create water footprint data in the items and footprints tables
INSERT INTO public.items (id, name, category, default_unit) VALUES
  ('beef-1kg', 'Beef', 'food', '1 kg'),
  ('chicken-1kg', 'Chicken', 'food', '1 kg'),
  ('rice-1kg', 'Rice', 'food', '1 kg'),
  ('wheat-1kg', 'Wheat', 'food', '1 kg'),
  ('coffee-1cup', 'Coffee', 'food', '1 cup (125ml)'),
  ('milk-1glass', 'Milk', 'food', '1 glass (200ml)'),
  ('cotton-tshirt', 'Cotton T-shirt', 'clothing', '1 piece (250g)'),
  ('jeans', 'Jeans', 'clothing', '1 pair (600g)'),
  ('leather-shoes', 'Leather Shoes', 'clothing', '1 pair'),
  ('smartphone', 'Smartphone', 'technology', '1 device'),
  ('laptop', 'Laptop', 'technology', '1 device'),
  ('paper-a4', 'Paper', 'household', '1 A4 sheet'),
  ('plastic-bottle', 'Plastic Bottle', 'household', '1 bottle (0.5L)')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  default_unit = EXCLUDED.default_unit;

INSERT INTO public.footprints (item_id, unit, direct_water_l_per_unit, virtual_water_l_per_unit) VALUES
  ('beef-1kg', '1 kg', 550, 14865),
  ('chicken-1kg', '1 kg', 222, 4063),
  ('rice-1kg', '1 kg', 1555, 1324),
  ('wheat-1kg', '1 kg', 199, 1182),
  ('coffee-1cup', '1 cup (125ml)', 4.2, 136.5),
  ('milk-1glass', '1 glass (200ml)', 20, 235),
  ('cotton-tshirt', '1 piece (250g)', 101, 2495),
  ('jeans', '1 pair (600g)', 1800, 5900),
  ('leather-shoes', '1 pair', 2257, 14992),
  ('smartphone', '1 device', 910, 0),
  ('laptop', '1 device', 2720, 0),
  ('paper-a4', '1 A4 sheet', 2, 8),
  ('plastic-bottle', '1 bottle (0.5L)', 22, 0)
ON CONFLICT (item_id, unit) DO UPDATE SET
  direct_water_l_per_unit = EXCLUDED.direct_water_l_per_unit,
  virtual_water_l_per_unit = EXCLUDED.virtual_water_l_per_unit;