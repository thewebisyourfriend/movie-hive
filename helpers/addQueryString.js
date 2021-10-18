function queryString (url, params) {
  const urlWithParams = new URL(url);

  Object.keys(params).forEach((key) => {
    urlWithParams.searchParams.append(key, params[key]);
  });

  return urlWithParams.href;
};

export default queryString;