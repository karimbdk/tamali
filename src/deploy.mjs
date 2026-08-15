/**
 * Publie l'aperçu sur GitHub Pages.
 *   node src/deploy.mjs
 *
 * Reconstruit le site avec l'URL publique (pour les balises canonical et
 * og:image), puis pousse le contenu de dist/ sur la branche gh-pages.
 * dist/ est ignoré par le dépôt principal : on lui donne ici son propre
 * dépôt jetable, ce qui évite de polluer l'historique du code source.
 */
import { execFileSync } from 'node:child_process';
import { rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const REPO = process.env.DEPLOY_REPO || 'karimbdk/tamali';
const BRANCH = 'gh-pages';
const SITE_URL = process.env.SITE_URL || `https://${REPO.split('/')[0]}.github.io/${REPO.split('/')[1]}`;

const run = (cmd, args, cwd, env) =>
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: false, env: env || process.env });

console.log(`→ génération avec SITE_URL=${SITE_URL}`);
// SITE_URL doit être transmis au sous-processus : sans cela le build
// retombe sur example.com et publie des canonical/og:image inutilisables.
run('node', [join(ROOT, 'src/build.mjs')], ROOT, { ...process.env, SITE_URL });

// Dépôt jetable dans dist/ : recréé à chaque publication.
if (existsSync(join(DIST, '.git'))) await rm(join(DIST, '.git'), { recursive: true, force: true });
await writeFile(join(DIST, '.nojekyll'), '');

console.log(`→ publication sur ${REPO} (${BRANCH})`);
run('git', ['init', '-q', '-b', BRANCH], DIST);
run('git', ['add', '-A'], DIST);
run('git', ['commit', '-q', '-m', 'Publication de l’aperçu'], DIST);
run('git', ['push', '--force', '-q', `https://github.com/${REPO}.git`, `${BRANCH}:${BRANCH}`], DIST);
await rm(join(DIST, '.git'), { recursive: true, force: true });

console.log(`✓ en ligne sur ${SITE_URL}/`);
