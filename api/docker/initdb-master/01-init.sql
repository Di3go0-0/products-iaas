-- 01-init.sql
-- Este script crea las tres bases de datos lógicas y los roles correspondientes,
-- usando las credenciales definidas en tu .env.

-- 1. Creación de bases de datos
CREATE DATABASE product_descriptions_db;
CREATE DATABASE product_sales_db;
CREATE DATABASE links_db;

CREATE ROLE products_descriptions
  WITH LOGIN
  PASSWORD 'supersecret';

CREATE ROLE products_sales
  WITH LOGIN
  PASSWORD 'anothersecret';

CREATE ROLE products_links
  WITH LOGIN
  PASSWORD 'yetanothersecret';

GRANT ALL PRIVILEGES ON DATABASE product_descriptions_db TO products_descriptions;
GRANT ALL PRIVILEGES ON DATABASE product_sales_db       TO products_sales;
GRANT ALL PRIVILEGES ON DATABASE links_db               TO products_links;
