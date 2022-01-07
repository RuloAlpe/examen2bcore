import jwt from 'jsonwebtoken';

const middleware = {};

middleware.onlyValidateAdmin = async (req, res, next) => {
  let existingUsuario;
  try {
    // Verificamos el token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'S3cr37Key');

    if (decoded.rol === 'administrador') {
      existingUsuario = decoded;
    } else {
      throw new Error('Not authorized.');
    }
    req.existingUser = existingUsuario;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }
};

middleware.onlyValidateUser = async (req, res, next) => {
  let existingUsuario;
  try {
    // Verificamos el token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'S3cr37Key');

    if (decoded.rol === 'usuario') {
      existingUsuario = decoded;
    } else {
      throw new Error('Not authorized.');
    }
    req.existingUser = existingUsuario;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }
};

export default middleware;
