export type diary = {
  id?: string;
  profile_id?: string;
  sentence?: string;
  created_at?: string;
  profile?: profile;
};

export type profile = {
  id?: string;
  name?: string;
  created_at?: string;
};
