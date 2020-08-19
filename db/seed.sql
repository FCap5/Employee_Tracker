use employees_db;
INSERT INTO departments (name) VALUES ("Executive", "Programming", "Sales", "Admin");

INSERT INTO roles (title, salary, department_id) VALUES ("CEO", 200000, 1), ("Programming Lead", 170000, 2), ("Sales Lead", 175000, 3), ("Assistant to CEO", 100000, 4), ("Front End Developer", 120000, 2), ("Back End Developer", 130000, 2), ("Salesperson", 115000, 3);

-- CEO (no manager id)
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Ffej", "Caplan", 1);
-- All other employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Haiden", "Maldanado", 2, 1), ("Jakob", "Travis", 3, 1), ("Reiss", "Leach", 4, 1), ("Rhodri", "Gallagher", 5, 2), ("Conan", "Blankenship", 6, 2), ("Corrie", "Turnbull", 7, 3);