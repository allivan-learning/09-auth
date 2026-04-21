"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "red" }}>Щось пішло не так при фільтрації!</h2>
      <button
        onClick={() => reset()}
        style={{ padding: "8px 16px", marginTop: "10px", cursor: "pointer" }}
      >
        Спробувати знову
      </button>
    </div>
  );
}
