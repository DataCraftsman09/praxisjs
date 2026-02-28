import { Component, State } from "@verbose/decorators";
import { signal } from "@verbose/core";
import { BaseComponent } from "@verbose/core";
import type { VNode } from "@verbose/shared";

// A nested child component to show component tree depth
@Component()
class ChildCard extends BaseComponent {
  render(): VNode {
    const color = this._rawProps["color"] as string;
    const label = this._rawProps["label"] as string;

    return (
      <div
        style={{
          padding: "10px 14px",
          background: `${color}18`,
          border: `1px solid ${color}44`,
          borderRadius: "8px",
          fontSize: "12px",
          color: "#ccc",
        }}
      >
        <span style={{ color, fontWeight: "700" }}>◆</span> {label}
        <span
          style={{ color: "#555", marginLeft: "8px", fontFamily: "monospace" }}
        >
          &lt;ChildCard&gt;
        </span>
      </div>
    );
  }
}

// Track a globally-accessible signal to show in devtools Signals tab
export const mountCount = signal(0);

@Component()
export class MountDemo extends BaseComponent {
  @State() showA = true;
  @State() showB = true;
  @State() showC = false;

  onMount() {
    mountCount.update((n) => n + 1);
  }

  render(): VNode {
    return (
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Mount / Unmount Demo</h2>
        <p style={styles.hint}>
          Toggle child components — watch the Components tab update live
        </p>

        <div style={styles.toggleRow}>
          {(
            [
              { key: "showA", label: "Card A", color: "#FF6B6B" },
              { key: "showB", label: "Card B", color: "#FFD166" },
              { key: "showC", label: "Card C", color: "#06D6A0" },
            ] as const
          ).map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => {
                (this as unknown as Record<string, boolean>)[key] = !(
                  this as unknown as Record<string, boolean>
                )[key];
              }}
              style={() => ({
                ...styles.toggleBtn,
                background: (this as unknown as Record<string, boolean>)[key]
                  ? `${color}22`
                  : "rgba(255,255,255,0.04)",
                color: (this as unknown as Record<string, boolean>)[key]
                  ? color
                  : "#555",
                borderColor: (this as unknown as Record<string, boolean>)[key]
                  ? `${color}55`
                  : "rgba(255,255,255,0.08)",
              })}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={styles.childArea}>
          {() =>
            this.showA && (
              <ChildCard color="#FF6B6B" label="Card A is mounted" />
            )
          }
          {() =>
            this.showB && (
              <ChildCard color="#FFD166" label="Card B is mounted" />
            )
          }
          {() =>
            this.showC && (
              <ChildCard color="#06D6A0" label="Card C is mounted" />
            )
          }
        </div>

        <div style={styles.counter}>
          MountDemo mounted:{" "}
          <strong style={{ color: "#9D8CFF" }}>{() => mountCount()}</strong>x
        </div>
      </div>
    );
  }
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "20px",
  },
  cardTitle: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#e0e0e0",
  },
  hint: {
    margin: "0 0 16px",
    fontSize: "11px",
    color: "#666",
    fontFamily: "monospace",
  },
  toggleRow: { display: "flex", gap: "8px", marginBottom: "12px" },
  toggleBtn: {
    padding: "6px 14px",
    border: "1px solid",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.15s",
  },
  childArea: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    minHeight: "40px",
    marginBottom: "12px",
  },
  counter: { fontSize: "12px", color: "#666" },
};
