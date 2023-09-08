import {BASE_URL} from "./constants";

async function createQRCode(data) {
  return fetch(`${BASE_URL}/qr-codes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })
}

async function getAll() {
  return fetch(`${BASE_URL}/qr-codes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  })
}

async function getById(id) {
  return fetch(`${BASE_URL}/qr-codes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  })
}

export {createQRCode, getAll, getById}
