import { Options, Vue } from 'vue-class-component';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { User } from './User';
import UsersService from './UsersService';
import moment from 'moment';
import Checkbox from 'primevue/checkbox';

@Options({
    components: {
        DataTable,
        Column,
        Checkbox
    }
})
export default class Users extends Vue {

    public users: User[] = [];

    public mounted(): void {
        const loader = this.$loading.show();
        UsersService.List()
            .then(r => this.users = r.data)
            .finally(() => loader.hide());
    }

    public dateTime(timeStamp: number | null): string {
        if (timeStamp === null)
            return '';

        return moment.unix(timeStamp).format('DD.MM.YYYY HH:mm:ss');
    }
}