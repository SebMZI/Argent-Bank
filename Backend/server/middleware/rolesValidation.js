const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req || !req?.roles) return res.sendStatus(401);
    const roles = Object.values(req?.roles);
    const rolesArray = [...allowedRoles];
    const result = roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
