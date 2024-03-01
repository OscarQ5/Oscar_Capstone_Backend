\c village_app

INSERT INTO users (name, password_hash, email, phone_number) VALUES
('John Doe', 'h@shed_password', 'john@example.com', '123-456-7890'),
('Jane Smith', 'hash3d_password', 'jane@example.com', '987-654-3210');

INSERT INTO contacts (firstname, lastname, phone_number) VALUES
('Angel', 'Michael', '862-456-7890'),
('Emily', 'Brown', '987-654-3210'),
('Joe', 'Jackson', '973-654-3310');


INSERT INTO medical (medical_history , blood_type, allergies, medication) VALUES
('Renal Failure', 'O+', 'none', 'crestor'),
('Heart Failure', 'A+', 'peanuts and lactose', 'albuterol'),
('Diabetes', 'O-', 'chips','celexa'),
('COPD', 'B-', 'kiwis and pineapple', 'abilify');


