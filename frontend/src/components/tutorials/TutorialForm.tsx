import { useState, type FormEvent } from "react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

export interface TutorialFormValues {
  title: string;
  description: string;
  published: boolean;
  created_by: string;
}

interface TutorialFormProps {
  initialValues?: Partial<TutorialFormValues>;
  submitLabel?: string;
  loading?: boolean;
  showCreatedOnHint?: boolean;
  onSubmit: (values: TutorialFormValues) => void;
  onCancel?: () => void;
}

const defaultValues: TutorialFormValues = {
  title: "",
  description: "",
  published: false,
  created_by: "",
};

export function TutorialForm({
  initialValues,
  submitLabel = "Guardar tutorial",
  loading = false,
  showCreatedOnHint = true,
  onSubmit,
  onCancel,
}: TutorialFormProps) {
  const [values, setValues] = useState<TutorialFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Título"
        value={values.title}
        onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
        placeholder="Introducción a FastAPI"
        required
        maxLength={255}
      />

      <Textarea
        label="Descripción"
        value={values.description}
        onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))}
        placeholder="Describe el contenido del tutorial"
        required
        maxLength={255}
      />

      <label className="flex items-center gap-3 rounded-lg border border-brand-yellow/30 bg-brand-yellow-light/40 px-4 py-3">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(event) => setValues((prev) => ({ ...prev, published: event.target.checked }))}
          className="h-4 w-4 rounded border-brand-gray-light text-brand-burgundy focus:ring-brand-burgundy"
        />
        <span className="text-sm font-medium text-brand-dark">Publicado (visible)</span>
      </label>

      <Input
        label="Usuario creador"
        value={values.created_by}
        onChange={(event) => setValues((prev) => ({ ...prev, created_by: event.target.value }))}
        placeholder="autor@ejemplo.com"
        required
        maxLength={255}
      />

      {showCreatedOnHint && (
        <Input
          label="Fecha de creación"
          value="Se asignará al guardar"
          disabled
          hint="Generada automáticamente por el servidor al guardar"
        />
      )}

      <div className="flex flex-wrap justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
