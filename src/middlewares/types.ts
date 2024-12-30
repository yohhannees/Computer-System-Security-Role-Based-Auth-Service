export type ServerResponse<Data> = {
  isSuccess: boolean;
  message: string;
  data: Data | null;
};
