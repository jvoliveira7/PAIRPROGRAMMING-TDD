const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models'); // Trazendo o banco

require('dotenv').config();

beforeAll(async () => {
    await sequelize.sync({ force: true }); 
});

afterAll(async () => {
    await sequelize.close();
});

test('POST /livros cria um livro', async () => {
    const res = await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code'});
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe('Clean Code');
});


test('GET /livros/:id retorna 200 e o livro buscado', async () => {

    const criacao = await request(app).post('/livros').send({ titulo: 'O Hobbit', autor: 'Tolkien'});
    const idDoLivro = criacao.body.id;

  
    const res = await request(app).get(`/livros/${idDoLivro}`);

    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe('O Hobbit');
});

test('PUT /livros/:id deve atualizar um livro e retornar 200', async () => {
    // Livro para atualizar
    const criacao = await request(app).post('/livros').send({ titulo: 'Senhor dos Anéis', autor: 'J.R.R. Tolkien'});
    const idDoLivro = criacao.body.id;

    // Put para trocar titulo
    const res = await request(app)
        .put(`/livros/${idDoLivro}`)
        .send({ titulo: 'O Retorno do Rei', autor: 'J.R.R. Tolkien' });
    
    // resultado
    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe('O Retorno do Rei');
});