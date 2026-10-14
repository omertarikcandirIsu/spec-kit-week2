export const quotes = Object.freeze([
  {
    id: 'hamlet-brevity',
    text: 'Brevity is the soul of wit.',
    author: 'William Shakespeare, Hamlet',
  },
  {
    id: 'hamlet-self-true',
    text: 'This above all: to thine own self be true.',
    author: 'William Shakespeare, Hamlet',
  },
  {
    id: 'hamlet-thinking',
    text: 'There is nothing either good or bad, but thinking makes it so.',
    author: 'William Shakespeare, Hamlet',
  },
  {
    id: 'julius-caesar-tide',
    text: 'There is a tide in the affairs of men, which taken at the flood, leads on to fortune.',
    author: 'William Shakespeare, Julius Caesar',
  },
  {
    id: 'midsummer-little-fierce',
    text: 'Though she be but little, she is fierce!',
    author: 'William Shakespeare, A Midsummer Night’s Dream',
  },
  {
    id: 'as-you-like-it-stage',
    text: 'All the world’s a stage, and all the men and women merely players.',
    author: 'William Shakespeare, As You Like It',
  },
  {
    id: 'measure-doubts-traitors',
    text: 'Our doubts are traitors, and make us lose the good we oft might win, by fearing to attempt.',
    author: 'William Shakespeare, Measure for Measure',
  },
  {
    id: 'tempest-dreams',
    text: 'We are such stuff as dreams are made on.',
    author: 'William Shakespeare, The Tempest',
  },
]);

export function createQuoteCycle(collection = quotes, random = Math.random) {
  if (!Array.isArray(collection) || collection.length === 0) {
    throw new TypeError('Quote collection must contain at least one quote.');
  }

  let remaining = [];

  return {
    next() {
      if (remaining.length === 0) {
        remaining = [...collection];
        for (let index = remaining.length - 1; index > 0; index -= 1) {
          const swapIndex = Math.min(
            Math.floor(random() * (index + 1)),
            index,
          );
          [remaining[index], remaining[swapIndex]] = [
            remaining[swapIndex],
            remaining[index],
          ];
        }
      }

      return remaining.pop();
    },
  };
}