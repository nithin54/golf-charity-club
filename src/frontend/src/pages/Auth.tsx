import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Heart, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateProfile } from "../hooks/useQueries";

export default function Auth() {
  const navigate = useNavigate();
  const { login, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();
  const createProfile = useCreateProfile();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Navigate to dashboard after successful login (Login tab flow)
  useEffect(() => {
    if (isLoginSuccess && identity) {
      navigate({ to: "/dashboard" });
    }
  }, [isLoginSuccess, identity, navigate]);

  const handleLogin = () => {
    login();
  };

  const handleSignUp = async () => {
    setUsernameError("");
    setEmailError("");
    let valid = true;
    if (!username.trim()) {
      setUsernameError("Username is required");
      valid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    }
    if (!valid) return;

    if (!identity) {
      toast.error("Please connect your Identity first (step 1)");
      return;
    }

    try {
      await createProfile.mutateAsync({
        username: username.trim(),
        email: email.trim(),
      });
      toast.success("Profile created! Welcome to the Tour.");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create profile",
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.17 0.015 265) 0%, oklch(0.12 0.015 265) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.39 0.08 155 / 0.1) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center mx-auto mb-4">
            <span
              className="text-sm font-bold"
              style={{ color: "oklch(0.14 0.01 265)" }}
            >
              TG
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            TEE OFF FOR GOOD
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "oklch(0.70 0.015 234)" }}
          >
            Your membership awaits.
          </p>
        </div>

        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "oklch(0.21 0.018 262)",
            borderColor: "oklch(0.96 0 0 / 8%)",
          }}
        >
          <Tabs defaultValue="login" data-ocid="auth.tab">
            <TabsList
              className="w-full mb-6"
              style={{ background: "oklch(0.17 0.015 265)" }}
            >
              <TabsTrigger
                value="login"
                className="flex-1"
                data-ocid="auth.tab"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1"
                data-ocid="auth.tab"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="space-y-4">
                <p
                  className="text-sm text-center"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  Sign in securely with Internet Identity — no username or
                  password required.
                </p>
                <Button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  data-ocid="login.primary_button"
                  className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-semibold py-6"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Connecting...
                    </>
                  ) : (
                    "Connect with Internet Identity"
                  )}
                </Button>
                <p
                  className="text-xs text-center"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  Powered by the Internet Computer's decentralized identity
                  protocol.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="username"
                    className="text-foreground text-sm mb-1.5 block"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="YourGolferName"
                    data-ocid="signup.input"
                    style={{
                      background: "oklch(0.17 0.015 265)",
                      borderColor: "oklch(0.96 0 0 / 12%)",
                    }}
                    className="text-foreground placeholder:text-muted-foreground"
                  />
                  {usernameError && (
                    <p
                      className="text-xs mt-1"
                      data-ocid="signup.error_state"
                      style={{ color: "oklch(0.577 0.245 27.325)" }}
                    >
                      {usernameError}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-foreground text-sm mb-1.5 block"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    data-ocid="signup.input"
                    style={{
                      background: "oklch(0.17 0.015 265)",
                      borderColor: "oklch(0.96 0 0 / 12%)",
                    }}
                    className="text-foreground placeholder:text-muted-foreground"
                  />
                  {emailError && (
                    <p
                      className="text-xs mt-1"
                      data-ocid="signup.error_state"
                      style={{ color: "oklch(0.577 0.245 27.325)" }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.70 0.015 234)" }}
                >
                  First connect your Internet Identity, then complete your
                  profile below.
                </p>
                <Button
                  onClick={identity ? undefined : handleLogin}
                  disabled={isLoggingIn || !!identity}
                  variant="outline"
                  data-ocid="signup.secondary_button"
                  className="w-full border-foreground/20 text-foreground bg-transparent hover:bg-secondary"
                  style={{
                    borderColor: identity ? "oklch(0.55 0.15 155)" : undefined,
                    color: identity ? "oklch(0.75 0.15 155)" : undefined,
                  }}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : identity ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />✓ Identity
                      Connected
                    </>
                  ) : (
                    "1. Connect Identity"
                  )}
                </Button>
                <Button
                  onClick={handleSignUp}
                  disabled={createProfile.isPending || !identity}
                  data-ocid="signup.submit_button"
                  className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
                >
                  {createProfile.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                      Profile...
                    </>
                  ) : (
                    "2. Create Profile"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <p
          className="text-center mt-6 text-xs flex items-center justify-center gap-1"
          style={{ color: "oklch(0.70 0.015 234)" }}
        >
          <Heart className="w-3 h-3" style={{ color: "oklch(0.67 0.11 78)" }} />
          10% of every subscription goes to charity
        </p>
      </motion.div>
    </div>
  );
}
