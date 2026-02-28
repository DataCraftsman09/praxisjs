import { render } from "@verbose/runtime";
import { signal, computed } from "@verbose/core";
import { DevTools } from "@verbose/devtools";

import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import { SignalDemo } from "./components/SignalDemo";
import { MountDemo } from "./components/MountDemo";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0d0d12",
    color: "#e0e0e0",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  header: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(13,13,18,0.9)",
    backdropFilter: "blur(12px)",
    position: "sticky" as const,
    top: "0",
    zIndex: "100",
  },
  headerInner: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap" as const,
  },
  logo: { display: "flex", alignItems: "center", gap: "8px" },
  logoBracket: { color: "#6C63FF", fontSize: "18px" },
  logoText: { fontWeight: "800", fontSize: "16px", letterSpacing: "-0.02em" },
  devtoolsBadge: {
    background: "rgba(108,99,255,0.15)",
    color: "#9D8CFF",
    border: "1px solid rgba(108,99,255,0.3)",
    borderRadius: "20px",
    padding: "2px 10px",
    fontSize: "11px",
    fontWeight: "600",
  },
  nav: { display: "flex", gap: "4px" },
  navBtn: {
    padding: "5px 12px",
    background: "transparent",
    color: "#666",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
  },
  navBtnActive: {
    background: "rgba(108,99,255,0.2)",
    color: "#9D8CFF",
    borderColor: "rgba(108,99,255,0.4)",
  },
  hint: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#555",
  },
  hintArrow: { fontSize: "16px" },
  main: { maxWidth: "960px", margin: "0 auto", padding: "32px 24px" },
  pageTitle: { marginBottom: "24px" },
  h1: {
    margin: "0 0 6px",
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },
  subtitle: { margin: "0", color: "#666", fontSize: "13px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "16px",
  },
  footer: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "12px",
    color: "#555",
  },
  footerCode: {
    background: "rgba(255,255,255,0.05)",
    padding: "2px 8px",
    borderRadius: "4px",
    fontFamily: "monospace",
    color: "#888",
  },
  footerSep: { color: "#333" },
  footerText: {},
  themeBtn: {
    marginLeft: "auto",
    padding: "4px 12px",
    background: "transparent",
    color: "#555",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "11px",
  },
};

// App-level signals — visible in the devtools Signals tab
const theme = signal<"dark" | "light">("dark");
const activeSection = signal("all");

const sections = ["all", "counter", "todo", "signals", "mount"] as const;
const sectionLabel = computed(() => {
  const s = activeSection();
  return s === "all" ? "All demos" : s.charAt(0).toUpperCase() + s.slice(1);
});

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <div style={styles.logo}>
          <span style={styles.logoBracket}>▲</span>
          <span style={styles.logoText}>verbose</span>
          <span style={styles.devtoolsBadge}>devtools test</span>
        </div>

        <nav style={styles.nav}>
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => activeSection.set(s)}
              style={() => ({
                ...styles.navBtn,
                ...(activeSection() === s ? styles.navBtnActive : {}),
              })}
            >
              {s}
            </button>
          ))}
        </nav>

        <div style={styles.hint}>
          <span style={styles.hintArrow}>↘</span>
          <span>
            Open the <strong style={{ color: "#9D8CFF" }}>▲</strong> devtools
            panel
          </span>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <div style={styles.app}>
      <Header />

      <main style={styles.main}>
        <div style={styles.pageTitle}>
          <h1 style={styles.h1}>{() => sectionLabel()}</h1>
          <p style={styles.subtitle}>
            Interact with the components below and watch the devtools panel
            update in real time.
          </p>
        </div>

        <div style={styles.grid}>
          {() =>
            (activeSection() === "all" || activeSection() === "counter") && (
              <Counter>
                <div>testse</div>
                <div>terwtwewe</div>
              </Counter>
            )
          }
          {() =>
            (activeSection() === "all" || activeSection() === "signals") && (
              <SignalDemo />
            )
          }
          {() =>
            (activeSection() === "all" || activeSection() === "todo") && (
              <TodoList />
            )
          }
          {() =>
            (activeSection() === "all" || activeSection() === "mount") && (
              <MountDemo />
            )
          }
        </div>

        <footer style={styles.footer}>
          <code style={styles.footerCode}>@verbose/devtools v0.1.0</code>
          <span style={styles.footerSep}>·</span>
          <span style={styles.footerText}>{() => `Theme: ${theme()}`}</span>
          <button
            style={styles.themeBtn}
            onClick={() =>
              theme.update((t) => (t === "dark" ? "light" : "dark"))
            }
          >
            Toggle theme signal
          </button>
        </footer>
      </main>
    </div>
  );
}

render(<App />, document.getElementById("app")!);

if (import.meta.env.DEV) {
  DevTools.init();
}
