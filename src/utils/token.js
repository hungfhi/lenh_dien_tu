import Cookies from 'universal-cookie';
const _Cookies = new Cookies();

const get = () => {
  try {
    const jwtToken = _Cookies.get('JWT_TOKEN');
    return jwtToken;
  } catch (err) {
    remove();
    return null;
  }
};
const remove = () => {
  _Cookies.remove('JWT_TOKEN');
};
export const $Token = {
  get,
  remove,
};
