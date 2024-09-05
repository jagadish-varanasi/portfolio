import Image from "next/image";
import Link from "next/link";
import React from "react";

function HobbyCard() {
  return (
    <Link
      href="hobbies"
      className="group relative flex h-full overflow-hidden rounded-2xl"
    >
      <span className="absolute inset-0 -z-10">
        <Image
          src="/hoobies.webp"
          alt="home"
          width={300}
          height={190}
          className="absolute inset-0 h-full w-full bg-black object-cover object-center brightness-50"
        />
      </span>
      <span className="flex flex-1 flex-col justify-between p-6 text-white">
        <span className="flex justify-between"></span>
        <div className="space-y-0.5">
          <h2 className="font-title font-bold">
            <span className="font-medium">art gallery: </span>
            paintings I drew once hooked to
          </h2>
          <p className="text-sm">
            these paintings are the ones that I was atleast once in my life
            obsessed with. obsessed as in, listen to it on repeat kinda obsessed
          </p>
        </div>
      </span>
    </Link>
  );
}

export default HobbyCard;
