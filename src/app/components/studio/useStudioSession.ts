"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/app/lib/supabase-browser";
import type { AppRole } from "@/app/lib/studio-types";

export function useStudioSession() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadRole = async (userId: string) => {
      try {
        const { data, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .maybeSingle();

        if (!active) {
          return;
        }

        if (roleError) {
          console.warn("[studio] failed to load role, falling back to user", roleError);
          setRole("user");
          return;
        }

        setRole((data?.role ?? "user") as AppRole);
      } catch (caughtError) {
        if (!active) {
          return;
        }

        console.warn("[studio] unexpected role lookup failure, falling back to user", caughtError);
        setRole("user");
      }
    };

    const hydrate = async () => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!active) {
          return;
        }

        setUser(currentUser);
        setRole(currentUser ? null : null);
        setLoading(false);

        if (currentUser) {
          void loadRole(currentUser.id);
        }
      } catch (caughtError) {
        if (!active) {
          return;
        }

        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Studio 세션 정보를 가져오지 못했습니다.";
        setError(message);
        setLoading(false);
      }
    };

    void hydrate();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) {
        return;
      }

      setError(null);
      setUser(session?.user ?? null);
      setRole(session?.user ? null : null);
      setLoading(false);

      if (session?.user) {
        void loadRole(session.user.id);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return {
    supabase,
    user,
    role,
    isAdmin: role === "admin",
    loading,
    error,
  };
}
