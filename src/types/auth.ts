export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface CheckCodeResponse {
  status: "0" | "6" | "16"; // 0 = success, 6 = expired code, 16 = invalid code
  token: string;
  uid: string;
  error_text?: string;
}

export interface RequestCodeResponse {
  status: string;
  vonageRequestId: string;
}

export interface ExchangeRefreshResponse {
  kind: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  isNewUser: boolean;
}

export type Env = {
  BEREAL_API_ENDPOINT: string;
  BEREAL_AUTH_REQUEST_ENDPOINT: string;
  BEREAL_AUTH_VERIFY_ENDPOINT: string;
  GOOGLE_SECRET: string;
  GOOGLE_TOKEN_ENDPOINT: string;
  GOOGLE_REFRESH_ENDPOINT: string;
};
