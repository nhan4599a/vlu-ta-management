export type ApplicationForm = {
    _id: string,
    name: string,
    code: string,
    class: string,
    phoneNumber: string,
    termScore: number,
    avgScore: number,
    description: string,
    attachments: string[],
    stage1Approval: boolean,
    stage2Approval: boolean,
    scheduleId: string
}

export type OverviewApplicationFormResponse = {
    name: string,
    lesson: string,
    scheduleId: string,
    applications: ApplicationForm[],
    hasMore: boolean
}