-- Create posts table for blog and travel stories
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('blog', 'travel')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author TEXT DEFAULT 'Om Prakash Paudel Gaurav',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  category TEXT,
  location TEXT,
  altitude TEXT,
  duration TEXT,
  difficulty TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image TEXT,
  is_pinned BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Create index on type and is_published for filtering
CREATE INDEX IF NOT EXISTS idx_posts_type_published ON posts(type, is_published);

-- Create index on is_pinned for homepage
CREATE INDEX IF NOT EXISTS idx_posts_pinned ON posts(is_pinned, is_published);
