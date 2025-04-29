"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const presetScenarios = [
  {
    name: "ساده",
    roles: [
      { id: uuidv4(), name: "پدرخوانده", team: "mafia" },
      { id: uuidv4(), name: "دکتر", team: "citizen" },
      { id: uuidv4(), name: "کارآگاه", team: "citizen" },
      { id: uuidv4(), name: "مافیا ساده", team: "mafia" },
    ],
  },
  {
    name: "پیشرفته",
    roles: [
      { id: uuidv4(), name: "پدرخوانده", team: "mafia" },
      { id: uuidv4(), name: "ناتاشا", team: "mafia" },
      { id: uuidv4(), name: "دکتر", team: "citizen" },
      { id: uuidv4(), name: "کارآگاه", team: "citizen" },
      { id: uuidv4(), name: "روانشناس", team: "citizen" },
      { id: uuidv4(), name: "تک‌تیرانداز", team: "independent" },
    ],
  },
];

export default function CreateGamePage() {
  const searchParams = useSearchParams();
  const godName = searchParams.get("god") || "گاد";
  const router = useRouter();

  const [roles, setRoles] = useState(presetScenarios[0].roles);
  const [players, setPlayers] = useState<string[]>([""]);

  const addRole = () => {
    setRoles([...roles, { id: uuidv4(), name: "", team: "citizen" }]);
  };

  const updateRole = (index: number, field: "name" | "team", value: string) => {
    const updated = [...roles];
    updated[index][field] = value;
    setRoles(updated);
  };

  const removeRole = (index: number) => {
    const updated = [...roles];
    updated.splice(index, 1);
    setRoles(updated);
  };

  const addPlayer = () => setPlayers([...players, ""]);
  const updatePlayer = (index: number, name: string) => {
    const updated = [...players];
    updated[index] = name;
    setPlayers(updated);
  };
  const removePlayer = (index: number) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  const handleAssignRoles = () => {
    const validPlayers = players.filter((p) => p.trim());
    if (validPlayers.length !== roles.length) {
      alert("تعداد بازیکنان باید با تعداد نقش‌ها برابر باشد.");
      return;
    }
    const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);
    const result = validPlayers.map((name, index) => ({
      id: uuidv4(),
      name,
      role: shuffledRoles[index],
    }));
    localStorage.setItem("assignedPlayers", JSON.stringify(result));
    router.push("/reveal");
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <h2 className="text-2xl font-bold mb-6">
        سلام {godName}، نقش‌ها و بازیکن‌ها رو وارد کن:
      </h2>

      {/* Scenario Picker */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">سناریو پیش‌فرض:</label>
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          onChange={(e) => {
            const selected = presetScenarios.find(
              (s) => s.name === e.target.value
            );
            if (selected) {
              setRoles(selected.roles.map((r) => ({ ...r, id: uuidv4() })));
            }
          }}
        >
          {presetScenarios.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="custom">سناریو دلخواه</option>
        </select>
      </div>

      {/* Roles Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">نقش‌ها:</h3>
        <div className="space-y-3">
          {roles.map((role, index) => (
            <div key={role.id} className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="نام نقش"
                value={role.name}
                onChange={(e) => updateRole(index, "name", e.target.value)}
                className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <select
                value={role.team}
                onChange={(e) => updateRole(index, "team", e.target.value)}
                className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="mafia">مافیا</option>
                <option value="citizen">شهروند</option>
                <option value="independent">مستقل</option>
              </select>
              <button
                onClick={() => removeRole(index)}
                className="text-red-500 hover:text-red-700"
              >
                حذف
              </button>
            </div>
          ))}
          <button onClick={addRole} className="text-blue-600 hover:underline">
            + نقش جدید
          </button>
        </div>
      </div>

      {/* Players Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">نام بازیکن‌ها:</h3>
        <div className="space-y-3">
          {players.map((player, index) => (
            <div key={index} className="flex flex-wrap items-center gap-3">
              <input
                value={player}
                onChange={(e) => updatePlayer(index, e.target.value)}
                placeholder={`بازیکن ${index + 1}`}
                className="w-64 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={() => removePlayer(index)}
                className="text-red-500 hover:text-red-700"
              >
                حذف
              </button>
            </div>
          ))}
          <button onClick={addPlayer} className="text-blue-600 hover:underline">
            + بازیکن جدید
          </button>
        </div>
      </div>

      {/* Assign Button */}
      <button
        onClick={handleAssignRoles}
        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition-colors duration-300"
      >
        پخش نقش‌ها
      </button>
    </div>
  );
}
