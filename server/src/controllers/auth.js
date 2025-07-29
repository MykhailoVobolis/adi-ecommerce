import {
  checkUserEmail,
  loginOrSignupWithGoogle,
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  updateUser,
} from '../services/auth.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';

// Контроллер превірки наявності email користувача серед зареєстрованих
export const checkUserEmailController = async (req, res) => {
  const available = await checkUserEmail(req.body);

  res.status(201).json({
    status: 201,
    message: 'User`s email has been verified successfully!',
    available,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  // Login користувача при реєстрації
  const session = await loginUser(req.body);

  // Видалення паролю з відповіді на роуті POST /auth/register
  const { firstName = '', lastName = '', email, phone = '' } = user;

  const data = {
    firstName,
    lastName,
    email,
    phone,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      data,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

// Контроллер login користувача
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

// Контроллер logout користувача
export const logoutUserController = async (req, res) => {
  const { accessToken } = req; // Додаємо токен до `req` через `authenticate`

  await logoutUser(accessToken);

  res.status(200).json({ message: 'Logout successful' });
};

// Контроллер refresh session
export const refreshSessionController = async (req, res) => {
  const { refreshToken } = req.body;

  const newSession = await refreshUsersSession({
    refreshToken,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
    },
  });
};

// Контролер отримання даних юзера
export const fetchUserInfoController = async (req, res) => {
  const { firstName = '', lastName = '', phone = '', email } = req.user;

  res.status(200).json({
    status: 200,
    message: 'Successfully found user info!',
    data: {
      firstName,
      lastName,
      phone,
      email,
    },
  });
};

// Контроллер GoogleOAuth2.0
export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();

  res.status(200).json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

export const updateUserController = async (req, res) => {
  const userId = req.user._id;
  const newUserDetails = req.body;

  const user = await updateUser(userId, newUserDetails);

  const { firstName = '', lastName = '', email, phone = '' } = user;

  const data = {
    firstName,
    lastName,
    email,
    phone,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully updated user`s profile!',
    data,
  });
};
