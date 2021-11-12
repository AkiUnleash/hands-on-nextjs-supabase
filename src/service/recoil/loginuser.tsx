import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export type loginUserProps = {
  id: string;
  name: string;
};

export const loginUserState = atom<loginUserProps | null>({
  key: 'loginUser',
  default: null,
  effects_UNSTABLE: [persistAtom],
});