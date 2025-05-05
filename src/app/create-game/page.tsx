import { Suspense } from "react";
import CreateGameContent from "../components/create-game/CreateGameContent";
import Loader from "../components/loader/Loader";

export default function CreateGamePage() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateGameContent />
    </Suspense>
  );
}
