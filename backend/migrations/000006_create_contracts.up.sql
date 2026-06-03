-- Create enum for contract status
CREATE TYPE contract_status AS ENUM ('draft', 'active', 'completed', 'terminated');

-- Create contracts table
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id),
    talent_id UUID NOT NULL REFERENCES talents(id),
    job_id UUID REFERENCES jobs(id),
    contract_number VARCHAR(50) UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    monthly_rate BIGINT NOT NULL,
    platform_fee_pct DECIMAL(5,2) DEFAULT 10.00,
    status contract_status DEFAULT 'draft',
    signed_at TIMESTAMPTZ,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_contracts_company_id ON contracts(company_id);
CREATE INDEX idx_contracts_talent_id ON contracts(talent_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_deleted_at ON contracts(deleted_at);
