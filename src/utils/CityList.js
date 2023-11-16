import { getProvinces, getPrefectures } from "china-region";

export const cityList = getProvinces().map((province) => {
  return {
    label: province.name,
    value: province.code,
    children: getPrefectures(province.code).map((prefecture) => {
      return {
        label: prefecture.name,
        value: prefecture.code,
      };
    }),
  };
});
export const cityListName = getProvinces().map((province) => {
  return {
    label: province.name,
    value: province.name,
    children: getPrefectures(province.name).map((prefecture) => {
      return {
        label: prefecture.name,
        value: prefecture.name,
      };
    }),
  };
});

