const expressJwt = require("express-jwt");
const config = require("../config.json");
const userController = require("../controllers/users");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/api/v1/users/authentication",
      "/api/v1/users/authorize",
      "/api/v1/users/register",
      // allow use public dir and parrots
      "/parrots",
      "/api/v1/parrots",
      new RegExp("/public.*/", "i"),
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userController.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
