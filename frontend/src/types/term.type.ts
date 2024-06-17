import { MinimalApplicationForm } from "./application-form.type";

export const SemesterMap = [
    '1',
    '2',
    'Hè'
]

export type TermClassInfo = {
  name: string;
  day: string;
  lesson: string;
};

export type TermDataItem = TermClassInfo & {
  id: string;
  code: string;
  type: string;
  credits: number;
  day: number;
  scheduleId: string;
  classId: string;
  isRegistered: boolean;
  isApproved: boolean;
  isWaiting: boolean;
  applications?: MinimalApplicationForm[];
  attendanceRecordFile: string | null;
};
