import { Sparkles, MessageSquare, Zap, Shield } from "lucide-react";

const EmptyState = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Natural Conversation",
      description: "Chat naturally and get helpful responses",
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Get answers quickly and efficiently",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your conversations are kept confidential",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-3xl font-semibold text-foreground mb-2">AI Chat</h1>
      <p className="text-muted-foreground text-center max-w-md mb-10">
        Start a conversation and explore the possibilities of AI assistance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
          >
            <feature.icon className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
