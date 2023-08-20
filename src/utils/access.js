export function getToken() {
    return localStorage.getItem('goatif1_jwt');
}

export function setToken(token) {
  return localStorage.setItem('goatif1_jwt', token);
}

export function hasToken() {
  if (getToken()) return true;
  return false;
}

export function deleteToken(){
  if (hasToken()){
    localStorage.removeItem('goatif1_jwt');
  }
}