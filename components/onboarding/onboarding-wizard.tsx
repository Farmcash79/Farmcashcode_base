"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  onboardingCompleteSchema,
  onboardingStep1Schema,
  onboardingStep2Schema,
  type OnboardingCompleteInput,
} from "@/schemas/onboarding.schema";
import { maskBvn } from "@/lib/utils";
import { StepBvn } from "./step-bvn";
import { StepFarmDetails } from "./step-farm-details";
import { StepReview } from "./step-review";

type DraftShape = {
  currentStep: number;
  data: Partial<OnboardingCompleteInput> & {
    bvnMasked?: string;
    bvnVerified?: boolean;
  };
};

const storageKey = "farmcash:onboarding:v2";

type BvnState = "idle" | "verifying" | "verified" | "error";

export function OnboardingWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [bvnState, setBvnState] = useState<BvnState>("idle");
  const [bvnMasked, setBvnMasked] = useState("");
  const [globalError, setGlobalError] = useState("");
  const verifiedBvnRef = useRef<string>("");

  const form = useForm<OnboardingCompleteInput>({
    defaultValues: {
      fullName: "",
      bvn: "",
      farmLocation: "",
      farmType: "CROP",
    },
    mode: "onTouched",
  });

  const values = useWatch({ control: form.control });

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const res = await fetch("/api/onboarding/draft", { cache: "no-store" });

        if (res.ok) {
          const data = await res.json();
          const draft = data.draft as DraftShape | null;

          if (!cancelled && draft?.data) {
            form.reset({
              fullName: draft.data.fullName ?? "",
              bvn: draft.data.bvn ?? "",
              farmLocation: draft.data.farmLocation ?? "",
              farmType: draft.data.farmType ?? "CROP",
            });

            setStep((draft.currentStep as 1 | 2 | 3) ?? 1);
            setBvnMasked(draft.data.bvnMasked ?? "");
            setBvnState(draft.data.bvnVerified ? "verified" : "idle");
            verifiedBvnRef.current = draft.data.bvnVerified
              ? String(draft.data.bvn ?? "")
              : "";
          }
        } else {
          const cached = localStorage.getItem(storageKey);
          if (!cancelled && cached) {
            const parsed = JSON.parse(cached) as DraftShape;

            form.reset({
              fullName: parsed.data.fullName ?? "",
              bvn: "",
              farmLocation: parsed.data.farmLocation ?? "",
              farmType: parsed.data.farmType ?? "CROP",
            });

            setStep((parsed.currentStep as 1 | 2 | 3) ?? 1);
            setBvnMasked(parsed.data.bvnMasked ?? "");
            setBvnState(parsed.data.bvnVerified ? "verified" : "idle");
          }
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    }

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [form]);

  useEffect(() => {
    if (!hydrated) return;

    const safeLocalPayload: DraftShape = {
      currentStep: step,
      data: {
        fullName: values.fullName,
        farmLocation: values.farmLocation,
        farmType: values.farmType,
        bvnMasked,
        bvnVerified: bvnState === "verified",
      },
    };

    localStorage.setItem(storageKey, JSON.stringify(safeLocalPayload));
  }, [
    hydrated,
    step,
    values.fullName,
    values.farmLocation,
    values.farmType,
    bvnMasked,
    bvnState,
  ]);

  const preview = useMemo(
    () => ({
      ...values,
      bvnMasked: bvnMasked || maskBvn(values.bvn || ""),
    }),
    [values, bvnMasked],
  );

  async function saveDraft(
    nextStep: 1 | 2 | 3,
    nextData?: Partial<OnboardingCompleteInput>,
  ) {
    const res = await fetch("/api/onboarding/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentStep: nextStep,
        data: {
          ...values,
          ...nextData,
          bvnMasked,
          bvnVerified: bvnState === "verified",
        },
      }),
    });

    if (!res.ok) {
      throw new Error("Unable to save progress");
    }
  }

  async function verifyBvnIfNeeded() {
    const cleanBvn = String(form.getValues("bvn") ?? "").replace(/\D/g, "");
    const fullName = String(form.getValues("fullName") ?? "").trim();

    if (cleanBvn.length !== 11 || fullName.length < 2) {
      setBvnState("idle");
      setBvnMasked("");
      verifiedBvnRef.current = "";
      return;
    }

    if (verifiedBvnRef.current === cleanBvn && bvnState === "verified") {
      return;
    }

    setBvnState("verifying");
    setGlobalError("");

    const res = await fetch("/api/onboarding/verify-bvn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        bvn: cleanBvn,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setBvnState("error");
      form.setError("bvn", {
        message: data?.message || "BVN verification failed",
      });
      return;
    }

    verifiedBvnRef.current = cleanBvn;
    setBvnMasked(data.bvnMasked || maskBvn(cleanBvn));
    setBvnState("verified");
    form.clearErrors("bvn");
  }

  useEffect(() => {
    const cleanBvn = String(values?.bvn ?? "").replace(/\D/g, "");
    const fullName = String(values?.fullName ?? "").trim();

    if (!cleanBvn || cleanBvn.length < 11 || fullName.length < 2) {
      if (bvnState === "verified") {
        setBvnState("idle");
        verifiedBvnRef.current = "";
      }
      return;
    }

    const timer = window.setTimeout(() => {
      void verifyBvnIfNeeded();
    }, 650);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.bvn, values?.fullName]);

  async function handleBvnNext() {
    setBusy(true);
    setGlobalError("");

    const valid = await form.trigger(["fullName", "bvn"]);
    if (!valid) {
      setBusy(false);
      return;
    }

    const payload = onboardingStep1Schema.safeParse({
      fullName: form.getValues("fullName"),
      bvn: String(form.getValues("bvn") || "").replace(/\D/g, ""),
    });

    if (!payload.success) {
      form.setError("bvn", {
        message: payload.error.issues[0]?.message ?? "Invalid BVN",
      });
      setBusy(false);
      return;
    }

    if (bvnState !== "verified") {
      form.setError("bvn", {
        message: "Please wait for BVN verification to complete",
      });
      setBusy(false);
      return;
    }

    try {
      await saveDraft(2, {
        fullName: payload.data.fullName,
        bvn: payload.data.bvn,
      });
      setStep(2);
    } catch {
      setGlobalError("Unable to save your progress.");
    } finally {
      setBusy(false);
    }
  }

  async function handleFarmNext() {
    setBusy(true);
    setGlobalError("");

    const valid = await form.trigger(["farmLocation", "farmType"]);
    if (!valid) {
      setBusy(false);
      return;
    }

    const payload = onboardingStep2Schema.safeParse({
      farmLocation: form.getValues("farmLocation"),
      farmType: form.getValues("farmType"),
    });

    if (!payload.success) {
      setBusy(false);
      return;
    }

    try {
      await saveDraft(3, payload.data);
      setStep(3);
    } catch {
      setGlobalError("Unable to save your progress.");
    } finally {
      setBusy(false);
    }
  }

  async function handleFinalSubmit() {
    setBusy(true);
    setGlobalError("");

    const finalPayload = onboardingCompleteSchema.safeParse({
      fullName: form.getValues("fullName"),
      bvn: String(form.getValues("bvn") || "").replace(/\D/g, ""),
      farmLocation: form.getValues("farmLocation"),
      farmType: form.getValues("farmType"),
    });

    if (!finalPayload.success) {
      setBusy(false);
      return;
    }

    if (bvnState !== "verified") {
      form.setError("bvn", {
        message: "BVN must be verified before submission",
      });
      setBusy(false);
      return;
    }

    const res = await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload.data),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setGlobalError(data?.message || "Onboarding failed");
      setBusy(false);
      return;
    }

    localStorage.removeItem(storageKey);
    globalThis.location.href = data.redirect || "/dashboard";
  }

  async function handleUseCurrentLocation() {
    setBusy(true);
    setGlobalError("");

    if (!navigator.geolocation) {
      form.setError("farmLocation", {
        message: "Geolocation is not supported in this browser",
      });
      setBusy(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);

        form.setValue("farmLocation", `${lat}, ${lng}`, {
          shouldDirty: true,
          shouldValidate: true,
        });

        setBusy(false);
      },
      () => {
        form.setError("farmLocation", {
          message: "Unable to retrieve your current location",
        });
        setBusy(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="w-full px-4">
      <div className="mx-auto flex w-full max-w-[662px] flex-col">
        <div className="space-y-7 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-[#1E1E1E] md:text-[2.35rem]">
            {step === 1
              ? "Let’s get to know you"
              : step === 2
                ? "Tell us about your Farm"
                : "Confirm your Details"}
          </h1>
          <p className="text-lg text-[#707070]">
            {step === 1
              ? "This helps us serve you better and keep your account secure."
              : step === 2
                ? "This helps us tailor the right recommendation for you."
                : "Review your information before submitting"}
          </p>
        </div>

        {/* <div className="mt-10">
          <OnboardingStepper step={step} />
        </div> */}

        {globalError ? (
          <p className="mt-5 text-sm text-red-600">{globalError}</p>
        ) : null}

        <div className="mt-10">
          {step === 1 ? (
            <StepBvn
              register={form.register}
              errors={form.formState.errors}
              bvnState={bvnState}
              bvnMasked={bvnMasked}
              isSubmitting={busy}
              onNext={handleBvnNext}
            />
          ) : null}

          {step === 2 ? (
            <StepFarmDetails
              register={form.register}
              errors={form.formState.errors}
              isSubmitting={busy}
              onUseCurrentLocation={handleUseCurrentLocation}
              onBack={() => setStep(1)}
              onNext={handleFarmNext}
              watchFarmType={form.watch("farmType")}
              setValue={form.setValue}
            />
          ) : null}

          {step === 3 ? (
            <StepReview
              values={preview}
              onBack={() => setStep(2)}
              onEdit={{
                onEditBvn: () => setStep(1),
                onFarmData: () => setStep(2),
              }}
              onSubmit={handleFinalSubmit}
              isSubmitting={busy}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
