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
  status: string;
  token: string;
  uid: string;
}
