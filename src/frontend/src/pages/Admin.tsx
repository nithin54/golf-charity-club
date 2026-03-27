import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Settings, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetDrawHistory,
  useListAllUsers,
  useRunDraw,
  useSetJackpot,
} from "../hooks/useQueries";

const PLAN_LABELS: Record<string, string> = {
  None: "None",
  Monthly: "Monthly",
  Yearly: "Yearly",
};

export default function Admin() {
  const { data: users, isLoading: usersLoading } = useListAllUsers();
  const { data: drawHistory, isLoading: historyLoading } = useGetDrawHistory();
  const runDraw = useRunDraw();
  const setJackpot = useSetJackpot();

  const [drawMonth, setDrawMonth] = useState("");
  const [jackpotAmount, setJackpotAmount] = useState("");
  const [lastDrawResult, setLastDrawResult] = useState<null | {
    month: string;
    numbers: bigint[];
    jackpotWon: boolean;
  }>(null);

  const handleRunDraw = async () => {
    if (!drawMonth.trim()) {
      toast.error("Enter a month (e.g. 2026-03)");
      return;
    }
    try {
      const result = await runDraw.mutateAsync(drawMonth.trim());
      setLastDrawResult(result);
      toast.success(`Draw run for ${drawMonth}!`);
      setDrawMonth("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Draw failed");
    }
  };

  const handleSetJackpot = async () => {
    const val = Number.parseInt(jackpotAmount);
    if (Number.isNaN(val) || val < 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await setJackpot.mutateAsync(val);
      toast.success(`Jackpot set to £${val}`);
      setJackpotAmount("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to set jackpot");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.17 0.015 265)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{
          background: "oklch(0.13 0.015 265)",
          borderColor: "oklch(0.96 0 0 / 8%)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              data-ocid="admin.link"
              className="text-muted-foreground hover:text-foreground mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <Settings
            className="w-5 h-5"
            style={{ color: "oklch(0.67 0.11 78)" }}
          />
          <span className="font-serif font-semibold text-foreground">
            Admin Panel
          </span>
        </div>
        <Badge
          style={{
            background: "oklch(0.577 0.245 27.325 / 0.15)",
            color: "oklch(0.85 0.15 27)",
            border: "1px solid oklch(0.577 0.245 27.325 / 0.3)",
          }}
        >
          Admin Only
        </Badge>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="mt-1" style={{ color: "oklch(0.70 0.015 234)" }}>
            Manage users, draws, and jackpot settings.
          </p>
        </motion.div>

        {/* Controls Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Run Draw */}
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.21 0.018 262)",
              borderColor: "oklch(0.96 0 0 / 8%)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.67 0.11 78 / 0.12)" }}
              >
                <Trophy
                  className="w-5 h-5"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <h2 className="font-serif text-lg font-bold text-foreground">
                Run Monthly Draw
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-foreground text-sm mb-1.5 block">
                  Month (e.g. 2026-03)
                </Label>
                <Input
                  value={drawMonth}
                  onChange={(e) => setDrawMonth(e.target.value)}
                  placeholder="YYYY-MM"
                  data-ocid="draw.input"
                  style={{
                    background: "oklch(0.17 0.015 265)",
                    borderColor: "oklch(0.96 0 0 / 12%)",
                  }}
                  className="text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                onClick={handleRunDraw}
                disabled={runDraw.isPending}
                data-ocid="draw.submit_button"
                className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
              >
                {runDraw.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  "Run Draw"
                )}
              </Button>
            </div>
            {lastDrawResult && (
              <div
                data-ocid="draw.success_state"
                className="mt-4 rounded-xl p-4 border"
                style={{
                  background: "oklch(0.39 0.08 155 / 0.2)",
                  borderColor: "oklch(0.55 0.1 155 / 0.3)",
                }}
              >
                <p className="text-sm font-semibold text-foreground mb-2">
                  Draw Results — {lastDrawResult.month}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {lastDrawResult.numbers.map((n) => (
                    <span
                      key={String(n)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "oklch(0.67 0.11 78)",
                        color: "oklch(0.14 0.01 265)",
                      }}
                    >
                      {Number(n)}
                    </span>
                  ))}
                </div>
                {lastDrawResult.jackpotWon && (
                  <p
                    className="mt-2 text-sm font-semibold"
                    style={{ color: "oklch(0.67 0.11 78)" }}
                  >
                    🏆 Jackpot Won!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Set Jackpot */}
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.21 0.018 262)",
              borderColor: "oklch(0.96 0 0 / 8%)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.67 0.11 78 / 0.12)" }}
              >
                <Settings
                  className="w-5 h-5"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <h2 className="font-serif text-lg font-bold text-foreground">
                Set Jackpot
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-foreground text-sm mb-1.5 block">
                  Amount (£)
                </Label>
                <Input
                  type="number"
                  value={jackpotAmount}
                  onChange={(e) => setJackpotAmount(e.target.value)}
                  placeholder="e.g. 10000"
                  data-ocid="jackpot.input"
                  style={{
                    background: "oklch(0.17 0.015 265)",
                    borderColor: "oklch(0.96 0 0 / 12%)",
                  }}
                  className="text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                onClick={handleSetJackpot}
                disabled={setJackpot.isPending}
                data-ocid="jackpot.submit_button"
                className="w-full font-semibold"
                style={{
                  background: "oklch(0.67 0.11 78 / 0.15)",
                  color: "oklch(0.67 0.11 78)",
                  border: "1px solid oklch(0.67 0.11 78 / 0.3)",
                }}
              >
                {setJackpot.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Set Jackpot"
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(0.21 0.018 262)",
              borderColor: "oklch(0.96 0 0 / 8%)",
            }}
          >
            <div
              className="flex items-center gap-3 p-6 border-b"
              style={{ borderColor: "oklch(0.96 0 0 / 8%)" }}
            >
              <Users
                className="w-5 h-5"
                style={{ color: "oklch(0.67 0.11 78)" }}
              />
              <h2 className="font-serif text-lg font-bold text-foreground">
                All Members
              </h2>
              <Badge
                className="ml-auto"
                style={{
                  background: "oklch(0.67 0.11 78 / 0.1)",
                  color: "oklch(0.67 0.11 78)",
                }}
              >
                {users?.length ?? 0} users
              </Badge>
            </div>
            {usersLoading ? (
              <div
                data-ocid="users.loading_state"
                className="flex justify-center py-10"
              >
                <Loader2
                  className="w-6 h-6 animate-spin"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
            ) : !users?.length ? (
              <div data-ocid="users.empty_state" className="text-center py-12">
                <Users
                  className="w-10 h-10 mx-auto mb-3 opacity-30"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
                <p style={{ color: "oklch(0.70 0.015 234)" }}>
                  No members yet.
                </p>
              </div>
            ) : (
              <Table data-ocid="users.table">
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(0.96 0 0 / 8%)" }}>
                    {["Username", "Email", "Plan", "Scores", "Charity"].map(
                      (h) => (
                        <TableHead
                          key={h}
                          style={{ color: "oklch(0.70 0.015 234)" }}
                        >
                          {h}
                        </TableHead>
                      ),
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, i) => (
                    <TableRow
                      key={user.username || i}
                      data-ocid={`users.row.${i + 1}`}
                      style={{ borderColor: "oklch(0.96 0 0 / 8%)" }}
                      className="hover:bg-secondary/30"
                    >
                      <TableCell className="text-foreground font-medium">
                        {user.username}
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.84 0.012 264)" }}>
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            background: "oklch(0.67 0.11 78 / 0.1)",
                            color: "oklch(0.67 0.11 78)",
                          }}
                        >
                          {PLAN_LABELS[
                            (user.plan as any)?.__kind__ ?? "None"
                          ] ?? "None"}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.84 0.012 264)" }}>
                        {user.scores?.join(", ") || "—"}
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.84 0.012 264)" }}>
                        {user.charityId?.[0] ?? "None"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </motion.section>

        {/* Draw History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(0.21 0.018 262)",
              borderColor: "oklch(0.96 0 0 / 8%)",
            }}
          >
            <div
              className="flex items-center gap-3 p-6 border-b"
              style={{ borderColor: "oklch(0.96 0 0 / 8%)" }}
            >
              <Trophy
                className="w-5 h-5"
                style={{ color: "oklch(0.67 0.11 78)" }}
              />
              <h2 className="font-serif text-lg font-bold text-foreground">
                Draw History
              </h2>
            </div>
            {historyLoading ? (
              <div
                data-ocid="history.loading_state"
                className="flex justify-center py-10"
              >
                <Loader2
                  className="w-6 h-6 animate-spin"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
            ) : !drawHistory?.length ? (
              <div
                data-ocid="history.empty_state"
                className="text-center py-12"
              >
                <Trophy
                  className="w-10 h-10 mx-auto mb-3 opacity-30"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
                <p style={{ color: "oklch(0.70 0.015 234)" }}>
                  No draws have been run yet.
                </p>
              </div>
            ) : (
              <Table data-ocid="history.table">
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(0.96 0 0 / 8%)" }}>
                    {[
                      "Month",
                      "Numbers",
                      "3-Match",
                      "4-Match",
                      "5-Match",
                      "Jackpot",
                      "Won",
                    ].map((h) => (
                      <TableHead
                        key={h}
                        style={{ color: "oklch(0.70 0.015 234)" }}
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drawHistory.map((draw, i) => (
                    <TableRow
                      key={`${draw.month}-${i}`}
                      data-ocid={`history.row.${i + 1}`}
                      style={{ borderColor: "oklch(0.96 0 0 / 8%)" }}
                      className="hover:bg-secondary/30"
                    >
                      <TableCell className="text-foreground font-medium">
                        {draw.month}
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.84 0.012 264)" }}>
                        {draw.numbers.map(Number).join(", ")}
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.84 0.012 264)" }}>
                        {draw.winners3.length}
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.84 0.012 264)" }}>
                        {draw.winners4.length}
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.84 0.012 264)" }}>
                        {draw.winners5.length}
                      </TableCell>
                      <TableCell style={{ color: "oklch(0.67 0.11 78)" }}>
                        £{Number(draw.jackpotAmount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            background: draw.jackpotWon
                              ? "oklch(0.67 0.11 78 / 0.15)"
                              : "oklch(0.25 0.018 262)",
                            color: draw.jackpotWon
                              ? "oklch(0.67 0.11 78)"
                              : "oklch(0.70 0.015 234)",
                          }}
                        >
                          {draw.jackpotWon ? "Won" : "Rolled"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
