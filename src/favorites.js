export const FAVORITES_STORAGE_KEY = 'commonplace:favorites:v1';

function normalizeFavorite(quote) {
  if (
    !quote ||
    typeof quote.id !== 'string' ||
    quote.id.trim() === '' ||
    typeof quote.text !== 'string' ||
    quote.text.trim() === '' ||
    (quote.author !== undefined &&
      (typeof quote.author !== 'string' || quote.author.trim() === ''))
  ) {
    return null;
  }

  const favorite = { id: quote.id, text: quote.text };
  if (quote.author !== undefined) favorite.author = quote.author;
  return favorite;
}

function failure(error, favorites = []) {
  return { favorites, ok: false, error };
}

function validateRecord(record) {
  if (
    !record ||
    record.version !== 1 ||
    !Array.isArray(record.favorites)
  ) {
    return null;
  }

  const favorites = [];
  const ids = new Set();
  for (const quote of record.favorites) {
    const favorite = normalizeFavorite(quote);
    if (!favorite || ids.has(favorite.id)) return null;
    ids.add(favorite.id);
    favorites.push(favorite);
  }

  return favorites;
}

export function createFavoritesStore(storageProvider = () => globalThis.localStorage) {
  function load() {
    try {
      const raw = storageProvider().getItem(FAVORITES_STORAGE_KEY);
      if (raw === null) return { favorites: [], ok: true };

      const favorites = validateRecord(JSON.parse(raw));
      if (favorites === null) {
        return failure('Saved favorites could not be read.');
      }

      return { favorites, ok: true };
    } catch {
      return failure('Saved favorites could not be read.');
    }
  }

  function save(favorites, previousFavorites) {
    try {
      storageProvider().setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify({ version: 1, favorites }),
      );
      return { favorites, ok: true };
    } catch {
      return failure('Favorites could not be saved.', previousFavorites);
    }
  }

  function add(quote) {
    const current = load();
    if (!current.ok) {
      return failure(
        'This quote was not saved because saved favorites could not be read.',
        current.favorites,
      );
    }

    const favorite = normalizeFavorite(quote);
    if (!favorite) {
      return failure('This quote could not be saved.', current.favorites);
    }
    if (current.favorites.some((item) => item.id === favorite.id)) {
      return current;
    }

    return save([...current.favorites, favorite], current.favorites);
  }

  function remove(id) {
    const current = load();
    if (!current.ok) return current;

    const favorites = current.favorites.filter((quote) => quote.id !== id);
    if (favorites.length === current.favorites.length) return current;
    return save(favorites, current.favorites);
  }

  return { load, add, remove };
}