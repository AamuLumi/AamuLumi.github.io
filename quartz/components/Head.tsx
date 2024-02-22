import { i18n } from '../i18n';
import { FullSlug, joinSegments, pathToRoot } from '../util/path';
import { JSResourceToScriptElement } from '../util/resources';
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from './types';

const imagesExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];

export default (() => {
	const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
		const title = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title;
		let description =
			fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description;
		const { css, js } = externalResources;

		const url = new URL(`https://${cfg.baseUrl ?? 'example.com'}`);
		const path = url.pathname as FullSlug;
		const baseDir = fileData.slug === '404' ? path : pathToRoot(fileData.slug!);

		const iconPath = joinSegments(baseDir, 'static/icon.png');

		let headerImage = fileData.frontmatter?.titleImage as string;
		let ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`;

		if (headerImage) {
			const ext = headerImage.substring(headerImage.lastIndexOf('.'));

			if (imagesExtensions.includes(ext)) {
				headerImage = `${headerImage.substring(0, headerImage.lastIndexOf('.'))}.webp`;
			}

			ogImagePath = `https://${cfg.baseUrl}/_assets/headers/${encodeURIComponent(headerImage)}`;
		}

		if (fileData.frontmatter?.subtitle) {
			description = fileData.frontmatter.subtitle as string;
		}

		return (
			<head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				{cfg.baseUrl && <meta property="og:image" content={ogImagePath} />}
				<meta property="og:width" content="1200" />
				<meta property="og:height" content="675" />
				<link rel="icon" href={iconPath} />
				<meta name="description" content={description} />
				<meta name="generator" content="Quartz" />
				{cfg.theme.cdnCaching && (
					<>
						<link rel="preconnect" href="https://fonts.googleapis.com" />
						<link rel="preconnect" href="https://fonts.gstatic.com" />
					</>
				)}
				{css.map((href) => (
					<link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
				))}
				{js
					.filter((resource) => resource.loadTime === 'beforeDOMReady')
					.map((res) => JSResourceToScriptElement(res, true))}
			</head>
		);
	};

	return Head;
}) satisfies QuartzComponentConstructor;
