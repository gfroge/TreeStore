const TreeStore = require('./index');

describe('Проверка методов изначальными значениями', () => {
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
    test('Проверка getAll()', () => {
        expect(ts.getAll()).toStrictEqual(items)
    })
    test('Проверка getItem(7)', () => {
        expect(ts.getItem(7)).toStrictEqual({ id: 7, parent: 4, type: null })
    })
    test('Проверка getChildren(4)', () => {
        expect(ts.getChildren(4)).toContainEqual({ "id": 7, "parent": 4, "type": null });
        expect(ts.getChildren(4)).toContainEqual({ "id": 8, "parent": 4, "type": null });
        expect(ts.getChildren(4).length).toStrictEqual(2)
    })
    test('Проверка getChildren(5)', () => {
        expect(ts.getChildren(5)).toStrictEqual([])
    })
    test('Проверка getAllChildren(2)', () => {
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 4, "parent": 2, "type": "test" });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 5, "parent": 2, "type": "test" });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 6, "parent": 2, "type": "test" });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 7, "parent": 4, "type": null });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 8, "parent": 4, "type": null });
        expect(ts.getAllChildren(2).length).toStrictEqual(5)
    })
    test('Проверка getAllParents(7)', () => {
        expect(ts.getAllParents(7)).toStrictEqual([
            { "id": 4, "parent": 2, "type": "test" }, 
            { "id": 2, "parent": 1, "type": "test" }, 
            { "id": 1, "parent": "root" }])
    })
})