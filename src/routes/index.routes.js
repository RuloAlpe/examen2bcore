import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import userMiddleware from '../middleware/user.middleware';

const router = express.Router();

router.post('/', async (req, res) => {
  const pass = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    rol: req.body.rol,
    password: pass,
  };

  try {
    await UserModel.create(newUser);

    return res.status(201).json({
      message: 'User creado',
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/', userMiddleware.onlyValidateAdmin, async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email ? req.body.email : false;
    const password = req.body.password ? req.body.password : false;

    console.log('Buscando usuario por email.');
    const user = await UserModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    console.log('Comparando contraseñas.');
    const comparacion = await bcrypt.compare(password, user.password);

    if (!comparacion) {
      throw new Error('Contraseña incorrecta.');
    }

    const token = jwt.sign({
      email: user.email,
      rol: user.rol,
    }, 'S3cr37Key', {
      // expiresIn: 60400, // 1 semana
      expiresIn: 3600,
    });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
