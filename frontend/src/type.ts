export type StatusResponseExpired = {
  intra_id?: string;
  floor?: number;
  cabinet_num?: number;
  expire_time?: string;
};

export type StatusResponseExpiredData = StatusResponseDisabled[];

export type StatusResponseDisabled = {
  floor?: number;
  cabinet_num?: number;
  note?: string;
};

export type StatusResponseDisabledData = StatusResponseDisabled[];

export type SearchResponseFromLent = {
  activation?: number;
  cabinet_id?: number;
  cabinet_num?: number;
  expire_time?: string;
  floor?: number;
  intra_id?: string;
  lent_time?: string;
  location?: string;
  section?: string;
  lent_id?: number;
};

export type SearchResponseFromLentLog = {
  activation?: number;
  cabinet_id?: number;
  cabinet_num?: number;
  return_time?: string;
  floor?: number;
  intra_id?: string;
  lent_time?: string;
  location?: string;
  section?: string;
  lent_id?: number;
};

export type SearchResponseData = {
  resultFromLent?: SearchResponseFromLent[];
  resultFromLentLog?: SearchResponseFromLentLog[];
};

export type TaskBanUser = {
  intra_id: string;
  bannedDate: string;
};

export type TaskBanUserData = TaskBanUser[];

export type TaskBanCabinet = {
  floor: number;
  section: string;
  cabinet_num: number;
  intra_id: string;
  return_time: string;
};

export type TaskBanCabinetData = TaskBanCabinet[];

export type FloorStateData = {
  disabled: number;
  floor: string;
  overdue: number;
  total: number;
  used: number;
  unused: number;
};

export type PieData = { name: string; value: number };
