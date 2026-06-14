import {
  ArrowRight,
  CheckCircle2,
  ListChecks,
  MessageCircle,
  Save,
  Share2,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import { useCareers } from "../hooks/useCareers";
import { planService } from "../services/planService";
import { useAppContext } from "../state/appState";
import type { PlanViewModel } from "../types/domain";

export default function PlanPage() {
  const navigate = useNavigate();
  const {
    comparisonId,
    authUser,
    planId,
    profile,
    selectedCareers,
    setCompletedTasks,
    setPlanId,
  } = useAppContext();
  const { data: careers, loading: careersLoading, error: careersError } = useCareers();
  const [plan, setPlan] = useState<PlanViewModel | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const targetCareer = useMemo(() => {
    return (
      careers.find((career) => career.id === selectedCareers[0]) ?? careers[0]
    );
  }, [careers, selectedCareers]);

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      if (careersLoading) return;

      if (careersError) {
        setError(careersError);
        setLoading(false);
        return;
      }

      if (!targetCareer) {
        setError("Selecciona una carrera para crear el plan.");
        setLoading(false);
        return;
      }

      const studentProfileId = profile.id ?? authUser?.studentProfileId ?? undefined;

      if (!studentProfileId) {
        setError("Crea tu perfil primero.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const existingPlans = await planService.listPlans(
          studentProfileId,
          targetCareer.id,
        );
        const existing =
          existingPlans.find((item) => item.id === planId) ?? existingPlans[0];
        const nextPlan =
          existing ??
          (await planService.createPlan({
            studentProfileId,
            targetCareer,
            comparisonId,
          }));

        if (active) {
          setPlan(nextPlan);
          setPlanId(nextPlan.id);
          setCompletedTasks(
            nextPlan.tasks
              .filter((task) => task.status === "done")
              .map((task) => task.id),
          );
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error cargando plan.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlan();

    return () => {
      active = false;
    };
  }, [
    careersError,
    careersLoading,
    comparisonId,
    authUser?.studentProfileId,
    planId,
    profile.id,
    setCompletedTasks,
    setPlanId,
    targetCareer,
  ]);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 1800);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const toggleTask = async (taskId: string) => {
    if (!plan) return;
    const task = plan.tasks.find((item) => item.id === taskId);
    if (!task) return;

    const nextStatus = task.status === "done" ? "pending" : "done";
    const nextPlan = await planService.updateTaskStatus(
      plan.id,
      taskId,
      nextStatus,
    );

    setPlan(nextPlan);
    setCompletedTasks(
      nextPlan.tasks
        .filter((item) => item.status === "done")
        .map((item) => item.id),
    );
  };

  if (loading || careersLoading) {
    return (
      <AppFrame title="Tu plan" subtitle="Armando pasos." progress={94}>
        <Surface className="surface--stack">
          <div className="post-section-title">
            <span>
              <ListChecks size={18} />
            </span>
            <div>
              <strong>Preparando plan</strong>
              <p>Un momento.</p>
            </div>
          </div>
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line" />
        </Surface>
      </AppFrame>
    );
  }

  if (error || !plan) {
    const needsProfile = error === "Crea tu perfil primero.";

    return (
      <AppFrame
        title={needsProfile ? "Falta un paso" : "No cargo"}
        subtitle={
          needsProfile
            ? "Completa preferencias y volvemos al plan."
            : error ?? "No hay plan disponible."
        }
        progress={94}
      >
        <Surface className="surface--stack post-empty-state">
          <UserRoundCheck size={34} />
          <strong>{needsProfile ? "Primero preferencias" : "Elige carrera"}</strong>
          <p>
            {needsProfile
              ? "Asi el plan queda conectado a tu perfil."
              : "Compara dos carreras antes de crear plan."}
          </p>
          <SecondaryButton
            onClick={() => navigate(needsProfile ? "/onboarding" : "/compare")}
          >
            {needsProfile ? "Completar preferencias" : "Elegir carreras"}
          </SecondaryButton>
        </Surface>
      </AppFrame>
    );
  }

  const completedCount = plan.tasks.filter((task) => task.status === "done").length;

  return (
    <AppFrame title="Tu plan" subtitle="Pasos simples para avanzar." progress={94}>
      <Surface className="surface--stack plan-shell">
        <div className="plan-header plan-header--visual">
          <div>
            <span className="eyebrow">
              <CheckCircle2 size={14} />
              {completedCount} listas
            </span>
            <h2>Tu siguiente jugada.</h2>
          </div>

          <div className="progress-ring">
            <strong>{plan.progressPercent}%</strong>
            <span>avance</span>
          </div>
        </div>

        <div className="plan-mini-steps">
          <span>
            <ListChecks size={15} />
            Revisar
          </span>
          <span>
            <MessageCircle size={15} />
            Conversar
          </span>
          <span>
            <Save size={15} />
            Guardar
          </span>
        </div>

        <div className="task-list task-list--visual">
          {plan.tasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              due={task.due}
              checked={task.status === "done"}
              onToggle={() => void toggleTask(task.id)}
            />
          ))}
        </div>

        <div className="community-card community-card--visual">
          <div>
            <span className="badge badge--soft">
              <MessageCircle size={13} />
              Comunidad UTP
            </span>
            <h3>Pregunta rapido</h3>
            <p>Una duda menos pesa menos.</p>
          </div>

          <button className="community-card__img" type="button">
            Ver comunidad
          </button>
        </div>
      </Surface>

      {saved ? <StatusToast title="Listo" body="Plan guardado." /> : null}

      <StickyCTA
        left={
          <SecondaryButton onClick={() => navigate("/summary")}>
            <Share2 size={16} />
            Resumen
          </SecondaryButton>
        }
        right={
          <PrimaryButton onClick={() => setSaved(true)}>
            <Save size={16} />
            Guardar
            <ArrowRight size={16} />
          </PrimaryButton>
        }
      />
    </AppFrame>
  );
}
