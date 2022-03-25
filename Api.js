import {createTokenSign, createServiceSign} from './utils';
import {client_id, secret, device_id} from './config';

const URL = 'https://openapi.tuyaeu.com/v1.0/';

export const getAccessToken = () => {
  const t = Date.now().toString();
  let sign = createTokenSign(client_id, secret, t);

  let myHeaders = new Headers();
  myHeaders.append("client_id", client_id);
  myHeaders.append("sign", sign);
  myHeaders.append("t", t);
  myHeaders.append("sign_method", "HMAC-SHA256");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(URL + "/token?grant_type=1", requestOptions)
}

export const toggleDevice = (token, value) => {
  const t = Date.now().toString();
  let sign = createServiceSign(client_id, secret, t, token);

  let myHeaders = new Headers();
  myHeaders.append("client_id", client_id);
  myHeaders.append("access_token", token);
  myHeaders.append("sign", sign);
  myHeaders.append("t", t);
  myHeaders.append("sign_method", "HMAC-SHA256");
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({"commands": [{
    "code": "switch",
    "value": value
  }]});

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: raw
  };

  fetch(URL + "devices/" + device_id + "/commands", requestOptions)
    .then(response => response.text())
    .then(result => console.log("post resutl", result))
    .catch(error => console.log("error", error));
}

export const getDeviceInfo = (token, device_id) => {
  const t = Date.now().toString();
  let sign = createServiceSign(client_id, secret, t, token);

  let myHeaders = new Headers();
  myHeaders.append("client_id", client_id);
  myHeaders.append("access_token", token);
  myHeaders.append("sign", sign);
  myHeaders.append("t", t);
  myHeaders.append("sign_method", "HMAC-SHA256");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(URL + "devices/" + device_id, requestOptions)
}

export const getDeviceFunctions = (token, device_id) => {
  const t = Date.now().toString();
  let sign = createServiceSign(client_id, secret, t, token);

  let myHeaders = new Headers();
  myHeaders.append("client_id", client_id);
  myHeaders.append("access_token", token);
  myHeaders.append("sign", sign);
  myHeaders.append("t", t);
  myHeaders.append("sign_method", "HMAC-SHA256");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(URL + "devices/" + device_id + "/functions", requestOptions)
    .then(response => response.json())
    .then(result => console.log("result", result))
    .catch(error => console.log("error", error))
}

// query the list of timing tasks of the device
export const getDeviceTimers = (token, device_id) => {
  const t = Date.now().toString();
  let sign = createServiceSign(client_id, secret, t, token);

  let myHeaders = new Headers();
  myHeaders.append("client_id", client_id);
  myHeaders.append("access_token", token);
  myHeaders.append("sign", sign);
  myHeaders.append("t", t);
  myHeaders.append("sign_method", "HMAC-SHA256");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(URL + "devices/" + device_id + "/timers", requestOptions)
    .then(response => response.json())
    .then(result => result.result.forEach(element => {
      element.groups.forEach(group => console.log("timer", group.timers))
    }))
    .catch(error => console.log("error", error))
}

export const postDeviceTimers = (token, device_id) => {
  const t = Date.now().toString();
  let sign = createServiceSign(client_id, secret, t, token);

  let myHeaders = new Headers();
  myHeaders.append("client_id", client_id);
  myHeaders.append("access_token", token);
  myHeaders.append("sign", sign);
  myHeaders.append("t", t);
  myHeaders.append("sign_method", "HMAC-SHA256");

  let raw = JSON.stringify({"instruct": [{
    "functions": [
      {
        "code":"switch",
        "value": false
      }
    ],
    "date":"20210112",
    "time": "11:15"
  }],
    "loops":"0000000",
    "category": "test",
    "timezone_id": "Europe/Zagreb",
    "time_zone": "+1:00"
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: raw
  };

  fetch(URL + "devices/" + device_id + "/timers", requestOptions)
    .then(response => response.json())
    .then(result => console.log("result", result))
    .catch(error => console.log("error", error))
}
