import { DirectoryData } from './DirectoryData';

export class DirectoryDataWrapper {
    key?: string;
    data?: DirectoryData;
    leaf?: boolean;
    children?: DirectoryDataWrapper[];
}