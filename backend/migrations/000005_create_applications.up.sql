-- Create enum for application status
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired');

-- Create applications table
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
    cover_letter TEXT,
    status application_status DEFAULT 'pending',
    admin_note TEXT,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Unique constraint: one application per talent per job
CREATE UNIQUE INDEX idx_applications_unique ON applications(job_id, talent_id) WHERE deleted_at IS NULL;

-- Indexes
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_talent_id ON applications(talent_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_deleted_at ON applications(deleted_at);
