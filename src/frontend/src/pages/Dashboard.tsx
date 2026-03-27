import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Heart,
  Loader2,
  LogOut,
  Medal,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCharities,
  useGetCurrentJackpot,
  useGetLatestDraw,
  useGetMyProfile,
  useSubmitScore,
  useUpdateCharity,
} from "../hooks/useQueries";

const PLAN_LABELS: Record<string, string> = {
  None: "No Plan",
  Monthly: "Par Club",
  Yearly: "Eagle Club",
};

export default function Dashboard() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: charities, isLoading: charitiesLoading } = useGetCharities();
  const { data: latestDraw } = useGetLatestDraw();
  const { data: jackpot } = useGetCurrentJackpot();
  const submitScore = useSubmitScore();
  const updateCharity = useUpdateCharity();

  const [scoreInput, setScoreInput] = useState("");
  const [scoreError, setScoreError] = useState("");

  if (isInitializing || profileLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.17 0.015 265)" }}
      >
        <div data-ocid="dashboard.loading_state" className="text-center">
          <Loader2
            className="w-10 h-10 animate-spin mx-auto mb-4"
            style={{ color: "oklch(0.67 0.11 78)" }}
          />
          <p style={{ color: "oklch(0.70 0.015 234)" }}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.17 0.015 265)" }}
      >
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Members Only
          </h2>
          <p className="mb-6" style={{ color: "oklch(0.70 0.015 234)" }}>
            Please log in to access your dashboard.
          </p>
          <Link to="/auth">
            <Button
              data-ocid="dashboard.primary_button"
              className="bg-gold text-primary-foreground hover:bg-gold-light"
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const scores = profile?.scores?.map(Number) ?? [32, 28, 35, 31, 29];
  const selectedCharityId = profile?.charityId?.[0] ?? null;
  const planKind = (profile?.plan as any)?.__kind__ ?? "None";
  const planLabel = PLAN_LABELS[planKind] ?? "Par Club";

  const handleSubmitScore = async () => {
    setScoreError("");
    const val = Number.parseInt(scoreInput);
    if (Number.isNaN(val) || val < 1 || val > 45) {
      setScoreError("Enter a score between 1 and 45");
      return;
    }
    try {
      await submitScore.mutateAsync(val);
      toast.success("Score submitted!");
      setScoreInput("");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to submit score",
      );
    }
  };

  const handleSelectCharity = async (charityId: string) => {
    try {
      await updateCharity.mutateAsync(charityId);
      toast.success("Charity updated!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update charity",
      );
    }
  };

  const jackpotDisplay = jackpot
    ? `£${Number(jackpot).toLocaleString()}`
    : "£5,000";

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
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <span
              className="text-xs font-bold"
              style={{ color: "oklch(0.14 0.01 265)" }}
            >
              TG
            </span>
          </div>
          <span className="font-serif font-semibold text-foreground">
            TEE OFF FOR GOOD
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            data-ocid="dashboard.card"
            style={{
              background: "oklch(0.67 0.11 78 / 0.15)",
              color: "oklch(0.67 0.11 78)",
              border: "1px solid oklch(0.67 0.11 78 / 0.3)",
            }}
          >
            {planLabel}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            data-ocid="dashboard.secondary_button"
            onClick={clear}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Welcome back{profile?.username ? `, ${profile.username}` : ""}
          </h1>
          <p className="mt-1" style={{ color: "oklch(0.70 0.015 234)" }}>
            Here's your golfing journey at a glance.
          </p>
        </motion.div>

        {/* Score Tracker */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.21 0.018 262)",
              borderColor: "oklch(0.96 0 0 / 8%)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.67 0.11 78 / 0.12)" }}
              >
                <Target
                  className="w-5 h-5"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-foreground">
                  Score Tracker
                </h2>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  Last 5 Stableford scores (rolling)
                </p>
              </div>
            </div>

            {/* Scores grid */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {([0, 1, 2, 3, 4] as const).map((slot) => {
                const score = scores[slot];
                const isLatest =
                  slot === scores.length - 1 && scores.length > 0;
                return (
                  <div
                    key={`slot-${slot}`}
                    data-ocid={`scores.item.${slot + 1}`}
                    className="rounded-xl text-center py-4 border relative"
                    style={{
                      background:
                        score !== undefined
                          ? "oklch(0.25 0.018 262)"
                          : "oklch(0.18 0.015 265)",
                      borderColor: isLatest
                        ? "oklch(0.67 0.11 78 / 0.4)"
                        : "oklch(0.96 0 0 / 8%)",
                    }}
                  >
                    {isLatest && (
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: "oklch(0.67 0.11 78)",
                          color: "oklch(0.14 0.01 265)",
                        }}
                      >
                        Latest
                      </div>
                    )}
                    <div
                      className="font-serif text-2xl font-bold"
                      style={{
                        color:
                          score !== undefined
                            ? "oklch(0.67 0.11 78)"
                            : "oklch(0.40 0.015 265)",
                      }}
                    >
                      {score !== undefined ? score : "—"}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.70 0.015 234)" }}
                    >
                      Round {slot + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  min={1}
                  max={45}
                  value={scoreInput}
                  onChange={(e) => setScoreInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmitScore();
                  }}
                  placeholder="Enter score (1-45)"
                  data-ocid="score.input"
                  style={{
                    background: "oklch(0.17 0.015 265)",
                    borderColor: "oklch(0.96 0 0 / 12%)",
                  }}
                  className="text-foreground placeholder:text-muted-foreground"
                />
                {scoreError && (
                  <p
                    className="text-xs mt-1"
                    data-ocid="score.error_state"
                    style={{ color: "oklch(0.577 0.245 27.325)" }}
                  >
                    {scoreError}
                  </p>
                )}
              </div>
              <Button
                onClick={handleSubmitScore}
                disabled={submitScore.isPending}
                data-ocid="score.submit_button"
                className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
              >
                {submitScore.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Submit
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Charity Selector */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.21 0.018 262)",
              borderColor: "oklch(0.96 0 0 / 8%)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.67 0.11 78 / 0.12)" }}
              >
                <Heart
                  className="w-5 h-5"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-foreground">
                  Your Charity
                </h2>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  Choose where your donation goes
                </p>
              </div>
            </div>

            {charitiesLoading ? (
              <div
                data-ocid="charities.loading_state"
                className="flex justify-center py-8"
              >
                <Loader2
                  className="w-6 h-6 animate-spin"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(charities ?? []).map((charity, i) => {
                  const isSelected = charity.id === selectedCharityId;
                  return (
                    <button
                      type="button"
                      key={charity.id}
                      data-ocid={`charity.item.${i + 1}`}
                      onClick={() => handleSelectCharity(charity.id)}
                      className="rounded-xl p-4 text-left border transition-all hover:scale-[1.02]"
                      style={{
                        background: isSelected
                          ? "oklch(0.39 0.08 155 / 0.3)"
                          : "oklch(0.25 0.018 262)",
                        borderColor: isSelected
                          ? "oklch(0.55 0.1 155)"
                          : "oklch(0.96 0 0 / 8%)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-semibold text-sm text-foreground">
                          {charity.name}
                        </span>
                        {isSelected && (
                          <Heart
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "oklch(0.67 0.11 78)" }}
                          />
                        )}
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.70 0.015 234)" }}
                      >
                        {charity.description}
                      </p>
                      <div
                        className="mt-2 text-xs font-semibold"
                        style={{ color: "oklch(0.67 0.11 78)" }}
                      >
                        {Number(charity.donationPercent)}% donated
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.section>

        {/* Draw Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.21 0.018 262)",
              borderColor: "oklch(0.96 0 0 / 8%)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.67 0.11 78 / 0.12)" }}
              >
                <Medal
                  className="w-5 h-5"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-lg font-bold text-foreground">
                  Monthly Draw
                </h2>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  Latest draw results
                </p>
              </div>
              <div
                className="rounded-xl px-4 py-2 text-center"
                style={{
                  background: "oklch(0.67 0.11 78 / 0.1)",
                  border: "1px solid oklch(0.67 0.11 78 / 0.3)",
                }}
              >
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  Jackpot
                </div>
                <div
                  className="font-serif text-xl font-bold"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                >
                  {jackpotDisplay}
                </div>
              </div>
            </div>

            {latestDraw ? (
              <div>
                <div className="mb-4">
                  <p
                    className="text-sm mb-3"
                    style={{ color: "oklch(0.70 0.015 234)" }}
                  >
                    Draw for{" "}
                    <strong className="text-foreground">
                      {latestDraw.month}
                    </strong>
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {latestDraw.numbers.map((n) => (
                      <div
                        key={String(n)}
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                        style={{
                          background: "oklch(0.67 0.11 78)",
                          color: "oklch(0.14 0.01 265)",
                        }}
                      >
                        {Number(n)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    {
                      label: "3-Match Winners",
                      count: latestDraw.winners3.length,
                    },
                    {
                      label: "4-Match Winners",
                      count: latestDraw.winners4.length,
                    },
                    {
                      label: "5-Match / Jackpot",
                      count: latestDraw.winners5.length,
                    },
                  ].map((w) => (
                    <div
                      key={w.label}
                      className="rounded-lg p-3"
                      style={{ background: "oklch(0.25 0.018 262)" }}
                    >
                      <div
                        className="font-serif text-2xl font-bold"
                        style={{ color: "oklch(0.67 0.11 78)" }}
                      >
                        {w.count}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.70 0.015 234)" }}
                      >
                        {w.label}
                      </div>
                    </div>
                  ))}
                </div>
                {latestDraw.jackpotWon && (
                  <div
                    className="mt-4 rounded-xl p-4 text-center"
                    style={{
                      background: "oklch(0.67 0.11 78 / 0.1)",
                      border: "1px solid oklch(0.67 0.11 78 / 0.3)",
                    }}
                  >
                    <Trophy
                      className="w-6 h-6 mx-auto mb-2"
                      style={{ color: "oklch(0.67 0.11 78)" }}
                    />
                    <p className="font-semibold text-foreground">
                      Jackpot Won! 🎉
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div data-ocid="draw.empty_state" className="text-center py-8">
                <Medal
                  className="w-10 h-10 mx-auto mb-3 opacity-30"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
                <p style={{ color: "oklch(0.70 0.015 234)" }}>
                  No draw results yet. Stay tuned!
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "oklch(0.40 0.015 265)" }}
                >
                  Current jackpot: {jackpotDisplay}
                </p>
              </div>
            )}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-8 text-xs"
        style={{
          color: "oklch(0.70 0.015 234)",
          borderTop: "1px solid oklch(0.96 0 0 / 8%)",
        }}
      >
        <ChevronRight className="inline w-3 h-3 mr-1" />©{" "}
        {new Date().getFullYear()} Tee Off For Good. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-gold transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
