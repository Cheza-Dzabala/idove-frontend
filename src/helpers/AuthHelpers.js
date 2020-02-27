import jsonwebtoken from 'jsonwebtoken';

export const saveToken = (token) => {
  localStorage.setItem('token', token);
}

export const getToken = () => localStorage.getItem('token');

export const userData = () => {
  try {
    return jsonwebtoken.verify(getToken(), '3g+40lo61_(a46a**4n03g$9vi-8vgbw3w$iu#mf604&7#lo=0')
  } catch (error) {
    return null
  }
};

export const isUserAuthenticated = () => {
  try {
    const userInfo = userData();
    if (userInfo === null) return false;
    return userInfo;
  } catch (err) {
    return false;
  }
}