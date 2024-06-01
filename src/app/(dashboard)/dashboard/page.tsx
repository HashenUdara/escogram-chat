import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getServerSession } from "@/lib/auth-handler";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const page = async ({}) => {
  const {
    getAccessToken,
    getBooleanFlag,
    getFlag,
    getIdToken,
    getIntegerFlag,
    getOrganization,
    getPermission,
    getPermissions,
    getRoles,
    getStringFlag,
    getUser,
    getUserOrganizations,
    isAuthenticated,
  } = getKindeServerSession();

  const data = await getUser();
  const email = data?.email;
  const userid = data?.id;
  const img = data?.picture;
  const name = data?.family_name;
  const userdata = {
    email: email,
    emailVerified: null,
    id: userid,
    image: img,
    name: name,
  };
  db.set(`user:email:${email}`, userid);

  db.set(`user:${userid}`, userdata);

  const session = await getServerSession(getKindeServerSession);

  console.log("Sessionnnnnnn", session);

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

      const lastMessage = JSON.parse(lastMessageRaw) as Message;

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
                <div className="relative size-12">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    alt={`${friend.name} profile picture`}
                    src={friend.image}
                    fill
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold">{friend.name}</h4>
                <p className="mt-1 max-w-md text-md">
                  <span className=" text-muted-foreground">
                    {friend.lastMessage.senderId === session.user.id
                      ? "You: "
                      : ""}
                  </span>
                  {friend.lastMessage.text}
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
