import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Image, Package, Circle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { chatThreads } from "@/data/chats";
import { ChatMessage, ChatThread } from "@/types";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function Chat() {
  const [threads, setThreads] = useState<ChatThread[]>(chatThreads);
  const [activeId, setActiveId] = useState<string>(threads[0]?.id ?? "");
  const [input, setInput] = useState("");

  const active = threads.find((t) => t.id === activeId);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeId) return;
    const msg: ChatMessage = { id: Date.now().toString(), sender: "user", text: input.trim(), time: "Now" };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, messages: [...t.messages, msg], lastMessage: input.trim(), lastTime: "Now", unread: 0 }
          : t
      )
    );
    setInput("");
    // Simulate reply
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "artisan",
        text: "Thank you for reaching out! I'll get back to you shortly. 🙏",
        time: "Just now",
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeId
            ? { ...t, messages: [...t.messages, reply], lastMessage: reply.text || "", lastTime: "Just now" }
            : t
        )
      );
    }, 1500);
  };

  const selectThread = (id: string) => {
    setActiveId(id);
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, unread: 0 } : t)));
  };

  return (
    <div className="container py-6">
      <h1 className="font-display text-2xl font-semibold mb-6">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-2xl overflow-hidden bg-card min-h-[600px]">
        {/* Thread List */}
        <div className="border-r border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <Input placeholder="Search conversations..." className="text-sm" id="chat-search" />
          </div>
          <div>
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => selectThread(t.id)}
                id={`chat-thread-${t.id}`}
                className={cn(
                  "w-full flex items-center gap-3 p-4 border-b border-border/50 hover:bg-muted/50 transition-colors text-left",
                  activeId === t.id && "bg-clay/5 dark:bg-clay/10 border-l-2 border-l-clay"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={t.avatar} alt={t.artisanName} />
                    <AvatarFallback>{t.artisanName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {t.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-sage border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">{t.artisanName}</p>
                    <p className="text-xs text-muted-foreground shrink-0 ml-2">{t.lastTime}</p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{t.lastMessage}</p>
                </div>
                {t.unread > 0 && (
                  <span className="shrink-0 w-5 h-5 rounded-full bg-clay text-white text-[10px] font-bold flex items-center justify-center">{t.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message View */}
        {active ? (
          <div className="md:col-span-2 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={active.avatar} alt={active.artisanName} />
                  <AvatarFallback>{active.artisanName.charAt(0)}</AvatarFallback>
                </Avatar>
                {active.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-sage border-2 border-card" />}
              </div>
              <div>
                <p className="font-semibold text-sm">{active.artisanName}</p>
                <p className="text-xs text-muted-foreground">{active.online ? "● Online now" : "● Offline"}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="ghost" size="icon-sm" asChild>
                  <a href={`/artisan/${active.artisanId}`}><Package className="w-4 h-4" /></a>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[400px]">
              {active.messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                  {msg.sender === "artisan" && (
                    <Avatar className="h-7 w-7 mr-2 mt-auto shrink-0">
                      <AvatarImage src={active.avatar} />
                      <AvatarFallback>{active.artisanName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-[70%]", msg.sender === "user" ? "items-end" : "items-start", "flex flex-col gap-1")}>
                    {msg.product ? (
                      <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm w-56">
                        <img src={msg.product.image} alt={msg.product.name} className="w-full h-32 object-cover" />
                        <div className="p-3">
                          <p className="text-xs font-semibold line-clamp-2">{msg.product.name}</p>
                          <p className="text-sm font-mono font-bold text-clay dark:text-saffron mt-1">{formatINR(msg.product.price)}</p>
                          <Button size="sm" className="w-full mt-2 text-xs h-8">View Product</Button>
                        </div>
                      </div>
                    ) : (
                      <div className={cn("px-4 py-2.5 rounded-2xl text-sm", msg.sender === "user" ? "bg-clay text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm")}>
                        {msg.text}
                      </div>
                    )}
                    <p className="text-[10px] text-muted-foreground px-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="flex items-center gap-2 p-4 border-t border-border">
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => toast({ title: "Image sharing", description: "Attach product images to your message." })}>
                <Image className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${active.artisanName}...`}
                className="flex-1"
                id="chat-input"
              />
              <Button type="submit" size="icon" disabled={!input.trim()} id="chat-send">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-2 flex items-center justify-center text-muted-foreground">
            <p>Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}
