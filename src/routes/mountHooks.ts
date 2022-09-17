import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { spring } from 'svelte/motion';

function sleep(duration = 3000) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}

export interface Opts {
	scrollAreaId?: string;
	pullToRefreshId?: string;
	thresholdDistance?: number;
	onRefresh: Function;
}

export function onRefresh(
	{
		scrollAreaId = 'scroll-area',
		pullToRefreshId = 'pull-to-refresh',
		thresholdDistance = 200,
		onRefresh
	}: Opts = { onRefresh() {} }
) {
	// this represents refreshing state
	const refreshing = writable<boolean>(false);

	// register touch handlers
	onMount(() => {
		// is true if threshold distance swiped else false used to figure out if a refresh is needed on touchend
		let shouldRefresh: boolean = false;

		const scrollArea = document.getElementById(scrollAreaId);
		const pullToRefresh = document.getElementById(pullToRefreshId);

		if (!scrollArea) throw new Error(`no element with id ${scrollAreaId} found`);
		if (!pullToRefresh) throw new Error(`no element with id ${pullToRefreshId} found`);

		let startY: number = 0;
		let touchId: number = -1;

		const offset = spring<number>(0);

		// link offset to css properties
		offset.subscribe((val) => {
			requestAnimationFrame(() => {
				pullToRefresh.style.setProperty('--offset', `${val}px`);
			});
		});

		// link angle to css properties
		const angle = spring<number>(0);
		angle.subscribe((val) => {
			requestAnimationFrame(() => {
				pullToRefresh.style.setProperty('--angle', `${val}deg`);
			});
		});

		function onTouchStart(e: TouchEvent) {
			// return if another touch is already registered for pull to refresh
			if (touchId > -1) return;
			const touch = e.touches[0];
			startY = touch.screenY + scrollArea.scrollTop;
			touchId = touch.identifier;
		}

		function onTouchMove(e: TouchEvent) {
			// pull to refresh should only trigger if user is at top of the scroll area
			if (scrollArea.scrollTop > 0) return;
			const touch = Array.from(e.changedTouches).find((t) => t.identifier === touchId);
			if (!touch) return;

			const distance = touch.screenY - startY;
			shouldRefresh = distance >= thresholdDistance;
			// return if swiping up
			if (distance < 0) return;
			scrollArea.style.overflowY = 'hidden';

			offset.set(Math.min(distance, thresholdDistance) / 2);
			angle.set(Math.min(distance, thresholdDistance));
		}

		function onTouchEnd(e: TouchEvent) {
			scrollArea.style.overflowY = 'auto';
			// needed so this doesn't trigger if some other touch ended
			const touch = Array.from(e.changedTouches).find((t) => t.identifier === touchId);
			if (!touch) return;

			// reset touchId
			touchId = -1;

			// run callback if refresh needed
			if (shouldRefresh) {
				refreshing.set(true);
				onRefresh(refreshing);
			}

			// create a proxy value for the store to avoid using get(refreshing) in while loop
			let isRefreshing: boolean = true;
			refreshing.subscribe((state) => (isRefreshing = state));

			// spin the loader while refreshing
			function spin() {
				angle.update(($angle) => $angle + 5);
				if (isRefreshing) requestAnimationFrame(spin);
				else {
					offset.set(0);
					angle.set(0);
				}
			}
			requestAnimationFrame(spin);
		}

		scrollArea?.addEventListener('touchstart', onTouchStart);
		scrollArea?.addEventListener('touchmove', onTouchMove);
		scrollArea?.addEventListener('touchend', onTouchEnd);
		scrollArea?.addEventListener('touchcancel', onTouchEnd);
	});

	// return refreshing state store
	return refreshing;
}
