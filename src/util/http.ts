const axios = require('axios');
// const instance = axios.create({
//   baseURL: 'https://x.mianbaoduo.com/api/',
//   timeout: 1000,
//   headers: { 'x-token': 'foobar' },
// });

export const mianBaoDuoHttp = (method: string, url: string, data: object) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      baseURL: 'https://x.mianbaoduo.com/api',
      headers: { 'x-token': '381445:1kmbUe:E_FdZabILPsT9k0e9zr_cX79gxU' },
      params: data,
      data,
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};
