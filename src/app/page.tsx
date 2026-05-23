"use client";

import Sidebar from "@/components/sidebar/sidebar";
import ChatContainer from "@/components/chat/chat-container";

export default function Home() {
  return (
    <main className="flex h-screen bg-bmo-cream">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatContainer />
      </div>
    </main>
  );
}
