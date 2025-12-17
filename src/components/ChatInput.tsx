import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
        <div className="relative flex items-end gap-2 bg-secondary rounded-2xl border border-border focus-within:border-primary/50 focus-within:glow-primary transition-all duration-300">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none scrollbar-thin max-h-[200px] min-h-[48px]"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || disabled}
            className="m-1.5 h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          AI can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
