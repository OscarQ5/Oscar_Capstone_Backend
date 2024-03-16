DROP DATABASE IF EXISTS village_app;

CREATE DATABASE village_app;

\c village_app;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    status VARCHAR(10) DEFAULT 'offline',
    profile_picture_url VARCHAR(255) DEFAULT '/static/default_profile_pic.webp',
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname  VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE medical (
    medical_id SERIAL PRIMARY KEY,
    medical_history VARCHAR(255) NOT NULL,
    blood_type  VARCHAR(255) NOT NULL,
    allergies VARCHAR(225) NOT NULL,
    medication VARCHAR(255),
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE villages (
    village_id SERIAL PRIMARY KEY,
    village_name VARCHAR(255) NOT NULL,
    village_code VARCHAR(20) UNIQUE NOT NULL,
    creator_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

-- CREATE TABLE village_users (
--     village_user_id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     village_id INT NOT NULL,
--     is_admin BOOLEAN DEFAULT FALSE,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (village_id) REFERENCES villages(village_id) ON DELETE CASCADE,
--     UNIQUE (user_id, village_id)
-- );

CREATE TABLE village_users (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    village_id INT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_village FOREIGN KEY (village_id) REFERENCES villages(village_id),
       UNIQUE (user_id, village_id)
);