import { NextFunction, Request, Response } from "express";
import { createApiLogService } from "../services/apilog.service";
import { ApiLogCreationAttributes } from "../models/apiLog.model";

export const auditMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Generate a unique request ID
    const requestId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

    const data: ApiLogCreationAttributes = {
        requestId: requestId,
        method: req.method,
        endpoint: req.originalUrl,
        ip: req.ip ?? "",
        statusCode: 0,
        responseTime: 0,
    };
    const createAuditLog = await createApiLogService(data);
    req.auditLog = createAuditLog;
    next();
}