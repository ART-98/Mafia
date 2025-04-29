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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold mb-2">ثبت اقدامات شب</h1>
          <p className="text-lg font-medium">شب {nightNumber}</p>
        </header>

        {/* Input Section */}
        <div className="space-y-6">
          {uniqueRoles.map((roleName) => (
            <div
              key={roleName}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <label className="block mb-2 font-semibold">
                {roleName} روی چه کسی اقدام کرد؟
              </label>
              <select
                onChange={(e) => handleActionChange(roleName, e.target.value)}
                value={
                  currentActions.find((a) => a.roleName === roleName)
                    ?.targetId || ""
                }
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
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

        {/* Submit Button */}
        <div>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-medium px-6 py-3 rounded shadow transition"
          >
            ذخیره اقدامات شب
          </button>
        </div>

        {/* Summary Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">خلاصه همه شب‌ها</h2>
          {Object.entries(nightActionsMap).map(([night, actions]) => (
            <div
              key={night}
              className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2"
            >
              <h3 className="font-semibold text-lg">شب {night}</h3>
              {actions.map((action, index) => {
                const actor = players.find(
                  (p) => p.role.name === action.roleName
                );
                const target = players.find((p) => p.id === action.targetId);
                return (
                  <p key={index} className="text-sm">
                    <span className="font-semibold">{action.roleName}</span>
                    {actor ? ` (${actor.name})` : ""} هدف قرار داد:{" "}
                    <span className="font-bold">
                      {target?.name || "نامشخص"}
                    </span>
                  </p>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
