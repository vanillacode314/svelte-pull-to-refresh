import { writable } from 'svelte/store';
import { spring } from 'svelte/motion';
import { onMount } from 'svelte';

export function onRefresh({
	scrollAreaId = 'scroll-area',
	pullToRefreshId = 'pull-to-refresh',
	thresholdDistance = 100,
	callback = (refreshing) => refreshing.set(false)
} = {}) {
	// this represents refreshing state if we are currently refreshing or not, this will be return to the caller of this function
	const refreshing = writable(false);

	// is true if threshold distance swiped else false used to figure out if a refresh is needed on touchend
	let shouldRefresh = false;

	// will be set to element references later on
	let scrollArea;
	let pullToRefresh;

	// start Y coordinate of swipe
	let startY = 0;
	// touch ID used to start pullToRefresh, -1 is used to represent no pullToRefresh started yet
	let touchId = -1;

	// will be linked to css properties later on
	const offset = spring(0);
	const angle = spring(0);

	function onTouchStart(e) {
		// return if another touch is already registered for pull to refresh
		if (touchId > -1) return;
		const touch = e.touches[0];
		startY = touch.screenY + scrollArea.scrollTop;
		touchId = touch.identifier;
	}

	function onTouchMove(e) {
		// pull to refresh should only trigger if user is at top of the scroll area
		if (scrollArea.scrollTop > 0) return;
		const touch = Array.from(e.changedTouches).find((t) => t.identifier === touchId);
		if (!touch) return;

		const distance = touch.screenY - startY;
		shouldRefresh = distance >= thresholdDistance;
		if (distance > 0) {
			scrollArea.style.overflowY = 'hidden';
		}

		offset.set(Math.min(distance, thresholdDistance));
		angle.set(Math.min(distance, thresholdDistance) * 2);
	}

	function onTouchEnd(e) {
		// needed so this doesn't trigger if some other touch ended
		const touch = Array.from(e.changedTouches).find((t) => t.identifier === touchId);
		if (!touch) return;

		scrollArea.style.overflowY = 'auto';

		// reset touchId
		touchId = -1;

		// run callback if refresh needed
		if (shouldRefresh) {
			refreshing.set(true);
			callback(refreshing);
		}

		// create a proxy value for the store to avoid using get(refreshing) in the spin loop
		let isRefreshing: boolean = true;
		const unsubscribe = refreshing.subscribe((state) => (isRefreshing = state));

		// spin the loader while refreshing
		function spin() {
			if (isRefreshing) {
				angle.update(($angle) => $angle + 5);
				requestAnimationFrame(spin);
			} else {
				offset.set(0);
				angle.set(0);
				unsubscribe();
			}
		}
		requestAnimationFrame(spin);
	}

	// set element references, link css properties to stores & register touch handlers
	onMount(() => {
		scrollArea = document.getElementById(scrollAreaId);
		pullToRefresh = document.getElementById(pullToRefreshId);

		if (!scrollArea) throw new Error(`no element with id ${scrollAreaId} found`);
		if (!pullToRefresh) throw new Error(`no element with id ${pullToRefreshId} found`);

		// link offset to css properties
		const offsetUnsub = offset.subscribe((val) => {
			requestAnimationFrame(() => {
				pullToRefresh.style.setProperty('--offset', `${val}px`);
			});
		});

		// link angle to css properties
		const angleUnsub = angle.subscribe((val) => {
			requestAnimationFrame(() => {
				pullToRefresh.style.setProperty('--angle', `${val}deg`);
			});
		});

		scrollArea?.addEventListener('touchstart', onTouchStart);
		scrollArea?.addEventListener('touchmove', onTouchMove);
		scrollArea?.addEventListener('touchend', onTouchEnd);
		scrollArea?.addEventListener('touchcancel', onTouchEnd);

		return () => {
			offsetUnsub();
			angleUnsub();
			scrollArea?.removeEventListener('touchstart', onTouchStart);
			scrollArea?.removeEventListener('touchmove', onTouchMove);
			scrollArea?.removeEventListener('touchend', onTouchEnd);
			scrollArea?.removeEventListener('touchcancel', onTouchEnd);
		};
	});

	// return refreshing state store
	return refreshing;
}
