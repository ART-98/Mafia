import { Suspense } from "react";
import CreateGameContent from "../components/create-game/CreateGameContent";

export default function CreateGamePage() {
  return (
    <Suspense fallback={<div className="p-6">در حال بارگذاری...</div>}>
      <CreateGameContent />
    </Suspense>
  );
}
