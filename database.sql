CREATE DATABASE IF NOT EXISTS bella_notte;
USE bella_notte;

-- Users table for Admin Login
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    table_number VARCHAR(20),
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    price_at_time DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed Data
INSERT INTO users (username, password) VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); -- password is 'password'

INSERT INTO products (name, category, description, price) VALUES 
('Risotto alla Milanese', 'Main', 'Creamy saffron risotto with parmesan.', 24.00),
('Tagliatelle al Tartufo', 'Main', 'Fresh pasta with truffle cream sauce.', 28.00),
('Bruschetta', 'Starter', 'Grilled bread with tomatoes, garlic, and basil.', 12.00),
('Caprese Salad', 'Starter', 'Tomatoes, mozzarella, basil, olive oil.', 14.00),
('Tiramisu', 'Dessert', 'Classic Italian dessert with espresso and mascarpone.', 10.00),
('Panna Cotta', 'Dessert', 'Silky vanilla cream with berry coulis.', 9.00);
