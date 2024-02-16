import { pathToRoot } from '../util/path';
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from './types';
import { classNames } from '../util/lang';
import { i18n } from '../i18n';
import script from './scripts/pagetitle.inline';

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
	const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title;
	const baseDir = pathToRoot(fileData.slug!);

	return (
		<div>
			<h1 id="site-title" class={classNames(displayClass, 'page-title')}>
				<a href={baseDir}>{title}</a>
			</h1>
			<h2 class={classNames(displayClass, 'page-sub-title')}>
				Discussions et écrits autour de la tech, des jeux vidéos, de la sociologie et de la
				musique
			</h2>
		</div>
	);
};

PageTitle.css = `
.page-title {
  font-size: 2.5rem;
  margin: 0;
}

.page-sub-title {
  font-size: 0.875rem;
  font-weight: 100;
  font-family: sans-serif;
  margin: 0;
  margin-top: 16px;
  line-height: 125%;
  color: var(--dark);
}
`;

export default (() => {
	PageTitle.afterDOMLoaded = script;

	return PageTitle;
}) satisfies QuartzComponentConstructor;
