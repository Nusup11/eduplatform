let mode = 'memory';

export function setMongoMode() {
  mode = 'mongo';
}

export function isMongo() {
  return mode === 'mongo';
}

export function getMode() {
  return mode;
}
