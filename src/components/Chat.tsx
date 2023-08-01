"use client";
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

interface ChatProps {}

export function Chat(props: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>CHAT AI</CardTitle>
        <CardDescription>A chat bot created using Vercel SDK.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4">
            {messages.map(message => {
                return (
                <div key={message.id} className={`flex gap-2 ${message.role === 'user' && 'bg-slate-900'} p-2 rounded-md mb-4`}>
                {message.role === 'user' && (
                    <Avatar>
                    <AvatarFallback className="bg-slate-700">DF</AvatarFallback>
                    <AvatarImage src="https://github.com/nilloferreiira.png" />
                </Avatar>
                )}

                {message.role === 'assistant' && (
                    <Avatar>
                        <AvatarFallback className="bg-slate-700">AI</AvatarFallback>
                    </Avatar>
                )}
                <p className={` leading-relaxed ${message.role === 'assistant' ? 'text-zinc-300' : 'text-muted-foreground'}`}>
                <span className="block font-bold">{message.role === 'user' ? 'User' : 'AI'}:</span>
                 <span className={`${message.role === 'assistant' && 'text-zinc-300'}`}>
                    {message.content}
                    
                    </span>
                </p>
                </div>
                )
            })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
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
