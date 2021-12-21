import { Options, Vue } from 'vue-class-component';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import StorageService from './StorageService';
import { DirectoryDataWrapper } from './entities/DirectoryDataWrapper';
import prettyBytes from 'pretty-bytes';
import Button from 'primevue/button';
import store from '../store';
import { useCookies } from "vue3-cookies";

@Options({
    components: {
        TreeTable,
        Column,
        Button
    },
})
export default class Storage extends Vue {
    public nodes: DirectoryDataWrapper[] = [];
    public loading = false;
    public expandedKeys = {};
    public cookies = useCookies();

    public prettyBytes(value?: number, type?: string): string {

        if (type === "Folder") {
            return "";
        }

        if (!value) {
            return "NaN";
        }

        return prettyBytes(value);
    }

    public onDownload(node: DirectoryDataWrapper): void {
        if (node.key && node.data && node.data?.name) {
            const token = store.getters['login/getToken'] as string | undefined;
            const expires = store.getters['login/getExpire'] as number | undefined;
            const url = process.env.NODE_ENV === 'development' ? `http://localhost:5000/api/storage/download/${node.key}` : `/api/storage/download/${node.key}`;
            if (token && expires && expires > new Date().valueOf()) {
                this.cookies.cookies.set('jwt', token, new Date(expires), '/api/storage/download');
                window.open(url, '_blank');
            } else {
                window.location.reload();
            }
        }
    }

    public onExpand(node: DirectoryDataWrapper): void {
        StorageService.GetDirectoryContent(node.key)
            .then(r => {
                const data = [...r.data];
                const nodes = this.nodes.map(n => {
                    const result = this.checkNode(node.key, n);

                    if (result) {
                        result.children = data;
                    }

                    return n;
                });

                this.nodes = [...nodes];
            })
            .finally(() => this.loading = false);
    }

    public mounted(): void {
        this.loading = true;
        StorageService.GetDirectoryContent(undefined)
            .then(r => this.nodes = [...r.data])
            .finally(() => this.loading = false);
    }

    private checkNode(nodeKey: string | undefined, node: DirectoryDataWrapper): DirectoryDataWrapper | void {
        if (node.key === nodeKey) {
            return node;
        }

        if (node.children) {

            let newNode: DirectoryDataWrapper | undefined = undefined;

            for (let j = 0; j < node.children.length; j++) {
                const n = this.checkNode(nodeKey, node.children[j]);
                if (n) {
                    newNode = n;
                    break;
                }
            }

            return newNode;
        }
    }
}