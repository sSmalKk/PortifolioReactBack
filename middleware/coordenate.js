/**
 *coordenate.js
 */

module.exports = async (req, res, next) => {
  // start writing your code from here do not remove above code
  const coordenadaMiddleware = (req, res, next) => {
    const {
      x, y 
    } = req.body;

    // Verificar se x e y estão entre >= 0 e <= 1999
    if (x < 0 || x > 1999 || y < 0 || y > 1999) {
      return res.status(400).json({ error: 'Erro de coordenada: x e y devem estar entre 0 e 1999.' });
    }

    // Adicionar 1 a variável x
    const newX = x + 1;

    // Escrever os valores de x e y um na frente do outro
    const l = parseInt(`${newX}${y}`);

    // Salvar o número em l
    req.body.l = l;

    next();
  };

  module.exports = coordenadaMiddleware;

  return next();
};
