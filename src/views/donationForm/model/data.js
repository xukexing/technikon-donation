import { DonorSubject, Gender } from './const.js';

export const donorSubjectOptions = [
	{ label: '个人', value: DonorSubject.SELF },
	{ label: '团体', value: DonorSubject.TEAM },
];


export const genderOptions = [
  { label: '男', value: Gender.MAN },
  { label: '女', value: Gender.WOMAN }
]