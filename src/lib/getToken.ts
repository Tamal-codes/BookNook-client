import { authClient } from "@/lib/auth-client";

export async function getToken() {
  const { data } = await authClient.token();
  return data?.token ?? "";
}