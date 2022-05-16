type CabinetResultFromLent = {
  cabinet_id?: number;
  cabinet_num?: number;
  floor?: number;
  activation?: number;
  intra_id?: string;
  lent_time?: string;
  return_time?: string;
};

type CabinetResultFromLentLog = {
  cabinet_id?: number;
  cabinet_num?: number;
  floor?: number;
  activation?: number;
  intra_id?: string;
  lent_time?: string;
  return_time?: string;
};

export type searchCabinetData = {
  status?: number;
  data?: {
    resultFromLent?: CabinetResultFromLent[];
    resultFromLentLog?: CabinetResultFromLentLog[];
  };
  code?: string;
};

type UserResultFromLent = {
  intra_id?: string;
  location?: string;
  section?: string;
  floor?: number;
  cabinet_num?: number;
  lent_time?: string;
  return_time?: string;
};

type UserResultFromLentLog = {
  intra_id?: string;
  location?: string;
  section?: string;
  floor?: number;
  cabinet_num?: number;
  lent_time?: string;
  return_time?: string;
};

export type searchUserData = {
  status?: number;
  data?: {
    resultFromLent?: UserResultFromLent[];
    resultFromLentLog?: UserResultFromLentLog[];
  };
  code?: string;
};
