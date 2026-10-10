// {[[firstkey, firstvalue], [secondkey,secondvalue]], ...}

const HashMap = () => {
  const loadFactor = 0.75;
  const capacity = 0;
  const table = new Array(16);

  function getIndex(key) {
    return hash(key) % table.length;
  }

  function set(key, value) {
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

  return { set, get, has, remove, print, length };
};

const hashTable = HashMap();
console.log(hashTable.set("rama", 29));
console.log(hashTable.set("sita", 29));
console.log(hashTable.set("sita", 50));
console.log(hashTable.set("mong", 50));
console.log(hashTable.get("mong"));
console.log(hashTable.get("dong"));
console.log(hashTable.has("pong"));
console.log(hashTable.has("mong"));
// console.log(hashTable.remove("mong"));
// console.log(hashTable.remove("pong"));
hashTable.print();
console.log(hashTable.length());
