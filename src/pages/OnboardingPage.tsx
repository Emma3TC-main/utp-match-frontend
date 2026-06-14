import type { FormEvent } from "react";
import { useState } from "react";
import { GitCompareArrows, Sparkles, UserRoundCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AppFrame,
  PrimaryButton,
  SecondaryButton,
  StickyCTA,
  Surface,
} from "../components/ui";
import {
  mapProfileDtoToState,
  profileService,
} from "../services/profileService";
import { useAppContext } from "../state/appState";
import type { ProfileState } from "../state/appState";

const interestPicks = [
  "Tecnologia",
  "Negocios",
  "Diseno",
  "Salud",
  "Derecho",
  "Ambiente",
];

const skillPicks = [
  "Logica",
  "Creatividad",
  "Comunicacion",
  "Liderazgo",
  "Curiosidad",
  "Practica",
];

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(value: string[]): string {
  return value.join(", ");
}

function addToken(current: string, token: string): string {
  const items = splitList(current);
  const exists = items.some(
    (item) => item.toLowerCase() === token.toLowerCase(),
  );

  return exists ? current : joinList([...items, token]);
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { authUser, profile, setProfile, updateAuthUser } = useAppContext();
  const [form, setForm] = useState<ProfileState>(profile);
  const [interestsText, setInterestsText] = useState(joinList(profile.interests));
  const [skillsText, setSkillsText] = useState(joinList(profile.skills));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Falta tu nombre.");
      return;
    }

    try {
      setLoading(true);
      const profileDto = await profileService.createProfile(
        {
          ...form,
          interests: splitList(interestsText),
          skills: splitList(skillsText),
        },
        authUser?.id,
      );
      const nextProfile = mapProfileDtoToState(profileDto);

      setProfile(nextProfile);
      updateAuthUser({
        studentProfileId: String(profileDto.id),
      });

      navigate("/compare");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppFrame
      title="Tus preferencias"
      subtitle="Paso 2: completa lo clave y luego comparas."
      progress={34}
    >
      <Surface className="surface--stack">
        <div className="profile-boost">
          <UserRoundCheck size={18} />
          <div>
            <strong>Después del test</strong>
            <span>Ajusta tus gustos. Luego vas a comparar carreras.</span>
          </div>
        </div>

        <div className="preference-flow">
          <span className="preference-flow__step preference-flow__step--active">
            <Sparkles size={15} />
            Test listo
          </span>
          <span className="preference-flow__step preference-flow__step--active">
            <UserRoundCheck size={15} />
            Preferencias
          </span>
          <span className="preference-flow__step">
            <GitCompareArrows size={15} />
            Comparar
          </span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Nombre</span>
            <div className="input-with-icon">
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Tu nombre"
                required
              />
            </div>
          </label>

          <label>
            <span>Grado</span>
            <div className="input-with-icon">
              <select
                value={form.year}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    year: event.target.value as ProfileState["year"],
                  }))
                }
              >
                <option value="4_secundaria">4to de secundaria</option>
                <option value="5_secundaria">5to de secundaria</option>
                <option value="egresado">Egresado</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </label>

          <label>
            <span>Me gusta</span>
            <div className="quick-pick-list">
              {interestPicks.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setInterestsText((current) => addToken(current, item))
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="input-with-icon">
              <input
                value={interestsText}
                onChange={(event) => setInterestsText(event.target.value)}
                placeholder="tecnologia, datos..."
              />
            </div>
          </label>

          <label>
            <span>Soy bueno en</span>
            <div className="quick-pick-list">
              {skillPicks.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setSkillsText((current) => addToken(current, item))
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="input-with-icon">
              <input
                value={skillsText}
                onChange={(event) => setSkillsText(event.target.value)}
                placeholder="logica, creatividad..."
              />
            </div>
          </label>

          <label>
            <span>Duda</span>
            <div className="input-with-icon">
              <input
                value={form.doubts}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    doubts: event.target.value,
                  }))
                }
                placeholder="campus, costos, modalidad..."
              />
            </div>
          </label>

          <label>
            <span>Me preocupa</span>
            <div className="input-with-icon">
              <input
                value={form.worry}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    worry: event.target.value,
                  }))
                }
                placeholder="mate, empleo, primeros ciclos..."
              />
            </div>
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <StickyCTA
            left={
              <SecondaryButton onClick={() => navigate("/compare")}>
                Comparar directo
              </SecondaryButton>
            }
            right={
              <PrimaryButton type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar y comparar"}
              </PrimaryButton>
            }
          />
        </form>
      </Surface>
    </AppFrame>
  );
}
