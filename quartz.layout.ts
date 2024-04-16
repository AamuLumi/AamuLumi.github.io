import { PageLayout, SharedLayout } from './quartz/cfg';
import * as Component from './quartz/components';

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
	head: Component.Head(),
	header: [],
	footer: Component.Footer({
		links: {
			Mastodon: 'https://rivals.space/@aamulumi',
			GitHub: 'https://github.com/AamuLumi/blog-next',
			SoundCloud: 'https://soundcloud.com/aamulumi',
		},
	}),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
	beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.TagList()],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.Search(),
		Component.MobileOnly(Component.Spacer()),
		Component.Explorer(),
		Component.DesktopOnly(
			Component.RecentNotes({
				title: '📝 Derniers articles',
				limit: 3,
			}),
		),
	],
	right: [Component.DesktopOnly(Component.TableOfContents())],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
	beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.Search(),
		Component.Darkmode(),
		Component.DesktopOnly(Component.Explorer()),
	],
	right: [],
};
