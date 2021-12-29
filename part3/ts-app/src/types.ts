interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseNormalSubmission extends CoursePartBase {
    description: string
}

export interface CourseNormalPart extends CourseNormalSubmission {
    type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseNormalSubmission {
    type: "submission";
    exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartBase {
    type: "special";
    description: string;
    requirements: string[];

}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
