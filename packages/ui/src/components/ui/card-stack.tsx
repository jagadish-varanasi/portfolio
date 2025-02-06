"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

type Card = {
  id: number;
  name: string;
  key: string;
  designation: React.ReactNode;
  content: (data: string) => React.ReactNode;
};

export const CardStack = ({
  data,
  items,
  offset,
  scaleFactor,
}: {
  data: any;
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 25;
  const SCALE_FACTOR = scaleFactor || 0.04;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  const header: Record<string, string> = {
    Requirement: "bg-green-100 text-green-700",
    Epic: "bg-purple-100 text-purple-700",
    Release: "bg-yellow-100 text-yellow-700",
    Sprint: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="relative">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black h-[80vh] w-full bg-white shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div
              className={`p-1 ${header[card.name]} text-center font-semibold`}
            >
              {card.name}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="font-normal text-neutral-700 dark:text-neutral-200 flex-1">
                {card.content(data[card.key].data[data[card.key].currentId])}
              </div>
              <div>
                <p className="text-neutral-500 font-medium dark:text-white">
                  {card.name}
                </p>
                <div className="text-neutral-400 font-normal dark:text-neutral-200">
                  {card.designation}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
