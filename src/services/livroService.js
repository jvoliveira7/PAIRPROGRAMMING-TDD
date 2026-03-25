const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
  const livro = await Livro.create({ titulo, autor });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

const buscarLivroPorId = async (id) => {
  const livro = await Livro.findByPk(id);
  return livro;
};

const atualizarLivro = async (id, titulo, autor) => {
  const livro = await Livro.findByPk(id);
  
  if (!livro) return null; 

  await livro.update({ titulo, autor }); 
  return livro; 
};

const listarTodosLivros = async () => {
  const livros = await Livro.findAll();
  return livros;
};

const deletarLivro = async (id) => {
  const livro = await Livro.findByPk(id);
  
  if (!livro) return false; 
  
  await livro.destroy(); 
  return true; 
};

module.exports = { criarLivro, buscarLivroPorId, atualizarLivro, listarTodosLivros, deletarLivro };