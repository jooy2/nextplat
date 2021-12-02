import axios from 'axios';
import { getNextEnv } from '../utils/helper';

const host = getNextEnv('API_HOST');

export const createMemo = (content) => axios.post(`${host}/api/memo/create`, { content });

export default {
  createMemo,
};
