"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepBVNProps } from "./onboarding-props.type";
import { Loading } from "../feedback/loading";

export function StepBvn({
  register,
  errors,
  isSubmitting,
  onNext,
}: Readonly<StepBVNProps>) {
  return (
    <div className="space-y-14">
      <Field>
        <FieldLabel>BVN</FieldLabel>
        <Input
          inputMode="numeric"
          placeholder="11-digit BVN"
          {...register("bvn")}
        />
        {/* <FieldError>{errors.bvn?.message}</FieldError> */}
        <FieldError>{errors.bvn?.message?.toString()}</FieldError>
      </Field>

      <Button
        type="button"
        onClick={onNext}
        className="btn w-[24rem] mx-auto flex justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loading text="Verifying BVN" />
        ) : (
          "Verify BVN and continue"
        )}
      </Button>
    </div>
  );
}
