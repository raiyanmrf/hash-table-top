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

    let updatedBucket;

    if (table[index]) {
    }

    return table;
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  return { set };
};

const hashTable = HashMap();
console.log(hashTable.set("rama", 29));
console.log(hashTable.set("sita", 29));
console.log(hashTable.set("sita", 50));
console.log(hashTable.set("mong", 50));
