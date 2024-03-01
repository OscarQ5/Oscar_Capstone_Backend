\c village_app

INSERT INTO users (name, password_hash, email, phone_number) VALUES
('John Doe', 'h@shed_password', 'john@example.com', '123-456-7890'),
('Jane Smith', 'hash3d_password', 'jane@example.com', '987-654-3210');

INSERT INTO contacts (firstname, lastname, phone_number, user_id) VALUES
('Angel', 'Michael', '862-456-7890', 1),
('Emily', 'Brown', '987-654-3210', 2),
('Joe', 'Jackson', '973-654-3310', 2);

INSERT INTO medical (medical_history , blood_type, allergies, medication, user_id) VALUES
('Renal Failure', 'O+', 'none', 'crestor', 1),
('Heart Failure', 'A+', 'peanuts and lactose', 'albuterol', 1),
('Diabetes', 'O-', 'chips','celexa', 2),
('COPD', 'B-', 'kiwis and pineapple', 'abilify', 2);