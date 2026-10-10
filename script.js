const HashMap = () => {
  const loadFactor = 0.75;
  let table = new Array(16);
  let capacity = Math.floor(loadFactor * table.length);

  function getIndex(key) {
    let i = hash(key) % table.length;
    // console.log(`${hash(key)} % ${table.length} = ${i}`);
    return i;
  }

  function set(key, value) {
    // capacity check
    const len = length();
    // console.log("len", len);
    // console.log("capacity", capacity);
    if (len >= capacity) {
      const oldTable = table;
      table = new Array(len * 2);
      oldTable.forEach((bucket) => {
        if (bucket && bucket.length > 0) {
          let i = getIndex(bucket[0][0]);
          table[i] = [...bucket];
        }
      });

      capacity = Math.floor(loadFactor * (table.length * 2));
    }

    const index = getIndex(key);

    if (index < 0 || index >= table.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!table[index]) {
      table[index] = [[key, value]];
      return table;
    }

    const bucket = table[index].slice();

    for (let i = 0; i < bucket.length; i++) {
      const itemKey = bucket[i][0];
      if (itemKey === key) {
        bucket[i][1] = value;
        table[index] = bucket;
        return table;
      }
    }
    bucket.push([key, value]);
    table[index] = bucket;
    return table;
  }
  function get(key) {
    const index = getIndex(key);

    if (index < 0 || index >= table.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (table[index]) {
      const bucket = table[index];
      for (let i = 0; i < bucket.length; i++) {
        const itemKey = bucket[i][0];
        if (itemKey === key) return bucket[i][1];
      }
    }
    return undefined;
  }
  function remove(key) {
    const index = getIndex(key);

    if (index < 0 || index >= table.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (table[index]) {
      const bucket = table[index].filter((item) => item[0] !== key);
      if (bucket.length !== table[index].length) {
        table[index] = bucket;
        return true;
      }
    }
    return false;
  }
  function length() {
    return table.reduce((sum, item) => sum + item.length, 0);
  }
  function keys() {
    let keys = [];
    table.forEach((bucket) => {
      if (bucket)
        keys = [
          ...keys,
          ...bucket.reduce((sum, item) => [...sum, item[0]], []),
        ];
    });
    return keys;
  }
  function values() {
    let values = [];
    table.forEach((bucket) => {
      if (bucket)
        values = [
          ...values,
          ...bucket.reduce((sum, item) => [...sum, item[1]], []),
        ];
    });
    return values;
  }
  function entries() {
    let entries = [];
    table.forEach((bucket) => {
      if (bucket)
        entries = [
          ...entries,
          ...bucket.reduce((sum, item) => [...sum, item], []),
        ];
    });
    return entries;
  }

  function print() {
    console.log(table);
  }
  function has(key) {
    const index = getIndex(key);

    if (table[index]) {
      const bucket = table[index];
      for (let i = 0; i < bucket.length; i++) {
        const itemKey = bucket[i][0];
        if (itemKey === key) return true;
      }
    }
    return false;
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  function clear() {
    table = new Array(16);
    capacity = loadFactor * table.length;
    // console.log("capacity", capacity);
  }

  return { clear, set, get, has, remove, print, length, keys, values, entries };
};

const test = HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.print();
console.log(test.length());
test.set("kite", "pinkish");
test.set("lion", "goldenish");

test.print();
console.log(test.length());

test.set("moon", "silver");

test.print();
console.log(test.length());

test.set("gorilla", "silver");
test.set("tapir", "gray");

test.print();
console.log(test.length());

console.log(test.get("kite"));
console.log(test.get("lion"));
console.log(test.get("fake"));

console.log(test.has("kite"));
console.log(test.has("lion"));
console.log(test.has("fake"));

console.log(test.has("kite"));
console.log(test.has("lion"));
console.log(test.has("fake"));

console.log(test.keys());
console.log(test.values());

console.log(test.remove("kite"));
console.log(test.remove("fake"));

test.print();
console.log(test.length());

console.log(test.clear());

test.print();
console.log(test.length());
