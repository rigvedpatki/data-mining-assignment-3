import { Storage } from '@google-cloud/storage';

export const storage = new Storage({ projectId: 'data-mining-assignments' });

export * from './get-dataset-from-storage';
