<script lang="ts">
	import { alldataComment } from '$lib/store/stores';

	export let selectedEmotion = '';

	let allComment: AlldataComment[] | null = null;
	let filteredComments: AlldataComment[] | null = [];

	// Subscribe to comments data
	alldataComment.subscribe((value) => {
		allComment = value;
		allComment?.sort((e1, e2) => new Date(e2.Time).getTime() - new Date(e1.Time).getTime());
		filterComments(); // Filter comments when data is initially loaded
	});

	// Re-filter comments when selectedEmotion changes
	$: if (selectedEmotion !== undefined) {
		filterComments();
	}

	// Function to filter comments based on selectedEmotion
	function filterComments() {
		if (allComment && selectedEmotion) {
			filteredComments = allComment.filter((comment) => comment.Emotion === selectedEmotion);
		} else {
			filteredComments = allComment ? allComment : [];
		}
	}

	// Function to calculate the time difference
	function timeAgo(timestamp: string) {
		const now = new Date().getTime();
		const commentTime = new Date(timestamp).getTime();
		const diffInSeconds = Math.floor((now - commentTime) / 1000);

		const minutes = Math.floor(diffInSeconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const years = Math.floor(days / 365);

		if (years > 0) {
			return `${years} year${years > 1 ? 's' : ''} ago`;
		} else if (days > 0) {
			return `${days} day${days > 1 ? 's' : ''} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours > 1 ? 's' : ''} ago`;
		} else if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
		} else {
			return `just now`;
		}
	}

	// Function to get color based on emotion
	function getEmotionColor(emotion: string) {
		switch (emotion) {
			case 'anger':
				return 'text-[#F12B43]';
			case 'fear':
				return 'text-[#A75EF1]';
			case 'joy':
				return 'text-[#FFE45F]';
			case 'love':
				return 'text-[#FAB3BC]';
			case 'sadness':
				return 'text-[#89ABFF]';
			case 'surprise':
				return 'text-[#F99600]';
			default:
				return 'text-purple-500';
		}
	}
</script>

<div class="p-4 overflow-y-auto max-h-[90vh] w-full">
	<!-- <div class={`p-4 overflow-y-scroll 2xl:h-[600px] lg:h-[400px]`}> -->
	{#if filteredComments && filteredComments.length > 0}
		{#each filteredComments as comment}
			<div class="mb-6 pb-4 border-b border-gray-300">
				<!-- Emotion อยู่ด้านบน และเปลี่ยนสีตาม Emotion -->
				<p class="text-sm font-semibold capitalize mb-2 {getEmotionColor(comment.Emotion)}">
					{comment.Emotion}
				</p>
				<!-- ข้อความของคอมเมนต์ -->
				<p class="text-gray-800 mb-2">{comment.Text}</p>
				<!-- เวลาอยู่ด้านล่าง -->
				<p class="text-xs text-gray-400">{timeAgo(comment.Time)}</p>
			</div>
		{/each}
	{:else}
		<p class="text-gray-500">No data available</p>
	{/if}
</div>
