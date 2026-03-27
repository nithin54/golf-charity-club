import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface Charity {
  id: string;
  name: string;
  description: string;
  donationPercent: bigint;
}

export interface UserProfile {
  id: unknown;
  username: string;
  email: string;
  plan: { __kind__: string };
  charityId: [] | [string];
  scores: bigint[];
  totalScoresSubmitted: bigint;
  stripeCustomerId: [] | [string];
  stripeSubscriptionId: [] | [string];
}

export interface DrawResult {
  month: string;
  numbers: bigint[];
  winners3: unknown[];
  winners4: unknown[];
  winners5: unknown[];
  jackpotAmount: bigint;
  jackpotWon: boolean;
}

const MOCK_CHARITIES: Charity[] = [
  {
    id: "1",
    name: "Cancer Research UK",
    description: "Pioneering cancer research and clinical trials.",
    donationPercent: BigInt(15),
  },
  {
    id: "2",
    name: "Macmillan Cancer Support",
    description: "Supporting people living with cancer.",
    donationPercent: BigInt(12),
  },
  {
    id: "3",
    name: "British Heart Foundation",
    description: "Fighting heart and circulatory diseases.",
    donationPercent: BigInt(10),
  },
  {
    id: "4",
    name: "Mind Mental Health",
    description: "Advocating for better mental health.",
    donationPercent: BigInt(11),
  },
  {
    id: "5",
    name: "Age UK",
    description: "Supporting older people across the UK.",
    donationPercent: BigInt(10),
  },
  {
    id: "6",
    name: "Children in Need",
    description: "Helping disadvantaged children in the UK.",
    donationPercent: BigInt(13),
  },
];

export function useGetCharities() {
  const { actor, isFetching } = useActor();
  return useQuery<Charity[]>({
    queryKey: ["charities"],
    queryFn: async () => {
      if (!actor) return MOCK_CHARITIES;
      try {
        const result = await (actor as any).getCharities();
        return result as Charity[];
      } catch {
        return MOCK_CHARITIES;
      }
    },
    enabled: !isFetching,
  });
}

export function useGetMyProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await (actor as any).getMyProfile();
        if (Array.isArray(result) && result.length > 0)
          return result[0] as UserProfile;
        return null;
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
  });
}

export function useGetLatestDraw() {
  const { actor, isFetching } = useActor();
  return useQuery<DrawResult | null>({
    queryKey: ["latestDraw"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await (actor as any).getLatestDraw();
        if (Array.isArray(result) && result.length > 0)
          return result[0] as DrawResult;
        return null;
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
  });
}

export function useGetCurrentJackpot() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["jackpot"],
    queryFn: async () => {
      if (!actor) return BigInt(5000);
      try {
        return (await (actor as any).getCurrentJackpot()) as bigint;
      } catch {
        return BigInt(5000);
      }
    },
    enabled: !isFetching,
  });
}

export function useGetDrawHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<DrawResult[]>({
    queryKey: ["drawHistory"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await (actor as any).getDrawHistory()) as DrawResult[];
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
  });
}

export function useListAllUsers() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await (actor as any).listAllUsers()) as UserProfile[];
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
  });
}

export function useSubmitScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (score: number) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).submitScore(BigInt(score));
      if (result && "err" in result) throw new Error(result.err);
      return (result?.ok as bigint[]) ?? [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useUpdateCharity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (charityId: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).updateCharitySelection(charityId);
      if (result && "err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useRunDraw() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (month: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).runMonthlyDraw(month);
      if (result && "err" in result) throw new Error(result.err);
      return result?.ok as DrawResult;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["drawHistory", "latestDraw", "jackpot"],
      });
    },
  });
}

export function useSetJackpot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (amount: number) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).setJackpot(BigInt(amount));
      if (result && "err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jackpot"] });
    },
  });
}

export function useCreateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      email,
    }: { username: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as any).createProfile(username, email);
      if (result && "err" in result) throw new Error(result.err);
      return result?.ok as UserProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}
