<script lang="ts">
    import { alldataComment } from "$lib/store/stores";
    import { Bar } from 'svelte-chartjs';
    import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
    import { writable } from 'svelte/store';

    // Register necessary Chart.js components
    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    let allComment: AlldataComment[] | null = null;
    let isDataLoaded = false;
    let chartData: any = null;  // Make chartData initially null
    let timeFilter = writable('today');  // Store for the time filter

    // Subscribe to the Svelte store and process the data
    alldataComment.subscribe(value => {
        allComment = value;
        if (allComment && allComment.length > 0) {
            isDataLoaded = true;
            timeFilter.subscribe(filter => {
                prepareChartData(allComment, filter);
            });
        }
    });

    // Function to prepare the chart data based on the selected time filter
    function prepareChartData(comments: any[], filter: string) {
    const emotionCounts: Record<string, Record<string, number>> = {};  // { interval: { emotion: count } }
    const timeLabels: string[] = [];
    const now = new Date();

    comments.forEach(comment => {
        const emotion = comment.Emotion;
        const date = new Date(comment.Time);
        let timeLabel = '';

        switch (filter) {
            case 'today':
                const today = new Date();
                const commentDate = date.toDateString();
                const todayDate = today.toDateString();
                if (commentDate === todayDate) {
                    // Group comments into hourly intervals
                    const hour = date.getHours();
                    timeLabel = formatTime(hour); // Show only the beginning hour
                }
                break;
            case 'month':
                const currentMonth = `${now.getFullYear()}-${now.getMonth() + 1}`; // Format like "2024-9"
                const commentMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
                const commentDay = date.getDate();
                if (currentMonth === commentMonth) {
                    timeLabel = `${commentDay}`;
                }
                break;
            case 'year':
                const yearMonth = date.getMonth(); // 0-based month index
                timeLabel = getMonthName(yearMonth); // Convert month index to name
                break;
        }

        if (timeLabel) {
            // Initialize time label if not present
            if (!timeLabels.includes(timeLabel)) {
                timeLabels.push(timeLabel);
            }

            // Initialize emotion count for this time slot if not present
            if (!emotionCounts[timeLabel]) {
                emotionCounts[timeLabel] = {};
            }

            // Count the emotions
            if (emotionCounts[timeLabel][emotion]) {
                emotionCounts[timeLabel][emotion]++;
            } else {
                emotionCounts[timeLabel][emotion] = 1;
            }
        }
    });

    // Ensure all timeLabels are present in the final chart data
    const generateLabels = () => {
        let labels: string[] = [];
        switch (filter) {
            case 'today':
                for (let hour = 0; hour < 24; hour++) {
                    labels.push(formatTime(hour));  // Show only the beginning hour
                }
                break;
            case 'month':
                const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                for (let day = 1; day <= daysInMonth; day++) {
                    labels.push(day.toString());
                }
                break;
            case 'year':
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                labels = monthNames;
                break;
        }
        return labels;
    };

    const allLabels = generateLabels();

    // Fill in missing labels with zero counts
    allLabels.forEach(label => {
        if (!timeLabels.includes(label)) {
            timeLabels.push(label);
        }
    });

    // Prepare the chart data
    const uniqueEmotions = new Set<string>();
    for (const counts of Object.values(emotionCounts)) {
        Object.keys(counts).forEach(emotion => uniqueEmotions.add(emotion));
    }

    chartData = {
        labels: allLabels,  // X-axis: time slots or days/months
        datasets: Array.from(uniqueEmotions).map(emotion => ({
            label: emotion,
            data: allLabels.map(label => emotionCounts[label]?.[emotion] || 0),  // Data for each emotion
            backgroundColor: getEmotionColor(emotion),  // Set background color based on emotion
            stack: 'stack1'
        }))
    };
}

// Helper function to format hour into a readable string
function formatTime(hour: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${formattedHour}:00 ${period}`;
}

// Helper function to get month name from index
function getMonthName(monthIndex: number): string {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
}

// Helper function to generate colors for each emotion
function getEmotionColor(emotion: string): string {
    switch (emotion) {
        case 'anger':
            return 'rgba(241, 43, 67, 0.6)'; 
        case 'fear':
            return 'rgba(167, 94, 241, 0.6)'; 
        case 'joy':
            return 'rgba(255, 228, 95, 0.6)'; 
        case 'love':
            return 'rgba(250, 179, 188, 0.6)'; 
        case 'sadness':
            return 'rgba(137, 171, 255, 0.6)'; 
        case 'surprise':
            return 'rgba(249, 150, 0, 0.6)';
        default:
            return 'rgba(128, 0, 128, 0.6)'; // Default color
    }
}


</script>
<div style="position: relative; padding: 0; display: flex; flex-direction: column; flex-grow: 1;">
    <!-- Dropdown for selecting the time filter -->
    <select on:change={(e) => timeFilter.set(e.target.value)} style="position: absolute; top: 0px; right: 0px;">
        <option value="today">Today</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
    </select>

    {#if isDataLoaded && chartData}
        <!-- Render the stacked bar chart when data is loaded -->
        <Bar data={chartData} options={{
            responsive: true,
            plugins: {
                legend: { display: true },
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time' },
                    stacked: true
                },
                y: {
                    title: { display: true, text: 'Count' },
                    stacked: true,
                    min: 0
                }
            }
        }} />
    {:else}
        <!-- Show a loading message or spinner -->
        <p>Loading data...</p>
    {/if}
</div>
