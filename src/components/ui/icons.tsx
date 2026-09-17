import {
  Award,
  Boxes,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Database,
  FlaskConical,
  FolderGit2,
  GitBranch,
  GraduationCap,
  House,
  Layers,
  LayoutDashboard,
  Mail,
  PenLine,
  Plug,
  Search,
  Server,
  Smartphone,
  Sparkles,
  User,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon, MediumIcon } from './BrandIcons'
import type { NavItem } from '../../data/navigation'
import type { SkillGroup } from '../../data/skills'
import type { FocusArea } from '../../data/aiLab'
import type { SocialId } from '../../data/site'

/**
 * Icon name → component maps.
 *
 * Data files reference icons by name so they stay free of JSX and imports;
 * these maps are the single place where a name becomes a component.
 */

export const navIcons: Record<NavItem['icon'], LucideIcon> = {
  home: House,
  user: User,
  briefcase: Briefcase,
  folder: FolderGit2,
  layers: Layers,
  sparkles: Sparkles,
  graduation: GraduationCap,
  award: Award,
  pen: PenLine,
  mail: Mail,
}

export const skillIcons: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code2,
  smartphone: Smartphone,
  layout: LayoutDashboard,
  server: Server,
  database: Database,
  sparkles: Sparkles,
  cloud: Cloud,
  git: GitBranch,
  flask: FlaskConical,
}

export const focusIcons: Record<FocusArea['icon'], LucideIcon> = {
  search: Search,
  brain: Brain,
  boxes: Boxes,
  database: Database,
  cloud: Cloud,
  plug: Plug,
}

export const socialIcons: Record<SocialId, typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  medium: MediumIcon,
}
