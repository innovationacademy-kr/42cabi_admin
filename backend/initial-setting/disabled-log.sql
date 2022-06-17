CREATE TABLE IF NOT EXISTS `disabled`  (
	`disabled_id` INT AUTO_INCREMENT PRIMARY KEY,
	`cabinet_id` INT NOT NULL,
    `disabled_time` TIMESTAMP DEFAULT current_timestamp,
    `fixed_time` TIMESTAMP,
    `note` TEXT
) ENGINE=innoDB DEFAULT CHARSET=utf8mb4;
