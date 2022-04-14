import { async } from 'regenerator-runtime';

export const getJSON = async function (url) {
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
};
