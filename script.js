// {[[firstkey, firstvalue], [secondkey,secondvalue]], ...}

const HashMap = () => {
  const loadFactor = 0.75;
  const capacity = 0;
  const table = new Array(16);

  function set(key, value) {
    const hashCode = hash(key);
    const index = hashCode % table.length;

    if (index < 0 || index >= table.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let updatedBucket;

    if (table[index]) updatedBucket = [[key, value], ...table[index]];
    else updatedBucket = [[key, value]];

    table[index] = updatedBucket;

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
