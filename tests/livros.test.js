require('dotenv').config();

const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models'); // Trazendo o banco

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

test('GET /livros deve retornar uma lista de todos os livros e o status 200', async () => {
    
    await request(app).post('/livros').send({ titulo: 'O Guia do Mochileiro das Galáxias', autor: 'Douglas Adams'});

    const res = await request(app).get('/livros');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
});

test('DELETE /livros/:id deve deletar um livro e retornar 200', async () => {
    
    const criacao = await request(app).post('/livros').send({ titulo: 'O Código Da Vinci', autor: 'Dan Brown'});
    const idDoLivro = criacao.body.id;

    const resDelete = await request(app).delete(`/livros/${idDoLivro}`);
    
  
    expect(resDelete.status).toBe(200);

   
    const resGet = await request(app).get(`/livros/${idDoLivro}`);
    expect(resGet.status).toBe(404);
});