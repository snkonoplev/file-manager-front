import axios, { AxiosResponse } from 'axios';
import { DirectoryDataWrapper } from './entities/DirectoryDataWrapper';

class StorageService {

    public GetDirectoryContent(path: string | undefined): Promise<AxiosResponse<DirectoryDataWrapper[]>> {

        if (!path) {
            path = '.';
        }

        return axios.get(`/storage/list-directories/${path}`);
    }

    public Upload(data: FormData): Promise<AxiosResponse<void>> {
        return axios.post(`/storage/upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    public Delete(filePath: string): Promise<AxiosResponse<void>> {
        return axios.delete(`/storage/delete/${filePath}`);
    }

    public MkDir(dir: string): Promise<AxiosResponse<void>> {
        return axios.put(`/storage/create-directory/${dir}`);
    }
    
}

export default new StorageService();