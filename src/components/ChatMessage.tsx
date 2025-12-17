import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("message-appear py-6 px-4 md:px-0", isUser ? "bg-transparent" : "bg-message-ai/30")}>
      <div className="max-w-3xl mx-auto flex gap-4">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
            isUser ? "bg-message-user" : "bg-primary/20"
          )}
        >
          {isUser ? (
            <User className="w-4 h-4 text-foreground" />
          ) : (
            <Sparkles className="w-4 h-4 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-sm font-medium mb-1 text-muted-foreground">
            {isUser ? "You" : "AI Assistant"}
          </p>
          <div className="text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
