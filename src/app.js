import { createQuoteCycle, quotes } from './quotes.js';
import { createFavoritesStore } from './favorites.js';

const quoteCycle = createQuoteCycle();
const favoritesStore = createFavoritesStore();
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteCount = document.getElementById('quote-count');
const newQuoteButton = document.getElementById('new-quote');
const favoriteToggle = document.getElementById('favorite-toggle');
const favoritesList = document.getElementById('favorites-list');
const favoritesCount = document.getElementById('favorites-count');
const favoritesEmpty = document.getElementById('favorites-empty');
const storageStatus = document.getElementById('storage-status');
let currentQuote;
let favoriteQuotes = [];
let shownCount = 0;

function updateFavoriteToggle() {
  const isFavorite = favoriteQuotes.some((quote) => quote.id === currentQuote.id);
  favoriteToggle.setAttribute('aria-pressed', String(isFavorite));
  favoriteToggle.textContent = isFavorite ? 'Remove favorite' : 'Save quote';
}

function renderFavorites(nextFavorites) {
  favoriteQuotes = nextFavorites;
  favoritesList.replaceChildren();
  favoritesEmpty.hidden = favoriteQuotes.length > 0;
  favoritesCount.textContent = `${favoriteQuotes.length} SAVED`;

  for (const favorite of favoriteQuotes) {
    const item = document.createElement('li');
    item.className = 'favorite-item';

    const copy = document.createElement('div');
    copy.className = 'favorite-copy';

    const text = document.createElement('p');
    text.className = 'favorite-text';
    text.textContent = favorite.text;
    copy.append(text);

    if (favorite.author) {
      const author = document.createElement('p');
      author.className = 'favorite-author';
      author.textContent = favorite.author;
      copy.append(author);
    }

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-favorite';
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('aria-label', `Remove favorite: ${favorite.text}`);
    removeButton.addEventListener('click', () => removeFavorite(favorite.id));

    item.append(copy, removeButton);
    favoritesList.append(item);
  }

  if (currentQuote) updateFavoriteToggle();
}

function applyFavoriteResult(result, successMessage, failureMessage = result.error) {
  renderFavorites(result.favorites);
  storageStatus.textContent = result.ok ? successMessage : failureMessage;
}

function toggleCurrentFavorite() {
  const isFavorite = favoriteQuotes.some((quote) => quote.id === currentQuote.id);
  const result = isFavorite
    ? favoritesStore.remove(currentQuote.id)
    : favoritesStore.add(currentQuote);

  applyFavoriteResult(
    result,
    isFavorite ? 'Removed from favorites.' : 'Saved to favorites.',
    isFavorite ? `This favorite was not removed. ${result.error}` : result.error,
  );
}

function removeFavorite(id) {
  const result = favoritesStore.remove(id);
  applyFavoriteResult(
    result,
    'Removed from favorites.',
    `This favorite was not removed. ${result.error}`,
  );
}

function showNextQuote() {
  currentQuote = quoteCycle.next();
  shownCount = (shownCount % quotes.length) + 1;
  quoteText.textContent = currentQuote.text;
  quoteAuthor.textContent = currentQuote.author ?? '';
  quoteAuthor.hidden = !currentQuote.author;
  quoteCount.textContent = `${String(shownCount).padStart(2, '0')} / ${String(quotes.length).padStart(2, '0')}`;
  updateFavoriteToggle();
}

newQuoteButton.addEventListener('click', showNextQuote);
favoriteToggle.addEventListener('click', toggleCurrentFavorite);
const savedFavorites = favoritesStore.load();
renderFavorites(savedFavorites.favorites);
if (!savedFavorites.ok) storageStatus.textContent = savedFavorites.error;
showNextQuote();