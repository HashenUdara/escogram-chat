import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
// import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/lib/db";
import { getServerSession } from "@/lib/auth-handler";
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

  console.log(await getAccessToken());
  // console.log(await getBooleanFlag("bflag", false));
  // console.log(await getFlag("flag", "x", "s"));
  // console.log(await getIntegerFlag("iflag", 99));
  // console.log(await getOrganization());
  // console.log(await getPermission("eat:chips"));
  // console.log(await getPermissions());
  // console.log(await getStringFlag("sflag", "test"));
  // console.log(await getUser());
  // console.log(await getUserOrganizations());
  // console.log(await isAuthenticated());
  const data = await getUser();
  const email = data?.email;
  const userid = data?.id;
  const img = data?.picture;
  const name = data?.family_name;

  const session = await getServerSession(getKindeServerSession);

  db.sadd(`user:email:${email}`, userid);

  const userdata = {
    email: email,
    emailVerified: null,
    id: userid,
    image: img,
    name: name,
  };

  db.sadd(`user:${userid}`, userdata);

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
