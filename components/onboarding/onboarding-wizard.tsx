"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  onboardingCompleteSchema,
  bvnStepSchema,
  farmDetailsSchema,
  type OnboardingCompleteInput,
} from "@/schemas/onboarding.schema";
import { OnboardingStepper } from "./onboarding-stepper";
import { StepBvn } from "./step-bvn";
import { StepFarmDetails } from "./step-farm-details";
import { StepReview } from "./step-review";
import { maskBvn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type DraftShape = {
  currentStep: number;
  data: Partial<OnboardingCompleteInput> & {
    bvnMasked?: string;
    bvnVerified?: boolean;
  };
};

const storageKey = "farmcash:onboarding";

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [serverDraftLoaded, setServerDraftLoaded] = useState(false);
  const [bvnMasked, setBvnMasked] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const form = useForm<OnboardingCompleteInput>({
    // resolver: zodResolver(onboardingCompleteSchema),
    defaultValues: {
      bvn: "",
      phoneNumber: "",
      dateOfBirth: "",
      farmName: "",
      location: "",
      farmType: "CROP",
      farmSize: undefined,
    },
    mode: "onTouched",
  });

  const values = form.watch();

  useEffect(() => {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      const parsed = JSON.parse(cached) as DraftShape;
      if (parsed?.data) {
        form.reset({
          ...form.getValues(),
          ...parsed.data,
        });
        if (parsed.currentStep) setStep(parsed.currentStep);
        if (parsed.data.bvnMasked) setBvnMasked(parsed.data.bvnMasked);
      }
    }
  }, [form]);

  useEffect(() => {
    async function loadDraft() {
      const res = await fetch("/api/onboarding/draft");
      if (!res.ok) return;

      const data = await res.json();
      const draft = data.draft as DraftShape | null;

      if (draft?.data) {
        form.reset({
          ...form.getValues(),
          ...draft.data,
        });

        if (draft.currentStep) setStep(draft.currentStep);
        if (draft.data.bvnMasked) setBvnMasked(draft.data.bvnMasked);
      }

      setServerDraftLoaded(true);
    }

    loadDraft();
  }, [form]);

  useEffect(() => {
    if (!serverDraftLoaded) return;
    const payload: DraftShape = {
      currentStep: step,
      data: {
        ...values,
        bvnMasked,
      },
    };

    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [values, step, bvnMasked, serverDraftLoaded]);

  const preview = useMemo(
    () => ({
      ...values,
      bvnMasked: bvnMasked || maskBvn(values.bvn || ""),
    }),
    [values, bvnMasked],
  );

  async function saveDraft(
    nextStep: number,
    nextData?: Partial<OnboardingCompleteInput>,
  ) {
    const res = await fetch("/api/onboarding/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentStep: nextStep,
        data: { ...values, ...nextData, bvnMasked },
      }),
    });

    if (!res.ok) {
      throw new Error("Unable to save progress");
    }
  }

  async function handleBvnNext() {
    setIsBusy(true);
    const valid = await form.trigger(["bvn", "phoneNumber", "dateOfBirth"]);

    if (!valid) {
      setIsBusy(false);
      return;
    }

    const payload = bvnStepSchema.parse({
      bvn: form.getValues("bvn"),
      phoneNumber: form.getValues("phoneNumber"),
      dateOfBirth: form.getValues("dateOfBirth"),
    });

    const res = await fetch("/api/onboarding/verify-bvn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      form.setError("bvn", {
        message: data.message || "BVN verification failed",
      });
      setIsBusy(false);
      return;
    }

    setBvnMasked(data.bvnMasked);
    setStep(2);
    await saveDraft(2, { ...payload, bvn: payload.bvn });
    setIsBusy(false);
  }

  async function handleFarmNext() {
    setIsBusy(true);
    const valid = await form.trigger([
      "farmName",
      "location",
      "farmType",
      "farmSize",
    ]);

    if (!valid) {
      setIsBusy(false);
      return;
    }

    const payload = farmDetailsSchema.parse({
      farmName: form.getValues("farmName"),
      location: form.getValues("location"),
      farmType: form.getValues("farmType"),
      farmSize: form.getValues("farmSize"),
    });

    await saveDraft(3, payload);
    setStep(3);
    setIsBusy(false);
  }

  async function handleFinalSubmit() {
    setIsBusy(true);

    const finalPayload = onboardingCompleteSchema.parse({
      bvn: form.getValues("bvn"),
      phoneNumber: form.getValues("phoneNumber"),
      dateOfBirth: form.getValues("dateOfBirth"),
      farmName: form.getValues("farmName"),
      location: form.getValues("location"),
      farmType: form.getValues("farmType"),
      farmSize: form.getValues("farmSize"),
    });

    const res = await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      form.setError("root", { message: data.message || "Onboarding failed" });
      setIsBusy(false);
      return;
    }

    localStorage.removeItem(storageKey);
    globalThis.location.href = data.redirect;
  }

  return (
    <div className="max-w-2xl w-full">
      <div className="space-y-14 p-6">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-[#1E1E1E] mb-6">
            Let’s get to know you
          </h1>
          <p className="mt-1 text-sm text-[#707070]">
            This help us serve you better and keep your account secure
          </p>
        </div>

        <OnboardingStepper step={step} />

        {form.formState.errors.root?.message ? (
          <p className="text-sm text-red-300">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        {step === 1 ? (
          <StepBvn
            register={form.register}
            errors={form.formState.errors}
            isSubmitting={isBusy}
            onNext={handleBvnNext}
          />
        ) : null}

        {step === 2 ? (
          <StepFarmDetails
            register={form.register}
            setValue={form.setValue}
            getValues={form.getValues}
            errors={form.formState.errors}
            onBack={() => setStep(1)}
            onNext={handleFarmNext}
            isSubmitting={isBusy}
          />
        ) : null}

        {step === 3 ? (
          <StepReview
            values={preview}
            onBack={() => setStep(2)}
            onSubmit={handleFinalSubmit}
            isSubmitting={isBusy}
          />
        ) : null}
      </div>
    </div>
  );
}
