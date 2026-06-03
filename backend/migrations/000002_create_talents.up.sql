-- Create enums for talents
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE pool_status AS ENUM ('pending', 'approved', 'active', 'inactive');

-- Create talents table
CREATE TABLE talents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    birth_date DATE,
    gender gender_type,
    address TEXT,
    avatar_url TEXT,
    cv_url TEXT,
    summary TEXT,
    skills TEXT[] DEFAULT '{}',
    experience_years INT DEFAULT 0,
    pool_status pool_status DEFAULT 'pending',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_talents_user_id ON talents(user_id);
CREATE INDEX idx_talents_pool_status ON talents(pool_status);
CREATE INDEX idx_talents_skills ON talents USING GIN(skills);
CREATE INDEX idx_talents_deleted_at ON talents(deleted_at);
