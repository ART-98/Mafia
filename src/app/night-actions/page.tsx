// app/night-actions/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Action {
  id: string;
  actor: string;
  action: string;
  target: string;
}

export default function NightActionsPage() {
  const [actor, setActor] = useState("");
  const [action, setAction] = useState("");
  const [target, setTarget] = useState("");
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("nightActions");
    if (stored) {
      setActions(JSON.parse(stored));
    }
  }, []);

  const handleAddAction = () => {
    if (!actor.trim() || !action.trim() || !target.trim()) return;

    const newAction: Action = {
      id: crypto.randomUUID(),
      actor,
      action,
      target,
    };
    const updated = [...actions, newAction];
    setActions(updated);
    localStorage.setItem("nightActions", JSON.stringify(updated));

    // Reset form
    setActor("");
    setAction("");
    setTarget("");
  };

  const handleRemoveAction = (id: string) => {
    const updated = actions.filter((a) => a.id !== id);
    setActions(updated);
    localStorage.setItem("nightActions", JSON.stringify(updated));
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ثبت اعمال شب</h1>

      <div className="space-y-4">
        <input
          type="text"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          placeholder="نام نقش (مثلا دکتر)"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="عمل انجام شده (مثلا محافظت کرد از)"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="هدف (مثلا علی)"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAddAction}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          ثبت عمل
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">لیست اعمال ثبت شده:</h2>
        {actions.length === 0 ? (
          <p>هنوز عملی ثبت نشده.</p>
        ) : (
          <ul className="space-y-2">
            {actions.map((a,index) => (
              <li
                key={index}
                className="flex items-center justify-between border p-2 rounded"
              >
                <span>
                  {a.actor} {a.action} {a.target}
                </span>
                <button
                  onClick={() => handleRemoveAction(a.id)}
                  className="text-red-500 hover:underline"
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
