import { signal, computed, effect, batch } from "@verbose/core";
import type { VNode } from "@verbose/shared";

export function SignalDemo(): VNode {
  const temperature = signal(22);
  const unit = signal<"C" | "F">("C");

  const converted = computed(() => {
    return unit() === "F"
      ? Math.round((temperature() * 9) / 5 + 32)
      : temperature();
  });

  const tempLabel = computed(() => `${converted()}° ${unit()}`);

  const history = signal<number[]>([22]);

  effect(() => {
    const t = temperature();
    history.update((prev) => [...prev.slice(-9), t]);
  });

  return (
    <div style={card}>
      <h2 style={title}>Functional Component + Signals</h2>
      <p style={hint}>module-level signals · computed chain · effect · batch</p>

      <div style={{ marginBottom: "16px" }}>
        <span style={tempValue}>{() => tempLabel()}</span>
      </div>

      <div style={row}>
        <button style={btn} onClick={() => temperature.update((t) => t - 1)}>
          −1°
        </button>
        <button style={btn} onClick={() => temperature.update((t) => t + 1)}>
          +1°
        </button>
        <button
          style={btnYellow}
          onClick={() =>
            batch(() => {
              temperature.set(20);
              unit.set("C");
            })
          }
        >
          batch reset
        </button>
        <button
          style={btnPurple}
          onClick={() => unit.update((u) => (u === "C" ? "F" : "C"))}
        >
          {() => `→ °${unit() === "C" ? "F" : "C"}`}
        </button>
      </div>

      <div>
        <span style={sectionLabel}>last 10 readings</span>
        <div style={histRow}>
          {() =>
            history().map((v, i) => (
              <span
                key={String(i)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#e0e0e0",
                  fontFamily: "monospace",
                  opacity: String(
                    0.3 + (i / Math.max(history().length - 1, 1)) * 0.7,
                  ),
                  background:
                    i === history().length - 1
                      ? "rgba(108,99,255,0.3)"
                      : "rgba(255,255,255,0.06)",
                }}
              >
                {String(v)}
              </span>
            ))
          }
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "20px",
};
const title = {
  margin: "0 0 4px",
  fontSize: "15px",
  fontWeight: "700",
  color: "#e0e0e0",
};
const hint = {
  margin: "0 0 16px",
  fontSize: "11px",
  color: "#555",
  fontFamily: "monospace",
};
const tempValue = {
  fontSize: "52px",
  fontWeight: "800",
  color: "#FFD166",
  lineHeight: "1",
};
const row = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap" as const,
  marginBottom: "16px",
};
const btn = {
  padding: "7px 14px",
  background: "rgba(255,255,255,0.08)",
  color: "#e0e0e0",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
};
const btnYellow = {
  padding: "7px 14px",
  background: "rgba(255,209,102,0.12)",
  color: "#FFD166",
  border: "1px solid rgba(255,209,102,0.3)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
};
const btnPurple = {
  padding: "7px 14px",
  background: "rgba(108,99,255,0.15)",
  color: "#9D8CFF",
  border: "1px solid rgba(108,99,255,0.3)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
};
const sectionLabel = {
  display: "block",
  color: "#666",
  fontSize: "11px",
  marginBottom: "8px",
};
const histRow = { display: "flex", gap: "4px", flexWrap: "wrap" as const };
