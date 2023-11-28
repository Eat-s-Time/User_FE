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
  effects_UNSTABLE: [persistAtom], 
});

export const storeState= atom({
    key: 'storeState',
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  export const storeIdState= atom({
    key: 'storeIdState',
    default: 0,
    effects_UNSTABLE: [persistAtom],
  });

  export const userIdState= atom({
    key: 'userIdState',
    default: "",
    effects_UNSTABLE: [persistAtom]
  });

  export const userNameState= atom({
    key: 'userNameState',
    default: "",
    effects_UNSTABLE: [persistAtom]
  });

  
  export const emailState= atom({
    key: 'emailState',
    default: "",
    effects_UNSTABLE: [persistAtom]
  });


  export const loginState = atom({
    key: 'loginState',
    default: false,
    effects_UNSTABLE: [persistAtom], 
  });