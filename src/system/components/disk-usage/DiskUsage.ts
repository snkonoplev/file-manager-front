import { Options, Vue } from 'vue-class-component';
import ProgressBar from 'primevue/progressbar';
import { DiskUsageModel } from '@/system/entities/DiskUsage';
import SystemService from '@/system/SystemService';
import Card from 'primevue/card';
import prettyBytes from 'pretty-bytes';
import Button from 'primevue/button';

@Options({
    components: {
        ProgressBar,
        Card,
        Button
    },
})
export default class DiskUsage extends Vue {

    public usage: DiskUsageModel = {};
    public loading = false;

    public get usedPercent(): number {

        if (this.usage.usage) {
            const usage = this.usage.usage * 100;
            return Math.round(usage * 100) / 100;
        }

        return 0;
    }

    public get size(): string {

        if (this.usage.size) {
            return prettyBytes(this.usage.size);
        }

        return 'NaN';
    }

    public get used(): string {

        if (this.usage.used) {
            return prettyBytes(this.usage.used);
        }

        return 'NaN';
    }

    public get available(): string {

        if (this.usage.available) {
            return prettyBytes(this.usage.available);
        }

        return 'NaN';
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
        SystemService.DiskUsage().then(r => {
            this.usage = { ...r.data };
            this.loading = false;
        });
    }
}