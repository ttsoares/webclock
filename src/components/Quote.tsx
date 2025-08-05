'use client';

import React, { useEffect, useState } from "react";
import getRandomQuote from "../apis/apiQuotes";

import Image from "next/image";

function Quote() {
  const [quoteData, setQuoteData] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError("");
      const { body, author } = await getRandomQuote();
      setQuoteData({ content: body, author });
    } catch (err) {
      console.error("Quote fetch failed:", err);
      setError("Failed to load quote");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex items-start md:w-[57.3rem]">
      <div className="mr-5">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <blockquote className="ps-6">
              {loading ? "Loading..." : `"${quoteData.content}"`}
            </blockquote>
            {!loading && (
              <p className="ps-7">
                {quoteData.author}
              </p>
            )}
          </>
        )}
      </div>
      <button
        className="mr-5"
        onClick={fetchQuote}
        disabled={loading}
      >
        <Image
          src={`/images/desktop/icon-refresh.svg`}
          alt="SVG Image of Refresh Button"
          width={24}
          height={24}
          className="w-auto h-auto"
        />
      </button>
    </div>
  );
}

export default Quote;
