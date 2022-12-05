class TreeNode {
    readonly children: Array<TreeNode>
    constructor(
        public id:number | string, 
        // value - initial object
        public value:any = id, 
        public parent = null) {
        this.children = [];
    }
}

class TreeStore {
    protected root:TreeNode
    constructor( protected items: Array<object>){
        // find and define root
        for (const item of items) {
            if(item['parent'] === 'root'){
                this.root = new TreeNode(item['id'], item);
                break;
            }
        }
        // fill tree
        for (const item of items) {
            this.fill(item['parent'], item['id'], item)
        }
    }

    *preOrder(node = this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrder(child);
            }
        }
    }

    *postOrder(node = this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.postOrder(child);
            }
        }
        yield node;
    }
    // add node to TreeStore
    fill(parentId:number | string, id:number | string, value:any = id) {
        for (let node of this.preOrder()) {
            if (node.id == parentId) {
                node.children.push(new TreeNode(id, value, node));
                return true;
            }
        }
        return false;
    }
    // find item
    find(id:number | string) {
        for (let node of this.preOrder()) {
            if (node.id == id) return node;
        }
        return undefined;
    }

    // task methods
    getAll(){
        return this.items;
    }
    getItem(id:number | string){
        return this.find(id).value
    }
    getChildren(id:number | string){
        const data=[];
        this.find(id).children.forEach((node:TreeNode) => {
            data.push(node.value)
        });
        return data;
    }
    getAllChildren(id:number | string){
        const data=[];
        [...this.preOrder(this.find(id))].map((node)=>{
            data.push(node.value)
        });
        data.shift()
        return data;
    }
    getAllParents(id:number | string){
        let el = this.find(id);
        const data=[];
        while(el.parent){
            el = this.find(el.parent.id)
            data.push(el.value);
        }
        return data;
    }
};

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

// const items = [
//     { id: '2', parent: 1, type: 'test' },
//     { id: 1, parent: 'root' },
//     { id: 5, parent: 2, type: 'test' },
//     { id: 6, parent: 2, type: 'test' },
//     { id: '4', parent: 2, type: 'test' },
//     { id: '7', parent: 4, type: null },
//     { id: 3, parent: 1, type: 'test' },
//     { id: 8, parent: 4, type: null },
// ];

const ts = new TreeStore(items);

// console.log(ts.getAll())
// console.log(ts.getItem(7))
// console.log(ts.getChildren(4));
// console.log(ts.getChildren(5));
// console.log(ts.getChildren(2));
// console.log(ts.getAllChildren(2))
// console.log(ts.getAllParents(7));
