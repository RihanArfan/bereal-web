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
  /**
   * 0: Success
   * 6: Code expired
   * 16: Invalid code
   */
  status: "0" | "6" | "16";
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
