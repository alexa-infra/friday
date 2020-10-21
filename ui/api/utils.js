
const requireAccept = ['GET', 'PUT', 'POST', 'PATCH'];
const requireBody = ['PUT', 'POST', 'PATCH'];

export const wrap = (apiFunc) => (data) => {
  const params = apiFunc(data);

  const headers = {};

  if (requireAccept.includes(params.method)) {
    if (params.text) headers.Accept = 'text/plain, application/json';
    else if (params.html) headers.Accept = 'text/html, application/json';
    else headers.Accept = 'application/json';
  }

  let body = null;
  if (requireBody.includes(params.method)) {
    if (params.text) {
      body = params.body;
      headers['Content-Type'] = 'text/plain';
    } else if (params.html) {
      body = params.body;
      headers['Content-Type'] = 'text/html';
    } else {
      body = JSON.stringify(params.body);
      headers['Content-Type'] = 'application/json';
    }
  }

  const request = new Request(params.url, {
    method: params.method,
    headers,
    body,
    credentials: 'same-origin',
  });

  return fetch(request).then((response) => {
    if (!response.ok) {
      return Promise.reject({
        name: 'ResponseError',
        message: response.statusText,
        status: response.status,
      });
    }

    if (requireAccept.includes(params.method)) {
      if (params.text || params.html) return response.text();
      return response.json();
    }
    return {};
  });
};

export const later = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
