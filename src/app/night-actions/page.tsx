"use client";

import { useEffect, useState } from "react";

interface Player {
  id: string;
  name: string;
  role: {
    id: string;
    name: string;
    team: string;
  };
}

interface NightAction {
  roleName: string;
  targetId: string;
}

type NightActionsMap = {
  [night: number]: NightAction[];
};

export default function NightActionsPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [nightActionsMap, setNightActionsMap] = useState<NightActionsMap>({});
  const [currentActions, setCurrentActions] = useState<NightAction[]>([]);
  const [nightNumber, setNightNumber] = useState(1);

  useEffect(() => {
    const assigned = localStorage.getItem("assignedPlayers");
    const storedMap = localStorage.getItem("nightActionsMap");
    const storedNight = parseInt(localStorage.getItem("nightNumber") || "1");

    if (assigned) setPlayers(JSON.parse(assigned));
    if (storedMap) setNightActionsMap(JSON.parse(storedMap));
    setNightNumber(storedNight);
  }, []);

  const handleActionChange = (roleName: string, targetId: string) => {
    const updated = [...currentActions];
    const existing = updated.find((a) => a.roleName === roleName);
    if (existing) {
      existing.targetId = targetId;
    } else {
      updated.push({ roleName, targetId });
    }
    setCurrentActions(updated);
  };

  const handleSubmit = () => {
    const validActions = currentActions.filter((a) => a.targetId);
    const updatedMap = {
      ...nightActionsMap,
      [nightNumber]: validActions,
    };

    localStorage.setItem("nightActionsMap", JSON.stringify(updatedMap));
    localStorage.setItem("nightNumber", String(nightNumber + 1));

    setNightActionsMap(updatedMap);
    setNightNumber(nightNumber + 1);
    setCurrentActions([]);
    alert("اقدامات شب ذخیره شد.");
  };

  const uniqueRoles = Array.from(new Set(players.map((p) => p.role.name)));

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">ثبت اقدامات شب</h1>

      <p className="mb-4 text-lg font-medium">شب {nightNumber}</p>

      <div className="space-y-4 mb-8">
        {uniqueRoles.map((roleName) => (
          <div key={roleName} className="bg-white p-4 rounded shadow">
            <label className="block mb-2 font-semibold">
              {roleName} روی چه کسی اقدام کرد؟
            </label>
            <select
              onChange={(e) => handleActionChange(roleName, e.target.value)}
              value={
                currentActions.find((a) => a.roleName === roleName)?.targetId ||
                ""
              }
              className="border p-2 rounded w-full"
            >
              <option value="">انتخاب بازیکن</option>
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        ذخیره اقدامات شب
      </button>

      {/* 👇 نمایش همه شب‌ها */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">خلاصه همه شب‌ها</h2>
        {Object.entries(nightActionsMap).map(([night, actions]) => (
          <div key={night} className="mb-6 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">شب {night}</h3>
            {actions.map((action, index) => {
              const actor = players.find(
                (p) => p.role.name === action.roleName
              );
              const target = players.find((p) => p.id === action.targetId);
              return (
                <p key={index} className="text-sm">
                  <span className="font-semibold">{action.roleName}</span>
                  {actor ? ` (${actor.name})` : ""} هدف قرار داد:{" "}
                  <span className="font-bold">{target?.name || "نامشخص"}</span>
                </p>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}
