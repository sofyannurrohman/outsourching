-- No easy way to revert to the specific "incorrect" hash, so we'll just leave it or set to empty
-- Often down migrations for data fixes are just placeholders
UPDATE users 
SET password_hash = '$2a$12$LJ3a4FdW9y9nZfZz5YfUXOGpXKmP3K0p5Fq2qB8hR9vJcWzXKmYbS' 
WHERE email = 'admin@aws.com';
