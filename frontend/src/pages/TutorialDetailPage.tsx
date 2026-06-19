import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useToast } from "../hooks/useToast";
import { getErrorMessage, tutorialService } from "../services/tutorialService";
import type { Tutorial } from "../types/tutorial";
import { formatDateTime } from "../utils/formatDateTime";
import { PageContainer } from "../components/layout/PageContainer";
import { EditTutorialModal } from "../components/tutorials/EditTutorialModal";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Spinner } from "../components/ui/Spinner";

export function TutorialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const tutorialId = Number(id);

  const fetchTutorial = useCallback(async () => {
    if (!tutorialId || Number.isNaN(tutorialId)) {
      showToast("ID de tutorial inválido", "error");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const response = await tutorialService.getById(tutorialId);
      setTutorial(response.data);
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [tutorialId, showToast, navigate]);

  useEffect(() => {
    void fetchTutorial();
  }, [fetchTutorial]);

  const handleDelete = async () => {
    if (!tutorial) return;

    setDeleting(true);
    try {
      await tutorialService.remove(tutorial.id);
      showToast("Tutorial eliminado correctamente", "success");
      navigate("/");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Spinner />
      </PageContainer>
    );
  }

  if (!tutorial) return null;

  return (
    <PageContainer
      title={tutorial.title}
      description="Información completa del tutorial y su detalle asociado."
      action={
        <div className="flex flex-wrap gap-2">
          <Link to="/">
            <Button variant="secondary">Volver</Button>
          </Link>
          <Button variant="secondary" onClick={() => setEditOpen(true)}>
            Editar
          </Button>
          <Button variant="danger" onClick={() => setDeleteOpen(true)}>
            Eliminar
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="ud-card-accent p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-ud-dark">Tutorial</h2>
            <Badge published={tutorial.published} />
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-medium text-ud-gray">ID</dt>
              <dd className="mt-1 text-ud-dark">{tutorial.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-ud-gray">Descripción</dt>
              <dd className="mt-1 text-ud-dark">{tutorial.description}</dd>
            </div>
          </dl>
        </section>

        <section className="ud-card-accent p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-ud-dark">Detalle (1:1)</h2>
          {tutorial.detail ? (
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-medium text-ud-gray">Usuario creador</dt>
                <dd className="mt-1 text-ud-dark">{tutorial.detail.created_by}</dd>
              </div>
              <div>
                <dt className="font-medium text-ud-gray">Fecha de creación</dt>
                <dd className="mt-1 text-ud-dark">
                  {formatDateTime(tutorial.detail.created_on, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ud-gray">ID detalle</dt>
                <dd className="mt-1 text-ud-dark">{tutorial.detail.id}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-ud-gray">Este tutorial no tiene detalle asociado.</p>
          )}
        </section>
      </div>

      <EditTutorialModal
        tutorialId={tutorial.id}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={() => void fetchTutorial()}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Eliminar tutorial"
        message={`¿Seguro que deseas eliminar "${tutorial.title}"?`}
        loading={deleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteOpen(false)}
      />
    </PageContainer>
  );
}
