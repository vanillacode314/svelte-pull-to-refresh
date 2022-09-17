<script lang="ts">
	import type { Writable } from 'svelte/store';

	import '../style.css';
	import { onRefresh } from './mountHooks';

	const refreshing = onRefresh({ onRefresh: refresh });

	function refresh(refreshing: Writable<boolean>) {
		setTimeout(() => {
			refreshing.set(false);
		}, 3000);
	}
</script>

<div class="container">
	<nav class="nav">
		<div class="nav__logo">Pull To Refresh</div>
	</nav>
	<main class="main" id="scroll-area">
		<div id="pull-to-refresh">
			<div class="ptr-icon">
				<svg width="1em" height="1em" viewBox="0 0 8 8"
					><path
						fill="currentColor"
						d="M4 0C1.8 0 0 1.8 0 4s1.8 4 4 4c1.1 0 2.12-.43 2.84-1.16l-.72-.72c-.54.54-1.29.88-2.13.88c-1.66 0-3-1.34-3-3s1.34-3 3-3c.83 0 1.55.36 2.09.91L4.99 3h3V0L6.8 1.19C6.08.47 5.09 0 3.99 0z"
					/></svg
				>
			</div>
		</div>
		{#if !$refreshing}
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magnam dolor est velit optio
				eaque perferendis, suscipit voluptatum sit accusamus eius illo cumque laboriosam. Non est
				quia totam ipsam dignissimos.
			</p>
		{/if}
	</main>
</div>

<style>
	.container {
		--padding: 1rem;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		height: 100%;
	}
	.nav {
		background-color: black;
		color: white;
		padding: var(--padding);
	}
	.nav__logo {
		text-transform: uppercase;
	}
	.main {
		padding: var(--padding);
		overflow-y: auto;
		display: grid;
		place-content: start;
		gap: 1em;
	}
	#scroll-area {
		position: relative;
	}
	#pull-to-refresh {
		--initial: -100%;
		--y: calc(var(--offset, 0px) + var(--initial));
		inset: auto 0;
		margin-inline: auto;
		display: grid;
		place-content: center;
		position: absolute;
		transform: translateY(var(--y)) rotate(var(--angle, 0deg));
	}
	.ptr-icon {
		padding: 0.75rem;
		font-size: 1.5rem;
		display: grid;
		place-content: center;
		border-radius: 9999px;
		background-color: black;
		color: white;
	}
</style>
