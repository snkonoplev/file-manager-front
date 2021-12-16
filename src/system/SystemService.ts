import axios, { AxiosResponse } from 'axios';
import { DiskUsageModel } from './entities/DiskUsage';
import { MemoryUsageModel } from './entities/MemoryUsage';
import { CpuUsageModel } from './entities/CpuUsage';
import { LoadAvgModel } from './entities/LoadAvg';
import { UpTimeModel } from './entities/UpTime';

class SystemService {

    public DiskUsage(): Promise<AxiosResponse<DiskUsageModel>> {
        return axios.get('/system/disk-usage');
    }

    public MemoryUsage(): Promise<AxiosResponse<MemoryUsageModel>> {
        return axios.get('/system/memory-usage');
    }

    public CpuUsage(): Promise<AxiosResponse<CpuUsageModel>> {
        return axios.get('/system/cpu-usage');
    }

    public LoadAvg(): Promise<AxiosResponse<LoadAvgModel>> {
        return axios.get('/system/load-avg');
    }

    public UpTime(): Promise<AxiosResponse<UpTimeModel>> {
        return axios.get('/system/up-time');
    }

}

export default new SystemService();