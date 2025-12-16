export interface Job {
    _id: string;
    title:string;
    description:string;
    company:string;
    location:string;
    jobType:string;
    salary:number;
    experienceLevel:string;
    isActive:boolean;
    postedBy:string;
    postedAt:Date;
}