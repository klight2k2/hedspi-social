// import { db } from '../../firebase';
// import { addDoc, doc, serverTimestamp } from 'firebase/firestore';

class Http {
  static post = async (url, data) => {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    });
  };

  static get=async (url)=>{
    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        }),
      });
  }

  static delete=async (url)=>{
    return await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        }),
      });
  }
}

export default Http