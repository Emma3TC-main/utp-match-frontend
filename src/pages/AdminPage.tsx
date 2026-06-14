import { CircleCheckBig, Search } from 'lucide-react'
import { AppFrame, Chip, PrimaryButton, Surface } from '../components/ui'
import { adminCatalog } from '../data/demo'

const CATALOG_FILTERS = ['Carreras', 'Cursos', 'Borradores', 'Publicados']

export default function AdminPage() {
  return (
    <AppFrame title="Catálogo simplificado" subtitle="Esta vista es funcional, pero no compite con el flujo principal." progress={38}>
      <Surface className="surface--stack">
        <div className="sticky-search">
          <label className="search-box">
            <Search size={16} />
            <input placeholder="Buscar catálogo..." />
          </label>

          <div className="chip-row chip-row--scroll">
            {CATALOG_FILTERS.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </div>

        <Surface>
          <h3>Lista de carreras</h3>
          <div className="catalog-list">
            {adminCatalog.map((item) => (
              <div key={item.title} className="catalog-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>Estado: {item.state}</p>
                </div>

                <CircleCheckBig size={18} />
              </div>
            ))}
          </div>
        </Surface>

        <PrimaryButton>Agregar curso</PrimaryButton>
      </Surface>
    </AppFrame>
  )
}
