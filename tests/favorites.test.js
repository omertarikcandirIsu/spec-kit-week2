import assert from 'node:assert/strict';
import test from 'node:test';

import { createFavoritesStore, FAVORITES_STORAGE_KEY } from '../src/favorites.js';

function createMemoryStorage(initialValue = null) {
  const values = new Map();
  if (initialValue !== null) values.set(FAVORITES_STORAGE_KEY, initialValue);

  return {
    values,
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

const quote = {
  id: 'quote-one',
  text: 'A quote worth keeping.',
  author: 'A. Writer',
};

test('favorites can be added and restored from versioned storage', () => {
  const storage = createMemoryStorage();
  const store = createFavoritesStore(() => storage);

  assert.deepEqual(store.load(), { favorites: [], ok: true });
  assert.deepEqual(store.add(quote), { favorites: [quote], ok: true });
  assert.deepEqual(store.load(), { favorites: [quote], ok: true });
  assert.deepEqual(JSON.parse(storage.values.get(FAVORITES_STORAGE_KEY)), {
    version: 1,
    favorites: [quote],
  });
});

test('duplicate favorites are not stored twice', () => {
  const store = createFavoritesStore(() => createMemoryStorage());

  store.add(quote);
  assert.deepEqual(store.add(quote), { favorites: [quote], ok: true });
});

test('favorites retain a quote snapshot and can be removed by id', () => {
  const storage = createMemoryStorage();
  const store = createFavoritesStore(() => storage);
  const sourceQuote = { ...quote };

  store.add(sourceQuote);
  sourceQuote.text = 'Updated source text.';
  assert.deepEqual(store.load().favorites[0].text, 'A quote worth keeping.');
  assert.deepEqual(store.remove('quote-one'), { favorites: [], ok: true });
});

test('malformed or unsupported saved data is rejected without being overwritten', () => {
  const malformedStorage = createMemoryStorage('{');
  const malformedStore = createFavoritesStore(() => malformedStorage);
  assert.equal(malformedStore.load().ok, false);
  assert.equal(malformedStorage.values.get(FAVORITES_STORAGE_KEY), '{');

  const unsupportedRecord = JSON.stringify({ version: 2, favorites: [] });
  const unsupportedStore = createFavoritesStore(() => createMemoryStorage(unsupportedRecord));
  assert.equal(unsupportedStore.load().ok, false);
});

test('invalid favorites and duplicate ids in storage are rejected', () => {
  const invalidQuote = JSON.stringify({
    version: 1,
    favorites: [{ id: '', text: 'Missing id' }],
  });
  assert.equal(createFavoritesStore(() => createMemoryStorage(invalidQuote)).load().ok, false);

  const duplicateQuotes = JSON.stringify({
    version: 1,
    favorites: [quote, quote],
  });
  assert.equal(createFavoritesStore(() => createMemoryStorage(duplicateQuotes)).load().ok, false);
});

test('unavailable storage is reported without throwing', () => {
  const store = createFavoritesStore(() => {
    throw new Error('Storage is unavailable.');
  });

  assert.equal(store.load().ok, false);
  assert.equal(store.add(quote).ok, false);
  assert.equal(store.remove('quote-one').ok, false);
});

test('failed favorite adds explicitly report that the quote was not saved', () => {
  const store = createFavoritesStore(() => {
    throw new Error('Storage is unavailable.');
  });
  const result = store.add(quote);

  assert.equal(result.ok, false);
  assert.match(result.error, /not saved/i);
  assert.match(result.error, /could not be read/i);
});

test('write failures do not claim that a favorite was saved', () => {
  const storage = createMemoryStorage();
  storage.setItem = () => {
    throw new Error('Storage is full.');
  };
  const store = createFavoritesStore(() => storage);

  assert.deepEqual(store.add(quote), { favorites: [], ok: false, error: 'Favorites could not be saved.' });
});