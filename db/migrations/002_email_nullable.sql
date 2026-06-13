-- 002_email_nullable.sql: Allow members to exist without email addresses
-- The content/*.json files do not include member emails; emails will be
-- populated later when users authenticate via Clerk.

ALTER TABLE members ALTER COLUMN email DROP NOT NULL;
