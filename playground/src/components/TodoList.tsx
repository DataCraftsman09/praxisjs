import { Component, State } from "@verbose/decorators";
import { signal, computed, BaseComponent } from "@verbose/core";
import type { VNode } from "@verbose/shared";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type Filter = "all" | "active" | "done";

@Component()
export class TodoList extends BaseComponent {
  @State() todos: Todo[] = [
    { id: 1, text: "Build a reactive framework", done: true },
    { id: 2, text: "Write devtools", done: false },
    { id: 3, text: "Test everything", done: false },
  ];

  @State() draft = "";

  @State() filter: Filter = "all";

  visible = computed(() => {
    const f = this.filter;
    const list = this.todos;
    if (f === "done") return list.filter((t) => t.done);
    if (f === "active") return list.filter((t) => !t.done);
    return list;
  });

  remaining = computed(() => this.todos.filter((t) => !t.done).length);

  private nextId = 4;

  add() {
    const text = this.draft.trim();
    if (!text) return;
    this.todos = [...this.todos, { id: this.nextId++, text, done: false }];
    this.draft = "";
  }

  toggle(id: number) {
    this.todos = this.todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
  }

  remove(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  render(): VNode {
    return (
      <div style={card}>
        <h2 style={title}>Todo List</h2>
        <p style={hint}>class component · @State · signal · computed</p>

        <div style={addRow}>
          <input
            value={this.draft}
            onInput={(e: Event) => {
              this.draft = (e.target as HTMLInputElement).value;
            }}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === "Enter") this.add();
            }}
            placeholder="New todo…"
            style={textInput}
          />
          <button onClick={() => this.add()} style={addBtn}>
            Add
          </button>
        </div>

        <div style={filterRow}>
          {(["all", "active", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => (this.filter = f)}
              style={() => ({
                ...filterBtn,
                ...(this.filter === f
                  ? {
                      background: "rgba(108,99,255,0.2)",
                      color: "#9D8CFF",
                      borderColor: "rgba(108,99,255,0.3)",
                    }
                  : {}),
              })}
            >
              {f}
            </button>
          ))}
          <span style={remaining}>{() => String(this.remaining())} left</span>
        </div>

        <ul style={list}>
          {() =>
            this.visible().map((todo) => (
              <li key={String(todo.id)} style={item}>
                <button
                  onClick={() => this.toggle(todo.id)}
                  style={
                    todo.done
                      ? {
                          ...check,
                          background: "rgba(108,99,255,0.3)",
                          borderColor: "#6C63FF",
                        }
                      : check
                  }
                >
                  {todo.done ? "✓" : ""}
                </button>
                <span
                  style={
                    todo.done
                      ? {
                          ...itemText,
                          color: "#555",
                          textDecoration: "line-through",
                        }
                      : itemText
                  }
                >
                  {todo.text}
                </span>
                <button onClick={() => this.remove(todo.id)} style={removeBtn}>
                  ×
                </button>
              </li>
            ))
          }
        </ul>
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
const addRow = { display: "flex", gap: "8px", marginBottom: "12px" };
const textInput = {
  flex: "1",
  padding: "8px 12px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#e0e0e0",
  fontSize: "13px",
};
const addBtn = {
  padding: "8px 16px",
  background: "#6C63FF",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};
const filterRow = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginBottom: "12px",
};
const filterBtn = {
  padding: "4px 10px",
  background: "transparent",
  color: "#666",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: "600",
};
const remaining = { marginLeft: "auto", color: "#666", fontSize: "11px" };
const list = {
  listStyle: "none",
  padding: "0",
  margin: "0",
  display: "flex",
  flexDirection: "column" as const,
  gap: "4px",
};
const item = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 8px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.02)",
};
const check = {
  width: "20px",
  height: "20px",
  borderRadius: "6px",
  border: "1.5px solid rgba(255,255,255,0.2)",
  background: "transparent",
  cursor: "pointer",
  color: "#6C63FF",
  fontWeight: "700",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: "0",
};
const itemText = { flex: "1", fontSize: "13px", color: "#e0e0e0" };
const removeBtn = {
  background: "none",
  border: "none",
  color: "#555",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: "1",
  padding: "0 2px",
};
