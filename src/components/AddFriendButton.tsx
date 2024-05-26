"use client";

import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong." });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <Card className="  rounded-xl  m-2 md:m-4 h-fit  md:col-span-5">
      <CardHeader>
        <CardTitle>Add a friend</CardTitle>
        <CardDescription>
          Enter email of your friend to send a friend request
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Input
            {...register("email")}
            placeholder="friend@example.com"
            className=" bg-muted border-none"
          />
          <p className="mt-1 ml-2 text-sm text-red-600">
            {errors.email?.message}
          </p>
          {showSuccessState ? (
            <p className="mt-1 ml-2 text-sm text-green-600">
              Friend request sent!
            </p>
          ) : null}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Send Friend Request</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddFriendButton;

<form></form>;
