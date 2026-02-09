-- Drop old content tables if they exist
DROP TABLE IF EXISTS portfolio_about CASCADE;
DROP TABLE IF EXISTS portfolio_skills CASCADE;
DROP TABLE IF EXISTS portfolio_experience CASCADE;
DROP TABLE IF EXISTS portfolio_education CASCADE;
DROP TABLE IF EXISTS portfolio_projects CASCADE;
DROP TABLE IF EXISTS portfolio_achievements CASCADE;
DROP TABLE IF EXISTS portfolio_treks CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Admin users table
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- About section
CREATE TABLE portfolio_about (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills
CREATE TABLE portfolio_skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  proficiency INTEGER DEFAULT 80,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Work Experience
CREATE TABLE portfolio_experience (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT DEFAULT '',
  start_date TEXT NOT NULL,
  end_date TEXT DEFAULT 'Present',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education
CREATE TABLE portfolio_education (
  id SERIAL PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT DEFAULT '',
  start_date TEXT NOT NULL,
  end_date TEXT DEFAULT '',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects & Experiments
CREATE TABLE portfolio_projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'Web App',
  tech_stack TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  highlights TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements
CREATE TABLE portfolio_achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  date_achieved TEXT DEFAULT '',
  icon TEXT DEFAULT 'Award',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trek Portfolio
CREATE TABLE portfolio_treks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  region TEXT DEFAULT '',
  district TEXT DEFAULT '',
  elevation TEXT DEFAULT '',
  difficulty TEXT DEFAULT 'Moderate',
  experience TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert admin user (username: paudelg97, password: Hbvsc2000gg#)
INSERT INTO admin_users (username, password) 
VALUES ('paudelg97', 'Hbvsc2000gg#')
ON CONFLICT (username) DO UPDATE SET password = 'Hbvsc2000gg#';
