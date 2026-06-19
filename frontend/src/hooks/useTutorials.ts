import { useCallback, useEffect, useState } from "react";

import { getErrorMessage, tutorialService } from "../services/tutorialService";
import type { TutorialListItem } from "../types/tutorial";

import { useToast } from "./useToast";

export function useTutorials() {
  const { showToast } = useToast();
  const [tutorials, setTutorials] = useState<TutorialListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTutorials = useCallback(async () => {
    setLoading(true);
    try {
      const response = await tutorialService.list();
      const data = response.data;
      if (!Array.isArray(data)) {
        setTutorials([]);
        showToast("La API devolvió un formato inesperado al listar tutoriales", "error");
        return;
      }
      setTutorials(data);
    } catch (error) {
      setTutorials([]);
      showToast(getErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void fetchTutorials();
  }, [fetchTutorials]);

  return { tutorials, loading, fetchTutorials, setTutorials };
}
