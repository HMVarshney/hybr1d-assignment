const AccessControl = require("accesscontrol");

const roles = ["BUYER", "SELLER"];

const grantList = [];
const ac = new AccessControl(grantList);

module.exports = {
  roles,
  ac,
};
