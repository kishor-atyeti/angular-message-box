export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN'
};

const APIURL = "http://localhost:4000";

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${APIURL}/auth/login`,
    logout: `${APIURL}/auth/logout`,
    me: `${APIURL}/auth/me`,
    register: `${APIURL}/auth/register`,
  },
  MessageEndpoint: `${APIURL}/message`,
  UserEndpoint:  `${APIURL}/users`,
}
