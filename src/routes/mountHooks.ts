import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';

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
	const refreshing = writable<boolean>(false);
	onMount(() => {
		let doRefresh: boolean = false;

		const scrollArea = document.getElementById(scrollAreaId);
		const pullToRefresh = document.getElementById(pullToRefreshId);

		if (!scrollArea) throw new Error(`no element with id ${scrollAreaId} found`);
		if (!pullToRefresh) throw new Error(`no element with id ${pullToRefreshId} found`);

		let startY: number = 0;
		let touchId: number = -1;

		scrollArea?.addEventListener('touchstart', (e: TouchEvent) => {
			if (touchId > -1) return;
			const touch = e.touches[0];
			startY = touch.clientY;
			touchId = touch.identifier;
		});

		scrollArea?.addEventListener('touchmove', (e: TouchEvent) => {
			// pull to refresh should only trigger if user is at top of the scroll area
			if (scrollArea.scrollTop > 0) return;
			const touch = Array.from(e.changedTouches).find((t) => t.identifier === touchId);
			if (!touch) return;

			const distance = touch.clientY - startY;
			doRefresh = distance >= thresholdDistance;

			// update styles
			const offset = Math.min(distance, thresholdDistance);
			pullToRefresh.style.setProperty('--offset', `${offset / 2}px`);
			pullToRefresh.style.setProperty('--angle', `${offset}deg`);
		});

		scrollArea?.addEventListener('touchend', async () => {
			if (doRefresh) {
				refreshing.set(true);
				onRefresh(refreshing);
				while (get(refreshing)) {
					const angle = +pullToRefresh.style.getPropertyValue('--angle').replace('deg', '');
					pullToRefresh.style.setProperty('--angle', `${angle + 2}deg`);
					await sleep(1);
				}
			}
			touchId = -1;

			let offset = +pullToRefresh.style.getPropertyValue('--offset').replace('px', '') * 2;
			while (offset > 0) {
				pullToRefresh.style.setProperty('--offset', `${offset / 2}px`);
				pullToRefresh.style.setProperty('--angle', `${offset}deg`);
				offset = Math.max(0, offset - 5);
				await sleep(1);
			}
			pullToRefresh.style.removeProperty('--offset');
			pullToRefresh.style.removeProperty('--angle');
		});
	});
	return refreshing;
}
