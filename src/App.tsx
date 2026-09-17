import { Suspense, lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { PageContainer } from './components/layout/PageContainer'
import { RouteFallback } from './components/layout/RouteFallback'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { ThemeProvider } from './hooks/useTheme'
import { Home } from './pages/Home'

/**
 * Home is bundled eagerly — it is the entry point for almost every visit, and
 * it already contains every section component. The remaining routes are
 * deep-link destinations, so they are split out and fetched on demand rather
 * than paid for on first load.
 */
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const AiPage = lazy(() => import('./pages/AiPage').then((m) => ({ default: m.AiPage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })))
const CertificationsPage = lazy(() =>
  import('./pages/CertificationsPage').then((m) => ({ default: m.CertificationsPage })),
)
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const EducationPage = lazy(() => import('./pages/EducationPage').then((m) => ({ default: m.EducationPage })))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails').then((m) => ({ default: m.ProjectDetails })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const SkillsPage = lazy(() => import('./pages/SkillsPage').then((m) => ({ default: m.SkillsPage })))

/**
 * HashRouter is deliberate.
 *
 * GitHub Pages serves static files with no rewrite rules, so a hard refresh on
 * /projects/flight-booking would 404 under BrowserRouter. Hash routing works on
 * Pages, on a custom domain, and from a local `vite preview` without a 404.html
 * redirect hack. See README → "Routing on GitHub Pages".
 */
export default function App() {
  return (
    <ThemeProvider>
      {/* reducedMotion="user" flattens every animation in the app to opacity
          when the OS asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <HashRouter>
          <ScrollToTop />
          <PageContainer>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetails />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/ai" element={<AiPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageContainer>
        </HashRouter>
      </MotionConfig>
    </ThemeProvider>
  )
}
