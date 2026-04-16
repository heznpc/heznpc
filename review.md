# heznpc — review

조사 일자: 2026-04-11
대상 커밋: `0877053`
스택: npm workspaces monorepo · Astro 5.7 (web + gallery 두 앱) · GitHub API → JSON pipeline · GH Pages 배포 (web) + Vercel (gallery)
도메인: heznpc 개인 ecosystem 랜딩 페이지 (`apps/web`) + 일러스트 갤러리 (`apps/gallery`)

---

## 1. 원격 상태 (heznpc/heznpc)

- 미해결 이슈: **0건**
- 미해결 PR: **0건**
- 커밋 25+개 — 활발한 1인 작업 ("rebuild landing page" → "data-driven layout" → "monorepo migration" → "README pin cards")
- CI: `.github/workflows/deploy.yml` (GH Pages, build:web 단일 단계, Node 22)
- 작업 트리: clean

→ 외부 보고 없음. GitHub profile/landing 페이지로서는 일반적으로 issue가 들어오지 않는 카테고리.

---

## 2. 코드 품질 종합

### 강점

- **monorepo 구조**: `npm workspaces`로 `@heznpc/web`, `@heznpc/gallery` 분리. `heznpc.config.mjs` 가 둘의 single source of truth.
- **데이터 파이프라인**: `portfolio.config.mjs` → `generate.mjs` (GitHub API 호출) → `projects.json` → `index.astro` 정적 빌드. config가 GH 데이터를 override 가능. **GH API 실패 시 config-only fallback** — 오프라인/CI 친화적.
- **README의 Pin 카드 패턴**: `profilekit.vercel.app/api/pin?username=heznpc&repo=AirMCP` 를 이용한 dynamic README. 본인 프로젝트(ProfileKit)의 dogfooding.
- **EcoMap SVG**: 4-layer ecosystem 시각화를 hand-crafted SVG로. Foundation→Products→Tools→Research 가시화.
- **카탈로그 탭 필터링**: vanilla JS 60줄. 라이브러리 0.
- **Astro accordion (Starter Series)**: a11y 속성 (`aria-expanded`, `aria-controls`, `role="tabpanel"`) 챙김.
- **GH Pages 자동 배포**: `deploy.yml` 이 push마다 build → upload → deploy. concurrency group으로 race 방지.
- **gh CLI 활용**: `execSync(\`gh repo list ${owner} ...\`)` — Node에서 fetch 대신 gh를 호출. 인증 처리 위임. CI에서 `GH_TOKEN: ${{ github.token }}` 만 넘기면 동작.

### Fix TODO (우선순위순)

**[P1] `apps/gallery` 가 별도 `gallery` 레포와 중복**
- 위치: `/Users/ren/IdeaProjects/App/heznpc/apps/gallery/` ↔ `/Users/ren/IdeaProjects/App/gallery/` (별도 레포 `newtria/gallery`)
- 증상: 같은 도메인의 일러스트 갤러리 코드가 두 레포에 동시 존재. `apps/gallery` 의 src는 별도 레포의 src와 거의 일치하나 (Astro 5.7 vs 6.1 버전 차이), 양쪽 모두 commit 활동. **canonical이 어느 것인지 외부에서 알 수 없음**.
- Fix:
  - 한 곳을 archive하거나, 한 쪽이 다른 쪽을 git submodule로 import.
  - apps/gallery 가 monorepo 통합본이 canonical이라면 별도 `newtria/gallery` 레포는 archive 처리.

**[P1] `heznpc.config.mjs` 의 gallery URL TODO 미해결**
- 위치: `heznpc.config.mjs:16`
  ```js
  gallery: '', // TODO: Vercel deployment URL
  ```
- 증상: 두 앱이 공유하는 brand config의 핵심 link가 비어 있음. apps/web 측에서 갤러리로 보내는 링크가 비어 있을 수 있음.
- Fix: Vercel 배포 후 URL 채우기. 또는 GH Pages에 같이 배포해서 `/gallery/` 서브경로로.

**[P1] portfolio.config.mjs 의 emoji 필드가 surrogate pair escape 사용**
- 위치: `apps/web/portfolio.config.mjs:34` `'\ud83e\uddec'` 등
- 증상: emoji를 \u escape 시퀀스로 박아둠. **에디터에서 읽기 매우 어려움**. 신규 emoji 추가 시 코드 포인트 변환 필요.
- Fix: 파일 인코딩이 UTF-8 이므로 emoji literal 그대로 (`'🧬'`) 사용 가능. 또는 별도 emoji 상수 파일.

**[P2] `EcoMap` 의 layer 색상 hardcoded**
- 위치: `apps/web/src/components/EcoMap.astro:11-15`
- 증상: layer 색이 inline 객체에. 다크/라이트 테마 변경 시 별도 CSS class로 한 번 더 정의. duplication.
- Fix: CSS variables (`--layer-research-bg-dark`, `…-light`) 로 통합. 한 곳 수정.

**[P2] `index.astro` 의 inline `<style>` 부재 + inline style 다수**
- 위치: `apps/web/src/pages/index.astro` 거의 모든 element가 `style="..."` 인라인.
- 증상: 유지보수 어려움. 미디어 쿼리 응답형이 grid template만으로 제한됨. dark mode 토글 시 inline color 직접 못 바꿈.
- Fix: 컴포넌트별 `<style>` block (Astro의 scoped CSS) 또는 Tailwind 도입. 단 코드량이 늘어남 — 트레이드오프.

**[P2] `tab-btn`/`catalog-card` 필터링이 inline JS로**
- 위치: `apps/web/src/pages/index.astro:172-207`
- 증상: vanilla JS로 짧긴 하지만 (1) IIFE로 감싸 외부에서 unreachable, (2) tab 선택 상태가 URL/history에 반영되지 않음 (refresh 시 잃음), (3) keyboard nav (Arrow keys) 부재.
- Fix:
  - `URL.searchParams` 로 `?cat=tools` 같은 쿼리 동기화.
  - `aria-selected` 만으로 끝내지 말고 `roving tabindex` 패턴.

**[P2] generate.mjs 의 GH API 실패 silent**
- 위치: `apps/web/scripts/generate.mjs:42-43`
  ```js
  } catch {
    process.stderr.write('  github fetch failed — using config values only\n');
  }
  ```
- 증상: 실패 시 stderr 한 줄만 출력. CI에서는 catch가 정상 종료로 간주되어 build 통과 → 잘못된 description 으로 배포될 수 있음.
- Fix: CI 환경(`process.env.CI === 'true'`)에서는 GH API 실패 시 exit 1로 fail-fast.

**[P3] 테스트 0개**
- 증상: 유틸/parser 함수가 거의 없으니 자연스럽지만, `groupByCategory` (`utils/types.ts:30`), `generate.mjs` 의 description fallback 우선순위는 unit test로 회귀 가드 가능.
- Fix: 작은 vitest 셋업 + `groupByCategory` 1 case + `generate.mjs` 의 fallback 우선순위 확인.

**[P3] CI에 lint / type-check 부재**
- 위치: `deploy.yml`
- 증상: build만 돌고 lint/type-check 단계 없음. TS strict 모드인데 type 오류가 build 시점까지 안 잡힘.
- Fix: `astro check` 단계 추가.

**[P3] gallery (apps/gallery) 도 별도 build 단계 필요**
- 위치: `deploy.yml:29` `npm run build:web`
- 증상: monorepo인데 web만 배포. gallery는 별도 Vercel 배포 가정. 두 앱의 배포 전략이 다름 → 비대칭.
- Fix: 의도된 분리라면 README에 명시. 또는 두 앱 모두 GH Pages에 mount.

**[P3] `index.astro` 의 1700px 폭 카탈로그 레이아웃이 mobile에서 어떻게 reflow되는지 명확하지 않음**
- 위치: `flagship-grid` `grid-template-columns:1fr 1fr` — 모바일에서 1열로 떨어지는 media query 가 inline에는 없음. global.css에 있을 가능성.
- Fix: Astro의 inline media query (`md:grid-cols-1`) 또는 component scoped CSS.

---

## 3. 테스트 상태

- **테스트 0개.**
- 본질이 정적 사이트 + 데이터 파이프라인이라 unit test 가치가 작은 카테고리. 단 generate.mjs 는 신중히 회귀 가드 필요.

---

## 4. 시장 가치 (2026-04-11 기준, 글로벌 관점)

**한 줄 평**: 시장 가치 N/A — personal landing page. **본인 ecosystem의 진열대**라는 도구적 가치만 있음.

**관점 전환: 1인 ecosystem 진열대로서의 효용**

- **타깃 audience**: 잠재 채용/콜라보/이슈 트래픽 유입자.
- **구조적 강점**:
  - "Building the ecosystem AI lives in" 이라는 thesis가 명확. 단순 portfolio가 아니라 stance 전달.
  - 4-layer (Foundation/Products/Tools/Research) 구분이 readability 높음.
  - 15개 research 논문 + 8개 product/tool + 11개 starter — **"이 사람은 무엇을 만드는가"가 30초 안에 전달됨**.
- **portfolio 경쟁자**: GH 프로필 README, Linktree, Carrd, 개인 도메인. 본 사이트는 **Astro 직접 빌드 + GH API 자동화** 라는 dev-first 접근으로 차별화. 동종 portfolio 중 상위 5%.
- **비교 reference**:
  - 학계 개인 사이트 (Stanford CS PhD 류): static markdown 렌더, 디자인 약함. 본 사이트가 더 시각적.
  - tech influencer 사이트: 광고 / 강좌 판매 중심. 본 사이트는 OSS portfolio.
- **개선 ROI**:
  - apps/gallery 와의 중복 정리 (P1) → 외부 신뢰도 ↑
  - blog 부분 (`apps/web/src/content/blog/hello-world.md` 1개만 있음) 을 채우면 SEO + 신규 트래픽 유입 가능 ★★★
  - thesis에 부합하는 "ecosystem map"이 시각적으로 잘 작동하므로 이걸 OG 이미지로 만들면 X 공유 시 강력
- **수익화**: 0. portfolio는 지렛대 (lead → 다른 product) 로만 가치.

---

## 5. 한 줄 요약

> 1인 monorepo portfolio로서는 매우 잘 만들어진 dev-first landing — generate 파이프라인, EcoMap, 카탈로그 필터까지 깔끔. **gallery 레포 중복 해결, gallery URL 채우기, emoji escape literal화** 3개 정리하면 상위 5% portfolio. 시장 가치는 본인 ecosystem의 진열대로서만 의미.

## Sources

(N/A — personal portfolio 카테고리, 글로벌 시장 비교 무의미)
