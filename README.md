# UTP Match Frontend

Frontend de UTP Match construido con React, TypeScript y Vite.

## Requisitos

- Node.js 20 o superior
- npm
- Backend corriendo en `http://localhost:3000`

Verifica versiones:

```bash
node -v
npm -v
```

## Instalacion

Desde la carpeta del frontend:

```bash
cd utp-match-frontend
npm install
```

## Configuracion

Crea o revisa el archivo `.env` en `utp-match-frontend`:

```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCKS=false
```

Importante:

- `VITE_API_URL` debe ser la URL base del backend.
- Correcto: `http://localhost:3000`
- Incorrecto: `http://localhost:3000/v1/careers`
- Si cambias `.env`, reinicia Vite.

## Levantar en desarrollo

```bash
npm run dev
```

Abre:

```txt
http://localhost:5173
```

En Windows, si PowerShell bloquea `npm`, usa:

```bash
npm.cmd run dev
```

## Comandos disponibles

```bash
npm run dev
```

Levanta el frontend en modo desarrollo.

```bash
npm run build
```

Compila TypeScript y genera la version de produccion.

```bash
npm run lint
```

Revisa errores de lint.

```bash
npm run preview
```

Sirve localmente el build de produccion.

## Flujo recomendado para probar

1. Abre `http://localhost:5173/welcome`.
2. Clic en `Iniciar test`.
3. Completa el test vocacional.
4. Clic en `Completar mis preferencias`.
5. Guarda el perfil.
6. Selecciona dos carreras.
7. Compara carreras.
8. Revisa las tabs de comparacion.
9. Abre un curso.
10. Revisa la explicacion IA.
11. Entra a match.
12. Crea un plan.
13. Guarda el plan.
14. Abre el resumen.

## Conexion con backend

El frontend consume el backend usando:

```env
VITE_API_URL=http://localhost:3000
```

Endpoints usados por el frontend:

```txt
/v1/careers
/v1/auth/guest-session
/v1/profiles
/v1/comparisons
/v1/syllabi/:id/explanations
/v1/plans
/v1/shares
/v1/ai/ask
/v1/ai/status
```

## Modo mocks

Para usar datos mock locales:

```env
VITE_USE_MOCKS=true
```

Para usar backend real:

```env
VITE_USE_MOCKS=false
```

Recomendado para integracion real:

```env
VITE_USE_MOCKS=false
```

## Problemas comunes

### No carga carreras

Revisa:

```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCKS=false
```

Tambien confirma que el backend este levantado.

### Error 404 en carreras

No pongas `/v1/careers` en `VITE_API_URL`.

Debe ser:

```env
VITE_API_URL=http://localhost:3000
```

### Cambie `.env` y no se actualiza

Deten el servidor y vuelve a correr:

```bash
npm run dev
```

o en Windows:

```bash
npm.cmd run dev
```

### PowerShell bloquea npm

Usa:

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

## Build de produccion

```bash
npm run build
npm run preview
```

## Notas

- El test vocacional visual es local del frontend.
- El resultado del test se guarda en `localStorage`.
- Las carreras, comparacion, cursos, planes, shares e IA usan backend real cuando `VITE_USE_MOCKS=false`.
- No subas `.env` si contiene URLs o configuraciones privadas.
