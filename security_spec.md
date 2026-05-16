# Security Specification for Winf Capital Management

## Data Invariants
1. A user profile (`users/{userId}`) can only be created by the user themselves upon sign-up, or by an admin.
2. A user's role cannot be modified by the user themselves to escalate privileges (e.g., a user cannot make themselves an `admin`).
3. An investment (`investments/{investmentId}`) must be linked to a valid `userId`. It can only be created by an `admin`.
4. Only an `admin` can modify the `status` or amount of an investment.
5. Dividends (`dividends/{dividendId}`) must be linked to a valid `investmentId` and `userId`. They can only be created/updated by an `admin`.
6. An `investor` can only read their own profile, their own investments, and their own dividends.
7. An `admin` can read and write all collections.

## The "Dirty Dozen" Payloads

1.  **Identity Spoofing (Create User Profile):** A user tries to create a profile for another `uid`.
2.  **Privilege Escalation (Self-Admin):** A user tries to update their profile to set `role: "admin"`.
3.  **Ghost Field (Update User):** A user tries to add an unapproved field (e.g., `verifiedBalance: 1000000`).
4.  **Resource Poisoning (Invalid ID):** Attempting to create an investment with an ID that is 1MB of text.
5.  **Type Mismatch (Update Profile):** A user tries to set their `email` to an array or boolean instead of a string.
6.  **Orphaned Record (Create Investment):** Creating an investment for a `userId` that does not exist.
7.  **Unauthorized Access (Read User):** A user tries to read another user's profile.
8.  **Unauthorized Access (Read Investment):** A user tries to read another user's investment.
9.  **Unauthorized Write (Create Investment):** A normal user tries to create an investment record.
10. **State Shortcutting (Update Investment):** A normal user tries to change their investment `status` to 'Processado' or 'Approved'.
11. **Unauthorized Write (Delete Investment):** A normal user tries to delete an investment record.
12. **PII Leak (List Users):** A normal user tries to list all users to scrape emails.
