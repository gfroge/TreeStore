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

describe('Проверка методов перепутанными значениями с id: number | string', () => {
    const items = [
        { id: '7', parent: 4, type: null },
        { id: 8, parent: 4, type: null },
        { id: 6, parent: 2, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
        { id: '4', parent: 2, type: 'test' },
        { id: '2', parent: 1, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 1, parent: 'root' },
    ];
    const ts = new TreeStore(items);
    test('Проверка getAll()', () => {
        expect(ts.getAll()).toStrictEqual(items)
    })
    test('Проверка getItem(7)', () => {
        expect(ts.getItem(7)).toStrictEqual({ id: '7', parent: 4, type: null })
    })
    test('Проверка getChildren(4)', () => {
        expect(ts.getChildren(4)).toContainEqual({ "id": '7', "parent": 4, "type": null });
        expect(ts.getChildren(4)).toContainEqual({ "id": 8, "parent": 4, "type": null });
        expect(ts.getChildren(4).length).toStrictEqual(2)
    })
    test('Проверка getChildren(5)', () => {
        expect(ts.getChildren(5)).toStrictEqual([])
    })
    test('Проверка getAllChildren(2)', () => {
        expect(ts.getAllChildren(2)).toContainEqual({ "id": '4', "parent": 2, "type": "test" });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 5, "parent": 2, "type": "test" });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 6, "parent": 2, "type": "test" });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": '7', "parent": 4, "type": null });
        expect(ts.getAllChildren(2)).toContainEqual({ "id": 8, "parent": 4, "type": null });
        expect(ts.getAllChildren(2).length).toStrictEqual(5)
    })
    test('Проверка getAllParents(7)', () => {
        expect(ts.getAllParents(7)).toStrictEqual([
            { "id": '4', "parent": 2, "type": "test" },
            { "id": '2', "parent": 1, "type": "test" },
            { "id": 1, "parent": "root" }])
    })
})

describe('Проверка методов перепутанными значениями с id: number | string, id может быть любым значением', () => {
    const items = [
        { id: 'John12', parent: 'apple', type: 'username' },
        { id: 13765, parent: 'AB', type: 'num' },
        { id: 0x10, parent: 37, type: 'hex' },
        { id: 0, parent: 37, type: 'zero' },
        { id: 'AB', parent: 'root' },
        { id: 37, parent: 'John12', type: 'num' },
        { id: '', parent: 37, type: 'empty str' },
        { id: 'apple', parent: 'AB', type: 'fruit' },
        { id: 'R', parent: 37, type: 'symbol' },
    ];
    const ts = new TreeStore(items);
    test('Проверка getAll()', () => {
        expect(ts.getAll()).toStrictEqual(items)
    })
    test("Проверка getItem(R)", () => {
        expect(ts.getItem('R')).toStrictEqual({ id: 'R', parent: 37, type: 'symbol' })
    })
    test("Проверка getItem(0x10)", () => {
        expect(ts.getItem(0x10)).toStrictEqual({ id: 0x10, parent: 37, type: 'hex' })
    })
    test("Проверка getItem('AB')", () => {
        expect(ts.getItem('AB')).toStrictEqual({ id: 'AB', parent: 'root' })
    })
    test("Проверка getItem('')", () => {
        expect(ts.getItem('')).toStrictEqual({ id: '', parent: 37, type: 'empty str' })
    })
    test("Проверка getItem(0)", () => {
        expect(ts.getItem(0)).toStrictEqual({ id: 0, parent: 37, type: 'zero' })
    })
    test("Проверка getChildren('37')", () => {
        expect(ts.getChildren(37)).toContainEqual({ id: 0x10, parent: 37, type: 'hex' });
        expect(ts.getChildren(37)).toContainEqual({ id: 0, parent: 37, type: 'zero' });
        expect(ts.getChildren(37)).toContainEqual({ id: 'R', parent: 37, type: 'symbol' });
        expect(ts.getChildren(37)).toContainEqual({ id: '', parent: 37, type: 'empty str' })
        expect(ts.getChildren(37).length).toStrictEqual(4)
    })
    test("Проверка getAllChildren(13765)", () => {
        expect(ts.getAllChildren(13765)).toStrictEqual([])
    })
    test("Проверка getAllChildren('John12')", () => {
        expect(ts.getAllChildren('John12')).toContainEqual({ id: 0x10, parent: 37, type: 'hex' });
        expect(ts.getAllChildren('John12')).toContainEqual({ id: 0, parent: 37, type: 'zero' });
        expect(ts.getAllChildren('John12')).toContainEqual({ id: 'R', parent: 37, type: 'symbol' });
        expect(ts.getAllChildren('John12')).toContainEqual({ id: '', parent: 37, type: 'empty str' })
        expect(ts.getAllChildren('John12')).toContainEqual( { id: 37, parent: 'John12', type: 'num' })
        expect(ts.getAllChildren('John12').length).toStrictEqual(5)
    })
    test("Проверка getAllParents(37)", () => {
        expect(ts.getAllParents(37)).toStrictEqual([
            { id: 'John12', parent: 'apple', type: 'username' },
            { id: 'apple', parent: 'AB', type: 'fruit' },
            { id: 'AB', parent: 'root' },])
    })
})
