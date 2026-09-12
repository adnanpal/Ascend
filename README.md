# ASCEND - THE INTERACTIVE QUEST WEB APP

# 🤖 AI & Development Disclosure

ASCEND was developed with the assistance of AI tools during the development process.

AI assistance was used as a development aid for:

- Brainstorming and refining the ASCEND concept
- Application architecture discussions
- React component development
- Frontend UI implementation and refinement
- Tailwind CSS styling
- Debugging and troubleshooting
- Backend/API implementation guidance
- Supabase/database architecture guidance
- RPG progression and XP-system design
- Three.js / React Three Fiber implementation guidance
- Code review and identifying potential bugs
- README/documentation preparation
- Improving animations, transitions, and user experience

### AI Tools Used

The primary AI tools used during development were:

- **ChatGPT** — used for architecture discussions, implementation guidance, debugging, code review, UI/UX ideas, Three.js troubleshooting, RPG-system design, and documentation.
- **Claude** — used for frontend development assistance, UI implementation ideas, code generation/refinement, and development feedback.

AI-generated suggestions and code were reviewed, integrated, modified, and tested as part of the development process.

AI tools were used as development assistants and did not replace the project's underlying application architecture, database, authentication system, or deployment setup.

All AI assistance is disclosed here in accordance with the project's hackathon disclosure requirements.

---

# 🧊 3D Character & Blender

ASCEND uses a 3D character system to visually represent the player's progression.

The character is rendered in the browser using:

- **Three.js**
- **React Three Fiber**
- **@react-three/drei**
- **GLB / glTF 3D models**

The character progression system maps the player's level to different 3D character forms.

Current progression includes:

```text
Level 1 → Astronaut / Spacesuit
Level 2 → Adventurer

Blender

Blender was used during the 3D asset preparation workflow.

It was used to:

Inspect 3D character source files
Prepare character assets for use in the application
Verify character meshes and materials
Work with character rigs and animations
Export character models into GLB/glTF format
Prepare the models for browser-based rendering

The resulting .glb files are loaded by the React Three Fiber character system.

The application does not perform the 3D modeling itself at runtime. Blender is part of the asset preparation pipeline.

🧑‍🚀 3D Character Assets

ASCEND uses character assets from the Quaternius Ultimate Modular Men asset pack.

The character models are used as visual progression forms inside the application.

The assets are converted/exported into browser-compatible GLB files and placed in:

public/
└── models/
    ├── Spacesuit.glb
    └── Adventurer.glb

The character assets are used according to the applicable license of the original asset pack.

The relevant asset source and license should be credited in the project where required.

🎮 Character Rendering Architecture

The 3D character system is organized into several React Three Fiber components:

CharacterChamber
      │
      ▼
CharacterScene
      │
      ▼
Three.js Canvas
      │
      ├── CharacterModel
      │       └── GLB character asset
      │
      ├── Aura
      │       └── Energy wave effect
      │
      ├── RisingParticles
      │       └── Floating energy particles
      │
      ├── Lighting
      │
      └── OrbitControls
CharacterModel

CharacterModel determines which character model should be displayed based on the player's current level.

Conceptually:

Player Level
     ↓
Character Progression Map
     ↓
Character GLB
     ↓
React Three Fiber
     ↓
Three.js Renderer

This allows new character forms to be added by extending the progression mapping.

✨ Character Effects

The character chamber combines the 3D character with additional visual effects.

Aura

The Aura component creates a horizontal energy ring that rises from the character's platform and fades as it moves upward.

Rising Particles

The RisingParticles component creates continuously moving particles around the character to reinforce the cosmic energy theme.

Lighting

The scene uses multiple Three.js lights to create cyan and violet illumination around the character.

Camera & Controls

The character can be viewed through orbit controls while zooming and panning are restricted to maintain the intended presentation.

⚡ Level-Up Character Transformation

Character progression is connected to the backend-authoritative player level.

The intended progression flow is:

Quest Completed
      ↓
Backend calculates reward
      ↓
Player XP updated
      ↓
Level calculated
      ↓
Level-up detected
      ↓
Level-up animation
      ↓
Character form revealed
      ↓
New character appears

This connects the productivity system directly to the visual RPG progression.

🧰 Development Tools

The project was developed using a combination of conventional development tools and AI-assisted development.

Core Development
VS Code
Node.js
npm
Git
GitHub
Frontend
React
Vite
Tailwind CSS
React Router
Framer Motion
Lucide React
Backend
Node.js
Express
Supabase JS
Database & Authentication
Supabase
PostgreSQL
Supabase Auth
Row Level Security
3D
Blender
Three.js
React Three Fiber
@react-three/drei
glTF / GLB
AI Assistance
ChatGPT
Claude
📋 Third-Party Resources & Attribution

ASCEND uses third-party libraries, frameworks, development tools, and 3D assets.

Major dependencies and resources include:

React
Vite
Tailwind CSS
React Router
Framer Motion
Lucide React
Express
Supabase
Three.js
React Three Fiber
@react-three/drei
Blender
Quaternius 3D character assets

Each third-party resource remains subject to its own license and terms.

Where required, the corresponding license and attribution should be retained with the project.

⚠️ Known Issue: WebGL Context Loss

The 3D character scene may occasionally experience a WebGL context loss during navigation.

The browser console may display:

THREE.WebGLRenderer: Context Lost.

When this happens, the page or character scene may temporarily appear black.

Current workaround

If a black screen appears:

Refresh the browser page.
Allow the application to reload.
The 3D character scene should be recreated.

The player's progression is stored in the backend database and is not dependent on the browser's WebGL state.

Future improvement

The current implementation mounts the Three.js Canvas within the character chamber.

A future improvement would be to maintain a persistent Three.js Canvas across route changes, reducing WebGL renderer creation/destruction and improving context stability.

This is a known technical limitation of the current hackathon version.

🧪 Hackathon Development Notes

ASCEND was built as a rapid full-stack hackathon project.

The implementation prioritizes:

A functional end-to-end productivity loop
Secure authentication
Persistent backend data
Backend-controlled progression
RPG-inspired UX
3D character progression
Visual feedback and animation
Responsive application design

Some areas may receive additional hardening and optimization after the initial hackathon submission.

📜 Credits
3D Assets

Character assets:

Quaternius — Ultimate Modular Men

Used as part of ASCEND's 3D character progression system according to the applicable asset license.

3D Software

Blender was used for 3D asset inspection, preparation, animation/rig workflow, and GLB/glTF export.

AI Development Assistance

ChatGPT and Claude were used as development assistants for ideation, architecture, coding assistance, debugging, UI/UX refinement, Three.js troubleshooting, and documentation.

AI assistance is explicitly disclosed as part of the project's development process.


### One important hackathon point

I would **keep this disclosure exactly this transparent**. In particular, don't write something like *“AI was only used for minor suggestions”* if you actually used ChatGPT/Claude extensively for implementation. Your rules specifically require disclosure, so being clear about **what tools were used and what they helped with** is safer.

Also, because the 3D models came from a third-party asset pack, the README should retain the **actual Quaternius license/attribution wording or link** required by that pack rather than merely saying “according to the license.” If you give me the exact asset-pack license file/link you're using, I can add the precise attribution section without guessing.
