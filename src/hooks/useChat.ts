import { useState, useCallback, useEffect } from "react";
import { Message } from "@/components/ChatMessage";
import { Conversation } from "@/components/ChatHistory";

const STORAGE_KEY = "chat_history";

// Mock analytical responses for demonstration
const getMockAnalyticalResponse = (question: string): Omit<Message, "id"> => {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("sales") || lowerQuestion.includes("revenue")) {
    return {
      role: "assistant",
      content: "Here's the sales data aggregated by region for the last quarter:",
      sql: `SELECT 
  region,
  SUM(amount) as total_sales,
  COUNT(*) as num_orders,
  AVG(amount) as avg_order_value
FROM orders
WHERE order_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
GROUP BY region
ORDER BY total_sales DESC;`,
      data: {
        columns: ["region", "total_sales", "num_orders", "avg_order_value"],
        rows: [
          { region: "North America", total_sales: 1250000, num_orders: 3420, avg_order_value: 365.50 },
          { region: "Europe", total_sales: 890000, num_orders: 2150, avg_order_value: 413.95 },
          { region: "Asia Pacific", total_sales: 720000, num_orders: 1890, avg_order_value: 380.95 },
          { region: "Latin America", total_sales: 340000, num_orders: 920, avg_order_value: 369.57 },
        ],
      },
    };
  }

  if (lowerQuestion.includes("user") || lowerQuestion.includes("customer")) {
    return {
      role: "assistant",
      content: "Here are the top customers by lifetime value:",
      sql: `SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as total_orders,
  SUM(o.amount) as lifetime_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
ORDER BY lifetime_value DESC
LIMIT 5;`,
      data: {
        columns: ["id", "name", "email", "total_orders", "lifetime_value"],
        rows: [
          { id: 1, name: "John Smith", email: "john@example.com", total_orders: 47, lifetime_value: 12500 },
          { id: 2, name: "Sarah Johnson", email: "sarah@example.com", total_orders: 38, lifetime_value: 9800 },
          { id: 3, name: "Mike Chen", email: "mike@example.com", total_orders: 31, lifetime_value: 8200 },
          { id: 4, name: "Emily Davis", email: "emily@example.com", total_orders: 28, lifetime_value: 7100 },
          { id: 5, name: "Alex Kim", email: "alex@example.com", total_orders: 25, lifetime_value: 6500 },
        ],
      },
    };
  }

  if (lowerQuestion.includes("product") || lowerQuestion.includes("inventory")) {
    return {
      role: "assistant",
      content: "Here's the current inventory status for products running low:",
      sql: `SELECT 
  p.sku,
  p.name,
  p.category,
  i.quantity,
  i.reorder_point
FROM products p
JOIN inventory i ON p.id = i.product_id
WHERE i.quantity <= i.reorder_point
ORDER BY (i.quantity::float / i.reorder_point) ASC;`,
      data: {
        columns: ["sku", "name", "category", "quantity", "reorder_point"],
        rows: [
          { sku: "SKU-001", name: "Wireless Mouse", category: "Electronics", quantity: 12, reorder_point: 50 },
          { sku: "SKU-042", name: "USB-C Cable", category: "Accessories", quantity: 25, reorder_point: 100 },
          { sku: "SKU-108", name: "Notebook A5", category: "Stationery", quantity: 45, reorder_point: 75 },
        ],
      },
    };
  }

  return {
    role: "assistant",
    content: "I've analyzed your question. Here's a sample query and results:",
    sql: `SELECT *
FROM your_table
WHERE condition = 'value'
ORDER BY created_at DESC
LIMIT 10;`,
    data: {
      columns: ["id", "name", "value", "created_at"],
      rows: [
        { id: 1, name: "Sample Item 1", value: 100, created_at: "2024-01-15" },
        { id: 2, name: "Sample Item 2", value: 250, created_at: "2024-01-14" },
        { id: 3, name: "Sample Item 3", value: 180, created_at: "2024-01-13" },
      ],
    },
  };
};

const loadConversations = (): Conversation[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt),
      }));
    }
  } catch (e) {
    console.error("Error loading conversations:", e);
  }
  return [];
};

const saveConversations = (conversations: Conversation[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (e) {
    console.error("Error saving conversations:", e);
  }
};

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => loadConversations());
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    let currentConvId = activeConversationId;

    // Create new conversation if none active
    if (!currentConvId) {
      const newConv: Conversation = {
        id: crypto.randomUUID(),
        title: content.slice(0, 40) + (content.length > 40 ? "..." : ""),
        createdAt: new Date(),
        messages: [],
      };
      currentConvId = newConv.id;
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(currentConvId);
    }

    // Add user message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === currentConvId ? { ...c, messages: [...c.messages, userMessage] } : c
      )
    );

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockResponse = getMockAnalyticalResponse(content);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        ...mockResponse,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentConvId ? { ...c, messages: [...c.messages, aiMessage] } : c
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, there was an error processing your request. Please try again.",
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentConvId ? { ...c, messages: [...c.messages, errorMessage] } : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId]);

  const clearMessages = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  }, [activeConversationId]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    conversations,
    activeConversationId,
    selectConversation,
    deleteConversation,
  };
};
