import { Link } from "react-router-dom";

import type { TutorialListItem } from "../../types/tutorial";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface TutorialCardProps {
  tutorial: TutorialListItem;
  onEdit: (tutorial: TutorialListItem) => void;
  onDelete: (tutorial: TutorialListItem) => void;
}

export function TutorialCard({ tutorial, onEdit, onDelete }: TutorialCardProps) {
  return (
    <article className="ud-card-accent flex h-full flex-col p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 font-serif text-lg font-semibold text-ud-dark">{tutorial.title}</h3>
        <Badge published={tutorial.published} />
      </div>

      <p className="mb-5 line-clamp-3 flex-1 text-sm text-ud-gray">{tutorial.description}</p>

      <div className="flex flex-wrap gap-2 border-t border-ud-yellow-light pt-4">
        <Link to={`/tutorials/${tutorial.id}`} className="flex-1 sm:flex-none">
          <Button variant="secondary" className="w-full">
            Ver detalle
          </Button>
        </Link>
        <Button variant="ghost" onClick={() => onEdit(tutorial)}>
          Editar
        </Button>
        <Button variant="ghost" className="text-ud-burgundy hover:bg-ud-yellow-light" onClick={() => onDelete(tutorial)}>
          Eliminar
        </Button>
      </div>
    </article>
  );
}
