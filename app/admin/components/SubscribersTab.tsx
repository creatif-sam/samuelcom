"use client";

import { Trash2 } from "lucide-react";
import type { Subscriber } from "./types";

export function SubscribersTab({ subs, onDelete }: { 
  subs: Subscriber[]; 
  onDelete: (id: string, email: string) => void 
}) {
  return (
    <>
      <div className="adm-header">
        <div><div className="adm-page-title">Newsletter</div><p className="adm-page-sub">{subs.length} subscriber{subs.length !== 1 ? "s" : ""}</p></div>
      </div>
      {subs.length === 0 ? <p className="adm-empty">No subscribers yet.</p> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Email</th><th>Name</th><th>Interests</th><th>Confirmed</th><th>Joined</th><th></th></tr></thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id}>
                  <td style={{ color: "#f0ece4" }}>{s.email}</td>
                  <td>{s.name ?? "—"}</td>
                  <td style={{ maxWidth: 220 }}>
                    {s.interests && s.interests.length > 0
                      ? s.interests.map((i) => (
                          <span key={i} className="adm-badge adm-badge--draft" style={{ marginRight: 4, marginBottom: 2, display: "inline-block", textTransform: "capitalize" }}>
                            {i.replace(/_/g, " ")}
                          </span>
                        ))
                      : <span style={{ color: "rgba(245,243,239,0.3)" }}>—</span>}
                  </td>
                  <td><span className={`adm-badge ${s.confirmed ? "adm-badge--published" : "adm-badge--draft"}`}>{s.confirmed ? "Yes" : "Pending"}</span></td>
                  <td>{new Date(s.created_at).toLocaleDateString("en-GB")}</td>
                  <td><button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => onDelete(s.id, s.email)}><Trash2 size={9} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
