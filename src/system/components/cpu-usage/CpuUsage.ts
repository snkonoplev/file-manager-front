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

        if (this.usage.percent && this.usage.percent.length > 0) {
            return Math.round(this.usage.percent[0] * 100) / 100;
        }

        return 0;
    }

    public get countLogical(): number {

        if (this.usage.countLogical) {
            return this.usage.countLogical;
        }

        return 0;
    }

    public get countPhysical(): number {

        if (this.usage.countPhysical) {
            return this.usage.countPhysical;
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