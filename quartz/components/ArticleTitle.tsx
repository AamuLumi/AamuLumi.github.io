import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from './types';
import ContentMeta from './ContentMeta';
import { classNames } from '../util/lang';

const imagesExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];

const ArticleTitle: QuartzComponent = (props: QuartzComponentProps) => {
	const { fileData, displayClass } = props;
	const title = fileData.frontmatter?.title;
	let titleImage = fileData.frontmatter?.titleImage as string;
	const subTitle = fileData.frontmatter?.subtitle as string;

	const ContentMetaComponent = ContentMeta();

	if (title) {
		if (titleImage) {
			const ext = titleImage.substring(titleImage.lastIndexOf('.'));

			if (imagesExtensions.includes(ext)) {
				titleImage = `${titleImage.substring(0, titleImage.lastIndexOf('.'))}.webp`;
			}

			return (
				<div>
					<div class={classNames(displayClass, 'header-image-container')}>
						<div class={classNames(displayClass, 'header-image-gradient')}></div>
						{!!titleImage && (
							<img
								class={classNames(displayClass, 'header-image')}
								src={`/_assets/headers/${encodeURIComponent(titleImage)}`}
							/>
						)}
						<h1
							className={classNames(
								displayClass,
								'article-decoration-title-on-image',
							)}>
							{title}
						</h1>

						<div class={classNames(displayClass, 'article-informations-container')}>
							<h1 class={classNames(displayClass, 'article-title-on-image')}>
								{title}
							</h1>

							{!!subTitle && (
								<div class={classNames(displayClass, 'article-subtitle-on-image')}>
									{subTitle}
								</div>
							)}
						</div>

						<div class={classNames(displayClass, 'article-meta-container')}>
							<ContentMetaComponent {...props} />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div class={classNames(displayClass, 'article-no-image-container')}>
					<h1 className={classNames(displayClass, 'article-title')}>{title}</h1>
					<div className={classNames(displayClass, 'article-subtitle-on-image')}>
						{subTitle}
					</div>
					<div style={{ marginLeft: -8 }}>
						<ContentMetaComponent {...props} />
					</div>
				</div>
			);
		}
	} else {
		return null;
	}
};

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}

.article-informations-container {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
}

.article-no-image-container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.article-meta-container {
	position: absolute;
	top: 16px;
	right: 16px;
}

.article-subtitle-on-image {
  margin: 0 0 0 0;
  color: rgb(255, 255, 255, 1);
  z-index: 10;
}

.article-title-on-image {
  margin: 0 0 0 0;
  color: rgb(255, 255, 255, 1);
  z-index: 10;
}

.article-decoration-title-on-image {
  margin: 2rem 0 0 0;
  position: absolute;
  bottom: -4rem;
  left: -20%;
  text-align: center;
  color: rgb(255, 255, 255, 0.08);
  z-index: 10;
  font-size: 10rem;
  white-space: nowrap;
  user-select: none;
}

.header-image-container {
  position: relative;
  overflow: hidden;
  height: 350px;
}

.header-image {
  margin: 0;
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  height: 350px;
}

.header-image-gradient{
  height: 350px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image:
    linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(117, 19, 93, 0.60));
    background-blend-mode: multiply;
  border-radius: 8px;
}
`;

export default (() => ArticleTitle) satisfies QuartzComponentConstructor;
