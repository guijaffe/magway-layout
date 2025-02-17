import '../scss/main.scss';

const parallaxEffect = (selector) => {
	const hero = document.querySelector(selector);

	const updateBackground = (event = null) => {
		if (!hero) return;

		const windowWidth = window.innerWidth;

		if (windowWidth < 767.98) {
			hero.style.backgroundPosition = 'center';
			return;
		}

		const mouseX = event ? event.clientX : 0;
		const offsetX = (mouseX / windowWidth) * 3;

		hero.style.backgroundPosition = `${offsetX}%`;
		hero.style.backgroundSize = windowWidth > 1900 ? '127%' : 'cover';
	};

	const init = () => {
		window.addEventListener('resize', () => updateBackground());
		window.addEventListener('mousemove', (event) => {
			if (window.innerWidth >= 767.98) {
				updateBackground(event);
			}
		});
		updateBackground();
	};

	init();
};

const burgerMenu = (burgerSelector, headerSelector, navSelector) => {
	const burger = document.querySelector(burgerSelector);
	const header = document.querySelector(headerSelector);
	const nav = document.querySelector(navSelector);
	const body = document.body;

	const toggleMenu = () => {
		header.classList.toggle('header--active');
		nav.classList.toggle('header__nav--active');
		burger.classList.toggle('header__burger--active');
		body.classList.toggle('menu-open');
	};

	if (burger && header && nav) {
		burger.addEventListener('click', () => toggleMenu());
	}
};

const cardLoader = (containerSelector, buttonSelector, maxCards = 30) => {
	const cardContainer = document.querySelector(containerSelector);
	const loadMoreButton = document.querySelector(buttonSelector);
	let currentCards = 0;

	const createCard = (post, user) => {
		const card = document.createElement('div');
		card.classList.add('card');

		const imageUrl = `https://picsum.photos/seed/${post.id}/1200`;
		const postDate = new Date();
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const formattedDate = postDate.toLocaleDateString('en-US', options);

		const categoryHtml = post.category ? `<p class="card__category">${post.category}</p>` : `<p class="card__category" style="visibility: hidden;">.</p>`;

		card.innerHTML = `
			<div class="card__image">
				<img src="${imageUrl}" alt="Image for ${post.title}" class="card__image-img">
			</div>
			<div class="card__body">
				<div class="card__category">${categoryHtml}</div> 
				<h3 class="card__title">${post.title}</h3>
				<p class="card__description">${post.body}</p>
				<p class="card__author">Posted by <strong>${user.name}</strong>, on ${formattedDate}</p>
				<a href="#" class="card__btn btn btn--secondary">Continue reading</a>
			</div>
		`;

		cardContainer.appendChild(card);
	};

	const loadCards = async () => {
		if (currentCards >= maxCards) {
			loadMoreButton.style.display = 'none';
			return;
		}

		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${currentCards}&_limit=5`);
			const posts = await response.json();

			for (let post of posts) {
				const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
				const user = await userResponse.json();

				const categories = ["Water", "Bridge", "Forest", "Nature"];
				post.category = Math.random() > 0.5 ? categories[Math.floor(Math.random() * categories.length)] : "";

				createCard(post, user);
				currentCards++;
			}
			loadMoreButton.style.display = currentCards < maxCards ? 'inline-block' : 'none';
		} catch (error) {
			console.error('Ошибка загрузки данных:', error);
		}
	};

	const init = () => {
		if (loadMoreButton) {
			loadMoreButton.addEventListener('click', () => loadCards());
		}
		loadCards();
	};
	init();
};

const modal = () => {
	const modal = document.getElementById('modal');
	const openButtons = document.querySelectorAll('[data-modal-open]');
	const closeButton = modal.querySelector('.modal__close');

	const openModal = () => {
		modal.classList.add('modal--active');
		document.body.style.overflow = 'hidden';
	};

	const closeModal = () => {
		modal.classList.remove('modal--active');
		document.body.style.overflow = '';
	};

	openButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			openModal();
		});
	});

	closeButton.addEventListener('click', closeModal);
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.classList.contains('modal__overlay')) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	});
};



parallaxEffect('.hero');
burgerMenu('.header__burger', '.header', '.header__nav');
cardLoader('#card-container', '#load-more');// Инициализация модального окна
modal();
