<script lang="ts">
    import {
        alldataComment
    } from "$lib/store/stores";
    
    let allComment: AlldataComment[] | null = null
    alldataComment.subscribe(value => {
        allComment = value
        // console.log(value)
    })
    </script>
    
    <div>
    </div>