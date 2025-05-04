"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import InputComponent from "../../components/input/Input"; // Updated import
import ButtonComponent from "../../components/button/Button";
import SelectOption from "../../components/select-option/SelectOptoin";

const presetScenarios = [
  {
    name: "ساده",
    roles: [
      { id: uuidv4(), name: "پدرخوانده", team: "مافیا" },
      { id: uuidv4(), name: "دکتر", team: "شهروند" },
      { id: uuidv4(), name: "کارآگاه", team: "شهروند" },
      { id: uuidv4(), name: "مافیا ساده", team: "مافیا" },
    ],
  },
  {
    name: "پیشرفته",
    roles: [
      { id: uuidv4(), name: "پدرخوانده", team: "مافیا" },
      { id: uuidv4(), name: "ناتاشا", team: "مافیا" },
      { id: uuidv4(), name: "دکتر", team: "شهروند" },
      { id: uuidv4(), name: "کارآگاه", team: "شهروند" },
      { id: uuidv4(), name: "روانشناس", team: "شهروند" },
      { id: uuidv4(), name: "تک‌تیرانداز", team: "مستقل" },
    ],
  },
];

export default function CreateGameContent() {
  const searchParams = useSearchParams();
  const godName = searchParams.get("god") || "گاد";
  const router = useRouter();

  const [roles, setRoles] = useState(presetScenarios[0].roles);
  const [players, setPlayers] = useState<string[]>([""]);

  const addRole = () => {
    setRoles([...roles, { id: uuidv4(), name: "", team: "شهروند" }]);
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
    <div className="min-h-screen p-6 bg-secondary text-dark dark:bg-gray-700 dark:text-light transition-colors duration-500">
      <h2 className="text-xl font-bold mb-6 text-primary-dark dark:text-primary-light">
        سلام {godName}، نقش‌ها و بازیکن‌ها رو وارد کن :
      </h2>

      {/* Scenario Picker */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-primary dark:text-secondary-light">
          سناریو پیش‌فرض :
        </label>
        <SelectOption
          value={presetScenarios[0].name}
          options={presetScenarios.map((s) => ({
            label: s.name,
            value: s.name,
          }))}
          onChange={(value) => {
            const selected = presetScenarios.find((s) => s.name === value);
            if (selected) {
              setRoles(selected.roles.map((r) => ({ ...r, id: uuidv4() })));
            }
          }}
          placeholder="انتخاب سناریو"
        />
        <div className="text-right mt-2 text-sm text-primary dark:text-secondary-light">
          یا سناریو دلخواه
        </div>
      </div>

      {/* Roles Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3 text-primary dark:text-secondary-light">
          نقش‌ها :
        </h3>
        <div className="space-y-5">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className="relative p-4 border border-primary-light rounded-md"
            >
              {/* Trash Icon Button */}
              <button
                onClick={() => removeRole(index)}
                className="absolute -top-2 -left-2 text-primary z-1 border-2 border-primary rounded-full size-8 flex justify-center items-center hover:scale-110 duration-500 transition-all"
                aria-label="حذف نقش"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9H20Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>

              {/* Inputs */}
              <div className="flex flex-wrap items-center gap-3">
                <InputComponent
                  value={role.name}
                  onChange={(e) => updateRole(index, "name", e.target.value)}
                  placeholder="نام نقش"
                  className="flex-1"
                  labelStyle="dark:bg-gray-700 bg-secondary"
                />
                <SelectOption
                  value={role.team}
                  options={[
                    { label: "مافیا", value: "مافیا" },
                    { label: "شهروند", value: "شهروند" },
                    { label: "مستقل", value: "مستقل" },
                  ]}
                  onChange={(value) => updateRole(index, "team", value)}
                  placeholder="انتخاب تیم"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addRole}
            className="text-primary dark:text-secondary hover:underline border px-2 py-1 rounded-md"
          >
            + نقش جدید
          </button>
        </div>
      </div>

      {/* Players Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3 text-primary dark:text-secondary-light">
          نام بازیکن‌ها:
        </h3>
        <div className="space-y-3">
          {players.map((player, index) => (
            <div key={index} className="flex flex-wrap items-center gap-3">
              <InputComponent
                value={player}
                onChange={(e) => updatePlayer(index, e.target.value)}
                placeholder={`بازیکن ${index + 1}`}
                className="w-64"
                labelStyle="dark:bg-gray-700 bg-secondary"
              />
              <button
                onClick={() => removePlayer(index)}
                className="text-error hover:text-error"
              >
                حذف
              </button>
            </div>
          ))}
          <button
            onClick={addPlayer}
            className="text-primary dark:text-secondary hover:underline border px-2 py-1 rounded-md"
          >
            + بازیکن جدید
          </button>
        </div>
      </div>

      {/* Assign Button */}
      <ButtonComponent onClick={handleAssignRoles} variant="primary">
        پخش نقش‌ها
      </ButtonComponent>
    </div>
  );
}
