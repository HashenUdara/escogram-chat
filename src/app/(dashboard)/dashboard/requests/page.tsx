import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getServerSession } from "@/lib/auth-handler";
import { notFound } from "next/navigation";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddFriendButton from "@/components/AddFriendButton";
const page = async () => {
  const session = await getServerSession(getKindeServerSession);
  if (!session) notFound();

  // ids of people who sent current logged in user a friend requests
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParsed = JSON.parse(sender) as User;
      console.log(senderParsed);
      return {
        senderId,
        senderEmail: senderParsed.email,
        senderName: senderParsed.name,
        senderImg: senderParsed.image,
      };
    })
  );

  return (
    <div className=" md:grid  grid-cols-12 ">
      <Card className=" m-4 bg-transparent border-none shadow-none  md:col-span-7">
        <CardHeader className="   p-0 pb-4  md:p-6 ">
          <CardTitle className=" text-xl md:text-2xl">
            Friend Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8    ">
          <FriendRequests
            incomingFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />
        </CardContent>
      </Card>

      <AddFriendButton />
    </div>
  );
};

export default page;
