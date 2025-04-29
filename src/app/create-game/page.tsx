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
    <main className="min-h-screen p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">
        سلام {godName}، نقش‌ها و بازیکن‌ها رو وارد کن:
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">سناریو پیش‌فرض:</label>
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            const selected = presetScenarios.find(
              (s) => s.name === e.target.value
            );
            if (selected)
              setRoles(selected.roles.map((r) => ({ ...r, id: uuidv4() })));
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

      <h3 className="font-semibold mt-4 mb-2">نقش‌ها:</h3>
      <div className="space-y-2">
        {roles.map((role, index) => (
          <div key={role.id} className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="نام نقش"
              value={role.name}
              onChange={(e) => updateRole(index, "name", e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={role.team}
              onChange={(e) => updateRole(index, "team", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="mafia">مافیا</option>
              <option value="citizen">شهروند</option>
              <option value="independent">مستقل</option>
            </select>
            <button onClick={() => removeRole(index)} className="text-red-600">
              حذف
            </button>
          </div>
        ))}
        <button onClick={addRole} className="text-blue-600 mt-2">
          + نقش جدید
        </button>
      </div>

      <h3 className="font-semibold mt-6 mb-2">نام بازیکن‌ها:</h3>
      <div className="space-y-2">
        {players.map((player, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={player}
              onChange={(e) => updatePlayer(index, e.target.value)}
              placeholder={`بازیکن ${index + 1}`}
              className="border p-2 rounded w-64"
            />
            <button
              onClick={() => removePlayer(index)}
              className="text-red-500"
            >
              حذف
            </button>
          </div>
        ))}
        <button onClick={addPlayer} className="text-blue-600 mt-2">
          + بازیکن جدید
        </button>
      </div>

      <button
        onClick={handleAssignRoles}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        پخش نقش‌ها
      </button>
    </main>
  );
}
