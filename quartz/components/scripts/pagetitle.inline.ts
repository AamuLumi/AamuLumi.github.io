const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const currentTheme = localStorage.getItem('theme') ?? userPref;

const switchTheme = (e) => {
	const title = document.querySelector('#site-title a');

	if (title) {
		title.textContent = e.detail.theme === 'light' ? 'Pink in the light' : 'Pink in the dark';
	}
};

document.addEventListener('nav', () => {
	document.addEventListener('themechange', switchTheme);

	window.addCleanup(() => document.removeEventListener('change', switchTheme));

	switchTheme({ detail: { theme: currentTheme } });
});
