'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from "react";
import { getRandomQuote } from "../apis/apiQuotes";

import Image from "next/image";

function useQuote() {
  return useQuery({
    queryKey: ['quote'],
    queryFn: getRandomQuote,
  });
}

function Quote() {

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuote();

  const [quoteData, setQuoteData] = useState({ content: "", author: "" });

  useEffect(() => {
    if (data) {
      const { body, author } = data;
      setQuoteData({ content: body, author });
    }
  }, [data]);

  if (isLoading) {
    return (<p>Loading...</p>);
  }
  if (isError) {
    console.error(error);
    return;
  }

  return (
    <div className="flex items-start md:w-[57.3rem]">
      <div className="mr-5">
        <blockquote className="ps-6">
          {quoteData.content}
        </blockquote>
        <p className="ps-7">
          {quoteData.author}
        </p>
      </div>
      <button
        className="mr-5"
        onClick={() => refetch()}
      >
        <Image
          src={`/images/desktop/icon-refresh.svg`}
          alt="SVG Image of Refresh Button"
          width={24}
          height={24}
          className="w-auto h-auto hover:cursor-pointer"
        />
      </button>
    </div>
  );
}

export default Quote;
