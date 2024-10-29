import { atom } from 'recoil';

export const isMicOnAtom = atom({
    key: 'isMicOnAtom',
    default: true,
});

export const isCameraOnAtom = atom({
    key: 'isCameraOnAtom',
    default: true,
});