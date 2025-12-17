import { Database, MessageSquare, Table } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-12">
      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
        <Database className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        SQL Analytics Chat
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Ask questions about your data in natural language. I'll generate SQL queries and show you the results.
      </p>
      <div className="grid gap-3 w-full max-w-md">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
          <MessageSquare className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm text-muted-foreground">
            "Show me total sales by region"
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
          <Table className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm text-muted-foreground">
            "Who are my top 5 customers?"
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
          <Database className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm text-muted-foreground">
            "Which products need restocking?"
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
