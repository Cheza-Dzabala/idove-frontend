export const saveToken = (token) => {
  localStorage.setItem('token', token);
}

export const saveUserData = (data) => {
  const user_data = JSON.stringify(data);
  localStorage.setItem('user_data', user_data);
}

export const saveUserProfile = (data) => {
  const user_profile = JSON.stringify(data);
  localStorage.setItem('user_profile', user_profile);
}

export const getToken = () => localStorage.getItem('token');

export const userData = () => {
  return JSON.parse(localStorage.getItem('user_data'));
};

export const userProfile = () => {
  try {
    return JSON.parse(localStorage.getItem('user_profile'))
  } catch {
    return null;
  };
};

export const isUserAuthenticated = () => {
  try {
    const userInfo = userData();
    if (!userInfo) return false;
    return userInfo;
  } catch (err) {
    return false;
  }
}

export const headers = {
  'Authorization': 'Bearer ' + getToken()
}
