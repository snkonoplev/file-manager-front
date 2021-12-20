import { Options, Vue } from 'vue-class-component';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import StorageService from './StorageService';
import { DirectoryDataWrapper } from './entities/DirectoryDataWrapper';
import prettyBytes from 'pretty-bytes';
import Button from 'primevue/button';

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

    public prettyBytes(value?: number, type?: string): string {

        if (type === "Folder") {
            return "";
        }

        if (!value) {
            return "NaN";
        }

        return prettyBytes(value);
    }

    // eslint-disable-next-line
    public onDownload(node: DirectoryDataWrapper): void {
        //console.log(node);
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