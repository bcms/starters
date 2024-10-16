<script>
	import '../app.css';
	import Footer from '$lib/components/layout/footer.svelte';
</script>

<div class="overflow-hidden flex flex-col min-h-screen">
	<main class="flex flex-col flex-1"><slot /></main>
	<Footer />
</div>
