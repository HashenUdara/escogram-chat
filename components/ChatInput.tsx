"use client";

import axios from "axios";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CornerDownLeft, Send } from "lucide-react";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative overflow-hidden m-3 my-2 rounded-lg border bg-muted focus-within:ring-1 focus-within:ring-ring"
      x-chunk="dashboard-03-chunk-1"
    >
      <Textarea
        ref={textareaRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Message ${chatPartner.name}`}
        className="min-h-12 resize-none border-0 p-3 shadow-none bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button
          type="submit"
          onClick={sendMessage}
          size="sm"
          isLoading={isLoading}
          className="ml-auto gap-1.5"
        >
          Send Message
          <Send className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
