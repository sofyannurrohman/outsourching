-- Seed default admin user
-- Password: admin123 (bcrypt hash with cost 12)
INSERT INTO users (id, email, password_hash, role, is_active, email_verified)
VALUES (
    uuid_generate_v4(),
    'admin@aws.com',
    '$2a$12$LJ3a4FdW9y9nZfZz5YfUXOGpXKmP3K0p5Fq2qB8hR9vJcWzXKmYbS',
    'admin',
    true,
    true
) ON CONFLICT (email) DO NOTHING;
