import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export default async function Page({ params }: { params: { slug: string } }) {
  const userId = decodeURIComponent(params.slug[0]);
  const emailToAdd = decodeURIComponent(params.slug[1]);
  console.log(userId, emailToAdd);

  // const userId = (await fetchRedis("get", `user:email:${userId}`)) as string;

  const idToAdd = (await fetchRedis(
    "get",
    `user:email:${emailToAdd}`
  )) as string;

  if (!idToAdd) {
    console.log("This person does not exist.", { status: 400 });
  }

  if (idToAdd === userId) {
    console.log("You cannot add yourself as a friend", {
      status: 400,
    });
  }

  // check if user is already added
  const isAlreadyAdded = (await fetchRedis(
    "sismember",
    `user:${idToAdd}:incoming_friend_requests`,
    userId
  )) as 0 | 1;

  if (isAlreadyAdded) {
    console.log("Already added this user", { status: 400 });
  }

  // check if user is already added
  const isAlreadyFriends = (await fetchRedis(
    "sismember",
    `user:${userId}:friends`,
    idToAdd
  )) as 0 | 1;

  if (isAlreadyFriends) {
    console.log("Already friends with this user", { status: 400 });
  }

  // valid request, send friend request
  console.log(idToAdd);
  await pusherServer.trigger(
    toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
    "incoming_friend_requests",
    {
      senderId: userId,
      senderEmail: userId,
    }
  );

  await db.sadd(`user:${idToAdd}:incoming_friend_requests`, userId);

  return <div>My Post: {params.slug}</div>;
}
