// src/types/express.d.ts
import { Permission } from '../interfaces/permission.interface'; // Optional: define interface separately

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        oem_account_id?: string | null;
        service_agency_id?: string | null;
        user_type: 'OEM' | 'SERVICE_AGENCY' | string;
        role: string;
        role_id: number;
        permissions: {
          feature: string;
          access: 'READ' | 'WRITE' | 'MANAGE' | string;
        }[];
        iat?: number;
        exp?: number;
      };
    }
  }
}

export {};
