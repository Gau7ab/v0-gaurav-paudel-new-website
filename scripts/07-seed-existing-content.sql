-- Seed About
INSERT INTO portfolio_about (title, subtitle, description, image_url) VALUES
('Om Prakash Paudel', 'MBA Scholar & Himalayan Trekker Exploring Nepal''s Mountains', 'I''m Om Prakash Paudel, a student with a strong academic background in management and a deep personal passion for the mountains. While pursuing my MBA education, trekking has become the space where I test my mindset, discipline, and leadership across Nepal''s Himalayan region.', '/images/abc4.jpeg')
ON CONFLICT DO NOTHING;

-- Seed Skills
INSERT INTO portfolio_skills (name, category, proficiency, sort_order) VALUES
('Navigation & Route Planning', 'Trekking & Adventure', 90, 1),
('High Altitude Trekking', 'Trekking & Adventure', 95, 2),
('Wilderness Survival', 'Trekking & Adventure', 85, 3),
('Photography', 'Trekking & Adventure', 80, 4),
('Team Leadership', 'Leadership & Teamwork', 90, 5),
('Decision Making', 'Leadership & Teamwork', 88, 6),
('Group Coordination', 'Leadership & Teamwork', 85, 7),
('Crisis Management', 'Leadership & Teamwork', 82, 8),
('Business Administration', 'Management & Academic', 90, 9),
('Organizational Behavior', 'Management & Academic', 85, 10),
('Strategic Planning', 'Management & Academic', 88, 11),
('Project Management', 'Management & Academic', 86, 12),
('Digital Literacy', 'Digital & Personal Growth', 80, 13),
('Social Media', 'Digital & Personal Growth', 78, 14),
('Adaptability', 'Digital & Personal Growth', 92, 15),
('Cultural Awareness', 'Digital & Personal Growth', 90, 16)
ON CONFLICT DO NOTHING;

-- Seed Experience
INSERT INTO portfolio_experience (title, company, start_date, end_date, is_current, location, description, sort_order) VALUES
('CEO', 'Aakar Academy', 'Nov 2025', NULL, true, 'Chitwan, Nepal', 'Leading Aakar Academy as Chief Executive Officer, driving strategic vision and operational excellence. Overseeing curriculum development, institutional growth, student success initiatives, and team management to establish the academy as a leading educational institution in Nepal.', 1),
('Head of SARAL', 'Bitflux Technologies Pvt. Ltd.', 'Oct 2024', 'Sep 2025', false, 'Chitwan, Nepal', 'Led the development and implementation of SARAL, an innovative restaurant management system. Oversaw product strategy, client onboarding, and continuous improvement of the platform to streamline restaurant operations across Nepal.', 2),
('Business Development Officer', 'Bitflux Technologies Pvt. Ltd.', 'Aug 2024', 'Sep 2025', false, 'Chitwan, Nepal', 'Spearheaded business development initiatives to expand the company''s market presence. Developed strategic partnerships, identified growth opportunities, and implemented effective marketing strategies to increase brand awareness and customer acquisition.', 3),
('Banking Intern', 'Muktinath Bikas Bank Limited', 'May 2024', 'Jul 2024', false, 'Nepal', 'Gained comprehensive exposure to banking operations including customer service, account management, and financial analysis. Assisted in processing transactions, preparing financial reports, and implementing customer relationship management strategies.', 4)
ON CONFLICT DO NOTHING;

-- Seed Education
INSERT INTO portfolio_education (degree, institution, start_date, end_date, location, sort_order) VALUES
('Master in Business Administration (MBA)', 'Boston International College', '2024', 'Present', 'Bharatpur-10, Nepal', 1),
('Bachelor in Business Administration (BBA)', 'Saptagandaki Multiple Campus', '2019', '2024', 'Bharatpur-10, Chitwan', 2),
('Secondary Level (+2) in Management', 'Eden Garden English Secondary School', '2016', '2019', 'Bharatpur-10, Chitwan', 3),
('SLC', 'Madi Secondary School', 'SLC', '', 'Madi-03, Chitwan', 4)
ON CONFLICT DO NOTHING;

-- Seed Achievements
INSERT INTO portfolio_achievements (title, description, icon, sort_order) VALUES
('7 Major Treks Completed', 'Successfully completed treks to iconic destinations across Nepal''s Himalayan region.', 'Mountain', 1),
('Academic Excellence', 'Maintaining strong academic performance while pursuing passion for adventure and exploration.', 'Award', 2),
('Youth Leadership', 'Recognized for leadership in organizing community events and youth programs.', 'Star', 3),
('Cultural Ambassador', 'Promoting Nepali culture and natural heritage through trekking experiences and storytelling.', 'Sparkles', 4)
ON CONFLICT DO NOTHING;

-- Seed Projects
INSERT INTO portfolio_projects (title, description, category, tech_stack, image_url, live_url, github_url, status, sort_order) VALUES
('Glabs - Strategic Intelligence Platform', 'A professional consulting platform delivering strategic intelligence tools and career intelligence tests. Built with modern design principles and consulting-grade business frameworks.', 'Assessment Website', 'Next.js, React, Tailwind CSS, TypeScript, Teal Branding', '/images/screenshot-202026-01-08-20120110.png', 'https://omprakashpaudelgaurav.com.np', '#', 'Live', 1),
('Aakar Academy Website', 'A comprehensive educational platform featuring course catalogs, student enrollment, progress tracking, and instructor dashboards. Dark-themed with vibrant green accents and modern pedagogical design.', 'Institutes Website', 'Next.js, React, Tailwind CSS, TypeScript, PostgreSQL', '/images/screenshot-202026-01-08-20120115.png', 'https://v0-aakar-academy-website-ashen.vercel.app/', '#', 'Live', 2),
('Personal Portfolio Website', 'An interactive portfolio showcasing trekking expeditions, academic achievements, and professional experience. Features dynamic project management with admin dashboard.', 'Personal Portfolio', 'Next.js 16, React 19, Tailwind CSS v4, Neon DB, TypeScript', '/images/personal-portfolio-hero.jpeg', 'https://omgaurav.com.np', '#', 'Live', 3)
ON CONFLICT DO NOTHING;

-- Seed Treks
INSERT INTO portfolio_treks (name, description, altitude, image_url, location, difficulty, sort_order) VALUES
('Annapurna Base Camp', 'Gateway to the Annapurna Sanctuary. Annapurna Base Camp Trek is one of the most popular trekking routes in Nepal, leading to the base of Annapurna I (8,091 m). The trail passes through traditional Gurung villages, dense rhododendron forests, glaciers, and high-altitude landscapes.', '4,130m', '/images/abc4.jpeg', 'Nepal Himalayas', 'Moderate', 1),
('Annapurna North Basecamp', 'Remote and less-explored route to the north face of Annapurna I. Accessed via Narchyang in Myagdi district, the trek includes alpine terrain, glacier views, and the sacred Panchakunda Lake.', '4,190m', '/images/annapurna-20north-20basecamp.jpg', 'Nepal Himalayas', 'Difficult', 2),
('Mardi Himal', 'Scenic alternative to ABC with dramatic views. The route follows narrow ridgelines with dramatic views of Machhapuchhre (Fishtail), Annapurna South, and Hiunchuli.', '4,500m', '/images/mardi-himal2.jpeg', 'Nepal Himalayas', 'Moderate', 3),
('Gosainkunda', 'Sacred lake at high altitude. The sacred alpine lake holds religious significance for Hindus and Buddhists and offers rugged trails, rocky landscapes, and seasonal snow conditions.', '4,380m', '/images/gosainkunda.jpeg', 'Nepal Himalayas', 'Moderate', 4),
('Poon Hill', 'Classic sunrise viewpoint. A short and beginner-friendly trek famous for its sunrise views over the Annapurna and Dhaulagiri mountain ranges.', '3,210m', '/images/poon-hill.jpeg', 'Nepal Himalayas', 'Easy', 5),
('Tilicho Lake', 'One of the highest lakes in the world. The route features rugged high-altitude terrain, landslide-prone sections, and dramatic Himalayan scenery.', '4,919m', '/images/tilicho.jpeg', 'Nepal Himalayas', 'Difficult', 6),
('Khumai Danda', 'Panoramic viewpoint in Kaski. Known for sunrise and sunset views of Machhapuchhre, Annapurna South, and Lamjung Himal.', '3,245m', '/images/khumai-danda.jpeg', 'Nepal Himalayas', 'Easy', 7)
ON CONFLICT DO NOTHING;
