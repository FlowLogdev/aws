"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/lib/supabase/client";

interface NotificationRow {
  id: string;
  type: "micro_quiz" | "system" | "unlock";
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function load() {
      const { data } = await supabase
        .from("notifications")
        .select("id, type, title, body, read, created_at")
        .order("created_at", { ascending: false })
        .limit(15);
      if (active) {
        setNotifications((data as NotificationRow[]) ?? []);
        setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 60_000);

    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => load(),
      )
      .subscribe();

    return () => {
      active = false;
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function markAsRead(id: string) {
    const supabase = createClient();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    await supabase.from("notifications").update({ read: true }).eq("id", id);
  }

  async function markAllAsRead() {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    const supabase = createClient();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="relative" />}
      >
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 size-5 justify-center rounded-full p-0 text-[10px]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between gap-2 px-1.5 py-1">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {loading ? (
            <p className="p-3 text-sm text-muted-foreground">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground">
              No notifications yet. Your first micro-quiz reminder will show up
              here.
            </p>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex flex-col items-start gap-0.5 whitespace-normal"
                onClick={() => !n.read && markAsRead(n.id)}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={
                      n.read ? "font-medium text-muted-foreground" : "font-medium"
                    }
                  >
                    {n.title}
                  </span>
                  {!n.read && (
                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{n.body}</span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
