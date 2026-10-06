const projects = {
  kingdom: { number: '01', title: 'SOLKingdom', text: 'A Solana-native strategy game where kingdoms rise, alliances shape the future, and every decision matters.', image: '../solkingdom-kingdom-landscape.png', position: 'center' },
  mission: { number: '02', title: 'SOLar Mission', text: 'A blockchain-powered exploration game where players own missions and shape the frontier.', image: '../images/SOLarmission.png', position: 'center' },
  cranker: { number: '03', title: 'The Cranker & Diamond Hands', text: 'Explore The Cranker & Diamond Hands project.', image: '../images/banner.png', position: 'center' },
  trader: { number: '04', title: 'Degen Trader', text: 'A precision-built trading terminal for fast-moving, on-chain opportunities.', image: '../images/DeganTrader.png', position: 'center' }
};

const tabs = document.querySelectorAll('.project-tab');
const screen = document.querySelector('.project-screen');
const screenKicker = screen.querySelector('.screen-kicker');
const screenTitle = screen.querySelector('h3');
const screenText = screen.querySelector('.screen-copy > p:not(.screen-kicker)');
const screenLink = screen.querySelector('.screen-copy a');
const projectTargets = {
  kingdom: '#featured-kingdom',
  mission: '#project-mission',
  cranker: '#project-cranker',
  trader: '#project-trader'
};

tabs.forEach((tab) => tab.addEventListener('click', () => {
  const project = projects[tab.dataset.project];
  tabs.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  screenKicker.textContent = `Selected work / ${project.number}`;
  screenTitle.textContent = project.title;
  screenText.textContent = project.text;
  screenLink.href = projectTargets[tab.dataset.project];
  screenLink.setAttribute('aria-label', `View ${project.title}`);
  screen.style.backgroundImage = `linear-gradient(90deg, #030811f5 0%, #030811c7 35%, #03081142 65%, transparent 82%), url("${project.image}")`;
  screen.style.backgroundPosition = project.position;
}));

const compositeTabs = document.querySelectorAll('.composite-tab');
const desktopDisplay = document.querySelector('.desktop-project-display');
const desktopArtwork = desktopDisplay?.querySelector('.desktop-project-art img');
const desktopKicker = desktopDisplay?.querySelector('.desktop-project-kicker');
const desktopTitle = desktopDisplay?.querySelector('h3');
const desktopText = desktopDisplay?.querySelector('.desktop-project-copy > p:not(.desktop-project-kicker)');
const desktopLink = desktopDisplay?.querySelector('a');
compositeTabs.forEach((tab) => tab.addEventListener('click', () => {
  const projectKey = tab.dataset.project;
  const project = projects[projectKey];
  if (!project || !desktopDisplay || !desktopArtwork || !desktopTitle || !desktopText || !desktopLink) return;
  compositeTabs.forEach((item) => item.classList.toggle('active', item === tab));
  if (desktopKicker) desktopKicker.textContent = `Selected work / ${project.number}`;
  desktopTitle.textContent = project.title;
  desktopText.textContent = project.text;
  desktopLink.href = projectTargets[projectKey];
  desktopArtwork.src = project.image;
  desktopArtwork.alt = `${project.title} project artwork`;
}));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const projectDialog = document.querySelector('#project-dialog');
const projectTriggers = document.querySelectorAll('[data-open-project]');
let projectTrigger = null;
const projectForm = document.querySelector('#project-form');
projectTriggers.forEach((trigger) => trigger.addEventListener('click', () => {
  projectTrigger = trigger;
  projectDialog.showModal();
  document.body.classList.add('project-dialog-open');
}));
projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', (event) => {
  const bounds = projectDialog.getBoundingClientRect();
  if (event.target === projectDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) projectDialog.close();
});
projectDialog.addEventListener('close', () => {
  document.body.classList.remove('project-dialog-open');
  projectTrigger?.focus({ preventScroll: true });
});
projectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const details = new FormData(projectForm);
  const subject = `Project inquiry: ${details.get('service')}`;
  const body = `Name: ${details.get('name')}\nEmail: ${details.get('email')}\nService: ${details.get('service')}\n\nProject details:\n${details.get('project')}`;
  window.location.href = `mailto:hello@kryptocompass.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  projectForm.querySelector('.form-status').hidden = false;
});
