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
      { id: uuidv4(), name: "شهروند ساده", team: "شهروند" },
    ],
  },
  {
    name: "پیشرفته",
    roles: [
      { id: uuidv4(), name: "پدرخوانده", team: "مافیا" },
      { id: uuidv4(), name: "ماتادور", team: "مافیا" },
      { id: uuidv4(), name: "دکتر", team: "شهروند" },
      { id: uuidv4(), name: "کارآگاه", team: "شهروند" },
      { id: uuidv4(), name: "مظنون", team: "شهروند" },
      { id: uuidv4(), name: "لئون", team: "شهروند" },
      { id: uuidv4(), name: "شهروند ساده", team: "شهروند" },
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
    // 🟡 NEW: Select random starter
    const randomStarter = result[Math.floor(Math.random() * result.length)];

    // Save both assigned players and the starter ID
    localStorage.setItem("assignedPlayers", JSON.stringify(result));
    localStorage.setItem("starterId", randomStarter.id);
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


// "use client";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
// import ButtonComponent from "../../components/button/Button";
// import InputComponent from "../../components/input/Input";

// const teams = ["مافیا", "شهروند", "مستقل"];

// type Role = {
//   id: string;
//   name: string;
//   team: string;
//   selected: boolean;
// };

// const presetRoles: Role[] = [
//   { id: uuidv4(), name: "پدرخوانده", team: "مافیا", selected: true },
//   { id: uuidv4(), name: "مافیا ساده", team: "مافیا", selected: true },
//   { id: uuidv4(), name: "دکتر", team: "شهروند", selected: true },
//   { id: uuidv4(), name: "کارآگاه", team: "شهروند", selected: true },
//   { id: uuidv4(), name: "شهروند ساده", team: "شهروند", selected: true },
// ];

// export default function CreateGameContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const godName = searchParams.get("god") || "گاد";

//   const [roles, setRoles] = useState<Role[]>(presetRoles);
//   const [players, setPlayers] = useState<string[]>([""]);
//   const [newRoleName, setNewRoleName] = useState("");
//   const [newRoleTeam, setNewRoleTeam] = useState(teams[0]);

//   const toggleRole = (id: string) => {
//     setRoles((prev) =>
//       prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
//     );
//   };

//   const addCustomRole = () => {
//     if (!newRoleName.trim()) return;
//     setRoles([
//       ...roles,
//       {
//         id: uuidv4(),
//         name: newRoleName.trim(),
//         team: newRoleTeam,
//         selected: true,
//       },
//     ]);
//     setNewRoleName("");
//   };

//   const addPlayer = () => setPlayers([...players, ""]);
//   const updatePlayer = (index: number, name: string) => {
//     const updated = [...players];
//     updated[index] = name;
//     setPlayers(updated);
//   };
//   const removePlayer = (index: number) => {
//     const updated = [...players];
//     updated.splice(index, 1);
//     setPlayers(updated);
//   };

//   const handleAssign = () => {
//     const validPlayers = players.filter((p) => p.trim());
//     const selectedRoles = roles.filter((r) => r.selected);
//     if (validPlayers.length !== selectedRoles.length) {
//       alert("تعداد بازیکنان باید با تعداد نقش‌های انتخاب‌شده برابر باشد.");
//       return;
//     }

//     const shuffledRoles = [...selectedRoles].sort(() => Math.random() - 0.5);
//     const assigned = validPlayers.map((name, i) => ({
//       id: uuidv4(),
//       name,
//       role: shuffledRoles[i],
//     }));

//     const starter = assigned[Math.floor(Math.random() * assigned.length)];
//     localStorage.setItem("assignedPlayers", JSON.stringify(assigned));
//     localStorage.setItem("starterId", starter.id);
//     router.push("/reveal");
//   };

//   return (
//     <div className="min-h-screen p-6 bg-secondary text-dark dark:bg-gray-700 dark:text-light transition-colors duration-500">
//       <h2 className="text-xl font-bold mb-6 text-primary-dark dark:text-primary-light">
//         سلام {godName}، نقش‌ها و بازیکن‌ها رو وارد کن :
//       </h2>

//       {/* Roles By Team */}
//       <div className="mb-10">
//         {teams.map((team) => (
//           <div key={team} className="mb-6">
//             <h3 className="text-lg font-bold mb-2 text-primary dark:text-primary-light">
//               {team}
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {roles
//                 .filter((r) => r.team === team)
//                 .map((role) => (
//                   <button
//                     key={role.id}
//                     onClick={() => toggleRole(role.id)}
//                     className={`px-3 py-1 rounded-full border transition-all duration-300 text-sm ${
//                       role.selected
//                         ? "bg-primary text-white border-primary"
//                         : "bg-transparent text-primary border-primary hover:bg-primary/10"
//                     }`}
//                   >
//                     {role.name}
//                   </button>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Custom Role */}
//       <div className="mb-10">
//         <h3 className="font-semibold mb-2 text-primary dark:text-secondary-light">
//           نقش دلخواه :
//         </h3>
//         <div className="flex flex-wrap items-center gap-3">
//           <InputComponent
//             value={newRoleName}
//             onChange={(e) => setNewRoleName(e.target.value)}
//             placeholder="نام نقش جدید"
//             className="w-64"
//             labelStyle="bg-secondary dark:bg-gray-700"
//           />
//           <select
//             value={newRoleTeam}
//             onChange={(e) => setNewRoleTeam(e.target.value)}
//             className="px-3 py-2 border rounded-md bg-secondary dark:bg-gray-700"
//           >
//             {teams.map((team) => (
//               <option key={team} value={team}>
//                 {team}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={addCustomRole}
//             className="px-4 py-2 text-sm rounded-md border border-primary text-primary hover:bg-primary/10"
//           >
//             افزودن نقش
//           </button>
//         </div>
//       </div>

//       {/* Players */}
//       <div className="mb-10">
//         <h3 className="font-semibold mb-2 text-primary dark:text-secondary-light">
//           نام بازیکن‌ها:
//         </h3>
//         <div className="space-y-3">
//           {players.map((player, index) => (
//             <div key={index} className="flex flex-wrap items-center gap-3">
//               <InputComponent
//                 value={player}
//                 onChange={(e) => updatePlayer(index, e.target.value)}
//                 placeholder={`بازیکن ${index + 1}`}
//                 className="w-64"
//                 labelStyle="bg-secondary dark:bg-gray-700"
//               />
//               <button
//                 onClick={() => removePlayer(index)}
//                 className="text-error hover:text-error"
//               >
//                 حذف
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={addPlayer}
//             className="text-primary dark:text-secondary hover:underline border px-2 py-1 rounded-md"
//           >
//             + بازیکن جدید
//           </button>
//         </div>
//       </div>

//       {/* Submit */}
//       <ButtonComponent onClick={handleAssign} variant="primary">
//         پخش نقش‌ها
//       </ButtonComponent>
//     </div>
//   );
// }
