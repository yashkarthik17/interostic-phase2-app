"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
  FormInput,
} from "@/components/ui/shell";
import { Calculator, Clock, Plus, Trash2, Info, AlertTriangle } from "lucide-react";

interface TollingEvent {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
}

const tollingTypes = [
  "Bankruptcy",
  "Offer in Compromise",
  "CDP Hearing",
  "Installment Agreement Request",
  "Absence from U.S.",
  "Military Combat Zone",
  "Litigation / Tax Court",
];

function addDays(dateStr: string, days: number): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(0, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CsedCalculatorPage() {
  const [taxYear, setTaxYear] = useState("2021");
  const [assessmentDate, setAssessmentDate] = useState("2022-04-15");
  const [events, setEvents] = useState<TollingEvent[]>([]);
  const [nextId, setNextId] = useState(1);

  const addEvent = () => {
    setEvents([...events, { id: nextId, type: tollingTypes[0], startDate: "", endDate: "" }]);
    setNextId(nextId + 1);
  };

  const removeEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const updateEvent = (id: number, field: keyof TollingEvent, value: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  // Calculate CSED
  const baseCsed = addDays(assessmentDate, 3652); // 10 years
  const totalTollingDays = events.reduce((sum, ev) => {
    const days = daysBetween(ev.startDate, ev.endDate);
    // OIC adds 30 days, CDP adds 30 days, IA request adds 30 days after the event period
    const extra = ["Offer in Compromise", "CDP Hearing", "Installment Agreement Request"].includes(ev.type) ? 30 : 0;
    return sum + days + extra;
  }, 0);
  const adjustedCsed = addDays(assessmentDate, 3652 + totalTollingDays);

  return (
    <AppShell>
      <ScreenHeader title="CSED Tolling Calculator" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          The Collection Statute Expiration Date (CSED) is when the IRS can no
          longer collect a tax debt. Certain events pause (toll) the clock. Use
          this calculator to estimate your adjusted CSED.
        </p>

        {/* Tax Year & Assessment Date */}
        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-3">Tax Year Information</p>
            <div className="space-y-3">
              <FormInput
                label="Tax Year"
                value={taxYear}
                onChange={setTaxYear}
                placeholder="e.g. 2021"
              />
              <FormInput
                label="Assessment Date"
                type="date"
                value={assessmentDate}
                onChange={setAssessmentDate}
              />
            </div>
            <div className="mt-3 bg-surface-alt rounded-xl p-3">
              <p className="text-xs text-muted">
                <span className="font-bold">Tip:</span> Find your assessment date
                on your account transcript. Look for TC 150 (return filed) or TC 29X
                (adjustment).
              </p>
            </div>
          </Card>
        </div>

        {/* Tolling Events */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-navy">Tolling Events</p>
              <button
                onClick={addEvent}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-light text-navy text-xs font-bold rounded-full hover:bg-navy hover:text-white transition-colors"
              >
                <Plus size={14} /> Add Event
              </button>
            </div>

            {events.length === 0 ? (
              <p className="text-xs text-muted text-center py-4">
                No tolling events added. Your CSED is 10 years from the assessment
                date.
              </p>
            ) : (
              <div className="space-y-4">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-surface-alt rounded-xl space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <select
                        value={ev.type}
                        onChange={(e) => updateEvent(ev.id, "type", e.target.value)}
                        className="text-sm font-semibold text-navy bg-transparent border-none focus:outline-none cursor-pointer"
                      >
                        {tollingTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeEvent(ev.id)}
                        className="text-muted hover:text-brand-red transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[0.65rem] font-semibold text-muted uppercase mb-1">
                          Start
                        </label>
                        <input
                          type="date"
                          value={ev.startDate}
                          onChange={(e) =>
                            updateEvent(ev.id, "startDate", e.target.value)
                          }
                          className="w-full px-2.5 py-2 bg-white border border-border rounded-lg text-xs font-medium text-navy focus:border-brand-blue focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] font-semibold text-muted uppercase mb-1">
                          End
                        </label>
                        <input
                          type="date"
                          value={ev.endDate}
                          onChange={(e) =>
                            updateEvent(ev.id, "endDate", e.target.value)
                          }
                          className="w-full px-2.5 py-2 bg-white border border-border rounded-lg text-xs font-medium text-navy focus:border-brand-blue focus:outline-none"
                        />
                      </div>
                    </div>
                    {ev.startDate && ev.endDate && (
                      <p className="text-xs text-muted">
                        {daysBetween(ev.startDate, ev.endDate)} days tolled
                        {["Offer in Compromise", "CDP Hearing", "Installment Agreement Request"].includes(ev.type) && " + 30 days"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Results */}
        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={14} className="text-brand-green" />
              <p className="text-sm font-bold text-navy">Calculated CSED</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Assessment Date</span>
                <span className="text-sm font-semibold text-navy">
                  {formatDate(assessmentDate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Base CSED (10 years)</span>
                <span className="text-sm font-semibold text-navy">
                  {formatDate(baseCsed)}
                </span>
              </div>
              {totalTollingDays > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Total Tolling Days</span>
                  <Badge variant="warning">+{totalTollingDays} days</Badge>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-navy">Adjusted CSED</span>
                <span className="text-lg font-black text-brand-green">
                  {formatDate(adjustedCsed)}
                </span>
              </div>
            </div>

            {/* Timeline Visualization */}
            <div className="bg-surface-alt rounded-xl p-3">
              <p className="text-[0.65rem] font-semibold text-muted uppercase tracking-wider mb-2">
                Timeline
              </p>
              <div className="relative h-8 bg-border rounded-full overflow-hidden">
                {assessmentDate && (
                  <>
                    <div
                      className="absolute h-full bg-navy/20 rounded-full"
                      style={{ width: "100%" }}
                    />
                    {totalTollingDays > 0 && (
                      <div
                        className="absolute right-0 h-full bg-warning/30 rounded-r-full"
                        style={{
                          width: `${Math.min(50, (totalTollingDays / 3652) * 100)}%`,
                        }}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[0.6rem] font-bold text-navy">
                        {formatDate(assessmentDate)} → {formatDate(adjustedCsed)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-4">
          <div className="flex items-start gap-2 p-3 bg-warning-light rounded-xl">
            <AlertTriangle size={16} className="text-amber-800 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-800 leading-relaxed">
              This calculator provides estimates only. The actual CSED can be
              affected by factors not captured here. Consult a tax professional for
              a definitive analysis.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
