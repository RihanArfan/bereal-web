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
