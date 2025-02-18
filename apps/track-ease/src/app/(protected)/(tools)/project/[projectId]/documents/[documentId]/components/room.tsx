"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { getAllUsers } from "@/app/actions";
import { LoaderIcon } from "lucide-react";

function FullScreenLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        <p>Please wait ...</p>
      </div>
    </div>
  );
}

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getAllUsers();
        setUsers(list);
      } catch (err) {}
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      throttle={16}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) => {
            user.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase());
          });
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
