\c village_app

INSERT INTO users (name, username, password_hash, email, phone_number) VALUES
('John Doe', 'johndoe', 'h@shed_password', 'john@example.com', '111-111-1111'),
('Jane Smith', 'janesmith', 'hash3d_password', 'jane@example.com', '222-222-2222'),
('Paul Doe', 'pauldoe', 'hashed_p@ssword', 'paul@example.com', '333-333-3333'),
('Phil Smith', 'philsmith', 'hashed_password4', 'phil@example.com', '444-444-4444');

INSERT INTO contacts (firstname, lastname, phone_number, user_id) VALUES
('Angel', 'Michael', '555-555-5555', 1),
('Emily', 'Brown', '666-666-6666', 2),
('Joe', 'Jackson', '777-777-7777', 3),
('Mark', 'Smith', '888-888-8888', 4);

INSERT INTO medical (medical_history , blood_type, allergies, medication, user_id) VALUES
('Renal Failure', 'O+', 'none', 'crestor', 1),
('Heart Failure', 'A+', 'peanuts and lactose', 'albuterol', 2),
('Diabetes', 'O-', 'chips','celexa', 3),
('COPD', 'B-', 'kiwis and pineapple', 'abilify', 4);

INSERT INTO villages (village_name, village_code, creator_id) VALUES
('Village A', 'CODE123', 1),
('Village B', 'CODE456', 2),
('Village C', 'CODE789', 3);

INSERT INTO village_users (user_id, village_id, is_admin) VALUES
(1, 1, true),
(2, 1, false),
(3, 2, true);