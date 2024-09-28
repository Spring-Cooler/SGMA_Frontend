<template>
    <div class="comment-body">
        <slot></slot>
    </div>
</template>

<style scoped>
.comment-body {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
    margin-bottom: 2rem;
}
</style>