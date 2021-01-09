export interface InterfaceCourseOne {
    id: number;
    courseName: string;
    courseLevelOneId?: number;
    createdAt: string;
    updatedAt: string;
};

export interface InterfaceAddDialogConfirm {
  courseName: string;
  courseOneId: number;
}
