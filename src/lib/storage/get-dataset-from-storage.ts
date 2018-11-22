import { Storage } from '@google-cloud/storage';

export const getDatasetFromStorage = async (
  bucketName: string,
  fileName: string,
  storage: Storage
) => {
  const file = await storage
    .bucket(bucketName)
    .file(fileName)
    .download();
  return file[0].toString('utf-8');
};
