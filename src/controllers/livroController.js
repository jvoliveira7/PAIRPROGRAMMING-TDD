const { criarLivro, buscarLivroPorId, atualizarLivro } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios'})

    const livro = await criarLivro(titulo, autor);
    res.status(201).json(livro);
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    const livro = await buscarLivroPorId(id);

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.status(200).json(livro);
};


const atualizar = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor } = req.body;

    
    if (!titulo || !autor) {
        return res.status(400).json({ erro: 'titulo e autor são obrigatórios para atualizar' });
    }

    const livroAtualizado = await atualizarLivro(id, titulo, autor);

    if (!livroAtualizado) {
        return res.status(404).json({ erro: 'Livro não encontrado para atualizar' });
    }

    res.status(200).json(livroAtualizado);
};

module.exports = { criar, buscarPorId, atualizar };