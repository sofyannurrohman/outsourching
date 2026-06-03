-- Drop tables
DROP TABLE IF EXISTS talent_educations;
DROP TABLE IF EXISTS talent_experiences;
DROP TABLE IF EXISTS talent_skills;
DROP TABLE IF EXISTS skills;

-- Remove columns from applications
ALTER TABLE applications DROP COLUMN IF EXISTS screening_questions;
ALTER TABLE applications DROP COLUMN IF EXISTS test_score;
ALTER TABLE applications DROP COLUMN IF EXISTS interview_notes;
ALTER TABLE applications DROP COLUMN IF EXISTS hr_rating;
ALTER TABLE applications DROP COLUMN IF EXISTS final_decision;

-- Remove columns from talents
ALTER TABLE talents DROP COLUMN IF EXISTS city;
ALTER TABLE talents DROP COLUMN IF EXISTS province;
ALTER TABLE talents DROP COLUMN IF EXISTS current_job_title;
ALTER TABLE talents DROP COLUMN IF EXISTS expected_salary;
ALTER TABLE talents DROP COLUMN IF EXISTS preferred_work_type;
ALTER TABLE talents DROP COLUMN IF EXISTS availability_status;
ALTER TABLE talents DROP COLUMN IF EXISTS available_start_date;
ALTER TABLE talents DROP COLUMN IF EXISTS portfolio_url;
ALTER TABLE talents DROP COLUMN IF EXISTS linkedin_url;
ALTER TABLE talents DROP COLUMN IF EXISTS internal_score;

-- Remove columns from users
ALTER TABLE users DROP COLUMN IF EXISTS last_login;
ALTER TABLE users DROP COLUMN IF EXISTS status;

-- Drop enums
DROP TYPE IF EXISTS availability_type;
DROP TYPE IF EXISTS work_type;
DROP TYPE IF EXISTS user_status;
