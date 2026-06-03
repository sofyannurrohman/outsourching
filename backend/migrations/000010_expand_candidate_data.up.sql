-- Create enums if they don't exist
DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'banned');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE work_type AS ENUM ('remote', 'onsite', 'hybrid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE availability_type AS ENUM ('available', 'notice period', 'working');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status user_status DEFAULT 'active';

-- Update talents table
ALTER TABLE talents ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE talents ADD COLUMN IF NOT EXISTS province VARCHAR(100);
ALTER TABLE talents ADD COLUMN IF NOT EXISTS current_job_title VARCHAR(255);
ALTER TABLE talents ADD COLUMN IF NOT EXISTS expected_salary BIGINT;
ALTER TABLE talents ADD COLUMN IF NOT EXISTS preferred_work_type work_type;
ALTER TABLE talents ADD COLUMN IF NOT EXISTS availability_status availability_type;
ALTER TABLE talents ADD COLUMN IF NOT EXISTS available_start_date DATE;
ALTER TABLE talents ADD COLUMN IF NOT EXISTS portfolio_url TEXT;
ALTER TABLE talents ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE talents ADD COLUMN IF NOT EXISTS internal_score INT DEFAULT 0;

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create talent_skills table
CREATE TABLE IF NOT EXISTS talent_skills (
    talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    level VARCHAR(20), -- beginner, intermediate, expert
    years_experience INT DEFAULT 0,
    PRIMARY KEY (talent_id, skill_id)
);

-- Create talent_experiences table
CREATE TABLE IF NOT EXISTS talent_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create talent_educations table
CREATE TABLE IF NOT EXISTS talent_educations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    major VARCHAR(255),
    degree VARCHAR(100),
    start_year INT,
    end_year INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS screening_questions JSONB DEFAULT '{}';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS test_score INT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS interview_notes TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS hr_rating INT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS final_decision TEXT;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_talent_skills_talent_id ON talent_skills(talent_id);
CREATE INDEX IF NOT EXISTS idx_talent_experiences_talent_id ON talent_experiences(talent_id);
CREATE INDEX IF NOT EXISTS idx_talent_educations_talent_id ON talent_educations(talent_id);
