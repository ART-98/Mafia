"use client";

import { useEffect, useState } from "react";
import SelectOptoin from "../components/select-option/SelectOptoin";
import ButtonComponent from "../components/button/Button";
import Timer from "../components/timer/Timer";

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
  const [selectedNight, setSelectedNight] = useState(1);
  const [starterId, setStarterId] = useState<string | null>(null);

  useEffect(() => {
    const assigned = localStorage.getItem("assignedPlayers");
    const storedMap = localStorage.getItem("nightActionsMap");
    const storedNight = parseInt(localStorage.getItem("nightNumber") || "1");
    const starter = localStorage.getItem("starterId");
    if (starter) {
      setStarterId(starter);
    }

    if (assigned) setPlayers(JSON.parse(assigned));
    if (storedMap) setNightActionsMap(JSON.parse(storedMap));
    setNightNumber(storedNight);
    setSelectedNight(storedNight);
  }, []);

  useEffect(() => {
    const actions = nightActionsMap[selectedNight] || [];
    setCurrentActions(actions);
  }, [selectedNight, nightActionsMap]);

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
      [selectedNight]: validActions,
    };

    localStorage.setItem("nightActionsMap", JSON.stringify(updatedMap));

    // Only update nightNumber if we just submitted the latest night
    if (selectedNight === nightNumber) {
      localStorage.setItem("nightNumber", String(nightNumber + 1));
      setNightNumber(nightNumber + 1);
    }

    setNightActionsMap(updatedMap);
    alert("اقدامات شب ذخیره شد.");
  };

  const handleStartNewNight = () => {
    // Prevent starting new night if current one hasn't been saved
    const currentNightSaved =
      nightActionsMap[nightNumber] && nightActionsMap[nightNumber].length > 0;

    if (!currentNightSaved) {
      alert(
        `برای شروع شب جدید، ابتدا اقدامات شب ${nightNumber} را ذخیره کنید.`
      );
      return;
    }

    const nextNight = nightNumber + 1;
    setNightNumber(nextNight);
    setSelectedNight(nextNight);
    setCurrentActions([]);
    localStorage.setItem("nightNumber", String(nextNight));
  };

  const uniqueRoles = Array.from(new Set(players.map((p) => p.role.name)));

  return (
    <div className="min-h-screen bg-secondary dark:bg-gray-700 text-primary dark:text-secondary transition-colors duration-300">
      <div className="mx-auto space-y-6">
        {starterId && (
          <div className="mb-4 text-green-700 dark:text-green-300 font-semibold">
            بازیکن شروع‌کننده :{" "}
            {players.find((p) => p.id === starterId)?.name || "نامشخص"}
          </div>
        )}
        <div className="bg-secondary dark:bg-gray-700 text-primary dark:text-secondary transition-colors duration-300">
          {/* timer sections */}

          <Timer />

          {/* Other sections */}
        </div>
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">ثبت اقدامات شب</h1>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: nightNumber }, (_, i) => i + 1).map((n) => (
              <ButtonComponent
                key={n}
                variant={n === selectedNight ? "primary" : "secondary"}
                onClick={() => setSelectedNight(n)}
              >
                شب {n}
              </ButtonComponent>
            ))}
            <ButtonComponent variant="primary" onClick={handleStartNewNight}>
              شروع شب جدید
            </ButtonComponent>
          </div>
        </header>

        {/* Role Action Inputs */}
        <div className="space-y-6">
          {uniqueRoles.map((roleName) => {
            const currentValue =
              currentActions.find((a) => a.roleName === roleName)?.targetId ||
              "";
            return (
              <div
                key={roleName}
                className="bg-secondary-dark dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                {players
                  .filter((p) => p.role.name === roleName)
                  .map((p) => (
                    <div key={p.id} className="mb-2">
                      <label className="block font-semibold mb-2">
                        {roleName} - ({p.name}) روی چه کسی اقدام کرد ؟
                      </label>
                      <SelectOptoin
                        value={currentValue}
                        onChange={(targetId) =>
                          handleActionChange(roleName, targetId)
                        }
                        options={[
                          { value: "", label: "انتخاب بازیکن" },
                          ...players.map((p) => ({
                            value: p.id,
                            label: `${p.name} - ${p.role.name} `,
                          })),
                        ]}
                      />
                    </div>
                  ))}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div>
          <ButtonComponent variant="primary" onClick={handleSubmit}>
            ذخیره اقدامات شب {selectedNight}
          </ButtonComponent>
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">خلاصه همه شب‌ها</h2>
          {Object.entries(nightActionsMap).map(([night, actions]) => (
            <div
              key={night}
              className="mb-6 bg-secondary-dark dark:bg-primary dark:text-secondary p-4 rounded-lg shadow space-y-2"
            >
              <h3 className="font-semibold text-lg">شب {night}</h3>
              {actions.map((action, index) => {
                const actor = players.find(
                  (p) => p.role.name === action.roleName
                );
                const target = players.find((p) => p.id === action.targetId);
                return (
                  <div key={index} className="text-sm flex gap-1 items-center">
                    <span className="font-semibold">{action.roleName}</span>
                    {actor ? ` (${actor.name})` : ""} هدف قرار داد :{" "}
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="currentColor"
                      className="mx-2"
                    >
                      <path
                        d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span className="font-bold">
                      {target?.name || "نامشخص"}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
