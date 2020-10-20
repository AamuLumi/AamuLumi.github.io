const Generator = {};

Generator.getInt = (max) => {
  return Math.floor(Math.random() * max);
};

Generator.getColor = () => {
  return `rgb(${Generator.getInt(256)}, ${Generator.getInt(
    256
  )},${Generator.getInt(256)})`;
};
