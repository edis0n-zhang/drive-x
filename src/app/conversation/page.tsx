// ./app/page.tsx
import ClientComponent from "../../../components/conversation_components/ClientComponent";
import { fetchAccessToken } from "@humeai/voice";

export default async function Page() {
  const accessToken = await fetchAccessToken({
    // apiKey: String(process.env.HUME_API_KEY),
    // secretKey: String(process.env.HUME_SECRET_KEY),
    apiKey: "Tb5eXoL9OAg2sNZkc7xoGoAyvYgPUB3BPTDNJcH51OBFuziV",
    secretKey:
      "cAXq6DE2G2snJSwoDy93W4bdZETkfRieKAxKr10RrkRoAlYz5k2LvdsevC4PYt8N",
  });

  if (!accessToken) {
    throw new Error();
  }

  return <ClientComponent accessToken={accessToken} />;
}
