import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "../hooks/useToast";
import { getErrorMessage, tutorialService } from "../services/tutorialService";
import { PageContainer } from "../components/layout/PageContainer";
import { TutorialForm, type TutorialFormValues } from "../components/tutorials/TutorialForm";

export function CreateTutorialPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: TutorialFormValues) => {
    setLoading(true);
    try {
      const response = await tutorialService.create({
        title: values.title.trim(),
        description: values.description.trim(),
        published: values.published,
        detail: { created_by: values.created_by.trim() },
      });

      showToast("Tutorial creado correctamente", "success");
      navigate(`/tutorials/${response.data.id}`);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="Crear tutorial"
      description="Registra un tutorial con su detalle. La fecha de creación la genera el servidor."
    >
      <div className="mx-auto max-w-2xl app-card-accent p-6">
        <TutorialForm
          submitLabel="Crear tutorial"
          loading={loading}
          onSubmit={(values) => void handleSubmit(values)}
          onCancel={() => navigate("/")}
        />
      </div>
    </PageContainer>
  );
}
