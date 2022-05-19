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

export default SearchResponseData;
