import { atom } from "recoil";


export const adultCountState = atom({
  key: 'adultCountState',
  default: 0,
});

export const childCountState = atom({
  key: 'childCountState',
  default: 0,
});

export const storeState= atom({
    key: 'storeState',
    default: "",
  });