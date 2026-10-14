import { useEffect } from "react";
import { useRouter } from "expo-router";
import { SplashScreen as ShelfSyncSplash } from "@/components/splash/splashScreen";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/(onboarding)");
    }, 2100);

    return () => clearTimeout(timeout);
  }, [router]);

  return <ShelfSyncSplash />;
}
