"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "./scroll-area";

type Card = {
  id: number;
  name: string;
  key: string;
  designation: React.ReactNode;
  content: (data: string, projectId: string) => React.ReactNode;
};

export const CardStack = ({
  data,
  projectId,
  items,
  offset,
  scaleFactor,
}: {
  data: any;
  projectId: string;
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 25;
  const SCALE_FACTOR = scaleFactor || 0.04;
  const [cards, setCards] = useState<Card[]>(items);

  const handleCardSelect = (index: number) => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      const selectedCard = newArray.splice(index, 1);
      newArray.unshift(selectedCard[0]!); // move the last element to the front
      return newArray;
    });
  };

  const header: Record<string, string> = {
    requirements: "bg-green-100/50 text-green-700",
    epics: "bg-purple-100/50 text-purple-700",
    releases: "bg-yellow-100/50 text-yellow-700",
    mytasks: "bg-blue-100/50 text-blue-700",
  };

  return (
    <div className="relative">
      {cards.map((card, index) => {
        return (
          <motion.div
            onClick={() => handleCardSelect(index)}
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
              className={`p-1 ${header[card.key]} text-center font-semibold cursor-pointer`}
            >
              {card.name}
            </div>
            <ScrollArea className="p-4 flex-1 flex flex-col">
              {card.content(
                data.projects?.[projectId]?.[card.key]?.currentId,
                projectId
              )}
            </ScrollArea>
          </motion.div>
        );
      })}
    </div>
  );
};
