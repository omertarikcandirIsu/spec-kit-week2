import assert from 'node:assert/strict';
import test from 'node:test';

import { createQuoteCycle, quotes } from '../src/quotes.js';

test('built-in quotes have unique ids, non-empty text, and known attribution', () => {
  assert.ok(quotes.length > 1);
  assert.equal(new Set(quotes.map((quote) => quote.id)).size, quotes.length);

  for (const quote of quotes) {
    assert.ok(quote.text.trim().length > 0);
    assert.ok(quote.author.trim().length > 0);
  }
});

test('quote selection uses the injected random source', () => {
  const sample = [
    { id: 'one', text: 'First quote', author: 'Author One' },
    { id: 'two', text: 'Second quote', author: 'Author Two' },
  ];

  assert.equal(createQuoteCycle(sample, () => 0).next().id, 'one');
  assert.equal(createQuoteCycle(sample, () => 0.99).next().id, 'two');
});

test('quote selection does not repeat before all quotes are shown', () => {
  const cycle = createQuoteCycle(quotes, () => 0);
  const firstRound = quotes.map(() => cycle.next());
  const firstRoundIds = firstRound.map((quote) => quote.id);

  assert.equal(new Set(firstRoundIds).size, quotes.length);
  assert.equal(cycle.next().id, firstRound[0].id);
});

test('a one-quote collection continues to return its only quote', () => {
  const onlyQuote = { id: 'only', text: 'One quote', author: 'One Author' };
  const cycle = createQuoteCycle([onlyQuote], () => 0);

  assert.equal(cycle.next(), onlyQuote);
  assert.equal(cycle.next(), onlyQuote);
});