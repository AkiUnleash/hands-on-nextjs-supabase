import { atom } from 'recoil';
// import { recoilPersist } from 'recoil-persist';

export type loginUserProps = {
  id: string;
  name: string;
};

export const loginUserState = atom<loginUserProps | null>({
  key: 'loginUser',
  default: null,
});