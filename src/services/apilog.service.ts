import { ApiLog, ApiLogCreationAttributes } from '../models/apiLog.model';

export const createApiLogService = async (data: ApiLogCreationAttributes) => {
  const apiLog = await ApiLog.create(data);
  return apiLog;
};
