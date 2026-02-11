-- Drop old tables that may have wrong schema
DROP TABLE IF EXISTS portfolio_about CASCADE;
DROP TABLE IF EXISTS portfolio_skills CASCADE;
DROP TABLE IF EXISTS portfolio_experience CASCADE;
DROP TABLE IF EXISTS portfolio_education CASCADE;
DROP TABLE IF EXISTS portfolio_projects CASCADE;
DROP TABLE IF EXISTS portfolio_achievements CASCADE;
DROP TABLE IF EXISTS portfolio_treks CASCADE;

-- Create fresh tables with correct columns
CREATE TABLE portfolio_about (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolio_skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Technical',
  proficiency INTEGER DEFAULT 80,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE portfolio_experience (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  description TEXT,
  is_current BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE portfolio_education (
  id SERIAL PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE portfolio_projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tech_stack TEXT,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  status TEXT DEFAULT 'completed',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE portfolio_achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date_achieved TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE portfolio_treks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  altitude TEXT,
  duration TEXT,
  difficulty TEXT,
  description TEXT,
  image_url TEXT,
  date_completed TEXT,
  sort_order INTEGER DEFAULT 0
);
