class TreeNode {
    id;
    value;
    parent;
    children;
    constructor(id, 
    // value - initial object
    value = id, parent = null) {
        this.id = id;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }
}
class TreeStore {
    items;
    root;
    sortedItems = [];
    constructor(items) {
        this.items = items;
        this.sortItems(items);
        // fill tree
        for (const item of this.sortedItems) {
            this.fill(item['parent'], item['id'], item);
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
    fill(parentId, id, value = id) {
        for (let node of this.preOrder()) {
            if (String(node.id) === String(parentId)) {
                node.children.push(new TreeNode(id, value, node));
                return true;
            }
        }
        return false;
    }
    // find item
    find(id) {
        for (let node of this.preOrder()) {
            if (String(node.id) === String(id))
                return node;
        }
        return undefined;
    }
    //sort
    sortItems(itemsInitial) {
        const items = [...itemsInitial];
        if (items.length) {
            // find and define root
            for (let i = 0; i < items.length; i++) {
                if (items[i]['parent'] === 'root') {
                    this.root = new TreeNode(items[i]['id'], items[i]);
                    this.sortedItems.push(items[i]);
                    items.splice(i, 1);
                    break;
                }
            }
            let index = 0;
            while (items.length > 0 && index < this.sortedItems.length) {
                const cycle = () => {
                    const newItems = [...items];
                    for (let i = 0; i < newItems.length; i++) {
                        if (newItems[i]['parent'] == this.sortedItems[index]['id']) {
                            this.sortedItems.push(newItems[i]);
                            items.splice(i, 1);
                            index--;
                            break;
                            // reassign array after each splice
                        }
                    }
                };
                cycle();
                index++;
            }
            return true;
        }
        else {
            return false;
        }
    }
    // task methods
    getAll() {
        return this.items;
    }
    getItem(id) {
        return this.find(id).value;
    }
    getChildren(id) {
        const data = [];
        this.find(id).children.forEach((node) => {
            data.push(node.value);
        });
        return data;
    }
    getAllChildren(id) {
        const data = [];
        [...this.preOrder(this.find(id))].map((node) => {
            data.push(node.value);
        });
        data.shift();
        return data;
    }
    getAllParents(id) {
        let el = this.find(id);
        const data = [];
        while (el.parent) {
            el = this.find(el.parent.id);
            data.push(el.value);
        }
        return data;
    }
}
;
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
const ts = new TreeStore(items);
// console.log(ts.getAll())
// console.log(ts.getItem(7))
// console.log(ts.getChildren(4));
// console.log(ts.getChildren(5));
// console.log(ts.getChildren(2));
// console.log(ts.getAllChildren(2))
// console.log(ts.getAllParents(7));
module.exports = TreeStore;
