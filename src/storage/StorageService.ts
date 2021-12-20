import axios, { AxiosResponse } from 'axios';
import { DirectoryDataWrapper } from './entities/DirectoryDataWrapper';

class StorageService {

    public GetDirectoryContent(path: string | undefined): Promise<AxiosResponse<DirectoryDataWrapper[]>> {
        return axios.get('/storage', { params: { path: path } });
    }

    public DownloadFile(filePath: string): Promise<AxiosResponse<Blob>> {
        return axios.get('/storage/download', { params: { file: filePath }, responseType: 'blob' });
    }
}

export default new StorageService();