import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Medal,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "How It Works", href: "#journey" },
  { label: "Pricing", href: "#pricing" },
  { label: "Charities", href: "#impact" },
  { label: "The Draw", href: "#dashboard-preview" },
];

const IMPACT_STATS = [
  {
    icon: Heart,
    value: "50+",
    label: "Charities Supported",
    description: "Partner charities across the UK",
  },
  {
    icon: Trophy,
    value: "£1.2M+",
    label: "Donated",
    description: "Total charitable giving to date",
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Golfers",
    description: "Active members and growing",
  },
];

const PRICING_PLANS = [
  {
    name: "The Par Club",
    price: "£25",
    period: "/mo",
    description: "Perfect for casual golfers wanting to make a difference.",
    features: [
      "Score tracker (5 Stableford scores)",
      "Monthly prize draw entry",
      "1 charity selection",
      "10% minimum donation",
      "Monthly draw results",
    ],
    highlight: false,
    plan: "monthly",
  },
  {
    name: "The Birdie Club",
    price: "£50",
    period: "/mo",
    description: "Our most popular plan for dedicated golfers.",
    features: [
      "Everything in Par Club",
      "3x draw entries per month",
      "Priority charity matching",
      "15% donation rate",
      "Performance analytics",
      "Exclusive member badge",
    ],
    highlight: true,
    plan: "monthly",
  },
  {
    name: "The Eagle Club",
    price: "£99",
    period: "/mo",
    description: "For the elite golfer who wants maximum impact.",
    features: [
      "Everything in Birdie Club",
      "10x draw entries per month",
      "VIP charity events access",
      "20% donation rate",
      "Dedicated account manager",
      "Annual performance report",
      "Eagle Club badge",
    ],
    highlight: false,
    plan: "yearly",
  },
];

const JOURNEY_STEPS = [
  {
    icon: Target,
    title: "Track Your Game",
    description:
      "Enter your Stableford scores after every round. Our rolling tracker keeps your last 5 scores, showing your true handicap trajectory over time.",
    color: "from-gold/20 to-gold/5",
  },
  {
    icon: Heart,
    title: "Choose Your Cause",
    description:
      "Select from 50+ UK charities. A minimum 10% of your subscription is donated directly — you decide where your generosity lands.",
    color: "from-accent/30 to-accent/5",
  },
  {
    icon: Medal,
    title: "Win the Draw",
    description:
      "Monthly number draws with 3, 4, and 5-match prizes. Match all 5 and claim the jackpot — which rolls over until someone wins.",
    color: "from-gold/20 to-gold/5",
  },
];

const DASHBOARD_FEATURES = [
  {
    icon: Target,
    title: "Live Scorecard",
    description:
      "Your rolling 5-score Stableford tracker updates in real time. Visualise your form and spot trends in your performance.",
  },
  {
    icon: Medal,
    title: "Monthly Prize Draw",
    description:
      "3-match, 4-match, and 5-match jackpot draws every month. Check your numbers the moment results are announced.",
  },
  {
    icon: Heart,
    title: "Charity Leaderboard",
    description:
      "See your total donations, your chosen charity's ranking, and the collective impact the community is making together.",
  },
];

function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        backgroundColor: "oklch(0.13 0.015 265)",
        borderBottom: "1px solid oklch(0.96 0 0 / 8%)",
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
        <span className="font-serif font-semibold text-sm md:text-base tracking-wide text-foreground">
          TEE OFF FOR GOOD
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            data-ocid="nav.link"
            className="text-sm transition-colors hover:text-gold"
            style={{ color: "oklch(0.84 0.012 264)" }}
          >
            {l.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link to="/auth">
          <Button
            variant="ghost"
            size="sm"
            data-ocid="nav.link"
            className="text-foreground hover:text-gold hover:bg-transparent"
          >
            Log In
          </Button>
        </Link>
        <Link to="/auth">
          <Button
            size="sm"
            data-ocid="nav.primary_button"
            className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
          >
            Join the Tour
          </Button>
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.17 0.015 265) 0%, oklch(0.12 0.015 265) 100%)",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.39 0.08 155 / 0.15) 0%, transparent 70%)",
        }}
      />
      {/* Decorative circles */}
      <div
        className="absolute top-24 right-10 w-80 h-80 rounded-full opacity-5"
        style={{ background: "oklch(0.67 0.11 78)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-5"
        style={{ background: "oklch(0.67 0.11 78)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
            style={{
              color: "oklch(0.67 0.11 78)",
              background: "oklch(0.67 0.11 78 / 0.1)",
              border: "1px solid oklch(0.67 0.11 78 / 0.3)",
            }}
          >
            Golf · Charity · Community
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-foreground mb-6">
            Swing for Change.
            <br />
            <span style={{ color: "oklch(0.67 0.11 78)" }}>Golf for Good.</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: "oklch(0.84 0.012 264)" }}
          >
            Track your Stableford scores, support a charity you love, and
            compete in monthly prize draws — all in one premium membership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button
                size="lg"
                data-ocid="hero.primary_button"
                className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold px-8 py-6 text-base shadow-gold"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button
                variant="outline"
                size="lg"
                data-ocid="hero.secondary_button"
                className="border-foreground/20 text-foreground hover:border-gold hover:text-gold px-8 py-6 text-base bg-transparent"
              >
                View Plans
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 flex items-center justify-center gap-8 flex-wrap"
        >
          {["No Golf Clichés", "Verified Charities", "Monthly Prize Draws"].map(
            (tag) => (
              <div
                key={tag}
                className="flex items-center gap-2"
                style={{ color: "oklch(0.70 0.015 234)" }}
              >
                <Star
                  className="w-3 h-3 fill-current"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
                <span className="text-sm">{tag}</span>
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section
      id="impact"
      className="py-20 px-6"
      style={{ background: "oklch(0.14 0.015 265)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Impact
          </h2>
          <p style={{ color: "oklch(0.70 0.015 234)" }}>
            Real numbers. Real change. Real golf.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl p-8 text-center border transition-all hover:scale-105"
              style={{
                background: "oklch(0.21 0.018 262)",
                borderColor: "oklch(0.96 0 0 / 8%)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "oklch(0.67 0.11 78 / 0.15)" }}
              >
                <stat.icon
                  className="w-7 h-7"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <div
                className="font-serif text-4xl font-bold mb-2"
                style={{ color: "oklch(0.67 0.11 78)" }}
              >
                {stat.value}
              </div>
              <div className="font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div
                className="text-sm"
                style={{ color: "oklch(0.70 0.015 234)" }}
              >
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({
  onSubscribe,
}: { onSubscribe: (plan: string) => void }) {
  return (
    <section
      id="pricing"
      className="py-20 px-6"
      style={{ background: "oklch(0.17 0.015 265)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Subscription Tiers
          </h2>
          <p style={{ color: "oklch(0.70 0.015 234)" }}>
            Choose your level of commitment — to the game and the cause.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-2xl p-8 border flex flex-col relative overflow-hidden transition-all hover:scale-[1.02]"
              style={{
                background: plan.highlight
                  ? "oklch(0.39 0.08 155)"
                  : "oklch(0.21 0.018 262)",
                borderColor: plan.highlight
                  ? "oklch(0.55 0.1 155)"
                  : "oklch(0.96 0 0 / 8%)",
                boxShadow: plan.highlight
                  ? "0 0 40px oklch(0.39 0.08 155 / 0.4)"
                  : "none",
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.67 0.11 78)",
                    color: "oklch(0.14 0.01 265)",
                  }}
                >
                  Most Popular
                </div>
              )}
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.70 0.015 234)" }}
              >
                {plan.description}
              </p>
              <div className="mb-8">
                <span className="font-serif text-5xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "oklch(0.84 0.012 264)" }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "oklch(0.67 0.11 78)" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                data-ocid={`pricing.primary_button.${i + 1}`}
                onClick={() => onSubscribe(plan.plan)}
                className="w-full font-semibold"
                style={{
                  background: plan.highlight
                    ? "oklch(0.67 0.11 78)"
                    : "oklch(0.67 0.11 78 / 0.15)",
                  color: plan.highlight
                    ? "oklch(0.14 0.01 265)"
                    : "oklch(0.67 0.11 78)",
                  border: plan.highlight
                    ? "none"
                    : "1px solid oklch(0.67 0.11 78 / 0.4)",
                }}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section
      id="journey"
      className="py-20 px-6"
      style={{ background: "oklch(0.14 0.015 265)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Golfing Journey
          </h2>
          <p style={{ color: "oklch(0.70 0.015 234)" }}>
            Three pillars of a membership built on purpose.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNEY_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl p-8 border"
              style={{
                background: "oklch(0.21 0.018 262)",
                borderColor: "oklch(0.96 0 0 / 8%)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "oklch(0.67 0.11 78 / 0.12)" }}
              >
                <step.icon
                  className="w-6 h-6"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <div
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.67 0.11 78)" }}
              >
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.70 0.015 234)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreviewSection() {
  return (
    <section
      id="dashboard-preview"
      className="py-20 px-6"
      style={{ background: "oklch(0.34 0.08 155)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Member Dashboard
          </h2>
          <p style={{ color: "oklch(0.84 0.012 264 / 0.85)" }}>
            Everything you need in one focused, beautiful interface.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DASHBOARD_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl p-7 border transition-all hover:scale-[1.02]"
              style={{
                background: "oklch(0.39 0.08 155 / 0.5)",
                borderColor: "oklch(0.96 0 0 / 12%)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "oklch(0.67 0.11 78 / 0.2)" }}
              >
                <feature.icon
                  className="w-6 h-6"
                  style={{ color: "oklch(0.67 0.11 78)" }}
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.84 0.012 264 / 0.85)" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/auth">
            <Button
              size="lg"
              data-ocid="dashboard_preview.primary_button"
              className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold px-10 shadow-gold"
            >
              Access Your Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer
      className="py-12 px-6"
      style={{
        background: "oklch(0.13 0.015 265)",
        borderTop: "1px solid oklch(0.96 0 0 / 8%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map(
              (link) => (
                <a
                  key={link}
                  href="/#"
                  className="text-sm transition-colors hover:text-gold"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  {link}
                </a>
              ),
            )}
          </div>
        </div>
        <div
          className="mt-8 pt-8 text-center text-sm"
          style={{
            color: "oklch(0.70 0.015 234)",
            borderTop: "1px solid oklch(0.96 0 0 / 8%)",
          }}
        >
          © {year}. Built with{" "}
          <Heart
            className="inline w-3 h-3 mx-1"
            style={{ color: "oklch(0.67 0.11 78)" }}
          />{" "}
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    setSubscribeOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <HeroSection />
      <ImpactSection />
      <PricingSection onSubscribe={handleSubscribe} />
      <JourneySection />
      <DashboardPreviewSection />
      <Footer />

      <Dialog open={subscribeOpen} onOpenChange={setSubscribeOpen}>
        <DialogContent
          data-ocid="subscribe.dialog"
          style={{
            background: "oklch(0.21 0.018 262)",
            borderColor: "oklch(0.96 0 0 / 8%)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">
              Join the Tour
            </DialogTitle>
            <DialogDescription style={{ color: "oklch(0.70 0.015 234)" }}>
              You've selected the{" "}
              <strong className="text-foreground">{selectedPlan}</strong> plan.
              Complete your membership below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p
              className="text-sm mb-6"
              style={{ color: "oklch(0.84 0.012 264)" }}
            >
              Stripe checkout will open to complete your subscription. You'll be
              redirected to our secure payment page to enter your card details.
            </p>
            <div className="flex gap-3">
              <Link to="/auth" className="flex-1">
                <Button
                  data-ocid="subscribe.confirm_button"
                  className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
                  onClick={() => setSubscribeOpen(false)}
                >
                  Create Account First
                </Button>
              </Link>
              <Button
                variant="outline"
                data-ocid="subscribe.cancel_button"
                className="border-foreground/20 text-foreground bg-transparent hover:bg-secondary"
                onClick={() => setSubscribeOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
