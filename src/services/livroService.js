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
  
  if (!livro) return null; //se não achar o livro, retorna nulo

  await livro.update({ titulo, autor }); // atualiza no banco
  return livro; //retorna o livro atualizado
};

module.exports = { criarLivro, buscarLivroPorId, atualizarLivro };