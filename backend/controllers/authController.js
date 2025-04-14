import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    
    // 1) Provjeri postoji li korisnik
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with this email already exists'
      });
    }

    // 2) Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3) Kreiraj korisnika
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    // 4) Generiraj token
    const token = signToken(newUser);

    // 5) Pošalji odgovor
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser,
          first_name,
          last_name,
          email
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Provjeri email i password
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    // 2) Provjeri postoji li korisnik i da li je password ispravan
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // 3) Ako je sve OK, pošalji token klijentu
    const token = signToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};