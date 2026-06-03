-- Create enums for jobs
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'outsource');
CREATE TYPE job_status AS ENUM ('draft', 'open', 'closed', 'filled');

-- Create jobs table
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(255),
    job_type job_type NOT NULL,
    salary_min BIGINT,
    salary_max BIGINT,
    skills_required TEXT[] DEFAULT '{}',
    status job_status DEFAULT 'draft',
    deadline DATE,
    slots INT DEFAULT 1,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_skills ON jobs USING GIN(skills_required);
CREATE INDEX idx_jobs_deleted_at ON jobs(deleted_at);
