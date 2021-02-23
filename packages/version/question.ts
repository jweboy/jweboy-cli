import { QuestionCollection } from 'inquirer';
import { VersionType } from './typings';

const questions: QuestionCollection = [
  {
    name: 'versionCode',
    type: 'list',
    choices: [VersionType.Major, VersionType.Minor, VersionType.Patch],
    message: '请选择需要发布的版本类型：主版本号(major)，次版本号(minor)，修订号(patch)',
  },
];

export default questions;
