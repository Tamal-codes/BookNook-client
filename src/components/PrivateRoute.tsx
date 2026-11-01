"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isPending, session, router, pathname]);

    if (isPending || !session?.user) {
        return (
            <div className="flex justify-center py-24">
                <div className="size-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
            </div>
        );
    }

    return <>{children}</>;
};

export default PrivateRoute;