"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function setSectionComplete(sectionId: string, completed: boolean) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return { error: "Not authenticated." };

  if (completed) {
    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: user.id,
        section_id: sectionId,
        lesson_id: "overview",
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,section_id,lesson_id" },
    );
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("user_progress")
      .delete()
      .eq("user_id", user.id)
      .eq("section_id", sectionId)
      .eq("lesson_id", "overview");
    if (error) return { error: error.message };
  }

  revalidatePath("/modules");
  revalidatePath(`/modules/${sectionId}`);
  revalidatePath("/dashboard");
}
