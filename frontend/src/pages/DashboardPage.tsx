import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useTutorials } from "../hooks/useTutorials";
import { useToast } from "../hooks/useToast";
import { getErrorMessage, tutorialService } from "../services/tutorialService";
import type { TutorialListItem } from "../types/tutorial";
import { PageContainer } from "../components/layout/PageContainer";
import { EditTutorialModal } from "../components/tutorials/EditTutorialModal";
import { SearchBar } from "../components/tutorials/SearchBar";
import { TutorialCard } from "../components/tutorials/TutorialCard";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { EmptyState } from "../components/ui/EmptyState";
import { Spinner } from "../components/ui/Spinner";

export function DashboardPage() {
  const { tutorials, loading, fetchTutorials } = useTutorials();
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TutorialListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredTutorials = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tutorials;
    return tutorials.filter((tutorial) => tutorial.title.toLowerCase().includes(query));
  }, [search, tutorials]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await tutorialService.remove(deleteTarget.id);
      showToast("Tutorial eliminado correctamente", "success");
      setDeleteTarget(null);
      await fetchTutorials();
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageContainer
      title="Dashboard de tutoriales"
      description="Gestiona tutoriales y su detalle asociado (relación 1:1)."
      action={
        <Link to="/tutorials/new">
          <Button>Crear tutorial</Button>
        </Link>
      }
    >
      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading ? (
        <Spinner />
      ) : filteredTutorials.length === 0 ? (
        <EmptyState
          title={search ? "Sin resultados" : "No hay tutoriales"}
          description={
            search
              ? "No encontramos tutoriales que coincidan con tu búsqueda."
              : "Comienza creando tu primer tutorial para el contexto de aprendizaje virtual."
          }
          action={
            !search ? (
              <Link to="/tutorials/new">
                <Button>Crear tutorial</Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onEdit={(item) => setEditId(item.id)}
              onDelete={(item) => setDeleteTarget(item)}
            />
          ))}
        </div>
      )}

      <EditTutorialModal
        tutorialId={editId}
        open={editId !== null}
        onClose={() => setEditId(null)}
        onSaved={() => void fetchTutorials()}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Eliminar tutorial"
        message={`¿Seguro que deseas eliminar "${deleteTarget?.title}"? Esta acción también eliminará su detalle.`}
        loading={deleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageContainer>
  );
}
