// ./app/page.tsx
import ClientComponent from "../../../components/conversation_components/ClientComponent";
import { fetchAccessToken } from "@humeai/voice";

export default async function Page() {
  const accessToken = await fetchAccessToken({
    // apiKey: String(process.env.HUME_API_KEY),
    // secretKey: String(process.env.HUME_SECRET_KEY),
    apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY,
    secretKey: process.env.NEXT_PUBLIC_HUME_SECRET_KEY,
  });

  if (!accessToken) {
    throw new Error();
  }

  return <ClientComponent accessToken={accessToken} />;
}
