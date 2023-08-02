"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "./ui/use-toast";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    console.log("error", error);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  }, [error]);

  return (
    <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle>Chat Gepeteco</CardTitle>
        <CardDescription>Using Vercel SDK to create a chat bot</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-full w-full">
          {messages.map((message, index) => {
            return (
              <div
                className="flex gap-3 text-slate-600 text-sm"
                key={message.id}
              >
                {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>JC</AvatarFallback>
                    <AvatarImage src="http://github.com/JheovannyCampos.png" />
                  </Avatar>
                )}

                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>BOT</AvatarFallback>
                    <AvatarImage src="https://github.com/OpenAI.png" />
                  </Avatar>
                )}

                <p className="mt-2 leading-relaxed">{message.content}</p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="flex w-full gap-x-2" onSubmit={handleSubmit}>
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
