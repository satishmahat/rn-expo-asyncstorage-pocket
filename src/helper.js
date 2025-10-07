import { CATEGORIES } from './constants'

export const getId = () => {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

export const getDate = () => {
    return new Date().toISOString().split('T')[0];
};
