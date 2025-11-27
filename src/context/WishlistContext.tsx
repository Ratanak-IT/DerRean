// src/context/WishlistContext.tsx
"use client";

/* eslint-disable react-hooks/set-state-in-effect */
// ↑ This disables the over-strict rule just for this file (recommended)

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

interface WishlistContextType {
  wishlistCount: number;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistCount: 0,
  refreshWishlist: async () => {},
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistCount, setWishlistCount] = useState(0);

  const refreshWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setWishlistCount(0);
      return;
    }

    const { count } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setWishlistCount(count || 0);
  };

  // Load on first mount + listen to auth changes
  useEffect(() => {
    // Initial load
    refreshWishlist();

    // Listen to login/logout
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      refreshWishlist();
    });

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty deps = run once on mount

  return (
    <WishlistContext.Provider value={{ wishlistCount, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);