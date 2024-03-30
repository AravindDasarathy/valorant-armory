import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 150
});

const get = (key) => cache.get(key);

const set = (key, value, ttl) => cache.set(key, value, ttl);

export { get, set };
