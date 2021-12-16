import { Options, Vue } from 'vue-class-component';
import ProgressBar from 'primevue/progressbar';
import { CpuUsageModel } from '@/system/entities/CpuUsage';
import SystemService from '@/system/SystemService';
import Card from 'primevue/card';
import Button from 'primevue/button';

@Options({
    components: {
        ProgressBar,
        Card,
        Button
    },
})
export default class CpuUsage extends Vue {

    public usage: CpuUsageModel = {};
    public loading = false;

    public get usedPercent(): number {

        if (this.usage.total && this.usage.idle) {
            const usage = (this.usage.total - this.usage.idle) / this.usage.total;
            return Math.round(usage * 10000) / 10000;
        }

        return 0;
    }

    public get count(): number {

        if (this.usage.count) {
            return this.usage.count;
        }

        return 0;
    }    

    public get mode(): string {

        if (this.loading) {
            return 'indeterminate';
        }

        return 'determinate';

    }

    public mounted(): void {
        this.refresh();
    }

    public refresh(): void {
        this.loading = true;
        SystemService.CpuUsage().then(r => {
            this.usage = { ...r.data };
            this.loading = false;
        });
    }
}