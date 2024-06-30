DROP DATABASE IF EXISTS village_app;

CREATE DATABASE village_app;

\c village_app;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
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

CREATE INDEX id_contacts_user_id ON contacts(user_id);

CREATE TABLE medical (
    medical_id SERIAL PRIMARY KEY,
    medical_history VARCHAR(255) NOT NULL,
    blood_type  VARCHAR(255) NOT NULL,
    allergies VARCHAR(225) NOT NULL,
    medication VARCHAR(255),
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX id_medical_user_id ON medical(user_id);

CREATE TABLE villages (
    village_id SERIAL PRIMARY KEY,
    village_name VARCHAR(255) NOT NULL,
    village_code VARCHAR(20) UNIQUE NOT NULL,
    creator_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX id_villages_creator_id ON villages(creator_id);

CREATE TABLE village_users (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    village_id INT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (user_id, village_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (village_id) REFERENCES villages(village_id)
);

CREATE INDEX id_village_users_user_id ON village_users(user_id);
CREATE INDEX id_village_users_village_id ON village_users(village_id);

CREATE TABLE village_join_requests (
    request_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    village_id INT NOT NULL,
    request_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_accepted BOOLEAN DEFAULT FALSE,
    admin_id INT, 
    reviewed_date TIMESTAMPTZ, 
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (village_id) REFERENCES villages(village_id),
    FOREIGN KEY (admin_id) REFERENCES users(user_id)
);

CREATE INDEX idx_village_join_requests_user_id ON village_join_requests(user_id);
CREATE INDEX idx_village_join_requests_village_id ON village_join_requests(village_id);
CREATE INDEX idx_village_join_requests_admin_id ON village_join_requests(admin_id);