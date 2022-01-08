INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Person', 85000, 1),
('Sales Manager', 150000, 1),
('Lead Engineer', 151000, 2),
('Software Engineer', 123000, 2),
('Account Manager', 161000, 3),
('Accountant', 121000, 3),
('Legal Team Lead', 252000, 4),
('Lawyer', 192000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Gina', 'Martinez', 2, NULL),
('Steve', 'Lee', 1, 1),
('Jimbo', 'Dumbo', 3, NULL),
('Sarah', 'Kumar', 4, 3),
('Johny', 'Walker', 5, NULL),
('Tom', 'Sawyer', 6, 5),
('Ever', 'Lasting', 7, NULL),
('Tina', 'Pacan', 8, 7);
