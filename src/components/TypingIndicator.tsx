import { Sparkles } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="message-appear py-6 px-4 md:px-0 bg-message-ai/30">
      <div className="max-w-3xl mx-auto flex gap-4">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 pt-1">
          <p className="text-sm font-medium mb-2 text-muted-foreground">AI Assistant</p>
          <div className="flex gap-1.5">
            <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
            <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
            <span className="typing-dot w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
