import { InjectionToken } from "@angular/core";
import { ApiService } from "./app/service/api-service";

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");
export const API_SERVICE = new InjectionToken<ApiService<any>>('API_SERVICE');