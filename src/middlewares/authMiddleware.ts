import AuthService from '../services/auth/authService';
import ApiResponseHandler from '../api/apiResponseHandler';
import Error401 from '../errors/Error401';

/**
 * Authenticates and fills the request with the user if it exists.
 * If no token is passed, it continues the request but without filling the currentUser.
 * If userAutoAuthenticatedEmailForTests exists and no token is passed, it fills with this user for tests.
 */
export async function authMiddleware(req, res, next) {
  const isTokenEmpty =
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session);

  if (isTokenEmpty) {
    return next();
  }

  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    return next();
  }

  try {
    const currentUser: any = await AuthService.findByToken(
      idToken,
      req,
    );

    req.currentUser = currentUser;

    return next();
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(
      req,
      res,
      new Error401(),
    );
  }
}
