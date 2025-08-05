export default async function getRandomQuote() {
  const res = await fetch("/api/quote");
  const data = await res.json();
  return data;
}

/*
{
"id": 36702,
    "dialogue": false,
    "private": false,
    "tags": [
    ],
    "url": "https://favqs.com/quotes/winston-churchill/36702-i-am-always-r-",
    "favorites_count": 2,
    "upvotes_count": 1,
    "downvotes_count": 0,
    "author": "Winston Churchill",
    "author_permalink": "winston-churchill",
    "body": "I am always ready to learn although I do not always like being taught."
}

*/
