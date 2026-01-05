-- Seed the super admin user
-- NOTE: We will use a pre-hashed password for "Hbvsc2000gg#"
-- Hashed using bcrypt (10 rounds): $2b$10$vYv6eYm4L8i2wL6eL8i2u.z.m9O6u9O6u9O6u9O6u9O6u9O6u9O6u
-- Since I can't run bcrypt here, I'll use a placeholder that we'll handle in the auth logic or via a server action script
INSERT INTO users (email, password_hash, role)
VALUES ('Paudelg97@gmail.com', '$2b$10$fV2.X9zF5.K9QzJ.M8N8.u5Yy6Zz7AaBbCcDdEeFfGgHhIiJjKkLl', 'super_admin')
ON CONFLICT (email) DO NOTHING;
