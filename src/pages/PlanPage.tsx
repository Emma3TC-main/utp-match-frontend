import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  PrimaryButton,
  SecondaryButton,
  StatusToast,
  StickyCTA,
  Surface,
  TaskItem,
} from "../components/ui";
import { actionTasks } from "../data/demo";
import { useAppContext } from "../state/appState";

export default function PlanPage() {
  const navigate = useNavigate();
  const { completedTasks, toggleTask } = useAppContext();
  const [saved, setSaved] = useState(false);

  const completedCount = completedTasks.length;

  useEffect(() => {
    if (!saved) return;

    const timer = window.setTimeout(() => setSaved(false), 1800);

    return () => window.clearTimeout(timer);
  }, [saved]);

  return (
    <AppFrame
      title="Plan de Acción"
      subtitle="Ahora tienes próximos pasos claros para decidir mejor."
      progress={94}
    >
      <Surface className="surface--stack">
        <div className="plan-header">
          <div>
            <span className="eyebrow">{completedCount} tareas completadas</span>
            <h2>Tu decisión merece pasos concretos.</h2>
          </div>

          <div className="progress-ring">
            <strong>
              {Math.round((completedCount / actionTasks.length) * 100)}%
            </strong>
            <span>avance</span>
          </div>
        </div>

        <div className="task-list">
          {actionTasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              due={task.due}
              checked={completedTasks.includes(task.id)}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>

        <div className="community-card">
          <div>
            <span className="badge badge--soft">Comunidad UTP</span>
            <h3>Habla con alguien que ya lo vivió</h3>
            <p>Una conversación corta puede ayudarte más que una duda larga.</p>
          </div>

          <button className="community-card__img" type="button">
            Ver comunidad
          </button>
        </div>
      </Surface>

      {saved ? (
        <StatusToast
          title="Tu plan fue guardado."
          body="Ahora tienes próximos pasos claros para decidir mejor."
        />
      ) : null}

      <StickyCTA
        left={
          <SecondaryButton onClick={() => navigate("/summary")}>
            Ver resumen para compartir
          </SecondaryButton>
        }
        right={
          <PrimaryButton onClick={() => setSaved(true)}>
            Guardar plan
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
