"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { Check, Trash2, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );
    console.log("listening to ", `user:${sessionId}:incoming_friend_requests`);

    const friendRequestHandler = ({
      senderId,
      senderEmail,
      senderName,
      senderImg,
    }: IncomingFriendRequest) => {
      console.log("function got called");
      setFriendRequests((prev) => [
        ...prev,
        { senderId, senderEmail, senderName, senderImg },
      ]);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={request.senderImg!} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {request.senderName}
              </p>
              <p className="text-sm text-muted-foreground">
                {request.senderEmail}
              </p>
            </div>
            <div className="ml-auto flex items-center   space-x-2">
              <Button
                aria-label="accept friend"
                onClick={() => acceptFriend(request.senderId)}
                variant={"secondary"}
              >
                Accept
              </Button>
              <Button
                onClick={() => denyFriend(request.senderId)}
                aria-label="deny friend"
                variant={"ghost"}
                size={"icon"}
              >
                <Trash2 className=" size-4" />{" "}
              </Button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
