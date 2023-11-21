import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'; // ✔

const { persistAtom } = recoilPersist();

export const adultCountState = atom({
  key: 'adultCountState',
  default: 0,
  effects_UNSTABLE: [persistAtom], 
});

export const childCountState = atom({
  key: 'childCountState',
  default: 0,
  effects_UNSTABLE: [persistAtom], // ✔
});

export const storeState= atom({
    key: 'storeState',
    default: "",
    effects_UNSTABLE: [persistAtom], // ✔
  });

  export const storeIdState= atom({
    key: 'storeIdState',
    default: 0,
    effects_UNSTABLE: [persistAtom], // ✔
  });