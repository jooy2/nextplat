import axios from 'axios';
import { getNextEnv } from '../utils/helper';

const API_HOST = getNextEnv('API_HOST');

export const createMemo = (content) => axios.post(`${API_HOST}/api/memo/create`, { content });

export default {
  createMemo,
};
