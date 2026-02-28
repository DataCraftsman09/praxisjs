import { Component, Prop, Slot, State, Watch } from "@verbose/decorators";
import { computed, BaseComponent } from "@verbose/core";
import type { Children, VNode } from "@verbose/shared";
import { Debug, Trace } from "@verbose/devtools";

@Trace()
@Component()
export class Counter extends BaseComponent {
  @Slot() default!: Children;
  @Prop() counterTitle = "Counter New";
  @State() count = 0;
  @State() step = 1;

  @Debug()
  doubled = computed(() => this.count * 2);

  @Watch("count", "doubled")
  printLog(vars: any) {
    console.log(vars);
  }

  @Debug()
  increment() {
    this.count += this.step;
  }
  decrement() {
    this.count -= this.step;
  }
  reset() {
    this.count = 0;
  }

  render(): VNode {
    return (
      <div style={card}>
        <h2 style={title}>Counter ({this.counterTitle})</h2>
        <div>content:</div>
        <p style={hint}>
          signals: count, step · computed: {() => this.doubled()}
        </p>

        <div style={valueRow}>
          <span style={bigNum}>{() => this.count}</span>
          <span style={badge}>
            {() => (this.count % 2 === 0 ? "even" : "odd")}
          </span>
        </div>

        <div style={row}>
          <button style={btnSec} onClick={() => this.decrement()}>
            −
          </button>
          <button style={btnPri} onClick={() => this.increment()}>
            +
          </button>
          <button style={btnGhost} onClick={() => this.reset()}>
            reset
          </button>
        </div>

        <div style={row}>
          <span style={label}>step</span>
          <input
            type="number"
            value={String(this.step)}
            onInput={(e: Event) => {
              const v = parseInt((e.target as HTMLInputElement).value, 10);
              if (!isNaN(v)) this.step = v;
            }}
            style={numInput}
          />
          <span style={chip}>doubled: {() => this.doubled()}</span>
        </div>
      </div>
    );
  }
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
const valueRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px",
};
const bigNum = {
  fontSize: "48px",
  fontWeight: "800",
  color: "#9D8CFF",
  lineHeight: "1",
};
const badge = {
  background: "rgba(108,99,255,0.2)",
  color: "#9D8CFF",
  borderRadius: "6px",
  padding: "2px 8px",
  fontSize: "12px",
  fontWeight: "600",
};
const row = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
};
const btnPri = {
  padding: "8px 20px",
  background: "#6C63FF",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
};
const btnSec = {
  padding: "8px 20px",
  background: "rgba(255,255,255,0.08)",
  color: "#e0e0e0",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
};
const btnGhost = {
  padding: "8px 14px",
  background: "transparent",
  color: "#666",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
};
const label = { color: "#888", fontSize: "12px" };
const numInput = {
  width: "60px",
  padding: "4px 8px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  color: "#e0e0e0",
  fontSize: "13px",
};
const chip = {
  background: "rgba(152,216,168,0.1)",
  color: "#98D8A8",
  borderRadius: "6px",
  padding: "4px 10px",
  fontSize: "12px",
};
