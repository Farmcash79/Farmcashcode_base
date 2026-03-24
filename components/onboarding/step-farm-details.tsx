"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepFarmDetailsProps } from "./onboarding-props.type";

export function StepFarmDetails({
  register,
  errors,
  setValue,
  getValues,
  onBack,
  onNext,
  isSubmitting,
}: Readonly<StepFarmDetailsProps>) {
  return (
    <div className="space-y-5">
      <Field>
        <FieldLabel>Farm name</FieldLabel>
        <Input placeholder="Green Valley Farm" {...register("farmName")} />
        <FieldError>{errors.farmName?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Farm location</FieldLabel>
        <Input placeholder="Ife, Osun State" {...register("location")} />
        <FieldError>{errors.location?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Farm type</FieldLabel>
        <Select
          onValueChange={(value) => {
            if (value) setValue("farmType", value);
          }}
          defaultValue={getValues("farmType")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select farm type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CROP">Crop</SelectItem>
            <SelectItem value="FISH_FARMING">Fish farming</SelectItem>
            <SelectItem value="POULTRY">Poultry</SelectItem>
            <SelectItem value="LIVESTOCK">Livestock</SelectItem>
          </SelectContent>
        </Select>
        <FieldError>{errors.farmType?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Farm size (optional)</FieldLabel>
        <Input
          type="number"
          step="0.01"
          placeholder="2.5"
          {...register("farmSize")}
        />
        <FieldError>{errors.farmSize?.message}</FieldError>
      </Field>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="button"
          className="w-full"
          onClick={onNext}
          disabled={isSubmitting}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
