import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { chatHrefConstructor, getInitials } from "@/lib/utils";
import { getServerSession } from "@/lib/auth-handler";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const page = async ({}) => {
  const session = await getServerSession(getKindeServerSession);

  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[];

      const lastMessage = lastMessageRaw
        ? (JSON.parse(lastMessageRaw) as Message)
        : null;

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <div className="container py-8 ">
      <h1 className="font-semibold text-2xl mb-8">Recent Chats</h1>
      {friendsWithLastMessage.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div
            key={friend.id}
            className="relative  flex hover:bg-muted/90 bg- p-3 rounded-xl"
          >
            {/* <div className="absolute right-4 inset-y-0 flex items-center">
              <ChevronRight className="h-7 w-7  text-muted-foreground" />
            </div> */}

            <Link
              href={`/dashboard/chat/${chatHrefConstructor(
                session.user.id,
                friend.id
              )}`}
              className="relative flex"
            >
              <div className="mb-4 flex items-center  flex-shrink-0 sm:mb-0 mr-4">
                <Avatar className=" size-12 flex">
                  <AvatarImage
                    src={friend.image!}
                    alt={`${friend.name} profile picture`}
                  />
                  <AvatarFallback>{getInitials(friend.name!)}</AvatarFallback>
                </Avatar>
              </div>

              <div>
                <h4 className="text-lg font-semibold">{friend.name}</h4>
                <p className="mt-1 max-w-md text-md">
                  <span className=" text-muted-foreground">
                    {friend.lastMessage &&
                    friend.lastMessage.senderId === session.user.id
                      ? "You: "
                      : ""}
                  </span>
                  {friend.lastMessage && friend.lastMessage.text}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default page;
