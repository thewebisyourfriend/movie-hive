const merge = (prev, updated, propToMatch) => {
  const obj = {};

  prev.forEach(function (item) {
    obj[item[propToMatch]] = item;
  });

  updated.forEach(function (item) {
    obj[item[propToMatch]] = item;
  });

  const replacement = [];

  for (const [key, value] of Object.entries(obj)) {
    replacement.push(value);
  }
  return replacement;
};

export default merge;