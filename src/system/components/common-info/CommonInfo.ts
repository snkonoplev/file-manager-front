import { Options, Vue } from 'vue-class-component';
import { LoadAvgModel } from '@/system/entities/LoadAvg';
import { UpTimeModel } from '@/system/entities/UpTime';
import SystemService from '@/system/SystemService';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { DateTime, Interval } from 'luxon';
import humanizeDuration from 'humanize-duration';

@Options({
    components: {
        Card,
        Button
    },
})
export default class CommonInfo extends Vue {

    public load: LoadAvgModel = {};
    public upTime: UpTimeModel = {};
    public loading = false;

    public get up(): string {

        if (this.upTime.upTime) {
            const formatted = Interval
                .fromDateTimes(DateTime.now(), DateTime.now().plus({ milliseconds: this.upTime.upTime }))
                .toDuration()
                .valueOf();

            return humanizeDuration(formatted, { language: "en" });
        }

        return "NaN";
    }

    public round(value: number | undefined): number {

        if (value) {
            return Math.round(value * 10000) / 10000;
        }

        return 0;
    }

    public mounted(): void {
        this.refresh();
    }

    public refresh(): void {
        this.loading = true;

        Promise.all([SystemService.UpTime(), SystemService.LoadAvg()])
            .then(r => {
                this.upTime = r[0].data;
                this.load = r[1].data;
                this.loading = false;
            });
    }
}