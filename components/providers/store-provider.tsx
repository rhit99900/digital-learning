'use client';

import { useRef } from "react";
import { AppStore, makeStore } from "@/utils/state/store";
import { Provider } from 'react-redux';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null);
  if(!storeRef.current) {
    // Create a store instance, incase an existing store isn't already available.
    storeRef.current = makeStore();    
  }

  return (
    <Provider store={storeRef.current}>{children}</Provider>
  )
}