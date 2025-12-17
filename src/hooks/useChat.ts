import { useState, useCallback } from "react";
import { Message } from "@/components/ChatMessage";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Replace with your backend API call
      // Example structure for connecting to your backend:
      // const response = await fetch('YOUR_BACKEND_URL/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: content, history: messages }),
      // });
      // const data = await response.json();
      
      // Simulated response for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `This is a demo response. To connect to your backend, update the \`useChat\` hook with your API endpoint. Your message was: "${content}"`,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, there was an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};
