CREATE TABLE
    users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(254) NOT NULL UNIQUE,
        role ENUM (
            "admin",
            "president",
            "loan_officer",
            "accountant",
            "member"
        ) DEFAULT "member",
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );