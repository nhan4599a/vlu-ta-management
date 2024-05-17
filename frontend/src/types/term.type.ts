export type TermClassInfo = {
  name: string;
  lesson: string;
};

export type TermDataItem = TermClassInfo & {
  id: string;
  code: string;
  type: string;
  credits: number;
  day: number;
  scheduleId: string;
  isRegistered: boolean;
  isApproved: boolean;
  applications?: {
    _id: string;
    stage1Approval: boolean;
    stage2Approval: boolean
  }[];
};
