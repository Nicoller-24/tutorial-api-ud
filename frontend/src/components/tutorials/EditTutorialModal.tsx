import { useEffect, useState } from "react";

import { useToast } from "../../hooks/useToast";
import { getErrorMessage, tutorialService } from "../../services/tutorialService";
import type { Tutorial } from "../../types/tutorial";
import { formatDateTime } from "../../utils/formatDateTime";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Spinner } from "../ui/Spinner";
import { Textarea } from "../ui/Textarea";

interface EditTutorialModalProps {
  tutorialId: number | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function EditTutorialModal({ tutorialId, open, onClose, onSaved }: EditTutorialModalProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
    if (!open || !tutorialId) return;

    const fetchTutorial = async () => {
      setLoading(true);
      try {
        const response = await tutorialService.getById(tutorialId);
        const data = response.data;
        setTutorial(data);
        setTitle(data.title);
        setDescription(data.description);
        setPublished(data.published);
        setCreatedBy(data.detail?.created_by ?? "");
      } catch (error) {
        showToast(getErrorMessage(error), "error");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    void fetchTutorial();
  }, [open, tutorialId, onClose, showToast]);

  const handleSave = async () => {
    if (!tutorialId) return;

    setSaving(true);
    try {
      await tutorialService.update(tutorialId, { title, description, published });

      if (tutorial?.detail && createdBy.trim()) {
        await tutorialService.updateDetail(tutorialId, { created_by: createdBy.trim() });
      }

      showToast("Tutorial actualizado correctamente", "success");
      onSaved();
      onClose();
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Editar tutorial"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={() => void handleSave()} loading={saving}>
            Guardar cambios
          </Button>
        </>
      }
    >
      {loading ? (
        <Spinner label="Cargando tutorial..." />
      ) : (
        <div className="space-y-5">
          <Input label="Título" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={255} />
          <Textarea
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={255}
          />
          <label className="flex items-center gap-3 rounded-lg border border-ud-yellow/30 bg-ud-yellow-light/40 px-4 py-3">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-ud-gray-light text-ud-burgundy focus:ring-ud-burgundy"
            />
            <span className="text-sm font-medium text-ud-dark">Publicado (visible)</span>
          </label>

          {tutorial?.detail && (
            <>
              <Input
                label="Usuario creador"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                maxLength={255}
              />
              <Input
                label="Fecha de creación"
                value={formatDateTime(tutorial.detail.created_on)}
                disabled
              />
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
