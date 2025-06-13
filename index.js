require('dotenv').config();
const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log('✅ Conectado a la base de datos');

  const createTable = `
    CREATE TABLE IF NOT EXISTS mangas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255),
      autor VARCHAR(255),
      genero VARCHAR(100),
      capitulos INT,
      fecha_publicacion DATE
    );
  `;
  await connection.execute(createTable);

  for (let i = 0; i < 3500; i++) {
    const titulo = faker.lorem.words(3);
    const autor = faker.person.fullName();
    const genero = faker.helpers.arrayElement(['Acción', 'Aventura', 'Romance', 'Terror', 'Comedia']);
    const capitulos = faker.number.int({ min: 1, max: 500 });
    const fecha_publicacion = faker.date.past().toISOString().split('T')[0];

    await connection.execute(
      'INSERT INTO mangas (titulo, autor, genero, capitulos, fecha_publicacion) VALUES (?, ?, ?, ?, ?)',
      [titulo, autor, genero, capitulos, fecha_publicacion]
    );

    if (i % 500 === 0) console.log(`${i} mangas insertados...`);
  }

  console.log('✅ 3500 mangas insertados correctamente');
  await connection.end();
}

main().catch(console.error);