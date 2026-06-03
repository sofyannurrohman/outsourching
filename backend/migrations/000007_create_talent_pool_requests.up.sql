-- Create enum for talent pool request status
CREATE TYPE pool_request_status AS ENUM ('open', 'matched', 'closed');

-- Create talent_pool_requests table
CREATE TABLE talent_pool_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id),
    skills_needed TEXT[] DEFAULT '{}',
    headcount INT NOT NULL DEFAULT 1,
    description TEXT,
    status pool_request_status DEFAULT 'open',
    matched_talents UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_pool_requests_company_id ON talent_pool_requests(company_id);
CREATE INDEX idx_pool_requests_status ON talent_pool_requests(status);
CREATE INDEX idx_pool_requests_deleted_at ON talent_pool_requests(deleted_at);
