<script lang="ts">
    export let cKey : string
    export let a : string

    // export function deleteCookie() {
    //     document.cookie = `${cKey}=; Max-Age=0; path=/;`;
    //     console.log("kuy")
    // }

    // const loginURL = (await (await fetch('/api/login/getURL')).json()).url;
    // throw redirect(303, loginURL);
</script>

<div class={`relative z-10 ${a}`} aria-labelledby="modal-title" role="dialog" aria-modal="true" tabindex="0" on:click={(event) => {
    // Close modal if click is outside the modal content
    const target = event.target;
    const modalContent = target.closest('.modal-content');
    if (!modalContent) {
        a = "hidden";
    }
}}>
    
    <!-- Apply backdrop-blur to the background -->
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-opacity-50">
        <div class="flex min-h-full items-end p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md modal-content" style="transform: translate(600px, -192px);">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="flex items-center justify-center mb-6 mt-4">
                        <span class="font-bold text-2xl">Create an Account</span>
                    </div>
                    
                    <div class="flex items-center justify-center mb-5">
                        <!-- <button on:click={deleteCookie} class="bg-white rounded-lg p-3 shadow-md flex items-center justify-center w-80 border-2 border-[#D7DBEC]"> -->
                        <button class="bg-white rounded-lg p-3 shadow-md flex items-center justify-center w-80 border-2 border-[#D7DBEC]">
                            <img src="/src/lib/images/Google.png" alt="Google" class="h-6 w-6 mr-2" />
                            <span class="text-[#1E5EFF]">Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>